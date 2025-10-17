import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
  Container,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  // Basic state
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Predefined credentials
  const credentials = {
    Agent: { username: "agent@example.com", password: "agent123" },
    Customer: { username: "customer@example.com", password: "cust123" },
    Manager: { username: "manager@example.com", password: "mgr123" },
  };

  // Email validation
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = () => {
    if (!role || !username || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (!validateEmail(username)) {
      alert("Please enter a valid email address");
      return;
    }

    const creds = credentials[role];
    if (!creds || username !== creds.username || password !== creds.password) {
      alert("Invalid username or password for selected role");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      const fullNameMap = {
        Agent: "Ravi Verma",
        Customer: "Sanjay J",
        Manager: "Sajith P",
      };

      const fullName = fullNameMap[role];

      // Redirect based on role with fullName
      if (role === "Agent") navigate("/agent", { state: { fullName } });
      else if (role === "Customer")
        navigate("/customer", { state: { fullName } });
      else if (role === "Manager")
        navigate("/manager", { state: { fullName } });
    }, 1000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Box textAlign="center" mb={3}>
          <Typography variant="body1" color="text.secondary">
            Please enter your username and password to access your account.
          </Typography>
        </Box>

        <Paper
          elevation={3}
          sx={{ p: 3, width: "100%", boxSizing: "border-box" }}
        >
          {/* User Role */}
          <TextField
            select
            fullWidth
            label={
              <span>
                Select Type of User <span style={{ color: "red" }}>*</span>
              </span>
            }
            value={role}
            onChange={(e) => setRole(e.target.value)}
            margin="dense"
          >
            {["Agent", "Customer", "Manager"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          {/* Email */}
          <TextField
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label={
              <span>
                Email ID <span style={{ color: "red" }}>*</span>
              </span>
            }
            placeholder="Enter your email"
            margin="dense"
          />

          {/* Password */}
          <TextField
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label={
              <span>
                Password <span style={{ color: "red" }}>*</span>
              </span>
            }
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            margin="dense"
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <IconButton
            //         onClick={() => setShowPassword(!showPassword)}
            //         size="small"
            //       >
            //         <VisibilityIcon fontSize="small" />
            //       </IconButton>
            //     </InputAdornment>
            //   ),
            // }}
          />

          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#2a3182",
              "&:hover": { backgroundColor: "#1a1f5c" },
            }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : "Login"}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
