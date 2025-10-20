# Medical UI Project - Medication Tracker

A full-stack web application for tracking medications, calculating refill dates, and monitoring medication adherence. Built with React.js, Express.js, and Tailwind CSS.

## 🏗️ Tech Stack

### Frontend
- **React 19** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Modern React Patterns** - Hooks, functional components

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **In-memory storage** - No database required

## 📋 Features

✅ **Medication Management**
- Add, edit, and delete medications
- Store medication name, dosage, frequency, start date, and quantity

✅ **Refill Calculator**
- Automatically calculates days remaining
- Determines next refill date
- Visual progress bars showing medication remaining

✅ **Status Tracking**
- 🟢 **On Track** - More than 7 days remaining
- 🟡 **Running Low** - 1-7 days remaining
- 🔴 **Overdue** - Refill needed immediately

✅ **Adherence Monitoring**
- Mark doses as taken or missed
- Calculate adherence percentage
- Track dose history

✅ **Refill Alerts**
- Visual alerts for medications needing refills
- Dashboard statistics for quick overview

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Running

#### 1. Backend Server

```bash
cd medical-backend
npm install
npm start
```

The backend server will run on **http://localhost:5000**

#### 2. Frontend Application

Open a new terminal:

```bash
cd medical-frontend
npm install
npm start
```

The frontend application will open automatically at **http://localhost:3000**

## 📡 API Endpoints

### Medications
- `GET /api/medications` - Get all medications
- `GET /api/medications/:id` - Get medication by ID
- `POST /api/medications` - Create new medication
- `PUT /api/medications/:id` - Update medication
- `DELETE /api/medications/:id` - Delete medication

### Refill Alerts
- `GET /api/refill-alerts` - Get medications needing refills

### Dose Tracking
- `POST /api/doses` - Record a dose (taken/missed)
- `GET /api/medications/:id/doses` - Get dose history

## 💊 Example Calculation

```javascript
// Example:
// 30 tablets, 2 per day, started 10 days ago
// Remaining = 30 - (taken doses based on history)
// Days left = Remaining ÷ 2 = days
// Next refill = today + days left
```

## 📁 Project Structure

```
React-Medical-UI-App/
├── medical-backend/
│   ├── server.js              # Express server entry point
│   ├── data/
│   │   └── store.js           # In-memory data storage
│   ├── controllers/
│   │   └── medicationController.js  # Business logic
│   ├── routes/
│   │   └── medications.js     # API routes
│   └── middleware/
│       └── errorHandler.js    # Error handling
│
└── medical-frontend/
    ├── src/
    │   ├── App.js             # Main application component
    │   ├── services/
    │   │   └── api.js         # API service layer
    │   └── components/
    │       ├── MedicationForm.js      # Add/Edit form
    │       ├── MedicationList.js      # List display
    │       ├── MedicationCard.js      # Individual card
    │       ├── ProgressBar.js         # Visual progress
    │       └── RefillAlerts.js        # Alert notifications
    └── public/
```

## 🎨 UI Features

- **Clean, minimalistic design** - Focus on functionality
- **Responsive layout** - Works on all screen sizes
- **Color-coded status** - Quick visual identification
- **Interactive forms** - Real-time validation
- **Dashboard statistics** - Overview at a glance

## 🔧 Development Notes

### Backend
- Uses in-memory storage (data resets on server restart)
- CORS enabled for frontend communication
- RESTful API design
- Comprehensive error handling

### Frontend
- Component-based architecture
- Centralized API service
- State management with React hooks
- Form validation
- Toast notifications

## 📝 Usage Guide

### Adding a Medication

1. Click **"+ Add Medication"** button
2. Fill in the form:
   - Medication name (e.g., "Lisinopril")
   - Dosage (e.g., "10mg")
   - Frequency (times per day, e.g., "2")
   - Start date
   - Quantity received (e.g., "30")
3. Click **"Add Medication"**

### Recording Doses

- Click **"Mark Taken"** when you take a dose
- Click **"Mark Missed"** if you miss a dose
- Adherence percentage updates automatically

### Editing Medications

1. Click **"Edit"** on any medication card
2. Update the information
3. Click **"Update Medication"**

### Monitoring Refills

- Check the **Refill Alerts** section at the top
- View the **progress bar** on each medication card
- Monitor **days remaining** for each medication

## 🛡️ Best Practices Implemented

- ✅ Clean, modular code structure
- ✅ Separation of concerns (MVC pattern)
- ✅ Error handling and validation
- ✅ Responsive design
- ✅ User-friendly interface
- ✅ RESTful API design
- ✅ Component reusability
- ✅ Modern ES6+ JavaScript
- ✅ Functional React components with hooks

## 📦 Dependencies

### Backend
- express: ^4.18.2
- cors: ^2.8.5

### Frontend
- react: ^19.2.0
- react-dom: ^19.2.0
- tailwindcss: ^4.1.15

## 🎯 Future Enhancements

- Medication search using public APIs
- Export refill schedule (PDF/CSV)
- Local storage persistence
- User authentication
- Multiple user profiles
- Medication reminders/notifications
- Calendar view of refill dates

## 👨‍💻 Author

Created by [Braydon Viragh](https://github.com/braydonviragh)

## 📄 License

MIT License - Feel free to use this project for learning and development.

---

**Built with ❤️ using React, Express, and Tailwind CSS**

