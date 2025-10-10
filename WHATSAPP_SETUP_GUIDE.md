# 📱 Guide de Configuration WhatsApp avec Twilio

Ce guide vous explique comment configurer les notifications WhatsApp automatiques pour recevoir les commandes en temps réel.

## 🎯 Objectif

Recevoir automatiquement un message WhatsApp à chaque nouvelle commande avec tous les détails (client, articles, montant, etc.).

---

## 📋 Prérequis

- Un compte Twilio (gratuit pour les tests)
- Un numéro WhatsApp pour recevoir les notifications
- 5-10 minutes de configuration

---

## 🚀 Étape 1 : Créer un Compte Twilio

1. **Allez sur** : https://www.twilio.com/try-twilio
2. **Inscrivez-vous** avec votre email
3. **Vérifiez** votre email et numéro de téléphone
4. **Crédit gratuit** : Vous recevez un crédit gratuit pour tester (~15€)

---

## 🔑 Étape 2 : Obtenir vos Identifiants Twilio

1. **Connectez-vous** à https://console.twilio.com
2. **Sur le dashboard**, vous verrez :
   - **Account SID** (commence par "AC...")
   - **Auth Token** (cliquez sur "Show" pour le voir)
3. **Copiez ces deux valeurs** - vous en aurez besoin plus tard

---

## 📞 Étape 3 : Configurer WhatsApp Sandbox

### Option A : WhatsApp Sandbox (GRATUIT - Pour Tests)

1. **Allez sur** : https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
2. **Suivez les instructions** :
   - Ouvrez WhatsApp sur votre téléphone
   - Ajoutez le numéro Twilio affiché (ex: +1 415 523 8886)
   - Envoyez le message **"join <votre-code>"** (ex: "join pizza-falcon")
   - Vous recevrez une confirmation

3. **Notez le numéro WhatsApp Twilio** (ex: +14155238886)

### Option B : WhatsApp Business API (PAYANT - Pour Production)

Pour la production, vous devrez :
1. Créer un compte WhatsApp Business
2. Vérifier votre entreprise
3. Obtenir l'approbation de Facebook/Meta
4. Coût : ~$0.005 par message

**Recommandation** : Commencez avec le Sandbox gratuit pour tester !

---

## ⚙️ Étape 4 : Configurer les Variables d'Environnement

1. **Ouvrez** le fichier `.env.local` dans votre projet
2. **Ajoutez** les variables suivantes :

```env
# Twilio WhatsApp Configuration
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
RESTAURANT_WHATSAPP_NUMBER=+33601289283
```

3. **Remplacez** les valeurs :
   - `TWILIO_ACCOUNT_SID` : Votre Account SID (de l'étape 2)
   - `TWILIO_AUTH_TOKEN` : Votre Auth Token (de l'étape 2)
   - `TWILIO_WHATSAPP_FROM` : Le numéro WhatsApp Twilio (de l'étape 3)
   - `RESTAURANT_WHATSAPP_NUMBER` : **VOTRE numéro WhatsApp** au format international
     - Exemple : `+33601289283` (France)
     - Format : `+[code pays][numéro sans le 0]`

---

## 📱 Étape 5 : Format du Numéro WhatsApp

### Comment formater votre numéro :

Si votre numéro est **06 01 28 92 83** :

1. Retirez le premier `0`
2. Ajoutez le code pays `+33` pour la France
3. Résultat : `+33601289283`

### Autres pays :
- 🇫🇷 France : `+33` + numéro sans le 0
- 🇧🇪 Belgique : `+32` + numéro sans le 0
- 🇨🇭 Suisse : `+41` + numéro sans le 0
- 🇮🇹 Italie : `+39` + numéro complet
- 🇪🇸 Espagne : `+34` + numéro complet

---

## ✅ Étape 6 : Tester la Configuration

1. **Redémarrez** votre serveur de développement :
   ```bash
   npm run dev
   ```

2. **Passez une commande test** via votre application

3. **Vérifiez** :
   - Dans la console, vous devriez voir : `✅ WhatsApp message sent via Twilio: SM...`
   - Sur WhatsApp, vous recevrez le message de notification

---

## 📊 Exemple de Message Reçu

```
🍕 *NOUVELLE COMMANDE* 🍕

📦 Commande #A1B2C3

👤 Client: Jean Dupont
📞 Tél: 06 12 34 56 78

🛒 Articles:
• 1x Pizza Margherita (12.00€)
• 1x Coca-Cola (3.50€)

🏪 À emporter

💳 Paiement: Espèces

💰 *Total: 15.50€*

---
Via Pizza Falchi App
```

---

## 🔍 Dépannage

### Problème : Pas de message reçu

**Vérifiez** :
1. ✅ Vous avez bien rejoint le Sandbox WhatsApp (étape 3)
2. ✅ Les variables d'environnement sont correctes
3. ✅ Le serveur a été redémarré après modification du `.env.local`
4. ✅ Votre numéro est au bon format : `+33XXXXXXXXX`

### Problème : Erreur Twilio dans la console

**Causes possibles** :
- Account SID ou Auth Token incorrect
- Numéro WhatsApp FROM incorrect
- Crédit Twilio épuisé (vérifiez sur le dashboard)

### Problème : "Twilio credentials not configured"

**Solution** :
- Assurez-vous que les variables `TWILIO_ACCOUNT_SID` et `TWILIO_AUTH_TOKEN` sont dans `.env.local`
- Redémarrez le serveur

---

## 💰 Coûts Twilio

### Sandbox (GRATUIT)
- ✅ Parfait pour le développement et les tests
- ✅ Messages illimités pendant la période de test
- ⚠️ Nécessite que les destinataires rejoignent le sandbox

### Production WhatsApp Business API
- 💰 ~$0.005 par message (0.5 centime)
- 💰 Exemple : 100 commandes/mois = ~0.50€
- ✅ Pas besoin que les clients rejoignent le sandbox
- ✅ Messages professionnels vérifiés

---

## 🚀 Passage en Production

Quand vous serez prêt pour la production :

1. **Upgrade Twilio** :
   - Ajoutez une carte de crédit sur votre compte
   - Demandez l'accès à WhatsApp Business API
   - Vérifiez votre entreprise avec Facebook

2. **Mettez à jour** vos variables d'environnement sur Vercel/votre hébergeur

3. **Testez** avec une vraie commande

---

## 📞 Support

### Ressources Twilio
- 📖 Documentation : https://www.twilio.com/docs/whatsapp
- 💬 Support : https://support.twilio.com
- 🎓 Tutoriels : https://www.twilio.com/docs/whatsapp/quickstart

### Besoin d'aide ?
- Consultez les logs de votre console
- Vérifiez le dashboard Twilio pour les erreurs
- Testez avec le Twilio WhatsApp Sandbox d'abord

---

## ✨ Fonctionnalités Bonus

Une fois configuré, vous pouvez :
- ✅ Recevoir chaque commande en temps réel
- ✅ Voir tous les détails (client, articles, montant)
- ✅ Répondre directement au client via WhatsApp
- ✅ Archiver automatiquement les notifications

---

**🎉 Félicitations ! Vous recevrez maintenant toutes vos commandes directement sur WhatsApp !**
