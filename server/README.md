# Blogify Server

Node.js backend API for the Blogify blog platform with authentication, content management, and AI integration.

## 🚀 Features

- **JWT Authentication**: Secure authentication with access/refresh tokens
- **Content Management**: Full CRUD operations for blog posts
- **AI Integration**: Google Gemini API for content generation
- **File Upload**: Image upload with Multer
- **Anonymous Comments**: Public commenting system
- **Admin Dashboard**: Statistics and analytics
- **Data Validation**: Joi schema validation
- **Error Handling**: Centralized error management
- **Security**: CORS, rate limiting, and secure headers

## 🛠️ Tech Stack

- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Google Gemini AI** for content generation
- **Multer** for file uploads
- **Joi** for data validation
- **bcrypt** for password hashing

## 📁 Project Structure

```
server/
├── src/
│   ├── config/          # Configuration files
│   │   ├── db.js        # Database connection
│   │   ├── env.js       # Environment variables
│   │   ├── gemini.js    # AI configuration
│   │   └── multer.js    # File upload config
│   ├── controllers/     # Route controllers
│   │   ├── auth.controller.js
│   │   ├── post.controller.js
│   │   ├── comment.controller.js
│   │   ├── category.controller.js
│   │   ├── user.controller.js
│   │   └── dashboard.controller.js
│   ├── middleware/      # Custom middleware
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── validate.middleware.js
│   ├── models/          # Mongoose models
│   │   ├── User.js
│   │   ├── Post.js
│   │   ├── Comment.js
│   │   └── Category.js
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── validations/     # Joi validation schemas
│   └── app.js          # Express app setup
├── scripts/            # Utility scripts
│   └── create-admin.js # Admin user creation
└── server.js          # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Google Gemini API key

### Installation

1. **Install dependencies**

```bash
npm install
```

2. **Environment Setup**

```bash
cp .env.example .env
```

Configure your `.env` file:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/blogify
JWT_ACCESS_SECRET=your_access_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
GEMINI_API_KEY=your_gemini_api_key_here
```

3. **Start MongoDB**

```bash
# If using local MongoDB
mongod
```

4. **Create Admin User**

```bash
npm run create-admin
```

5. **Start the Server**

```bash
# Development
npm run dev

# Production
npm start
```

## 📚 API Endpoints

### Authentication

- `POST /api/v1/auth/login` - Admin login
- `POST /api/v1/auth/logout` - Logout user
- `POST /api/v1/auth/refresh-token` - Refresh access token

### Posts

- `GET /api/v1/posts` - Get published posts (public)
- `GET /api/v1/posts/admin/all` - Get all posts (admin)
- `GET /api/v1/posts/:id` - Get post by ID
- `POST /api/v1/posts` - Create post (admin)
- `PUT /api/v1/posts/:id` - Update post (admin)
- `DELETE /api/v1/posts/:id` - Delete post (admin)
- `POST /api/v1/posts/generate-content` - AI content generation (admin)

### Categories

- `GET /api/v1/categories` - Get all categories (public)
- `POST /api/v1/categories` - Create category (admin)
- `PUT /api/v1/categories/:id` - Update category (admin)
- `DELETE /api/v1/categories/:id` - Delete category (admin)

### Comments

- `GET /api/v1/comments/post/:postId` - Get post comments (public)
- `GET /api/v1/comments/admin/all` - Get all comments (admin)
- `POST /api/v1/comments` - Create comment (anonymous)
- `PUT /api/v1/comments/:id` - Update comment (admin)
- `DELETE /api/v1/comments/:id` - Delete comment (admin)

### Dashboard

- `GET /api/v1/dashboard/stats` - Get dashboard statistics (admin)

### Users

- `GET /api/v1/users/profile/me` - Get own profile (admin)
- `PUT /api/v1/users/profile/me` - Update own profile (admin)

## 🔧 Available Scripts

| Command                | Description                           |
| ---------------------- | ------------------------------------- |
| `npm start`            | Start production server               |
| `npm run dev`          | Start development server with nodemon |
| `npm run create-admin` | Create admin user                     |
| `npm run list-models`  | List available Gemini models          |

## 🔐 Authentication

The API uses JWT tokens with the following approach:

- **Access Token**: Short-lived (15 minutes), stored in httpOnly cookie
- **Refresh Token**: Long-lived (7 days), stored in httpOnly cookie
- **Admin Only**: Most endpoints require admin authentication

## 🤖 AI Integration

- **Google Gemini API**: Used for automated content generation
- **Content Generation**: Creates blog content based on titles
- **Configurable**: Model selection and parameters can be adjusted

## 📁 File Upload

- **Multer Configuration**: Handles image uploads
- **File Types**: Supports common image formats (JPG, PNG, GIF)
- **Size Limits**: Configurable file size restrictions
- **Storage**: Local file system storage

## 🛡️ Security Features

- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers
- **Rate Limiting**: API rate limiting
- **Input Validation**: Joi schema validation
- **Password Hashing**: bcrypt for secure password storage
- **JWT Security**: Secure token implementation

## 🗄️ Database Models

### User

- Authentication and profile information
- Admin role management

### Post

- Blog post content and metadata
- Category relationships
- Featured image support

### Comment

- Anonymous commenting system
- Post relationships

### Category

- Post categorization
- Hierarchical structure support

## 🔗 Related

- [Client Documentation](../client/README.md)
- [Root Documentation](../README.md)
