// AgentDashboard.jsx
import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Dummy ticket data
const tickets = [
  {
    id: 1,
    subject: "Cannot login to account",
    rootCause:
      "Incorrect credentials or account locked due to multiple failed login attempts. The account may also be pending verification or temporarily disabled by the system admin for security reasons.",
    steps: [
      "Verify the username/email",
      "Check if account is locked",
      "Reset password if needed",
      "Ensure email verification is complete",
    ],
  },
  {
    id: 2,
    subject: "Payment not processed",
    rootCause:
      "Payment gateway timeout or failure due to connectivity issues. The transaction might have been declined by the bank or flagged for review due to unusual activity.",
    steps: [
      "Check payment logs",
      "Retry transaction",
      "Notify customer of failure",
      "Confirm with bank if transaction was blocked",
      "Verify user payment method",
    ],
  },
  {
    id: 3,
    subject: "App crashes on launch",
    rootCause:
      "Corrupted cache or outdated app version. There might also be compatibility issues with the operating system version or a conflict with another app running on the device.",
    steps: [
      "Clear app cache",
      "Update app to latest version",
      "Restart device",
    ],
  },
  {
    id: 4,
    subject: "Unable to reset password",
    rootCause:
      "Password reset link might have expired or the email did not reach the user's inbox due to spam filters. Additionally, the account may have special security restrictions requiring admin intervention.",
    steps: ["Check email spam/junk folder", "Send a new password reset link"],
  },
  {
    id: 5,
    subject: "Order not showing in account",
    rootCause:
      "Order details might not have synced due to server delay or temporary database inconsistencies. It could also be caused by an incomplete order submission or network issues during checkout.",
    steps: [
      "Verify order confirmation email",
      "Check backend order logs",
      "Resync order data",
    ],
  },
  {
    id: 6,
    subject: "Error 404 on accessing profile page",
    rootCause:
      "The profile page URL might be incorrect, or the server routing configuration is misaligned. Additionally, the user's session might have expired causing access denial.",
    steps: [
      "Verify URL",
      "Check server routing configuration",
      "Clear browser cache and retry",
      "Refresh session tokens",
    ],
  },
  {
    id: 7,
    subject: "Notifications not received",
    rootCause:
      "Push notifications may be blocked by device settings or the app may not have the required permissions. There could also be delays in the notification service or network connectivity issues.",
    steps: ["Check device notification settings", "Verify app permissions"],
  },
  {
    id: 8,
    subject: "Data export failing",
    rootCause:
      "Export may fail due to large dataset size, insufficient user permissions, or server timeout. It could also occur if there’s a format mismatch or a temporary service outage.",
    steps: [
      "Verify user permissions",
      "Try exporting smaller dataset",
      "Check server logs for errors",
      "Ensure correct export format",
      "Retry export during off-peak hours",
    ],
  },
];

const AgentDashboard = () => {
  const [selectedTicket, setSelectedTicket] = useState(tickets[0]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
      }}
    >
      {/* Left Panel: Ticket List */}
      <Paper
        elevation={3}
        sx={{
          width: "30%",
          overflowY: "auto",
        }}
      >
        <List>
          {tickets.map((ticket) => (
            <ListItemButton
              key={ticket.id}
              selected={selectedTicket.id === ticket.id}
              onClick={() => setSelectedTicket(ticket)}
            >
              <ListItemText
                primary={ticket.subject}
                secondary={`Ticket ID: ${ticket.id}`}
              />
            </ListItemButton>
          ))}
        </List>
      </Paper>

      {/* Right Panel: Ticket Details */}
      <Box
        sx={{
          width: "70%",
          p: 3,
          overflowY: "auto",
        }}
      >
        {selectedTicket ? (
          <>
            <Typography variant="h5" gutterBottom>
              {selectedTicket.subject}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {/* Root Cause */}
            <Typography variant="subtitle1" gutterBottom>
              <strong>Root Cause:</strong>
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {selectedTicket.rootCause}
            </Typography>

            {/* Troubleshooting Steps */}
            <Typography variant="subtitle1" gutterBottom>
              <strong>Troubleshooting Steps:</strong>
            </Typography>
            {selectedTicket.steps.map((step, index) => (
              <Accordion key={index} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Step {index + 1}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{step}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </>
        ) : (
          <Typography>Select a ticket to view details</Typography>
        )}
      </Box>
    </Box>
  );
};

export default AgentDashboard;
