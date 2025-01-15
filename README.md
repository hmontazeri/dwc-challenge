# CO2 Emission Calculator Application

This application provides an API to calculate CO2 emissions for different transportation methods based on a given distance. It also includes a frontend to interact with the backend API. Below, you'll find instructions on how to set up and run the application using Docker Compose and how to set up a development environment for making changes to the code.

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
   git clone git@github.com:hmontazeri/dwc-challenge.git
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

### Prerequisites:
- **Node.js** (v20+)
- **PostgreSQL** (local or Docker)
- **npm** (for package management)

### Steps:

#### Backend:
1. Navigate to the backend directory:
   ```bash
   cd packages/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   ```bash
   cp .env.example .env
   ```

4. Run database migrations and seed data:
   ```bash
   node ace migration:run
   node ace db:seed
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

The backend will run on [http://localhost:3333](http://localhost:3333).

#### Frontend:
1. Navigate to the frontend directory:
   ```bash
   cd packages/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   ```bash
   cp .env.example .env
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

The frontend will run on [http://localhost:3000](http://localhost:3000).

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