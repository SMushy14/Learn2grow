# Learn2grow
## Problem Statement
Many students in Africa rely only on classroom teaching and they are therefore limited to learning materials and other skills development. The Rwandan government has played a good part in providing laptops to public schools even in rural areas but still student don't have access to structured learning resources that resonate with their syllabus and also other resources that can improve their skills. Learn2grow is a platfrom that connects students with local teachers and coaches who have structured courses that go beyond class syllabus.

## Users
- Students - They can browse, enroll and access courses and learning materials
- Teachers/ Coaches - They upload and manage contents in their course
- Admins - They approve and manage courses to be displayed on the main platform/page

## Technology

### Frontend
- React 18(Vite + Typescript) - UI Library, Buils tool, dev server + Type safety
- Tailwind CSS - Utility-first CSS framework
### Backend
- Node.js + Express
### Database
- MongoDB
### DevOps
- Docker + Cloud


## License

MIT License - feel free to use this project for learning or commercial purposes.

## Features
1. User authentication with roles(admin, student, Teacher/Coach)
2. Course listing with search functionality
3. Taecher and Admin dashboard for course upload and approval
4. Student course enrollment

## 📁 Project Structure

```
Learn2grow/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx          # Navigation bar with mobile menu
│   │   │   ├── Hero.tsx            # Hero section with headline and CTA
│   │   │   ├── CourseCard.tsx      # Reusable course card component
│   │   │   ├── CoursesSection.tsx  # Courses grid section
│   │   │   └── Footer.tsx          # Footer with links and social media
│   │   ├── data/
│   │   │   └── courses.ts          # Sample course data
│   │   ├── types/
│   │   │   └── Course.ts           # TypeScript interface for Course
│   │   ├── App.tsx                 # Main app component
│   │   ├── main.tsx                # Entry point
│   │   ├── index.css               # Global styles with Tailwind
│   │   └── vite-env.d.ts           # Vite type definitions
│   ├── index.html                  # HTML template
│   ├── package.json                # Dependencies and scripts
│   ├── tsconfig.json               # TypeScript configuration
│   ├── tailwind.config.js          # Tailwind CSS configuration
│   ├── postcss.config.js           # PostCSS configuration
│   ├── vite.config.ts              # Vite configuration
│   └── .gitignore                  # Git ignore file
├── LICENSE                         # License file
└── README.md                       # Project documentation
```

## Frontend Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean and modern design using Tailwind CSS
- **TypeScript**: Fully typed components for better development experience
- **Component-Based**: Well-structured and reusable components
- **Sticky Navigation**: Navbar that sticks to the top with hamburger menu on mobile
- **Course Cards**: Beautiful course cards with hover effects
- **Hero Section**: Eye-catching hero section with call-to-action buttons

## Running the application with Docker Compose
### Requirements:
1. Install Docker in your machine
2. Install Docker compose in your machine

### Run Docker compose command
```bash
docker-compose up --build
```
This command will build images for both frontend and backend, start the MongoDB, links all containers and you can access the application in the ports:
`http://localhost:3000` for frontend and `http://localhost:5000`for backend.
You can stop the application with;
```bash
docker-compose down
```

## 📦 Installation

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

5. Preview production build:

```bash
npm run preview
```

## 🎨 Components Overview

### Navbar

- Sticky navigation bar
- Responsive hamburger menu for mobile
- Smooth navigation links

### Hero

- Gradient background
- Compelling headline and description
- Two call-to-action buttons
- Responsive image placeholder

### CourseCard

- Course image with category badge
- Course title and description
- Instructor information
- Enroll button with hover effects

### CoursesSection

- Responsive grid layout (1/2/3 columns)
- Displays all courses from data
- "View All Courses" button

### Footer

- Platform information
- Quick links navigation
- Social media icons
- Copyright information

## 🎯 Key Features Implemented

✅ Fully responsive design
✅ TypeScript interfaces for type safety
✅ Reusable components
✅ Clean and readable code
✅ Modern UI with Tailwind utility classes
✅ Smooth transitions and hover effects
✅ Accessible navigation
✅ SEO-friendly structure

## 🎨 Customization

### Adding New Courses

Edit `frontend/src/data/courses.ts` to add or modify courses:

```typescript
{
  id: 7,
  title: 'Your Course Title',
  description: 'Course description',
  instructor: 'Instructor Name',
  image: 'image-url',
  category: 'Category'
}
```

### Changing Colors

Modify `frontend/tailwind.config.js` to customize the color scheme.

### Adding Sections

Create new components in `frontend/src/components/` and import them in `App.tsx`.

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
