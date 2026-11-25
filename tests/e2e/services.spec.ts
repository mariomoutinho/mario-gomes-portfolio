import { expect, test } from '@playwright/test';

for (const width of [320, 390, 1440]) {
  test(`serviços de ponta a ponta e formatos acessíveis em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const section = page.locator('#servicos');
    const formats = page.getByRole('region', { name: 'Formatos de edição de vídeo' });
    await formats.scrollIntoViewIfNeeded();
    const background = (await section.locator(':scope > div').first().boundingBox())!;
    expect(background.x).toBeCloseTo(0, 0);
    expect(background.width).toBeCloseTo(width, 0);
    await expect(formats.locator('ul').first().locator('li')).toHaveCount(8);
    await expect(formats.locator('ul').last()).toHaveAttribute('inert', '');
    await expect(formats.locator('ul').last()).not.toBeVisible();
    await formats.focus();
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => formats.evaluate((node) => node.scrollLeft)).toBeGreaterThan(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(
      false,
    );
    await expect(section.getByRole('button', { name: /Edição de vídeo/ })).toHaveCount(0);
  });
}

test('esteira de formatos avança, pausa com foco e respeita aba oculta', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const formats = page.getByRole('region', { name: 'Formatos de edição de vídeo' });
  const belt = formats.locator(':scope > div');
  const state = () => belt.evaluate((node) => node.getAnimations()[0]?.playState);
  await formats.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect.poll(state).toBe('running');
  await formats.focus();
  await expect.poll(state).toBe('paused');
  await formats.evaluate((node) => node.blur());
  await expect.poll(state).toBe('running');
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect.poll(state).toBe('paused');
});
