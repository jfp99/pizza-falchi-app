echo "🚀 Configuration de Pizza Falchi..."

# Créer la structure des dossiers
mkdir -p src/{app/{api,\(pages\)},components/{layout,menu,cart},hooks,lib,types,models}
mkdir -p public/images

# Installer les dépendances
npm install

echo "✅ Configuration terminée!"
echo "🎯 Démarrer avec: npm run dev"