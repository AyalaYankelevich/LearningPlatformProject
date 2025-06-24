# LearningPlatformProject
A full-stack learning platform with AI integration, user authentication (token-based), and clean RESTful API structure.
Technologies Used:
Backend: Node.js (Express.js)
Frontend: Angular
Database: MongoDB (dockerized)
ORM/ODM: Mongoose
Authentication: JWT token-based
AI Integration: OpenAI GPT API
Configuration Management: dotenv
Containerization: Docker, Docker Compose

Assumptions:
The backend is built with Node.js and Express.
The frontend uses Angular.
MongoDB is used as the main data store, running via Docker Compose.
Users and admins authenticate via JWT tokens.
AI integration is abstracted to allow easy swapping of real GPT API.
The project is public with clear commit messages.
Codebase follows best practices: linted, commented, modular.

Setup Instructions:
1.Clone the repository:
git clone https://github.com/AyalaYankelevich/LearningPlatformProject.git
cd LearningPlatformProject
2.Copy and update environment variables:
Copy .env.example to .env in both /backend and /frontend (if needed).
Fill in secrets and connection details.
3.Install dependencies:
Backend:
cd backend
npm install

Frontend:
cd frontend
npm install
4.Start MongoDB via Docker Compose:
docker-compose up -d   (Ensure Docker is installed and running.)
5.Running Locally:
Backend (Node.js)
cd backend
npm run dev
Frontend (Angular)
cd frontend
ng serve
Database (MongoDB with Docker Compose)
The default setup uses Docker Compose to run MongoDB on localhost:27017.
Connection string is managed via .env.



LearningPlatformProject
A full-stack learning platform with AI integration, user authentication (token-based), and clean RESTful API structure.

🚀 Technologies Used
Backend: Node.js (Express.js)
Frontend: Angular
Database: MongoDB (dockerized)
ORM/ODM: Mongoose
Authentication: JWT token-based
AI Integration: OpenAI GPT API
Configuration Management: dotenv
Containerization: Docker, Docker Compose
⚡ Assumptions
The backend is built with Node.js and Express.
The frontend uses Angular.
MongoDB is used as the main data store, running via Docker Compose.
Users and admins authenticate via JWT tokens.
AI integration is abstracted to allow easy swapping of real GPT API.
The project is public with clear commit messages.
Codebase follows best practices: linted, commented, modular.
🛠️ Setup Instructions
1. Clone the repository
bash
git clone https://github.com/AyalaYankelevich/LearningPlatformProject.git
cd LearningPlatformProject
2. Copy and update environment variables
Copy .env.example to .env in both /backend and /frontend (if needed).
Fill in secrets and connection details.

3. Install dependencies
Backend:

bash
cd backend
npm install
Frontend:

bash
cd frontend
npm install
4. Start MongoDB via Docker Compose
bash
docker-compose up -d
Ensure Docker is installed and running.

🏃 Running Locally
Backend (Node.js)
bash
cd backend
npm run dev
Frontend (Angular)
bash
cd frontend
ng serve
Database (MongoDB with Docker Compose)
The default setup uses Docker Compose to run MongoDB on localhost:27017.
Connection string is managed via .env.

