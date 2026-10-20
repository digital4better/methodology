async (page) => {
  const cases = ['environnements/parc-informatique', 'environnements/infrastructure-d-hebergement', 'environnements/cloud', 'services/service-web', 'services/mail', 'services/mobile', 'services/ia-generative'];
  const checks = [], errors = [];
  const onError = error => errors.push(error.message);
  page.on('pageerror', onError);
  try {
    for (const locale of ['fr', 'en']) {
      for (const width of [390, 1024, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        for (const path of cases) {
          await page.goto(`http://localhost:3016/methodology/${locale === 'en' ? 'en/' : ''}v2-beta/cas-d-usage/${path}`);
          await page.locator('.inline-example > summary').click();
          await page.locator('.scenario').waitFor();
          const state = await page.evaluate(() => ({
            width: document.documentElement.clientWidth,
            scrollWidth: document.body.scrollWidth,
            invalid: /NaN|Infinity/.test(document.querySelector('.scenario').textContent),
            removedActions: [...document.querySelectorAll('.scenario button')].filter(button => /scénario A|scenario A|Exporter|Export/.test(button.textContent)).length,
            freeText: document.querySelectorAll('.scenario textarea, .scenario input[type="text"]').length,
          }));
          checks.push({ locale, width, path, ...state, pass: state.scrollWidth <= state.width + 1 && !state.invalid && state.removedActions === 0 && state.freeText === 0 });
        }
      }
    }
  } finally { page.off('pageerror', onError); }
  return { checked: checks.length, failures: checks.filter(check => !check.pass), errors, checks };
}
