export async function logSecurityEvent(
  event: string,
  details?: Record<string, unknown>,
): Promise<void> {
  const logData = {
    timestamp: new Date().toISOString(),
    event,
    ...details,
  };

  if (typeof console !== 'undefined' && console.info) {
    console.info('[security]', logData);
  }
}
