import { Request, Response } from "express";
import { Transaction } from "../models/Transaction";
import { Book } from "../models/Book";
import { User } from "../models/User";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

// Create a Stripe Checkout Session
export const createCheckoutSession = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { bookId } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Create a transaction record
    const transaction = await Transaction.create({
      user: userId,
      book: bookId,
      amount: book.price,
      status: "pending",
      paymentMethod: "stripe",
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: book.title,
              description: book.description,
            },
            unit_amount: Math.round(book.price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      metadata: {
        transactionId: transaction._id.toString(),
        bookId: bookId,
        userId: userId.toString(),
      },
    });

    // Update transaction with session ID
    transaction.sessionId = session.id;
    await transaction.save();

    return res.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return res.status(500).json({ message: "Error creating checkout session" });
  }
};

// Commented out webhook handler - keeping for reference
/*
export const handleStripeWebhook = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata as {
      transactionId: string;
      bookId: string;
      userId: string;
    };

    try {
      // Update transaction status
      const transaction = await Transaction.findById(metadata.transactionId);
      if (transaction) {
        transaction.status = "completed";
        await transaction.save();

        // Add book to user's purchased books
        await User.findByIdAndUpdate(metadata.userId, {
          $addToSet: { purchasedBooks: metadata.bookId },
        });

        // Add user to book's purchasedBy array
        await Book.findByIdAndUpdate(metadata.bookId, {
          $addToSet: { purchasedBy: metadata.userId },
        });
      }
    } catch (error) {
      console.error("Error processing webhook:", error);
      return res.status(500).json({ message: "Error processing webhook" });
    }
  }

  return res.json({ received: true });
};
*/

// Confirm payment and update transaction status
export const confirmPayment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { sessionId } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Find the transaction
    const transaction = await Transaction.findOne({
      sessionId: sessionId,
      user: userId,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Check if payment was successful
    if (session.payment_status === "paid") {
      // Update transaction status
      transaction.status = "completed";
      transaction.paymentIntentId = session.payment_intent as string;
      await transaction.save();

      // Add book to user's purchased books
      await User.findByIdAndUpdate(userId, {
        $addToSet: { purchasedBooks: transaction.book },
      });

      // Add user to book's purchasedBy array
      await Book.findByIdAndUpdate(transaction.book, {
        $addToSet: { purchasedBy: userId },
      });

      return res.json({
        message: "Payment confirmed successfully",
        transaction,
      });
    } else {
      transaction.status = "failed";
      await transaction.save();
      return res.status(400).json({ message: "Payment not completed" });
    }
  } catch (error) {
    console.error("Error confirming payment:", error);
    return res.status(500).json({ message: "Error confirming payment" });
  }
};

// Get user's transactions
export const getUserTransactions = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const transactions = await Transaction.find({ user: userId })
      .populate("book", "title author price")
      .sort({ createdAt: -1 });

    return res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res.status(500).json({ message: "Error fetching transactions" });
  }
};

// Get transaction by ID
export const getTransactionById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const transaction = await Transaction.findOne({
      _id: id,
      user: userId,
    }).populate("book", "title author price");

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res.json(transaction);
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return res.status(500).json({ message: "Error fetching transaction" });
  }
};
