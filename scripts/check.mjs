import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(process.argv[2]||'public');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(f=>f.isDirectory()?walk(path.join(d,f.name)):[path.join(d,f.name)]);
const files=walk(root);let errors=[];let links=0;
for(const file of files.filter(f=>f.endsWith('.html'))){const html=fs.readFileSync(file,'utf8');if((html.match(/<h1[ >]/g)||[]).length!==1)errors.push(file+': debe contener un H1');if(!html.includes('name="description"'))errors.push(file+': sin descripción');for(const [,url]of html.matchAll(/(?:href|src)="([^"?#]+)(?:[^" ]*)"/g)){if(!url.startsWith('/'))continue;links++;const target=path.join(root,url);if(!fs.existsSync(target)&&!fs.existsSync(path.join(target,'index.html')))errors.push(file+': enlace roto '+url)}for(const tag of html.matchAll(/<img\b[^>]*>/g))if(!tag[0].includes('alt='))errors.push(file+': imagen sin alt');}
console.log(JSON.stringify({html:files.filter(f=>f.endsWith('.html')).length,localLinksChecked:links,errors},null,2));if(errors.length)process.exit(1);
