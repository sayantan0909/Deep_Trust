@echo off
setlocal
echo ==============================================
echo       DeepTrust Backend Server Starter        
echo ==============================================
echo.

echo [1/3] Hunting down zombie processes on port 8000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8000') do (
    if "%%a" NEQ "0" (
        echo [x] Force killing Process ID: %%a
        taskkill /F /PID %%a >nul 2>&1
    )
)

echo [2/3] Giving the OS a second to free CLOSE_WAIT sockets...
timeout /t 2 /nobreak >nul

echo [3/3] Starting Uvicorn on 0.0.0.0:8000...
echo.
call uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

echo.
echo Server unexpectedly exited!
pause
