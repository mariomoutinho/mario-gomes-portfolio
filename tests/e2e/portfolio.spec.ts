import { expect, test, type Page } from '@playwright/test';

async function openPortfolio(page: Page) {
  await page.goto('/');
  await page.locator('#portfolio-title').scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
}
async function animationState(page: Page, id: string) {
  return page.locator(`#${id} > div`).evaluate((belt) => {
    const animation = belt.getAnimations()[0];
    const timing = animation?.effect?.getTiming();
    return {
      state: animation?.playState ?? 'none',
      time: Number(animation?.currentTime ?? 0),
      duration: Number(timing?.duration ?? 0),
      direction: timing?.direction,
      width: belt.firstElementChild!.getBoundingClientRect().width,
      x: new DOMMatrixReadOnly(getComputedStyle(belt).transform).m41,
    };
  });
}
for (const width of [320, 390, 430, 768, 1440]) {
  test(`portfólio full-bleed e imagens em ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await openPortfolio(page);
    await expect(page.getByRole('heading', { name: 'Histórias em movimento.' })).toBeVisible();
    expect(await page.locator('#trabalhos button[class*="card"]').count()).toBeGreaterThanOrEqual(
      14,
    );
    await expect(page.locator('#trabalhos').getByRole('button', { name: /^Ampliar/ })).toHaveCount(
      13,
    );
    await expect(page.locator('#trabalhos [data-category]')).toHaveCount(5);
    await expect(
      page.locator('#trabalhos').getByRole('button', { name: 'Reproduzir Casamento', exact: true }),
    ).toHaveCount(1);
    for (const id of ['wedding-film', 'xv-anos']) {
      await expect(page.locator(`#portfolio-${id} [data-orientation='portrait']`)).toHaveCount(0);
    }
    for (const id of ['after-movie', 'cultural', 'corporativo-institucional']) {
      expect(
        await page.locator(`#portfolio-${id} [data-orientation='portrait']`).count(),
      ).toBeGreaterThan(0);
      expect(
        await page.locator(`#portfolio-${id} [data-orientation='landscape']`).count(),
      ).toBeGreaterThan(0);
    }
    const landscape = (await page.locator('#portfolio-wedding-film button').first().boundingBox())!;
    expect(landscape.width / landscape.height).toBeCloseTo(16 / 9, 2);
    const portrait = (await page
      .locator('#portfolio-after-movie [data-orientation="portrait"] button')
      .first()
      .boundingBox())!;
    expect(portrait.width / portrait.height).toBeCloseTo(9 / 16, 2);
    expect(portrait.height).toBe(width >= 1024 ? 240 : 180);
    await page.locator('#trabalhos img').evaluateAll((images) =>
      images.forEach((image) => {
        (image as HTMLImageElement).loading = 'eager';
      }),
    );
    await expect
      .poll(async () =>
        page
          .locator('#trabalhos img')
          .evaluateAll((images) =>
            images.every(
              (image) =>
                (image as HTMLImageElement).complete &&
                (image as HTMLImageElement).naturalWidth > 0,
            ),
          ),
      )
      .toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    expect(await page.locator('#trabalhos video').count()).toBe(0);
    await page
      .locator('#trabalhos')
      .screenshot({ path: testInfo.outputPath(`marquee-${width}.png`) });
  });
}

test('velocidade, sentidos opostos e continuidade', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1400 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await openPortfolio(page);
  await page
    .locator('#portfolio-wedding-film')
    .evaluate((node) => window.scrollTo(0, node.getBoundingClientRect().top + scrollY - 120));
  const top = 'portfolio-wedding-film';
  const bottom = 'portfolio-xv-anos';
  await expect.poll(async () => (await animationState(page, top)).state).toBe('running');
  for (const [id, speed, direction] of [
    [top, 30, 'normal'],
    [bottom, 30, 'reverse'],
  ] as const) {
    const before = await animationState(page, id);
    expect(before.direction).toBe(direction);
    expect(before.width / (before.duration / 1000)).toBeCloseTo(speed, 2);
    await page.locator(`#${id} > div`).evaluate((belt) => {
      const a = belt.getAnimations()[0]!;
      a.currentTime = Number(a.effect!.getTiming().duration) - 100;
    });
    const atSeam = await animationState(page, id);
    await page.waitForTimeout(250);
    const after = await animationState(page, id);
    const displacement =
      ((((after.x - atSeam.x + before.width / 2) % before.width) + before.width) % before.width) -
      before.width / 2;
    expect(Math.abs(displacement)).toBeLessThan(30);
    expect(direction === 'reverse' ? displacement : -displacement).toBeGreaterThan(0);
  }
  const fine = await page.evaluate(() => matchMedia('(hover: hover) and (pointer: fine)').matches);
  if (fine) {
    const rect = (await page.locator(`#${top}`).boundingBox())!;
    await page.mouse.move(rect.x + 100, rect.y + 60);
    await expect.poll(async () => (await animationState(page, top)).state).toBe('paused');
    await expect.poll(async () => (await animationState(page, bottom)).state).toBe('running');
    await page.mouse.move(0, 0);
    await expect.poll(async () => (await animationState(page, top)).state).toBe('running');
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect
    .poll(async () => {
      const state = await animationState(page, top);
      return state.width / (state.duration / 1000);
    })
    .toBeCloseTo(30, 2);
  await expect(page.getByRole('button', { name: /^(Pausar|Retomar) movimento$/ })).toHaveCount(0);
  await expect(
    page.getByText('Imagens ilustrativas para apresentar a composição visual.'),
  ).toHaveCount(0);
});

test('ampliação acessível, Escape e restauração do foco sem players duplicados', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openPortfolio(page);
  const card = page.getByRole('button', { name: 'Ampliar Presença, imagem ilustrativa' });
  await card.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog', { name: 'Presença' })).toBeVisible();
  await expect(
    page.getByText('Referência de composição visual. Não é um trabalho de Mário Gomes.'),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Fechar visualização' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(card).toBeFocused();
  expect(await page.locator('#trabalhos video').count()).toBe(0);
  await expect(page.locator('#portfolio-wedding-film > div > div')).toHaveCount(1);
  await expect(page.locator('#portfolio-xv-anos > div > div')).toHaveCount(1);
});

test('exploração manual retoma da posição atual e preserva rolagem vertical', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await openPortfolio(page);
  const id = 'portfolio-wedding-film';
  const viewport = page.locator(`#${id}`);
  await viewport.scrollIntoViewIfNeeded();
  await viewport.focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(async () => (await animationState(page, id)).state).toBe('none');
  const position = await viewport.evaluate((node) => node.scrollLeft);
  await expect
    .poll(async () => (await animationState(page, id)).state, { timeout: 6000 })
    .toBe('running');
  const resumed = await animationState(page, id);
  const offset = await viewport.evaluate((node) => node.scrollLeft);
  const beforePhase =
    (((position - resumed.width) % resumed.width) + resumed.width) % resumed.width;
  const afterPhase =
    (((offset - resumed.x - resumed.width) % resumed.width) + resumed.width) % resumed.width;
  expect(
    Math.min(
      Math.abs(afterPhase - beforePhase),
      resumed.width - Math.abs(afterPhase - beforePhase),
    ),
  ).toBeLessThan(35);
  const oldY = await page.evaluate(() => scrollY);
  await viewport.hover();
  await page.mouse.wheel(0, 200);
  await expect.poll(async () => page.evaluate(() => scrollY)).toBeGreaterThan(oldY);
});

test('fora da viewport e página oculta interrompem as esteiras', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await openPortfolio(page);
  await page.locator('#portfolio-wedding-film').scrollIntoViewIfNeeded();
  await expect
    .poll(async () => (await animationState(page, 'portfolio-wedding-film')).state)
    .toBe('running');
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect
    .poll(async () => (await animationState(page, 'portfolio-wedding-film')).state)
    .toBe('paused');
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: false });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect
    .poll(async () => (await animationState(page, 'portfolio-wedding-film')).state)
    .toBe('running');
  await page.locator('#contato').scrollIntoViewIfNeeded();
  await expect
    .poll(async () => (await animationState(page, 'portfolio-wedding-film')).state)
    .toBe('paused');
});

test('gesto de toque horizontal explora e gesto vertical rola a página', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await openPortfolio(page);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 1 });
  const track = page.locator('#portfolio-wedding-film');
  await track.scrollIntoViewIfNeeded();
  const box = (await track.boundingBox())!;
  const y = Math.max(120, box.y + 100);
  const before = await track.evaluate(
    (node) =>
      node.scrollLeft -
      new DOMMatrixReadOnly(getComputedStyle(node.firstElementChild!).transform).m41,
  );
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 300, y }] });
  for (const x of [280, 240, 190, 140, 90]) {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y }] });
    await page.waitForTimeout(30);
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect
    .poll(async () => track.evaluate((node) => node.scrollLeft))
    .toBeGreaterThan(before + 50);
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect
    .poll(async () => (await animationState(page, 'portfolio-wedding-film')).state, {
      timeout: 7000,
    })
    .toBe('running');
  const oldY = await page.evaluate(() => scrollY);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 200, y }] });
  for (const shift of [20, 50, 90, 130]) {
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: 200, y: y - shift }],
    });
    await page.waitForTimeout(30);
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect.poll(async () => page.evaluate(() => scrollY)).toBeGreaterThan(oldY + 30);
  await cdp.detach();
});

test('Wedding Film abre o casamento real na orientação correta', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openPortfolio(page);
  const card = page.getByRole('button', { name: 'Reproduzir Casamento', exact: true });
  await card.click();
  const dialog = page.getByRole('dialog', { name: 'Casamento', exact: true });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Reproduzir vídeo com som', exact: true }).click();
  await expect
    .poll(() => dialog.locator('video').evaluate((node: HTMLVideoElement) => node.currentTime))
    .toBeGreaterThan(0.1);
  expect(
    await dialog
      .locator('video')
      .evaluate((node) => new DOMMatrixReadOnly(getComputedStyle(node).transform).b),
  ).toBe(-1);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(card).toBeFocused();
});

test('cada categoria começa a se mover ao entrar na tela do celular', async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, 'Verificação de rolagem em tela sensível ao toque.');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await openPortfolio(page);
  for (const id of [
    'portfolio-wedding-film',
    'portfolio-xv-anos',
    'portfolio-after-movie',
    'portfolio-cultural',
    'portfolio-corporativo-institucional',
  ]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await expect.poll(async () => (await animationState(page, id)).state).toBe('running');
    const before = await animationState(page, id);
    await expect
      .poll(async () => Math.abs((await animationState(page, id)).x - before.x))
      .toBeGreaterThan(10);
  }
});
