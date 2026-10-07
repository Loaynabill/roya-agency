const fs = require('fs');
const transcriptPath = 'C:/Users/loayn/.gemini/antigravity-ide/brain/bf6e58db-1b3b-407c-b649-bf93962300ac/.system_generated/logs/transcript_full.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n');
let dump = '';
for (const line of lines) {
    if (!line) continue;
    const obj = JSON.parse(line);
    if (obj.tool_calls) {
        for (const tc of obj.tool_calls) {
            if (tc.name === 'default_api:replace_file_content' || tc.name === 'default_api:multi_replace_file_content') {
                if (tc.arguments && tc.arguments.TargetFile && tc.arguments.TargetFile.includes('index_roya.html')) {
                    if (tc.arguments.ReplacementContent) {
                        dump += '\n\n--- REPLACEMENT CHUNK ---\n' + tc.arguments.ReplacementContent;
                    }
                    if (tc.arguments.ReplacementChunks) {
                        for (const chunk of tc.arguments.ReplacementChunks) {
                            dump += '\n\n--- REPLACEMENT CHUNK ---\n' + chunk.ReplacementContent;
                        }
                    }
                }
            }
        }
    }
}
fs.writeFileSync('dump.txt', dump);
console.log('Dumped to dump.txt');
