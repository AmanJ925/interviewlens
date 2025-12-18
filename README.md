# InterviewLens AI 🚀

InterviewLens AI is a full-stack, AI-powered resume analysis platform that evaluates how well a candidate’s resume aligns with a specific job description. It provides a match score, highlights strengths and missing skills, and suggests targeted improvements to help candidates prepare better for interviews.

This project is designed with a production-ready architecture, featuring a modern frontend, a RESTful backend API, and fully containerized deployment using Docker.

---

## ✨ Key Features

- **Resume ↔ Job Description Matching**
  - Calculates a match score based on skill alignment
- **Strengths Identification**
  - Highlights skills already aligned with the role
- **Missing Skills Detection**
  - Identifies gaps between resume and job requirements
- **Interview Focus Areas**
  - Suggests key topics candidates should prepare for interviews
- **Resume Improvement Suggestions**
  - Actionable tips to improve resume quality
- **Modern UI/UX**
  - Clean, responsive, and intuitive interface built with React & Tailwind CSS
- **RESTful API**
  - Backend API for scalable resume analysis
- **Dockerized Deployment**
  - One-command setup using Docker Compose

---

## 🧠 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Nginx (production container)

### Backend
- Node.js
- Express.js
- Custom AI-driven resume analysis logic

### DevOps
- Docker
- Docker Compose

---

## 📂 Project Structure

```text
interviewlens-ai/
├── frontend/        # React + Tailwind frontend
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│
├── backend/         # Node.js + Express API
│   ├── src/
│   ├── Dockerfile
│
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- Docker (for containerized setup)

### Local Development

#### 1. Clone the Repository:
```bash
git clone https://github.com/yourusername/interviewlens-ai.git
cd interviewlens-ai
```

#### 2. Install Dependencies
**Frontend:**
```bash
cd frontend
npm install
```
**Backend:**
```bash
cd ../backend
npm install
```

#### 3. Start the Application
Open two terminal windows/tabs.
- In one, start the backend:
  ```bash
  cd backend
  npm run dev
  ```
- In the other, start the frontend:
  ```bash
  cd frontend
  npm run dev
  ```

The frontend runs at [http://localhost:5173](http://localhost:5173) and the backend at [http://localhost:5000](http://localhost:5000) by default.

## Docker Usage

Build and run the application using Docker:

### 1. Build Docker Images
*Ensure Docker is running.*

```bash
# From the root project directory
cd backend
# Build the backend image
docker build -t interviewlens-backend .

cd ../frontend
# Build the frontend image (add Dockerfile if needed)
docker build -t interviewlens-frontend .
```

### 2. Run with Docker Compose (Recommended)
Create a `docker-compose.yml` at the project root to orchestrate both frontend and backend containers.

```yaml
version: '3'
services:
  backend:
    build: ./interviewlens-ai/backend
    ports:
      - '5000:5000'
  frontend:
    build: ./interviewlens-ai/frontend
    ports:
      - '5173:5173'
```

Then start all services:
```bash
docker-compose up --build
```

---
Thank You.
