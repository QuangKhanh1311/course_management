# EduHub - Learning Management System

A comprehensive online course management platform built with Next.js, featuring separate interfaces for students, instructors, and administrators.

## Features

### For Students
- Browse and search courses by category, level, and instructor
- Enroll in courses with integrated payment system
- Watch video lessons and download course materials
- Track learning progress with visual indicators
- Take quizzes and earn certificates
- View personal profile and learning statistics

### For Instructors
- Create and manage courses with detailed content
- Add lessons with video and PDF resources
- Create quizzes with multiple-choice questions
- Monitor student enrollment and progress
- Track course revenue and student engagement
- Publish or archive courses

### For Administrators
- Manage all platform users (students, instructors)
- Review and approve courses before publication
- Monitor platform analytics and revenue
- View user activity and engagement metrics
- Manage course moderation and content

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Authentication**: JWT-based auth with localStorage
- **Database**: Mock data (ready for real database integration)
- **Payment**: Demo payment system (ready for Stripe integration)
- **Charts**: Recharts for analytics visualization

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Credentials

**Student Account:**
- Email: `student@example.com`
- Password: `password`

**Instructor Account:**
- Email: `instructor@example.com`
- Password: `password`

**Admin Account:**
- Email: `admin@example.com`
- Password: `password`

## Project Structure

```
app/
├── auth/                 # Authentication pages
├── student/             # Student interface
├── instructor/          # Instructor dashboard
├── admin/              # Admin dashboard
└── api/                # API routes

components/
├── ui/                 # shadcn/ui components
├── student/            # Student-specific components
├── instructor/         # Instructor-specific components
└── admin/             # Admin-specific components

lib/
├── types.ts           # TypeScript type definitions
├── auth.ts            # Authentication utilities
└── utils.ts           # Utility functions
```

## Key Pages

### Student Routes
- `/` - Home page
- `/auth/login` - Login page
- `/auth/signup` - Sign up page
- `/student/courses` - Browse all courses
- `/student/my-courses` - Enrolled courses
- `/student/courses/[id]/learn` - Learn course content
- `/student/courses/[id]/quiz` - Take quiz
- `/student/courses/[id]/certificate` - View certificate
- `/student/profile` - User profile

### Instructor Routes
- `/instructor/dashboard` - Dashboard with stats
- `/instructor/courses/new` - Create new course
- `/instructor/courses/[id]/edit` - Edit course

### Admin Routes
- `/admin/dashboard` - Admin dashboard with analytics
- User management, course moderation, analytics

## Features to Implement

- [ ] Real database integration (Supabase/Neon)
- [ ] Stripe payment integration
- [ ] Email notifications
- [ ] Video upload and streaming
- [ ] Advanced analytics
- [ ] User reviews and ratings
- [ ] Discussion forums
- [ ] Live classes/webinars
- [ ] Mobile app

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
