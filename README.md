# Skill Recommendation System

## How to Run in VS Code

You need to run 3 things: MongoDB, the Backend, and the Frontend.

### Prerequisite: Install Dependencies
Before running the app for the first time, install all dependencies:
1.  Open a terminal in VS Code.
2.  Run:
    ```bash
    npm run install-all
    ```

### Step 1: Start MongoDB
1.  Open a new terminal in VS Code (`Ctrl + Shift + \``).
2.  Run this command to start the database:
    ```powershell
    mongod --dbpath "C:\data\db"
    ```
    *Keep this terminal open.*

### Step 2: Start the Application
1.  Open a **second** terminal (click the `+` icon in the terminal panel).
2.  Make sure you are in the root folder `skill recomendation system`.
3.  Run this command to start both servers:
    ```bash
    npm run dev
    ```
4.  This will start the Backend (port 5000) and Frontend (port 5173).

### Step 3: Open in Browser
-   Open [http://localhost:5173](http://localhost:5173) to use the app.

## Troubleshooting
-   **"MongoDB connection error"**: Make sure Step 1 is running and didn't close.
-   **"Address already in use"**: You might have old terminals running. Kill them (Trash icon) and start over.

