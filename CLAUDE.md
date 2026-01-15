# Bookmark Backend

## Project Overview
A simple NestJS backend for storing bookmarks/links from social apps (XHS, Facebook, Instagram, etc.). Users can perform CRUD operations on their bookmarks.

## Tech Stack
- **Framework:** NestJS 10
- **Database:** PostgreSQL with TypeORM
- **Validation:** class-validator, class-transformer
- **Config:** @nestjs/config with .env file

## Project Structure
```
src/
├── main.ts                              # Entry point with ValidationPipe
├── app.module.ts                        # Root module (ConfigModule, TypeOrmModule)
├── bookmarks/
│   ├── bookmarks.module.ts
│   ├── bookmarks.controller.ts          # REST endpoints
│   ├── bookmarks.service.ts             # CRUD logic with userId filtering
│   ├── dto/
│   │   ├── create-bookmark.dto.ts
│   │   └── update-bookmark.dto.ts
│   └── entities/
│       └── bookmark.entity.ts           # id, url, userId, createdAt, updatedAt
└── common/
    ├── guards/
    │   └── user.guard.ts                # Validates x-user-id header
    └── decorators/
        └── user-id.decorator.ts         # Extracts userId in controllers
```

## Authentication
Currently uses a simple `x-user-id` header for user identification. The UserGuard validates the header exists and attaches it to the request. **This is for demo/development only - not secure for production.**

## API Endpoints
All endpoints require `x-user-id` header.

| Method | Endpoint         | Description           |
|--------|------------------|-----------------------|
| POST   | /bookmarks       | Create bookmark       |
| GET    | /bookmarks       | List user's bookmarks |
| GET    | /bookmarks/:id   | Get single bookmark   |
| PATCH  | /bookmarks/:id   | Update bookmark       |
| DELETE | /bookmarks/:id   | Delete bookmark       |

## Database
- PostgreSQL database named `bookmarks`
- TypeORM with `synchronize: true` (auto-creates tables)
- Config via environment variables in `.env`

## Running the Project
```bash
# Create database
createdb bookmarks

# Install dependencies
pnpm install

# Start dev server
pnpm run start:dev
```

## Environment Variables (.env)
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=bookmarks
```

## Known Limitations / TODOs
From code review - improvements needed for production:

### Critical
- [ ] Replace x-user-id header with JWT authentication
- [ ] Disable `synchronize: true`, use migrations instead

### High Priority
- [ ] Add database index on `userId` column
- [ ] Implement pagination for findAll endpoint
- [ ] Add rate limiting (@nestjs/throttler)
- [ ] Add CORS configuration
- [ ] Validate environment variables on startup (Joi)

### Medium Priority
- [ ] Add global exception filter
- [ ] Create response DTOs (don't expose userId to clients)
- [ ] Strengthen URL validation (http/https only)
- [ ] Add structured logging

### Nice to Have
- [ ] Health check endpoint (@nestjs/terminus)
- [ ] Swagger/OpenAPI documentation
- [ ] Unit and E2E tests
- [ ] Soft delete for bookmarks
