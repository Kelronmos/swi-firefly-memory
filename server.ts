import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import crypto from "crypto";

// Optional: store OTPs in memory for the demo
const otpStore = new Map<string, { otpHash: string; expiresAt: number; attempts: number }>();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(`${name} is required and must not be hardcoded`);
  }
  return value;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "256kb" }));

  // API Routes
  app.post("/api/replay/import", (req, res) => {
    // Simulated validation only — NOT verified evidence, NOT authorization.
    // Body size limited by express.json limit above.
    const challengeId = `SWI-OTP-${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`;
    res.json({
      status: "SIMULATED_VALID",
      note: "Simulated import acceptance ≠ verified evidence ≠ authorization",
      challenge_id: challengeId,
      authorized: false,
      proven: false,
      production_authorized: false,
    });
  });

  app.post("/api/auth/request-otp", async (req, res) => {
    const { destination, challenge_id } = req.body;

    if (!destination || !destination.includes("@")) {
      return res.status(400).json({ error: "Invalid email destination" });
    }

    let smtpUser: string;
    let smtpPass: string;
    try {
      smtpUser = requireEnv("SMTP_USER");
      smtpPass = requireEnv("SMTP_PASSWORD");
    } catch {
      return res.status(503).json({
        error: "SMTP not configured",
        note: "Credentials must be supplied via environment variables",
      });
    }

    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
      otpStore.set(challenge_id, {
        otpHash,
        expiresAt: Date.now() + 180 * 1000,
        attempts: 0,
      });

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.hostinger.com",
        port: Number(process.env.SMTP_PORT || 465),
        secure: true,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_FROM || `"SWI Security Maze" <${smtpUser}>`,
        replyTo: process.env.SMTP_REPLY_TO || "noreply@trustsmotion.com",
        to: destination,
        subject: "SWI Replay Human Verification Code",
        text: `Your SWI verification code expires shortly.\n\nChallenge ID: ${challenge_id}\n\nNever forward this code. SWI staff will never request your OTP.\n`,
      };

      await transporter.sendMail(mailOptions);

      console.log(
        JSON.stringify({
          event: "OTP_EMAIL_SENT",
          timestamp: new Date().toISOString(),
          challenge: challenge_id,
          // never log secrets or OTP
        })
      );

      res.json({ success: true, message: "OTP Sent" });
    } catch (error) {
      console.error("Error sending email (details redacted)");
      res.status(500).json({ error: "Failed to send OTP" });
    }
  });

  app.post("/api/auth/verify-otp", (req, res) => {
    const { challenge_id, otp } = req.body;

    const record = otpStore.get(challenge_id);
    if (!record) {
      return res.status(400).json({ error: "Invalid or expired challenge" });
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(challenge_id);
      return res.status(400).json({ error: "OTP expired" });
    }

    record.attempts++;
    if (record.attempts > 5) {
      otpStore.delete(challenge_id);
      return res.status(400).json({ error: "Too many attempts" });
    }

    const providedHash = crypto.createHash("sha256").update(otp).digest("hex");
    if (providedHash !== record.otpHash) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    otpStore.delete(challenge_id);
    // Authentication success ≠ replay permission ≠ SWI authorization.
    // Replay requires a separate governing authorization decision.
    res.json({
      success: true,
      authentication: {
        verified: true,
        verified_by: "human_otp",
        challenge_id,
        note: "OTP verified identity challenge only",
      },
      authorization: {
        replay_permission: false,
        reason: "otp_success_is_not_authorization",
        note: "Authentication ≠ authorization. Governing permit required for replay.",
      },
      proven: false,
      sealed: false,
      authorized: false,
      production_authorized: false,
    });
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
