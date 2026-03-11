# Blogify Client

React frontend application for the Blogify blog platform.

## 🚀 Features

- **Modern React App**: Built with React 18 and Vite for fast development
- **State Management**: Redux Toolkit for efficient state management
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Rich Text Editor**: Advanced content editing capabilities
- **Admin Panel**: Comprehensive dashboard for content management
- **Real-time Updates**: Live data refresh and notifications
- **File Upload**: Image upload with preview functionality
- **Form Validation**: Client-side validation with React Hook Form

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form handling and validation
- **React Hot Toast** - Toast notifications
- **Axios** - HTTP client
- **React Icons** - Icon library

## 📁 Project Structure

```
client/
├── public/              # Static assets
├── src/
│   ├── api/            # API client configuration
│   ├── components/     # Reusable UI components
│   │   ├── ui/         # Base UI components
│   │   └── layouts/    # Layout components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   │   ├── admin/      # Admin panel pages
│   │   ├── auth/       # Authentication pages
│   │   ├── blog/       # Blog-related pages
│   │   └── home/       # Home page components
│   ├── redux/          # Redux store and slices
│   ├── routes/         # Route configurations
│   ├── utils/          # Utility functions
│   └── main.jsx        # Application entry point
├── index.html          # HTML template
└── vite.config.js      # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

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
VITE_BACKEND_URL=http://localhost:5000/api/v1
```

3. **Start Development Server**

```bash
npm run dev
```

4. **Build for Production**

```bash
npm run build
```

## 📱 Pages & Routes

### Public Routes

- `/` - Home page with blog posts
- `/blog/:id` - Individual blog post view
- `/contact` - Contact page
- `/about` - About page

### Admin Routes (Protected)

- `/admin` - Admin dashboard
- `/admin/posts` - Post management
- `/admin/comments` - Comment management
- `/login` - Admin login

## 🎨 UI Components

The app includes a comprehensive set of reusable UI components:

- **Form Components**: Input, Textarea, Button, FormField
- **Layout Components**: Card, Table, Dialog, Dropdown
- **Feedback Components**: Badge, Loader, Toast notifications
- **Navigation Components**: Responsive navigation and sidebar

## 🔧 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## 🌐 Environment Variables

```env
VITE_BACKEND_URL=http://localhost:5000/api/v1  # Backend API URL
```

## 🎯 Key Features

### Admin Panel

- Dashboard with statistics and recent activity
- Post management with rich text editor
- Comment moderation system
- Category management
- AI-powered content generation
- File upload for featured images

### Public Interface

- Responsive blog post listing
- Individual post view with comments
- Anonymous commenting system
- Category filtering
- Mobile-optimized design

## 🔗 Related

- [Server Documentation](../server/README.md)
- [Root Documentation](../README.md)
