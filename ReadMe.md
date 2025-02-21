# Notes App

## Overview
The Notes App is a full-stack application that allows users to create, update, and delete notes. It consists of a React frontend and a Node.js/Express backend, using MongoDB as the database. The application also includes Docker support for easy deployment.

## Features
- Create, edit, and delete notes
- Dark mode support
- RESTful API backend with Express.js
- MongoDB for data storage
- Dockerized for containerized deployment

## Technologies Used
### Frontend:
- React (with TypeScript)
- Tailwind CSS
- ShadCN UI components
- Lucide-react icons

```

    container_name: frontend-service
    restart: always
    depends_on:
      - backend
    ports:
      - "8080:8081"
    environment:
      REACT_APP_BACKEND_URL: "http://backend:5000"
```
### Backend:
- Node.js with Express.js
- MongoDB (via Mongoose)
- CORS and dotenv for environment management

```

    container_name: backend-service
    restart: always
    depends_on:
      - mongodb
    ports:
      - "5000:5000"
    environment:
      MONGODB_URI: mongodb://mongodb:27017/notesapp
      PORT: 5000
```

### Deployment & DevOps:
- Docker (with Dockerfile)
- Docker Compose (for running services together)
 



## Installation and Setup

### Prerequisites
Make sure you have the following installed:
- Node.js (v18+ recommended)
- MongoDB (local or cloud-based like MongoDB Atlas)
- Docker (if using containerization)

### Clone the Repository
```sh
git clone https://github.com/yourusername/notes-app.git
cd notes-app
```

### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure environment variables:
   ```
   MONGO_URI=mongodb://localhost:27017/notes
   PORT=5000
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm run dev
   ```

### Running with Docker
1. Build and run the application using Docker Compose:
   ```sh
   docker-compose up --build
   ```
2. The backend will run on `http://localhost:5000` and the frontend on `http://localhost:3000`.

## API Endpoints
| Method | Endpoint       | Description       |
|--------|--------------|------------------|
| GET    | /notes       | Fetch all notes |
| POST   | /notes       | Create a new note |
| PUT    | /notes/:id   | Update a note |
| DELETE | /notes/:id   | Delete a note |
