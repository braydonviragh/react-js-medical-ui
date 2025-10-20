# 🚀 Quick Start Guide - Medical UI Project

## ✅ Status: Both servers are RUNNING!

Your full-stack application is now live and working:

- **Backend API**: http://localhost:5000
- **Frontend App**: http://localhost:3000

## 📱 How to Use the App

### 1. Open Your Browser
Navigate to: **http://localhost:3000**

### 2. Add Your First Medication
- Click the **"+ Add Medication"** button
- Fill in the form:
  - **Name**: e.g., "Lisinopril" 
  - **Dosage**: e.g., "10mg"
  - **Frequency**: e.g., "2" (times per day)
  - **Start Date**: Select the date you started
  - **Quantity**: e.g., "30" (total pills received)
- Click **"Add Medication"**

### 3. Track Your Doses
- Click **"Mark Taken"** when you take your medication
- Click **"Mark Missed"** if you miss a dose
- Watch your adherence percentage update automatically

### 4. Monitor Refills
- Check the **progress bar** to see how much medication remains
- View **days remaining** until refill
- See **refill alerts** at the top when running low

### 5. Manage Medications
- Click **"Edit"** to update medication details
- Click **"Delete"** to remove a medication

## 🔧 Stopping the Servers

If you need to stop the servers:

1. **Stop Frontend**: Go to the terminal running React and press `Ctrl+C`
2. **Stop Backend**: Go to the terminal running Express and press `Ctrl+C`

## 🔄 Restarting the Servers

### Start Backend:
```bash
cd medical-backend
npm start
```

### Start Frontend (in a new terminal):
```bash
cd medical-frontend
npm start
```

## ✨ Key Features

- ✅ Automatic refill date calculations
- ✅ Visual progress bars for medication tracking
- ✅ Color-coded status indicators (Green/Yellow/Red)
- ✅ Adherence tracking with percentages
- ✅ Dashboard statistics
- ✅ Real-time refill alerts
- ✅ Full CRUD operations (Create, Read, Update, Delete)

## 📊 Understanding the Status Colors

- 🟢 **Green (On Track)**: More than 7 days of medication left
- 🟡 **Yellow (Running Low)**: 1-7 days remaining - refill soon!
- 🔴 **Red (Overdue)**: Out of medication - refill immediately!

## 🧪 Test Data

A test medication has already been created:
- **Name**: Lisinopril
- **Dosage**: 10mg
- **Frequency**: 2x daily
- **Quantity**: 30 pills

Open the app to see it in action!

## 💡 Tips

1. **Data Persistence**: Currently uses in-memory storage. Data will reset when the backend server restarts.
2. **Multiple Medications**: You can add as many medications as you need.
3. **Adherence Tracking**: Record doses daily for accurate adherence percentages.
4. **Refill Planning**: The app calculates refill dates based on your usage patterns.

## 🐛 Troubleshooting

### Frontend won't load?
- Make sure backend is running first on port 5000
- Check for any errors in the browser console
- Try clearing browser cache and refreshing

### Backend errors?
- Ensure port 5000 is not in use by another application
- Check the backend terminal for error messages

### Styling not working?
- Tailwind CSS v3 is now properly installed and configured
- Clear browser cache and hard refresh (Ctrl+F5)

---

**Enjoy tracking your medications! 💊✨**

