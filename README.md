# Mini Feed App 📱

A full-stack social media feed application built with **React Native (Expo)** and **Node.js + MongoDB** backend. Create posts, like, comment, and interact with a community in real-time.

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-61dafb?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

</div>

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Key Implementation Details](#key-implementation-details)
- [Usage Guide](#usage-guide)
- [Development Notes](#development-notes)
- [Performance Optimizations](#performance-optimizations)
- [Security Features](#security-features)
- [Future Enhancements](#future-enhancements)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### 🔐 Authentication
- **User Registration**: Create account with email and password
- **User Login**: Secure authentication with JWT tokens
- **Token Storage**: Secure JWT token storage using Expo Secure Store
- **Protected Routes**: Auth middleware protects API endpoints

### 📰 Feed System
- **Infinite Scroll Feed**: Paginated feed with smooth scrolling
- **Pull-to-Refresh**: Refresh feed to see latest posts
- **Real-time Updates**: Live feed updates with optimistic UI
- **Loading States**: Proper loading indicators for better UX

### ✍️ Posts
- **Create Posts**: Write posts with title and description
- **View Posts**: See all posts from the community
- **Edit Posts**: Update your own posts
- **Delete Posts**: Remove unwanted posts
- **Post Details**: Full post view with interactions

### ❤️ Like System
- **Like/Unlike**: Toggle likes on posts
- **Like Count**: Display total likes per post
- **Optimistic Updates**: Instant UI feedback
- **Real-time Like Tracking**: Know who liked your posts

### 💬 Comments
- **Add Comments**: Comment on posts
- **View Comments**: See all comments on a post
- **Comment Modal**: Easy comment interface
- **Comment Display**: Show comments in post details

### 🎨 UI/UX Features
- **Error Boundary**: Catch and display app errors gracefully
- **Form Validation**: Real-time validation for all forms
- **User-Friendly Messages**: Clear error and success messages
- **Responsive Design**: Works on all device sizes

---

## 🛠️ Tech Stack

### Frontend
- **React Native** - Cross-platform mobile development
- **Expo** - React Native framework with managed workflow
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Navigation between screens
- **Expo Router** - File-based routing
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form state management
- **Expo Haptics** - Haptic feedback
- **Expo Image Picker** - Image selection
- **Expo Secure Store** - Secure token storage
- **React Native Reanimated** - Smooth animations

### Backend
- **Node.js** - JavaScript runtime
- **TypeScript** - Type-safe server code
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Express Rate Limit** - Rate limiting
- **Swagger UI** - API documentation
- **tsx** - TypeScript execution

---

## 📦 Prerequisites

Ensure you have the following installed:

- **Node.js** - v16 or higher
- **npm** or **yarn** - Package manager
- **MongoDB** - v4.4 or higher (local or cloud instance like MongoDB Atlas)
- **Expo CLI** - Install with `npm install -g expo-cli`
- **Git** - Version control

### Optional
- **Xcode** - For iOS development (macOS only)
- **Android Studio** - For Android development

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mini-feed.git
cd mini-feed
```

### Backend Setup

#### Step 1: Navigate to Backend Directory
```bash
cd backend
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Create Environment File
```bash
cp .env.example .env
```
Or manually create a `.env` file in the backend directory.

#### Step 4: Configure Environment Variables
Edit `.env` with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/mini-feed
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mini-feed?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
JWT_EXPIRE=7d

# Upload Configuration
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880

# CORS
CORS_ORIGIN=http://localhost:3000,exp://localhost:19000
```

#### Step 5: Start MongoDB
If using local MongoDB:
```bash
# macOS with Homebrew
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# Start MongoDB from Services or run mongod directly
```

Or use MongoDB Atlas (cloud):
- Create a cluster at https://www.mongodb.com/cloud/atlas
- Get your connection string and update `MONGODB_URI` in `.env`

#### Step 6: Run Backend in Development Mode
```bash
npm run dev
```

The backend will start on `http://localhost:5000`

You can access Swagger API docs at `http://localhost:5000/api-docs`

#### Backend Build and Production
```bash
# Build TypeScript to JavaScript
npm run build

# Run production build
npm start
```

### Frontend Setup

#### Step 1: Navigate to Frontend Directory
```bash
cd frontend
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Configure API Base URL (if needed)
Edit `frontend/services/axios.ts`:
```typescript
const API_BASE_URL = 'http://your-backend-url:5000';
```

#### Step 4: Start Expo Development Server
```bash
npx expo start
```

#### Step 5: Run on Device/Simulator

**iOS (requires Xcode on macOS):**
```bash
# Press 'i' in terminal
# Or scan QR code with Camera app (iOS 11+)
npx expo start --ios
```

**Android (requires Android Studio):**
```bash
# Press 'a' in terminal
# Or scan QR code with Expo Go app
npx expo start --android
```

**Web:**
```bash
npx expo start --web
# Then press 'w' in terminal
```

#### Frontend Additional Commands
```bash
# Lint code
npm run lint

# Reset project (clears cache)
npm run reset-project

# Run on specific platform
npm run ios
npm run android
npm run web
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "userId",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt-token-here"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "userId",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt-token-here"
}
```

#### Get User by ID
```http
GET /auth/:id
Authorization: Bearer <jwt-token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "userId",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Posts Endpoints

**All post endpoints require Authentication header:**
```
Authorization: Bearer <jwt-token>
```

#### Get Feed (Paginated)
```http
GET /posts/feed?page=1&limit=10
Authorization: Bearer <jwt-token>
```

**Response (200):**
```json
{
  "success": true,
  "posts": [
    {
      "_id": "postId",
      "authorId": "userId",
      "title": "My First Post",
      "description": "This is an amazing post",
      "media": [],
      "likes": ["userId1", "userId2"],
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "totalPages": 5,
  "currentPage": 1
}
```

#### Create Post
```http
POST /posts
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "My First Post",
  "description": "This is an amazing post"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Post created successfully",
  "post": {
    "_id": "postId",
    "authorId": "userId",
    "title": "My First Post",
    "description": "This is an amazing post",
    "media": [],
    "likes": [],
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Get Post Details
```http
GET /posts/:id
Authorization: Bearer <jwt-token>
```

**Response (200):**
```json
{
  "success": true,
  "post": {
    "_id": "postId",
    "authorId": {
      "_id": "userId",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "title": "My First Post",
    "description": "This is an amazing post",
    "media": [],
    "likes": ["userId1", "userId2"],
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Update Post
```http
PUT /posts/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Post updated successfully",
  "post": { }
}
```

#### Delete Post
```http
DELETE /posts/:id
Authorization: Bearer <jwt-token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

### Likes Endpoints

#### Like/Unlike Post
```http
POST /likes/:postId
Authorization: Bearer <jwt-token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Post liked/unliked successfully",
  "liked": true,
  "totalLikes": 5
}
```

### Comments Endpoints

#### Add Comment
```http
POST /comments/:postId
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "text": "Great post!"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Comment added successfully",
  "comment": {
    "_id": "commentId",
    "postId": "postId",
    "authorId": "userId",
    "text": "Great post!",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Get Post Comments
```http
GET /comments/:postId
Authorization: Bearer <jwt-token>
```

**Response (200):**
```json
{
  "success": true,
  "comments": [
    {
      "_id": "commentId",
      "postId": "postId",
      "authorId": {
        "_id": "userId",
        "name": "John Doe"
      },
      "text": "Great post!",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

## 📂 Project Structure

```
mini-feed/
│
├── backend/                          # Express + MongoDB server
│   ├── src/
│   │   ├── app.ts                   # Express app setup & routes
│   │   ├── server.ts                # Server entry point
│   │   ├── swagger.ts               # Swagger API documentation
│   │   │
│   │   ├── config/
│   │   │   ├── db.ts                # MongoDB connection
│   │   │   ├── env.ts               # Environment variables
│   │   │   └── upload.ts            # Multer configuration
│   │   │
│   │   ├── controllers/
│   │   │   ├── AuthController.ts    # Authentication logic
│   │   │   ├── PostController.ts    # Post CRUD operations
│   │   │   ├── CommentController.ts # Comment operations
│   │   │   └── LikeController.ts    # Like functionality
│   │   │
│   │   ├── models/
│   │   │   ├── User.ts              # User schema
│   │   │   ├── Post.ts              # Post schema
│   │   │   └── Comment.ts           # Comment schema
│   │   │
│   │   ├── routes/
│   │   │   ├── Auth.ts              # Auth routes
│   │   │   ├── Post.ts              # Post routes
│   │   │   ├── Comment.ts           # Comment routes
│   │   │   └── Like.ts              # Like routes
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts   # JWT verification
│   │   │   ├── error.middleware.ts  # Error handling
│   │   │   └── security.middleware.ts # Security headers
│   │   │
│   │   └── utils/
│   │       ├── jwt.ts               # JWT utilities
│   │       └── hash.ts              # Password hashing
│   │
│   ├── uploads/                     # Uploaded files
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/                         # React Native Expo app
│   ├── app/                         # Expo Router pages
│   │   ├── _layout.tsx              # Root layout
│   │   ├── index.tsx                # Home screen
│   │   ├── add-post.tsx             # Create post screen
│   │   ├── modal.tsx                # Modal screens
│   │   │
│   │   ├── (auth)/                  # Auth screens (group)
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx            # Auth home
│   │   │   ├── login.tsx            # Login screen
│   │   │   └── register.tsx         # Registration screen
│   │   │
│   │   ├── (tabs)/                  # Tab screens (group)
│   │   │   ├── _layout.tsx
│   │   │   └── index.tsx            # Feed screen
│   │   │
│   │   └── post/                    # Post detail
│   │       └── [id].tsx             # Dynamic post page
│   │
│   ├── components/
│   │   ├── ErrorBoundary.tsx        # Error boundary
│   │   ├── PostCard.tsx             # Post card component
│   │   ├── LikesModal.tsx           # Likes modal
│   │   ├── parallax-scroll-view.tsx # Animated scroll view
│   │   ├── themed-text.tsx          # Styled text
│   │   ├── themed-view.tsx          # Styled view
│   │   ├── hello-wave.tsx           # Welcome animation
│   │   ├── external-link.tsx        # Link component
│   │   ├── haptic-tab.tsx           # Tab with haptic
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx           # Custom button
│   │       ├── Card.tsx             # Card component
│   │       ├── Input.tsx            # Input field
│   │       ├── Text.tsx             # Text styles
│   │       ├── collapsible.tsx      # Expandable section
│   │       └── icon-symbol.tsx      # Icon components
│   │
│   ├── hooks/
│   │   ├── useAuth.ts               # Auth state hook
│   │   ├── useFeed.ts               # Feed data hook
│   │   ├── usePost.tsx              # Post data hook
│   │   └── use-color-scheme.ts      # Theme hook
│   │
│   ├── api/
│   │   ├── auth.ts                  # Auth API calls
│   │   ├── post.ts                  # Post API calls
│   │   ├── comment.ts               # Comment API calls
│   │   └── like.ts                  # Like API calls
│   │
│   ├── services/
│   │   ├── axios.ts                 # Axios configuration
│   │   └── storage.ts               # Secure token storage
│   │
│   ├── constants/
│   │   └── theme.ts                 # Theme colors & styles
│   │
│   ├── assets/
│   │   └── images/                  # App images
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── app.json
│
└── README.md                         # This file
```

---

## 🔑 Key Implementation Details

### Frontend Architecture

#### State Management with Custom Hooks
- **useAuth.ts**: Manages user authentication state and token storage
- **useFeed.ts**: Handles feed data, pagination, and infinite scroll
- **usePost.tsx**: Manages individual post data and interactions

#### Feed Screen Implementation
- **FlatList**: Efficient rendering of large lists
- **Infinite Scroll**: Pagination with automatic loading of next pages
- **Pull-to-Refresh**: Swipe down to refresh feed data
- **Optimistic Updates**: Instant UI feedback for likes
- **Loading States**: Proper indicators during data fetching

#### Navigation Structure
- **Auth Stack**: Login and registration screens
- **Main Stack**: Feed, post details, and create post screens
- **Modal Screens**: Comments and likes modals
- **Protected Routes**: Auth middleware prevents unauthorized access

#### Performance Optimizations
- **useCallback**: Memoized event handlers prevent unnecessary re-renders
- **useMemo**: Cached liked post IDs for efficient filtering
- **FlatList optimization**: keyExtractor and removeClippedSubviews
- **Image optimization**: Lazy loading and caching

#### Form Handling
- **React Hook Form**: Efficient form state management
- **Validation**: Real-time field validation
- **Error Messages**: User-friendly error feedback
- **Input Components**: Reusable styled input fields

### Backend Architecture

#### MVC Pattern
- **Controllers**: Business logic for each resource
- **Models**: MongoDB schemas with Mongoose
- **Routes**: API endpoint definitions

#### Authentication
- **JWT Token**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **Token Verification**: Auth middleware checks every request
- **Token Storage**: Secure token storage on frontend

#### Database Design

**User Model:**
```
- name: string
- email: string (unique)
- password: string (hashed)
- createdAt: timestamp
```

**Post Model:**
```
- authorId: ref to User
- title: string (max 70 chars)
- description: string (max 200 chars)
- media: array of media URLs
- likes: array of user IDs
- createdAt: timestamp
```

**Comment Model:**
```
- postId: ref to Post
- authorId: ref to User
- text: string
- createdAt: timestamp
```

#### Error Handling
- **Error Middleware**: Centralized error handling
- **HTTP Status Codes**: Proper status codes for different scenarios
- **User-Friendly Messages**: Clear error descriptions
- **Validation**: Input validation before processing

#### Security Features
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers
- **Rate Limiting**: Prevent abuse (configured but can be enabled)
- **Input Sanitization**: Prevent injection attacks
- **Password Hashing**: Bcryptjs for secure passwords

---

## 💻 Usage Guide

### For First-Time Users

#### 1. Register Account
1. Launch the app
2. Tap "Register" on the auth screen
3. Enter name, email, and password
4. Create account (auto-login on success)

#### 2. Create Your First Post
1. Tap the "+" button to create a post
2. Enter post title (max 70 characters)
3. Add description (max 200 characters)
4. Tap "Post" to publish

#### 3. Explore the Feed
1. Scroll through posts from other users
2. Pull down to refresh
3. See who liked each post
4. View post details and comments

#### 4. Interact with Posts
- **Like a Post**: Tap the heart icon
- **Add Comment**: Tap "Comment" button
- **View Comments**: Tap on post to see full details
- **View Profile**: Tap author name to see user profile

### API Integration

#### Client-Side API Usage

**Making Authenticated Requests:**
```typescript
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000'
});

// Add token to requests
apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**Fetching Posts:**
```typescript
const response = await apiClient.get('/posts/feed?page=1&limit=10');
const posts = response.data.posts;
```

**Creating a Post:**
```typescript
const newPost = await apiClient.post('/posts', {
  title: 'My Post',
  description: 'Post description'
});
```

---

## 🧑‍💻 Development Notes

### Code Quality
- **TypeScript**: Full type safety throughout
- **ESLint**: Code linting with Expo rules
- **Functional Components**: React best practices
- **Error Handling**: Comprehensive error management

### Best Practices Followed
- **Component Composition**: Reusable, modular components
- **Separation of Concerns**: Clear responsibility division
- **DRY Principle**: Don't repeat yourself
- **Performance**: Optimization throughout
- **Accessibility**: Accessible UI components
- **Security**: Secure authentication and storage

### Development Tools
- **TypeScript**: Type-safe development
- **tsx**: TypeScript execution for backend
- **ESLint**: Code quality checking
- **Expo Debugger**: Built-in debugging tools
- **React DevTools**: Component inspection

### Common Development Patterns

**Custom Hook Pattern:**
```typescript
const useCustomHook = () => {
  const [state, setState] = useState(null);
  
  useEffect(() => {
    // Side effects
  }, []);
  
  return { state };
};
```

**Optimized Event Handler:**
```typescript
const handlePress = useCallback(() => {
  // Handle event
}, [dependencies]);
```

**Memoized Computation:**
```typescript
const likedPostIds = useMemo(() => {
  return posts.filter(p => p.liked).map(p => p.id);
}, [posts]);
```

---

## ⚡ Performance Optimizations

### Frontend Optimizations
- **useCallback**: Memoize event handlers to prevent unnecessary renders
- **useMemo**: Cache computed values
- **Lazy Loading**: Images load as they appear on screen
- **FlatList**: Efficient list rendering with:
  - keyExtractor for unique keys
  - removeClippedSubviews for memory optimization
  - initialNumToRender for faster first render
- **Bundle Size**: Tree-shaking unused code
- **Image Caching**: Store images locally for fast loading

### Backend Optimizations
- **Database Indexing**: Indexes on frequently queried fields
- **Pagination**: Limit data returned per request
- **Caching**: Reduce database queries
- **Connection Pooling**: Efficient database connections
- **Compression**: Gzip response compression
- **Rate Limiting**: Prevent abuse and overload

### Network Optimization
- **Request Batching**: Combine multiple requests when possible
- **Debouncing**: Limit rapid successive requests
- **Throttling**: Control request frequency
- **Offline Support**: Cache critical data locally

---

## 🔒 Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication
- **Token Expiration**: Tokens expire after set duration
- **Secure Storage**: Tokens stored in Expo Secure Store
- **Auth Middleware**: Protects routes from unauthorized access

### Password Security
- **Hashing**: Passwords hashed with bcryptjs
- **Salt Rounds**: 10 rounds for strong hashing
- **No Plaintext**: Passwords never stored as plaintext
- **Strong Requirements**: Enforce password complexity

### API Security
- **CORS**: Restrict API access to allowed origins
- **Helmet**: Security headers protection
- **Rate Limiting**: Prevent brute force attacks
- **Input Validation**: Validate all user inputs
- **SQL Injection Prevention**: Mongoose prevents injection

### Data Privacy
- **HTTPS**: Encrypt data in transit
- **User Isolation**: Users can only modify their data
- **Secure Endpoints**: Require authentication for sensitive operations

---

## 🚀 Future Enhancements

### Phase 2 Features
- [ ] **User Profiles**: User profile pages with bio and stats
- [ ] **Follow System**: Follow/unfollow users
- [ ] **User Search**: Find and follow other users
- [ ] **Direct Messaging**: Private messaging between users
- [ ] **Notifications**: Push notifications for interactions

### Phase 3 Features
- [ ] **Image/Media Upload**: Post images and videos
- [ ] **Trending Hashtags**: Trending topics section
- [ ] **User Mentions**: @mention other users
- [ ] **Rich Text Editor**: Format post text
- [ ] **Saved Posts**: Bookmark favorite posts

### Performance & Infrastructure
- [ ] **Real-time Updates**: WebSocket for live feed
- [ ] **Caching Layer**: Redis for faster data retrieval
- [ ] **CDN Integration**: Serve media from CDN
- [ ] **Microservices**: Break into microservices
- [ ] **Load Balancing**: Handle high traffic

### Features & User Experience
- [ ] **Dark Mode**: Dark theme support
- [ ] **Internationalization**: Multi-language support
- [ ] **Offline Mode**: Use cached data offline
- [ ] **Analytics**: Track user behavior
- [ ] **Admin Dashboard**: Moderation tools

---

## 🆘 Troubleshooting

### Common Issues

#### Backend Won't Start

**Issue**: `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solution**:
```bash
# Make sure MongoDB is running
# macOS
brew services start mongodb-community

# Check if port is available
lsof -i :5000
```

#### Frontend Can't Connect to Backend

**Issue**: Network request fails

**Solution**:
1. Check if backend is running on correct port
2. Update `API_BASE_URL` in `frontend/services/axios.ts`
3. Check CORS configuration in backend `app.ts`
4. Verify firewall allows connections

#### Token Expiration Issues

**Issue**: "Unauthorized" errors after some time

**Solution**:
- Token has expired, user needs to login again
- Check `JWT_EXPIRE` in `.env`
- Implement token refresh mechanism

#### Port Already in Use

**Issue**: `Address already in use :::5000`

**Solution**:
```bash
# Kill process using port
lsof -i :5000
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

#### Dependencies Issues

**Issue**: `npm ERR! peer dep missing`

**Solution**:
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### MongoDB Connection Issues

**Issue**: `MongoNetworkError`

**Solution**:
1. Verify MongoDB URI in `.env`
2. Check MongoDB is running
3. If using MongoDB Atlas, whitelist your IP
4. Check firewall settings

### Debug Tips

**Backend Debugging:**
```bash
# Add debug logs
NODE_DEBUG=* npm run dev

# Check database connection
mongo "mongodb://localhost:27017/mini-feed"
```

**Frontend Debugging:**
```bash
# Enable Expo debugger
Press 'j' in terminal to open debugger
Press 'r' to reload
Press 'm' to toggle menu
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

### Getting Started
1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/mini-feed.git`
3. Create a feature branch: `git checkout -b feature/amazing-feature`

### Development Workflow
1. Make your changes
2. Test thoroughly on multiple devices
3. Commit with clear messages: `git commit -m "feat: add amazing feature"`
4. Push to your branch: `git push origin feature/amazing-feature`
5. Open a pull request

### Code Standards
- Follow existing code style
- Use TypeScript for type safety
- Add tests for new features
- Update documentation
- Keep commits atomic and well-described

### Commit Message Format
```
feat: add new feature
fix: resolve bug
docs: update documentation
style: improve code formatting
refactor: restructure code
test: add tests
```

---

## 📄 License

This project is licensed under the **ISC License**. See the LICENSE file for details.

---

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/mini-feed/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/mini-feed/discussions)
- **Email**: your-email@example.com

---

## 🙏 Acknowledgments

- **Expo** - For the amazing React Native framework
- **MongoDB** - For the flexible database
- **Express** - For the simple web framework
- **React Navigation** - For seamless navigation
- **Community** - For feedback and contributions

---

## 📈 Project Statistics

- **Frontend**: ~2,000 lines of TypeScript/TSX
- **Backend**: ~1,500 lines of TypeScript
- **Components**: 15+ reusable components
- **API Endpoints**: 15+ endpoints
- **Database Models**: 3 main models
- **Custom Hooks**: 3 custom hooks

---

<div align="center">

**[⬆ back to top](#mini-feed-app-)**

Made with ❤️ by the Mini Feed Team

</div>