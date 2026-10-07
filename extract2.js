const fs = require('fs');
const transcript = fs.readFileSync('C:/Users/loayn/.gemini/antigravity-ide/brain/f4c742b5-a4e1-4f08-b312-61b8d89d185d/.system_generated/logs/transcript_full.jsonl', 'utf8').split('\n');
let out = '';
for (let line of transcript) {
    if (!line.trim()) continue;
    try {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
            for (const tc of obj.tool_calls) {
                if (tc.name && tc.name.startsWith('replace')) {
                    let args = typeof tc.arguments === 'string' ? JSON.parse(tc.arguments) : tc.arguments;
                    if (args.TargetFile && args.TargetFile.includes('index_roya.html')) {
                        out += '=== ' + tc.name + ' - ' + (args.Instruction || '') + ' ===\n';
                        if (args.ReplacementContent) out += args.ReplacementContent + '\n\n';
                        else if (args.ReplacementChunks) {
                            for (let chunk of args.ReplacementChunks) {
                                out += (chunk.ReplacementContent || '') + '\n\n';
                            }
                        }
                    }
                }
            }
        }
    } catch(e) {}
}
fs.writeFileSync('all_html_replacements2.txt', out);
console.log('Done.');
