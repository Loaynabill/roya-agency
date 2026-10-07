import json
import sys

out = ''
try:
    with open('C:/Users/loayn/.gemini/antigravity-ide/brain/bf6e58db-1b3b-407c-b649-bf93962300ac/.system_generated/logs/transcript_full.jsonl', 'r', encoding='utf-8') as f:
        for line in f:
            if not line.strip(): continue
            try:
                obj = json.loads(line)
                if 'tool_calls' in obj:
                    for tc in obj['tool_calls']:
                        if tc.get('name', '').startswith('replace_file_content') or tc.get('name', '').startswith('multi_replace'):
                            args = tc.get('arguments', {})
                            if isinstance(args, str):
                                args = json.loads(args)
                            if 'index_roya.html' in args.get('TargetFile', ''):
                                out += f"=== {tc.get('name')} - {args.get('Instruction', '')} ===\n"
                                if 'ReplacementContent' in args:
                                    out += args['ReplacementContent'] + '\n\n'
                                elif 'ReplacementChunks' in args:
                                    for chunk in args['ReplacementChunks']:
                                        out += chunk.get('ReplacementContent', '') + '\n\n'
            except Exception as e:
                pass
    with open('all_html_replacements.txt', 'w', encoding='utf-8') as f:
        f.write(out)
    print('Done.')
except Exception as e:
    print(e)
