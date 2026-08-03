# KrishiBD — কৃষকের ডিজিটাল বাজার

KrishiBD একটি Professional UI ভিত্তিক বাংলা ডেমো ওয়েবসাইট। এটি কৃষককে ফসলের ছবি, পরিমাণ, দাম ও এলাকার তথ্য পোস্ট করতে এবং ক্রেতাকে ফসল খুঁজে কৃষকের সঙ্গে যোগাযোগ করতে সাহায্য করার ধারণা দেখায়।

## ডেমোতে যা আছে

- বাংলা Facebook-style ফসলের নিউজফিড
- ফসল, জেলা, বিভাগ, দাম ও প্রাপ্যতা অনুযায়ী সার্চ
- আঞ্চলিক ফসলের ইন্টারেক্টিভ মানচিত্র
- কৃষকের প্রোফাইল ও ফসলের বিস্তারিত পাতা
- মোবাইল নম্বর/OTP ভিত্তিক ডেমো Login
- কৃষক নিবন্ধন ফর্ম
- কৃষক Dashboard
- Responsive Mobile, Tablet ও Desktop UI
- Dark mode
- Demo পোস্ট, Save, Like, Contact modal

## GitHub Pages-এ প্রকাশ

1. ZIP ফাইল খুলে সব ফাইল একটি নতুন GitHub Repository-তে আপলোড করুন।
2. Repository-এর **Settings → Pages** খুলুন।
3. Source হিসেবে **Deploy from a branch** নির্বাচন করুন।
4. Branch হিসেবে **main** এবং folder হিসেবে **/(root)** নির্বাচন করে Save করুন।
5. কয়েক মিনিটের মধ্যে GitHub Pages ঠিকানা তৈরি হবে।

## লোকালভাবে চালানো

Python থাকলে Project folder-এ Terminal খুলে চালান:

```bash
python -m http.server 8000
```

তারপর browser-এ `http://localhost:8000` খুলুন।

## Future Full-Stack Conversion

- Frontend: React / Next.js / Vue / Flutter Web
- Backend: Laravel / Node.js / NestJS
- Database: PostgreSQL / MySQL
- Authentication: Firebase Phone OTP বা SMS Gateway
- Storage: Cloudinary / Firebase Storage / S3
- API pattern: `/api/v1/posts`, `/api/v1/farmers`, `/api/v1/crops`

`assets/js/api-service.example.js` ফাইলে API service-এর নমুনা রাখা হয়েছে। বর্তমান Demo data আছে `data/demo-data.json` এবং `assets/js/data.js`-এ।

## গুরুত্বপূর্ণ

এটি Frontend Demo। Login, OTP, Post creation ও Contact action বাস্তব সার্ভারের সঙ্গে সংযুক্ত নয়।
