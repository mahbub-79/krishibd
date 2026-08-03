# KrishiBD ভবিষ্যৎ আর্কিটেকচার

## প্রস্তাবিত অংশ

1. **Frontend App** — React/Next.js বা Flutter Web
2. **REST API** — Laravel/NestJS
3. **Database** — PostgreSQL
4. **Authentication** — Phone OTP
5. **Image Storage** — S3-compatible storage
6. **Search** — PostgreSQL full-text বা Elasticsearch
7. **Map Analytics** — District/Crop aggregation API

## মূল Data Entity

- User
- FarmerProfile
- Crop
- CropPost
- District
- MarketPrice
- BuyerRequest
- Conversation
- Message
- Notification
- Report

## API নমুনা

- `POST /api/v1/auth/request-otp`
- `POST /api/v1/auth/verify-otp`
- `GET /api/v1/posts`
- `POST /api/v1/posts`
- `GET /api/v1/posts/{id}`
- `GET /api/v1/farmers/{id}`
- `GET /api/v1/map/crops`
- `POST /api/v1/buyer-requests`

বর্তমান HTML class ও JavaScript data field-গুলো ভবিষ্যৎ API response-এর নাম মাথায় রেখে সাজানো হয়েছে।
