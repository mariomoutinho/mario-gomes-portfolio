import { expect, test } from '@playwright/test';

const steps = [
  {
    label: 'Briefing',
    heading: 'Tudo começa com uma conversa.',
    responsibility: 'CLIENTE + EDITOR',
    position: '0.05',
  },
  {
    label: 'Envio',
    heading: 'Suas gravações chegam até mim.',
    responsibility: 'CLIENTE',
    position: '0.25',
  },
  {
    label: 'Edição',
    heading: 'Cada frame ganha intenção.',
    responsibility: 'EDITOR',
    position: '0.5',
  },
  {
    label: 'Revisão',
    heading: 'Refinamos o resultado.',
    responsibility: 'CLIENTE + EDITOR',
    position: '0.75',
  },
  {
    label: 'Entrega',
    heading: 'Sua história está pronta.',
    responsibility: 'EDITOR',
    position: '0.96',
  },
];

for (const width of [320, 390, 430, 1440]) {
  test(`processo de edição claro e responsivo em ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const section = page.locator('#processo');
    await section.scrollIntoViewIfNeeded();
    await expect(
      section.getByRole('heading', { name: /Você grava\.\s*Eu transformo\./ }),
    ).toBeVisible();
    await expect(
      section.getByText(/A captação das imagens é de responsabilidade do cliente/),
    ).toBeVisible();
    await expect(
      section.getByRole('list', { name: 'Da gravação ao vídeo finalizado' }).getByRole('listitem'),
    ).toHaveCount(3);
    const controls = section.getByRole('group', { name: 'Etapas da edição' });
    await expect(controls.getByRole('button')).toHaveCount(5);
    const playhead = section.locator('[class*="playhead"]');
    for (const [index, step] of steps.entries()) {
      const button = controls.getByRole('button', { name: step.label, exact: true });
      await button.focus();
      await page.keyboard.press('Enter');
      await expect(button).toHaveAttribute('aria-pressed', 'true');
      await expect(section.getByRole('heading', { name: step.heading })).toBeVisible();
      await expect(section.locator('#step-description > span')).toHaveText(
        `0${index + 1} — ${step.responsibility}`,
      );
      expect(
        await playhead.evaluate((node) =>
          (node as HTMLElement).style.getPropertyValue('--position'),
        ),
      ).toBe(step.position);
      await expect(section.locator('#step-description > p')).not.toBeEmpty();
    }
    expect(await playhead.evaluate((node) => getComputedStyle(node).transitionDuration)).toBe('0s');
    if (width < 768) {
      const boxes = await controls.getByRole('button').evaluateAll((nodes) =>
        nodes.map((node) => ({
          y: node.getBoundingClientRect().y,
          height: node.getBoundingClientRect().height,
        })),
      );
      expect(new Set(boxes.map((box) => box.y)).size).toBe(2);
      expect(boxes.every((box) => box.height >= 44)).toBe(true);
    }
    await expect(section.getByRole('heading', { name: 'O que preciso de você?' })).toBeVisible();
    await expect(section.getByText('Arquivos originais da gravação.')).toBeVisible();
    await expect(
      section.getByRole('button', { name: 'Vamos editar seu próximo vídeo.' }),
    ).toBeDisabled();
    await expect(section.getByText('Canal de contato em breve.')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await section.screenshot({ path: testInfo.outputPath(`process-${width}.png`) });
  });
}

test('playhead transita somente após escolha e não avança sozinho', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const section = page.locator('#processo');
  await section.scrollIntoViewIfNeeded();
  const playhead = section.locator('[class*="playhead"]');
  expect(await playhead.evaluate((node) => getComputedStyle(node).transitionDuration)).toBe(
    '0.45s',
  );
  const start = await playhead.evaluate((node) => node.getBoundingClientRect().x);
  await section.getByRole('button', { name: 'Edição', exact: true }).click();
  await expect
    .poll(() => playhead.evaluate((node) => node.getBoundingClientRect().x))
    .toBeGreaterThan(start + 20);
  await page.waitForTimeout(1000);
  await expect(section.getByRole('button', { name: 'Edição', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});
