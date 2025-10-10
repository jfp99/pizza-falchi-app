# SEO & Accessibility Audit - Pizza Falchi

## 🔴 Critical Issues

### Missing SEO Files
- ❌ **No robots.txt** - Search engines can't see crawling rules
- ❌ **No sitemap.xml** - Search engines can't discover all pages
- ❌ **No favicon** - No browser tab icon

### Metadata Issues
- ⚠️ **Generic metadata** - Root layout has basic title/description only
- ❌ **No Open Graph tags** - Poor social media sharing
- ❌ **No Twitter Card tags** - Poor Twitter sharing
- ❌ **No structured data** - Missing Schema.org markup for products

## 🟡 Important Improvements Needed

### SEO
- ❌ Missing canonical URLs
- ❌ No page-specific metadata (menu, about, contact pages)
- ❌ No alt text on some images
- ❌ Missing meta keywords (optional but useful)
- ❌ No language alternates for internationalization

### Accessibility
- ✅ **Good**: Semantic HTML (nav, main, footer, section)
- ✅ **Good**: Language attribute (lang="fr")
- ⚠️ **Issue**: Some buttons/links missing descriptive text
- ⚠️ **Issue**: Color contrast not verified
- ⚠️ **Issue**: No skip-to-content link
- ⚠️ **Issue**: Form labels not always explicit

## ✅ What's Good

1. **Semantic HTML**: Proper use of `<nav>`, `<main>`, `<footer>`, `<section>`
2. **Next.js Image**: Using optimized `<Image>` component
3. **Alt text present**: Images have alt text
4. **Language set**: `lang="fr"` on html element
5. **Mobile-first**: Responsive design with Tailwind

## 📋 Recommendations

### Priority 1 - SEO Essentials
1. Create robots.txt
2. Generate sitemap.xml
3. Add favicon and app icons
4. Add Open Graph metadata
5. Add Twitter Card metadata

### Priority 2 - Enhanced SEO
1. Add page-specific metadata for each route
2. Implement Schema.org structured data for:
   - Restaurant
   - MenuItem
   - Offer
3. Add breadcrumb navigation

### Priority 3 - Accessibility
1. Add skip-to-content link
2. Ensure all interactive elements have clear focus states
3. Add ARIA labels where needed
4. Verify color contrast ratios
5. Test with screen readers

### Priority 4 - Performance
1. Add preconnect for external resources
2. Optimize font loading
3. Add resource hints
