$ProgressPreference = "SilentlyContinue"
Write-Host "Starting setup..."
if (-Not (Test-Path "maven_home\apache-maven-3.9.9\bin\mvn.cmd")) {
    Write-Host "Downloading Maven zip..."
    Invoke-WebRequest -Uri "https://archive.apache.org/dist/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.zip" -OutFile "maven.zip"
    Write-Host "Extracting Maven..."
    Expand-Archive "maven.zip" -DestinationPath "maven_home" -Force
}

$env:Path += ";D:\PROJECT\DailyEng\dailyeng\backend\maven_home\apache-maven-3.9.9\bin"
Write-Host "Loading environment variables..."
Get-Content -Path "D:\PROJECT\DailyEng\dailyeng\backend\.env" | Where-Object { $_ -match "^\s*[^#]\s*\w+=" } | ForEach-Object {
    $name, $value = $_ -split "=", 2
    $value = $value.Trim().Trim('"').Trim("'")
    [Environment]::SetEnvironmentVariable($name.Trim(), $value, "Process")
}

Write-Host "Starting Spring Boot Backend..."
mvn spring-boot:run
