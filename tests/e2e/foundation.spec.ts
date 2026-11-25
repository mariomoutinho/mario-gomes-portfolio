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
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow',
    );
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await expect(page.getByRole('button', { name: 'Solicitar orçamento' })).toBeDisabled();
    await page.screenshot({ path: testInfo.outputPath(`landing-${width}.png`), fullPage: true });
    expect(errors).toEqual([]);
  });
}

test('serviço, timeline e pausa de movimento funcionam por teclado', async ({ page }) => {
  await page.goto('/');
  const pause = page.getByRole('button', { name: 'Pausar movimentos decorativos' });
  await pause.click();
  await expect(
    page.getByRole('button', { name: 'Retomar movimentos decorativos' }),
  ).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-motion-paused]')).toHaveAttribute('data-motion-paused', 'true');
  const service = page.getByRole('button', { name: /Edição de vídeo/ });
  await service.focus();
  await page.keyboard.press('Enter');
  await expect(service).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Enter');
  await expect(service).toHaveAttribute('aria-expanded', 'false');
  const playhead = page.locator('[class*="playhead"]');
  const original = await playhead.evaluate((node) => node.getBoundingClientRect().x);
  await page.getByRole('button', { name: /03\s*Revisão/ }).click();
  await expect(page.getByRole('heading', { name: 'Revisão', exact: true })).toBeVisible();
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
  const service = page.getByRole('button', { name: /Edição de vídeo/ });
  await service.click();
  const touchSpot = page.locator('#servicos [class*="spot"]');
  await expect(touchSpot).toHaveAttribute('style', /opacity: 1/);
  await expect(touchSpot).toHaveAttribute('style', /opacity: 0/);
});
