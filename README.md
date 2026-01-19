# Real Estate Management System

A full-stack MERN (MongoDB, Express, React, Node.js) application for buying and selling houses and lands with a comprehensive admin panel.

## Features

- **User Authentication**: Login and signup for both users and admins
- **Property Management**: Buy and sell houses and lands
- **Admin Panel**: Complete management, monitoring, and control system
- **Form Validations**: Comprehensive client and server-side validations
- **Responsive Design**: Beautiful UI with Tailwind CSS
- **Animations**: Smooth animations throughout the application

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- express-validator for validation

### Frontend
- React
- React Router
- Tailwind CSS
- Axios
- React Icons

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/realestate
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional, defaults to localhost:5000):
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

## Usage

### Creating an Admin User

To create an admin user, you can either:
1. Register a new user and manually update the role in MongoDB to 'admin'
2. Use the registration endpoint with `role: 'admin'` in the request body (only if you modify the backend to allow this)

### Default Routes

- `/` - Home page with property listings
- `/login` - User/Admin login
- `/register` - User registration
- `/property/:id` - Property details
- `/add-property` - Add new property (protected)
- `/my-properties` - View user's properties (protected)
- `/edit-property/:id` - Edit property (protected)
- `/admin` - Admin panel (admin only)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Properties
- `GET /api/properties` - Get all properties (with filters)
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create property (protected)
- `PUT /api/properties/:id` - Update property (protected, owner/admin)
- `DELETE /api/properties/:id` - Delete property (protected, owner/admin)
- `GET /api/properties/user/my-properties` - Get user's properties (protected)

### Admin
- `GET /api/admin/stats` - Get dashboard statistics (admin only)
- `GET /api/admin/properties` - Get all properties (admin only)
- `GET /api/admin/users` - Get all users (admin only)
- `PUT /api/admin/properties/:id/status` - Update property status (admin only)
- `PUT /api/admin/properties/:id/featured` - Toggle featured property (admin only)
- `DELETE /api/admin/properties/:id` - Delete any property (admin only)
- `DELETE /api/admin/users/:id` - Delete user (admin only)

## Features in Detail

### Authentication
- Secure JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (user/admin)
- Protected routes

### Property Management
- Create, read, update, delete properties
- Filter by type (house/land), category (buy/sell), location, price
- Search functionality
- Property status management (available/pending/sold)
- Featured properties

### Admin Panel
- Dashboard with statistics
- Property management
- User management
- Status updates
- Featured property toggle

### Form Validations
- Client-side validations with real-time feedback
- Server-side validations with express-validator
- Error messages displayed to users

### Responsive Design
- Mobile-first approach
- Tailwind CSS for styling
- Responsive grid layouts
- Mobile-friendly navigation

### Animations
- Fade-in animations
- Slide-up/slide-down animations
- Hover effects
- Loading spinners
- Smooth transitions

## Project Structure

```
realEstateSite/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Property.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── properties.js
│   │   └── admin.js
│   ├── middleware/
│   │   └── auth.js
│   ├── app.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── PropertyDetail.jsx
│   │   │   ├── AddProperty.jsx
│   │   │   ├── EditProperty.jsx
│   │   │   ├── MyProperties.jsx
│   │   │   └── AdminPanel.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
└── README.md
```

## License

MIT
