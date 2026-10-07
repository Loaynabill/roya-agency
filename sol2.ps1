$htmlPath = "d:\themefores\reak\index_roya.html"
$lines = Get-Content $htmlPath
$s = -1
$e = -1
for ($i=0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match "<!-- INTEGRATIONS area") {
        if ($s -eq -1) { $s = $i } else { $e = $i; break }
    }
}
if ($s -ge 0 -and $e -ge 0) {
    $htmlSnippet = Get-Content "d:\themefores\reak\snippet.txt" -Raw
    $before = $lines[0..($s-1)]
    $after = $lines[($e+1)..($lines.Length-1)]
    $newContent = $before + $htmlSnippet + $after
    Set-Content -Path $htmlPath -Value $newContent -Encoding UTF8
    Write-Host "Success"
}
