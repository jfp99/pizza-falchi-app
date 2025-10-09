/**
 * Image Download Helper Script
 *
 * This script helps you download placeholder images for your products.
 *
 * MANUAL STEPS TO GET IMAGES:
 *
 * 1. For FREE placeholder pizza images, visit:
 *    - Unsplash: https://unsplash.com/s/photos/pizza
 *    - Pexels: https://www.pexels.com/search/pizza/
 *    - Pixabay: https://pixabay.com/images/search/pizza/
 *
 * 2. For drinks (boissons), visit:
 *    - Unsplash: https://unsplash.com/s/photos/drinks
 *    - Pexels: https://www.pexels.com/search/beverages/
 *
 * 3. Save images with these names in the respective folders:
 *
 * PIZZAS (public/images/pizzas/):
 *   - 4-fromages-creme.jpg
 *   - anchois.jpg
 *   - anti-pasti.jpg
 *   - armenienne.jpg
 *   - belzebuth.jpg
 *   - biquette.jpg
 *   - champignon.jpg
 *   - chevre-miel.jpg
 *   - chevre-miel-creme.jpg
 *   - chicken.jpg
 *   - dame-blanche.jpg
 *   - figatelli.jpg
 *   - fromage.jpg
 *   - fruits-mer.jpg
 *   - indienne.jpg
 *   - jambon.jpg
 *   - justine.jpg
 *   - kebab.jpg
 *   - kebab-creme.jpg
 *   - mexicana.jpg
 *   - napoleon.jpg
 *   - nicoise.jpg
 *   - normande.jpg
 *   - orientale.jpg
 *   - pagnol.jpg
 *   - palermo.jpg
 *   - parmesane.jpg
 *   - pistou.jpg
 *   - pizza-moment.jpg
 *   - poivron.jpg
 *   - regina.jpg
 *   - roquefort.jpg
 *   - savoyarde.jpg
 *   - savoyarde-creme.jpg
 *   - tonthon.jpg
 *   - vegetarienne.jpg
 *   - venise.jpg
 *   - viking.jpg
 *
 * BOISSONS (public/images/boissons/):
 *   - coca-cola-bouteille.jpg
 *   - ice-tea-bouteille.jpg
 *   - heineken.jpg
 *   - cristaline.jpg
 *   - chouffe.jpg
 *   - corona.jpg
 *   - perrier.jpg
 *   - vin-blanc.jpg
 *   - vin-rouge.jpg
 *   - vin-rose.jpg
 *   - soft.jpg
 *   - san-miguel.jpg
 *
 * ALTERNATIVE: Use Placeholder Services (Temporary)
 *
 * You can use these URLs directly in your database:
 * - https://via.placeholder.com/400x400/E30613/FFFFFF?text=Pizza
 * - https://via.placeholder.com/400x400/FFD200/1a1a1a?text=Boisson
 *
 * Or use real food images from:
 * - https://source.unsplash.com/400x400/?pizza
 * - https://source.unsplash.com/400x400/?drink
 */

console.log(`
╔════════════════════════════════════════════════════════════════╗
║                    IMAGE DOWNLOAD GUIDE                         ║
╚════════════════════════════════════════════════════════════════╝

Missing images detected. Follow these steps:

1. Visit free image sites:
   • https://unsplash.com/s/photos/pizza
   • https://www.pexels.com/search/pizza/

2. Download and save to:
   • public/images/pizzas/
   • public/images/boissons/
   • public/images/desserts/

3. Or use placeholder URLs in your database (temporary solution)

Run: npm run verify-images
To see which images are still missing.
`);
