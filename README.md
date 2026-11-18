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
assets/js/config.js     ← The settings file: email signup, contact email, socials
assets/js/main.js       Menu, signup form, social links (no need to edit)
assets/img/             Photos (WebP in 3 sizes + JPG), logo, share image
assets/fonts/           Self-hosted fonts (faster than Google Fonts)
favicon.svg, robots.txt, sitemap.xml
vercel.json / _headers  Hosting settings for Vercel / Cloudflare (caching, clean URLs, www → olglory.com)
```

## Preview it on your computer

The site uses clean web addresses like `/citrus`, so preview it with a tiny local server instead of double-clicking. In this folder, run:

```
npx serve
```

Then open http://localhost:3000. (You need Node.js installed. Vercel and Cloudflare handle all of this automatically once the site is live.)

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
| `newsletterAction` | A form endpoint URL | **Formspree** (free tier), or a Mailchimp/Klaviyo embedded-form endpoint. Until it's set, the form doesn't save anything. |
| `contactEmail` | e.g. `sales@olglory.com` | Turns on the "Wholesale" and "Retail & wholesale inquiries" links. |
| `social` | Full profile URLs | Empty links stay hidden, so add them once you have account access. |


## Common edits

- **Text:** open the `.html` file and edit the words between the tags.
- **Colors and fonts:** change the values at the top of `assets/css/styles.css`.
- **Photos:** each photo exists as `-480.webp`, `-640.webp`, `-900.webp` and a `.jpg`. To swap one, replace all four with files of the same names. Keep descriptive file names like `ol-glory-citrus-energy-drink`; they help image search.
- **FAQ:** the questions live in the homepage `#faq` section **and** in the matching `FAQPage` data in that page's `<head>`. If you edit one, edit the other so they match.
- **New page?** Copy an existing page, change its `<title>`, meta description and canonical URL, and add it to `sitemap.xml`.
- **Remove the 2010 flag story:** in `our-story.html`, delete everything between `===== 2010 FLAG STORY` and `===== END 2010 FLAG STORY`.
- **The logo:** it's built from type plus `assets/img/stripes.svg`, inside every page's `<a class="logo">`. Swap it once the final logo is chosen.

## Before launch checklist

- [ ] Final logo chosen and swapped in
- [ ] Citrus Zero nutrition panel added (it currently reads "coming soon")
- [ ] Confirm the Mixed Berry label matches Citrus. Both currently show the same panel.
- [ ] Permission to use the Don Sessions photo, plus a higher-resolution copy if one exists
- [ ] Client sign-off on keeping the 2010 flag story
- [ ] Signup endpoint, contact email and social URLs added to `config.js`
- [ ] **Privacy policy** page (required once you collect emails). Formspree and Mailchimp both link to policy generators.
- [ ] Test on a phone, and send a test signup

## SEO: what's built in

- A unique title and description on every page, written around real searches ("energy drink", "sugar-free energy drink", "153mg caffeine")
- Structured data: Organization + WebSite on the homepage, Product (brand, size, caffeine; no online offer) + Breadcrumb on each flavor, AboutPage on Our Story, FAQ on the homepage
- Clean URLs, canonical tags, `sitemap.xml` with images, `robots.txt`, and a `noindex` 404 page
- Fast loading on phones: WebP images in three sizes, self-hosted fonts, the hero image preloaded, long-term caching
- Social share image (`ol-glory-energy-drink-share.jpg`) for links on Facebook, X, iMessage and Slack
- Scores at handoff (Lighthouse, mobile): SEO 100, Accessibility 100, Best Practices 100, Performance 95–100

## SEO: after launch (this is where rankings actually come from)

1. **Google Search Console:** verify olglory.com (choose the DNS option), submit `https://olglory.com/sitemap.xml`, and request indexing of the homepage. Do the same in **Bing Webmaster Tools**, which also feeds DuckDuckGo and ChatGPT search.
2. **Social profiles:** once you have the accounts, add their URLs to `config.js` **and** to `"sameAs": []` in the homepage's Organization data. Link back to olglory.com from every profile bio.
3. **Backlinks:** ask distributors, retailers and anyone already selling Ol' Glory online to link to olglory.com. Pitch local Oklahoma media on the relaunch. Don's 2010 flag story already got national coverage, which makes it a strong angle.
4. **Google Business Profile:** set one up only if there's a real business address, such as the Oklahoma City warehouse.
5. **Fresh content:** a "Where to buy" page listing the 42 states, or the actual retailers, will win "near me" searches. Short news posts work too: new flavors, events, retailer launches.
6. **Track it:** check Search Console monthly to see which searches show the site and where it ranks.

> **Selling online later?** The site has no store on purpose. If that changes, the simplest add-on is Stripe Payment Links or Shopify's Buy Button: one button per flavor page, with no rebuild needed.
