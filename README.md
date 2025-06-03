# Supabase Management App

A full-stack application for managing Supabase projects with a modern Next.js frontend and Supabase Edge Functions backend.

## 🚀 Features

- **Modern Frontend**: Built with Next.js 14+ for optimal performance
- **Serverless Backend**: Powered by Supabase Edge Functions
- **Real-time Updates**: Live data synchronization using Supabase Realtime
- **Authentication**: Secure user authentication with Supabase Auth
- **Database Management**: Full CRUD operations for your Supabase projects
- **Automated Tasks**: Scheduled cron jobs for maintenance and data processing
- **Modern UI Components**: Built with shadcn/ui for consistent design system
- **Responsive Design**: Mobile-first approach with modern UI/UX

## 🛠️ Tech Stack

### Frontend

- **Next.js 14+** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern UI components built on Radix UI
- **Supabase Auth** - Authentication system
- **Supabase Realtime** - Real-time subscriptions

### Backend

- **Supabase Edge Functions** - Serverless functions
- **PostgreSQL** - Database
- **Supabase Cron** - Scheduled tasks and background jobs

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm
- Supabase CLI

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/nadiia-dev/supabase-management-app.git
   cd supabase-management-app
   ```

2. **Install frontend dependencies**

   ```bash
   cd frontend
   npm install
   ```

3. **Install Supabase CLI** (if not already installed)
   ```bash
   npm install -g supabase
   ```

### Environment Setup

#### Frontend Environment Variables

Create a `.env.local` file in the `frontend` directory using the same variables as in `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

#### Backend Setup

1. **Initialize Supabase project**

   ```bash
   cd backend
   supabase init
   ```

2. **Link to your Supabase project**

   ```bash
   supabase link --project-ref your-project-ref
   ```

3. **Deploy Edge Functions**
   ```bash
   supabase functions deploy
   ```

### Running the Application

1. **Start the frontend**

   ```bash
   cd frontend
   npm run dev
   ```

2. **Start Supabase locally** (optional)
   ```bash
   cd backend
   supabase start
   ```

The application will be available at `http://localhost:3000`
