# Setup Instructions

## Quick Start Guide

### 1. Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. **IMPORTANT**: Create a `.env` file in the `backend` directory with the following content:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/realestate
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Make sure MongoDB is running on your system, or update `MONGODB_URI` to your MongoDB Atlas connection string.

5. Start the backend server:
```bash
npm run dev
```

### 2. Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm run dev
```

### 3. Creating an Admin User

After starting the backend, you can create an admin user by:

**Option 1**: Register through the frontend, then manually update the user in MongoDB:
```javascript
// In MongoDB shell or MongoDB Compass
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

**Option 2**: Use the registration API with admin role (you may need to temporarily modify the backend to allow this during setup).

### 4. Access the Application

- Frontend: http://localhost:5173 (or the port shown in terminal)
- Backend API: http://localhost:5000/api

## Troubleshooting

### MongoDB Connection Issues
- Make sure MongoDB is installed and running
- Check the `MONGODB_URI` in your `.env` file
- For MongoDB Atlas, ensure your IP is whitelisted

### Port Already in Use
- Change the `PORT` in backend `.env` file
- Update `VITE_API_URL` in frontend `.env` accordingly

### CORS Issues
- The backend is configured to allow all origins in development
- For production, update CORS settings in `backend/app.js`

## Next Steps

1. Register a user account
2. Create an admin user (see above)
3. Start adding properties!
4. Explore the admin panel for management features
