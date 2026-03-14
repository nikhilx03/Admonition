import express from "express";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Stripe Payment Intent Endpoint
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { items } = req.body;
      
      // In a real app, calculate order amount on the server to prevent manipulation
      // For this demo, we'll calculate a simple total based on the items passed
      const calculateOrderAmount = (items: any[]) => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0) * 100; // Stripe expects cents
      };

      const stripeKey = process.env.STRIPE_SECRET_KEY;
      if (!stripeKey) {
        return res.status(500).json({ error: "Stripe secret key is not configured." });
      }

      const stripe = new Stripe(stripeKey);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
