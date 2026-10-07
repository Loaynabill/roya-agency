$htmlPath = "d:\themefores\reak\index_roya.html"
$cssPath = "d:\themefores\reak\assets\css\roya-homepage.css"
$jsPath = "d:\themefores\reak\assets\js\custom-roya.js"

$html = Get-Content -Path $htmlPath -Raw

$cssExtractBuilder = @()
$jsExtractBuilder = @()

# Roya Accordion CSS
if ($html -match "(?s)<style>\s*/\* Roya Accordion Services Styles \*/.*?</style>") {
    $block = $matches[0]
    $cleanCss = $block -replace "(?s)<style>\s*", "" -replace "(?s)\s*</style>", ""
    $cssExtractBuilder += "/* Roya Accordion Services Styles */
$cleanCss
"
    $html = $html -replace "(?s)<style>\s*/\* Roya Accordion Services Styles \*/.*?</style>", ""
    Write-Host "Found and removed Accordion CSS"
}

# Roya Marquee CSS
if ($html -match "(?s)<style>\s*/\* Roya Marquee Styles \*/.*?</style>") {
    $block = $matches[0]
    $cleanCss = $block -replace "(?s)<style>\s*", "" -replace "(?s)\s*</style>", ""
    $cssExtractBuilder += "/* Roya Marquee Styles */
$cleanCss
"
    $html = $html -replace "(?s)<style>\s*/\* Roya Marquee Styles \*/.*?</style>", ""
    Write-Host "Found and removed Marquee CSS"
}

# Funfact Style (.huge-stat-item.is-active)
if ($html -match "(?s)<style>\s*\.huge-stat-item\.is-active \.huge-stat-num.*?color:\s*#ff4632 !important;.*?</style>") {
    $block = $matches[0]
    $cleanCss = $block -replace "(?s)<style>\s*", "" -replace "(?s)\s*</style>", ""
    $cssExtractBuilder += "/* Funfact styles */
$cleanCss
"
    $html = $html -replace "(?s)<style>\s*\.huge-stat-item\.is-active \.huge-stat-num.*?color:\s*#ff4632 !important;.*?</style>", ""
    Write-Host "Found and removed Funfact CSS"
}

# Funfact script
if ($html -match "(?s)<script>\s*window\.addEventListener\("load", \(\) => {.*?if \(typeof gsap !== 'undefined'.*?</script>") {
    $block = $matches[0]
    $cleanJs = $block -replace "(?s)<script>\s*", "" -replace "(?s)\s*</script>", ""
    $jsExtractBuilder += "/* Funfact GSAP Logic */
$cleanJs
"
    $html = $html -replace "(?s)<script>\s*window\.addEventListener\("load", \(\) => {.*?if \(typeof gsap !== 'undefined'.*?</script>", ""
    Write-Host "Found and removed Funfact Script"
}

# Append extracted CSS and JS
if ($cssExtractBuilder.Count -gt 0) {
    Add-Content -Path $cssPath -Value ($cssExtractBuilder -join "
")
    Write-Host "Appended CSS to $cssPath"
}
if ($jsExtractBuilder.Count -gt 0) {
    Add-Content -Path $jsPath -Value ($jsExtractBuilder -join "
")
    Write-Host "Appended JS to $jsPath"
}

Set-Content -Path $htmlPath -Value $html -Encoding UTF8
Write-Host "Done!"
