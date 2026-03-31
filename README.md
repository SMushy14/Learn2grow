# Learn2grow

## Problem Statement

Many students in Africa rely only on classroom teaching and are therefore limited to learning materials and skills development. The Rwandan government has played a good part in providing laptops to public schools even in rural areas, but students still don't have access to structured learning resources that resonate with their syllabus. Learn2grow is a platform that connects students with local teachers and coaches who have structured courses that go beyond the class syllabus.

## Users

- **Students** - Browse, enroll, and access courses and learning materials
- **Teachers/Coaches** - Upload and manage content in their courses
- **Admins** - Approve and manage courses to be displayed on the platform

## Features

1. User authentication with roles (Admin, Student, Teacher/Coach)
2. Course listing with search and filter functionality
3. Teacher and Admin dashboard for course upload and approval
4. Student course enrollment
5. Multi-language support (English, Kinyarwanda, French)

---

## Architecture

### Application Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        Internet                          │
└───────────────────────────┬─────────────────────────────┘
                            │
                ┌───────────▼───────────┐
                │  Application Load     │
                │  Balancer (ALB)       │
                │  Port 80              │
                └───────────┬───────────┘
                            │
              ┌─────────────▼─────────────┐
              │     EC2 App Server        │
              │     (Private Subnet)      │
              │  ┌────────┐ ┌──────────┐  │
              │  │Frontend│ │ Backend  │  │
              │  │ :3000  │ │  :5000   │  │
              │  └────────┘ └──────────┘  │
              └───────────────────────────┘
                            │
              ┌─────────────▼─────────────┐
              │         MongoDB           │
              │   (Atlas Cloud / Local)   │
              └───────────────────────────┘
```

### AWS Infrastructure (af-south-1)

```
VPC (10.0.0.0/16)
├── Public Subnets
│   ├── Bastion Host (SSH gateway)
│   └── ALB (Application Load Balancer)
├── Private Subnets
│   └── EC2 App Server (Docker containers)
└── Supporting Services
    ├── ECR (Container Registry)
    │   ├── devops-project-dev-frontend
    │   └── devops-project-dev-backend
    ├── NAT Gateway (outbound internet for private subnet)
    └── IAM Role (EC2 → ECR read access)
```

### Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| Backend | Node.js, Express 5 |
| Database | MongoDB (Atlas) |
| Containerization | Docker, Docker Compose |
| Container Registry | AWS ECR |
| Infrastructure | Terraform (AWS) |
| Configuration Management | Ansible |
| CI/CD | GitHub Actions |
| Hosting | AWS EC2 (af-south-1) |

---

## Git to Production Flow

```
Developer pushes code
        │
        ▼
┌───────────────┐
│  GitHub       │
│  (devbranch)  │
└───────┬───────┘
        │
        ▼
┌───────────────────────────────────┐
│  GitHub Actions CI (ci.yml)       │
│  - Install dependencies           │
│  - Lint frontend & backend        │
│  - Run tests                      │
│  - Build Docker images            │
│  - Scan with Trivy (security)     │
└───────┬───────────────────────────┘
        │ on push to devbranch
        ▼
┌───────────────────────────────────┐
│  GitHub Actions CD (cd.yml)       │
│  - Build frontend & backend       │
│  - Push images to AWS ECR         │
│  - Run Ansible deploy playbook    │
└───────┬───────────────────────────┘
        │
        ▼
┌───────────────────────────────────┐
│  Ansible (deploy.yml)             │
│  - Copy docker-compose.prod.yml   │
│  - Copy backend .env              │
│  - Login to ECR                   │
│  - Pull latest images             │
│  - Run containers (docker-compose)│
└───────┬───────────────────────────┘
        │
        ▼
┌───────────────────────────────────┐
│  EC2 App Server                   │
│  - Frontend container (:3000)     │
│  - Backend container (:5000)      │
│  - Accessible via ALB             │
└───────────────────────────────────┘
```

### Manual Deployment Steps

**1. Provision infrastructure (first time only):**
```bash
cd terraform/
terraform init
terraform apply
```

**2. Provision the server (first time only):**
```bash
cd ansible/
ansible-playbook playbook.yml -i inventory.ini
```

**3. Deploy the application:**
```bash
ansible-playbook deploy.yml -i inventory.ini \
  --extra-vars "ecr_registry=953216550432.dkr.ecr.af-south-1.amazonaws.com aws_region=af-south-1"
```

**4. Verify connectivity:**
```bash
ansible all -i inventory.ini -m ping
```

---

## Project Structure

```
Learn2grow/
├── frontend/                    # React + TypeScript frontend
│   ├── src/
│   │   ├── components/         # UI components
│   │   ├── types/              # TypeScript interfaces
│   │   ├── data/               # Sample course data
│   │   ├── services/           # API services
│   │   └── App.tsx
│   └── Dockerfile
├── backend/                     # Node.js + Express backend
│   ├── src/
│   │   ├── controllers/        # Business logic
│   │   ├── models/             # Mongoose schemas
│   │   ├── routes/             # API routes
│   │   └── middlewares/        # Auth middleware
│   ├── server.js
│   └── Dockerfile
├── terraform/                   # AWS Infrastructure as Code
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── modules/
│       ├── vpc/
│       ├── ec2/
│       ├── ecr/
│       ├── alb/
│       ├── bastion/
│       └── security_groups/
├── ansible/                     # Configuration & Deployment
│   ├── playbook.yml            # Server provisioning
│   ├── deploy.yml              # Application deployment
│   ├── inventory.ini           # Host inventory
│   └── roles/docker/           # Docker installation role
├── .github/workflows/           # CI/CD pipelines
│   ├── ci.yml
│   ├── cd.yml
│   └── deploy.yml
├── docker-compose.yml           # Local development
└── docker-compose.prod.yml      # Production
```

---

## Running Locally

### With Docker Compose
```bash
docker-compose up --build
```
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

```bash
docker-compose down
```

### Without Docker

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## API Endpoints

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/courses` | Public |
| GET | `/api/courses/:id` | Public |
| POST | `/api/courses` | Teachers |
| GET | `/api/courses/teacher/my-courses` | Teachers |
| GET | `/api/courses/admin/all` | Admins |
| PUT | `/api/courses/:id/status` | Admins |
| GET | `/api/health` | Public |

---

## License

MIT License - feel free to use this project for learning or commercial purposes.
