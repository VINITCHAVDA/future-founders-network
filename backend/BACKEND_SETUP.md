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
