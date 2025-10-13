# EventsHub API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A comprehensive event management API built with <a href="http://nodejs.org" target="_blank">Node.js</a> and <a href="https://nestjs.com/" target="_blank">NestJS</a> framework.</p>

## Description

EventsHub API is a robust backend service for managing events, user authentication, and user preferences. Built with NestJS, it provides a scalable and maintainable solution for event discovery and management applications.

## Features

- 🔐 **Authentication & Authorization**: JWT-based authentication with refresh tokens
- 📧 **Email Verification**: Email verification system for user registration
- 🎫 **Event Management**: Browse and search events by location, date, and other criteria
- ❤️ **Favorites System**: Users can save and manage their favorite events
- 👤 **User Management**: Complete user profile management
- 📚 **API Documentation**: Comprehensive Swagger/OpenAPI documentation
- 🗄️ **Database Integration**: MySQL database with TypeORM
- 🚀 **Deployment Ready**: Configured for Vercel deployment

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MySQL with TypeORM
- **Authentication**: JWT with Passport
- **Email**: Nodemailer
- **Documentation**: Swagger/OpenAPI
- **Deployment**: Vercel

## Prerequisites

- Node.js (v18 or higher)
- MySQL database
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd events-hub-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
# Database Configuration
DB_TYPE=mysql
DB_HOST=your-database-host
DB_PORT=3306
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_NAME=your-database-name
DB_LOGGING=true

# JWT Configuration
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret

# Email Configuration
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USER=your-email
MAIL_PASS=your-email-password

# Server Configuration
PORT=3000
```

## Running the Application

```bash
# development
npm run start:dev

# production mode
npm run start:prod

# watch mode
npm run start:debug
```

## API Documentation

Once the application is running, you can access the Swagger API documentation at:
- **Local**: `http://localhost:3000/api`
- **Production**: `https://your-domain.com/api`

## API Endpoints

### Authentication (`/auth`)
- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login with credentials
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user
- `GET /auth/verify-email` - Verify email address
- `GET /auth/profile` - Get user profile

### Events (`/event`)
- `GET /event/events` - Get events with filters (date, country, pagination)
- `GET /event/:id` - Get event by ID

### Users (`/user`)
- `POST /user` - Create user
- `GET /user/:id` - Get user by ID
- `PATCH /user/:id` - Update user
- `DELETE /user/:id` - Delete user

### Favorites (`/favorite`)
- `POST /favorite/:eventId` - Add event to favorites
- `DELETE /favorite/:eventId` - Remove event from favorites
- `GET /favorite/:eventId` - Check if event is favorite
- `GET /favorite` - Get all user favorites

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Project Structure

```
src/
├── common/                 # Shared utilities and decorators
│   ├── decorators/        # Custom API decorators
│   ├── filters/           # Global exception filters
│   └── utils/             # Utility functions and types
├── config/                # Configuration files
├── db/                    # Database configuration
├── module/                # Feature modules
│   ├── auth/             # Authentication module
│   ├── event/            # Event management module
│   ├── favorite/         # Favorites system module
│   ├── mail/             # Email service module
│   └── user/             # User management module
└── main.ts               # Application entry point
```

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration for serverless deployment.

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in your Vercel dashboard or via CLI:
```bash
vercel env add DB_HOST
vercel env add DB_USERNAME
# ... add all required environment variables
```

## Development

### Code Style

This project uses ESLint and Prettier for code formatting and linting:

```bash
# Format code
npm run format

# Lint code
npm run lint
```

### Database Migrations

The project uses TypeORM with auto-synchronization enabled for development. For production, consider using proper migrations.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the UNLICENSED License.
