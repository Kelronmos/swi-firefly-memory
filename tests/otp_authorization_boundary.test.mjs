/**
 * Firefly OTP boundary tests (logic-level).
 * Authentication ≠ authorization. OTP success must not set replay_permission true.
 * PROVEN=NO SEALED=NO AUTHORIZED=NO PRODUCTION_AUTHORIZED=NO
 */
import assert from "node:assert/strict";
import test from "node:test";

function otpVerifyResponse({ ok }) {
  if (!ok) {
    return { success: false, error: "Invalid OTP" };
  }
  return {
    success: true,
    authentication: { verified: true, verified_by: "human_otp" },
    authorization: {
      replay_permission: false,
      reason: "otp_success_is_not_authorization",
    },
    proven: false,
    sealed: false,
    authorized: false,
    production_authorized: false,
  };
}

test("OTP success does not grant replay_permission", () => {
  const r = otpVerifyResponse({ ok: true });
  assert.equal(r.success, true);
  assert.equal(r.authorization.replay_permission, false);
  assert.equal(r.authorized, false);
  assert.equal(r.production_authorized, false);
});

test("OTP failure does not authorize", () => {
  const r = otpVerifyResponse({ ok: false });
  assert.equal(r.success, false);
  assert.equal(r.authorization, undefined);
});

test("governance ceilings remain NO on success", () => {
  const r = otpVerifyResponse({ ok: true });
  assert.equal(r.proven, false);
  assert.equal(r.sealed, false);
});
