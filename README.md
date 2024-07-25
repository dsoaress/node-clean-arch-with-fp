# Functional Clean Architecture POC

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=dsoaress_node-clean-arch-with-fp&metric=alert_status)](https://sonarcloud.io/summary/overall?id=dsoaress_node-clean-arch-with-fp)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=dsoaress_node-clean-arch-with-fp&metric=coverage)](https://sonarcloud.io/summary/overall?id=dsoaress_node-clean-arch-with-fp)

This project is a Proof of Concept (POC) for implementing a backend using Node.js, TypeScript, and Express, adhering to the principles of Clean Architecture without object-oriented. The main objective was to explore the feasibility of applying Clean Architecture with a functional programming approach, avoiding object-oriented design.

## Disclaimer

I am not an expert in functional programming. This project was created as an experiment to explore the possibility of implementing a backend system without object-oriented programming.

## How to Run the Project

### 1. Prerequisites

Make sure you have the following installed on your machine:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **pnpm**: Install it using the command: `npm install -g pnpm`
- **Docker**: [Download Docker](https://www.docker.com/get-started)

### 2. Environment Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/dsoaress/node-clean-arch-with-fp.git
   cd node-clean-arch-with-fp
   ```

2. **Install Dependencies:**

   ```bash
   pnpm install
   ```

3. **Environment Configuration:**

   Copy the `.env.example` file and rename it to `.env`:

   ```bash
   cp .env.example .env
   ```

### 3. Database Setup

The project uses a PostgreSQL database, which can be run via Docker. To start the database:

1. **Start Docker Compose:**

   ```bash
   docker-compose up -d
   ```

   This will start the container with the PostgreSQL database.

2. **Initial Database Setup:**

   Run the following command to run the database migrations:

   ```bash
    pnpm prisma migrate deploy
   ```

### 4. Start the Project

To start the project in development mode, use the command:

```bash
pnpm dev
```

The project should now be running and accessible on `http://localhost:3000`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue if you find a bug or have a suggestion.
