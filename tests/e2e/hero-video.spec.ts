import { expect, test } from '@playwright/test';

test('casamento com capa, reprodução manual, áudio e pausa fora da abertura', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const video = page.locator('#inicio video');
  await expect(video).toBeVisible();
  expect(await video.evaluate((node: HTMLVideoElement) => node.paused)).toBe(true);
  expect(await video.evaluate((node: HTMLVideoElement) => node.muted)).toBe(true);
  expect(await video.evaluate((node: HTMLVideoElement) => node.preload)).toBe('none');
  expect(
    await video.evaluate(async (node: HTMLVideoElement) => {
      const poster = new Image();
      poster.src = node.poster;
      await poster.decode();
      return poster.naturalWidth;
    }),
  ).toBe(720);
  await page.getByRole('button', { name: 'Reproduzir vídeo', exact: true }).click();
  await expect
    .poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime))
    .toBeGreaterThan(0.1);
  expect(
    await video.evaluate((node: HTMLVideoElement) => [node.videoWidth, node.videoHeight]),
  ).toEqual([720, 1280]);
  await page.getByRole('button', { name: 'Ativar som', exact: true }).click();
  expect(await video.evaluate((node: HTMLVideoElement) => node.muted)).toBe(false);
  await page.getByRole('button', { name: 'Desativar som', exact: true }).click();
  await page.getByRole('button', { name: 'Pausar vídeo', exact: true }).click();
  expect(await video.evaluate((node: HTMLVideoElement) => node.paused)).toBe(true);
  await page.getByRole('button', { name: 'Reproduzir vídeo', exact: true }).click();
  await page.locator('#sobre').scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate((node: HTMLVideoElement) => node.paused)).toBe(true);
});

test('casamento inicia sem som quando movimento é permitido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const video = page.locator('#inicio video');
  await expect
    .poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime))
    .toBeGreaterThan(0.1);
  expect(await video.evaluate((node: HTMLVideoElement) => node.muted)).toBe(true);
});
