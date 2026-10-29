const SESSION_LENGTH_IN_SECONDS = 7 * 24 * 60 * 60;

function base64Url(value: object) {
  return btoa(JSON.stringify(value))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// An unsigned JWT shaped like the backend's, so the app can read its subject and expiry
export function issueFakeJwt(userId: string) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_LENGTH_IN_SECONDS;
  return [
    base64Url({ alg: "none", typ: "JWT" }),
    base64Url({ sub: userId, exp }),
    "fake-signature",
  ].join(".");
}
