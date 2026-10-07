$cssSnippet = @"
/* Solar Integrations Area */
#integrations {
    background-color: #f5f5f5;
    padding: 100px 0;
    overflow: hidden;
}
.integration-solar-card {
    background: #ffffff;
    padding: 50px 40px;
    border-radius: 30px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.04);
}
.integration-solar-card h4 {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 20px;
    color: #111;
    transition: color 0.3s;
}
.integration-solar-card p {
    font-size: 1.1rem;
    color: #555;
    line-height: 1.6;
    margin-bottom: 30px;
    transition: color 0.3s;
}
.integration-solar-list {
    list-style: none;
    padding: 0;
    margin: 0;
}
.integration-solar-list li {
    font-size: 1.1rem;
    color: #111;
    font-weight: 600;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: color 0.3s;
}
.integration-solar-list li span {
    color: #ff4632;
    transition: color 0.3s;
}
.integration-solar-card h4:hover,
.integration-solar-card p:hover,
.integration-solar-list li:hover {
    color: #ff4632;
    cursor: default;
}
.integration-solar-list li:hover span {
    color: #111;
}

.solar-system {
    position: relative;
    width: 600px;
    height: 600px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
}
@media (max-width: 1199px) { .solar-system { transform: scale(0.85); } }
@media (max-width: 991px) {
    .solar-system { transform: scale(0.65); margin-top: 50px; }
    .integration-solar-card { padding: 30px 20px; }
}
@media (max-width: 575px) { .solar-system { transform: scale(0.40); } }

.solar-system .sun {
    position: absolute;
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #ff4632, #ff8c00);
    border-radius: 50%;
    z-index: 10;
    box-shadow: 0 0 50px rgba(255, 70, 50, 0.4), inset 0 0 20px rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 32px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;
}
.orbit-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px dashed rgba(0, 0, 0, 0.15);
    border-radius: 50%;
}
.orbit-ring.ring-1 { width: 280px; height: 280px; }
.orbit-ring.ring-2 { width: 440px; height: 440px; }
.orbit-ring.ring-3 { width: 600px; height: 600px; }

.planet-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: center center;
    border-radius: 50%;
    pointer-events: none;
}
.planet-wrapper.pw-1 { width: 280px; height: 280px; margin-top: -140px; margin-left: -140px; }
.planet-wrapper.pw-2 { width: 440px; height: 440px; margin-top: -220px; margin-left: -220px; }
.planet-wrapper.pw-3 { width: 600px; height: 600px; margin-top: -300px; margin-left: -300px; }

.solar-system .planet {
    position: absolute;
    top: -35px;
    left: 50%;
    margin-left: -35px;
    width: 70px;
    height: 70px;
    pointer-events: auto;
}
.solar-system .planet-icon {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 10px 25px rgba(0,0,0,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}
.solar-system .planet-icon:hover {
    transform: scale(1.25);
    box-shadow: 0 15px 35px rgba(255, 70, 50, 0.3);
    cursor: pointer;
    border: 2px solid #ff4632;
    z-index: 20;
}
.solar-system .planet-icon img {
    max-width: 55%;
    max-height: 55%;
    object-fit: contain;
}
@keyframes spinOrbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes spinCounter { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
.solar-system:hover .planet-wrapper, .solar-system:hover .planet { animation-play-state: paused !important; }
"@

Add-Content -Path "d:\themefores\reak\assets\css\roya-homepage.css" -Value "
$cssSnippet"

$htmlSnippet = @"
                <!-- INTEGRATIONS area start -->
                <div id="integrations" class="sd-project-area dg-project-style p-relative fix" data-bg-color="#f5f5f5">
                    <div class="container">
                        <div class="row pt-120">
                            <div class="offset-xl-1 col-xl-10">
                                <div class="oit-section-title-box mb-80 text-center">
                                    <h3 class="oit-section-title oit-title-revel text-center">
                                        Our Digital Ecosystem
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div class="row align-items-center">
                            <!-- Left Info Card -->
                            <div class="col-lg-5 mb-5 mb-lg-0 order-2 order-lg-1">
                                <div class="integration-solar-card">
                                    <h4>Seamless Connectivity</h4>
                                    <p>
                                        Our ecosystem flawlessly integrates with your favorite tools. From e-commerce
                                        and analytics to CRM and productivity software, everything is connected in one
                                        unified space to amplify your workflow.
                                    </p>
                                    <ul class="integration-solar-list">
                                        <li><span>✔</span> Real-time data sync</li>
                                        <li><span>✔</span> API-first architecture</li>
                                        <li><span>✔</span> Automated workflows</li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Right Solar System -->
                            <div class="col-lg-7 px-3 order-1 order-lg-2 mb-5 mb-lg-0">
                                <div class="solar-system">
                                    <!-- Sun -->
                                    <div class="sun">Roya</div>
                                    
                                    <!-- Orbits -->
                                    <div class="orbit-ring ring-1"></div>
                                    <div class="orbit-ring ring-2"></div>
                                    <div class="orbit-ring ring-3"></div>

                                    <!-- Orbit 1 (Inner) - 15s -->
                                    <div class="planet-wrapper pw-1" style="animation: spinOrbit 15s linear infinite;">
                                        <div class="planet" style="animation: spinCounter 15s linear infinite;">
                                            <div class="planet-icon"><img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg" alt="Notion" loading="lazy"></div>
                                        </div>
                                    </div>
                                    <div class="planet-wrapper pw-1" style="animation: spinOrbit 15s linear infinite; animation-delay: -7.5s;">
                                        <div class="planet" style="animation: spinCounter 15s linear infinite; animation-delay: -7.5s;">
                                            <div class="planet-icon"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" alt="Slack" loading="lazy"></div>
                                        </div>
                                    </div>

                                    <!-- Orbit 2 (Middle) - 25s -->
                                    <div class="planet-wrapper pw-2" style="animation: spinOrbit 25s linear infinite;">
                                        <div class="planet" style="animation: spinCounter 25s linear infinite;">
                                            <div class="planet-icon"><img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg" alt="Shopify" loading="lazy"></div>
                                        </div>
                                    </div>
                                    <div class="planet-wrapper pw-2" style="animation: spinOrbit 25s linear infinite; animation-delay: -8.33s;">
                                        <div class="planet" style="animation: spinCounter 25s linear infinite; animation-delay: -8.33s;">
                                            <div class="planet-icon"><img src="https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg" alt="Sheets" loading="lazy"></div>
                                        </div>
                                    </div>
                                    <div class="planet-wrapper pw-2" style="animation: spinOrbit 25s linear infinite; animation-delay: -16.66s;">
                                        <div class="planet" style="animation: spinCounter 25s linear infinite; animation-delay: -16.66s;">
                                            <div class="planet-icon"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub" loading="lazy"></div>
                                        </div>
                                    </div>

                                    <!-- Orbit 3 (Outer) - 40s -->
                                    <div class="planet-wrapper pw-3" style="animation: spinOrbit 40s linear infinite;">
                                        <div class="planet" style="animation: spinCounter 40s linear infinite;">
                                            <div class="planet-icon"><img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Drive" loading="lazy"></div>
                                        </div>
                                    </div>
                                    <div class="planet-wrapper pw-3" style="animation: spinOrbit 40s linear infinite; animation-delay: -13.33s;">
                                        <div class="planet" style="animation: spinCounter 40s linear infinite; animation-delay: -13.33s;">
                                            <div class="planet-icon"><img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" alt="Figma" loading="lazy"></div>
                                        </div>
                                    </div>
                                    <div class="planet-wrapper pw-3" style="animation: spinOrbit 40s linear infinite; animation-delay: -26.66s;">
                                        <div class="planet" style="animation: spinCounter 40s linear infinite; animation-delay: -26.66s;">
                                            <div class="planet-icon"><img src="https://upload.wikimedia.org/wikipedia/commons/a/af/Trello-logo.svg" alt="Trello" loading="lazy"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- INTEGRATIONS area end -->
"@

$lines = Get-Content d:\themefores\reak\index_roya.html
$startIndex = -1
$endIndex = -1

for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match "<!-- INTEGRATIONS area end -->") {
        if ($startIndex -eq -1) { $startIndex = $i }
        else { $endIndex = $i; break }
    }
}

if ($startIndex -ge 0 -and $endIndex -ge 0) {
    Write-Host "Found integrations block: $startIndex to $endIndex"
    $before = $lines[0..($startIndex-1)]
    $after = $lines[($endIndex+1)..($lines.Length-1)]
    $newContent = $before + $htmlSnippet + $after
    Set-Content -Path d:\themefores\reak\index_roya.html -Value $newContent -Encoding UTF8
    Write-Host "HTML Replace Match Successful"
} else {
    Write-Host "Bounds not found $startIndex $endIndex"
}
