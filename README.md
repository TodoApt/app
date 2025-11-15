# TodoApt App

A Next.js application for task management with authentication, internationalization, and push notifications.

## Prerequisites

- Node.js (20 or higher recommended)
- npm
- Vercel account

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Authentication Secret
# Generate using: npx auth secret
AUTH_SECRET="your-auth-secret-here"

# Vercel Edge Config (optional)
# URL for Vercel Edge Config, used for feature flags and configuration
EDGE_CONFIG="https://edge-config.vercel.com/your-config-id?token=your-token"

# API Configuration
# Backend API URL
API_URL="BACKEND_URL"

# CDN Configuration
# Public CDN URL for static assets and images
NEXT_PUBLIC_CDN_URL="CDN_URL"

# Push Notifications
# VAPID public key for web push notifications
NEXT_PUBLIC_VAPID_PUBLIC_KEY="your-vapid-public-key"

# Invite token
INVITE_TOKEN="mycode"
```

#### Environment Variable Descriptions

| Variable | Required | Description                                                                    |
|----------|----------|--------------------------------------------------------------------------------|
| `AUTH_SECRET` | Yes      | Secret key for NextAuth.js session encryption. Generate with `npx auth secret` |
| `EDGE_CONFIG` | Yes      | Vercel Edge Config URL for feature flags and runtime configuration             |
| `API_URL` | Yes      | Backend API endpoint URL                                                       |
| `NEXT_PUBLIC_CDN_URL` | No       | CDN URL for serving images and static assets (publicly accessible)             |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | Yes      | VAPID public key for web push notifications (publicly accessible)              |
| `INVITE_TOKEN` | No       | Required token to signup                                                       |

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Production Build

To create a production build:

```bash
npm run build
npm start
```