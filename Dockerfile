# Stage 1: Build Angular frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY angular.json tsconfig.json tsconfig.app.json tsconfig.spec.json ./
COPY src/ src/
COPY public/ public/
RUN npx ng build --configuration production

# Stage 2: Build ASP.NET Core backend
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /app
COPY angularjs-asp-net48-mvc5.csproj Program.cs ./
RUN dotnet publish -c Release -o /app/publish

# Stage 3: Final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=backend-build /app/publish .
COPY --from=frontend-build /app/wwwroot/browser wwwroot/
EXPOSE 8080
ENTRYPOINT ["dotnet", "angularjs-asp-net48-mvc5.dll"]
