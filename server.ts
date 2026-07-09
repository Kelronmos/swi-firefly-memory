import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import crypto from "crypto";

// Optional: store OTPs in memory for the demo
const otpStore = new Map<string, { otpHash: string; expiresAt: number; attempts: number }>();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/replay/import", (req, res) => {
    // Simulate evidence validation
    const challengeId = `SWI-OTP-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    res.json({
      status: "VALID",
      challenge_id: challengeId
    });
  });

  app.post("/api/auth/request-otp", async (req, res) => {
    const { destination, challenge_id } = req.body;

    if (!destination || !destination.includes('@')) {
      return res.status(400).json({ error: "Invalid email destination" });
    }

    try {
      // 1. Generate 6 digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // 2. Hash OTP and store it
      const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
      otpStore.set(challenge_id, {
        otpHash,
        expiresAt: Date.now() + 180 * 1000, // 60 seconds
        attempts: 0
      });

      // 3. Send via Hostinger SMTP
      const transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true, // Use SSL
        auth: {
          user: process.env.SMTP_USER || "swiotp@trustsmotion.com",
          pass: process.env.SMTP_PASSWORD || "gdjo-s0iy-kzdg-kj1v", 
        },
      });

      const mailOptions = {
        from: '"SWI Security Maze" <swiotp@trustsmotion.com>',
        replyTo: 'noreply@trustsmotion.com',
        to: destination,
        subject: "SWI Replay Human Verification Code",
        text: `Hello,

Your SWI Security Maze verification code is:

${otp}

This code will expire in 160 seconds.

Request details:

Challenge ID: ${challenge_id}
Request Type: Replay Authorization Verification
Time Created: ${new Date().toISOString()}

If you did not request this verification, you can ignore this email. No action is required.

Privacy Notice:
This email was generated automatically by the SWI Security Maze verification service. The OTP is used only to confirm human authorization for a replay request. We do not ask you to share this code with anyone.

For security reasons:

Never forward this code.
SWI staff will never request your OTP.
Verification records may be stored as part of the security audit trail.

Regards,

SWI Security Maze
Automated Verification Service

Do not reply to this email.
Contact: privacy@trustsmotion.com`
      };

      await transporter.sendMail(mailOptions);
      
      // 4. Audit Log
      console.log(JSON.stringify({
        event: "OTP_EMAIL_SENT",
        provider: "trusts_motion_hostinger",
        timestamp: new Date().toISOString(),
        challenge: challenge_id
      }));

      res.json({ success: true, message: "OTP Sent" });
    } catch (error) {
      console.error("Error sending email:", error);
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

    // Success
    otpStore.delete(challenge_id);
    res.json({
      success: true,
      authorization: {
        replay_permission: true,
        expires: "10 minutes",
        verified_by: "human_otp",
        evidence_id: "EV-2026-001"
      }
    });
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
