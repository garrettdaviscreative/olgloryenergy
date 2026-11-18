# Ol' Glory Energy website (olglory.com)

A plain HTML/CSS/JavaScript site. There's no build step and nothing to install, so it runs on Vercel, Cloudflare Pages, Netlify or GitHub Pages as-is.

## What's in the folder

```
index.html          Homepage
citrus.html         Product page: Citrus
citrus-zero.html    Product page: Citrus Zero
mixed-berry.html    Product page: Mixed Berry
our-story.html      Founder story, 2010 flag fight, memorial
404.html            "Page went AWOL" error page
assets/css/styles.css   All styling. Brand colors and fonts are at the top.
assets/js/config.js     ← The settings file: checkout links, email signup, socials
assets/js/main.js       Menu, buttons, signup form (no need to edit)
assets/img/             Photos and logo stripes
favicon.svg, robots.txt, sitemap.xml, vercel.json
```

## Preview it on your computer

Double-click `index.html` to open it in a browser. Everything works except the signup form.

---

## Put it online

### Option A — GitHub + Vercel (recommended)
1. Create a free GitHub account and a new repository, for example `olglory-site`.
2. Upload the **contents** of this folder. Drag the files in through **Add file → Upload files** on GitHub. `index.html` must sit at the top level of the repo, not inside another folder.
3. Go to vercel.com and sign in with GitHub. Click **Add New → Project** and import the repo.
   - Framework Preset: **Other**. Leave the build command and output directory empty.
4. Click **Deploy**. You'll get a link like `olglory-site.vercel.app`.
5. From then on, every change you push to GitHub redeploys the site automatically.

### Option B — GitHub + Cloudflare Pages
1. Do steps 1–2 above.
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git** and pick the repo.
3. Framework preset: **None**. Leave the build command empty and set the output directory to `/`.
4. Deploy. Cloudflare serves `/our-story` without the `.html` automatically.

### Option C — No GitHub, fastest
- **Vercel:** install the CLI (`npm i -g vercel`), then run `vercel` inside this folder.
- **Cloudflare Pages:** **Create → Pages → Upload assets**, then drag this folder in.

### Connect olglory.com
- **Vercel:** Project → **Settings → Domains** → add `olglory.com` and `www.olglory.com`. Vercel shows the DNS records to add at the registrar where the domain was bought.
- **Cloudflare:** Project → **Custom domains** → add `olglory.com`. If the domain's DNS is already on Cloudflare, this takes about a minute.

---

## Go-live settings (`assets/js/config.js`)

| Setting | What to paste | Where to get it |
|---|---|---|
| `buyLinks` | One checkout URL per flavor | **Stripe → Payment Links**. Create one product per flavor, turn on "let customers adjust quantity," and set up shipping. Until a link is added, the button reads "Online ordering coming soon." |
| `newsletterAction` | A form endpoint URL | **Formspree** (free tier), or a Mailchimp/Klaviyo embedded-form endpoint. Until it's set, the form doesn't save anything. |
| `contactEmail` | e.g. `sales@olglory.com` | Turns on the "Wholesale" and "Retail & wholesale inquiries" links. |
| `social` | Full profile URLs | Empty links stay hidden, so add them once you have account access. |

> **Need a real cart?** Stripe Payment Links handle one flavor per checkout. If customers should mix flavors in one order, switch to the Shopify **Starter** plan and its "Buy Button." The site stays here and only the buttons change.

## Common edits

- **Text:** open the `.html` file and edit the words between the tags.
- **Colors and fonts:** change the values at the top of `assets/css/styles.css`.
- **Photos:** replace a file in `assets/img/` with one of the same name. Keep photos under about 400 KB each.
- **Remove the 2010 flag story:** in `our-story.html`, delete everything between `===== 2010 FLAG STORY` and `===== END 2010 FLAG STORY`.
- **The logo:** it's built from type plus `assets/img/stripes.svg`, inside every page's `<a class="logo">`. Swap it once the final logo is chosen.

## Before launch checklist

- [ ] Final logo chosen and swapped in
- [ ] Citrus Zero nutrition panel added (it currently reads "coming soon")
- [ ] Confirm the Mixed Berry label matches Citrus. Both currently show the same panel.
- [ ] Permission to use the Don Sessions photo, plus a higher-resolution copy if one exists
- [ ] Client sign-off on keeping the 2010 flag story
- [ ] Checkout links, signup endpoint, contact email and social URLs added to `config.js`
- [ ] **Privacy policy** page (required once you collect emails). Add **shipping/returns** and **terms** pages if selling online. Stripe and Formspree both link to policy generators.
- [ ] Test on a phone, place one real test order, then refund it
