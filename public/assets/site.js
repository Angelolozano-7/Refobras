const menu=document.querySelector('.menu-toggle');
const carousel=document.querySelector('.carousel');
if(carousel){
  const slides=[...carousel.querySelectorAll('.carousel-slide')];
  const dots=[...carousel.querySelectorAll('[data-slide]')];
  const pause=carousel.querySelector('.carousel-pause');
  const label=carousel.querySelector('.carousel-label');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let current=0,paused=reduced.matches,hovered=false,focused=false,timer=null;
  const names=['Reformas integrales','Cocinas','Baños','Locales y espacios'];
  function show(index){current=(index+slides.length)%slides.length;slides.forEach((slide,i)=>{slide.classList.toggle('active',i===current);slide.setAttribute('aria-hidden',String(i!==current))});dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===current)));label.textContent=names[current];}
  function schedule(){clearInterval(timer);timer=null;if(!paused&&!hovered&&!focused&&!document.hidden)timer=setInterval(()=>show(current+1),6000);pause.textContent=paused?'Reproducir':'Pausar';pause.setAttribute('aria-label',paused?'Reproducir carrusel automático':'Pausar carrusel automático');}
  carousel.querySelector('.carousel-prev').addEventListener('click',()=>{show(current-1);schedule()});
  carousel.querySelector('.carousel-next').addEventListener('click',()=>{show(current+1);schedule()});
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>{show(i);schedule()}));
  pause.addEventListener('click',()=>{paused=!paused;schedule()});
  carousel.addEventListener('mouseenter',()=>{hovered=true;schedule()});
  carousel.addEventListener('mouseleave',()=>{hovered=false;schedule()});
  carousel.addEventListener('focusin',()=>{focused=true;schedule()});
  carousel.addEventListener('focusout',e=>{if(!carousel.contains(e.relatedTarget)){focused=false;schedule()}});
  document.addEventListener('visibilitychange',schedule);
  reduced.addEventListener('change',()=>{if(reduced.matches)paused=true;schedule()});
  schedule();
}
const navigation=document.querySelector('#navigation');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);menu.textContent=open?'Cerrar':'Menú'});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){menu.click();menu.focus()}});
navigation?.addEventListener('click',e=>{if(e.target.closest('a')&&menu.getAttribute('aria-expanded')==='true')menu.click()});
document.querySelectorAll('[data-compare]').forEach(el=>{const input=document.getElementById(el.dataset.compare);input?.addEventListener('input',()=>{el.style.setProperty('--position',input.value+'%');input.setAttribute('aria-valuetext',input.value+'% de la imagen anterior')})});
const form=document.querySelector('#contact-form');
if(form){const requested=new URLSearchParams(location.search).get('servicio');const select=form.querySelector('[name=service]');if([...select.options].some(o=>o.value===requested))select.value=requested;}
if(form){const status=document.querySelector('#form-status');const submit=form.querySelector('[type=submit]');form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;submit.disabled=true;status.textContent='Comprobando tu solicitud…';try{const config=await fetch('/assets/config.json').then(r=>{if(!r.ok)throw Error();return r.json()});if(config.preview||!config.contactEnabled){status.textContent='Formulario comprobado. Esta es una vista previa: tu consulta no se ha enviado ni guardado. El envío se activará al confirmar los datos de contacto de REFORBRAS.';return}const response=await fetch('/api/contact.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))});let result;try{result=await response.json()}catch{throw Error('No se ha podido enviar. Inténtalo más tarde o utiliza el teléfono o WhatsApp.')}if(!response.ok)throw Error(result.error||'No se ha podido enviar la consulta.');status.textContent=result.message;form.reset()}catch(error){status.textContent=error.message||'No hay conexión. Tu consulta no se ha enviado. Inténtalo de nuevo.'}finally{submit.disabled=false;status.focus()}})}
