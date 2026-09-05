/**
 * Auth service boundary.
 *
 * There is no authentication backend yet, so nothing here verifies a
 * credential. What the app keeps is a local profile — an email the shopper
 * types so their bag and orders can be attributed on this device. It is not
 * a session, it grants no privileges, and it is deliberately incapable of
 * granting any.
 *
 * To connect a real backend, replace the bodies below with calls to it. The
 * signatures and result shapes are what the rest of the app depends on.
 */

export interface AuthUser {
  email: string;
  name?: string;
  phone?: string;
}

export type AuthResult =
  | { ok: true; user: AuthUser }
  | { ok: false; error: string; field?: "email" | "password" | "name" | "phone" };

/** Shape a real implementation must satisfy. */
export interface AuthService {
  signIn(email: string, password: string): Promise<AuthResult>;
  register(input: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<AuthResult>;
  requestPasswordReset(email: string): Promise<{ ok: boolean; error?: string }>;
  signOut(): Promise<void>;
}

/** True once a backend is wired up; gates anything that needs real identity. */
export const AUTH_BACKEND_CONFIGURED = false;

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  // Indian mobile numbers, optionally with +91 and separators.
  return /^(\+?91[-\s]?)?[6-9]\d{9}$/.test(value.replace(/[\s-]/g, ""));
}

export interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
  problems: string[];
}

export function passwordStrength(value: string): PasswordStrength {
  const problems: string[] = [];
  if (value.length < 8) problems.push("at least 8 characters");
  if (!/[a-z]/.test(value)) problems.push("a lowercase letter");
  if (!/[A-Z]/.test(value)) problems.push("an uppercase letter");
  if (!/\d/.test(value)) problems.push("a number");

  const score = Math.max(0, 4 - problems.length) as 0 | 1 | 2 | 3 | 4;
  const label =
    value.length === 0
      ? ""
      : score >= 4
        ? "Strong"
        : score === 3
          ? "Good"
          : score === 2
            ? "Weak"
            : "Very weak";
  return { score, label, problems };
}

/**
 * Local-profile implementation. Records who is using this device so the bag
 * and order history can be attributed; it never claims to have verified
 * anything.
 */
export const authService: AuthService = {
  async signIn(email) {
    if (!isValidEmail(email)) {
      return { ok: false, error: "Enter a valid email address.", field: "email" };
    }
    return { ok: true, user: { email: email.trim().toLowerCase() } };
  },

  async register({ name, email, phone }) {
    if (!name.trim()) {
      return { ok: false, error: "Enter your name.", field: "name" };
    }
    if (!isValidEmail(email)) {
      return { ok: false, error: "Enter a valid email address.", field: "email" };
    }
    if (!isValidPhone(phone)) {
      return { ok: false, error: "Enter a valid Indian mobile number.", field: "phone" };
    }
    return {
      ok: true,
      user: { email: email.trim().toLowerCase(), name: name.trim(), phone: phone.trim() },
    };
  },

  async requestPasswordReset() {
    // Nothing can send a reset link without a backend, and saying otherwise
    // would be a lie the shopper acts on.
    return {
      ok: false,
      error:
        "Password reset needs an account server, which isn't connected yet. Call +91 80561 26269 and we'll help.",
    };
  },

  async signOut() {
    /* Nothing server-side to revoke. */
  },
};
