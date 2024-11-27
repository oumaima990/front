import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { Line } from "react-chartjs-2";
import axios from "axios";

const CheckProgressPage = () => {
  const [knowledgeComponents, setKnowledgeComponents] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchKnowledgeComponents = async () => {
      try {
        // Replace with the provided endpoint and student ID
        const response = await axios.get(
          "http://127.0.0.1:8000/users/students/get_student_knowledge_components/?student_id=10"
        );
        const data = response.data.knowledge_components;

        setKnowledgeComponents(data);

        // Prepare data for the chart
        const labels = data.map((kc) => kc.component_name);
        const percentages = data.map((kc) => kc.mastery_percentage);

        setChartData({
          labels,
          datasets: [
            {
              label: "Mastery Percentage",
              data: percentages,
              borderColor: "#0288d1",
              backgroundColor: "rgba(2, 136, 209, 0.2)",
              borderWidth: 2,
              pointRadius: 5,
              pointBackgroundColor: "#0288d1",
              pointBorderColor: "#fff",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching knowledge components:", error);
      }
    };

    fetchKnowledgeComponents();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        padding: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#001E3C",
          mb: 4,
        }}
      >
        Check Your Progress
      </Typography>

      {/* Graph Section */}
      <Card
        sx={{
          maxWidth: 800,
          margin: "0 auto",
          padding: 4,
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 3, fontWeight: "bold", color: "#0288d1" }}
        >
          Progress Overview
        </Typography>
        {chartData.labels ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  ticks: {
                    callback: (value) => `${value}%`,
                  },
                },
              },
            }}
          />
        ) : (
          <Typography
            sx={{ textAlign: "center", color: "#757575", mt: 4 }}
          >
            Loading progress data...
          </Typography>
        )}
      </Card>

      {/* Knowledge Components */}
      <Grid container spacing={3} sx={{ mt: 5 }}>
        {knowledgeComponents.map((kc) => (
          <Grid item xs={12} sm={6} md={4} key={kc.component_name}>
            <Card
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                background: "#fff",
                border: "1px solid #e0e0e0",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#001E3C", mb: 1 }}
              >
                {kc.component_name}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: "1rem", color: "#757575" }}
              >
                Mastery: {kc.mastery_percentage}%
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CheckProgressPage;
