# Subscription Tracker

## Overview

Subscription Tracker is a monolithic backend built with Node.js and Express.js to manage user subscriptions. It connects to a MongoDB database, secures API routes using Arcjet, and automates subscription tracking with Upstash Workflows and QStash. It also sends scheduled email reminders to users before their subscriptions renew.

## Features

- **User Management:**  
  Create, update, and retrieve user profiles with secure authentication using JWT and bcrypt.

- **Subscription Management:**  
  CRUD operations for subscriptions with automatic renewal date calculations.

- **Automated Reminders:**  
  Scheduled reminders are sent via email, powered by Upstash Workflows for subscription tracking.

- **API Security:**  
  Endpoints are secured with JWT-based authentication and Arcjet protection (rate limiting, bot detection).

## Technologies & Tools

- **Languages & Runtime:**  
  - JavaScript (ES6+)  
  - Node.js

- **Framework & Libraries:**  
  - Express.js  
  - Mongoose (MongoDB ODM)  
  - JWT & bcrypt for authentication  
  - Nodemailer for sending emails  
  - dayjs for date manipulation  
  - Arcjet for API security  
  - Upstash Workflows and QStash for automation

- **Development Tools:**  
  - dotenv for environment variable management  
  - ESLint for code quality  
  - nodemon for development auto-reloading

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14+ recommended)
- [MongoDB](https://www.mongodb.com/) instance
- npm (or yarn)

### Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/subdub.git
   cd subdub
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Configure Environment Variables:**

   Create a `.env.development.local` file in the project root (this file is already ignored by git as per `.gitignore`). Populate it with the required variables:

   ```ini
   PORT=3000
   DB_URI=mongodb://localhost:27017/subdub
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=1d
   ARCJET_ENV=development
   ARCJET_KEY=your_arcjet_key
   QSTASH_TOKEN=your_qstash_token
   QSTASH_URL=https://your-qstash-url.upstash.com
   SERVER_URL=http://localhost:3000
   EMAIL_PASSWORD=your_email_password
   ```

4. **Run the Application:**

   For development:
   ```bash
   npm run dev
   ```
   For production:
   ```bash
   npm start
   ```

## API Endpoints

- **Authentication:**  
  - `POST /api/v1/auth/sign-up`  
  - `POST /api/v1/auth/sign-in`  
  - `POST /api/v1/auth/sign-out`

- **User Management:**  
  - `GET /api/v1/users`  
  - `GET /api/v1/users/:id`

- **Subscription Management:**  
  - `GET /api/v1/subscriptions`  
  - `GET /api/v1/subscriptions/user/:id`  
  - `GET /api/v1/subscriptions/:id`  
  - `POST /api/v1/subscriptions`  
  - `PUT /api/v1/subscriptions/:id`  
  - `DELETE /api/v1/subscriptions/:id`  
  - `PUT /api/v1/subscriptions/:id/cancel`  
  - `GET /api/v1/subscriptions/upcoming-renewals`

- **Workflow Automation:**  
  - `POST /api/v1/workflows/subscription/reminder`

## Usage

Use tools like [Postman](https://www.postman.com/) or CURL to send HTTP requests to the API endpoints. Remember to include a valid JWT in the `Authorization` header for protected routes.

## Skills Demonstrated

- Setting up a monolithic backend with Node.js and Express.js.
- Connecting to and managing MongoDB with Mongoose.
- Securing APIs with JWT authentication and Arcjet for rate limiting and bot detection.
- Automating workflows with Upstash Workflows and QStash.
- Using environment variables to manage sensitive configuration (with `.env` files safely ignored in git).

