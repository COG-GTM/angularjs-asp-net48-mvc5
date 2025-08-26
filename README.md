# AngularJS Spring Boot Application

This is a sample application demonstrating the integration of AngularJS with Spring Boot, migrated from ASP.NET MVC 5.

## Features

- AngularJS frontend with XLTS.dev for extended support
- Spring Boot 3.1.5 with Java 17
- Spring MVC for web layer
- Thymeleaf templating engine
- Gradle build system with frontend plugin

## Prerequisites

- Java 17 or later
- Node.js 18+ (for frontend dependencies)

## Getting Started

1. Clone the repository
2. Run `./gradlew build` to build the application and install frontend dependencies
3. Run `./gradlew bootRun` to start the application
4. Open your browser to `http://localhost:8080`

## Frontend Dependencies

The application uses npm for managing frontend dependencies. The main dependencies include:
- AngularJS (via XLTS.dev)
- jQuery

## Build System

The application uses Gradle with the following key features:
- Spring Boot plugin for packaging and running
- Node.js plugin for frontend dependency management
- Automatic copying of frontend assets to static resources

## Testing

Run tests using:
```bash
./gradlew test
```

The application includes:
- Spring Boot unit tests
- Controller integration tests
- Playwright for end-to-end testing (frontend)

## AngularJS LTS packages
If you want to use the LTS packages, you have to run `npm run switch-to-lts-packages` script instead of `npm install`.
