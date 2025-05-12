# Run Service Discovery
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\praka\OneDrive\Desktop\lawapp\service-discovery'; .\mvnw.cmd spring-boot:run" -WindowStyle Normal

# Wait for service discovery to start
Start-Sleep -Seconds 10

# Run Config Server
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\praka\OneDrive\Desktop\lawapp\config-server'; .\mvnw.cmd spring-boot:run" -WindowStyle Normal

# Wait for config server to start
Start-Sleep -Seconds 10

# Run API Gateway
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\praka\OneDrive\Desktop\lawapp\api-gateway'; .\mvnw.cmd spring-boot:run" -WindowStyle Normal

# Wait for API Gateway to start
Start-Sleep -Seconds 10

# Run User Service
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\praka\OneDrive\Desktop\lawapp\user-service'; .\mvnw.cmd spring-boot:run" -WindowStyle Normal

# Open browser tabs
Start-Process "http://localhost:8761"  # Eureka Dashboard
Start-Process "http://localhost:8081/swagger-ui.html"  # User Service API

Write-Host "All services are starting..."
Write-Host "Eureka Dashboard: http://localhost:8761"
Write-Host "User Service API: http://localhost:8081/swagger-ui.html"
