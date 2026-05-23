type RateLimitInfo = {
  count: number;
  windowStart: number;
};

const rateLimitStore = new Map<string, RateLimitInfo>();

export async function rateLimit(
  clientId: string,
  options: { windowMs: number; max: number },
): Promise<boolean> {
  const now = Date.now();
  const existing = rateLimitStore.get(clientId);

  if (!existing || now - existing.windowStart >= options.windowMs) {
    rateLimitStore.set(clientId, { count: 1, windowStart: now });
    return false;
  }

  const count = existing.count + 1;
  rateLimitStore.set(clientId, { count, windowStart: existing.windowStart });

  return count > options.max;
}
