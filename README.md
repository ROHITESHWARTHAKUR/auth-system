# Authentication & Authorization System

This project implements a basic authentication and authorization system using the MERN stack.
Users can register, verify their email, log in, and access a protected profile page.

## Features

* User Registration
* Email Verification
* JWT Authentication
* Protected Profile Route
* Display Logged-in User Details

## Authentication Flow

1. User registers with name, email, and password.
2. Password is hashed using bcrypt and stored securely in the database.
3. A verification email is sent to the user.
4. The user clicks the verification link and the account becomes verified.
5. After verification, the user logs in with email and password.
6. The backend generates a JWT token.
7. The token is used to access protected routes such as the profile page.

## Authorization Middleware

Before accessing protected routes, middleware:

* Reads the JWT token from request headers
* Verifies the token
* Extracts user information
* Allows access only if the token is valid

## Protected Route

`GET /api/profile`

This route requires a valid JWT token.
If the token is valid, the server returns the logged-in user's details.

Example response:

```
{
  "name": "cpn",
  "email": "cpn@email.com"
}
```

## API Endpoints

POST `/api/register`
Registers a new user.

POST `/api/login`
Logs in the user and returns a JWT token.

GET `/api/profile`
Returns the logged-in user's profile details. Requires authentication token.

## Tech Stack

Frontend

* React
* TanStack Query
* Axios

Backend

* Node.js
* Express.js
* MongoDB
* JWT

## Project Structure

Backend

* routes
* middleware
* models
* server.js

Frontend

* src
* pages
* components

## How to Run the Project

### Backend

1. Navigate to the Backend folder

```
cd Backend
```

2. Install dependencies

```
npm install
```

3. Start the server

```
node server.js
```

### Frontend

1. Navigate to the Frontend folder

```
cd Frontend
```

2. Install dependencies

```
npm install
```

3. Run the development server

```
npm run dev
```

## Summary

This project demonstrates how authentication and authorization work in a MERN stack application using JWT-based authentication, protected routes, and TanStack Query for fetching authenticated user data.
