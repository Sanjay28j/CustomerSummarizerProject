/* eslint-disable no-undef */
import React, { useState, useMemo } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from "@mui/material";

// Placeholder components — you'll later replace these with your actual chart or component imports
import VolumeTrendChart from "../Charts/VolumeTrendChart";
import SentimentDistributionChart from "../Charts/SentimentDistributionChart";
import TopSlaBreachesChart from "../Charts/TopSlaBreachesChart";
// import SlaKpiCards from "./SlaKpiCards";

// Slide-up transition for Dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ManagerDashboard = () => {
  const [viewMode, setViewMode] = useState("date");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const [cardDialogOpen, setCardDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // default daily data
  const dailyData = [
    { date: "2025-09-01", count: 20 },
    { date: "2025-09-02", count: 34 },
    { date: "2025-09-03", count: 28 },
    { date: "2025-09-04", count: 45 },
    { date: "2025-09-05", count: 30 },
    { date: "2025-09-06", count: 50 },
    { date: "2025-09-07", count: 38 },
  ];

  // monthly data
  const monthlyData = [
    { date: "2025-01", count: 120 },
    { date: "2025-02", count: 180 },
    { date: "2025-03", count: 160 },
    { date: "2025-04", count: 210 },
    { date: "2025-05", count: 240 },
    { date: "2025-06", count: 200 },
    { date: "2025-07", count: 260 },
    { date: "2025-08", count: 280 },
    { date: "2025-09", count: 248 },
  ];

  // Choose which dataset to show based on toggle
  const chartData = useMemo(
    () => (viewMode === "date" ? dailyData : monthlyData),
    [viewMode]
  );

  // Mock SLA breach data for dialog
  const agentDetails = {
    name: "John Doe",
    team: "Technical Support",
    ticketsHandled: 42,
    breaches: [
      {
        id: "TCK-101",
        issue: "Network Downtime",
        target: "2 hrs",
        actual: "4.5 hrs",
        delay: 2.5,
      },
      {
        id: "TCK-102",
        issue: "Login Failure",
        target: "1 hr",
        actual: "3 hrs",
        delay: 2,
      },
      {
        id: "TCK-103",
        issue: "API Timeout",
        target: "3 hrs",
        actual: "5.5 hrs",
        delay: 2.5,
      },
    ],
  };

  const handleOpenDialog = (agent = agentDetails) => {
    setSelectedAgent(agent);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setCardDialogOpen(true);
  };

  const handleCardDialogClose = () => {
    setCardDialogOpen(false);
    setSelectedCard(null);
  };

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#f5f6fa",
        minHeight: "100vh",
        width: "100vw",
        overflowX: "auto",
      }}
    >
      {/* ---------------------- Row 1: KPI Cards ---------------------- */}

      <Grid
        container
        spacing={2}
        sx={{
          width: "95%",
          margin: 0,
        }}
      >
        {[
          {
            title: "SLA Breaches (Today)",
            current: 12,
            lastWeek: 15,
            higherIsBetter: true, // lower is better
          },
          {
            title: "Avg Resolution Time",
            current: 4.6,
            lastWeek: 9.2,
            higherIsBetter: true, // lower is better
          },
          {
            title: "Total Tickets",
            current: 248,
            lastWeek: 220,
            higherIsBetter: true, // higher is better
          },
          {
            title: "CSAT Score",
            current: 95,
            lastWeek: 85,
            higherIsBetter: true, // higher is better
          },
        ].map((card, index) => {
          const diff = card.current - card.lastWeek;

          // Determine "good" cases based on KPI
          let isGood = false;
          if (
            card.title === "SLA Breaches (Today)" ||
            card.title === "Avg Resolution Time"
          ) {
            isGood = card.current < card.lastWeek;
          } else {
            isGood = card.current > card.lastWeek;
          }

          const arrow = diff > 0 ? "↑" : "↓";
          const arrowColor = isGood ? "success.main" : "error.main";

          return (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={3}
              sx={{
                flexGrow: 1,
                flexBasis: 0,
                maxWidth: "25%",
              }}
            >
              <Paper
                elevation={3}
                onClick={() => handleCardClick(card)}
                sx={{
                  p: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  transition: "all 0.3s ease",
                  "&:hover": { boxShadow: 12, transform: "scale(1.02)" },
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  {card.title}
                </Typography>

                {/* Arrow + number in same line */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mt: 1,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ color: arrowColor, fontWeight: 600 }}
                  >
                    {arrow}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {card.current}
                    {card.title === "CSAT Score" ? "%" : ""}
                  </Typography>
                </Box>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  vs last week
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* ---------------------- Row 2: Volume Trend Chart ---------------------- */}
      <Grid container spacing={2} sx={{ mt: 6 }}>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              height: 400,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: 1400,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="h6">Ticket Volume Trends</Typography>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant={viewMode === "date" ? "contained" : "outlined"}
                  size="small"
                  onClick={() => setViewMode("date")}
                >
                  Date-wise
                </Button>
                <Button
                  variant={viewMode === "month" ? "contained" : "outlined"}
                  size="small"
                  onClick={() => setViewMode("month")}
                >
                  Month-wise
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "text.secondary",
              }}
            >
              {/* Passing chartData here */}
              <VolumeTrendChart data={chartData} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* ---------------------- Row 3: Sentiment & SLA Breaches ---------------------- */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {/* Left: Sentiment Distribution */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              height: 350,
              display: "flex",
              flexDirection: "column",
              width: 700,
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Sentiment Distribution
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "text.secondary",
              }}
            >
              <SentimentDistributionChart />
            </Box>
          </Paper>
        </Grid>

        {/* Right: Top 5 SLA Breaches */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            onClick={() => handleOpenDialog()}
            sx={{
              p: 2,
              height: 350,
              display: "flex",
              flexDirection: "column",
              width: 650,
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: 12, // slightly higher elevation
                transform: "scale(1.02)",
              },
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Top 5 SLA Breaches (By Agent)
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "text.secondary",
              }}
            >
              <TopSlaBreachesChart />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* ---------------------- Dialog: SLA Breach Details ---------------------- */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          SLA Breach Details —{" "}
          {selectedAgent ? selectedAgent.name : "Agent Name"}
        </DialogTitle>

        <DialogContent dividers>
          {selectedAgent && (
            <>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Team: <strong>{selectedAgent.team}</strong>
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Tickets Handled: <strong>{selectedAgent.ticketsHandled}</strong>
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Ticket ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Issue Type</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>SLA Target</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      Actual Resolution
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Delay (hrs)</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {selectedAgent.breaches.map((b, i) => (
                    <TableRow key={i}>
                      <TableCell>{b.id}</TableCell>
                      <TableCell>{b.issue}</TableCell>
                      <TableCell>{b.target}</TableCell>
                      <TableCell>{b.actual}</TableCell>
                      <TableCell>{b.delay}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ---------------------- Dialog: Card Data ---------------------- */}
      <Dialog
        open={cardDialogOpen}
        onClose={handleCardDialogClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>{selectedCard?.title} — Details</DialogTitle>
        <DialogContent>
          {selectedCard && (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}
            >
              <Typography>
                Previous Week Value:{" "}
                <strong>
                  {selectedCard.lastWeek}
                  {selectedCard.title === "CSAT Score" ? "%" : ""}
                </strong>
              </Typography>
              <Typography>
                This Week Value:{" "}
                <strong>
                  {selectedCard.current}
                  {selectedCard.title === "CSAT Score" ? "%" : ""}
                </strong>
              </Typography>
              <Typography>
                Difference:{" "}
                <strong>
                  {selectedCard.current - selectedCard.lastWeek > 0 ? "↑" : "↓"}{" "}
                  {Math.abs(selectedCard.current - selectedCard.lastWeek)}
                  {selectedCard.title === "CSAT Score" ? "%" : ""}
                </strong>
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCardDialogClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManagerDashboard;
