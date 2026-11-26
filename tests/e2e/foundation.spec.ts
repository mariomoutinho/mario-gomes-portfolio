import { expect, test } from '@playwright/test';

for (const width of [320, 360, 375, 390, 430, 768, 1280, 1440]) {
  test(`layout e integridade em ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('response', (response) => {
      if (response.status() >= 400) errors.push(response.url());
    });
    page.on('requestfailed', (request) => errors.push(request.url()));
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Imagens\s*ganham sentido\./);
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await expect(page.getByRole('button', { name: 'Solicitar orçamento' })).toBeDisabled();
    await page.screenshot({ path: testInfo.outputPath(`landing-${width}.png`), fullPage: true });
    expect(errors).toEqual([]);
  });
}

test('timeline funciona por teclado', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#inicio button').filter({ hasText: /movimento/ })).toHaveCount(0);
  const playhead = page.locator('[class*="playhead"]');
  const original = await playhead.evaluate((node) => node.getBoundingClientRect().x);
  await page.getByRole('button', { name: 'Revisão' }).click();
  await expect(
    page.getByRole('heading', { name: 'Refinamos o resultado.', exact: true }),
  ).toBeVisible();
  await expect
    .poll(async () => playhead.evaluate((node) => node.getBoundingClientRect().x))
    .toBeGreaterThan(original);
});

test('menu mobile prende foco, fecha com Escape e ao selecionar um link', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Abrir menu' });
  await trigger.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Shift+Tab');
  expect(
    await page.evaluate(() => document.querySelector('dialog')?.contains(document.activeElement)),
  ).toBe(true);
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page
    .getByRole('navigation', { name: 'Navegação mobile' })
    .getByRole('link', { name: 'Sobre' })
    .click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page).toHaveURL(/#sobre$/);
});

test('movimento reduzido desativa animações ambientais', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(
    await page
      .locator('[class*="ambient"] i')
      .first()
      .evaluate((node) => getComputedStyle(node).animationName),
  ).toBe('none');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('spotlights respeitam a interação disponível', async ({ page }) => {
  await page.goto('/');
  const finePointer = await page.evaluate(
    () => matchMedia('(hover: hover) and (pointer: fine)').matches,
  );
  const spotlight = page.locator('#inicio > [class*="spotlight"]');
  await page.mouse.move(160, 160);
  if (finePointer) await expect(spotlight).toHaveCSS('opacity', '1');
  else await expect(spotlight).toHaveCSS('opacity', '0');
});

test('fotografia profissional preserva enquadramento e respeita redução de movimento', async ({
  page,
}, testInfo) => {
  await page.goto('/');
  const photo = page.getByRole('img', {
    name: 'Retrato em preto e branco de Mário Gomes olhando para o alto.',
  });
  await photo.scrollIntoViewIfNeeded();
  await expect(photo).toBeVisible();
  await expect
    .poll(async () => photo.evaluate((image) => (image as HTMLImageElement).naturalWidth))
    .toBe(791);
  const size = await photo.boundingBox();
  expect(size!.width / size!.height).toBeCloseTo(791 / 788, 2);
  await expect(page.getByText('Fotografia profissional a adicionar.')).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath('portrait-context.png'), fullPage: true });
  await page.locator('#sobre').screenshot({ path: testInfo.outputPath('portrait.png') });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await photo.hover();
  await expect(photo).toHaveCSS('transform', 'none');
});
