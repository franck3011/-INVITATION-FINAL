export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Something went wrong</title>
<style>
  body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; background: #faf7f2; color: #1a1a1a; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
  .card { max-width: 480px; text-align: center; }
  h1 { font-size: 28px; margin: 0 0 12px; }
  p { color: #555; margin: 0 0 20px; line-height: 1.5; }
  a { display: inline-block; padding: 10px 18px; background: #1a1a1a; color: #fff; border-radius: 999px; text-decoration: none; font-size: 14px; }
</style>
</head>
<body>
  <div class="card">
    <h1>Une erreur est survenue</h1>
    <p>Nous n'avons pas pu charger cette page. Veuillez réessayer dans un instant.</p>
    <a href="/">Retour à l'accueil</a>
  </div>
</body>
</html>`;
}
