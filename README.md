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

| Layer                    | Technology                                             |
| ------------------------ | ------------------------------------------------------ |
| Frontend                 | React 18, TypeScript, Vite, Tailwind CSS               |
| Backend                  | Node.js, Express 5                                     |
| Database                 | MongoDB (Atlas)                                        |
| Containerization         | Docker, Docker Compose                                 |
| Container Registry       | AWS ECR                                                |
| Infrastructure           | Terraform (AWS)                                        |
| Configuration Management | Ansible                                                |
| CI/CD                    | GitHub Actions                                         |
| DevSecOps                | Trivy (container scanning), tfsec (Terraform scanning) |
| Hosting                  | AWS EC2 (af-south-1)                                   |

---

## Git to Production Flow

```
Developer pushes code
        │
        ▼
┌───────────────┐
│  GitHub       │
│  (main)  │
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
  --extra-vars "ecr_registry=381299989698.dkr.ecr.af-south-1.amazonaws.com"
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

- Frontend: http://localhost:3000 / http://13.247.108.112:3000/
- Backend: http://localhost:5000 / http://13.247.108.112:5000/

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

| Method | Endpoint                          | Access   |
| ------ | --------------------------------- | -------- |
| POST   | `/api/auth/register`              | Public   |
| POST   | `/api/auth/login`                 | Public   |
| GET    | `/api/courses`                    | Public   |
| GET    | `/api/courses/:id`                | Public   |
| POST   | `/api/courses`                    | Teachers |
| GET    | `/api/courses/teacher/my-courses` | Teachers |
| GET    | `/api/courses/admin/all`          | Admins   |
| PUT    | `/api/courses/:id/status`         | Admins   |
| GET    | `/api/health`                     | Public   |

---

## Team Members

- Sharon (Role: Configuration Management (Ansible) & CD pipeline)
- Nigel (Role: Infrastructure as Code (IaC))
- Fred (Role: DevSecOps Integration)

## Live Application

[Access Live App](http://13.247.108.112:3000/)

Replace with your actual production URL before submission.

## Architecture Overview

### Architecture Diagram

See the diagrams in the existing Architecture section above.

### Component Description

- VPC: Provides isolated network boundaries for the project environment.
- Public subnet: Hosts the Bastion Host used as the secure SSH entry point.
- Private subnet: Hosts the application VM running frontend and backend containers.
- Bastion Host: Controls admin access to private resources using jump-host SSH.
- Security groups: Restrict inbound and outbound traffic by source and port.
- ECR: Stores private frontend and backend Docker images.
- Application services: Frontend and backend containers communicate internally; backend handles API calls and data operations.
- Database: MongoDB is used for persistent application data.

Security controls in place:

- SSH access to the private VM is routed through bastion ProxyCommand.
- Terraform scans run in CI using tfsec.
- Container scans run in CI using Trivy.

## Setup Instructions

### Prerequisites

- AWS account with appropriate permissions
- Terraform installed
- Ansible installed
- Docker and Docker Compose installed
- Node.js installed
- GitHub account

### Deployment Steps

1. Clone the repository

```bash
git clone https://github.com/SMushy14/Learn2grow.git
cd Learn2grow
```

2. Configure Terraform variables

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
```

3. Initialize and apply Terraform

```bash
terraform init
terraform apply
```

4. Update Ansible inventory and deploy

```bash
cd ../ansible
ansible-playbook -i inventory.ini playbook.yml
```

### Tearing Down

To cleanly destroy all resources:

```bash
cd terraform
terraform destroy
```

## CI/CD Pipeline

### CI Pipeline

- Triggers on: Pull Requests to main and deploy-branch (also pushes to main/deploy-branch in current config)
- Steps:

1. Checkout code
2. Install dependencies
3. Lint backend and frontend
4. Run tests
5. Build Docker images
6. Run Trivy image scans
7. Run tfsec Terraform scan

- Security scans:

1. Trivy: scans backend and frontend Docker images for vulnerabilities
2. tfsec: scans Terraform code for IaC security issues

### CD Pipeline

- Triggers on: merge/push to main (current workflow also includes deploy-branch and pull_request)
- Deployment process:

1. Checkout code
2. Run backend dependency install and tests
3. Build frontend and backend images
4. Authenticate to ECR
5. Tag and push images to private ECR
6. Run Ansible playbook for deployment

## Security Measures

- Security scanning:

1. Trivy container scanning in CI
2. tfsec IaC scanning in CI

- Network security:

1. Bastion host in public subnet for controlled SSH
2. App VM in private subnet
3. Security groups enforce restricted connectivity

- Secret management:

1. AWS and SSH credentials are stored in GitHub Secrets
2. Sensitive files are excluded via .gitignore

## Challenges & Solutions

- Challenge: Container vulnerability findings blocked CI.
  Solution: Tuned scan severity threshold and updated image build process to reduce exposure.

- Challenge: Secure access to private EC2 host.
  Solution: Configured Ansible inventory to use Bastion ProxyCommand.

- Challenge: Keeping deployment repeatable.
  Solution: Automated build, push, and deployment flow using GitHub Actions and Ansible.

## Video Demo

[Watch Demo Video](https://drive.google.com/file/d/1-ZyQSxiGVKfFj2nIxJtWUXgfR7TKieEu/view?usp=sharing)

Replace with your actual unlisted YouTube or Drive link.

## License

MIT License - feel free to use this project for learning or commercial purposes.
