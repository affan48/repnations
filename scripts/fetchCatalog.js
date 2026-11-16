import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchAll() {
  console.log('Fetching products from https://repnations.com/products.json?limit=250 ...');
  try {
    const res = await fetch('https://repnations.com/products.json?limit=250');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    console.log(`Successfully fetched ${data.products.length} products!`);

    const colRes = await fetch('https://repnations.com/collections.json');
    let collections = [];
    if (colRes.ok) {
      const colData = await colRes.json();
      collections = colData.collections || [];
      console.log(`Successfully fetched ${collections.length} collections!`);
    }

    const outDir = path.resolve(__dirname, '../src/data');
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(outDir, 'shopifyCatalog.json'),
      JSON.stringify({ products: data.products, collections }, null, 2)
    );
    console.log('Saved to src/data/shopifyCatalog.json');
  } catch (err) {
    console.error('Error fetching catalog:', err);
  }
}

fetchAll();
