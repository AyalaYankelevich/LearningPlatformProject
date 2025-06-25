# Healthy Food Learning Platform Project
A full-stack learning platform with AI integration, user authentication (token-based), and clean RESTful API structure.
## Technologies Used:
- Backend: Node.js (Express.js)
- Frontend: Angular
- Database: MongoDB (dockerized)
- ORM/ODM: Mongoose
- Authentication: JWT token-based
- AI Integration: OpenAI GPT API
- Configuration Management: dotenv
- Containerization: Docker, Docker Compose

## Features

- **Admin Dashboard**: Admins can view all users and their prompts, as well as assign additional admin roles.
- **Personalized Learning**: Users can choose a topic and sub-topic to learn about with GPT-powered AI assistance.
- **User History**: Each user can view their own learning and prompt history for easy reference and review.

## Assumptions:
- The backend is built with Node.js and Express.
- The frontend uses Angular (TypeScript).
- MongoDB is used as the main data store, running via Docker Compose.
- Users and admins authenticate via JWT tokens.
- AI integration is abstracted to allow easy swapping of real GPT API.
- The project is public with clear commit messages.
- Codebase follows best practices: commented, modular.

## Setup Instructions:
**1. Clone the repository:**

git clone https://github.com/AyalaYankelevich/LearningPlatformProject.git

cd LearningPlatformProject

**2. Setup Environment Variables:**

1. Copy the example environment file:

JWT_SECRET=your_JWT_SECRET

JWT_EXPIRATION=your_JWT_EXPIRATION

OPENAI_API_KEY=your_openai_api_key


2. Open the `.env` file and fill in your values (API keys, etc).

**3. Install dependencies:**

- Backend:

  cd backend

  npm install

- Frontend:

  cd frontend

  npm install

**4. Start MongoDB via Docker Compose:**

docker-compose up -d     (Ensure Docker is installed and running.)

**5. Running Locally:**
- Backend (Node.js)

  cd backend

  npm run dev
- Frontend (Angular)

  cd frontend

  ng serve
- Database (MongoDB with Docker Compose)

  The default setup uses Docker Compose to run MongoDB on localhost:27017.

