const fs = require('fs');
const path = require('path');

const requiredImages = {
  pizzas: [
    'margherita.jpg',
    'regina.jpg',
    '4-fromages.jpg',
    'diavola.jpg',
    'calzone.jpg',
    'truffe.jpg',
    'burrata.jpg',
    'saumon.jpg',
    'chorizo.jpg',
    'vegetarienne.jpg',
    'chevre-miel.jpg',
    'pesto-rosso.jpg'
  ],
  boissons: [
    'coca-cola.jpg',
    'coca-zero.jpg',
    'sprite.jpg',
    'fanta.jpg',
    'limonade.jpg',
    'orangina.jpg',
    'san-pellegrino.jpg',
    'acqua-panna.jpg',
    'the-peche.jpg',
    'jus-orange.jpg'
  ],
  desserts: [
    'tiramisu.jpg',
    'panna-cotta.jpg',
    'cannoli.jpg',
    'mousse-chocolat.jpg',
    'tarte-citron.jpg',
    'salade-fruits.jpg'
  ],
  accompagnements: [
    'focaccia-ail.jpg',
    'focaccia-romarin.jpg',
    'antipasti.jpg',
    'salade-cesar.jpg',
    'caprese.jpg',
    'arancini.jpg',
    'bruschetta.jpg',
    'frites.jpg'
  ]
};

console.log('🔍 Verifying product images...\n');

let totalMissing = 0;
let totalFound = 0;

Object.keys(requiredImages).forEach(category => {
  const categoryPath = path.join(process.cwd(), 'public', 'images', category);
  const images = requiredImages[category];

  console.log(`\n📁 ${category.toUpperCase()}`);
  console.log('─'.repeat(50));

  if (!fs.existsSync(categoryPath)) {
    console.log(`❌ Folder not found: public/images/${category}`);
    console.log(`   Creating folder...`);
    fs.mkdirSync(categoryPath, { recursive: true });
    totalMissing += images.length;
    images.forEach(img => {
      console.log(`   ❌ ${img}`);
    });
    return;
  }

  const missing = [];
  const found = [];

  images.forEach(imageName => {
    const imagePath = path.join(categoryPath, imageName);
    const alternativeJpg = imagePath.replace('.jpg', '.jpeg');
    const alternativePng = imagePath.replace('.jpg', '.png');

    if (fs.existsSync(imagePath) || fs.existsSync(alternativeJpg) || fs.existsSync(alternativePng)) {
      found.push(imageName);
      console.log(`   ✅ ${imageName}`);
    } else {
      missing.push(imageName);
      console.log(`   ❌ ${imageName}`);
    }
  });

  totalFound += found.length;
  totalMissing += missing.length;

  console.log(`\n   Found: ${found.length}/${images.length}`);
});

console.log('\n' + '='.repeat(50));
console.log(`\n📊 SUMMARY:`);
console.log(`   ✅ Found: ${totalFound} images`);
console.log(`   ❌ Missing: ${totalMissing} images`);
console.log(`   📈 Progress: ${Math.round((totalFound / (totalFound + totalMissing)) * 100)}%`);

if (totalMissing === 0) {
  console.log(`\n🎉 All images are present! Your app is ready to go!`);
} else {
  console.log(`\n📝 Next steps:`);
  console.log(`   1. Check IMAGE_DOWNLOAD_GUIDE.md for download links`);
  console.log(`   2. Download missing images from Unsplash/Pexels`);
  console.log(`   3. Run this script again to verify`);
  console.log(`\n   Or use the placeholder generator:`);
  console.log(`   - Open scripts/generatePlaceholders.html in your browser`);
}

console.log('\n');
