function hashString(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return String(Math.abs(hash));
}

export async function getClientFingerprint(req: Request): Promise<string> {
  const userAgent = req.headers.get('user-agent') ?? '';
  const forwardedFor = req.headers.get('x-forwarded-for') ?? '';
  const acceptLanguage = req.headers.get('accept-language') ?? '';

  const raw = `${userAgent}|${forwardedFor}|${acceptLanguage}`;
  return `fp-${hashString(raw)}`;
}
