import { expect, test } from '@playwright/test';

test.use({ launchOptions: { args: ['--autoplay-policy=no-user-gesture-required'] } });

test('botão único central inicia com som e desaparece após 1s', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const video = page.locator('#inicio video');
  const play = page.getByRole('button', { name: 'Reproduzir vídeo com som', exact: true });
  await expect(page.locator('#inicio button')).toHaveCount(1);
  const frame = (await video.boundingBox())!;
  const control = (await play.boundingBox())!;
  expect(frame.width / frame.height).toBeCloseTo(16 / 9, 2);
  expect(control.x + control.width / 2).toBeCloseTo(frame.x + frame.width / 2, 0);
  expect(control.y + control.height / 2).toBeCloseTo(frame.y + frame.height / 2, 0);
  await page.waitForTimeout(1200);
  await expect(play).toHaveCSS('opacity', '1');
  await play.click();
  await expect
    .poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime))
    .toBeGreaterThan(0.1);
  expect(await video.evaluate((node: HTMLVideoElement) => node.muted)).toBe(false);
  const pause = page.getByRole('button', { name: 'Pausar vídeo', exact: true });
  await expect(pause).toHaveCSS('opacity', '0', { timeout: 2500 });
  await video.locator('..').click({ position: { x: frame.width / 4, y: frame.height / 2 } });
  await expect(pause).toHaveCSS('opacity', '1');
  await pause.click();
  expect(await video.evaluate((node: HTMLVideoElement) => node.paused)).toBe(true);
  await play.click();
  await page.locator('#sobre').scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate((node: HTMLVideoElement) => node.paused)).toBe(true);
});

test('autoplay com som bloqueado mantém um botão funcional', async ({ page }) => {
  await page.addInitScript(() => {
    const play = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () {
      if (!navigator.userActivation.isActive)
        return Promise.reject(new DOMException('Autoplay bloqueado', 'NotAllowedError'));
      return play.call(this);
    };
  });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const video = page.locator('#inicio video');
  const play = page.getByRole('button', { name: 'Reproduzir vídeo com som', exact: true });
  await page.waitForTimeout(1200);
  await expect(play).toHaveCSS('opacity', '1');
  expect(await video.evaluate((node: HTMLVideoElement) => node.paused)).toBe(true);
  await play.click();
  await expect
    .poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime))
    .toBeGreaterThan(0.1);
  expect(await video.evaluate((node: HTMLVideoElement) => node.muted)).toBe(false);
});

test('reproduz com áudio e permite pausar por teclado', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const video = page.locator('#inicio video');
  await expect
    .poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime))
    .toBeGreaterThan(0.1);
  expect(await video.evaluate((node: HTMLVideoElement) => node.muted)).toBe(false);
  const pause = page.getByRole('button', { name: 'Pausar vídeo', exact: true });
  await expect(pause).toHaveCSS('opacity', '0', { timeout: 2500 });
  await page.keyboard.press('Tab');
  await pause.focus();
  await expect(pause).toHaveCSS('opacity', '1');
  await page.keyboard.press('Enter');
  expect(await video.evaluate((node: HTMLVideoElement) => node.paused)).toBe(true);
});
