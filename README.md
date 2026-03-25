# Shortify

> A clean, full-stack URL shortening web application built with Node.js, Express, MongoDB, and EJS — with user authentication and deployed on Vercel.

##  Features

- **Authentication** — Secure signup/login with protected routes
- **URL Shortening** — Convert long URLs into short links
- **Redirect** — Instant redirection to original URLs
- **Dashboard** — Manage all links in one place
- **QR Generator** — Generate QR codes for easy sharing
- **Image Compression** — Reduce image size efficiently
- **Responsive UI** — Clean EJS + CSS interface
- **Deployed on Vercel** — Live and accessible



##  Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB (Mongoose) |
| Templating | EJS |
| Auth | JWT / Middleware |
| Deployment | Vercel |

##  Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or above)
- [MongoDB](https://www.mongodb.com/) (local or MongoDB Atlas)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Isha-Chaudhary48/shortifyURL.git
cd shortifyURL

# 2. Install dependencies
npm install

# 3. Create a .env file in the root directory
touch .env
```

### Environment Variables

Add the following to your `.env` file:

```env
MONGO_URL=your_mongodb_connection_string
SECRET=your_jwt_secret_key
PORT=8000
```

### Run the App

```bash
# Start the development server
node index.js
```

Open your browser and visit: `http://localhost:8000`

---

## Deployment

This project is deployed on **Vercel**. The `vercel.json` file is already configured. To deploy your own instance:

```bash
npm install -g vercel
vercel
```

Make sure to add your environment variables in the Vercel dashboard under **Project Settings → Environment Variables**.

---

##  Live Demo

🔗 [https://shortify-url-ten.vercel.app](https://shortify-url-ten.vercel.app)



