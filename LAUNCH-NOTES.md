# Launch notes: Trio Restaurant & Lounge

Everything below must be confirmed with the owner before the site goes live. Items are shown on the site now, so a "no" means a copy change.

## 1. Facts to confirm

### Hours and policies
- [ ] **Hours:** Tue 11 AM–9 PM · Wed–Thu 12–9 PM · Fri–Sat 12 PM–1 AM · Sun 12–5 PM · Mon closed. (From the Instagram bio; Sunday hours from Restaurantji.) Also update the `HOURS` array in `assets/js/site.js` if anything changes.
- [ ] **Kid-friendly until 6 PM** (from Restaurantji).
- [ ] **Age limits:** "some events are 21+ or 30+", Saturday Ladies Night listed as 30+.
- [ ] **Parking available** at the restaurant (from a listing). Shown in quick facts, FAQ, visit page and JSON-LD `amenityFeature`.
- [ ] **Walk-ins welcome** during regular hours (home FAQ answer). Not stated in any source; confirm or reword.
- [ ] **Cover / seating deposit:** site says "Some event nights have a cover or seating deposit" (Toast lists $5 reservation seating deposit and $5 door charge).
- [ ] **Text messages:** the Visit page has a "Text (804) 298-3775" link (`sms:`). Confirm the number accepts texts, or remove that tile.
- [ ] **Hookah:** mentioned from the flyers ("Food • Drinks • Hookah"). Confirm it is still offered.
- [ ] **Cigar room / cigars sold in-house** (Visit Richmond description + Toast).

### Ratings and reviews
- [ ] **Google 4.4 stars (380 reviews):** shown in the hero, reviews section, `llms.txt`, and as `aggregateRating` in the home page JSON-LD. Update the numbers at launch; if the owner prefers, remove the `aggregateRating` block (Google may ignore self-published ratings).
- [ ] **DoorDash 4.5 stars (1,000+ ratings).**
- [ ] Review quotes are verbatim and attributed: Alana R. (Uber Eats), Jewell B., Matthew D. (Uber Eats), and a partial DoorDash review ("Best fried pork chops"). Get the owner's OK to feature them.

### Events (schedules change)
- [ ] Weekly lineup from Trio's "TRiO Weekly Events" flyer: DJs/hosts (MC Choco, DJ Drake, DJ Rell Miles, DJ MG, DJ K Dogg), happy hour times, Ladies Night Out with KISS 105.7 (9 PM–1 AM, ladies free, 30+), Sunday Game Day (football season). Confirm each is still current and that KISS 105.7 is OK to name.
- [ ] Thursday: Lemon Drop Flight $20 (3 flavors, 5:30–8 PM). Events page also mentions past "Tipsy Thursdays" ($4 margaritas, $25 margarita flights) as a rotating special. Confirm or remove.
- [ ] "Back to the Band" live music series with Funkmotor Entertainment, and the All White party with LB&C Band live. Confirm these are OK to reference as recurring.
- [ ] Tuesday "Tasteful Tuesdays" wine tasting was intentionally left off (announced as coming soon).
- [ ] Schema: `events.html` carries Event JSON-LD with weekly `eventSchedule` times. Update if nights change.

### Menu and prices
- [ ] Menu and prices are from Toast in-house pricing fetched 2026-09-26. Confirm current prices.
- [ ] "Guest favorite" tags mark the dishes most praised in reviews (pork chops, fried catfish, wingettes, turkey wings, crab cakes, seafood platter, mac & cheese, collards, candied yams). Confirm the owner is happy with them.
- [ ] Lavender Lemon Drop is listed with "Ask" instead of a price. Add the price if they want it shown.
- [ ] Patrón bottle service $250 (Toast). Confirm, and whether other bottles should be listed.
- [ ] Price range in schema is set to "$11–$35", taken from the menu.
- [ ] Menu copy says baskets and sandwiches come with fries (from Toast). Confirm entrée/dinner side inclusions if they want that stated.

### Ordering and links
- [ ] **Toast online ordering is currently switched off.** The site still has "Order pickup" buttons (menu hero, footer, quick facts, Visit page, FAQ) linking to https://order.toasttab.com/online/trio-smb-pos-3817-hull-street-road. Turn online ordering on in Toast before launch, or remove those links.
- [ ] DoorDash store link: https://www.doordash.com/store/trio-restaurant-&-lounge-richmond-1803823/
- [ ] Socials: Instagram @triorestaurantnloungerva, TikTok @triorva7, Facebook page (linked). Confirm these are the accounts they want featured.
- [ ] No email address was available, so none is shown. Add one to the footer, Visit page and JSON-LD if they have one.

### Things the site deliberately does NOT claim
No brunch, private-event packages, dress code, owner names, awards, founding year, or "Black-owned" (one reviewer said it; not verified). Add any of these only if the owner confirms them.

## 2. Photo credits and licensing
All photos come from Trio's own public Instagram and Facebook posts and must be **approved or licensed by the owner** before launch:
- Crowd and lounge photos: `lounge-crowd`, `crowd-toast`, `guest-celebrating`, `lounge-ladies-night`, `lounge-night`. These show identifiable guests; the owner should confirm they have permission to use them on the website.
- Food and drink cards (Trio's branded "Signature Dishes" graphics): `sweet-chili-jumbo-wings`, `catfish-dinners`, `philly-cheesesteak`, `seafood-salad`, `potato-salad`, `lavender-lemon-drop`, `bologna-burger`, `cocktails-pair`, `cocktail-bar`.
- Cropped derivatives made for this site (branded frame removed): `plate-wings`, `plate-catfish-fried`, `plate-catfish-grilled`, `plate-philly`, `plate-seafood-salad`, `plate-potato-salad`, `plate-bologna`, `drink-lavender`, `cocktail-glass`.
- Logo: `logo-trio.webp` (cropped from a flyer) and `logo-trio-alpha.webp` (background removed for the dark header). Ask for the original vector logo file for a crisper header, favicon and OG image.
- `og.jpg` (social share image) and favicons were generated for this site from the logo and `lounge-crowd`.

## 3. Items to swap or upgrade
- [ ] Original logo file (SVG/AI/PDF) to replace the flyer-cropped logo.
- [ ] Higher-resolution food photos. Several are small social-media exports (the wings and bologna burger crops are soft at large sizes). A 1–2 hour food and interior shoot would lift the site noticeably.
- [ ] A dedicated photo for Tuesday lunch and for Sunday Game Day (currently a Philly cheesesteak and a lounge group photo).
- [ ] Holiday hours: the Visit page says "Holiday hours may vary; Trio posts updates on Instagram."
- [ ] Remove unused reference images before launch if desired: `weekly-events-flyer.webp`, `weekend-plans-flyer*.webp`, `logo-board.webp`, `cocktail-bar*.webp`.

## 4. Domain and launch
- **Proposed domain:** `triorva.com` (short, matches the TikTok handle). Alternatives: `triorestaurantrva.com`, `triorestaurantandlounge.com`.
- Deploy on Netlify (see README). No forms on this site, so no Netlify Forms setup is needed.
- After launch: add the URL to the Google Business Profile, Instagram/TikTok/Facebook bios and DoorDash; submit the sitemap in Google Search Console and Bing Webmaster Tools.


## Live preview domain (updated 27 Sep 2026)
The site is live at https://trio-restaurant-lounge-website.netlify.app/ and every canonical URL, Open Graph/Twitter tag, JSON-LD URL, sitemap.xml, robots.txt and llms.txt now points there, so text-message and social link previews show this address.
When the owner's own domain (triorva.com) is connected in Netlify, find-and-replace `trio-restaurant-lounge-website.netlify.app` with `triorva.com` across the .html/.xml/.txt/.toml files, then redeploy.
