import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Person, BarChart, School } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({
    name: "Loading...",
    email: "Loading...",
    profilePicture: "/images/profile-default.png",
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Get the user session data from sessionStorage
        const user = JSON.parse(sessionStorage.getItem("user"));

        // Ensure the session is valid and contains a username
        if (user && user.username) {
          const response = await axios.get(
            `http://127.0.0.1:8000/users/students/details/${user.username}/`,
            { withCredentials: true } // Include session credentials
          );

          setStudentData(response.data); // Update state with student data
        } else {
          console.error("No valid user session found.");
          navigate("/login"); // Redirect to login if no session
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [navigate]);

  return (
    <Box
      sx={{
        width: "250px",
        backgroundColor: "#001E3C",
        color: "white",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        overflow: "hidden",
      }}
    >
      {/* Profile Section */}
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Avatar
          src={studentData.profilePicture || "/images/profile-default.png"}
          alt="Profile"
          sx={{ width: 80, height: 80, margin: "0 auto" }}
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {studentData.username || "Student Name"}
        </Typography>
        <Typography variant="body2">{studentData.email || "student@example.com"}</Typography>
      </Box>

      <Divider sx={{ backgroundColor: "white", mb: 2 }} />

      {/* Navigation */}
      <List>
        <ListItem button onClick={() => navigate("/profile")}>
          <ListItemIcon>
            <Person sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={() => navigate("/keep-track")}>
          <ListItemIcon>
            <BarChart sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Check Progress" />
        </ListItem>
        <ListItem button onClick={() => navigate("/units")}>
          <ListItemIcon>
            <School sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Learning Page" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
