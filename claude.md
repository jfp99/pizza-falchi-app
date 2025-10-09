# Claude Code - Best Practices & Rules 🚀

This document contains guidelines for efficient collaboration with Claude Code to save tokens and follow good development practices.

---

## 📋 Token Management Rules

### ⚠️ IMPORTANT: Custom Project Rules

### Code Style
- **TypeScript:** Always use interfaces over types
- **Functions:** Prefer arrow functions
- **Line Length:** Maximum 100 characters
- **Quotes:** Use single quotes over double quotes

### Project Rules
- **Images:** All images must be under 500KB
- **Loading States:** Always add loading states for async operations
- **Mobile Testing:** Test on mobile before committing
- **HTML:** Use semantic HTML elements (header, nav, main, section, article, footer)

### Personal Preferences
- **Comments:** Explain complex logic with clear comments
- **Architecture:** Ask before making major architecture changes
- **Git:** Always show me the git diff before committing
- **Naming:** Prefer verbose variable names over short ones (e.g., `userEmail` not `ue`)

### Token Saving Rules
- **Efficiency:** Don't re-explain things I already know
- **Summaries:** Be concise in summaries
- **File Reads:** Only read files when absolutely necessary
- **Task Batching:** Batch related tasks together to minimize back-and-forth

---

## 💡 General Best Practices for Beginners

### 1. **Be Specific in Your Requests**
- ✅ Good: "Add a loading spinner to the menu page while products are fetching"
- ❌ Avoid: "Make it better"

### 2. **Break Down Large Tasks**
- Instead of: "Build a complete checkout system"
- Better:
  1. "Create the checkout page layout"
  2. "Add form validation"
  3. "Integrate payment API"

### 3. **Token Saving Tips**
- Use `Read` tool only when necessary (Claude remembers recent files)
- Be concise in explanations when possible
- Use "/help" command for quick references instead of asking
- Avoid re-reading files that were just edited

### 4. **File Management**
- Keep file structure organized
- Use clear, descriptive file names
- Group related components in folders

### 5. **Git Workflow**
- Commit often with clear messages
- Don't commit sensitive files (.env, credentials)
- Use `.gitignore` properly

---

## 🎯 Project-Specific Guidelines

### Current Project: Pizza Truck App

**Tech Stack:**
- Next.js 15.5.4 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4.0
- MongoDB + Mongoose
- Lucide React (icons)

**Design System:**
- **Brand Colors:**
  - Primary Red: `#E30613`
  - Primary Yellow: `#FFD200`
  - Soft Red: `#F2828B` (for modern UI)
  - Soft Yellow: `#FFE999` (for modern UI)
  - Warm Cream: `#FFF9F0` (backgrounds)

- **Design Principles:**
  - Soft, elegant gradients
  - Glass-morphism effects (backdrop-blur)
  - Rounded corners (rounded-2xl, rounded-3xl)
  - Smooth animations (300-500ms transitions)
  - Hover effects with scale/translate

**File Structure:**
```
app/
  ├── page.tsx              # Homepage
  ├── menu/page.tsx         # Menu page
  ├── about/page.tsx        # About page
  ├── contact/page.tsx      # Contact page
  ├── cart/page.tsx         # Cart page (to build)
  └── api/
      └── products/route.ts # Products API

components/
  ├── layout/
  │   ├── Navigation.tsx    # Header
  │   └── Footer.tsx        # Footer
  ├── menu/
  │   ├── ProductCard.tsx   # Product card
  │   └── CategoryFilter.tsx
  └── cart/
      └── CartSidebar.tsx

lib/
  └── mongodb.ts            # Database connection

models/
  └── Product.ts            # Product schema

public/images/
  ├── pizzas/
  ├── boissons/
  ├── desserts/
  └── accompagnements/
```

---

## 🔧 Development Workflow

### Starting Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run seed         # Seed database with products
npm run verify-images # Check missing images
```

### When Working on Features
1. **Plan First:** Outline the feature requirements
2. **Use Todo List:** Track tasks with TodoWrite tool
3. **Test Incrementally:** Test after each major change
4. **Commit Often:** Small, focused commits

### Code Review Checklist
- [ ] TypeScript types defined
- [ ] Responsive design (mobile-first)
- [ ] Accessibility (ARIA labels, keyboard navigation)
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Consistent styling with design system

---

## 📝 Communication Tips

### Efficient Communication
- "Build X" → Claude creates the feature
- "Fix Y error" → Claude debugs and fixes
- "Optimize Z" → Claude improves performance
- "Add tests for W" → Claude writes tests

### Status Updates
- Ask "What's the current status?" for project overview
- Use "Show me X" to review specific code
- Request "List remaining tasks" to see what's left

### Getting Unstuck
- "I'm seeing error X, help debug"
- "This feature isn't working as expected: [describe]"
- "Can you explain how X works?"

---

## 🎨 Design Consistency

### Always Use Design System Colors
```css
/* Instead of arbitrary colors */
bg-red-500 ❌

/* Use design system */
bg-primary-red ✅
bg-soft-red ✅
```

### Component Patterns
```tsx
// Modern card pattern
<div className="bg-white/70 backdrop-blur rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
  {/* Content */}
</div>

// Button pattern
<button className="bg-gradient-to-r from-primary-red to-soft-red text-white px-10 py-5 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
  Button Text
</button>
```

---

## 🚨 Common Pitfalls to Avoid

1. **Don't commit .env files** → Use .gitignore
2. **Don't hardcode API keys** → Use environment variables
3. **Don't forget error handling** → Always add try/catch
4. **Don't skip TypeScript types** → Define interfaces
5. **Don't ignore mobile responsive** → Test on different sizes

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [React Documentation](https://react.dev)

---

## 🎯 Next Steps

**Phase 2 (Current):**
- [ ] Build cart page
- [ ] Create checkout flow
- [ ] Add payment integration
- [ ] Order confirmation system
- [ ] Order tracking page

**Phase 3:**
- [ ] Product customization (sizes, toppings)
- [ ] Reviews and ratings
- [ ] Special offers/promotions

---

## 💬 Need Help?

- Type `/help` in Claude Code for commands
- Ask Claude to explain any concept
- Request code reviews
- Ask for best practices on specific topics

---

**Remember:** The goal is to build efficiently while learning. Don't hesitate to ask questions or request explanations!

---

## ✨ Your Custom Rules

**Add your specific requirements below this line:**

---
