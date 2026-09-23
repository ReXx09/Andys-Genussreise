import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { fetchImportResponse, isRedirectStatus, readLimitedResponse } from '../import-http.js';

describe('HTTP-Rezeptimport', () => {
  it('erkennt HTTP-Redirects', () => {
    assert.equal(isRedirectStatus(301), true);
    assert.equal(isRedirectStatus(302), true);
    assert.equal(isRedirectStatus(200), false);
    assert.equal(isRedirectStatus(400), false);
  });

  it('liest Antworten bis zum Größenlimit', async () => {
    assert.equal(await readLimitedResponse(new Response('Rezept'), 10), 'Rezept');
    await assert.rejects(
      readLimitedResponse(new Response('Zu groß'), 3),
      /response-too-large/
    );
  });

  it('bricht langsame Antworten per Timeout ab', async () => {
    const slowFetch = (_url, options) => new Promise((_resolve, reject) => {
      options.signal.addEventListener('abort', () => reject(options.signal.reason), { once: true });
    });
    await assert.rejects(fetchImportResponse('https://example.com', slowFetch, 5), { name: 'TimeoutError' });
  });
});
