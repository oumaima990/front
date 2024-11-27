import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const UnitsPage = () => {
  const [units, setUnits] = useState([]);
  const [texts, setTexts] = useState([]);
  const [selectedUnitTitle, setSelectedUnitTitle] = useState("");
  const navigate = useNavigate();

  const studentData = {
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "/images/profile-default.png",
  };

  useEffect(() => {
    const fetchUnits = () => {
      const unitsData = [
        { id: 1, grade: 1, unit: 1, title: "Grade 1: Unit 1" },
        { id: 2, grade: 1, unit: 2, title: "Grade 1: Unit 2" },
        { id: 3, grade: 2, unit: 1, title: "Grade 2: Unit 1" },
        { id: 4, grade: 3, unit: 1, title: "Grade 3: Unit 1" },
      ];
      setUnits(unitsData);
    };

    fetchUnits();
  }, []);

  const fetchTexts = async (grade, unit, unitTitle) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/knowledge/text/get-texts/?grade=${grade}&unit=${unit}`
      );
      setTexts(response.data); // Set the texts returned by the endpoint
      setSelectedUnitTitle(unitTitle); // Set the title of the selected unit
    } catch (err) {
      console.error("Error fetching texts:", err);
    }
  };

  const handleTextClick = (textId) => {
    navigate(`/text/${textId}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f0f4ff, #e6f7ff)", // Soft gradient
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: "250px", // Fixed width for the sidebar
          backgroundColor: "#001E3C",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 3,
        }}
      >
        <Sidebar
          studentName={studentData.name}
          email={studentData.email}
          profilePicture={studentData.profilePicture}
        />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          p: 3,
        }}
      >
        {/* AppBar */}
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#001E3C",
            mb: 3,
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
                fontSize: "1.5rem",
                color: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: "0.15rem",
              }}
            >
              Units Page
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Page Header */}
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: "bold",
            color: "#001E3C",
            textAlign: "center",
            textShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          Discover Your Units
        </Typography>

        {/* Units Grid */}
        <Grid container spacing={4}>
          {units.map((unit) => (
            <Grid item xs={12} sm={6} md={4} key={unit.id}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: "15px",
                  boxShadow: "0 4px 12px rgba(128, 128, 128, 0.4)", // Grey shadow
                  background: "linear-gradient(to bottom, #ffffff, #f9f9f9)",
                  border: "1px solid #d3d3d3", // Grey border
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 20px rgba(128, 128, 128, 0.5)", // Enhanced shadow on hover
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    color: "#001E3C",
                  }}
                >
                  {unit.title.split(":")[0]}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1rem",
                    color: "#555",
                    mt: 1,
                  }}
                >
                  {unit.title.split(":")[1]}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 3,
                    backgroundColor: "#0288d1",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#0277bd" },
                  }}
                  onClick={() => fetchTexts(unit.grade, unit.unit, unit.title)}
                >
                  Explore Unit
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Texts Section */}
        {texts.length > 0 && (
          <Box sx={{ mt: 5 }}>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                fontWeight: "bold",
                color: "#001E3C",
                textAlign: "center",
                textShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              Texts in {selectedUnitTitle}
            </Typography>
            <Grid container spacing={3}>
              {texts.map((text) => (
                <Grid item xs={12} key={text.id}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      textAlign: "center",
                      borderRadius: "10px",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                      cursor: "pointer",
                      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
                      },
                    }}
                    onClick={() => handleTextClick(text.id)}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "#001E3C",
                      }}
                    >
                      {text.title}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UnitsPage;
