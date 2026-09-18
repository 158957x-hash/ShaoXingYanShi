$port = 8765
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$pythonCandidates = @(
  "C:\Users\admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe",
  "python"
)
$python = $pythonCandidates | Where-Object { $_ -eq "python" -or (Test-Path -LiteralPath $_) } | Select-Object -First 1
if (-not $python) { throw "未找到 Python，请安装 Python 后重试。" }
Write-Host "演示原型服务已启动：http://127.0.0.1:$port/index.html"
Write-Host "按 Ctrl+C 停止服务。"
& $python -m http.server $port --directory $root
