export type JwtPayload = {
  sub?: string;
  /** Expiry, in seconds since the epoch */
  exp?: number;
};

// Reads a JWT's claims without verifying its signature; only the backend can do that
export function decodeJwtPayload(token: string): JwtPayload | null {
  const payload = token.split(".")[1];
  if (!payload) {
    return null;
  }

  try {
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}
