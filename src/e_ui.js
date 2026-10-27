/* ================== INTERFAZ: INICIO, MAPA, MODALES ================== */
function $(id){return document.getElementById(id);}
function mostrar(id){['inicio','mapa','juego','final'].forEach(function(s){$(s).className='scr'+(s===id?' on':'');});$('tactil').className='tactil'+(id==='juego'?' on':'');}
function abrirModal(html){$('modal').innerHTML=html;$('velo').className='velo on';$('modal').scrollTop=0;}
function cerrarModal(){$('velo').className='velo';K.l=K.r=K.u=0;}
function img(tp){return '<img src="'+(tp==='luz'?icoLuz():tp==='en'?icoEnergia():tp==='clo'?icoClorofila():iconoMol(tp))+'" alt="">';}
function estrellasHTML(n,de){var h='';for(var i=0;i<(de||3);i++)h+=i<n?SVG.est:SVG.estV;return h;}
function mezclar(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function esc(s){return String(s).replace(/[&<>"]/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch];});}
var NOTA_ESCALA='<p class="nota">Las moléculas están dibujadas muy agrandadas para que puedas verlas: en la realidad son miles de veces más pequeñas que una célula. Colores de los átomos: carbono gris, oxígeno rojo, hidrógeno blanco.</p>';

/* ---------- textos de cada nivel ---------- */
var ORDEN={F:['F1','F2','F3','F4'],R:['R1','R2','R3']};
var TXT={
 F1:{t:'La raíz: entra el agua',d:'Recorre el suelo entre los granos y junta el agua que la planta va a absorber por los pelos absorbentes de la raíz.',
  intro:'Estás en el suelo, entre granos de tierra. Alrededor de cada grano hay una película de agua. Junta <b>6 moléculas de agua</b> y entra a la raíz por un <b>pelo absorbente</b>. Esquiva o salta sobre los nematodos.',
  lista:[['h2o','Agua (H<sub>2</sub>O): materia inorgánica que la planta absorbe del suelo.']],
  apr:'La planta absorbe el agua del suelo por los pelos absorbentes de la raíz. El agua es materia inorgánica.',
  quiz:[{q:'¿Por dónde absorbe la planta la mayor parte del agua?',o:['Por los pelos absorbentes de la raíz','Por las flores','Por los estomas de las hojas','Por el tallo, directamente del aire'],c:0,e:'Los pelos absorbentes aumentan mucho la superficie de la raíz en contacto con el agua del suelo.'},
   {q:'El agua que absorbe la raíz, ¿qué tipo de materia es?',o:['Materia orgánica','Materia inorgánica','No es materia, es energía'],c:1,e:'El agua es materia inorgánica. Junto con el dióxido de carbono, es lo que la planta usa para fabricar materia orgánica.'}]},
 F2:{t:'El tallo: el agua sube por el xilema',d:'Sube con el agua por los vasos del xilema, desde la raíz hasta las hojas.',
  intro:'El agua viaja por el <b>xilema</b>, unos tubos muy finos que van desde la raíz hasta las hojas. Sube saltando por los anillos de las paredes y aprovecha las <b>corrientes de agua</b> que suben. Cuidado con las <b>burbujas de aire</b>.',
  lista:[['h2o','Las 6 moléculas de agua viajan contigo.']],
  apr:'El agua y los minerales suben por el xilema desde la raíz hasta las hojas. La transpiración por los estomas ayuda a que el agua suba.',
  quiz:[{q:'¿Qué tejido conduce el agua desde la raíz hasta las hojas?',o:['El floema','El xilema','La epidermis','Los estomas'],c:1,e:'El xilema conduce agua y minerales hacia arriba. El floema transporta las sustancias orgánicas que fabrica la planta.'},
   {q:'¿Qué ayuda a que el agua suba por el xilema?',o:['La luz empuja el agua hacia arriba','La transpiración: el agua que se evapora por los estomas "tira" del agua de abajo','La raíz bombea el agua como un corazón','La gravedad'],c:1,e:'Al evaporarse agua por los estomas de las hojas, se arrastra hacia arriba la columna de agua del xilema.'}]},
 F3:{t:'La hoja: entra el dióxido de carbono',d:'Dentro de la hoja, atrapa el dióxido de carbono que entra del aire por los estomas.',
  intro:'Estás dentro de la hoja. Abajo, en la epidermis, hay <b>estomas</b> que se abren y se cierran. Cuando se abren, entra <b>dióxido de carbono</b> del aire. Atrapa <b>6 moléculas</b> y no te caigas por un estoma abierto.',
  lista:[['co2','Dióxido de carbono (CO<sub>2</sub>): materia inorgánica que viene del aire.'],['h2o','El agua llegó por el xilema.']],
  apr:'El dióxido de carbono del aire entra a la hoja por los estomas. Por los estomas también sale vapor de agua y oxígeno.',
  quiz:[{q:'¿Por dónde entra el dióxido de carbono a la hoja?',o:['Por la raíz','Por los estomas','Por el xilema','No entra: la hoja lo fabrica'],c:1,e:'Los estomas son pequeñas aberturas, sobre todo en la cara inferior de la hoja, por donde se intercambian gases.'},
   {q:'¿De dónde viene el dióxido de carbono que usa la planta en la fotosíntesis?',o:['Del suelo, por las raíces','De la luz del sol','Del aire','Del agua'],c:2,e:'El dióxido de carbono está en el aire y entra a la hoja por los estomas.'}]},
 F4:{t:'El cloroplasto: la luz y la fabricación',d:'Dentro de un cloroplasto, la clorofila capta la energía de la luz y se fabrica glucosa.',
  intro:'Estás dentro de un <b>cloroplasto</b>. En los <b>tilacoides</b> está la <b>clorofila</b>. Párate sobre los 3 grupos marcados cuando les llegue un <b>haz de luz</b>. Después lleva el agua y el dióxido de carbono a la <b>zona de fabricación</b>.',
  lista:[['clo','Clorofila: pigmento verde que capta la energía de la luz. No se gasta.'],['luz','Luz: aporta la energía. No es materia: por eso va sobre la flecha.'],['glu','Glucosa (C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>): materia orgánica que se fabrica.'],['o2','Oxígeno (O<sub>2</sub>): se libera.']],
  apr:'En los cloroplastos, la clorofila capta la energía de la luz. Con esa energía, a partir de agua y dióxido de carbono se fabrica glucosa y se libera oxígeno. La energía queda guardada en la glucosa.',
  quiz:[{q:'¿Qué papel cumple la luz en la fotosíntesis?',o:['Es un reactivo que se transforma en glucosa','Aporta la energía, que capta la clorofila, para fabricar glucosa','Calienta la hoja para que se evapore el agua','No es necesaria'],c:1,e:'La luz no es materia: es energía. La clorofila la capta y esa energía queda guardada en la glucosa.'},
   {q:'¿Qué se obtiene en la fotosíntesis?',o:['Dióxido de carbono y agua','Glucosa y oxígeno','Agua y oxígeno','Glucosa y dióxido de carbono'],c:1,e:'Se fabrica glucosa (materia orgánica) y se libera oxígeno.'}]},
 R1:{t:'El citoplasma: llegan la glucosa y el oxígeno',d:'En el citoplasma de una célula, junta glucosa y oxígeno. Aquí la glucosa se divide en dos fragmentos.',
  intro:'Estás en el <b>citoplasma</b> de una célula. Junta <b>1 glucosa</b> y <b>6 moléculas de oxígeno</b>, que entran atravesando la membrana. Pasa por la <b>zona de división</b>: allí la glucosa se divide en dos fragmentos. Luego entra a la mitocondria.',
  lista:[['glu','Glucosa (C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>): azúcar, materia orgánica con energía.'],['o2','Oxígeno (O<sub>2</sub>): entra a la célula.'],['frag','Fragmento de glucosa: cada glucosa se divide en dos.']],
  apr:'La respiración celular comienza en el citoplasma: allí la glucosa se divide en dos fragmentos y se libera un poco de energía.',
  quiz:[{q:'¿En qué parte de la célula comienza la respiración celular?',o:['En el núcleo','En el citoplasma','En el cloroplasto','En la pared celular'],c:1,e:'La primera etapa ocurre en el citoplasma: la glucosa se divide en dos fragmentos.'},
   {q:'¿Qué seres vivos hacen respiración celular?',o:['Solo los animales','Solo los que tienen pulmones','Todos los seres vivos: animales, plantas, hongos y otros','Solo las plantas'],c:2,e:'Todas las células necesitan energía, también las de las plantas. No hay que confundir la respiración celular con la ventilación de los pulmones.'}]},
 R2:{t:'La mitocondria: se libera la energía',d:'En la mitocondria, cada fragmento de glucosa reacciona con oxígeno y se libera energía.',
  intro:'Estás dentro de una <b>mitocondria</b>. Lleva cada <b>fragmento de glucosa</b> con <b>3 moléculas de oxígeno</b> a un <b>puesto de reacción</b>. Se forman dióxido de carbono y agua, y se libera <b>energía</b>: la vas a necesitar para hacer funcionar el ascensor.',
  lista:[['frag','2 fragmentos de glucosa'],['o2','6 moléculas de oxígeno'],['en','Energía: se libera y la célula la puede usar.']],
  apr:'En las mitocondrias, los fragmentos de glucosa reaccionan con el oxígeno: se forman dióxido de carbono y agua, y se libera energía.',
  quiz:[{q:'¿En qué organela se completa la respiración celular?',o:['En el cloroplasto','En la mitocondria','En el ribosoma','En la vacuola'],c:1,e:'Las mitocondrias están en las células de casi todos los seres vivos, incluidas las plantas.'},
   {q:'Cuando la glucosa reacciona con el oxígeno, ¿qué se forma?',o:['Glucosa y oxígeno','Solo energía: la materia desaparece','Dióxido de carbono y agua, y se libera energía','Clorofila'],c:2,e:'La materia no desaparece: los átomos de la glucosa y del oxígeno forman dióxido de carbono y agua.'}]},
 R3:{t:'La célula usa la energía',d:'Usa la energía liberada en tres trabajos de la célula y saca el dióxido de carbono.',
  intro:'Tienes la <b>energía</b> liberada en la mitocondria. Úsala en los 3 <b>puestos de trabajo</b>: transportar sustancias, moverse y fabricar. Al final, lleva el <b>dióxido de carbono</b> hasta la membrana para que salga de la célula.',
  lista:[['en','Energía: la célula la usa para vivir.'],['co2','Dióxido de carbono (CO<sub>2</sub>): sale de la célula.'],['h2o','Agua (H<sub>2</sub>O): se formó en la reacción.']],
  apr:'La célula usa la energía para transportar sustancias, moverse y fabricar sus propias sustancias. El dióxido de carbono sale de la célula.',
  quiz:[{q:'¿Para qué usa la célula la energía que libera la respiración?',o:['Para fabricar luz','Para transportar sustancias, moverse y fabricar sus propias sustancias','No la usa, la guarda para siempre'],c:1,e:'Todas las actividades de la célula necesitan energía; una parte también se pierde como calor.'},
   {q:'¿Cuándo hacen respiración celular las plantas?',o:['Solo de noche','Solo cuando no hay luz','Todo el tiempo, con luz y sin luz','Nunca: solo hacen fotosíntesis'],c:2,e:'Las células de la planta necesitan energía siempre, por eso respiran todo el tiempo. Con luz, además, hacen fotosíntesis.'}]}
};

/* ---------- INICIO ---------- */
var INI={pj:null,sec:null,raf:0};
function armarInicio(){var h='';PJ_ORDEN.forEach(function(id){h+='<div class="pj" data-pj="'+id+'"><canvas></canvas><div class="pjtx"><b>'+PJ[id].nom+'</b><span>'+PJ[id].desc+'</span></div><div class="tilde">'+SVG.tilde+'</div></div>';});
  $('pjs').innerHTML=h;
  Array.prototype.forEach.call(document.querySelectorAll('.pj'),function(el){el.onclick=function(){INI.pj=el.getAttribute('data-pj');sfx('clic');marcarIni();};});
  Array.prototype.forEach.call(document.querySelectorAll('#secc button'),function(b){b.onclick=function(){INI.sec=b.getAttribute('data-s');sfx('clic');marcarIni();};});
  $('btnEmpezar').onclick=empezar;
  [$('inNom'),$('inApe')].forEach(function(i){i.addEventListener('keydown',function(e){if(e.key==='Enter')empezar();});});
  if(ST.perfil){$('inNom').value=ST.perfil.nom;$('inApe').value=ST.perfil.ape;INI.sec=ST.perfil.sec;INI.pj=ST.perfil.pj;}
  marcarIni();}
function marcarIni(){Array.prototype.forEach.call(document.querySelectorAll('.pj'),function(el){el.className='pj'+(el.getAttribute('data-pj')===INI.pj?' sel':'');});
  Array.prototype.forEach.call(document.querySelectorAll('#secc button'),function(b){b.className=b.getAttribute('data-s')===INI.sec?'sel':'';});}
function limpio(s){s=s.replace(/\s+/g,' ').trim();return s.split(' ').map(function(w){return w.charAt(0).toUpperCase()+w.slice(1).toLowerCase();}).join(' ');}
function empezar(){var n=limpio($('inNom').value),a=limpio($('inApe').value),err='';
  if(n.length<2)err='Escribe tu nombre.';else if(a.length<2)err='Escribe tu apellido.';else if(!INI.sec)err='Elige tu sección: A o B.';else if(!INI.pj)err='Elige tu personaje.';
  $('iniErr').textContent=err;if(err){sfx('mal');return;}
  if(!ST.perfil||ST.perfil.nom!==n||ST.perfil.ape!==a){ST={perfil:null,prog:{},quiz:{},faro:{},pts:0,sonido:ST.sonido};}
  ST.perfil={nom:n,ape:a,sec:INI.sec,pj:INI.pj};guardar();sfx('ok');irMapa();}
function animInicio(ts){if($('inicio').className.indexOf('on')<0){INI.raf=requestAnimationFrame(animInicio);return;}
  var t=ts/1000,k=$('cvIni'),w=window.innerWidth,h=window.innerHeight,d=Math.min(window.devicePixelRatio||1,2);
  if(k.width!==Math.round(w*d)){k.width=Math.round(w*d);k.height=Math.round(h*d);}
  var x=k.getContext('2d');x.setTransform(d,0,0,d,0,0);var g=x.createLinearGradient(0,0,w,h);g.addColorStop(0,'#E3F5D3');g.addColorStop(0.5,'#FFF5E2');g.addColorStop(1,'#FCE0CC');x.fillStyle=g;x.fillRect(0,0,w,h);
  var r=rnd(3),tps=['h2o','co2','o2','glu','h2o','co2','o2'];for(var i=0;i<16;i++){var px=r()*w,py=r()*h,sp=0.15+r()*0.2;x.save();x.globalAlpha=0.55;
    dibujarMol(x,tps[i%7],px+Math.sin(t*sp+i)*30,(py-t*12*sp*4+h*2)%(h+100)-50,tps[i%7]==='glu'?1.6:1.8,t*sp+i);x.restore();}
  Array.prototype.forEach.call(document.querySelectorAll('.pj canvas'),function(cv2){var W2=cv2.clientWidth,H2=cv2.clientHeight;if(!W2)return;if(cv2.width!==Math.round(W2*d)){cv2.width=Math.round(W2*d);cv2.height=Math.round(H2*d);}
    var y=cv2.getContext('2d');y.setTransform(d,0,0,d,0,0);y.clearRect(0,0,W2,H2);var id=cv2.parentNode.getAttribute('data-pj'),sel=id===INI.pj;
    var s=Math.min(W2/60,H2/92);y.fillStyle=sel?'#FFE7B8':'#F3E9D8';y.beginPath();y.ellipse(W2/2,H2*0.93,W2*0.32,H2*0.04,0,0,7);y.fill();
    dibujarPJ(y,id,W2/2,H2*0.93,s,1,t+PJ_ORDEN.indexOf(id),sel?'run':'idle',{vx:sel?120:0});});
  INI.raf=requestAnimationFrame(animInicio);}

/* ---------- MAPA ---------- */
var NODOS={F1:[430,660],F2:[500,480],F3:[640,330],F4:[400,250],FF:[780,720],R1:[1000,590],R2:[1150,430],R3:[1320,560],RF:[1400,730]};
var SEL=null;
function nivelHecho(id){return !!ST.prog[id];}
function islaHecha(is){return ORDEN[is].every(nivelHecho);}
function desbloqueado(id){if(LIBRE)return true;if(id==='FF')return islaHecha('F');if(id==='RF')return islaHecha('R');var o=ORDEN[id.charAt(0)],i=o.indexOf(id);return i===0||nivelHecho(o[i-1]);}
function blob(cx,cy,rx,ry,seed){var r=rnd(seed),n=14,pts=[];for(var i=0;i<n;i++){var a=i/n*6.283,f=0.86+r()*0.22;pts.push([cx+Math.cos(a)*rx*f,cy+Math.sin(a)*ry*f]);}
  var d='M'+((pts[0][0]+pts[n-1][0])/2)+' '+((pts[0][1]+pts[n-1][1])/2);for(i=0;i<n;i++){var p=pts[i],q=pts[(i+1)%n];d+=' Q'+p[0].toFixed(1)+' '+p[1].toFixed(1)+' '+((p[0]+q[0])/2).toFixed(1)+' '+((p[1]+q[1])/2).toFixed(1);}return d+'Z';}
function pintarMapa(){var s='<defs><radialGradient id="gMar" cx="50%" cy="45%" r="75%"><stop offset="0" stop-color="#9FE1E6"/><stop offset="1" stop-color="#4FB9CC"/></radialGradient>'+
  '<linearGradient id="gF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ED36F"/><stop offset="1" stop-color="#4FAE58"/></linearGradient>'+
  '<linearGradient id="gR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F8C9A0"/><stop offset="1" stop-color="#E98A56"/></linearGradient>'+
  '<clipPath id="cF"><path d="'+blob(540,500,370,330,8)+'"/></clipPath></defs>';
  s+='<rect width="1600" height="900" fill="url(#gMar)"/>';
  var r=rnd(2);for(var i=0;i<46;i++){var x=r()*1600,y=r()*900;s+='<path d="M'+x+' '+y+' q12 -8 24 0 t24 0" stroke="#E6FAFA" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>';}
  // Isla Fotosíntesis
  s+='<path d="'+blob(540,510,400,355,8)+'" fill="#F6E3B4"/><path d="'+blob(540,500,370,330,8)+'" fill="url(#gF)"/>';
  s+='<g clip-path="url(#cF)"><rect x="100" y="560" width="900" height="400" fill="#C99A6B"/><path d="M100 560 Q300 545 540 560 T1000 556" stroke="#9C6A40" stroke-width="6" fill="none"/>';
  for(i=0;i<40;i++)s+='<circle cx="'+(150+r()*800)+'" cy="'+(590+r()*260)+'" r="'+(5+r()*12)+'" fill="#B07A4A" opacity=".6"/>';
  s+='<path d="M500 560 C500 600 470 640 430 690 M500 575 C520 620 560 650 600 700 M500 590 C505 640 500 700 505 760" stroke="#F4E2BE" stroke-width="10" fill="none" stroke-linecap="round"/></g>';
  s+='<path d="M500 562 C500 480 505 400 520 300" stroke="#2F7A3A" stroke-width="16" fill="none" stroke-linecap="round"/>';
  s+='<path d="M512 400 C560 360 640 330 700 330 C660 380 590 410 512 400Z" fill="#3DBA6E" stroke="#1F6B44" stroke-width="4"/><path d="M512 400 C590 375 640 350 700 330" stroke="#1F6B44" stroke-width="3" fill="none"/>';
  s+='<path d="M506 470 C460 440 400 440 350 460 C400 500 460 500 506 470Z" fill="#46C276" stroke="#1F6B44" stroke-width="4"/><path d="M520 300 C500 250 520 200 560 180 C570 230 550 270 520 300Z" fill="#3DBA6E" stroke="#1F6B44" stroke-width="4"/>';
  s+='<circle cx="400" cy="250" r="66" fill="#E4F5C8" stroke="#2E9E5B" stroke-width="5"/><path d="M445 296 L470 330" stroke="#2E9E5B" stroke-width="5"/>';
  for(i=0;i<3;i++)s+='<rect x="'+(360+i*28)+'" y="'+(228+(i%2)*14)+'" width="22" height="30" rx="7" fill="#4FB45A" stroke="#1F6B44" stroke-width="2"/>';
  s+='<g transform="translate(250 150)"><circle r="46" fill="#FFC43D"/><g stroke="#FFC43D" stroke-width="7" stroke-linecap="round">';for(i=0;i<8;i++){var a=i*0.785;s+='<line x1="'+(Math.cos(a)*58)+'" y1="'+(Math.sin(a)*58)+'" x2="'+(Math.cos(a)*76)+'" y2="'+(Math.sin(a)*76)+'"/>';}s+='</g></g>';
  s+='<g transform="translate(540 120)"><rect x="-200" y="-34" width="400" height="62" rx="31" fill="#1F6B44"/><text y="10" text-anchor="middle" font-family="Fredoka" font-size="34" fill="#fff">Isla Fotosíntesis</text></g>';
  // Isla Respiración
  s+='<path d="'+blob(1180,510,380,345,21)+'" fill="#F6E3B4"/><path d="'+blob(1180,500,350,320,21)+'" fill="url(#gR)"/>';
  s+='<ellipse cx="1170" cy="500" rx="260" ry="210" fill="#FFF1E4" stroke="#E9967A" stroke-width="14"/><ellipse cx="1170" cy="500" rx="260" ry="210" fill="none" stroke="#FDE8D6" stroke-width="4" stroke-dasharray="4 10"/>';
  s+='<g transform="translate(1150 430) rotate(-12)"><ellipse rx="120" ry="62" fill="#F6C7A0" stroke="#C25A32" stroke-width="5"/><ellipse rx="104" ry="48" fill="#FCE3CF"/>';
  for(i=-2;i<=2;i++)s+='<path d="M'+(i*38)+' '+(i%2?-48:48)+' L'+(i*38)+' '+(i%2?-8:8)+'" stroke="#E98A56" stroke-width="9" stroke-linecap="round"/>';s+='</g>';
  s+='<circle cx="1260" cy="540" r="30" fill="#E6B8D0" opacity=".8"/><circle cx="1040" cy="470" r="16" fill="#F3C9A8"/><circle cx="1210" cy="620" r="14" fill="#F3C9A8"/>';
  s+='<g transform="translate(1180 140)"><rect x="-245" y="-34" width="490" height="62" rx="31" fill="#B4492A"/><text y="10" text-anchor="middle" font-family="Fredoka" font-size="34" fill="#fff">Isla Respiración celular</text></g>';
  // faros
  [['FF',780,600,'#2E9E5B'],['RF',1410,680,'#E0704A']].forEach(function(f){s+='<g transform="translate('+f[1]+' '+(f[2]-60)+')"><path d="M-16 50 L-10 -10 L10 -10 L16 50Z" fill="#fff" stroke="#22313B" stroke-width="3"/><rect x="-12" y="8" width="24" height="10" fill="'+f[3]+'"/><rect x="-14" y="-26" width="28" height="18" rx="4" fill="#FFC43D" stroke="#22313B" stroke-width="3"/><path d="M-16 -26 L0 -42 L16 -26Z" fill="'+f[3]+'" stroke="#22313B" stroke-width="3"/></g>';});
  // caminos
  ['F','R'].forEach(function(is){var ids=ORDEN[is].concat([is+'F']);var d='';ids.forEach(function(id,j){var p=NODOS[id];d+=(j?' L':'M')+p[0]+' '+p[1];});
    s+='<path d="'+d+'" stroke="#fff" stroke-width="9" fill="none" stroke-dasharray="2 18" stroke-linecap="round" opacity=".95"/>';});
  // nodos
  Object.keys(NODOS).forEach(function(id){var p=NODOS[id],ok=desbloqueado(id),is=id.charAt(0),faro=id.charAt(1)==='F',hecho=faro?ST.faro[is]:nivelHecho(id);
    var col=is==='F'?'#2E9E5B':'#E0704A',colO=is==='F'?'#1F6B44':'#B4492A';
    s+='<g class="est'+(ok?'':' bloq')+'" data-id="'+id+'" transform="translate('+p[0]+' '+p[1]+')"><g class="aro">'+(SEL===id?'<circle r="54" fill="none" stroke="#FFC43D" stroke-width="7"/>':'')+
      '<circle r="44" fill="'+(ok?(hecho?col:'#fff'):'#D9D2C5')+'" stroke="'+(ok?colO:'#A99F90')+'" stroke-width="6"/>';
    if(!ok)s+='<g transform="translate(-18 -18) scale(1.5)">'+SVG.candado.replace('<svg viewBox="0 0 24 24">','').replace('</svg>','')+'</g>';
    else s+='<text y="13" text-anchor="middle" font-family="Fredoka" font-size="'+(faro?24:38)+'" fill="'+(hecho?'#fff':colO)+'">'+(faro?'FARO':id.charAt(1))+'</text>';
    s+='</g>';if(!faro&&nivelHecho(id)){var e=ST.prog[id].est;for(var k=0;k<3;k++)s+='<path transform="translate('+(-34+k*24)+' 50) scale(1.1)" d="M10 1l2.6 5.4 5.9.7-4.4 4 1.2 5.8L10 14.1 4.7 17l1.2-5.8-4.4-4 5.9-.7z" fill="'+(k<e?'#FFC43D':'#fff')+'" stroke="#C98A00" stroke-width="1.3"/>';}
    s+='</g>';});
  $('svgMapa').innerHTML=s;
  Array.prototype.forEach.call(document.querySelectorAll('#svgMapa .est'),function(g){g.addEventListener('click',function(){mostrarNivel(g.getAttribute('data-id'));});});
  $('mNom').textContent=ST.perfil.nom+' '+ST.perfil.ape;$('mSec').textContent='Sección '+ST.perfil.sec+' · '+PJ[ST.perfil.pj].nom;
  $('mEst').textContent=totalEst()+'/21';$('mPts').textContent=totalPts();
  var av=$('cvAvMapa'),x=av.getContext('2d');x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,116,116);dibujarPJ(x,ST.perfil.pj,58,250,2.6,1,0,'idle',{});
  $('btnFinal').style.opacity=(ST.faro.F&&ST.faro.R)||LIBRE?'1':'.55';}
function irMapa(){mostrar('mapa');JG.L=null;pintarMapa();
  var sig=null;['F','R'].forEach(function(is){ORDEN[is].concat([is+'F']).forEach(function(id){if(!sig&&desbloqueado(id)&&!(id.charAt(1)==='F'?ST.faro[is]:nivelHecho(id)))sig=id;});});
  mostrarNivel(SEL&&desbloqueado(SEL)?SEL:(sig||'F1'),true);}
function mostrarNivel(id,silencio){if(!silencio)sfx('clic');SEL=id;pintarMapa();var is=id.charAt(0),faro=id.charAt(1)==='F',ok=desbloqueado(id);
  var nomIsla=is==='F'?'Isla Fotosíntesis':'Isla Respiración celular',h='';
  var ic='<svg class="pe-ic" viewBox="0 0 96 96"><circle cx="48" cy="48" r="46" fill="'+(is==='F'?'#E4F5D6':'#FDE7D8')+'"/><image href="'+(faro?(is==='F'?icoLuz():icoEnergia()):iconoMol(TXT[id]&&TXT[id].lista[0][0]==='clo'?'glu':(TXT[id]?TXT[id].lista[0][0]:'glu')))+'" x="14" y="14" width="68" height="68"/></svg>';
  if(faro){h=ic+'<div class="pe-tx"><small style="font-weight:800;color:#6B7A85">'+nomIsla.toUpperCase()+' · DESAFÍO FINAL</small><h3>Faro: arma la ecuación'+(ST.faro[is]?'<span class="estrellas">'+SVG.tilde+'</span>':'')+'</h3><p>'+(is==='F'?'Ordena las sustancias y las condiciones de la fotosíntesis.':'Ordena las sustancias de la respiración celular.')+(ok?'':' <b>Se desbloquea al completar todos los niveles de la isla.</b>')+'</p></div>';}
  else{var T2=TXT[id],p=ST.prog[id];h=ic+'<div class="pe-tx"><small style="font-weight:800;color:#6B7A85">'+nomIsla.toUpperCase()+' · NIVEL '+id.charAt(1)+'</small><h3>'+T2.t+(p?'<span class="estrellas">'+estrellasHTML(p.est)+'</span>':'')+'</h3><p>'+T2.d+(ok?'':' <b>Se desbloquea al completar el nivel anterior.</b>')+'</p></div>';}
  h+=ok?'<button class="btn'+(is==='R'?' terra':'')+'" id="btnJugar">'+(faro?'Ir al faro':(ST.prog[id]?'Jugar otra vez':'Jugar'))+'</button>':'<span style="width:60px">'+SVG.candado+'</span>';
  $('panelEst').innerHTML=h;if(ok)$('btnJugar').onclick=function(){sfx('clic');if(faro)abrirFaro(is);else introNivel(id);};}

/* ---------- INTRO DE NIVEL ---------- */
function cabeza(is,sup,tit,ic){return '<div class="cab '+(is==='F'?'f':is==='R'?'r':'n')+'">'+(ic||'')+'<div><small>'+sup+'</small><h2>'+tit+'</h2></div></div>';}
function introNivel(id){var T2=TXT[id],is=id.charAt(0);
  var lista=T2.lista.map(function(a){return '<div>'+img(a[0])+'<span>'+a[1]+'</span></div>';}).join('');
  abrirModal(cabeza(is,(is==='F'?'Isla Fotosíntesis':'Isla Respiración celular')+' · Nivel '+id.charAt(1),T2.t)+
    '<div class="cuerpo"><div class="dos"><div style="display:grid;gap:14px"><p>'+T2.intro+'</p><div class="teclas">'+SVG.teclas+'<p>Muévete con las <b>flechas laterales</b> y salta con la <b>flecha de arriba</b> (en el teclado o con los botones de la pantalla). Tienes 3 corazones. Las banderas guardan tu avance.</p></div></div>'+
    '<div class="lista">'+lista+'</div></div>'+NOTA_ESCALA+'<div class="pie"><button class="btn claro" id="mVolver">Volver al mapa</button><button class="btn'+(is==='R'?' terra':'')+'" id="mEmp">¡Empezar!</button></div></div>');
  $('mVolver').onclick=function(){cerrarModal();};$('mEmp').onclick=function(){cerrarModal();jugar(id);};}
function jugar(id){mostrar('juego');ajustar();iniciarNivel(id);sfx('ok');}

/* ---------- COMPLETAR / PERDER / PAUSA ---------- */
function completar(){var L=JG.L,id=L.id,is=L.isla;sfx('nivel');var est=L.cor>=3?3:L.cor===2?2:1;var prev=ST.prog[id]||{est:0,pts:0};
  ST.prog[id]={est:Math.max(prev.est,est),pts:Math.max(prev.pts,L.pts+est*20)};guardar();
  var o=ORDEN[is],sig=o[o.indexOf(id)+1]||null;
  abrirModal(cabeza(is,'¡Nivel completado!',TXT[id].t)+'<div class="cuerpo"><div class="estgr">'+estrellasHTML(est)+'</div>'+
    '<p style="text-align:center;font-weight:700">'+(est===3?'¡Sin perder ningún corazón!':est===2?'Perdiste un corazón. ¡Muy bien!':'¡Lo lograste!')+' · '+(L.pts+est*20)+' puntos</p>'+
    '<div class="preg" style="background:'+(is==='F'?'#EAF7EF':'#FDEFE6')+'"><h3>Lo que aprendiste</h3><p>'+TXT[id].apr+'</p></div>'+
    '<div class="pie"><button class="btn'+(is==='R'?' terra':'')+'" id="mQuiz">Responder 2 preguntas</button></div></div>');
  $('mQuiz').onclick=function(){quiz(id,0,0,sig);};}
function quiz(id,i,bien,sig){var q=TXT[id].quiz[i],is=id.charAt(0),n=TXT[id].quiz.length,orden=mezclar(q.o.map(function(t,j){return j;}));
  var prog='';for(var k=0;k<n;k++)prog+='<i class="'+(k<=i?'on':'')+'"></i>';
  abrirModal(cabeza(is,'Pregunta '+(i+1)+' de '+n,TXT[id].t)+'<div class="cuerpo"><div class="prog">'+prog+'</div><div class="preg"><h3>'+q.q+'</h3><div class="ops">'+
    orden.map(function(j,m){return '<button data-j="'+j+'"><span class="le">'+'ABCD'.charAt(m)+'</span>'+q.o[j]+'</button>';}).join('')+'</div><div class="expl" id="qExp"></div></div>'+
    '<div class="pie"><button class="btn'+(is==='R'?' terra':'')+'" id="qSig" style="display:none">'+(i+1<n?'Siguiente pregunta':'Terminar')+'</button></div></div>');
  var bs=document.querySelectorAll('.ops button');
  Array.prototype.forEach.call(bs,function(b){b.onclick=function(){var j=+b.getAttribute('data-j'),ok=j===q.c;
    Array.prototype.forEach.call(bs,function(x){x.disabled=true;if(+x.getAttribute('data-j')===q.c)x.className='bien';});if(!ok)b.className='mal';
    sfx(ok?'ok':'mal');if(ok)bien++;var e=$('qExp');e.className='expl on '+(ok?'bien':'mal');e.innerHTML=(ok?'¡Correcto! ':'No es correcto. ')+q.e;$('qSig').style.display='';};});
  $('qSig').onclick=function(){if(i+1<n)quiz(id,i+1,bien,sig);else{ST.quiz[id]=Math.max(ST.quiz[id]||0,bien);guardar();finNivel(id,bien,sig);}};}
function finNivel(id,bien,sig){var is=id.charAt(0),fin=!sig;
  abrirModal(cabeza(is,'Resultado',TXT[id].t)+'<div class="cuerpo"><p style="text-align:center;font-size:22px"><b>'+bien+' de 2</b> respuestas correctas (+'+bien*50+' puntos)</p>'+
    (fin?'<div class="preg"><h3>¡Completaste todos los niveles de la '+(is==='F'?'Isla Fotosíntesis':'Isla Respiración celular')+'!</h3><p>Ahora te espera el <b>desafío del faro</b>: armar la ecuación '+(is==='F'?'de la fotosíntesis':'de la respiración celular')+'.</p></div>':'')+
    '<div class="pie"><button class="btn claro" id="fMapa">Volver al mapa</button><button class="btn'+(is==='R'?' terra':'')+'" id="fSig">'+(fin?'Ir al faro':'Siguiente nivel')+'</button></div></div>');
  $('fMapa').onclick=function(){cerrarModal();irMapa();};
  $('fSig').onclick=function(){cerrarModal();if(fin){irMapa();abrirFaro(is);}else introNivel(sig);};}
function perdiste(){var L=JG.L;sfx('mal');abrirModal(cabeza(L.isla,'Te quedaste sin corazones',L.nombre)+'<div class="cuerpo"><p style="text-align:center">No pasa nada: vuelve a intentarlo. Recuerda lo que aprendiste en este intento.</p>'+
  '<div class="pie"><button class="btn claro" id="pMapa">Volver al mapa</button><button class="btn'+(L.isla==='R'?' terra':'')+'" id="pOtra">Intentar otra vez</button></div></div>');
  $('pMapa').onclick=function(){cerrarModal();irMapa();};$('pOtra').onclick=function(){cerrarModal();jugar(L.id);};}
function pausar(){var L=JG.L;if(!L)return;JG.pausa=true;
  abrirModal(cabeza(L.isla,'Pausa',L.nombre)+'<div class="cuerpo"><div class="teclas">'+SVG.teclas+'<p>Flechas laterales: moverse. Flecha de arriba: saltar. También puedes usar los botones de la pantalla.</p></div>'+
    '<div class="preg"><h3>Objetivo</h3><p>'+L.objetivo(L)+'</p></div><div class="pie"><button class="btn claro" id="zMapa">Salir al mapa</button><button class="btn claro" id="zRe">Reiniciar nivel</button><button class="btn'+(L.isla==='R'?' terra':'')+'" id="zSeg">Continuar</button></div></div>');
  $('zSeg').onclick=function(){cerrarModal();JG.pausa=false;};$('zRe').onclick=function(){cerrarModal();jugar(L.id);};$('zMapa').onclick=function(){cerrarModal();irMapa();};}

/* ---------- FARO: armar la ecuación ---------- */
var FARO={
 F:{tit:'Ecuación de la fotosíntesis',huecos:['R','R','C','C','P','P'],fl:'',
  fichas:{h2o:['R','agua','El agua es un reactivo: la planta la absorbe para fabricar glucosa.'],co2:['R','dióxido de carbono','El dióxido de carbono es un reactivo: entra por los estomas para fabricar glucosa.'],
   luz:['C','luz','La luz no es una sustancia: aporta la energía. Va sobre la flecha, como condición.'],clo:['C','clorofila','La clorofila no se gasta: capta la luz. Va sobre la flecha.'],
   glu:['P','glucosa','La glucosa es lo que se fabrica: es un producto.'],o2:['P','oxígeno','El oxígeno se libera: es un producto.'],
   en:['X','energía que se libera','En la fotosíntesis no se libera energía: la energía de la luz queda guardada en la glucosa.']}},
 R:{tit:'Ecuación de la respiración celular',huecos:['R','R','P','P','P'],
  fichas:{glu:['R','glucosa','La glucosa es un reactivo: la célula la usa para obtener energía.'],o2:['R','oxígeno','El oxígeno es un reactivo: reacciona con la glucosa.'],
   co2:['P','dióxido de carbono','El dióxido de carbono se forma: es un producto.'],h2o:['P','agua','El agua se forma: es un producto.'],en:['P','energía','La energía se libera: va del lado de los productos.'],
   luz:['X','luz','La respiración celular no necesita luz: ocurre todo el tiempo.'],clo:['X','clorofila','La clorofila participa de la fotosíntesis, no de la respiración celular.']}}};
var NOMH={R:'reactivo',C:'condición',P:'producto'};
function abrirFaro(is){var F=FARO[is],st={pos:[],err:0};
  function lugar(i){var t=F.huecos[i],v=st.pos[i];return '<div class="hueco'+(t==='C'?' cond':'')+(v?' lleno':'')+'">'+(v?img(v)+F.fichas[v][1]:NOMH[t])+'</div>';}
  function dibujar(){var i,h='';
    if(is==='F')h=lugar(0)+'<span class="mas fr">+</span>'+lugar(1)+'<div class="flechag">'+lugar(2)+'<svg viewBox="0 0 150 26"><path d="M4 13h134M126 3l14 10-14 10" stroke="#22313B" stroke-width="4" fill="none" stroke-linecap="round"/></svg>'+lugar(3)+'</div>'+lugar(4)+'<span class="mas fr">+</span>'+lugar(5);
    else h=lugar(0)+'<span class="mas fr">+</span>'+lugar(1)+'<div class="flechag"><small style="font-weight:800">en la célula</small><svg viewBox="0 0 150 26"><path d="M4 13h134M126 3l14 10-14 10" stroke="#22313B" stroke-width="4" fill="none" stroke-linecap="round"/></svg><small style="font-weight:800">(mitocondria)</small></div>'+lugar(2)+'<span class="mas fr">+</span>'+lugar(3)+'<span class="mas fr">+</span>'+lugar(4);
    $('fArm').innerHTML=h;
    var sig=st.pos.length;$('fGuia').innerHTML=sig<F.huecos.length?'Elige qué va en el lugar marcado: <b>'+NOMH[F.huecos[sig]]+'</b>':'';
    Array.prototype.forEach.call(document.querySelectorAll('#fArm .hueco'),function(el,j){el.style.boxShadow=j===sig?'0 0 0 5px #FFC43D':'';});}
  var ids=mezclar(Object.keys(F.fichas));
  abrirModal(cabeza(is,'Desafío del faro',F.tit,'<svg viewBox="0 0 64 64"><path d="M24 58 L28 20 L36 20 L40 58Z" fill="#fff"/><rect x="25" y="10" width="14" height="10" rx="3" fill="#FFC43D"/></svg>')+
    '<div class="cuerpo"><p>Completa la ecuación de izquierda a derecha: primero los <b>reactivos</b>'+(is==='F'?', luego las <b>condiciones</b> que van sobre la flecha':'')+' y al final los <b>productos</b>. Cuidado: hay fichas que no van.</p>'+
    '<div class="armado" id="fArm"></div><p id="fGuia" style="text-align:center;font-weight:700"></p><div class="fichas" id="fFichas">'+
    ids.map(function(k){return '<button class="ficha" data-k="'+k+'">'+img(k)+F.fichas[k][1]+'</button>';}).join('')+'</div><div class="expl" id="fExp"></div>'+
    '<div class="pie"><button class="btn claro" id="fSal">Volver al mapa</button></div></div>');
  dibujar();$('fSal').onclick=function(){cerrarModal();irMapa();};
  Array.prototype.forEach.call(document.querySelectorAll('#fFichas .ficha'),function(b){b.onclick=function(){var k=b.getAttribute('data-k'),sig=st.pos.length;if(sig>=F.huecos.length)return;
    var ok=F.fichas[k][0]===F.huecos[sig],e=$('fExp');
    if(!ok){st.err++;sfx('mal');b.className='ficha sacude';setTimeout(function(){b.className='ficha';},420);e.className='expl on mal';e.innerHTML=F.fichas[k][2];return;}
    sfx('ok');st.pos.push(k);b.className='ficha usada';e.className='expl on bien';e.innerHTML=F.fichas[k][2];dibujar();
    if(st.pos.length===F.huecos.length){ST.faro[is]=true;guardar();setTimeout(function(){faroListo(is,st.err);},900);}};});}
function faroListo(is,err){sfx('nivel');var ambas=ST.faro.F&&ST.faro.R;
  var fl='<span style="display:inline-flex;flex-direction:column;align-items:center;gap:2px;margin:0 10px"><small style="font-size:14px">'+(is==='F'?'luz · clorofila':'en la célula (mitocondria)')+'</small>'+SVG.flecha+'</span>';
  abrirModal(cabeza(is,'¡Faro encendido!',FARO[is].tit)+'<div class="cuerpo"><div class="armado" style="font:700 24px Fredoka;align-items:center">'+(is==='F'?
    img('h2o')+' agua + '+img('co2')+' dióxido de carbono'+fl+img('glu')+' glucosa + '+img('o2')+' oxígeno':
    img('glu')+' glucosa + '+img('o2')+' oxígeno'+fl+img('co2')+' dióxido de carbono + '+img('h2o')+' agua + '+img('en')+' energía')+'</div>'+
    '<p style="text-align:center">'+(err===0?'¡Sin ningún error!':'Errores: '+err+'.')+' +150 puntos.</p>'+
    (ambas?'<div class="preg"><h3>¡Encendiste los dos faros!</h3><p>Ya puedes ver tu certificado de expedición.</p></div>':'<div class="preg"><h3>Te falta la otra isla</h3><p>Completa también la '+(is==='F'?'Isla Respiración celular':'Isla Fotosíntesis')+' para obtener tu certificado.</p></div>')+
    '<div class="pie"><button class="btn claro" id="lMapa">Volver al mapa</button>'+(ambas?'<button class="btn terra" id="lCert">Ver mi certificado</button>':'')+'</div></div>');
  $('lMapa').onclick=function(){cerrarModal();irMapa();};if(ambas)$('lCert').onclick=function(){cerrarModal();verFinal();};}

/* ---------- FINAL ---------- */
function verFinal(){if(!(ST.faro.F&&ST.faro.R)&&!LIBRE){abrirModal(cabeza('n','Certificado','Todavía no')+'<div class="cuerpo"><p>Para obtener el certificado tienes que completar los niveles de las dos islas y encender los dos faros.</p><div class="pie"><button class="btn" id="nOk">Entendido</button></div></div>');$('nOk').onclick=cerrarModal;return;}
  mostrar('final');var p=ST.perfil,e=totalEst(),f=PJ[p.pj].g==='f';
  $('cNom').textContent=p.nom+' '+p.ape;$('cSec').textContent='Sección '+p.sec;$('cPts').textContent=totalPts();$('cEst').textContent=e;$('cPreg').textContent=totalCorrectas()+' de 16';
  $('cRango').textContent=e>=19?(f?'Exploradora experta':'Explorador experto'):e>=14?(f?'Exploradora avanzada':'Explorador avanzado'):(f?'Exploradora':'Explorador');
  var hn='';['F','R'].forEach(function(is){ORDEN[is].forEach(function(id){var pr=ST.prog[id];hn+='<div class="'+is.toLowerCase()+'">'+(is==='F'?'Fotosíntesis':'Respiración')+' '+id.charAt(1)+' · '+TXT[id].t+'<span>'+estrellasHTML(pr?pr.est:0)+'</span></div>';});hn+='<div class="'+is.toLowerCase()+'">Faro '+(is==='F'?'Fotosíntesis':'Respiración')+'<span>'+(ST.faro[is]?SVG.tilde:'')+'</span></div>';});$('cNiv').innerHTML=hn;
  var k=$('cvCert'),x=k.getContext('2d');x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,600,720);
  var g=x.createRadialGradient(300,380,40,300,380,300);g.addColorStop(0,'#FFF3D1');g.addColorStop(1,'rgba(255,243,209,0)');x.fillStyle=g;x.fillRect(0,0,600,720);
  dibujarMol(x,'glu',130,170,2.2,0.2);dibujarMol(x,'o2',480,140,2.4,0.5);dibujarMol(x,'co2',110,560,2.2,-0.3);dibujarMol(x,'h2o',490,560,2.4,0.3);
  x.fillStyle='#F3E9D8';x.beginPath();x.ellipse(300,660,150,22,0,0,7);x.fill();dibujarPJ(x,p.pj,300,660,6.6,1,0,'idle',{});}

/* ---------- CONTROLES TÁCTILES Y BOTONES ---------- */
function armarTactil(){Array.prototype.forEach.call(document.querySelectorAll('.tbtn'),function(b){var k=b.getAttribute('data-k');
  function on(e){e.preventDefault();if(k==='u'&&!K.u)jBuf=0.14;K[k]=1;b.className='tbtn act';}
  function off(e){if(e)e.preventDefault();K[k]=0;b.className='tbtn';}
  b.addEventListener('touchstart',on,{passive:false});b.addEventListener('touchend',off,{passive:false});b.addEventListener('touchcancel',off,{passive:false});
  b.addEventListener('mousedown',on);b.addEventListener('mouseup',off);b.addEventListener('mouseleave',function(){if(K[k])off();});});}
function pintarSonido(){[$('btnSonido1'),$('btnSonido2')].forEach(function(b){b.innerHTML=ST.sonido?SVG.son:SVG.sonNo;});}
function arranque(){cargar();cv=$('cv');c=cv.getContext('2d');ajustar();window.addEventListener('resize',function(){ajustar();});
  armarInicio();armarTactil();pintarSonido();
  [$('btnSonido1'),$('btnSonido2')].forEach(function(b){b.onclick=function(){ST.sonido=!ST.sonido;guardar();pintarSonido();sfx('clic');};});
  $('btnPausa').onclick=pausar;$('btnFinal').onclick=verFinal;$('btnVolverMapa').onclick=irMapa;
  requestAnimationFrame(animInicio);requestAnimationFrame(bucle);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',arranque);else arranque();
