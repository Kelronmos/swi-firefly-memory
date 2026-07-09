@echo off
setlocal enabledelayedexpansion

title Structured Workflow Intelligence (SWI) V1.01 - Launcher

echo.
echo =====================================================
echo Structured Workflow Intelligence (SWI) V1.01
echo Security Maze
echo =====================================================
echo.

:: -----------------------------
:: [1] Check Node.js
:: -----------------------------
echo [1] Checking Node.js...
node --version >nul 2>&1

if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Install from https://nodejs.org
    pause
    exit /b 1
)

echo OK: Node.js detected
echo.

:: -----------------------------
:: [2] Dependency Install with Retry
:: -----------------------------
echo [2] Installing dependencies...

set RETRY_COUNT=0
set MAX_RETRIES=3

:INSTALL_LOOP
set /a RETRY_COUNT+=1

echo Attempt !RETRY_COUNT! of %MAX_RETRIES%

call npm install
set INSTALL_CODE=%errorlevel%

:: Detect success
if %INSTALL_CODE% equ 0 (
    echo OK: Dependencies installed successfully
    goto START_APP
)

echo WARNING: npm install failed (code %INSTALL_CODE%)

if !RETRY_COUNT! lss %MAX_RETRIES% (
    echo Retrying install...
    timeout /t 5 >nul
    goto INSTALL_LOOP
)

echo ERROR: npm install failed after %MAX_RETRIES% attempts
echo Try clearing cache: npm cache clean --force
pause
exit /b 1

:: -----------------------------
:: [3] Start App with fallback
:: -----------------------------
:START_APP
echo.
echo [3] Starting SWI V1.01...

:: Optional pre-check
if not exist package.json (
    echo ERROR: package.json missing. Cannot start.
    pause
    exit /b 1
)

echo Launching dev server...
start "SWI Dev Server" cmd /k "npm run dev"

echo.
echo If browser does not open automatically:
echo http://localhost:3000
echo.

:: -----------------------------
:: [4] Watchdog (basic stall detection)
:: -----------------------------
echo Monitoring startup (basic check)...

set TIMEOUT=20
set /a COUNTER=0

:WATCH_LOOP
timeout /t 3 >nul
set /a COUNTER+=3

:: crude port check (optional improvement layer)
netstat -ano | findstr :3000 >nul
if %errorlevel% equ 0 (
    echo OK: Server appears to be running on port 3000
    goto END
)

if !COUNTER! geq %TIMEOUT% (
    echo WARNING: Server did not confirm startup within expected time.
    echo Check logs in the dev window.
    goto END
)

goto WATCH_LOOP

:END
echo.
echo Launcher complete.
pause
echo.
npm run dev
pause
exit /b 0
