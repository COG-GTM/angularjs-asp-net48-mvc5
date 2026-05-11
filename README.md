# Angular + ASP.NET Core 8

A demo project using Angular 21 with ASP.NET Core 8 (MVC). Migrated from .NET Framework 4.8 / ASP.NET MVC 5.

## Features

- ASP.NET Core 8 with MVC controllers
- Angular 21 frontend (compiled via Angular CLI)
- Configuration via `appsettings.json` and the Options pattern
- Dockerfile with multi-stage build (Node + .NET)
- Docker Compose for local containerized deployment
- Terraform IaC for AWS ECS Fargate with ALB and VPC
- xUnit unit and integration tests

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/) and npm 9+

## Getting Started

### Install dependencies

```bash
npm install
dotnet restore
```

### Build the Angular frontend

```bash
npx ng build
```

This outputs the compiled Angular app to `Content/app/browser/`.

### Run the application

```bash
dotnet run
```

The app will start at `https://localhost:5001` (or `http://localhost:5000`).

### Run tests

```bash
# .NET unit & integration tests
dotnet test

# Angular unit tests
npm test
```

## Docker

### Build and run with Docker Compose

```bash
docker compose up --build
```

The app will be available at `http://localhost:8080`.

### Build the Docker image directly

```bash
docker build -t angularjs-aspnet .
docker run -p 8080:8080 angularjs-aspnet
```

## Terraform (AWS ECS Fargate)

Infrastructure as Code is in the `terraform/` directory. It provisions:

- VPC with public and private subnets across two AZs
- NAT Gateway for private subnet internet access
- Application Load Balancer (ALB) with HTTP listener
- ECR repository for container images
- ECS Fargate cluster, task definition, and service
- CloudWatch log group for container logs
- IAM roles for ECS task execution

### Deploy

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

### Configuration

Edit `terraform/variables.tf` to customize:

| Variable | Default | Description |
|---|---|---|
| `aws_region` | `us-east-1` | AWS region |
| `app_name` | `angularjs-aspnet` | Resource naming prefix |
| `task_cpu` | `256` | Fargate CPU units |
| `task_memory` | `512` | Fargate memory (MiB) |
| `desired_count` | `2` | Number of ECS tasks |

## Project Structure

```
.
├── Configuration/          # Options pattern settings classes
├── Controllers/            # ASP.NET Core MVC controllers
├── Views/                  # Razor views
├── Content/                # Static files (Angular build output)
├── src/                    # Angular source code
├── Tests/                  # xUnit test project
├── terraform/              # AWS ECS Fargate IaC
├── Program.cs              # ASP.NET Core entry point
├── appsettings.json        # Application configuration
├── Dockerfile              # Multi-stage container build
├── docker-compose.yml      # Local container orchestration
└── angularjs-asp-net48-mvc5.csproj  # SDK-style project file (net8.0)
```

## Migration Notes

This project was migrated from:
- .NET Framework 4.8 → .NET 8
- ASP.NET MVC 5 → ASP.NET Core MVC
- `Web.config` → `appsettings.json` + Options pattern
- `System.Web` → `Microsoft.AspNetCore`
- `packages.config` → SDK-style PackageReference
- `Microsoft.AspNet.Web.Optimization` bundling → Angular CLI build
- `Global.asax` → `Program.cs` minimal hosting
