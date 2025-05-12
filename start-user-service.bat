@echo off
set JAVA_HOME="C:\Program Files\Java\jdk-17"
cd /d %~dp0user-service
call mvnw.cmd spring-boot:run
