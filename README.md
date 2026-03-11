# Blogify

A modern full-stack blog platform with AI-powered content generation, admin panel, and anonymous commenting system.

## 🚀 Features

- **Admin Authentication**: Secure JWT-based authentication with refresh tokens
- **Content Management**: Create, edit, and manage blog posts with rich text editor
- **AI Content Generation**: Powered by Google Gemini API for automated content creation
- **Anonymous Comments**: Public commenting system without user registration
- **Category Management**: Organize posts with categories
- **File Upload**: Featured image support for blog posts
- **Admin Dashboard**: Comprehensive admin panel with statistics
- **Responsive Design**: Mobile-first responsive UI
- **Real-time Updates**: Live data refresh and updates

## 🛠️ Tech Stack

### Frontend

- **React 18** with Vite
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **React Hook Form** for form handling
- **React Hot Toast** for notifications

### Backend

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** authentication with httpOnly cookies
- **Google Gemini AI** for content generation
- **Multer** for file uploads
- **Joi** for validation

## 📁 Project Structure

```
blogify/
├── client/          # React frontend application
├── server/          # Node.js backend API
└── README.md        # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Google Gemini API key

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd blogify
```

2. **Setup Backend**

```bash
cd server
npm install
cp .env.example .env
# Configure your .env file
npm run dev
```

3. **Setup Frontend**

```bash
cd client
npm install
cp .env.example .env
# Configure your .env file
npm run dev
```

4. **Create Admin User**

```bash
cd server
npm run create-admin
```

## 🔧 Environment Variables

### Server (.env)

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/blogify
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
GEMINI_API_KEY=your_gemini_api_key
```

### Client (.env)

```env
VITE_BACKEND_URL=http://localhost:5000/api/v1
```

## 📚 API Documentation

The API follows RESTful conventions with the following main endpoints:

- **Auth**: `/api/v1/auth/*` - Authentication endpoints
- **Posts**: `/api/v1/posts/*` - Blog post management
- **Comments**: `/api/v1/comments/*` - Comment system
- **Categories**: `/api/v1/categories/*` - Category management
- **Dashboard**: `/api/v1/dashboard/*` - Admin statistics
- **Users**: `/api/v1/users/*` - User profile management

## 🎯 Key Features

### Admin Panel

- Dashboard with statistics
- Post management (CRUD operations)
- Comment moderation
- Category management
- AI content generation

### Public Features

- Browse published posts
- Anonymous commenting
- Category filtering
- Responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Client Documentation](./client/README.md)
- [Server Documentation](./server/README.md)
