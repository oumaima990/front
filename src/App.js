import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import UnitsPage from "./components/UnitsPage";
import TeacherDashboard from "./components/TeacherDashboard";
import KeepTrackPage from "./components/KeepTrackPage"; // Add this if missing
import TextPage from "./components/TextPage";
import ProfilePage from "./components/ProfilePage"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/units" element={<UnitsPage />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/keep-track/" element={<KeepTrackPage />} />
        <Route path="/text/:textId" element={<TextPage />} /> {/* Add this */}
        <Route path="/profile/" element={<ProfilePage />} />

      </Routes>
    </Router>
  );
}

export default App;
