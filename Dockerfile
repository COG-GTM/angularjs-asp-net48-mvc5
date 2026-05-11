FROM node:18-alpine AS frontend-build
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci --ignore-scripts
COPY angular.json tsconfig.json tsconfig.app.json ./
COPY src/ src/
COPY public/ public/
RUN npx ng build --configuration production

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /src
COPY angularjs-asp-net48-mvc5.csproj ./
RUN dotnet restore
COPY Program.cs ./
COPY Configuration/ Configuration/
COPY Controllers/ Controllers/
COPY Views/ Views/
COPY appsettings*.json ./
COPY --from=frontend-build /app/Content/ Content/
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
COPY --from=backend-build /app/publish .
ENTRYPOINT ["dotnet", "asp-net-angularjs.dll"]
