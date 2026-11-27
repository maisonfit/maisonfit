import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
test("la page a un titre", () => assert.match(html, /<title>[^<]+<\/title>/));
test("les 6 onglets existent", () => {
  for (const k of ['today', 'week', 'social', 'chat', 'wardrobe', 'account']) assert.ok(html.includes(`${k}:`), `onglet ${k} manquant`);
});
test("les 5 langues sont présentes", () => {
  for (const l of ['en:[[', 'es:[[', 'it:[[', 'de:[[']) assert.ok(html.includes(l), `langue ${l} manquante`);
});
test("le script de l'appli est bien formé", () => {
  const s = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  assert.doesNotThrow(() => new Function(s));
});
