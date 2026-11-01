import {writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
const payload=process.env.WAVE_PAYLOAD==='full'?'full':'meta';
writeFileSync('src/build-payload.ts',`// Generated at build time. No server profile.\nexport const BUILD_PAYLOAD: { payload: "meta" | "full" } = { payload: ${JSON.stringify(payload)} };\n`);
const result=spawnSync(process.execPath,['node_modules/typescript/bin/tsc'],{stdio:'inherit'});process.exitCode=result.status??1;
