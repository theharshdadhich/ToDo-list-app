# TODO Application

## Overview
A web-based TODO application that helps users efficiently manage their tasks. Users can create, update, delete, and track their TODOs with various status and deadlines. The application also includes authentication features to ensure secure access.

## Features & Functionality

### 1. User Authentication
- User registration & login via username/password.
- Secure password hashing.
- Password reset functionality.
- Logout feature for session management.


![image](https://github.com/user-attachments/assets/a8868739-4633-42ff-9c5a-6221b1d4067d)


![Screenshot 2025-02-19 130900](https://github.com/user-attachments/assets/614fa0c4-ae48-45d3-bb74-1114fe7a0b45)



### 2. Task Management
- Create, modify, and delete TODOs.
- Each TODO contains:
  - Title
  - Description
  - Status (ACTIVE, IN_PROGRESS, COMPLETE, EXPIRED)
  - Deadline

  

  ![Screenshot 2025-02-19 131540](https://github.com/user-attachments/assets/d13f36ea-fb2d-4e81-bbc7-6a5269d62820)

  ![Screenshot 2025-02-19 131309](https://github.com/user-attachments/assets/2514953d-152e-447a-aed6-178d365875b5)




### 3. Task Status & Expiry
- Tasks remain **ACTIVE** unless updated.
- Users can update a TODO's status to **IN_PROGRESS**, **COMPLETE**, etc.
- If a task is not completed by its deadline, it is automatically marked as **EXPIRED**.
  

![Screenshot 2025-02-19 130803](https://github.com/user-attachments/assets/1ed81194-3955-44ed-a293-71a6c94fa1d4)


### 4. Viewing & Searching
- List all TODOs with filtering options.
- Search TODOs by **title** or **description**.
- Sort tasks by:
  - **Deadline** (urgent tasks first)
  - **Status** (e.g., show only non-complete or in-progress tasks)

![image](https://github.com/user-attachments/assets/4b10e0ec-b60b-401d-b296-72b23c0bc66f)




## Installation & Setup

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [React]

### Steps to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/theharshdadhich/ToDo-list-app.git
   cd ToDo-list
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory and add:
   ```plaintext
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. **Run the application**
   ```bash
   cd server
   node index.js
   cd client 
   npm start
   ```
   The app will be available at `http://localhost:5174/`


## Technologies Used
- **Frontend:** React, Tailwind CSS 
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
