# Auth System — EventHub

> Technical README for authentication, email verification, and session rotation.

## 1) Scope

Identity, email verification, protected routes, and session management using Access and Refresh tokens.

## 2) Architecture

* **NestJS** with Passport, `@nestjs/jwt`, `class-validator`.
* **Modules**: `auth`, `user`, `mail`.
* **Guards/Strategies**: `LocalStrategy`, `JwtStrategy`, `AuthGuard('local')`, `JwtAuthGuard`.

***[Insert high-level architecture diagram here]***

## 3) Data Model (relevant fields)

`User`

* `id`, `name`, `email (unique)`, `password (bcrypt hash)`
* `isEmailVerified:boolean`, `emailVerifiedAt?: Date`
* `refreshTokenHash?: string | null`

`UpdateUserDto`

* Extends `PartialType(CreateUserDto)`
* Adds: `isEmailVerified?: boolean`, `refreshTokenHash?: string | null`

***[Insert ER diagram for User here]***

## 4) Token Types

* **Access Token (JWT)**

  * Payload: `{ sub, name, email, isEmailVerified }`
  * Use: authorize protected routes
  * TTL: short (`JWT_EXPIRES_IN`)
* **Email Verify Token (JWT)**

  * Payload: `{ sub, type: 'email-verify' }`
  * Use: prove email ownership
  * TTL: medium (`EMAIL_VERIFY_EXPIRES`)
* **Refresh Token (JWT)**

  * Payload: `{ sub, type: 'refresh' }`
  * Use: rotate Access tokens
  * TTL: long (`REFRESH_EXPIRES_IN`)
  * Storage: server stores **hash** only (`refreshTokenHash`)

## 5) Endpoints

* `POST /auth/signup` → create user, send verification email, return tokens
* `POST /auth/login` (local) → return `{ access_token, refresh_token }`
* `GET /auth/verify-email?token=...` → set `isEmailVerified=true`
* `POST /auth/refresh` → rotate tokens using refresh token
* `POST /auth/logout` (JWT) → invalidate refresh by clearing hash
* `GET /auth/profile` (JWT)

***[Insert sequence diagram for each flow below]***

## 6) Flows

### 6.1 Signup

1. `UserService.create(dto)` → `isEmailVerified=false`.
2. Sign verify JWT `{ sub, type:'email-verify' }` with `EMAIL_VERIFY_SECRET` (fallback `JWT_SECRET`), TTL e.g. 24h.
3. Build verify URL:
   `verifyUrl = <FRONTEND_URL | API_BASE_URL>/auth/verify-email?token=<JWT>`.
4. `MailService.sendVerificationEmail(email, name, token, baseUrl)`.
5. Return tokens (short-lived Access, long-lived Refresh).

### 6.2 Email Verify

1. `jwt.verifyAsync(token, { secret })` and check `type==='email-verify'`.
2. Load user by `sub`. If not verified → set `isEmailVerified=true`, `emailVerifiedAt=now`.
3. Optional: send welcome email.
4. Respond with success.

### 6.3 Login

1. `LocalStrategy` validates email/password with `bcrypt.compare`.
2. `issueTokens` signs Access and Refresh, hashes Refresh, stores `refreshTokenHash`.
3. Return `{ access_token, refresh_token }`.

### 6.4 Protected Access

* Client sends `Authorization: Bearer <access_token>`.
* `JwtAuthGuard` + `JwtStrategy` populate `req.user`.

### 6.5 Refresh

1. Verify refresh JWT with `REFRESH_JWT_SECRET` (fallback `JWT_SECRET`), check `type==='refresh'`.
2. Compare raw refresh token with `refreshTokenHash` using `bcrypt.compare`.
3. On match: issue new Access + Refresh, store new hash.
4. Return rotated tokens.

### 6.6 Logout

* Set `refreshTokenHash=null` to invalidate the session.

## 7) Mail Subsystem

* SMTP: `smtp.hostinger.com:465` with `secure:true`.
* `defaults.from`: `"EventHub by AlaskariTech" <eventhub@alaskaritech.com>`.
* Templates: `welcome`, `verification`, `updatePassword` with primary `#7C3AED` and brand footer.
* Deliverability: SPF, DKIM, DMARC for `alaskaritech.com`.

***[Insert mail flow diagram: API → SMTP → inbox]***

## 8) Configuration (.env)

```env
# Access
JWT_SECRET=...
JWT_EXPIRES_IN=30m

# Email verify
EMAIL_VERIFY_SECRET=...
EMAIL_VERIFY_EXPIRES=24h

# Refresh
REFRESH_JWT_SECRET=...
REFRESH_EXPIRES_IN=7d

# Link building
FRONTEND_URL=https://eventhub.alaskaritech.com
# or
API_BASE_URL=http://localhost:3000

# SMTP
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=eventhub@alaskaritech.com
SMTP_PASS=********
SMTP_FROM_NAME=EventHub by AlaskariTech
```

## 9) Error Handling

* `400 BadRequest`: invalid/expired tokens, wrong token type.
* `401 Unauthorized`: missing/expired Access for protected endpoints.
* `403 Forbidden`: refresh mismatch or no active session.
* `404 NotFound`: user not found.
* `408 RequestTimeout` (mailer): SMTP delivery issues (log `code`, `command`, `responseCode`).

***[Insert decision tree for auth errors]***

## 10) Security

* Password hashing with `bcrypt`.
* Token separation via `type` claim prevents misuse across flows.
* Refresh rotation every `/auth/refresh` call.
* Store only refresh **hash** server-side.
* Global `ValidationPipe({ whitelist:true, forbidNonWhitelisted:true })`.
* Secrets from `.env`, never hardcode. Rotate on exposure.

***[Insert threat model sketch / checklist]***

## 11) Frontend Integration Guide

* After signup/login, backend returns:

  ```json
  { "access_token": "<JWT>", "refresh_token": "<JWT>" }
  ```
* Use `Authorization: Bearer <access_token>` for protected calls.
* On `401`:

  * Call `POST /auth/refresh` with `refresh_token`.
  * Always replace both tokens with the new pair.
* Logout:

  * Call `POST /auth/logout`.
  * Clear tokens locally.
* Email verify:

  * Open `GET /auth/verify-email?token=...` directly or via a frontend page that calls the API and shows status.

***[Insert sequence diagram: Axios interceptor → 401 → refresh → retry]***

## 12) Minimal Examples

### Signup

```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{ "name":"Alice", "email":"alice@example.com", "password":"secret123" }'
```

### Verify

```bash
curl "http://localhost:3000/auth/verify-email?token=<JWT>"
```

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{ "email":"alice@example.com", "password":"secret123" }'
```

### Refresh

```bash
curl -X POST http://localhost:3000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{ "refreshToken": "<JWT>" }'
```

### Logout

```bash
curl -X POST http://localhost:3000/auth/logout \
  -H "Authorization: Bearer <access_token>"
```

## 13) Future Work

* Multi-session device list.
* Optional device/user-agent binding for refresh.
* Rate limiting for login/refresh.
* 2FA.
* Complete password reset endpoints (templates are ready).

---

هذا شرح تفصيلي «كيف يحدث كل شيء» في منظومة Auth لديك. تركت أماكن واضحة لمخططات ورسوم معمارية.

# 1) نظرة شاملة

* هدف النظام: إثبات الهوية، تفعيل البريد، حماية المسارات، وإدارة الجلسات عبر Access وRefresh.
* طبقات: Controller ↔ Service ↔ Repository/DB + Mailer + JWT/Passport.

[مكان مخطط معماري عالي المستوى: **العميل** → **API Gateway/NestJS** → **Auth/User/Mail Modules** → **DB** و**SMTP**]

# 2) المكوّنات الرئيسة

* **AuthController**: يصدر نقاط النهاية (signup, login, verify-email, refresh, logout, profile).
* **AuthService**: ينسّق إنشاء المستخدم، توقيع التوكينات، إرسال رسائل البريد، والتحقق.
* **Strategies/Guards**:

  * LocalStrategy للتحقق من البريد/كلمة السر.
  * JwtStrategy لاستخراج الـ payload من Bearer Token.
  * JwtAuthGuard لحماية المسارات.
* **UserService/Entity**: وصول إلى المستخدم وتحديثه (بما في ذلك `isEmailVerified` و`refreshTokenHash`).
* **MailService**: بناء الروابط وإرسال قوالب HTML عبر SMTP.
* **Config**: تحميل أسرار وصلاحيات من `.env`.

[مكان مخطط مكوّنات: صناديق Auth/User/Mail/JWT/CORS/DB وروابطها]

# 3) دورة الحياة الكاملة (من التسجيل إلى الاستخدام)

1. **Signup**: إنشاء مستخدم غير مفعّل البريد → إصدار Verify-Token → إرسال إيميل تأكيد → إصدار Access مبدئي.
2. **Email Verify**: المستخدم يضغط الرابط → GET إلى `/auth/verify-email?token=...` → التحقق وتحديث `isEmailVerified`.
3. **Login**: LocalStrategy يتحقق من الاعتماديات → إصدار Access قصير وRefresh طويل وتخزين Hash للـ Refresh.
4. **Access إلى مسارات محمية**: المتصفح يرسل `Authorization: Bearer <access_token>` → JwtGuard يسمح.
5. **Refresh**: عند انتهاء Access، يرسل العميل refresh → يصدر الخادم Access+Refresh جديدين ويحدّث الـ Hash.
6. **Logout**: مسح `refreshTokenHash=null` لإبطال الجلسة.

[مكان مخطط تسلسلي شامل: من العميل حتى DB وSMTP عبر الخطوات 1–6]

# 4) التسجيل (POST /auth/signup)

* الإدخال: `name, email, password`.
* يحدث:

  1. `UserService.create`: تجزئة كلمة السر وتخزين المستخدم بـ `isEmailVerified=false`.
  2. `signEmailVerifyToken({ sub: userId, type: 'email-verify' })` بمفتاح `EMAIL_VERIFY_SECRET` وصلاحية `EMAIL_VERIFY_EXPIRES` (افتراضي 24h).
  3. بناء رابط: `verifyUrl = <FRONTEND_URL | API_BASE_URL>/auth/verify-email?token=<JWT>`.
  4. `MailService.sendVerificationEmail` يرسل القالب.
  5. ردّ API: Access Token مبدئي.
* المخرجات: حساب منشأ، بريد تحقق مرسل، Access جاهز مؤقتًا.

[مكان مخطط تسلسلي: Signup → Create User → Sign Verify JWT → Send Mail]

# 5) تفعيل البريد (GET /auth/verify-email?token=…)

* الإدخال: `token` في Query.
* يحدث:

  1. `jwt.verifyAsync(token, { secret })` مع رفض التوكين المنتهي أو غير الصحيح.
  2. التأكد من `type==='email-verify'` ووجود `sub`.
  3. جلب المستخدم؛ إن كان غير موجود → 404.
  4. إن لم يكن مفعّلًا: تحديث `isEmailVerified=true` و`emailVerifiedAt=now`.
  5. يمكن إرسال رسالة ترحيب.
  6. ردّ: رسالة نجاح.
* النتيجة: صار البريد مفعّلًا، وستحمل أي JWT لاحقة `isEmailVerified=true`.

[مكان مخطط تسلسلي: Verify Link → Verify JWT → Update User → Response]

# 6) تسجيل الدخول (POST /auth/login)

* LocalStrategy:

  1. جلب المستخدم بالبريد.
  2. مقارنة كلمة السر بـ `bcrypt.compare`.
  3. عند النجاح، ينادي AuthService.
* AuthService:

  1. `issueTokens`: يوقع Access (قصير العمر) وRefresh (أطول).
  2. يجزّئ Refresh ويخزن `refreshTokenHash` في DB.
  3. يعيد `{ access_token, refresh_token }`.
* توصية: إرسال ترحيب فقط إذا `isEmailVerified=true`.

[مكان مخطط تسلسلي: Login → LocalStrategy → issueTokens → Save Hash → Response]

# 7) الوصول المحمي (JwtAuthGuard)

* العميل يرفق `Authorization: Bearer <access_token>`.
* JwtStrategy تستخرج وتحلل الـ JWT وتعيد الـ payload إلى `req.user`.
* الحارس يسمح بالوصول إن كان التوكين صالحًا وغير منتهٍ.

[مكان مخطط قصير: Client → Guard → Strategy → Controller]

# 8) تجديد التوكين (POST /auth/refresh)

* الإدخال: `refresh_token` (في Body أو Cookie).
* يحدث:

  1. `verifyAsync` للـ Refresh مع سر `REFRESH_JWT_SECRET` والتأكد من `type==='refresh'`.
  2. جلب المستخدم والتحقق من تطابق الـ refresh المرسل مع `refreshTokenHash` عبر `bcrypt.compare`.
  3. إذا صحيح: **تدوير** الجلسة بإصدار Access+Refresh جديدين، وتحديث Hash جديد في DB.
  4. ردّ: `{ access_token, refresh_token }` الجديدان.
* إذا خطأ: 400/403 تبعًا للحالة.

[مكان مخطط تسلسلي: Refresh → Verify → Compare Hash → Rotate → Response]

# 9) تسجيل الخروج (POST /auth/logout)

* محمي بـ JwtAuthGuard.
* يحدث: `update(userId, { refreshTokenHash: null })`.
* النتيجة: لا يمكن استخدام أي refresh قديم لتجديد الوصول.

[مكان مخطط بسيط: Logout → Clear Hash]

# 10) نموذج البيانات

* **User**:

  * أساسية: `id, name, email(unique), password(hash)`.
  * تحقق البريد: `isEmailVerified:boolean, emailVerifiedAt?:Date`.
  * الجلسة: `refreshTokenHash?: string | null`.
* **UpdateUserDto**:

  * امتداد لـ `PartialType(CreateUserDto)`.
  * إضافة: `isEmailVerified?: boolean`, و`refreshTokenHash?: string | null` للسماح بالتحديث الجزئي الآمن.

[مكان ER Diagram مصغّر لجدول Users وحقوله]

# 11) البريد الإلكتروني (SMTP)

* المرسل: Hostinger `smtp.hostinger.com:465` مع `secure:true`.
* `defaults.from`: `"EventHub by AlaskariTech" <eventhub@alaskaritech.com>`.
* قوالب HTML: `welcome`, `verification`, `updatePassword` بلون أساسي `#7C3AED` وتذييل “A product of AlaskariTech”.
* بنية رابط التحقق صحيحة: **الأساس أولًا ثم التوكين**
  `verifyUrl = ${baseUrl}/auth/verify-email?token=${token}`.
* تسليم موثوق: تفعيل SPF وDKIM وDMARC للنطاق.

[مكان مخطط تسلسلي: SendMail → SMTP → Mailbox]

# 12) الإعدادات (ENV)

* Access: `JWT_SECRET`, `JWT_EXPIRES_IN` (مثل 30m).
* Verify: `EMAIL_VERIFY_SECRET`, `EMAIL_VERIFY_EXPIRES` (مثل 24h).
* Refresh: `REFRESH_JWT_SECRET`, `REFRESH_EXPIRES_IN` (مثل 7d).
* روابط: `FRONTEND_URL` أو `API_BASE_URL` لبناء `verifyUrl`.
* SMTP: `SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM_NAME`.

[مكان جدول ENV مع أمثلة القيم]

# 13) معالجة الأخطاء

* 400: توكين غير صالح/منتهي أو نوع غير صحيح.
* 401: غياب/انتهاء Access على مسار محمي.
* 403: Refresh غير مطابق للـ Hash المخزون.
* 404: مستخدم غير موجود.
* 408: فشل إرسال بريد (مع تسجيل تفاصيل SMTP: `code`, `command`, `responseCode`).

[مكان مخطط قرار (Decision Tree) لأخطاء Auth الشائعة]

# 14) الأمان العملي

* تجزئة كلمات المرور بـ `bcrypt` وعدم طباعتها.
* فصل الأنواع عبر `type` داخل Payload لمنع استخدام Access مكان Verify أو Refresh.
* تدوير Refresh عند كل طلب `/auth/refresh`.
* عدم تخزين Refresh الخام؛ تخزين الـ Hash فقط.
* منع الحقول غير المصرّح بها عبر `ValidationPipe({ whitelist:true, forbidNonWhitelisted:true })`.
* تدوير الأسرار عند التسريب وعدم حفظها في Git أو السجلات.

[مكان مخطط تهديدات مبسّط STRIDE أو قوائم تحقق أمنية]

# 15) تكامل الواجهة الأمامية

* بعد `login/signup`: خزّن `{ access_token, refresh_token }`.
* أرفق `Authorization: Bearer <access_token>` بكل طلب محمي.
* عند 401: نادِ `/auth/refresh` وأعد **استبدال** التوكينين بالجديدين دائمًا.
* عند `logout`: نادِ `/auth/logout` واحذف التوكينات محليًا.
* التحقق من البريد: افتح رابط GET مباشرة أو صفحة وسيطة تستدعي الـ API ثم تعرض النتيجة.

[مكان مخطط تسلسلي Frontend: Axios interceptor → 401 → refresh → retry]

# 16) تطوير لاحق

* تعدد الجلسات وقائمة الأجهزة.
* ربط Refresh ببصمة جهاز (بحذر).
* Rate limiting لمحاولات login/refresh.
* 2FA وقياسات سلوكية للغش.
* اكتمال تدفق Reset Password (نقاط النهاية + القوالب جاهزة).

---

## خلاصة

* المنظومة تفصل بوضوح بين **Access/Verify/Refresh** عبر `type` ومدة صلاحية مختلفة.
* تحقق البريد يثبت ملكية البريد فعليًا.
* تدوير Refresh يحافظ على جلسات آمنة طويلة.
* SMTP مضبوط بعلامة تجارية وقوالب مرنة.
* التصميم معياري، آمن، وقابل للتوسع.

[مكان مخطط أخير يجمع التدفقات الأربعة: Signup, Verify, Login, Refresh/Logout]
