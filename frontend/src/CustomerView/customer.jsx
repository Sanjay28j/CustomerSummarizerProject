import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation, useNavigate } from "react-router-dom";

const issueTypes = [
  { value: "technical", label: "Technical Issue" },
  { value: "billing", label: "Billing Query" },
  { value: "feedback", label: "Feedback / Suggestion" },
  { value: "other", label: "Other" },
];

const CustomerView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fullName = location.state?.fullName || "Customer";

  const [form, setForm] = useState({
    name: "",
    email: "",
    issueType: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleLogout = () => {
    setLogoutDialogOpen(false);
    navigate("/");
  };

  if (submitted) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f5f5f5",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          Ticket Submitted Successfully 🎉
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 480 }}>
          Thanks for reaching out, {form.name || fullName}! Our support team
          will review your request and get back to you soon.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", email: "", issueType: "", description: "" });
          }}
        >
          Raise Another Ticket
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100vh", bgcolor: "#f5f6fa" }}>
      {/* Top App Bar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "white",
          color: "#333",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Welcome, {fullName} 👋
          </Typography>
          <IconButton onClick={() => setLogoutDialogOpen(true)} color="inherit">
            <AccountCircleIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Ticket Form Section */}
      <Grid
        container
        sx={{
          height: "calc(100vh - 64px)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item xs={11} sm={8} md={5} lg={4}>
          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 3,
              textAlign: "center",
              bgcolor: "white",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              Need Help?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Submit your issue below and we’ll get back to you shortly.
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                select
                fullWidth
                label="Issue Type"
                name="issueType"
                value={form.issueType}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              >
                {issueTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Describe your issue"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  py: 1.2,
                  fontWeight: 600,
                  borderRadius: 2,
                  bgcolor: "#1976d2",
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "#fff" }} />
                ) : (
                  "Submit Ticket"
                )}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        PaperProps={{
          sx: { borderRadius: 3, p: 2, textAlign: "center", minWidth: 300 },
        }}
      >
        <DialogTitle>Are you sure you want to logout?</DialogTitle>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button onClick={() => setLogoutDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            sx={{ px: 3 }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerView;
