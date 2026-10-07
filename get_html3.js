const fs = require('fs');
const lines = fs.readFileSync('dump2.txt', 'utf8').split('\n');
let htmlChunks = '';
for (const line of lines) {
    if (!line.startsWith('{"step_index"')) continue;
    try {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
            for (const tc of obj.tool_calls) {
                const argsStr = tc.arguments;
                // If arguments is a string (which it usually is in OpenAI API), parse it
                let args = typeof argsStr === 'string' ? JSON.parse(argsStr) : argsStr;
                if (args.TargetFile && args.TargetFile.includes('index_roya.html')) {
                    if (args.ReplacementContent) {
                        htmlChunks += '\n\n=== CHUNK ===\n' + args.ReplacementContent;
                    }
                    if (args.ReplacementChunks) {
                        for (const chunk of args.ReplacementChunks) {
                            htmlChunks += '\n\n=== CHUNK ===\n' + chunk.ReplacementContent;
                        }
                    }
                }
            }
        }
    } catch(e) {}
}
fs.writeFileSync('restored_chunks.txt', htmlChunks);
console.log('Done restored_chunks.txt');
