# Install Algorithms Explorer from GitHub Release (Windows).
param(
    [int]$Port = 27909,
    [string]$BindHost = "127.0.0.1",
    [string]$Repo = "thaonv7995/learning-algorithms",
    [string]$Version = "latest",
    [switch]$NoStart,
    [switch]$Open,
    [switch]$Upgrade
)

$ErrorActionPreference = "Stop"

$arch = switch ((Get-CimInstance Win32_Processor).AddressWidth) {
    64 { "amd64" }
    default { throw "Unsupported architecture" }
}

$asset = "algo-explorer-windows-$arch.zip"
$base = "https://github.com/$Repo/releases"
$url = if ($Version -eq "latest") {
    "$base/latest/download/$asset"
} else {
    "$base/download/$Version/$asset"
}

$tmp = Join-Path $env:TEMP "algo-explorer-install-$(Get-Random)"
New-Item -ItemType Directory -Path $tmp -Force | Out-Null

Write-Host "-> Downloading $asset ($Version)"
Invoke-WebRequest -Uri $url -OutFile (Join-Path $tmp $asset)
Expand-Archive -Path (Join-Path $tmp $asset) -DestinationPath $tmp -Force

$bin = Join-Path $tmp "algo-explorer.exe"
$env:ALGO_EXPLORER_PORT = "$Port"
$env:ALGO_EXPLORER_HOST = $BindHost

Write-Host "-> Installing"
& $bin install --bundle $tmp --port $Port --host $BindHost

$installRoot = Join-Path $env:LOCALAPPDATA "algorithms-explorer"
$cli = Join-Path $installRoot "algo-explorer.exe"
$binDir = Join-Path $env:LOCALAPPDATA "Programs\algorithms-explorer\bin"
$cliInstalled = Join-Path $binDir "algo-explorer.exe"

if ($Upgrade -and (Test-Path $cliInstalled)) {
    Write-Host "-> Stopping existing instance (-Upgrade)"
    & $cliInstalled stop 2>$null
}

New-Item -ItemType Directory -Path $binDir -Force | Out-Null
Copy-Item -Force $cli (Join-Path $binDir "algo-explorer.exe")

if (-not $NoStart) {
    Write-Host "-> Starting background server"
    & (Join-Path $binDir "algo-explorer.exe") start
}

Write-Host ""
Write-Host "Algorithms Explorer installed."
Write-Host "  URL: http://${BindHost}:$Port/"
Write-Host "  CLI: algo-explorer status | open | stop | restart | logs | uninstall"

if ($Open) {
    Start-Process "http://${BindHost}:$Port/"
}

Remove-Item -Recurse -Force $tmp
