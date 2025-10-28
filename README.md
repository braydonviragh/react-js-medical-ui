# Medical UI Project - Medication Tracker

A full-stack web application for tracking medications, calculating refill dates, and monitoring medication adherence. Built with React.js, Express.js, and Tailwind CSS.

## 🎯 Overview

This project helps patients track medications, calculate refill dates, and monitor adherence. It features a unique hybrid architecture where the backend simulates API calls while the frontend uses localStorage for persistence.

### Key Features
- ✅ Add, edit, and delete medications
- ✅ Track doses as "taken" or "missed" 
- ✅ Real-time refill calculations and alerts
- ✅ Visual progress bars and status indicators
- ✅ Adherence percentage tracking
- ✅ Modal-based forms with responsive design

## 🏗️ Tech Stack

**Frontend:** React.js, Tailwind CSS, LocalStorage API  
**Backend:** Node.js, Express.js (API simulation)  
**Deployment:** Railway

## 🚀 Getting Started

### Quick Start
```bash
# Install dependencies
npm install

# Start both servers
npm run dev
```

This starts:
- **Backend**: http://localhost:5001 (API endpoints)
- **Frontend**: http://localhost:3000 (React app)

### Manual Setup
```bash
# Backend
cd medical-backend && npm install && node server.js

# Frontend (new terminal)
cd medical-frontend && npm install && npm start
```

## 📡 Architecture

### Backend Simulation
The backend is built with production-ready structure but simulates API responses:

```json
{
  "success": true,
  "message": "Data fetched from your local storage"
}
```

### Data Flow
1. Frontend makes HTTP request to backend
2. Backend validates and returns success response  
3. Frontend performs localStorage operation
4. UI updates with localStorage data

## 💊 Smart Calculations

Doses are tracked by user input, not automatic time calculations:

```javascript
// Example: 30 tablets, 2 per day, 8 doses taken
const dosesRemaining = 30 - 8; // 22 tablets
const status = dosesRemaining > 7 ? 'on-track' : 'running-low';
```

## 🚀 Deploy to Production

Deploy to Railway with a single command:

```bash
npx @railway/cli login
./deploy-railway.sh
```

The backend serves the React frontend, eliminating CORS issues.

## 📝 Usage

1. **Add Medication**: Click "+ Add Medication" → Fill form → Save
2. **Track Doses**: Click "Mark Taken" or "Mark Missed" on cards
3. **Monitor Status**: Check progress bars and refill alerts
4. **Edit/Delete**: Use buttons on medication cards

## 🔧 Development Notes

- **No Database**: Uses localStorage for simplicity and portability
- **API Simulation**: Maintains full-stack architecture without persistence complexity
- **User-Driven**: Doses tracked by user input rather than automatic calculations
- **Production-Ready**: Code structured exactly as it would be with a real database
