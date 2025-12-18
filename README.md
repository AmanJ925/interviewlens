# InterviewLens AI

InterviewLens AI is an advanced platform that leverages artificial intelligence to analyze resumes and provide insightful feedback for job seekers and recruiters. It streamlines the resume review process, offering actionable suggestions and comprehensive scoring to help users improve their chances in the job market.

## Features

- **AI-Powered Resume Analysis**: Receive detailed feedback and analytics on your resume content and structure.
- **Actionable Improvements**: Tailored suggestions for enhancing resume effectiveness.
- **Real-Time Processing**: Fast, efficient, and scalable resume evaluation.
- **Modern User Interface**: Easy-to-use, responsive frontend built with React and Tailwind CSS.
- **RESTful API**: Robust backend for handling analysis requests and integrations.
- **Containerized Deployment**: Effortless setup and scalability using Docker.

## Tech Stack

- **Frontend:**
  - React
  - Vite
  - Tailwind CSS

- **Backend:**
  - Node.js
  - Express.js

- **AI/ML:**
  - Custom resume analysis logic (Node.js)

- **DevOps:**
  - Docker

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

## Contribution
Contributions and suggestions are welcome! Please open an issue or submit a pull request.

## License
MIT
