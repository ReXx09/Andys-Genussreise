function isRedirectStatus(status) {
  return status >= 300 && status < 400;
}

function fetchImportResponse(url, fetchImpl = fetch, timeoutMs = 30000) {
  return fetchImpl(url, {
    signal: AbortSignal.timeout(timeoutMs),
    redirect: 'manual',
    headers: { 'User-Agent': 'AndysKochbuchRecipeImporter/1.0' }
  });
}

async function readLimitedResponse(response, maxBytes) {
  if (!response.body) return '';
  const reader = response.body.getReader();
  const chunks = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      throw new Error('response-too-large');
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString('utf8');
}

export { fetchImportResponse, isRedirectStatus, readLimitedResponse };
