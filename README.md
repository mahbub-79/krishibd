# KrishiBD Demo

বাংলাদেশের কৃষক ও ক্রেতাদের জন্য কৃষকবান্ধব, সম্পূর্ণ বাংলা, responsive demo website.

## ডেমোতে যা আছে

- ফসল, বিভাগ, জেলা ও দাম দিয়ে খোঁজা
- কৃষকের প্রোফাইল তৈরি
- ছবি, পরিমাণ, দাম ও ঠিকানাসহ নতুন ফসল পোস্ট
- পোস্ট ও প্রোফাইল ব্রাউজারের Local Storage-এ রাখা
- পোস্ট অনুযায়ী স্বয়ংক্রিয় ফসল মানচিত্র ও পরিসংখ্যান আপডেট
- ফোন ও WhatsApp যোগাযোগ
- মোবাইল, ট্যাব ও ডেস্কটপ responsive UI
- GitHub Pages-এ সরাসরি publish করা যাবে

## চালানোর নিয়ম

1. ZIP ফাইল Extract করুন।
2. `index.html` ফাইল ডাবল ক্লিক করে খুলুন।
3. অথবা সব ফাইল GitHub repository-তে upload করুন।
4. GitHub repository → Settings → Pages → Deploy from branch → `main` / root নির্বাচন করুন।

## ফাইল

- `index.html` — ওয়েবসাইটের HTML
- `styles.css` — ডিজাইন ও responsive style
- `app.js` — search, filter, post, profile, map, localStorage logic

## Full-stack করার পরবর্তী ধাপ

এই demo-র UI রেখে পরে নিচের backend যোগ করা যাবে:

- Authentication: Phone OTP
- Database: PostgreSQL / MySQL / Firebase
- Backend API: Laravel / Node.js / Django
- Image storage: Cloudinary / S3 / Firebase Storage
- Live map data: Bangladesh district GeoJSON + Mapbox/Leaflet
- Admin panel: কৃষক যাচাই, পোস্ট অনুমোদন, রিপোর্ট ব্যবস্থাপনা
- Notifications: SMS / WhatsApp / Push notification

`app.js`-এর localStorage অংশ API call দিয়ে বদলালেই UI একই রেখে full-stack migration করা যাবে।
