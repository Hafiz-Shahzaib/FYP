# Revolutionizing Digital Learning With AI

### Technology Used

* **Frontend:** React, tailwind CSS  
* **Backend:** Node.js, Express, & MongoDB  
* **AI:** Gemini API, ImageKit API

## Project Structure

* `frontend`: Contain the frontend code built with React & tailwind CSS
* `backend`: Contain the backend code with Node.js & Express

## Installation

### Prequisities

* Node.js & npm installed on your system

* MongoDB installed & running

### Steps

1. **Clone the Repository**
    
   ```bash
   git clone https://github.com/Hafiz-Shahzaib/FYP.git 
   cd FYP
   ```
   
2. **Install Dependencies for backend**
     
   ``` bash
   cd backend
   npm install
   ```
   
3. **Install Dependencies for frontend**
     
   ```bash  
   cd frontend
   npm install
   ```
   
4. **set up environment variable for backend**

   - create a `.env` file in the `backend` directory and add the following:

     ```text
      PORT = "your port"
     MONGODB_URL = "your url"
     JWT_SECRET = "your secret"
     USER_EMAIL = "your email"
     USER_PASSWORD = "your password"
     CLOUDINARY_NAME = "cloud name"
     CLOUDINARY_API_KEY = "your api key"
     CLOUDINARY_API_SECRET = "your secret key"
     GEMINI_API_KEY = "your api key"
     
     ```

5. **set up environment variable for frontend**

   - create a `.env` file in the `frontend` directory and add the following:

     ```text
      VITE_FIREBASE_APIKEY = "your api key"
     
     ```


6. **Run the backend**

   ```bash
     cd backend
     npm run dev
   ```

7. **Run the frontend**

   ```bash
     cd frontend
     npm run dev
   ```

