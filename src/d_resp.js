/* ================== NIVELES: ISLA RESPIRACIÓN CELULAR ================== */
ESTILO.filamento=function(c,p){var h=Math.min(p.h,46);var g=c.createLinearGradient(0,p.y,0,p.y+h);g.addColorStop(0,'#F7B9A0');g.addColorStop(1,'#D9826A');c.fillStyle=g;rr(c,p.x,p.y,p.w,h,14);c.fill();
  c.strokeStyle='rgba(160,70,50,.45)';c.lineWidth=2;for(var x=p.x+10;x<p.x+p.w-6;x+=14){c.beginPath();c.moveTo(x,p.y+4);c.lineTo(x+8,p.y+h-4);c.stroke();}
  c.strokeStyle='#B4492A';c.lineWidth=2;rr(c,p.x,p.y,p.w,h,14);c.stroke();};
ESTILO.vesicula=function(c,p){var cx=p.x+p.w/2,cy=p.y+p.h/2+8;var g=c.createRadialGradient(cx-p.w*0.2,cy-8,4,cx,cy,p.w*0.6);g.addColorStop(0,'#FFFFFF');g.addColorStop(1,'#F5D6B8');
  c.fillStyle=g;c.beginPath();c.ellipse(cx,cy,p.w/2,p.h/2+12,0,0,7);c.fill();c.strokeStyle='#D98B5F';c.lineWidth=5;c.stroke();c.strokeStyle='#F2B48A';c.lineWidth=2;c.beginPath();c.ellipse(cx,cy,p.w/2-6,p.h/2+6,0,0,7);c.stroke();};
ESTILO.memMito=function(c,p){c.fillStyle='#F6C7A0';c.fillRect(p.x,p.y,p.w,p.h);c.strokeStyle='#C25A32';c.lineWidth=4;c.beginPath();c.moveTo(p.x,p.y+3);c.lineTo(p.x+p.w,p.y+3);c.moveTo(p.x,p.y+18);c.lineTo(p.x+p.w,p.y+18);c.stroke();};
ESTILO.cresta=function(c,p){var g=c.createLinearGradient(p.x,0,p.x+p.w,0);g.addColorStop(0,'#E98A56');g.addColorStop(0.5,'#F6B07A');g.addColorStop(1,'#E98A56');c.fillStyle=g;rr(c,p.x,p.y,p.w,p.h,Math.min(30,p.w/2));c.fill();
  c.strokeStyle='#B4492A';c.lineWidth=4;rr(c,p.x,p.y,p.w,p.h,Math.min(30,p.w/2));c.stroke();c.strokeStyle='rgba(180,73,42,.5)';c.lineWidth=2;rr(c,p.x+9,p.y+9,p.w-18,p.h-18,Math.min(22,p.w/2-9));c.stroke();
  c.fillStyle='rgba(255,255,255,.55)';for(var y=p.y+18;y<p.y+p.h-12;y+=22){c.beginPath();c.arc(p.x+p.w/2,y,3,0,7);c.fill();}};
ESTILO.compuerta=function(c,p){c.fillStyle='#8FC9D6';rr(c,p.x,p.y,p.w,p.h,16);c.fill();c.strokeStyle='#1D6B85';c.lineWidth=4;c.stroke();
  for(var y=p.y+20;y<p.y+p.h-10;y+=34){c.fillStyle='#5AAFC2';rr(c,p.x+10,y,p.w-20,22,10);c.fill();}};
ESTILO.motor=function(c,p,L){ESTILO.filamento(c,p);var on=L&&L.usos&&L.usos.mov;c.fillStyle=on?'#FFC43D':'#C9BBA6';for(var i=0;i<2;i++){c.beginPath();c.arc(p.x+30+i*(p.w-60),p.y+p.h+10,11,0,7);c.fill();}};
ESTILO.puente=function(c,p){if(p.on===false){c.save();c.setLineDash([10,8]);c.strokeStyle='rgba(180,73,42,.6)';c.lineWidth=3;rr(c,p.x,p.y,p.w,p.h,12);c.stroke();c.restore();return;}ESTILO.filamento(c,p);};

function animReac(L,P,cx,cy,ent,sal,cb){
  ent.forEach(function(tp,i){var h=P.hist[Math.min(P.hist.length-1,10+i*11)];L.fx.push({x0:h.x,y0:h.y,m:tp,t:0,d:1.4,
    dib:function(c,f){var u=Math.min(1,f.t/1.2),e=u*u*(3-2*u);dibujarMol(c,f.m,lerp(f.x0,cx,e),lerp(f.y0,cy,e)-Math.sin(e*3.14)*70,0.9*(1-e*0.4),f.t*3);}});});
  setTimeout(function(){sfx('luz');for(var i=0;i<sal.length;i++)L.fx.push({i:i,m:sal[i],t:0,d:2.4,
      dib:function(c,f){var a=f.i/sal.length*6.28,u=Math.min(1,f.t/0.9);var r=30+u*70;dibujarMol(c,f.m,cx+Math.cos(a)*r,cy+Math.sin(a)*r*0.6-u*20,1.0,f.t);if(f.t>0.4&&MOL[f.m].f)formula(c,MOL[f.m].f,cx+Math.cos(a)*r,cy+Math.sin(a)*r*0.6-u*20+26,13);}});
    L.fx.push({t:0,d:1.6,dib:function(c,f){var k=1-f.t/1.6;var g=c.createRadialGradient(cx,cy,5,cx,cy,140);g.addColorStop(0,'rgba(255,214,80,'+(0.8*k)+')');g.addColorStop(1,'rgba(255,214,80,0)');c.fillStyle=g;c.beginPath();c.arc(cx,cy,140,0,7);c.fill();}});
    if(cb)cb();},1300);}
function quitarCola(P,tp,n){for(var i=0;i<n;i++){var j=P.cola.indexOf(tp);if(j>=0)P.cola.splice(j,1);}}
function fondoCito(c,L,cm,VW,VH,seed){var g=c.createLinearGradient(0,0,0,VH);g.addColorStop(0,'#FFF1E4');g.addColorStop(1,'#FBDCC4');c.fillStyle=g;c.fillRect(0,0,VW,VH);
  var r=rnd(seed);for(var i=0;i<22;i++){var x=((r()*3000-cm.x*0.3)%3000+3000)%3000-200,y=120+r()*480,w=120+r()*120;c.strokeStyle='rgba(226,150,110,.35)';c.lineWidth=10;c.lineCap='round';c.beginPath();c.moveTo(x,y);c.bezierCurveTo(x+w*0.3,y-30,x+w*0.7,y+30,x+w,y);c.stroke();}
  for(i=0;i<70;i++){x=((r()*2400-cm.x*0.5)%2400+2400)%2400-100;y=80+r()*600;c.fillStyle='rgba(190,110,90,.3)';c.beginPath();c.arc(x,y,3+r()*3,0,7);c.fill();}}
function membranaCel(c,x0,x1,y){var w=x1-x0;c.fillStyle='#FDE8D6';c.fillRect(x0,y,w,56);for(var x=Math.floor(x0/14)*14;x<x1;x+=14){c.fillStyle='#E9967A';c.beginPath();c.arc(x,y+6,6,0,7);c.fill();c.beginPath();c.arc(x,y+50,6,0,7);c.fill();
    c.strokeStyle='#F0B79C';c.lineWidth=2;c.beginPath();c.moveTo(x-2,y+12);c.lineTo(x-2,y+26);c.moveTo(x+2,y+12);c.lineTo(x+2,y+26);c.moveTo(x-2,y+30);c.lineTo(x-2,y+44);c.moveTo(x+2,y+30);c.lineTo(x+2,y+44);c.stroke();}}
function puesto(c,x,y,w,txt,ok,ico,L){c.save();var g=c.createRadialGradient(x+w/2,y,4,x+w/2,y,w*0.8);g.addColorStop(0,ok?'rgba(46,158,91,.35)':'rgba(255,196,61,.45)');g.addColorStop(1,'rgba(255,196,61,0)');c.fillStyle=g;c.fillRect(x-w*0.3,y-w*0.8,w*1.6,w*0.8);
  c.fillStyle=ok?'#2E9E5B':'#FFC43D';rr(c,x,y-10,w,14,7);c.fill();c.strokeStyle='#fff';c.lineWidth=2;c.setLineDash([6,6]);c.lineDashOffset=-(L?L.t*20:0);rr(c,x+4,y-7,w-8,8,4);c.stroke();c.restore();
  etiqueta(c,txt,x+w/2,y-170,14);}

/* ---------- R1: citoplasma ---------- */
NIV.R1=function(VW,VH){
  var plat=[[0,600,620],[720,560,300],[1110,600,500],[1720,520,260],[2090,600,620],[2820,560,300],[3220,600,1100]].map(function(a){return P_(a[0],a[1],a[2],46,'solid','filamento');});
  [[600,470,120,{ax:70,per:4}],[1000,390,110],[1520,440,130,{ay:60,per:3.5}],[2620,440,120,{ax:80,per:4.5}],[2420,360,110]].forEach(function(a){plat.push(P_(a[0],a[1],a[2],30,'one','vesicula',a[3]));});
  var div={x:3330,w:200};
  var lisos=[patrullero(1150,1560,560,110,dibLisosoma,'¡Un lisosoma! Contiene sustancias que digieren material celular. No lo toques.'),
    patrullero(2150,2660,560,120,dibLisosoma,'¡Un lisosoma! Contiene sustancias que digieren material celular. No lo toques.'),
    patrullero(3560,3880,560,130,dibLisosoma,'¡Un lisosoma! Contiene sustancias que digieren material celular. No lo toques.')];
  return {isla:'R',nombre:'1 · El citoplasma: llegan la glucosa y el oxígeno',W:4300,H:720,techo:70,plat:plat,peligros:lisos,
    items:[{x:1850,y:445,tp:'glu'}].concat([[300,520],[830,480],[1060,320],[2300,510],[2480,290],[3000,480]].map(function(a){return {x:a[0],y:a[1],tp:'o2'};})),
    cps:[{x:1130,y:600},{x:2110,y:600},{x:3240,y:600}],inicio:{x:300,y:520},meta:{x:3980,y:400,w:150,h:200},
    eq:{glu:0,o2:0,co2:0,h2o:0,en:false},cola0:[],
    datos:{glu:'Glucosa (C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>): un azúcar, materia orgánica rica en energía. Llega a la célula desde los alimentos o, en las plantas, desde la fotosíntesis.',
      o2:'Oxígeno (O<sub>2</sub>): entra a la célula atravesando la membrana.'},
    objetivo:function(L){return L.dividido?'Entra a la mitocondria con los fragmentos de glucosa y el oxígeno (O<sub>2</sub> '+Math.min(6,L.eq.o2)+'/6)':'Junta 1 glucosa y 6 moléculas de oxígeno; luego pasa por la zona de división ('+L.eq.glu+'/1 · '+Math.min(6,L.eq.o2)+'/6)';},
    metaOK:function(L){if(L.eq.glu<1)return 'Te falta la glucosa.';if(!L.dividido)return 'Primero la glucosa tiene que dividirse en el citoplasma (zona amarilla).';var f=6-L.eq.o2;return f<=0?true:'Te faltan '+f+' moléculas de oxígeno.';},
    update:function(L,dt,P){if(!L.dividido&&L.eq.glu>=1&&P.x+15>div.x&&P.x<div.x+div.w&&P.suelo){L.dividido=true;
        animReac(L,P,div.x+div.w/2,450,['glu'],['frag','frag'],function(){quitarCola(P,'glu',1);P.cola.unshift('frag','frag');pintarObj();
          toast('En el citoplasma, la glucosa se divide en dos fragmentos más pequeños y se libera un poco de energía.',iconoMol('frag'),4.2);});quitarCola(P,'glu',1);}},
    fondo:function(c,L,cm){fondoCito(c,L,cm,VW,VH,31);},
    detras:function(c,L){var cm=JG.cam;membranaCel(c,cm.x-30,cm.x+VW+30,0);etiqueta(c,'membrana celular',cm.x+VW*0.16,74,13);
      for(var x=400;x<3400;x+=900){var o=(L.t*40+x)%60;c.save();c.globalAlpha=0.85;dibujarMol(c,'o2',x,10+o,0.8,0.4);c.restore();}
      etiqueta(c,'el oxígeno atraviesa la membrana',1300,110,13);etiqueta(c,'citoesqueleto',300,665,13);etiqueta(c,'vesícula',660,420,12);
      for(var ch=800;ch<4000;ch+=800){c.fillStyle='#F0A97C';rr(c,ch,2,30,52,8);c.fill();}
      c.save();c.globalAlpha=0.85;var ng=c.createRadialGradient(1500,140,10,1500,140,90);ng.addColorStop(0,'#F6E2EE');ng.addColorStop(1,'#E4AFCB');
      c.fillStyle=ng;c.beginPath();c.ellipse(1500,140,88,72,0.1,0,7);c.fill();c.strokeStyle='#C883A9';c.lineWidth=5;c.setLineDash([8,7]);c.stroke();c.setLineDash([]);
      c.fillStyle='#C883A9';c.beginPath();c.arc(1510,140,20,0,7);c.fill();c.restore();etiqueta(c,'núcleo',1500,80,13);
      puesto(c,div.x,600,div.w,'zona de división de la glucosa',L.dividido,null,L);
      var mx=4150;c.save();c.translate(mx,420);c.fillStyle='#F6C7A0';c.beginPath();c.ellipse(0,0,240,170,0,0,7);c.fill();c.strokeStyle='#C25A32';c.lineWidth=6;c.stroke();
      c.fillStyle='#FCE3CF';c.beginPath();c.ellipse(0,0,212,142,0,0,7);c.fill();c.strokeStyle='#E98A56';c.lineWidth=10;for(var i=-3;i<=3;i++){c.beginPath();c.moveTo(i*55,i%2?-142:142);c.lineTo(i*55,i%2?-40:40);c.stroke();}c.restore();
      etiqueta(c,'mitocondria: entrar',mx-90,230,15);}
  };};

/* ---------- R2: mitocondria ---------- */
NIV.R2=function(VW,VH){
  var W=3900,plat=[P_(-50,640,W+100,140,'solid','memMito')];
  [[450,500,80,140],[1050,510,80,130],[2280,500,80,140],[2620,510,80,130],[3300,500,80,140]].forEach(function(a){plat.push(P_(a[0],a[1],a[2],a[3],'solid','cresta'));});
  [[700,60,80,250],[1250,60,80,230],[2450,60,80,250],[3500,60,80,230]].forEach(function(a){plat.push(P_(a[0],a[1],a[2],a[3],'solid','cresta'));});
  plat.push(P_(1880,230,100,410,'solid','cresta'));
  var asc=P_(1720,420,140,24,'one','vesicula',{ay:-170,per:4,ph:-Math.PI/2,cond:function(L){return L.est>=1;}});plat.push(asc);
  [[820,430,130,{ax:60,per:3.5}],[2050,470,140],[2900,430,140,{ay:50,per:3}]].forEach(function(a){plat.push(P_(a[0],a[1],a[2],26,'one','vesicula',a[3]));});
  var ests=[{x:1400,w:170,hecho:false},{x:3000,w:170,hecho:false}];
  var chispas=[700,1650,2250,3250].map(function(x,i){return {x:x,y:600,on:0,ph:i*1.1,
    caja:function(h){return h.on>0.35?{x:h.x-14,y:h.y-16,w:28,h:32}:{x:0,y:-9999,w:1,h:1};},
    update:function(h,dt,L){var ph=(L.t+h.ph)%4.2;h.on=ph<1.2?Math.min(1,(1.2-ph)*3):Math.max(0,h.on-dt*4);},
    dibujar:function(c,h,L){if(h.on>0){var k=Math.min(1,h.on);c.save();c.globalAlpha=k;
        var g=c.createRadialGradient(h.x,h.y,2,h.x,h.y,30);g.addColorStop(0,'rgba(255,220,120,.95)');g.addColorStop(0.6,'rgba(255,140,60,.7)');g.addColorStop(1,'rgba(255,120,50,0)');
        c.fillStyle=g;c.beginPath();c.arc(h.x,h.y,30,0,7);c.fill();
        for(var i=0;i<7;i++){var a=-Math.PI/2+(i-3)*0.28;c.strokeStyle='rgba(255,200,80,'+k+')';c.lineWidth=3;c.beginPath();c.moveTo(h.x,h.y);c.lineTo(h.x+Math.cos(a)*22,h.y+Math.sin(a)*26);c.stroke();}
        c.restore();}
      else{c.strokeStyle='rgba(255,160,90,.45)';c.lineWidth=2;for(var i=0;i<3;i++){c.beginPath();c.moveTo(h.x-8+i*8,h.y+8);c.quadraticCurveTo(h.x-4+i*8,h.y-6,h.x-8+i*8,h.y-14);c.stroke();}}
      etiqueta(c,'calor liberado',h.x,h.y-38,11);},
    msg:'¡Calor liberado! Parte de la energía de la reacción se libera como calor.'};});
  return {isla:'R',nombre:'2 · La mitocondria: se libera la energía',W:W,H:720,techo:70,plat:plat,peligros:chispas,items:[],est:0,
    cps:[{x:1300,y:640},{x:2040,y:640},{x:2850,y:640}],inicio:{x:300,y:560},meta:{x:3640,y:420,w:200,h:220},
    eq:{glu:1,o2:6,co2:0,h2o:0,en:false},cola0:['frag','frag','o2','o2','o2','o2','o2','o2'],
    objetivo:function(L){return L.est<2?'Lleva cada fragmento de glucosa con 3 moléculas de oxígeno a un puesto de reacción ('+L.est+'/2)':'Sal de la mitocondria con la energía liberada';},
    metaOK:function(L){return L.est>=2?true:'Todavía falta reaccionar '+(2-L.est)+' fragmento'+(L.est===1?'':'s')+' de glucosa.';},
    update:function(L,dt,P){P.aura=lerp(P.aura,L.est/2,dt*3);ests.forEach(function(e){if(e.hecho||!P.suelo||P.x+15<e.x||P.x+15>e.x+e.w)return;
        if(P.cola.indexOf('frag')<0||P.cola.filter(function(t){return t==='o2';}).length<3)return;e.hecho=true;
        quitarCola(P,'frag',1);quitarCola(P,'o2',3);
        animReac(L,P,e.x+e.w/2,470,['frag','o2','o2','o2'],['co2','co2','co2','h2o','h2o','h2o'],function(){L.est++;L.eq.co2+=3;L.eq.h2o+=3;if(L.est>=2)L.eq.en=true;
          P.cola.push('co2','co2','co2','h2o','h2o','h2o');L.pts+=40;L.textos.push({x:e.x+e.w/2,y:420,t:0,s:'+40'});pintarEcu();pintarObj();
          toast(L.est===1?'El fragmento reaccionó con el oxígeno: se formaron dióxido de carbono y agua, y se liberó energía. ¡Con esa energía se mueve el ascensor!':'¡Segundo fragmento! La energía liberada queda disponible para que la célula la use.',icoEnergia(),4.5);});});},
    fondo:function(c,L,cm){var g=c.createLinearGradient(0,0,0,VH);g.addColorStop(0,'#FFEBDC');g.addColorStop(1,'#FCD6BC');c.fillStyle=g;c.fillRect(0,0,VW,VH);
      var r=rnd(4);for(var i=0;i<50;i++){var x=((r()*2600-cm.x*0.4)%2600+2600)%2600-100,y=90+r()*520;c.fillStyle='rgba(210,120,80,.22)';c.beginPath();c.arc(x,y,4+r()*6,0,7);c.fill();}},
    detras:function(c,L){var cm=JG.cam;c.fillStyle='#F6C7A0';c.fillRect(cm.x-40,0,VW+80,66);c.strokeStyle='#C25A32';c.lineWidth=4;c.beginPath();c.moveTo(cm.x-40,46);c.lineTo(cm.x+VW+40,46);c.moveTo(cm.x-40,62);c.lineTo(cm.x+VW+40,62);c.stroke();
      etiqueta(c,'membranas de la mitocondria',cm.x+VW*0.2,26,13);etiqueta(c,'crestas',490,470,13);etiqueta(c,'matriz',cm.x+VW*0.55,120,14);
      ests.forEach(function(e,i){puesto(c,e.x,640,e.w,'puesto de reacción '+(i+1),e.hecho,null,L);});
      etiqueta(c,L.est>=1?'ascensor: funciona con energía':'ascensor: sin energía',1790,L.est>=1?200:380,13);
      c.save();var g2=c.createRadialGradient(3745,530,10,3745,530,110);g2.addColorStop(0,'rgba(255,255,255,.95)');g2.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g2;c.beginPath();c.ellipse(3745,530,80,110,0,0,7);c.fill();c.restore();
      c.save();c.setLineDash([10,8]);c.lineDashOffset=-L.t*24;c.strokeStyle='#B4492A';c.lineWidth=5;c.beginPath();c.ellipse(3745,530,80,110,0,0,7);c.stroke();c.restore();
      etiqueta(c,'salida al citoplasma',3745,396,15);}
  };};

/* ---------- R3: la célula usa la energía ---------- */
NIV.R3=function(VW,VH){
  var W=3500,plat=[[0,600,1700],[2400,600,380],[3200,600,400]].map(function(a){return P_(a[0],a[1],a[2],46,'solid','filamento');});
  var puerta=P_(940,290,64,312,'solid','compuerta');plat.push(puerta);
  var mot=P_(1980,560,150,26,'one','motor',{ax:260,per:6,ph:-Math.PI/2,cond:function(L){return L.usos.mov;}});plat.push(mot);
  var puente=P_(2780,600,420,40,'solid','puente');puente.on=false;puente.fantasma=true;plat.push(puente);
  plat.push(P_(420,470,130,30,'one','vesicula'),P_(1320,450,130,30,'one','vesicula',{ax:70,per:4}),P_(2550,430,130,30,'one','vesicula'));
  var ests=[{k:'tra',x:640,w:180,txt:'transportar sustancias: abrir la compuerta'},{k:'mov',x:1440,w:180,txt:'moverse: encender la proteína motora'},{k:'fab',x:2500,w:180,txt:'fabricar: construir un puente de proteínas'}];
  var vels=[patrullero(150,1860,560,170,dibVesiculaMov,'¡Una vesícula que transporta sustancias a toda velocidad por el citoesqueleto! Sáltala.'),
    patrullero(2350,3150,560,150,dibVesiculaMov,'¡Una vesícula que transporta sustancias a toda velocidad por el citoesqueleto! Sáltala.')];
  return {isla:'R',nombre:'3 · La célula usa la energía',W:W,H:720,techo:70,plat:plat,peligros:vels,items:[],usos:{},energia:3,
    cps:[{x:1030,y:600},{x:2420,y:600}],inicio:{x:300,y:520},meta:{x:3330,y:380,w:170,h:220},
    msgCaida:'¡Caíste! Vuelves al último punto de control.',
    eq:{glu:1,o2:6,co2:6,h2o:6,en:true},cola0:['co2','co2','co2','co2','co2','co2','h2o','h2o','h2o','h2o','h2o','h2o'],
    alIniciar:function(L){JG.P.aura=1;},
    objetivo:function(L){var n=Object.keys(L.usos).length;return n<3?'Usa la energía en los 3 puestos de trabajo de la célula ('+n+'/3)':'Lleva el dióxido de carbono y el agua hasta la membrana';},
    metaOK:function(L){return Object.keys(L.usos).length>=3?true:'Primero usa la energía en los 3 puestos.';},
    update:function(L,dt,P){P.aura=lerp(P.aura,L.energia/3,dt*3);ests.forEach(function(e){if(L.usos[e.k]||!P.suelo||P.x+15<e.x||P.x+15>e.x+e.w)return;L.usos[e.k]=1;L.energia--;sfx('luz');
        L.pts+=30;L.textos.push({x:e.x+e.w/2,y:460,t:0,s:'+30'});
        if(e.k==='tra'){puerta.on=false;toast('La célula usó energía para transportar sustancias a través de la membrana: ¡la compuerta se abrió!',icoEnergia(),3.8);}
        if(e.k==='mov')toast('La célula usó energía para moverse: la proteína motora ya funciona. Súbete para cruzar.',icoEnergia(),3.8);
        if(e.k==='fab'){puente.on=true;toast('La célula usó energía para fabricar sustancias: ¡se construyó el puente!',icoEnergia(),3.8);}
        pintarObj();});},
    alLlegar:function(L,P){var cola=P.cola.slice();P.cola=[];cola.forEach(function(tp,i){var h=P.hist[Math.min(P.hist.length-1,10+i*11)];L.fx.push({x0:h.x,y0:h.y,m:tp,i:i,t:0,d:3,
        dib:function(c,f){var u=Math.min(1,f.t/2.6);dibujarMol(c,f.m,lerp(f.x0,3420+(f.i%4)*16,u),lerp(f.y0,-40,u*u),0.9,f.t*2);}});});
      toast('El dióxido de carbono sale de la célula y pasa al ambiente. El agua queda disponible para la célula o también puede salir.',iconoMol('co2'),4.5);setTimeout(function(){completar();},3400);},
    fondo:function(c,L,cm){fondoCito(c,L,cm,VW,VH,57);},
    detras:function(c,L){var cm=JG.cam;membranaCel(c,cm.x-30,cm.x+VW+30,0);
      ests.forEach(function(e){puesto(c,e.x,600,e.w,e.txt,!!L.usos[e.k],null,L);});
      etiqueta(c,'compuerta de transporte',972,262,13);
      c.save();c.fillStyle='rgba(255,255,255,.55)';rr(c,3330,70,170,530,40);c.fill();c.restore();
      [-20,20].forEach(function(dx){for(var yy=95;yy<590;yy+=22){c.fillStyle='#E9967A';c.beginPath();c.arc(3415+dx,yy,9,0,7);c.fill();}});
      c.save();c.setLineDash([10,8]);c.lineDashOffset=-L.t*24;c.strokeStyle='#B4492A';c.lineWidth=5;rr(c,3330,70,170,530,40);c.stroke();c.restore();
      etiqueta(c,'salida: membrana celular',3415,340,14);}
  };};
