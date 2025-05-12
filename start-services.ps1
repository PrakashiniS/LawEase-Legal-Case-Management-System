# Start-Services.ps1
# This script starts all the microservices in the correct order

# Function to start a service
function Start-Service {
    param (
        [string]$ServiceDir,
        [string]$ServiceName
    )

    $servicePath = Join-Path -Path $PSScriptRoot -ChildPath $ServiceDir
    $mvnwPath = Join-Path -Path $servicePath -ChildPath "mvnw.cmd"
    
    if (-not (Test-Path -Path $mvnwPath)) {
        Write-Error "Maven wrapper not found in $servicePath"
        return $false
    }
    
    Write-Host "Starting $ServiceName..." -ForegroundColor Green
    Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "`"cd /d `""$servicePath"`" && mvnw.cmd spring-boot:run`"" -NoNewWindow
    
    # Wait for the service to start
    Start-Sleep -Seconds 10
    return $true
}

# Start services in order
$services = @(
    @{ Dir = "service-discovery"; Name = "Service Discovery" },
    @{ Dir = "config-server"; Name = "Config Server" },
    @{ Dir = "api-gateway"; Name = "API Gateway" },
    @{ Dir = "user-service"; Name = "User Service" }
)

foreach ($service in $services) {
    if (-not (Start-Service -ServiceDir $service.Dir -ServiceName $service.Name)) {
        Write-Error "Failed to start $($service.Name)"
        exit 1
    }
}

Write-Host "`nAll services are starting..." -ForegroundColor Cyan
Write-Host "============================================="
"Service Discovery: http://localhost:8761"
"Config Server:    http://localhost:8888"
"API Gateway:      http://localhost:8080"
"User Service:     http://localhost:8081/swagger-ui.html"
"Web Client:       http://localhost:3000"
=============================================" -ForegroundColor Cyan

Write-Host "`nNote: It may take a few minutes for all services to start." -ForegroundColor Yellow

# Start the web client in a new window
$webClientPath = Join-Path -Path $PSScriptRoot -ChildPath "web-client"
if (Test-Path -Path $webClientPath) {
    Write-Host "`nStarting Web Client..." -ForegroundColor Green
    Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "`"cd /d `""$webClientPath"`" && npm start`"" -NoNewWindow
} else {
    Write-Warning "Web client directory not found at $webClientPath"
}

Write-Host "`nAll services have been started. Press any key to exit..." -ForegroundColor Green
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
