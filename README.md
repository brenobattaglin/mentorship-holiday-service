# nager-service

`nager-service` is a Backend-for-Frontend (BFF) built with NestJS. Its primary purpose is to aggregate and streamline data from the [Nager.Date API](https://date.nager.at), providing a clean, optimized interface for frontend applications to consume global public holiday data.

## 🚀 Features

- **Public Holiday Lookups**: Retrieve holidays for Brazil.
- **Next Holidays**: Quickly find upcoming holidays for Brazil.
- **Performance Optimized**: Built-in caching to reduce external API overhead.
- **Type Safe**: Full TypeScript support with defined DTOs for all responses.

## 🛠 Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **HTTP Client**: `@nestjs/axios` (Axios)
- **Documentation**: Swagger / OpenAPI

## 📋 Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v25 or higher recommended)
- npm

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nager-service.git
   cd nager-service
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Environment Setup:
   Create a `.env` file in the root directory and define the base URL for the Nager API:
   ```env
   NAGER_API_URL=https://date.nager.at/api/v3
   PORT=3000
   ```

## 🏃 Running the App

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 📖 API Endpoints

Once the application is running, you can access the Swagger UI at `http://localhost:3000/api` to view the full interactive documentation.

| Method | Endpoint                | Description                                |
| :----- | :---------------------- | :----------------------------------------- |
| GET    | `/holidays/brazil`      | Get public holidays for Brazil.            |
| GET    | `/next-holidays/brazil` | Get the next upcoming holidays for Brazil. |
