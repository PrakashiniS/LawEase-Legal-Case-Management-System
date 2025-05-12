@echo off
setlocal enabledelayedexpansion

:: Function to start a service
:startService
    if not exist "%~dp0%1\mvnw.cmd" (
        echo Error: Maven wrapper not found in %~dp0%1
        exit /b 1
    )
    
    echo Starting %2...
    start "%~2" /D"%~dp0%1" cmd /c "call mvnw.cmd spring-boot:run"
    timeout /t 10 /nobreak >nul
    exit /b 0
)

:: Start services in order with proper error checking
call :startService "service-discovery" "Service Discovery"
if errorlevel 1 goto :error

call :startService "config-server" "Config Server"
if errorlevel 1 goto :error

call :startService "api-gateway" "API Gateway"
if errorlevel 1 goto :error

call :startService "user-service" "User Service"
if errorlevel 1 goto :error

echo.
echo =============================================
echo All services are starting...
echo.
echo Service Discovery: http://localhost:8761
echo Config Server: http://localhost:8888
echo API Gateway: http://localhost:8080
echo User Service API: http://localhost:8081/swagger-ui.html
echo =============================================
echo.
echo Note: It may take a few minutes for all services to start.
echo.

pause
exit /b 0

:error
echo.
echo Failed to start services. Please check the error messages above.
pause
exit /b 1
