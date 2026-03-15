# Video Thumbnail Gallery – Frontend

## Tech Stack

* React
* Vite
* Material UI
* React Query
* Axios
* React Router

## Features

* Video gallery display
* Search videos by title
* Filter videos by tags
* Video detail page
* Video player
* Thumbnail selection
* Responsive UI

## How to Run Frontend

### 1. Clone Repository

git clone https://github.com/yourusername/video-thumbnail-frontend.git

cd frontend

### 2. Install Dependencies

npm install

### 3. Start Development Server

npm run dev

Frontend will run at:

http://localhost:5173

## Backend Connection

The frontend connects to the backend API at:

http://localhost:5000/api

You can configure this inside:

src/services/api.js

## Environment Variables

No environment variables required for frontend.

## Project Structure

src
components
pages
services
App.jsx
main.jsx

## Notes

This frontend application consumes APIs from the backend service to fetch videos, thumbnails, and update the primary thumbnail.
