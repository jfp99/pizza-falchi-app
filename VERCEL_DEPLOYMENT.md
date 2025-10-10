# 🚀 Vercel Deployment Guide - Pizza Falchi

Complete step-by-step guide to deploy your Pizza Falchi application to Vercel.

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure you have:

- [x] MongoDB Atlas database set up and accessible
- [x] All environment variables ready (see `.env.example`)
- [x] GitHub repository pushed with latest changes
- [x] Twilio account for WhatsApp notifications (optional but recommended)
- [x] Stripe account for online payments (optional)

---

## 📋 Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Sign up with your GitHub account
4. Authorize Vercel to access your repositories

---

## 📦 Step 2: Import Project

1. From your Vercel dashboard, click **"Add New Project"**
2. Select **"Import Git Repository"**
3. Find and select your `pizza-falchi-app` repository
4. Vercel will automatically detect it's a Next.js project
5. Click **"Import"**

---

## 🔐 Step 3: Configure Environment Variables

In the Vercel project settings, add the following environment variables:

### Required Variables

```bash
# Database
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/pizza-falchi?retryWrites=true&w=majority

# Authentication
NEXTAUTH_SECRET=your-secure-random-string-minimum-32-characters
NEXTAUTH_URL=https://your-app-name.vercel.app
```

### Optional but Recommended

```bash
# WhatsApp Notifications (Twilio)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
RESTAURANT_WHATSAPP_NUMBER=+33601289283

# Stripe Online Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
```

### How to Add Environment Variables in Vercel:

1. Go to your project in Vercel
2. Click **Settings** → **Environment Variables**
3. Add each variable with:
   - **Key**: Variable name (e.g., `MONGODB_URI`)
   - **Value**: Your actual value
   - **Environment**: Select **Production**, **Preview**, and **Development**
4. Click **"Save"**

---

## 🔧 Step 4: Configure Build Settings

Vercel should auto-detect these settings, but verify:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

---

## 🚀 Step 5: Deploy

1. After configuring environment variables, click **"Deploy"**
2. Wait 2-3 minutes for the build to complete
3. Once deployed, you'll get a URL like: `https://your-app-name.vercel.app`

---

## ✅ Step 6: Post-Deployment Verification

Test these critical features:

### 1. Homepage & Navigation
- [ ] Homepage loads correctly
- [ ] Navigation menu works
- [ ] Footer displays properly

### 2. Menu & Products
- [ ] Menu page displays all pizzas
- [ ] Category filters work
- [ ] Product cards display correctly
- [ ] Combo/Package deals appear
- [ ] Combo selection modal works

### 3. Cart & Checkout
- [ ] Add items to cart
- [ ] Cart sidebar opens/closes
- [ ] Update quantities in cart
- [ ] Remove items from cart
- [ ] Proceed to checkout
- [ ] Fill delivery information
- [ ] Payment method selection works

### 4. Order Placement
- [ ] Place order successfully
- [ ] Order confirmation page displays
- [ ] Check if order appears in admin panel

### 5. Admin Panel
- [ ] Login to admin: `admin@pizzafalchi.com` / `PizzaFalchi2024!`
- [ ] View dashboard statistics
- [ ] View all orders
- [ ] Update order status
- [ ] Test WhatsApp notification (if Twilio configured)
- [ ] View customers page
- [ ] View products page

### 6. WhatsApp Notifications (if configured)
- [ ] Create a test order
- [ ] Mark order as "ready" in admin
- [ ] Click "Notifier client" button
- [ ] Verify WhatsApp message received

### 7. Mobile Responsiveness
- [ ] Test on mobile device (iPhone/Android)
- [ ] Test combo modal on mobile
- [ ] Test admin buttons on mobile
- [ ] Test cart on mobile

---

## 🌐 Step 7: Custom Domain (Optional)

To use your own domain (e.g., `pizzafalchi.com`):

1. Go to **Project Settings** → **Domains**
2. Click **"Add"**
3. Enter your domain name
4. Follow DNS configuration instructions:
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or add A record for the provided IP
5. Wait for DNS propagation (can take up to 48 hours)
6. **IMPORTANT**: Update `NEXTAUTH_URL` environment variable to your new domain:
   ```
   NEXTAUTH_URL=https://pizzafalchi.com
   ```
7. Redeploy the project for changes to take effect

---

## 🔄 Automatic Deployments

Vercel automatically deploys when you push to GitHub:

- **Push to `main` branch**: Deploys to production
- **Push to other branches**: Creates preview deployments
- **Pull requests**: Creates preview deployments with unique URLs

---

## 📊 Monitoring & Logs

### View Deployment Logs
1. Go to your project in Vercel
2. Click **Deployments**
3. Select a deployment
4. View **Build Logs** and **Function Logs**

### Analytics (Available on Pro Plan)
- Page views
- User traffic
- Performance metrics
- Top pages

---

## 🗄️ Database Seeding

After first deployment, seed your database:

### Option 1: Use MongoDB Compass
1. Connect to your Atlas database
2. Import products from `scripts/seedProducts.ts` data

### Option 2: Run Seed Scripts Locally
```bash
# Ensure .env.local has production MONGODB_URI
npm run seed:atlas        # Seed products
npm run seed:admin        # Create admin users
```

---

## 🐛 Troubleshooting

### Build Fails
- Check **Build Logs** in Vercel dashboard
- Verify all environment variables are set
- Ensure no TypeScript errors: `npm run build` locally

### Database Connection Issues
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for Vercel)
- Ensure database user has read/write permissions

### Authentication Not Working
- Verify `NEXTAUTH_SECRET` is set (minimum 32 characters)
- Check `NEXTAUTH_URL` matches your deployment URL
- Clear browser cookies and try again

### WhatsApp Notifications Not Sending
- Verify all Twilio environment variables are set
- Check Twilio console for error logs
- Ensure phone numbers are in correct format (+33...)
- Verify Twilio WhatsApp sandbox is active (for testing)

### Orders Not Appearing
- Check MongoDB connection in logs
- Verify `Order` model is correctly configured
- Check API route logs in Vercel Functions

---

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit `.env.local` to Git
2. **Admin Passwords**: Change default admin password after deployment
3. **MongoDB**: Restrict IP access in Atlas (whitelist Vercel IPs or use `0.0.0.0/0`)
4. **API Keys**: Use production keys for Stripe and Twilio in production
5. **HTTPS**: Vercel provides automatic HTTPS - always enabled
6. **Rate Limiting**: Consider adding rate limiting for API routes (future enhancement)

---

## 💰 Pricing

### Vercel Free Tier Includes:
- Unlimited deployments
- Automatic HTTPS/SSL
- Global CDN
- 100GB bandwidth/month
- Serverless functions

### Considerations for Growth:
- **Pro Plan** ($20/month): More bandwidth, analytics, team features
- **Enterprise**: Custom pricing for high-traffic sites

### MongoDB Atlas Free Tier:
- 512 MB storage
- Shared cluster
- Should handle hundreds of orders/month

### Twilio WhatsApp:
- Pay-as-you-go
- ~$0.005 per message
- Free trial credit available

---

## 📞 Support & Resources

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **MongoDB Atlas**: [mongodb.com/docs/atlas](https://www.mongodb.com/docs/atlas/)
- **Twilio Support**: [twilio.com/console](https://www.twilio.com/console)

---

## 🎉 You're Ready!

Your Pizza Falchi application is now live on Vercel!

**Production URL**: `https://your-app-name.vercel.app`

**Next Steps**:
1. Share the URL with your team
2. Test all features thoroughly
3. Monitor error logs in first 24 hours
4. Gather user feedback
5. Consider adding real product images
6. Set up monitoring/alerts (Vercel Monitoring or external service)

---

## 📝 Maintenance Checklist

### Daily
- [ ] Check for new orders in admin panel
- [ ] Monitor error logs in Vercel

### Weekly
- [ ] Review customer analytics
- [ ] Check database storage usage
- [ ] Verify all features working correctly

### Monthly
- [ ] Update dependencies: `npm update`
- [ ] Review and optimize slow queries
- [ ] Check Vercel and MongoDB billing
- [ ] Backup database (MongoDB Atlas automatic backups)

---

**Generated with Claude Code** 🤖

Need help? Check the `DEPLOYMENT_PLAN.md` and `WHATSAPP_SETUP_GUIDE.md` for additional guidance.
