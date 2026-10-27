/* ================== ESTADO Y GUARDADO ================== */
var CLAVE='expedicion-micro-v1';
var ST={perfil:null,prog:{},quiz:{},faro:{},pts:0,sonido:true};
var LIBRE=/[?&]libre\b/.test(location.search);
function guardar(){try{localStorage.setItem(CLAVE,JSON.stringify(ST));}catch(e){}}
function cargar(){try{var s=JSON.parse(localStorage.getItem(CLAVE)||'null');if(s&&s.perfil){ST=s;if(ST.sonido===undefined)ST.sonido=true;}}catch(e){}}
function totalPts(){var t=0,k;for(k in ST.prog)t+=ST.prog[k].pts||0;for(k in ST.quiz)t+=(ST.quiz[k]||0)*50;for(k in ST.faro)if(ST.faro[k])t+=150;return t;}
function totalEst(){var t=0;for(var k in ST.prog)t+=ST.prog[k].est||0;return t;}
function totalCorrectas(){var t=0;for(var k in ST.quiz)t+=ST.quiz[k]||0;for(var f in ST.faro)if(ST.faro[f])t+=1;return t;}

/* ================== SONIDO (sintetizado) ================== */
var AC=null;
function sfx(tipo){if(!ST.sonido)return;try{if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)();}catch(e){return;}
  var t=AC.currentTime;function tono(f1,f2,d,tp,v,dl){var o=AC.createOscillator(),g=AC.createGain();o.type=tp||'sine';o.frequency.setValueAtTime(f1,t+(dl||0));o.frequency.exponentialRampToValueAtTime(f2,t+(dl||0)+d);
    g.gain.setValueAtTime(0.0001,t+(dl||0));g.gain.exponentialRampToValueAtTime(v||0.18,t+(dl||0)+0.015);g.gain.exponentialRampToValueAtTime(0.0001,t+(dl||0)+d);o.connect(g);g.connect(AC.destination);o.start(t+(dl||0));o.stop(t+(dl||0)+d+0.05);}
  if(tipo==='salto')tono(320,620,0.16,'triangle',0.13);
  else if(tipo==='mol'){tono(880,1320,0.1,'sine',0.16);tono(1320,1760,0.12,'sine',0.12,0.07);}
  else if(tipo==='dano'){tono(300,90,0.35,'sawtooth',0.12);}
  else if(tipo==='ok'){tono(523,523,0.12,'triangle',0.16);tono(659,659,0.12,'triangle',0.16,0.1);tono(784,784,0.22,'triangle',0.16,0.2);}
  else if(tipo==='mal'){tono(260,180,0.25,'square',0.08);}
  else if(tipo==='nivel'){[523,659,784,1046].forEach(function(f,i){tono(f,f,0.2,'triangle',0.15,i*0.12);});}
  else if(tipo==='luz'){tono(600,1200,0.5,'sine',0.12);}
  else if(tipo==='clic')tono(700,700,0.05,'sine',0.08);}

/* ================== CANVAS Y ENTRADA ================== */
var cv,c,DPR=1,SC=1,VW=1280,VH=720,T=0;
function ajustar(){var w=window.innerWidth,h=window.innerHeight;DPR=Math.min(window.devicePixelRatio||1,2);
  SC=h/720;VW=w/SC;VH=720;if(VW<1000){SC=w/1000;VW=1000;VH=h/SC;}
  cv.width=Math.round(w*DPR);cv.height=Math.round(h*DPR);}
var K={l:0,r:0,u:0},jBuf=0;
function tecla(e,v){var k=e.key,m=null;
  if(k==='ArrowLeft'||k==='a'||k==='A')m='l';else if(k==='ArrowRight'||k==='d'||k==='D')m='r';else if(k==='ArrowUp'||k===' '||k==='w'||k==='W'||k==='Spacebar')m='u';
  if(!m)return;if($('juego').className.indexOf('on')<0||$('velo').className.indexOf('on')>=0)return;
  e.preventDefault();if(m==='u'&&v&&!K.u)jBuf=0.14;K[m]=v;}
window.addEventListener('keydown',function(e){if(e.key==='Escape'&&JG.L&&!JG.pausa&&$('velo').className.indexOf('on')<0){pausar();return;}tecla(e,1);});
window.addEventListener('keyup',function(e){tecla(e,0);});
window.addEventListener('blur',function(){K.l=K.r=K.u=0;});

/* ================== JUEGO ================== */
var GRAV=2350,JUMP=900,RUN=330;
var JG={L:null,P:null,cam:{x:0,y:0},pausa:false,acc:0,ult:0,toastT:0};

function nuevoJugador(x,y){return {x:x,y:y,w:30,h:74,vx:0,vy:0,face:1,suelo:null,coy:0,inv:0,est:'idle',hist:[],cola:[],aura:0};}

function iniciarNivel(id){
  var def=NIV[id](VW,VH);var L=def;L.id=id;L.t=0;L.cor=3;L.pts=0;L.fx=[];L.textos=[];L.fin=false;L.vistos={};
  L.plat.forEach(function(p){p.ox=p.x;p.oy=p.y;p.dx=0;p.dy=0;if(p.on===undefined)p.on=true;});
  L.items.forEach(function(it){it.got=false;it.ph=Math.random()*6;});
  L.cp={x:L.inicio.x,y:L.inicio.y};
  var P=nuevoJugador(L.inicio.x,L.inicio.y);P.cola=(L.cola0||[]).slice();
  JG.L=L;JG.P=P;JG.pausa=false;K.l=K.r=K.u=0;
  for(var i=0;i<400;i++)P.hist.push({x:P.x+15,y:P.y+40});
  camSeguir(1);
  $('hIsla').textContent=L.isla==='F'?'Isla Fotosíntesis':'Isla Respiración celular';
  $('hNivel').textContent=L.nombre;pintarCor();pintarEcu();pintarObj();$('hPts').textContent=totalPts();
  if(L.alIniciar)L.alIniciar(L);
}
function camSeguir(inst){var L=JG.L,P=JG.P,cm=JG.cam;
  var tx=P.x+15-VW*0.42+P.face*VW*0.06, ty=P.y+37-VH*0.56;
  if(L.W<=VW)tx=(L.W-VW)/2;else tx=clamp(tx,0,L.W-VW);
  if(L.H<=VH)ty=(L.H-VH)/2+60;else ty=clamp(ty,0,L.H-VH);
  if(inst){cm.x=tx;cm.y=ty;}else{cm.x=lerp(cm.x,tx,0.12);cm.y=lerp(cm.y,ty,0.14);}}

function choca(a,b){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;}
function danio(L,P,msg){if(P.inv>0||L.fin)return;L.cor--;P.inv=1.6;P.vy=-520;P.vx=-P.face*260;sfx('dano');pintarCor();
  if(msg)toast(msg,null,2.6);
  if(L.cor<=0){L.fin=true;setTimeout(function(){perdiste();},700);}}
function caer(L,P){if(L.fin)return;L.cor--;sfx('dano');pintarCor();
  if(L.cor<=0){L.fin=true;setTimeout(function(){perdiste();},400);return;}
  P.x=L.cp.x;P.y=L.cp.y;P.vx=P.vy=0;P.inv=1.6;toast(L.msgCaida||'¡Cuidado! Vuelves al último punto de control.',null,2.4);camSeguir(1);}

function paso(dt){var L=JG.L,P=JG.P;if(!L)return;L.t+=dt;T+=dt;
  // plataformas móviles
  L.plat.forEach(function(p){if(p.mv&&p.on!==false&&(!p.mv.cond||p.mv.cond(L))){p.mv.tt=(p.mv.tt||0)+dt;var ph=p.mv.tt*Math.PI*2/p.mv.per+(p.mv.ph||0);
      var nx=p.ox+Math.sin(ph)*(p.mv.ax||0), ny=p.oy+Math.sin(ph)*(p.mv.ay||0);p.dx=nx-p.x;p.dy=ny-p.y;p.x=nx;p.y=ny;}else{p.dx=0;p.dy=0;}});
  if(L.update)L.update(L,dt,P);
  if(!L.fin||L.cor>0){
  if(P.suelo&&P.suelo.on!==false){P.x+=P.suelo.dx;P.y+=P.suelo.dy;}
  var ax=(K.r?1:0)-(K.l?1:0);if(L.bloqueo)ax=0;
  P.vx+=(ax*RUN-P.vx)*Math.min(1,dt*(P.suelo?16:8));if(ax)P.face=ax;
  P.coy=P.suelo?0.1:P.coy-dt;jBuf-=dt;
  if(jBuf>0&&P.coy>0&&!L.bloqueo){P.vy=-JUMP;jBuf=0;P.coy=0;P.suelo=null;sfx('salto');}
  var g=GRAV;if(!K.u&&P.vy<0)g*=2.1;
  P.vy+=g*dt;
  // corrientes
  if(L.zonas)L.zonas.forEach(function(z){if(choca(P,z)){P.vy-=z.f*dt;if(P.vy<-z.max)P.vy=-z.max;}});
  if(P.vy>1150)P.vy=1150;
  // mover X
  P.x+=P.vx*dt;
  L.plat.forEach(function(p){if(p.on===false||p.t!=='solid')return;if(choca(P,p)){if(P.vx>0||p.dx<0&&P.x<p.x)P.x=p.x-P.w;else P.x=p.x+p.w;P.vx=0;}});
  P.x=clamp(P.x,L.minX!==undefined?L.minX:0,(L.maxX!==undefined?L.maxX:L.W)-P.w);
  // mover Y
  var yAnt=P.y+P.h;P.y+=P.vy*dt;P.suelo=null;
  L.plat.forEach(function(p){if(p.on===false)return;if(!choca(P,p))return;
    if(p.t==='solid'){if(P.vy>=0&&yAnt<=p.y+12+Math.max(0,p.dy)){P.y=p.y-P.h;P.vy=0;P.suelo=p;}else if(P.vy<0){P.y=p.y+p.h;P.vy=0;}}
    else if(p.t==='one'){if(P.vy>=0&&yAnt<=p.y+8+Math.max(0,p.dy)){P.y=p.y-P.h;P.vy=0;P.suelo=p;}}});
  if(P.y<(L.techo||-400)){P.y=L.techo||-400;if(P.vy<0)P.vy=0;}
  // estado de animación
  P.est=P.suelo?(Math.abs(P.vx)>30?'run':'idle'):(P.vy<0?'jump':'fall');
  if(P.inv>0)P.inv-=dt;
  P.hist.unshift({x:P.x+15-P.face*6,y:P.y+40});if(P.hist.length>420)P.hist.pop();
  // moléculas
  L.items.forEach(function(it){if(it.got||it.oculto)return;var dx=it.x-(P.x+15),dy=it.y-(P.y+37);if(Math.abs(dx)<34&&Math.abs(dy)<48){it.got=true;tomar(L,P,it);}});
  // peligros
  if(L.peligros)L.peligros.forEach(function(h){if(h.update)h.update(h,dt,L);if(h.caja&&choca(P,h.caja(h))){
      if(h.pisable&&P.vy>0&&P.y+P.h<h.caja(h).y+18){P.vy=-640;sfx('salto');}else danio(L,P,h.msg);}});
  // caída
  if(P.y>L.H+120)caer(L,P);
  // puntos de control
  if(L.cps)L.cps.forEach(function(q){if(!q.ok&&(L.vertical?P.y<q.y:P.x>q.x)){q.ok=true;L.cp={x:q.x,y:q.y-80};toast('Punto de control guardado.',null,1.6);}});
  // meta
  if(L.meta&&!L.fin&&choca(P,L.meta)){var r=L.metaOK(L);if(r===true){L.fin=true;L.bloqueo=true;if(L.alLlegar)L.alLlegar(L,P);else completar();}
    else if(r&&(!L.avisoT||L.t-L.avisoT>3)){L.avisoT=L.t;toast(r,null,2.6);}}
  }
  // efectos
  L.fx=L.fx.filter(function(f){f.t+=dt;if(f.vx!==undefined){f.x+=f.vx*dt;f.y+=f.vy*dt;}return f.t<f.d;});
  L.textos=L.textos.filter(function(f){f.t+=dt;f.y-=40*dt;return f.t<1.1;});
  if(JG.toastT>0){JG.toastT-=dt;if(JG.toastT<=0)$('toast').className='toast';}
  camSeguir();}

function tomar(L,P,it){sfx('mol');L.pts+=10;$('hPts').textContent=totalPts()+L.pts;
  L.textos.push({x:it.x,y:it.y-30,t:0,s:'+10'});
  for(var i=0;i<10;i++)L.fx.push({x:it.x,y:it.y,vx:Math.cos(i*0.63)*160,vy:Math.sin(i*0.63)*160,t:0,d:0.45,tp:'chispa'});
  if(it.tp!=='luz')P.cola.push(it.tp);
  if(L.eq&&L.eq[it.tp]!==undefined)L.eq[it.tp]++;
  if(L.alTomar)L.alTomar(L,it);
  if(!L.vistos[it.tp]&&L.datos&&L.datos[it.tp]){L.vistos[it.tp]=1;toast(L.datos[it.tp],iconoMol(it.tp),4.2);}
  pintarEcu();pintarObj();}

/* ================== DIBUJO ================== */
function dibujar(){var L=JG.L,P=JG.P,cm=JG.cam;if(!L)return;
  c.setTransform(SC*DPR,0,0,SC*DPR,0,0);c.clearRect(0,0,VW,VH);
  L.fondo(c,L,cm);
  c.save();c.translate(-Math.round(cm.x),-Math.round(cm.y));
  if(L.zonas)L.zonas.forEach(function(z){if(z.dibujar)z.dibujar(c,z,L);});
  if(L.detras)L.detras(c,L);
  L.plat.forEach(function(p){if(p.on===false&&!p.fantasma)return;if(p.x+p.w<cm.x-60||p.x>cm.x+VW+60||p.y>cm.y+VH+200||p.y+p.h<cm.y-200)return;(ESTILO[p.st]||ESTILO.base)(c,p,L);});
  if(L.meta&&L.dibMeta)L.dibMeta(c,L);
  if(L.cps)L.cps.forEach(function(q){bandera(c,q.x,q.y,q.ok);});
  L.items.forEach(function(it){if(it.got||it.oculto)return;var by=Math.sin(L.t*2.4+it.ph)*5;
    c.save();c.globalAlpha=0.35;var g=c.createRadialGradient(it.x,it.y+by,2,it.x,it.y+by,34);g.addColorStop(0,'#fff');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.beginPath();c.arc(it.x,it.y+by,34,0,7);c.fill();c.restore();
    dibujarMol(c,it.tp,it.x,it.y+by,it.tp==='glu'?1.25:1.35,Math.sin(L.t+it.ph)*0.25);
    formula(c,MOL[it.tp].f,it.x,it.y+by+(it.tp==='glu'?44:30),15,'#22313B');});
  if(L.peligros)L.peligros.forEach(function(h){h.dibujar(c,h,L);});
  // cola de moléculas que acompaña al personaje
  var n=P.cola.length;for(var i=n-1;i>=0;i--){var hh=P.hist[Math.min(P.hist.length-1,10+i*11)];var tp=P.cola[i];
    dibujarMol(c,tp,hh.x,hh.y+Math.sin(L.t*3+i)*3-10,tp==='glu'?0.8:0.78,Math.sin(L.t*2+i)*0.4);}
  if(P.aura>0){var ga=c.createRadialGradient(P.x+15,P.y+40,10,P.x+15,P.y+40,70);ga.addColorStop(0,'rgba(255,220,90,'+(0.5*P.aura)+')');ga.addColorStop(1,'rgba(255,200,60,0)');c.fillStyle=ga;c.beginPath();c.arc(P.x+15,P.y+40,70,0,7);c.fill();
    for(var e=0;e<5;e++){var an=L.t*2+e*1.26;chispa(c,P.x+15+Math.cos(an)*36,P.y+40+Math.sin(an)*44,P.aura);}}
  if(!(P.inv>0&&Math.floor(P.inv*12)%2===0))dibujarPJ(c,ST.perfil.pj,P.x+15,P.y+P.h,1,P.face,L.t,P.est,{vx:P.vx,dolor:P.inv>1.1});
  if(L.encima)L.encima(c,L);
  L.fx.forEach(function(f){var k=1-f.t/f.d;if(f.tp==='chispa'){c.fillStyle='rgba(255,214,80,'+k+')';c.beginPath();c.arc(f.x,f.y,4*k+1,0,7);c.fill();}
    else if(f.dib)f.dib(c,f,k);});
  L.textos.forEach(function(f){c.save();c.globalAlpha=1-f.t/1.1;c.font='700 24px Fredoka, sans-serif';c.textAlign='center';c.lineWidth=5;c.strokeStyle='#fff';c.strokeText(f.s,f.x,f.y);c.fillStyle='#1F6B44';c.fillText(f.s,f.x,f.y);c.restore();});
  c.restore();
  if(L.frente)L.frente(c,L,cm);}
function chispa(c,x,y,k){c.save();c.translate(x,y);c.fillStyle='rgba(255,196,40,'+(0.9*k)+')';c.beginPath();for(var i=0;i<8;i++){var r=i%2?2.2:7;var a=i*Math.PI/4;c.lineTo(Math.cos(a)*r,Math.sin(a)*r);}c.fill();c.restore();}
function bandera(c,x,y,ok){c.save();c.strokeStyle='#5B4A3A';c.lineWidth=3;c.beginPath();c.moveTo(x,y);c.lineTo(x,y-56);c.stroke();
  c.fillStyle=ok?'#2E9E5B':'#D8CCB8';c.beginPath();c.moveTo(x,y-56);c.quadraticCurveTo(x+20,y-58,x+30,y-49);c.quadraticCurveTo(x+18,y-44,x,y-40);c.fill();
  if(ok){c.strokeStyle='#fff';c.lineWidth=2.4;c.beginPath();c.moveTo(x+7,y-49);c.lineTo(x+11,y-45);c.lineTo(x+18,y-52);c.stroke();}c.restore();}

function bucle(ts){requestAnimationFrame(bucle);
  if($('juego').className.indexOf('on')<0||!JG.L)return;
  var dt=Math.min(0.05,(ts-(JG.ult||ts))/1000);JG.ult=ts;
  if(!JG.pausa&&$('velo').className.indexOf('on')<0){JG.acc+=dt;var n=0;while(JG.acc>=1/120&&n<8){paso(1/120);JG.acc-=1/120;n++;}}else JG.acc=0;
  dibujar();}

/* ================== HUD ================== */
function pintarCor(){var h='';for(var i=0;i<3;i++)h+=i<JG.L.cor?SVG.cor:SVG.corV;$('hCor').innerHTML=h;}
function pintarObj(){var L=JG.L;$('hObj').innerHTML='<small>Objetivo</small>'+L.objetivo(L);}
function sub(f){return f.replace(/(\d+)/g,'<sub>$1</sub>');}
function terminoEcu(tp,n,max,coef){var ok=n>=max;return '<div class="t'+(ok?' ok':'')+'"><img src="'+iconoMol(tp)+'" alt=""><span class="n">'+n+'/'+max+'</span><span class="nm">'+MOL[tp].nom+'<i>'+(coef?coef+' ':'')+sub(MOL[tp].f)+'</i></span></div>';}
function pintarEcu(){var L=JG.L,e=L.eq,h='';if(!e){$('ecu').style.display='none';return;}$('ecu').style.display='flex';
  if(L.isla==='F'){h=terminoEcu('h2o',e.h2o,6,6)+'<span class="mas">+</span>'+terminoEcu('co2',e.co2,6,6)+
    '<span class="fl"><span>luz</span>'+SVG.flecha+'<span>clorofila</span></span>'+terminoEcu('glu',e.glu,1,'')+'<span class="mas">+</span>'+terminoEcu('o2',e.o2,6,6);}
  else{h=terminoEcu('glu',e.glu,1,'')+'<span class="mas">+</span>'+terminoEcu('o2',e.o2,6,6)+'<span class="fl"><span>en la célula</span>'+SVG.flecha+'<span>(mitocondria)</span></span>'+
    terminoEcu('co2',e.co2,6,6)+'<span class="mas">+</span>'+terminoEcu('h2o',e.h2o,6,6)+'<span class="mas">+</span><div class="t energia'+(e.en?' ok':'')+'"><img src="'+icoEnergia()+'" alt=""><span class="nm">energía<i>se libera</i></span></div>';}
  $('ecu').innerHTML=h;}
function toast(txt,img,d){var el=$('toast');el.innerHTML=(img?'<img src="'+img+'" alt="">':'')+'<span>'+txt+'</span>';el.className='toast on';JG.toastT=d||3;}

/* ================== ESTILOS DE PLATAFORMAS ================== */
var ESTILO={base:function(c,p){c.fillStyle='#8B6B4A';rr(c,p.x,p.y,p.w,p.h,8);c.fill();}};
