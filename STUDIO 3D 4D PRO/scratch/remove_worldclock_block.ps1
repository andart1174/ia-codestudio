$file = Join-Path $PSScriptRoot '..\js\sketch-extruder.js'
$lines = [System.IO.File]::ReadAllLines($file, [System.Text.Encoding]::UTF8)
$startLine = -1
$endLine = -1

for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match '\(World Clock overlay removed\)') {
        $startLine = $i
    }
    if ($startLine -ge 0 -and $endLine -lt 0 -and $i -gt ($startLine + 1) -and $lines[$i] -match 'const raycaster = new THREE') {
        $endLine = $i
        break
    }
}

Write-Host "Start: $startLine, End: $endLine"

if ($startLine -ge 0 -and $endLine -ge 0) {
    $before = $lines[0..($startLine)]
    $comment = @('      // (World Clock overlay removed)', '')
    $after = $lines[$endLine..($lines.Length - 1)]
    $newLines = $before + $comment + $after
    [System.IO.File]::WriteAllLines($file, $newLines, [System.Text.UTF8Encoding]::new($false))
    Write-Host "SUCCESS: World Clock overlay block removed (lines $startLine to $endLine)"
} else {
    Write-Host "ERROR: Could not find block boundaries"
}
