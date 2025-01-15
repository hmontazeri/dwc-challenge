# CO2 Emission Calculator Application

This application provides an API to calculate CO2 emissions for different transportation methods based on a given distance. It also includes a frontend to interact with the backend API. Below, you'll find instructions on how to set up and run the application using Docker Compose and how to set up a development environment for making changes to the code.

This project uses a **monorepo** structure to manage both the backend and frontend within a single repository. The package manager **pnpm** is used to handle dependencies efficiently across the monorepo.

---

## Table of Contents

1. [Using Docker Compose to Set Up the App](#1-using-docker-compose-to-set-up-the-app)
2. [Setting Up the Development Environment](#2-setting-up-the-development-environment)
3. [Technology Choices](#3-technology-choices)
4. [Estimated vs. Actual Time Spent](#4-estimated-vs-actual-time-spent)

---

## 1. Using Docker Compose to Set Up the App

### Prerequisites:
- Ensure that **Docker** and **Docker Compose** are installed on your system.

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/hmontazeri/dwc-challenge
   cd dwc-challenge
   ```

2. Start the application using Docker Compose:
   ```bash
   docker compose up --build
   ```

3. The following services will be started:
   - **PostgreSQL** (Database): Accessible internally by the backend.
   - **Backend API**: Runs on [http://localhost:3333](http://localhost:3333).
   - **Frontend**: Runs on [http://localhost:3000](http://localhost:3000).

4. To stop the application, run:
   ```bash
   docker compose down -v
   ```

---

## 2. Setting Up the Development Environment

This project uses **pnpm** to manage dependencies in the monorepo. Follow the steps below to get the development environment running.

### Prerequisites:
- **Node.js** (v20+)
- **PostgreSQL** (local or Docker)
- **pnpm** (for monorepo dependency management)

### Install `pnpm` Globally:
If `pnpm` is not already installed, install it globally:
```bash
npm install -g pnpm
```

### Steps:

#### Install Dependencies:
1. Navigate to the root directory of the monorepo:
   ```bash
   cd dwc-challenge
   ```

2. Install all dependencies for both the frontend and backend:
   ```bash
   pnpm install
   ```

#### Start the Development Environment:
1. Start both the backend and frontend together:
   ```bash
   pnpm dev
   ```

This command will concurrently start:
- The **backend** on [http://localhost:3333](http://localhost:3333)
- The **frontend** on [http://localhost:5173](http://localhost:5173)

### Backend-Specific Tasks:
- **Navigate to backend folder**
  ```bash 
   cd packages/backend
   ```
- **Run Migrations**:
  ```bash
  node ace migration:run 
  ```
- **Seed Data**:
  ```bash
  node ace db:seed     
  ```
- **Test (optional)**:
  ```bash
  node ace test     
  ```

---

## 3. Technology Choices

### Backend:
- **AdonisJS**: Chosen for its full-stack MVC capabilities, built-in TypeScript support, and elegant syntax.
- **PostgreSQL**: A robust, open-source relational database known for reliability and scalability.
- **Docker**: Used for containerizing services to ensure consistency across environments.

### Frontend:
- **RemixJS**: Selected for its ability to optimize both client and server-side rendering, improving performance and user experience.

### Other Tools:
- **Docker Compose**: Simplifies multi-container orchestration.
- **VineJS**: For schema validation in AdonisJS.
- **pnpm**: Efficiently manages dependencies in a monorepo setup, saving disk space and improving performance.

These technologies were chosen to ensure the application is scalable, maintainable, and developer-friendly.

---

## 4. Estimated vs. Actual Time Spent

| Task                              | Estimated Time | Actual Time |
|-----------------------------------|----------------|-------------|
| Initial Project Setup             | X hours        | Y hours     |
| Backend API Development           | X hours        | Y hours     |
| Frontend Development              | X hours        | Y hours     |
| Docker Setup                      | X hours        | Y hours     |
| Testing and Debugging             | X hours        | Y hours     |
| Documentation and Cleanup         | X hours        | Y hours     |

*(Replace `X` and `Y` with actual values after completion.)*

---

Let me know if any part of this README needs further clarification or adjustments! 🚀