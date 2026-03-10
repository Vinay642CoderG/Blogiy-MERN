# Blog App Backend

A Node.js/Express backend API for a blog application with authentication and user management.

## Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Gemini AI (Content Generation)
- Jest + Supertest (Testing)

## Installation

1. Install dependencies

```bash
npm install
```

2. Configure environment variables in `.env`

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/blogDB
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES=7d
JWT_REFRESH_EXPIRES=7d
GEMINI_API_KEY=your_gemini_api_key
```

3. Start MongoDB

```bash
mongosh
```

4. Run the application

```bash
# Development
npm run dev

# Production
npm start
```

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration
```

Test environment uses `.env.test` with separate test database.

## Project Structure

```
server/
├── src/
│   ├── config/              # Configuration files
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── validations/         # Joi validation schemas
│   └── app.js              # Express app setup
├── tests/
│   ├── unit/               # Unit tests
│   ├── integration/        # Integration tests
│   ├── helpers/            # Test utilities
│   ├── setup.js            # Global test setup
│   └── db.config.js        # Test database config
├── scripts/                # Utility scripts
├── uploads/                # File upload directory
├── .env                    # Environment variables
├── .env.test              # Test environment variables
├── jest.config.js         # Jest configuration
└── server.js              # Entry point
```

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/me` - Get current user

### Posts

- `GET /api/v1/posts` - Get all published posts (public)
- `GET /api/v1/posts/:id` - Get post by ID
- `GET /api/v1/posts/slug/:slug` - Get post by slug (public)
- `POST /api/v1/posts` - Create post (admin only)
- `PUT /api/v1/posts/:id` - Update post (admin only)
- `DELETE /api/v1/posts/:id` - Delete post (admin only)

### Comments

- `GET /api/v1/comments/post/:postId` - Get post comments (public)
- `POST /api/v1/comments` - Create comment (authenticated)
- `PUT /api/v1/comments/:id` - Update comment (author/admin)
- `DELETE /api/v1/comments/:id` - Delete comment (author/admin)

### AI Content Generation

- `POST /api/v1/ai/suggest-titles` - Generate title suggestions (admin only)
- `POST /api/v1/ai/suggest-content` - Generate post content (admin only)

See `AI_FEATURE.md` for detailed AI feature documentation.

### Users

- Protected routes require authentication via HTTP-only cookies

## Scripts

| Command                 | Description              |
| ----------------------- | ------------------------ |
| `npm start`             | Start production server  |
| `npm run dev`           | Start development server |
| `npm test`              | Run all tests            |
| `npm run test:coverage` | Run tests with coverage  |
