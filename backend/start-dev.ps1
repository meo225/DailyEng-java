# Load environment variables from .env file into the current PowerShell session
If (Test-Path ".env") {
    Get-Content .env -Encoding UTF8 | Where-Object { $_ -match "^[^#]*=" } | ForEach-Object {
        $name, $value = $_.Split('=', 2)
        $name = $name.Trim()
        $value = $value.Trim()
        # Remove surrounding quotes if they exist
        if ($value -match '^"(.*)"$') { $value = $matches[1] }
        elseif ($value -match "^'(.*)'$") { $value = $matches[1] }
        
        [Environment]::SetEnvironmentVariable($name, $value, "Process")
    }
    Write-Host "✅ Environment variables successfully loaded from .env!" -ForegroundColor Green
} Else {
    Write-Host "⚠️ Warning: .env file not found in this directory!" -ForegroundColor Red
}

# Launch Spring Boot server
Write-Host "🚀 Starting Spring Boot Backend (DailyEng)..." -ForegroundColor Cyan
mvn spring-boot:run
