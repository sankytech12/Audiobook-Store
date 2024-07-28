# Audiobook Web Application - Backend

## Introduction

This is the backend part of the Audiobook Web Application. It provides a RESTful API to handle audiobook data and user interactions.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB

### Steps

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following:
    ```env
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. Seed the database with audiobook data:
    ```bash
    node data/generateAudiobooks.js
    ```

5. Start the server:
    ```bash
    npm start
    ```

The backend server will be running on `http://localhost:5050`.

## API Endpoints

### Authentication

- `POST /api/users/register`: Register a new user.
  - Request body: `{ "name": "string", "email": "string", "password": "string" }`
- `POST /api/users/login`: Login an existing user.
  - Request body: `{ "email": "string", "password": "string" }`

### Audiobooks

- `GET /api/audiobooks`: Get a list of all audiobooks with pagination.
  - Query params: `page`, `limit`
- `GET /api/audiobooks/:id`: Get details of a specific audiobook.
- `POST /api/audiobooks/:id/reviews`: Submit a review for a specific audiobook.
  - Request body: `{ "review": "string", "rating": "number" }`

### Example Requests

- Register a user:
  ```bash
  curl -X POST http://localhost:5050/api/users/register -H "Content-Type: application/json" -d '{"name":"John Doe", "email":"john@example.com", "password":"password"}'
  ```

- Login a user:
  ```bash
    curl -X POST http://localhost:5050/api/users/login -H "Content-Type: application/json" -d '{"email":"john@example.com", "password":"password"}'
  ```

- Get audiobooks (page 1, limit 10):
  ```bash
   curl http://localhost:5050/api/audiobooks?page=1&limit=10
  ```

- Submit a review:
  ```bash
   curl -X POST http://localhost:5050/api/audiobooks/1/reviews -H "Content-Type: application/json" -d '{"review":"Great book!", "rating":5}'
  ```

  

# Audiobook Web Application - Frontend

## Introduction

This is the frontend part of the Audiobook Web Application. It provides a user interface to browse audiobooks, view details, and submit reviews and ratings.

## Technologies Used

- React
- Axios for API calls
- React Router for navigation
- CSS for styling

## Setup Instructions

### Prerequisites

- Node.js

### Steps

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following:
    ```env
    REACT_APP_API_URL=http://localhost:5050/api
    ```

4. Start the development server:
    ```bash
    npm start
    ```

The frontend server will be running on `http://localhost:3000`.

## Project Structure

```plaintext
src/
  ├── components/
  │   ├── AudiobookItem.js
  │   ├── AudiobookList.js
  │   ├── AudiobookPage.js
  │   ├── Filter.js
  │   ├── LoginPage.js
  │   ├── RegisterPage.js
  ├── hooks/
  │   └── useAuth.js
  ├── pages/
  │   ├── HomePage.js
  │   ├── AudiobookDetailsPage.js
  ├── styles/
  │   ├── AudiobookItem.css
  │   ├── Filter.css
  │   ├── LoginPage.css
  ├── App.js
  ├── index.js
  └── App.css
 ```

## Features

- Audiobook List : Display a list of audiobooks with basic details like title, author, and cover image.
- Filters: Filter audiobooks based on genre.
- Audiobook Details: View individual audiobook details, including description, genre, and user reviews.
- Submit Reviews: Allow users to submit reviews and ratings for audiobooks.
- User Authentication: Register and login functionality.

