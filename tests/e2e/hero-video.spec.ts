import { expect, test } from '@playwright/test';

test('casamento com capa, reprodução manual, áudio e pausa fora da abertura', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const video = page.locator('#inicio video');
  await expect(video).toBeVisible();
  const bounds = (await video.boundingBox())!;
  expect(bounds.width / bounds.height).toBeCloseTo(16 / 9, 2);
  expect(
    await video.evaluate((node) => new DOMMatrixReadOnly(getComputedStyle(node).transform).b),
  ).toBe(-1);
  for (const label of ['Reproduzir vídeo', 'Ativar som']) {
    const control = (await page.getByRole('button', { name: label, exact: true }).boundingBox())!;
    expect(control.x).toBeGreaterThanOrEqual(bounds.x);
    expect(control.x + control.width).toBeLessThanOrEqual(bounds.x + bounds.width);
    expect(control.y).toBeGreaterThanOrEqual(bounds.y);
    expect(control.height).toBeGreaterThanOrEqual(44);
  }
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

test('controles somem após 3s, reaparecem com toque e ficam acessíveis por teclado', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const video = page.locator('#inicio video');
  const controls = page.locator('#inicio [class*="controls"]');
  await expect(controls).toHaveCSS('opacity', '1');
  await expect(controls).toHaveCSS('opacity', '0', { timeout: 5000 });
  const bounds = (await video.boundingBox())!;
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
  await expect(controls).toHaveCSS('opacity', '0');
  const center = { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 };
  if (await page.evaluate(() => navigator.maxTouchPoints > 0)) {
    await page.touchscreen.tap(center.x, center.y);
  } else {
    await page.mouse.click(center.x, center.y);
  }
  await expect(controls).toHaveCSS('opacity', '1');
  await page.getByRole('button', { name: 'Reproduzir vídeo', exact: true }).click();
  await expect
    .poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime))
    .toBeGreaterThan(0.1);
  await expect(controls).toHaveCSS('opacity', '0', { timeout: 5000 });
  // Tab alcança os controles mesmo enquanto estão visualmente ocultos.
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Ativar som', exact: true })).toBeFocused();
  await expect(controls).toHaveCSS('opacity', '1');
  await page.waitForTimeout(3200);
  await expect(controls).toHaveCSS('opacity', '1');
  await page.keyboard.press('Enter');
  expect(await video.evaluate((node: HTMLVideoElement) => node.muted)).toBe(false);
  await page.keyboard.press('Tab');
  await expect(controls).toHaveCSS('opacity', '0');
});
