# Nạp các biến môi trường từ file .env vào PowerShell session hiện tại
If (Test-Path ".env") {
    Get-Content .env | Where-Object { $_ -match "^[^#]*=" } | ForEach-Object {
        $name, $value = $_.Split('=', 2)
        $name = $name.Trim()
        $value = $value.Trim()
        # Loại bỏ dấu ngoặc kép thừa (nếu có)
        if ($value -match '^"(.*)"$') { $value = $matches[1] }
        elseif ($value -match "^'(.*)'$") { $value = $matches[1] }
        
        [Environment]::SetEnvironmentVariable($name, $value, "Process")
    }
    Write-Host "✅ Đã nạp thành công bộ chìa khóa (API Key) từ file .env!" -ForegroundColor Green
} Else {
    Write-Host "⚠️ Cảnh báo chết người: Không tìm thấy file .env ở thư mục này!" -ForegroundColor Red
}

# Chạy máy chủ Java
Write-Host "🚀 Đang khởi động dàn máy bơm Spring Boot..." -ForegroundColor Cyan
mvn spring-boot:run
