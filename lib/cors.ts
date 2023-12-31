const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://camjam.d-exclaimation.me",
  "https://camjam.talker.dev",
  "https://camjam-ai.vercel.app",
  "https://pixle.d-exclaimation.me",
  "https://pixle.talker.dev",
  "https://pixle-ai.vercel.app",
  "https://pixle.app",
  "https://global.pixle.app",
  "https://alpha.pixle.app",
  "https://beta.pixle.app",
  "https://canary.pixle.app",
  "https://experimental.pixle.app",
];

export function cors(req: Request): Record<string, string> {
  const origin = req.headers.get("Origin");
  if (
    !origin ||
    ALLOWED_ORIGINS.findIndex((allowed) => allowed.startsWith(origin)) === -1
  ) {
    return {};
  }
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, X-Authorization",
  };
}

export function json(req: Request, body: unknown, init?: ResponseInit) {
  return Response.json(body, {
    ...init,
    headers: {
      ...cors(req),
      ...(init?.headers ?? {}),
    },
  });
}
