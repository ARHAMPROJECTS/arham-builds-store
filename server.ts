import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API routes
  app.post("/api/contact", async (req, res) => {
    const { user_name, user_email, message } = req.body;

    if (!user_name || !user_email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Configure your SMTP transporter here
      // For now, we'll log it and simulate success if no credentials are provided
      // In a real production app, you'd use process.env.SMTP_HOST, etc.
      
      console.log(`Received inquiry from ${user_name} (${user_email}): ${message}`);

      const smtpUser = process.env.SMTP_USER || 'arhamadib31@gmail.com';
      const smtpPass = process.env.SMTP_PASS || 'DEXW2026';

      if (smtpUser && smtpPass) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const mailOptions = {
          from: `"${user_name}" <${smtpUser}>`, // Gmail requires the 'from' to be the auth user
          to: 'arhamadib31@gmail.com',
          replyTo: user_email,
          subject: `New Inquiry from ${user_name}`,
          text: `Name: ${user_name}\nEmail: ${user_email}\n\nMessage:\n${message}`,
        };

        await transporter.sendMail(mailOptions);
        return res.json({ success: true, message: "Email sent successfully" });
      } else {
        // Fallback for development/demo if no credentials
        console.warn("SMTP credentials not found. Simulating success.");
        return res.json({ 
          success: true, 
          message: "Inquiry received (Simulated success - configure SMTP for real emails)" 
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send message" });
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
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
