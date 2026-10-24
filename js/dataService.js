async function loadJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Impossible de charger ${url}`);
  }

  return response.json();
}

export async function loadAllData() {
  try {
    const [customers, products, orders] = await Promise.all([
      loadJson('./data/customers.json'),
      loadJson('./data/products.json'),
      loadJson('./data/orders.json')
    ]);

    return { customers, products, orders };
  } catch (error) {
    throw new Error(
      'Échec du chargement des données. Vérifiez les fichiers JSON et le serveur local.'
    );
  }
}
