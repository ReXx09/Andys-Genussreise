import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { isPrivateAddress, validateImportUrl } from '../import-security.js';

describe('Import-Sicherheit', () => {
  it('erkennt private IPv4- und IPv6-Adressen', () => {
    for (const address of ['10.0.0.4', '127.0.0.1', '192.168.1.5', '172.16.0.1', '::1', 'fd00::1', 'fe80::1']) {
      assert.equal(isPrivateAddress(address), true, address);
    }
    assert.equal(isPrivateAddress('8.8.8.8'), false);
  });

  it('blockiert lokale Hosts und nicht erlaubte Schemes', async () => {
    for (const url of ['http://localhost/rezept', 'https://127.0.0.1/rezept', 'http://192.168.1.2', 'file:///tmp/rezept']) {
      assert.equal(await validateImportUrl(url), null, url);
    }
  });

  it('blockiert ungültige URLs', async () => {
    assert.equal(await validateImportUrl('kein gültiger link'), null);
    assert.equal(await validateImportUrl(''), null);
  });
});
