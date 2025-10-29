#!/usr/bin/env node
// Ignora build se não for branch main - versão simplificada
const b=process.env.VERCEL_GIT_COMMIT_REF||'';process.exit(b==='main'?0:1);

