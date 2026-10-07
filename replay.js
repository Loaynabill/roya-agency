const fs = require('fs');

function applyEdits() {
    const transcriptPath = 'C:/Users/loayn/.gemini/antigravity-ide/brain/bf6e58db-1b3b-407c-b649-bf93962300ac/.system_generated/logs/transcript_full.jsonl';
    const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n').filter(l => l.trim());
    
    let htmlContent = fs.readFileSync('index_roya.html', 'utf8').replace(/\r\n/g, '\n');
    let cssContent = fs.readFileSync('assets/css/roya-homepage.css', 'utf8').replace(/\r\n/g, '\n');
    
    let replacedHtmlCount = 0;

    for (let i = 0; i < lines.length; i++) {
        try {
            const obj = JSON.parse(lines[i]);
            
            if (obj.tool_calls) {
                for (const tc of obj.tool_calls) {
                    const name = tc.name || tc.function?.name || '';
                    let args = tc.arguments;
                    if (typeof args === 'string') {
                        try { args = JSON.parse(args); } catch(e) {}
                    }
                    
                    if (name.includes('replace_file_content') && !name.includes('multi')) {
                        let targetFile = args.TargetFile || '';
                        let targetContent = (args.TargetContent || '').replace(/\r\n/g, '\n');
                        let replacementContent = (args.ReplacementContent || '').replace(/\r\n/g, '\n');
                        
                        if (!targetContent) continue;

                        if (targetFile.includes('index_roya.html')) {
                            if (htmlContent.includes(targetContent)) {
                                htmlContent = htmlContent.replace(targetContent, replacementContent);
                                replacedHtmlCount++;
                            } else {
                                console.log('Failed to match target content in HTML');
                            }
                        } else if (targetFile.includes('roya-homepage.css')) {
                            if (cssContent.includes(targetContent)) {
                                cssContent = cssContent.replace(targetContent, replacementContent);
                            }
                        }
                    }
                    else if (name.includes('multi_replace_file_content')) {
                        let targetFile = args.TargetFile || '';
                        let chunks = args.ReplacementChunks || [];
                        
                        for (const chunk of chunks) {
                            let targetContent = (chunk.TargetContent || '').replace(/\r\n/g, '\n');
                            let replacementContent = (chunk.ReplacementContent || '').replace(/\r\n/g, '\n');
                            if (!targetContent) continue;
                            
                            if (targetFile.includes('index_roya.html')) {
                                if (htmlContent.includes(targetContent)) {
                                    htmlContent = htmlContent.replace(targetContent, replacementContent);
                                    replacedHtmlCount++;
                                } else {
                                    console.log('Failed to match multi target content in HTML');
                                }
                            } else if (targetFile.includes('roya-homepage.css')) {
                                if (cssContent.includes(targetContent)) {
                                    cssContent = cssContent.replace(targetContent, replacementContent);
                                }
                            }
                        }
                    }
                }
            }
        } catch(e) {}
    }
    
    fs.writeFileSync('index_roya_restored.html', htmlContent);
    fs.writeFileSync('assets/css/roya-homepage_restored.css', cssContent);
    console.log('Restored files saved. Total HTML edits applied:', replacedHtmlCount);
}

applyEdits();
