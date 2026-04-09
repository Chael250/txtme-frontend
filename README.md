# TxtMe Frontend 🚀

TxtMe is a premium, AI-powered address book application designed for speed, security, and intelligence. The frontend is built using **Next.js 15+** with the **App Router** and a custom design system powered by **Tailwind CSS 4**.

## 🧠 Features

- **Premium Design**: Modern, responsive UI with glassmorphism and smooth animations via **Framer Motion**.
- **Secure Authentication**: JWT-based auth using secure `httpOnly` cookies to protect against XSS and token theft.
- **AI-Powered Search**: Natural language search interface to find contacts intelligently (e.g., "People from Kigali").
- **Contacts Management**: Robust CRUD operations for managing your professional network.
- **Optimized Performance**: Server-side rendering and efficient data fetching with **TanStack Query**.

## 🛠️ Tech Stack

- **Framework**: Next.js 15+
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **API Client**: Axios

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Backend server running (default: `http://localhost:5000`)

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Configure environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=https://txtme-backend.onrender.com
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🐳 Running with Docker

The project includes a multi-stage Dockerfile for optimized production builds.

1. Build the image:
   ```bash
   docker build -t txtme-frontend .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 txtme-frontend
   ```

## 🛡️ Security

TxtMe prioritizes your data security:
- **Cookie-based Auth**: Tokens are stored in `httpOnly` cookies, inaccessible to client-side scripts.
- **Input Validation**: All forms are validated using modern React patterns.
- **Protected Routes**: Dashboard and management pages are strictly guarded by auth middleware.
