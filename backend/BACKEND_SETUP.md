# Future Founders Network Backend

This Laravel REST API powers the Future Founders Network student business networking platform.

## Stack

- Laravel 12 REST API
- Laravel Sanctum bearer-token authentication
- MySQL database
- JSON responses using the shared shape:

```json
{
  "status": true,
  "message": "Success message",
  "data": {}
}
```

## Setup order

1. Install backend dependencies: `composer install`
2. Copy environment settings: `cp .env.example .env`
3. Generate an app key: `php artisan key:generate`
4. Configure MySQL values in `.env`
5. Run migrations and seed demo data: `php artisan migrate:fresh --seed`
6. Start the API: `php artisan serve`

## Seeded accounts

- Admin: `admin@futurefounders.test` / `password123`
- Students: `ava@example.test`, `liam@example.test`, `mia@example.test`, `noah@example.test`, `sophia@example.test` / `password123`

## Postman testing order

Use `http://127.0.0.1:8000/api` as the base URL.

1. Register: `POST /register`
2. Login: `POST /login`
3. Get Profile: `GET /profile`
4. Update Profile: `PUT /profile`
5. Get Chapters: `GET /chapters`
6. Join Chapter: `POST /chapters/{id}/join`
7. Get Events: `GET /events`
8. Register Event: `POST /events/{id}/register`
9. Create Post: `POST /posts`
10. Admin Login: `POST /login`
11. Admin Dashboard: `GET /admin/dashboard`
12. Approve Post: `PUT /admin/posts/{id}/approve`
13. Apply Membership: `POST /membership/apply`
14. Approve Membership: `PUT /admin/memberships/{id}/approve`

For protected user and admin requests, set `Authorization: Bearer <token>`.


## Password reset email testing

For local password reset testing, use the log mailer so reset emails are written to `storage/logs/laravel.log` instead of being sent to a real inbox:

```env
MAIL_MAILER=log
MAIL_FROM_ADDRESS="no-reply@futurefounders.test"
MAIL_FROM_NAME="Future Founders Network"
```

After changing mail settings, clear cached config and restart the API:

```bash
php artisan config:clear
php artisan cache:clear
php artisan serve
```

Then submit `POST /api/forgot-password` or use the React `/forgot-password` page and inspect the reset link:

```bash
tail -f storage/logs/laravel.log
```

For real email delivery, configure an SMTP provider such as Mailtrap:

```env
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_mailtrap_username
MAIL_PASSWORD=your_mailtrap_password
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="no-reply@futurefounders.com"
MAIL_FROM_NAME="Future Founders Network"
```

For Gmail SMTP, use a Google App Password rather than your normal Gmail password:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_gmail@gmail.com
MAIL_PASSWORD=your_google_app_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your_gmail@gmail.com
MAIL_FROM_NAME="Future Founders Network"
```

If your mail notification is queued, run `php artisan queue:work`. Also check spam/promotions folders when using real SMTP.
