#.NET 8.0 SDK image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the project files and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the applications source code
COPY . ./
RUN dotnet publish -o out

#Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 5101
ENV ASPNETCORE_URLS="http://+:5101"
ENTRYPOINT ["dotnet", "heavenlybakes.api.dll"]
