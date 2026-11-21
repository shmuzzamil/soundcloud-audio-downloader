# [BrandName] (SoundFetch) - Fast, Mobile-First, SEO-Optimized SoundCloud Link Helper

A modern, fast, mobile-first, and legally compliant web application that resolves SoundCloud tracks, playlists (`/sets/`), and artist profiles using the official SoundCloud API. It automatically verifies copyright permissions, offers instant downloads for Creative Commons and artist-permitted audio, packages entire permitted playlists into streaming ZIP archives on-the-fly, and enforces **strict zero file storage**.

---

## 🌟 Key Highlights & Core Features

### 🎧 Core Tool & Audio Resolution
- **Universal Input**: Accepts SoundCloud tracks (`https://soundcloud.com/user/track`), playlists/sets (`https://soundcloud.com/user/sets/playlist`), user profiles, and mobile short links (`https://on.soundcloud.com/...`).
- **Official API Resolution**: Connects to the official SoundCloud API via OAuth 2.0 Client Credentials (`/resolve` endpoint) to fetch authentic metadata (Artwork, Duration, Waveform, Artist details, License).
- **Strict License & Permission Filter**:
  - Automatically identifies **Creative Commons** licenses (`CC-BY`, `CC-BY-NC`, `CC-BY-SA`, `CC-BY-ND`, `CC0 Public Domain`).
  - Identifies tracks where the uploader explicitly enabled free downloads.
  - If a track is marked **"All Rights Reserved"** or downloads are disabled by the artist, the download button is suppressed and replaced with:  
    `"Downloads are disabled by the artist"` and a direct link to support the artist on SoundCloud.
- **Playlist / Set Mode**:
  - Inspects every track in the playlist with per-track status badges.
  - **"Download Permitted Tracks (ZIP)"**: Packages permitted audio files on-the-fly into a single ZIP archive.
- **Resilient Error States**: Clear, contextual alerts for invalid URLs, private tracks, geo-restricted content, and removed tracks.
- **Security & Zero Storage**:
  - In-memory sliding-window rate limiting.
  - In-memory concurrency queue to throttle heavy streaming and ZIP operations.
  - Cloudflare Turnstile CAPTCHA verification support.
  - **Zero Disk Storage**: Audio streams and ZIP files are piped in memory from source to client using Node.js/Web ReadableStreams; no audio files are ever written to the server disk.

### 📱 Mobile-First Frontend (PWA)
- Built with **Next.js 14 (App Router)** + **Tailwind CSS** + **Lucide Icons** + **next-themes**.
- Seamless **Light / Dark mode** toggle with system preference auto-detection.
- Sub-2-second **Largest Contentful Paint (LCP)**, zero Cumulative Layout Shift (CLS).
- **Mobile Flow Guide**: Interactive visual guide for iOS and Android: `Share → Copy Link → Paste`.
- **Installable PWA**: Includes web app manifest, offline shell caching, and standalone display mode.

### 🌍 Multilingual i18n & hreflang
- Full native localization across **8 languages**:
  1. English (`en`)
  2. Spanish (`es`)
  3. Portuguese (`pt`)
  4. Arabic (`ar` - Full RTL layout support)
  5. Urdu (`ur` - Full RTL layout support)
  6. Hindi (`hi`)
  7. Indonesian (`id`)
  8. Turkish (`tr`)
- Dynamic hreflang tag generation and complete bidirectional text layout (`dir="rtl"` vs `dir="ltr"`).

### 🚀 SEO Architecture & Landing Pages
- **Targeted Home Page**: Optimized for high-intent keywords: `"soundcloud downloader"`, `"soundcloud to mp3"`, `"download soundcloud songs"`.
- **6 Niche Landing Pages**:
  - `/playlist-downloader` - Sets, albums, and batch ZIP downloads
  - `/iphone` - iOS Safari workflow, Share Sheet, Apple Files app integration
  - `/android` - Android Chrome and native download manager integration
  - `/mac` - Desktop macOS high-bitrate audio tool
  - `/podcast` - Spoken word, lectures, and interview downloads
  - `/mix` - DJ live sets, festival recordings, and electronic music
- **Rich Structured Data (JSON-LD)**:
  - `SoftwareApplication` / `WebApplication` schema
  - `FAQPage` schema on all pages
  - `HowTo` schema (step-by-step download guide)
  - `BreadcrumbList` schema
- **Dynamic XML Sitemap (`/sitemap.xml`)** linking all landing pages across all 8 locales with alternate language tags.
- **Optimized `robots.txt`** configuration.
- **Comprehensive Legal Trust Pages**:
  - `/terms` (Terms of Service)
  - `/privacy` (Privacy Policy - GDPR & CCPA compliant, zero file retention)
  - `/dmca` (DMCA & Copyright Takedown Procedure with Designated Agent contact)
  - `/contact` (Support inquiry form)
  - Prominent `"Not affiliated with SoundCloud"` disclaimer on all footers and headers.

### 📊 Analytics & Privacy-First Monetization
- Configurable **Google Analytics 4 (GA4)** and Google Search Console verification.
- GDPR-compliant cookie consent banner with localStorage state persistence.
- Non-intrusive, customizable ad units with simple on/off configuration (`NEXT_PUBLIC_ENABLE_ADS`).

---

## 📁 Folder Structure

```
soundcloudAudioDownloader/
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore patterns
├── Dockerfile                   # Multi-stage production container build
├── docker-compose.yml           # Docker compose configuration
├── package.json                 # Dependencies and scripts
├── postcss.config.mjs           # PostCSS Tailwind config
├── tailwind.config.ts           # Tailwind CSS configuration with brand palette
├── tsconfig.json                # TypeScript compiler configuration
├── public/                      # Static assets & PWA icons
│   ├── favicon.ico
│   ├── icon.svg
│   ├── og-image.svg
│   ├── icon-192.png
│   └── icon-512.png
└── src/
    ├── config/
    │   └── site.ts              # Global brand configuration, URLs, locales & navigation
    ├── types/
    │   └── soundcloud.ts        # TypeScript data contracts, SoundCloud API models
    ├── lib/
    │   ├── utils.ts             # Formatting helpers (duration, high-res artwork, filenames)
    │   ├── soundcloud/
    │   │   ├── regex.ts         # High-precision SoundCloud URL validation regex
    │   │   └── client.ts        # SoundCloud OAuth client credentials, /resolve, licensing & mock fixtures
    │   ├── security/
    │   │   ├── ratelimit.ts     # In-memory sliding-window rate limiter
    │   │   ├── queue.ts         # Concurrency queue for streaming & ZIP downloads
    │   │   └── captcha.ts       # Cloudflare Turnstile verification
    │   └── i18n/
    │       └── translations.ts  # Full translations dictionary for 8 locales (en, es, pt, ar, ur, hi, id, tr)
    ├── components/
    │   ├── ThemeProvider.tsx    # Next-themes dark/light provider
    │   ├── Navbar.tsx           # Sticky responsive header with language switcher & theme toggle
    │   ├── Footer.tsx           # Legal links, disclaimer, language directory
    │   ├── HeroSearch.tsx       # Core search box, instant regex indicator, paste button, demo samples
    │   ├── TrackCard.tsx        # Track presentation, player preview, CC badge & download button
    │   ├── PlaylistCard.tsx     # Playlist overview, batch ZIP generator & per-track list
    │   ├── MobileFlowGuide.tsx  # iOS/Android step-by-step visual share guide
    │   ├── HowToSection.tsx     # 3-step illustrated how-to guide
    │   ├── FeaturesSection.tsx  # Core Web Vitals & compliance feature cards
    │   ├── FaqSection.tsx       # Accordion FAQ with FAQPage schema
    │   ├── ConsentBanner.tsx    # Privacy-friendly GDPR consent banner
    │   ├── AdSlot.tsx           # Non-intrusive ad banner placeholders
    │   └── JsonLd.tsx           # JSON-LD Schema components (SoftwareApplication, FAQ, HowTo, Breadcrumb)
    └── app/
        ├── globals.css          # Tailwind base & RTL direction styles
        ├── layout.tsx           # Root HTML layout, font setup, GA4 tag
        ├── page.tsx             # Root redirect to default locale (/en)
        ├── sitemap.ts           # Dynamic XML sitemap generator
        ├── robots.ts            # Robots.txt generator
        ├── manifest.ts          # PWA web manifest
        ├── api/
        │   ├── resolve/
        │   │   └── route.ts     # POST: URL resolution, CAPTCHA, rate limit & licensing check
        │   ├── stream/
        │   │   └── route.ts     # GET: Zero-storage audio proxy stream
        │   └── download-zip/
        │       └── route.ts     # POST: Streaming batch ZIP archive for permitted playlist tracks
        └── [locale]/
            ├── layout.tsx       # Locale layout, hreflang metadata, RTL support & navigation
            ├── page.tsx         # Home page (targeting "soundcloud downloader" & "soundcloud to mp3")
            ├── playlist-downloader/
            │   └── page.tsx     # Landing page: Sets, albums & ZIP downloads
            ├── iphone/
            │   └── page.tsx     # Landing page: iOS Safari & Apple Files workflow
            ├── android/
            │   └── page.tsx     # Landing page: Android Chrome & download manager
            ├── mac/
            │   └── page.tsx     # Landing page: macOS desktop audio tool
            ├── podcast/
            │   └── page.tsx     # Landing page: Spoken word, talk shows & interviews
            ├── mix/
            │   └── page.tsx     # Landing page: DJ sets & electronic live mixes
            ├── terms/
            │   └── page.tsx     # Legal: Terms of Service
            ├── privacy/
            │   └── page.tsx     # Legal: Privacy Policy (GDPR / zero retention)
            ├── dmca/
            │   └── page.tsx     # Legal: DMCA Takedown Notice & Designated Agent
            └── contact/
                └── page.tsx     # Support: Inquiries & contact form
```

---

## ⚙️ Quick Start & Local Development

### 1. Prerequisites
- Node.js 18.x, 20.x, or 22.x
- npm, pnpm, or yarn

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/soundcloud-downloader.git
cd soundcloud-downloader

# Install dependencies
npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your environment variables in `.env.local`:
```env
# Custom Branding
NEXT_PUBLIC_BRAND_NAME="SoundFetch"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SUPPORT_EMAIL="support@soundfetch.app"

# Official SoundCloud API Credentials (Optional in local dev, built-in mock fixtures active)
SOUNDCLOUD_CLIENT_ID="your_client_id_here"
SOUNDCLOUD_CLIENT_SECRET="your_client_secret_here"

# Security (Cloudflare Turnstile - Optional in local dev)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=""
TURNSTILE_SECRET_KEY=""

# Rate Limiting & Concurrency
RATE_LIMIT_MAX_REQUESTS=30
RATE_LIMIT_WINDOW_MS=60000
MAX_CONCURRENT_DOWNLOADS=12

# Analytics & Ads
NEXT_PUBLIC_GA_MEASUREMENT_ID=""
NEXT_PUBLIC_ENABLE_ADS="false"
```

> **Note on Testing without API Keys:** The application includes realistic built-in fixtures. In development mode without API keys, clicking any of the **Quick Test Samples** under the search input (Permitted CC Track, Playlist ZIP, or Disabled Track) works out of the box!

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deployment Guides

### Option 1: Vercel Deployment (Recommended)
1. Push your repository to GitHub, GitLab, or Bitbucket.
2. In the [Vercel Dashboard](https://vercel.com), click **Add New Project** and select your repository.
3. In **Environment Variables**, add:
   - `NEXT_PUBLIC_BRAND_NAME`
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://yourdomain.com`)
   - `SOUNDCLOUD_CLIENT_ID`
   - `SOUNDCLOUD_CLIENT_SECRET`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional)
   - `TURNSTILE_SECRET_KEY` (optional)
4. Click **Deploy**. Vercel will build the Next.js App Router application with automatic global edge caching.

---

### Option 2: Linux VPS Deployment (Ubuntu 22.04 / 24.04 with Nginx + PM2)

#### 1. Server Prerequisites
```bash
# Update server
sudo apt update && sudo apt upgrade -y

# Install Node.js 20 LTS & PM2
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx certbot python3-certbot-nginx
sudo npm install -g pm2
```

#### 2. Deploy Application
```bash
# Clone to /var/www/
sudo git clone https://github.com/your-username/soundcloud-downloader.git /var/www/soundfetch
cd /var/www/soundfetch

# Set ownership
sudo chown -R $USER:$USER /var/www/soundfetch

# Install dependencies and build
npm ci
cp .env.example .env.production
# (Edit .env.production with your live credentials)
npm run build

# Start with PM2
pm2 start npm --name "soundfetch" -- start
pm2 save
pm2 startup
```

#### 3. Configure Nginx Reverse Proxy
Create `/etc/nginx/sites-available/soundfetch`:
```nginx
server {
    server_name soundfetch.app www.soundfetch.app;

    # Enable Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Disable buffering for on-the-fly streaming audio and ZIP downloads
        proxy_buffering off;
        proxy_read_timeout 300s;
    }
}
```

Enable site & SSL:
```bash
sudo ln -s /etc/nginx/sites-available/soundfetch /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Issue free Let's Encrypt SSL certificate
sudo certbot --nginx -d soundfetch.app -d www.soundfetch.app
```

---

### Option 3: Docker Deployment

Run with Docker Compose:
```bash
docker-compose up -d --build
```

---

## 📈 Launch SEO Checklist

To maximize organic search traffic for queries like `"soundcloud downloader"`, `"soundcloud to mp3"`, and `"soundcloud playlist downloader"`, execute this launch checklist:

1. **Google Search Console & Bing Webmaster Setup**:
   - Add and verify property using DNS TXT record or HTML meta tag (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`).
   - Submit the XML sitemap: `https://yourdomain.com/sitemap.xml`.
2. **Canonical & Hreflang Validation**:
   - Inspect page source to ensure each locale contains self-referencing canonicals and alternate hreflang tags for all 8 languages (`en`, `es`, `pt`, `ar`, `ur`, `hi`, `id`, `tr` + `x-default`).
3. **Structured Data Validation**:
   - Run the homepage and landing pages through the [Google Rich Results Test](https://search.google.com/test/rich-results).
   - Verify `SoftwareApplication`, `FAQPage`, `HowTo`, and `BreadcrumbList` schemas are detected without errors.
4. **Core Web Vitals Benchmark**:
   - Run [Google PageSpeed Insights](https://pagespeed.web.dev/).
   - Ensure LCP < 2.0s, FID/INP < 100ms, and CLS < 0.05 on mobile and desktop.
5. **Security & Privacy Audit**:
   - Verify zero server disk persistence: ensure `/api/stream` and `/api/download-zip` stream chunks directly without writing temporary files.
   - Confirm privacy consent banner operates locally via `localStorage`.

---

## ⚖️ Legal & Copyright Compliance Notice

SoundFetch is an independent web utility and is **not affiliated, associated, authorized, endorsed by, or in any way officially connected with SoundCloud Ltd. or SoundCloud Global Limited & Co. KG**.

- **Permitted Downloads Only**: SoundFetch strictly queries track metadata and enforces the creator's chosen licensing scheme. Downloads are enabled only when the artist has explicitly enabled downloads or published under Creative Commons / Royalty-Free licenses.
- **Copyright Protection**: Tracks marked "All Rights Reserved" cannot be downloaded through this service; users are directed to stream them officially on SoundCloud.
- **Zero Storage**: No music, audio, or metadata files are retained on our servers.

