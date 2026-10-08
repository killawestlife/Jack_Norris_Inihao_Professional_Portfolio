const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, "data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

// ===============================
// Middleware
// ===============================

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true }));

// Serve HTML, CSS, JS and assets
app.use(express.static(__dirname));

// ===============================
// Create data folder/file
// ===============================

function initializeStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, "[]", "utf8");
  }
}

initializeStorage();

// ===============================
// Contact Form API
// ===============================

app.post("/api/contact", (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      subject,
      message
    } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please complete all required fields."
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address."
      });
    }

    // Create message object
    const newMessage = {
      id: Date.now(),

      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone || "").trim(),
      company: String(company || "").trim(),
      subject: String(subject).trim(),
      message: String(message).trim(),

      receivedAt: new Date().toISOString()
    };

    // Read existing messages
    const messages = JSON.parse(
      fs.readFileSync(MESSAGES_FILE, "utf8")
    );

    // Add new message
    messages.push(newMessage);

    // Save messages
    fs.writeFileSync(
      MESSAGES_FILE,
      JSON.stringify(messages, null, 2),
      "utf8"
    );

    console.log("--------------------------------");
    console.log("NEW PORTFOLIO MESSAGE");
    console.log("--------------------------------");
    console.log("Name:", newMessage.name);
    console.log("Email:", newMessage.email);
    console.log("Company:", newMessage.company);
    console.log("Subject:", newMessage.subject);
    console.log("Message:", newMessage.message);
    console.log("--------------------------------");

    return res.status(201).json({
      success: true,
      message: "Your message has been received successfully."
    });

  } catch (error) {

    console.error("Contact form error:", error);

    return res.status(500).json({
      success: false,
      message: "The server encountered an error while processing your message."
    });
  }
});

// ===============================
// Backend health check
// ===============================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio backend is running."
  });
});

// ===============================
// Handle unknown API routes
// ===============================

app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found."
  });
});

// ===============================
// Serve portfolio
// ===============================

app.use((req, res, next) => {

  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(
      path.join(__dirname, "index.html")
    );
  }

  next();
});

// ===============================
// Start Server
// ===============================

app.listen(PORT, () => {
  console.log("");
  console.log("======================================");
  console.log(" JACK NORRIS INIHAO PORTFOLIO");
  console.log("======================================");
  console.log(`Portfolio: http://localhost:${PORT}`);
  console.log(`API:       http://localhost:${PORT}/api/contact`);
  console.log(`Health:    http://localhost:${PORT}/api/health`);
  console.log("======================================");
});