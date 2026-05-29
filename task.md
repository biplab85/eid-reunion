# Task — ধোপাদী মাধ্যমিক বিদ্যালয় | Eid Reunion 2026 Website

> Project: **dhopadi** (located in WAMP `www/local-project/dhopadi`)
> Goal: Build a website for the **ঈদ পুনর্মিলনী ২০২৬ (Eid Reunion 2026)** of the former
> students of **ধোপাদী মাধ্যমিক বিদ্যালয় (Dhopadi Madhyamik Vidyalaya / Secondary School)**.

---

## 1. What this folder contains (asset inventory)

The folder currently holds **only media assets** — no code yet.

**Root (`/`)**
- `WhatsApp Image 2026-05-29 at 12.38.31 PM.jpeg` — Main event poster with full **schedule (অনুষ্ঠান সূচি)**.
- `WhatsApp Image 2026-05-26 at 10.22.14 AM.jpeg` — Personal **registration / invitation card** (with photo + reg link).
- `WhatsApp Image 2026-05-26 at 10.21.43 AM.jpeg` — Organizer / volunteer photo.
- `WhatsApp Image 2026-05-26 aft 10.22.14 AM.jpeg` — Duplicate-style invitation image.
- `WhatsApp Video 2026-05-26 at 10.21.43 AM.mp4` (~4 MB) — **Selfie video message**: an older
  man (glasses, moustache, black tee) speaking to camera indoors. A personal invitation /
  greeting clip (likely an ex-teacher or senior alumnus inviting people to the reunion).
- `WhatsApp Video 2026-05-26 at 10.22.14 AM.mp4` (~118 MB) — **Promo invitation video**: a
  young organizer in a pink/blue sports jersey speaking to camera on the school grounds
  (football posts, boundary wall visible), holding a phone; ends on a plain blue background.
  Appears to be the main spoken promo inviting alumni to ঈদ পুনর্মিলনী ২০২৬.

  > Frames for review were extracted to `_frames/v1` and `_frames/v2` via VLC (no transcript —
  > audio not analyzed). **Re-compress the 118 MB video before serving it on the web.**

**`image/` (59 files: `1.jpeg`–`59.jpeg`)**
- Event promo / announcement posts (e.g. `1`, `33`, `16`, `39`).
- Teacher tribute posts — "স্মৃতির পাতা থেকে" / "আপনার প্রিয় শিক্ষক কে?" (e.g. `2`, `6`).
- Registration cards with QR code + Google Form link (e.g. `16`, `39`).
- Banner-installation & volunteer/group photos (e.g. `18`, `41`, `44`, `46`, `55`).
- Misc icons/graphics (e.g. `10` = magnifier icon).

> ⚠️ Note: several images appear to be duplicates or near-duplicates (e.g. `12`/`13`, `20`/`23`,
> `16`/`39`). De-duplicate before using them in a gallery.

---

## 2. Event details (extracted from the poster)

| Field | Detail |
|---|---|
| **Event** | ঈদ পুনর্মিলনী ২০২৬ (Eid Reunion 2026) |
| **For** | প্রাক্তন শিক্ষক ও শিক্ষার্থী (Former teachers & students) |
| **Date** | ৩০শে মে ২০২৬, শনিবার (Sat, **30 May 2026**) |
| **Start time** | সকাল ৯:০০ টা (9:00 AM) |
| **Venue** | ধোপাদী মাধ্যমিক বিদ্যালয় প্রাঙ্গণ (Dhopadi Secondary School grounds) |
| **Registration** | Google Form: `https://forms.gle/X5yZqpNDj9sUWo99` |
| **Contacts** | মো: হাসানুর রহমান – 01915904851 · মো: আসাদুজ্জামান ইমন – 01996613416 |
| **Facebook group** | ধোপাদী মাধ্যমিক বিদ্যালয় পরিবার (Dhopadi Secondary School Family) — `https://www.facebook.com/groups/225722284272250/` |

> ℹ️ The Facebook group is **private / login-gated**. Only the public group title was
> retrievable; posts, member list, and in-group event details require a logged-in member
> account and could not be read automatically.

### Schedule (অনুষ্ঠান সূচি)
| সময় (Time) | পর্ব | অনুষ্ঠান (Event) |
|---|---|---|
| 9:00–10:00 AM | সকাল | টোকেন সংগ্রহ (Token collection) |
| 10:00–11:00 AM | সকাল | টি-শার্ট বিতরণ (T-shirt distribution) |
| 11:00–11:30 AM | সকাল | উদ্বোধনী অনুষ্ঠান (Opening ceremony) |
| 11:30–12:00 PM | সকাল | আনন্দ র‍্যালি (Joy rally) |
| 12:00–1:00 PM | দুপুর | পুরুষ: রশি টানা / মহিলা: বালিশ বদল |
| 1:00–2:00 PM | দুপুর | নামাজ ও খাবারের বিরতি (Prayer & lunch break) |
| 2:00–3:00 PM | বিকাল | পুরুষ: স্ট্যাম্পে বল লাগানো / মহিলা: বেলুন ফাটানো |
| 3:00–3:30 PM | বিকাল | পুরুষ: ঝুড়িতে বল নিক্ষেপ |
| 3:30–4:30 PM | বিকাল | ঢালি খেলা |
| 4:30–5:30 PM | বিকাল | শুভেচ্ছা বিনিময় ও কফি আড্ডা |
| 5:30–6:00 PM | বিকাল | স্মৃতিমূলক বক্তব্য (Memorial speeches) |
| 6:30–7:00 PM | সন্ধ্যা | বিরতি / প্রস্তুতি |
| 7:00–9:00 PM | সন্ধ্যা | সাংস্কৃতিক অনুষ্ঠান (Cultural program) |
| 9:00–9:30 PM | রাত | বিদায়ী বক্তব্য (Farewell speech) |

---

## 3. Proposed website tasks

> ⏰ **Time-sensitive:** today is 2026-05-29; the event is **30 May 2026 (tomorrow)**.
> Prioritize a single working landing page over a multi-page build.

### Phase 1 — Setup & content
- [ ] Confirm tech stack (static HTML/CSS/JS vs. PHP, since this is WAMP `www`).
- [ ] De-duplicate the 59 images; pick the best hero poster, schedule image, and gallery set.
- [ ] Compress/transcode the 118 MB video for web (it is too large to serve as-is).
- [ ] Extract/confirm all Bengali text (Unicode) so it renders correctly with a Bengali web font.

### Phase 2 — Landing page (single page, scroll sections)
- [ ] **Hero**: event title, date/time/venue, registration CTA button → Google Form.
- [ ] **About**: short intro about the school & the reunion.
- [ ] **Schedule**: render the full অনুষ্ঠান সূচি table (responsive).
- [ ] **Teachers / Tributes**: "স্মৃতির পাতা থেকে" section honoring teachers.
- [ ] **Gallery**: curated images + embedded promo video.
- [ ] **Register**: prominent link/QR to `https://forms.gle/X5yZqpNDj9sUWo99`.
- [ ] **Contact / Footer**: organizer names & phone numbers, location/map.

### Phase 3 — Polish
- [ ] Mobile-first responsive layout (most users will open on phones / WhatsApp).
- [ ] Bengali web font (e.g. Noto Sans Bengali) + correct `lang="bn"` & UTF-8.
- [ ] Open Graph / WhatsApp share preview (image + title + date).
- [ ] Test on WAMP at `http://localhost/local-project/dhopadi/`.

---

## 4. Open questions (need confirmation)

1. **Is the goal a website?** This folder is in WAMP `www`, but the assets are social-media
   posts. Confirm whether you want a **website**, a **digital invitation page**, or just
   **organized/exported assets**.
2. **Stack** — plain HTML/CSS/JS, or PHP? Any framework preference?
3. **Registration** — keep the external Google Form, or build an on-site registration form
   (would need a DB / mail handling)?
4. **Language** — Bengali only, or Bengali + English?
5. Should the large promo video be hosted here or linked from YouTube/Facebook?
