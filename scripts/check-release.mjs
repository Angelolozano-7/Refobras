import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('dist');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
const files=walk(root);
for(const file of files){
  const relative=path.relative(root,file).split(path.sep).join('/');
  assert(!/(^|\/)(private|scripts|api|node_modules|\.git)(\/|$)/.test(relative),'Carpeta no publicable: '+relative);
  assert(!/\.(php|env|md|yml|yaml)$/.test(relative),'Archivo no publicable: '+relative);
  if(file.endsWith('.html')){
    const html=fs.readFileSync(file,'utf8');
    assert(!html.includes('noindex,nofollow'),'Queda noindex en '+relative);
    assert(!html.includes('class="preview-bar"'),'Queda aviso de demo en '+relative);
    assert(!html.includes('<form id="contact-form"'),'Queda formulario de prueba en '+relative);
    assert(html.includes('https://www.refobras.es/'),'Falta dominio real en '+relative);
  }
}
for(const name of ['index.html','404.html','.htaccess','sitemap.xml','robots.txt'])assert(fs.existsSync(path.join(root,name)),'Falta '+name);
assert(!fs.readFileSync(path.join(root,'robots.txt'),'utf8').includes('Disallow: /'),'Indexación bloqueada');
assert(fs.readFileSync(path.join(root,'proyectos/index.html'),'utf8').includes('Próximamente.'),'Estado de proyectos incorrecto');
assert(fs.readFileSync(path.join(root,'contacto/index.html'),'utf8').includes('https://wa.me/34613503677'),'WhatsApp incorrecto');
console.log('Producción validada: '+files.length+' archivos; sin fuentes privadas, PHP ni modo de prueba.');
