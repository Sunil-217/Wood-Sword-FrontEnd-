import { describe, expect, it } from "vitest";
import {
  AUTH_BACKEND_CONFIGURED,
  authService,
  isValidEmail,
  isValidPhone,
  passwordStrength,
} from "./auth";

describe("email validation", () => {
  it("accepts ordinary addresses", () => {
    for (const v of ["a@b.in", "shopper@oneupsports.in", "first.last+tag@mail.co"]) {
      expect(isValidEmail(v)).toBe(true);
    }
  });

  it("rejects malformed addresses", () => {
    for (const v of ["", "no-at-sign", "a@b", "a@.com", "a b@c.com", "@b.com"]) {
      expect(isValidEmail(v)).toBe(false);
    }
  });
});

describe("phone validation", () => {
  it("accepts Indian mobile numbers with or without the country code", () => {
    for (const v of ["9043884205", "+919043884205", "+91 90438 84205", "80561-26269"]) {
      expect(isValidPhone(v)).toBe(true);
    }
  });

  it("rejects numbers that are the wrong length or start too low", () => {
    for (const v of ["", "12345", "1234567890", "90438842050", "abcdefghij"]) {
      expect(isValidPhone(v)).toBe(false);
    }
  });
});

describe("password strength", () => {
  it("scores a strong password at the top", () => {
    const s = passwordStrength("Cricket2026");
    expect(s.score).toBe(4);
    expect(s.problems).toHaveLength(0);
  });

  it("names what a weak password is missing", () => {
    const s = passwordStrength("abc");
    expect(s.score).toBeLessThan(2);
    expect(s.problems).toContain("at least 8 characters");
    expect(s.problems).toContain("an uppercase letter");
    expect(s.problems).toContain("a number");
  });

  it("reports nothing for an empty field", () => {
    expect(passwordStrength("").label).toBe("");
  });
});

describe("auth service honesty", () => {
  it("declares that no backend is connected", () => {
    expect(AUTH_BACKEND_CONFIGURED).toBe(false);
  });

  it("refuses a password reset rather than claiming an email was sent", async () => {
    const res = await authService.requestPasswordReset("shopper@oneupsports.in");
    expect(res.ok).toBe(false);
    expect(res.error).toMatch(/isn't connected|not connected/i);
    expect(res.error).not.toMatch(/sent|check your inbox/i);
  });

  it("rejects a malformed email on sign-in", async () => {
    const res = await authService.signIn("nope", "whatever");
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.field).toBe("email");
  });

  it("validates every registration field", async () => {
    const base = {
      name: "Test Shopper",
      email: "shopper@oneupsports.in",
      phone: "9043884205",
      password: "Cricket2026",
    };

    expect((await authService.register({ ...base, name: "  " })).ok).toBe(false);
    expect((await authService.register({ ...base, email: "bad" })).ok).toBe(false);
    expect((await authService.register({ ...base, phone: "123" })).ok).toBe(false);
    expect((await authService.register(base)).ok).toBe(true);
  });

  it("never returns a password on a successful result", async () => {
    const res = await authService.register({
      name: "Test Shopper",
      email: "shopper@oneupsports.in",
      phone: "9043884205",
      password: "Cricket2026",
    });

    expect(res.ok).toBe(true);
    if (res.ok) expect(JSON.stringify(res.user)).not.toContain("Cricket2026");
  });
});
