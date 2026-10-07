const fs = require('fs');
const transcriptPath = 'C:/Users/loayn/.gemini/antigravity-ide/brain/bf6e58db-1b3b-407c-b649-bf93962300ac/.system_generated/logs/transcript_full.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n');
let dump = '';
for (const line of lines) {
    if (!line) continue;
    try {
        const obj = JSON.parse(line);
        // We know the pattern is in the JSON somewhere, let's just regex the raw line if it has accordion-panel
        if (line.includes('accordion-panel')) {
            dump += '\n\n--- MATCH ---\n' + line;
        }
    } catch(e) {}
}
fs.writeFileSync('dump2.txt', dump);
console.log('Dumped to dump2.txt');
