/* ================== NIVELES: ISLA FOTOSÍNTESIS ================== */
var NIV={};
function P_(x,y,w,h,t,st,mv){return {x:x,y:y,w:w,h:h,t:t||'solid',st:st,mv:mv};}
function deco(seed,n,W,H,f){var r=rnd(seed),a=[];for(var i=0;i<n;i++)a.push(f(r,i));return a;}
function cartel(c,txt,x,y,px){etiqueta(c,txt,x,y,px||15);}
function patrullero(x0,x1,y,v,dib,msg){return {x:x0+40,y:y,v:v,x0:x0,x1:x1,
  caja:function(h){return {x:h.x-19,y:h.y-17,w:38,h:34};},
  update:function(h,dt){h.x+=h.v*dt;if(h.x>h.x1||h.x<h.x0)h.v*=-1;},
  dibujar:dib,msg:msg};}
function dibRadical(c,h,L){var r=12+Math.sin(L.t*6+h.x0)*2.5;
  c.save();c.translate(h.x,h.y);c.rotate(L.t*3);c.fillStyle='#8E44AD';c.beginPath();
  for(var i=0;i<10;i++){var rr=i%2?4:r;var a=i*Math.PI/5;c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);}c.fill();c.restore();
  c.strokeStyle='rgba(255,120,80,.8)';c.lineWidth=2;c.beginPath();c.arc(h.x,h.y,r+5,0,7);c.stroke();
  etiqueta(c,'molécula reactiva',h.x,h.y-32,11);}
function dibLisosoma(c,h,L){var r=19+Math.sin(L.t*3+h.x0)*1.5;
  var g=c.createRadialGradient(h.x-5,h.y-6,2,h.x,h.y,r+4);g.addColorStop(0,'#FFD9B8');g.addColorStop(0.7,'#E88A5C');g.addColorStop(1,'#B4492A');
  c.fillStyle=g;c.beginPath();c.arc(h.x,h.y,r,0,7);c.fill();c.strokeStyle='#9C3E1E';c.lineWidth=3;c.stroke();
  c.fillStyle='rgba(140,40,20,.55)';for(var i=0;i<5;i++){var a=i*1.9+L.t*2;c.beginPath();c.arc(h.x+Math.cos(a)*8,h.y+Math.sin(a)*7,2.6,0,7);c.fill();}
  etiqueta(c,'lisosoma',h.x,h.y-30,11);}
function dibVesiculaMov(c,h,L){var g=c.createRadialGradient(h.x-6,h.y-8,2,h.x,h.y,24);g.addColorStop(0,'#FFF4E6');g.addColorStop(1,'#F0A97C');
  c.fillStyle=g;c.beginPath();c.arc(h.x,h.y,20,0,7);c.fill();c.strokeStyle='#C25A32';c.lineWidth=3.5;c.stroke();
  c.fillStyle='#B4492A';for(var i=0;i<3;i++){c.beginPath();c.arc(h.x-8+i*8,h.y+(i%2)*8-4,2.6,0,7);c.fill();}
  etiqueta(c,'vesícula en movimiento',h.x,h.y-32,11);}

/* ---------- estilos ---------- */
ESTILO.grano=function(c,p){var r=rnd(Math.floor(p.ox*7+3));var h=Math.max(p.h,40);
  var g=c.createLinearGradient(0,p.y,0,p.y+Math.min(h,260));g.addColorStop(0,'#C9925C');g.addColorStop(1,'#9C6A40');
  c.fillStyle=g;c.beginPath();c.moveTo(p.x,p.y+h);c.lineTo(p.x,p.y+16);
  var n=Math.max(2,Math.round(p.w/70));for(var i=0;i<n;i++){var x0=p.x+i*p.w/n,x1=p.x+(i+1)*p.w/n;c.quadraticCurveTo(x0,p.y-8+r()*6,(x0+x1)/2,p.y-4);c.quadraticCurveTo(x1,p.y-8+r()*6,x1,p.y+(i===n-1?16:4));}
  c.lineTo(p.x+p.w,p.y+h);c.closePath();c.fill();
  c.strokeStyle='rgba(120,190,230,.75)';c.lineWidth=5;c.beginPath();c.moveTo(p.x+4,p.y+12);for(i=0;i<=n*2;i++){c.lineTo(p.x+4+i*(p.w-8)/(n*2),p.y-1+Math.sin(i+p.ox)*1.5);}c.stroke();
  for(i=0;i<p.w*Math.min(h,200)/900;i++){c.fillStyle=r()<0.5?'rgba(255,235,200,.35)':'rgba(90,55,30,.25)';c.beginPath();c.arc(p.x+8+r()*(p.w-16),p.y+14+r()*(Math.min(h,200)-20),2+r()*5,0,7);c.fill();}};
ESTILO.raicilla=function(c,p){var g=c.createLinearGradient(0,p.y,0,p.y+p.h);g.addColorStop(0,'#F4E2BE');g.addColorStop(1,'#CFAE7C');
  c.fillStyle=g;rr(c,p.x,p.y,p.w,p.h,p.h/2);c.fill();c.strokeStyle='#B08D5A';c.lineWidth=2;c.stroke();
  c.strokeStyle='rgba(240,225,190,.9)';c.lineWidth=2.5;for(var x=p.x+14;x<p.x+p.w-10;x+=16){c.beginPath();c.moveTo(x,p.y+p.h-2);c.quadraticCurveTo(x+4,p.y+p.h+12,x-2,p.y+p.h+22);c.stroke();}};
ESTILO.anillo=function(c,p){var g=c.createLinearGradient(0,p.y,0,p.y+p.h);g.addColorStop(0,'#E9B866');g.addColorStop(1,'#B9813C');c.fillStyle=g;rr(c,p.x,p.y,p.w,p.h,p.h/2);c.fill();
  c.strokeStyle='rgba(120,70,20,.35)';c.lineWidth=2;for(var x=p.x+18;x<p.x+p.w;x+=22){c.beginPath();c.moveTo(x,p.y+3);c.lineTo(x-6,p.y+p.h-3);c.stroke();}};
ESTILO.placa=function(c,p){ESTILO.anillo(c,p);c.fillStyle='rgba(170,220,245,.9)';for(var x=p.x+20;x<p.x+p.w-14;x+=34){c.beginPath();c.ellipse(x,p.y+p.h/2,8,4,0,0,7);c.fill();}};
ESTILO.celula=function(c,p){var cx=p.x+p.w/2,cy=p.y+p.h/2+6;c.save();var g=c.createRadialGradient(cx-p.w*0.2,cy-10,10,cx,cy,p.w*0.6);g.addColorStop(0,'#D9F2B4');g.addColorStop(1,'#9FD37A');
  c.fillStyle=g;c.beginPath();c.ellipse(cx,cy,p.w/2,p.h/2+14,0,0,7);c.fill();c.strokeStyle='#6BAA4C';c.lineWidth=4;c.stroke();
  var r=rnd(Math.floor(p.ox)+5);for(var i=0;i<4;i++){var a=r()*6.28;cloroplastoMini(c,cx+Math.cos(a)*p.w*0.3,cy+Math.sin(a)*p.h*0.3+4,0.8,a);}c.restore();};
ESTILO.epi=function(c,p){c.fillStyle='#E6F3CF';c.fillRect(p.x,p.y,p.w,p.h);c.strokeStyle='#A8CB82';c.lineWidth=3;
  for(var x=p.x;x<p.x+p.w;x+=70){rr(c,x+2,p.y+4,66,p.h-8,14);c.stroke();}c.fillStyle='#C7E39E';c.fillRect(p.x,p.y,p.w,6);};
ESTILO.oclusiva=function(c,p){};
ESTILO.grana=function(c,p){var n=Math.max(3,Math.round(p.h/16)),dh=p.h/n;for(var i=n-1;i>=0;i--){var y=p.y+i*dh;
    var g=c.createLinearGradient(0,y,0,y+dh);g.addColorStop(0,p.activo?'#9BF07A':'#6CC95A');g.addColorStop(1,p.activo?'#3FB24A':'#2E8A48');c.fillStyle=g;rr(c,p.x,y,p.w,dh-2,dh/2);c.fill();
    c.strokeStyle='#1F6B44';c.lineWidth=1.5;c.stroke();}
  if(p.meta){c.save();c.strokeStyle=p.activo?'#FFC43D':'rgba(255,255,255,.9)';c.lineWidth=4;c.setLineDash(p.activo?[]:[10,8]);rr(c,p.x-8,p.y-8,p.w+16,p.h+16,18);c.stroke();c.restore();
    if(p.carga>0&&!p.activo){c.fillStyle='#fff';rr(c,p.x,p.y-30,p.w,10,5);c.fill();c.fillStyle='#FFC43D';rr(c,p.x,p.y-30,p.w*p.carga,10,5);c.fill();}
    if(p.activo){var g2=c.createRadialGradient(p.x+p.w/2,p.y+p.h/2,10,p.x+p.w/2,p.y+p.h/2,p.w);g2.addColorStop(0,'rgba(255,240,140,.45)');g2.addColorStop(1,'rgba(255,240,140,0)');c.fillStyle=g2;c.fillRect(p.x-p.w/2,p.y-p.w/2,p.w*2,p.h+p.w);}}};
ESTILO.lamela=function(c,p){var g=c.createLinearGradient(0,p.y,0,p.y+p.h);g.addColorStop(0,'#7FD06A');g.addColorStop(1,'#3B9A4E');c.fillStyle=g;rr(c,p.x,p.y,p.w,p.h,p.h/2);c.fill();c.strokeStyle='#1F6B44';c.lineWidth=1.2;c.stroke();};
ESTILO.memClo=function(c,p){c.fillStyle='#CDEBB0';c.fillRect(p.x,p.y,p.w,p.h);c.strokeStyle='#5FA84A';c.lineWidth=4;c.beginPath();c.moveTo(p.x,p.y+3);c.lineTo(p.x+p.w,p.y+3);c.moveTo(p.x,p.y+16);c.lineTo(p.x+p.w,p.y+16);c.stroke();};
function cloroplastoMini(c,x,y,k,a){c.save();c.translate(x,y);c.rotate(a||0);c.scale(k,k);c.fillStyle='#4FB45A';c.beginPath();c.ellipse(0,0,22,12,0,0,7);c.fill();c.strokeStyle='#2E7D3E';c.lineWidth=2;c.stroke();
  c.fillStyle='#2F8A45';for(var i=-1;i<=1;i++){rr(c,i*11-4,-6,8,12,3);c.fill();}c.restore();}

/* ---------- F1: raíz ---------- */
NIV.F1=function(VW,VH){
  var piso=[[0,600,700],[830,600,520],[1470,560,380],[1980,600,600],[2720,600,420],[3270,580,520],[3910,600,700]];
  var plat=piso.map(function(a){return P_(a[0],a[1],a[2],400,'solid','grano');});
  [[560,470,160],[1150,455,170],[1340,360,140]].forEach(function(a){plat.push(P_(a[0],a[1],a[2],44,'one','grano'));});
  [[1700,430,240],[2300,445,200],[2560,345,170],[3030,470,190],[3560,430,190],[3760,330,170]].forEach(function(a){plat.push(P_(a[0],a[1],a[2],24,'one','raicilla'));});
  plat.push(P_(3140,520,110,40,'one','grano',{ax:70,per:3.2}));
  var nemas=[[830,1340],[1990,2560],[3280,3770],[3940,4360]].map(function(s,i){return {tp:'nema',x0:s[0]+20,x1:s[1]-90,x:s[0]+150,y:(i>=2?580:600)-26,v:85+i*15,
    caja:function(h){return {x:h.x+6,y:h.y+4,w:78,h:22};},update:function(h,dt){h.x+=h.v*dt;if(h.x>h.x1||h.x<h.x0)h.v*=-1;},
    dibujar:function(c,h,L){c.save();for(var k=0;k<9;k++){var xx=h.x+8+k*9,yy=h.y+16+Math.sin(L.t*7+k*0.8)*4;c.fillStyle=k%2?'#EBC8B2':'#F3D9C6';c.beginPath();c.arc(xx,yy,8-Math.abs(k-4)*0.6,0,7);c.fill();}
      var hx=h.v>0?h.x+86:h.x+2;c.fillStyle='#2A1C14';c.beginPath();c.arc(hx,h.y+13,1.8,0,7);c.fill();c.restore();etiqueta(c,'nematodo',h.x+44,h.y-10,12);},
    msg:'¡Un nematodo! Es un gusano microscópico del suelo. Sáltalo.',pisable:true};});
  var bg=deco(11,40,4600,720,function(r){return {x:r()*4600,y:120+r()*560,r:30+r()*80,k:0.25+r()*0.25};});
  return {isla:'F',nombre:'1 · La raíz: entra el agua',W:4600,H:720,plat:plat,peligros:nemas,
    items:[[630,415],[1225,400],[1410,300],[2400,385],[2645,285],[3845,270]].map(function(a){return {x:a[0],y:a[1],tp:'h2o'};}),
    cps:[{x:1500,y:560},{x:2740,y:600},{x:3930,y:600}],inicio:{x:300,y:520},meta:{x:4400,y:380,w:110,h:220},
    eq:{h2o:0,co2:0,glu:0,o2:0},cola0:[],
    datos:{h2o:'Agua (H<sub>2</sub>O): en el suelo forma una película alrededor de los granos. La raíz la absorbe por los pelos absorbentes.'},
    objetivo:function(L){return 'Junta 6 moléculas de agua y entra al pelo absorbente de la raíz ('+Math.min(6,L.eq.h2o)+'/6)';},
    metaOK:function(L){var f=6-L.eq.h2o;return f<=0?true:'Te faltan '+f+' moléculas de agua antes de entrar a la raíz.';},
    fondo:function(c,L,cm){var g=c.createLinearGradient(0,0,0,VH);g.addColorStop(0,'#F3DDB6');g.addColorStop(1,'#DDB283');c.fillStyle=g;c.fillRect(0,0,VW,VH);
      bg.forEach(function(b){var x=b.x-cm.x*b.k;x=((x%4600)+4600)%4600-200;if(x>VW+200)return;c.fillStyle='rgba(176,122,74,'+(0.18+b.k*0.4)+')';c.beginPath();c.ellipse(x,b.y-cm.y*b.k,b.r,b.r*0.75,0,0,7);c.fill();
        c.strokeStyle='rgba(140,200,235,.35)';c.lineWidth=3;c.stroke();});},
    detras:function(c,L){// raíz principal con pelos absorbentes
      var g=c.createLinearGradient(0,40,0,170);g.addColorStop(0,'#F7E7C6');g.addColorStop(1,'#D9B985');c.fillStyle=g;rr(c,-50,40,4800,120,60);c.fill();c.strokeStyle='#B99560';c.lineWidth=3;c.stroke();
      c.strokeStyle='rgba(185,149,96,.5)';c.lineWidth=2;for(var x=0;x<4600;x+=90){c.beginPath();c.moveTo(x,60);c.lineTo(x+40,140);c.stroke();}
      for(x=300;x<4300;x+=260){c.strokeStyle='#E8D2A6';c.lineWidth=12;c.lineCap='round';c.beginPath();c.moveTo(x,150);c.quadraticCurveTo(x+30,230,x+10,300+((x/260)%3)*30);c.stroke();}
      cartel(c,'raíz',260,105,18);cartel(c,'pelos absorbentes',1350,240,14);
      // pelo absorbente de la meta
      var mx=4455;var g2=c.createLinearGradient(mx-60,0,mx+60,0);g2.addColorStop(0,'#E5CB98');g2.addColorStop(0.5,'#FBF0D8');g2.addColorStop(1,'#D9B985');
      c.fillStyle=g2;c.beginPath();c.moveTo(mx-55,150);c.lineTo(mx-55,520);c.quadraticCurveTo(mx,610,mx+55,520);c.lineTo(mx+55,150);c.closePath();c.fill();c.strokeStyle='#B99560';c.lineWidth=4;c.stroke();
      var gg=c.createRadialGradient(mx,470,5,mx,470,60);gg.addColorStop(0,'rgba(255,255,255,.95)');gg.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=gg;c.beginPath();c.arc(mx,470,60,0,7);c.fill();
      cartel(c,'entrada al pelo absorbente',mx,350,15);
      cartel(c,'grano de suelo',300,650,14);cartel(c,'película de agua',1660,548,13);}
  };};

/* ---------- F2: xilema (vertical) ---------- */
NIV.F2=function(VW,VH){
  var W=1280,H=3600,iz=150,de=1130,plat=[];
  plat.push(P_(-400,H-60,W+800,200,'solid','anillo'));
  plat.push(P_(-600,-200,iz+600,H+600,'solid','pared'));plat.push(P_(de,-200,600+W,H+600,'solid','pared'));
  var y=H-210,lado=0;
  while(y>220){if(y%900<150&&y<H-300){plat.push(P_(iz,y,330,30,'solid','placa'));plat.push(P_(de-330,y,330,30,'solid','placa'));y-=170;continue;}
    var w=240+((y*7)%90);if(lado%2===0)plat.push(P_(iz,y,w,24,'one','anillo'));else plat.push(P_(de-w,y,w,24,'one','anillo'));
    if(lado%3===1)plat.push(P_(540,y-80,200,22,'one','anillo',{ax:110,per:4+((y/100)%2)}));
    lado++;y-=165;}
  var zonas=[[560,2500,160,560],[300,1500,160,520],[820,700,160,520]].map(function(a){return {x:a[0],y:a[1],w:a[2],h:a[3],f:3600,max:560,
    dibujar:function(c,z,L){c.save();var g=c.createLinearGradient(z.x,0,z.x+z.w,0);g.addColorStop(0,'rgba(120,200,240,0)');g.addColorStop(0.5,'rgba(120,200,240,.38)');g.addColorStop(1,'rgba(120,200,240,0)');c.fillStyle=g;c.fillRect(z.x,z.y,z.w,z.h);
      c.strokeStyle='rgba(255,255,255,.8)';c.lineWidth=4;c.lineCap='round';for(var i=0;i<6;i++){var yy=z.y+z.h-((L.t*260+i*z.h/6)%z.h);c.beginPath();c.moveTo(z.x+z.w/2-14,yy+14);c.lineTo(z.x+z.w/2,yy);c.lineTo(z.x+z.w/2+14,yy+14);c.stroke();}
      c.restore();etiqueta(c,'corriente de agua hacia arriba',z.x+z.w/2,z.y+z.h+24,13);}};});
  var burbujas=[];for(var i=0;i<9;i++)burbujas.push({tp:'burb',x:250+i*100,y:H-600-i*360,r:24+(i%3)*8,v:95+(i%4)*25,ph:i,
    caja:function(h){return {x:h.x-h.r*0.7,y:h.y-h.r*0.7,w:h.r*1.4,h:h.r*1.4};},
    update:function(h,dt,L){h.y+=h.v*dt;h.x+=Math.sin(L.t*1.3+h.ph)*40*dt;var cm=JG.cam;if(h.y>cm.y+VH+120){h.y=cm.y-60-Math.random()*200;h.x=220+Math.random()*840;}},
    dibujar:function(c,h){var g=c.createRadialGradient(h.x-h.r*0.4,h.y-h.r*0.4,2,h.x,h.y,h.r);g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(0.7,'rgba(220,240,255,.35)');g.addColorStop(1,'rgba(160,200,230,.8)');
      c.fillStyle=g;c.beginPath();c.arc(h.x,h.y,h.r,0,7);c.fill();c.strokeStyle='rgba(120,170,210,.9)';c.lineWidth=2;c.stroke();etiqueta(c,'burbuja de aire',h.x,h.y-h.r-12,11);},
    msg:'¡Burbuja de aire! El aire dentro del xilema interrumpe la columna de agua.'});
  return {isla:'F',nombre:'2 · El tallo: el agua sube por el xilema',W:W,H:H,vertical:true,plat:plat,zonas:zonas,peligros:burbujas,items:[],minX:iz,maxX:de,
    cps:[{x:640,y:2700},{x:640,y:1800},{x:640,y:900}].map(function(q){q.y=q.y;return q;}),inicio:{x:600,y:H-140},meta:{x:iz,y:20,w:de-iz,h:170},
    eq:{h2o:6,co2:0,glu:0,o2:0},cola0:['h2o','h2o','h2o','h2o','h2o','h2o'],
    objetivo:function(L){return 'Sube con el agua por el xilema hasta la hoja ('+Math.round(clamp(100*(1-(JG.P.y-200)/(H-340)),0,100))+'%)';},
    metaOK:function(){return true;},
    fondo:function(c,L,cm){var g=c.createLinearGradient(0,0,0,VH);g.addColorStop(0,'#DFF3FA');g.addColorStop(1,'#BFE6F4');c.fillStyle=g;c.fillRect(0,0,VW,VH);
      c.strokeStyle='rgba(255,255,255,.6)';c.lineWidth=3;for(var i=0;i<14;i++){var x=((i*97)%VW),yy=VH-((L.t*90+i*61-cm.y*0.3)%VH+VH)%VH;c.beginPath();c.moveTo(x,yy);c.lineTo(x,yy-30);c.stroke();}},
    detras:function(c,L){etiqueta(c,'xilema: tubo que conduce agua desde la raíz hasta las hojas',640,H-260,15);etiqueta(c,'hacia la hoja',640,90,18);
      var g=c.createLinearGradient(0,0,0,170);g.addColorStop(0,'rgba(140,210,120,.9)');g.addColorStop(1,'rgba(140,210,120,0)');c.fillStyle=g;c.fillRect(iz,0,de-iz,170);},
    encima:function(c,L){[[-600,iz],[de,de+900]].forEach(function(a,j){var x0=a[0],x1=a[1],cm=JG.cam;var y0=Math.max(-200,cm.y-50),y1=Math.min(H+200,cm.y+VH+50);
      c.fillStyle='#EAF2D2';c.fillRect(x0,y0,x1-x0,y1-y0);c.strokeStyle='#C8D9A0';c.lineWidth=3;
      for(var yy=Math.floor(y0/110)*110;yy<y1;yy+=110)for(var xx=x0+((yy/110)%2)*40;xx<x1;xx+=90){rr(c,xx+4,yy+4,82,102,22);c.stroke();}
      var wx=j===0?x1-26:x0;var gw=c.createLinearGradient(wx,0,wx+26,0);gw.addColorStop(0,'#C98E45');gw.addColorStop(1,'#E9B866');c.fillStyle=gw;c.fillRect(wx,y0,26,y1-y0);
      c.fillStyle='#B9813C';for(yy=Math.floor(y0/40)*40;yy<y1;yy+=40){c.fillRect(j===0?x1-6:x0,yy,6,22);}});}
  };};
ESTILO.pared=function(){};

/* ---------- F3: hoja y estomas ---------- */
NIV.F3=function(VW,VH){
  var W=4300,H=720,estX=[520,1130,1740,2350,2960,3570],GAP=120,plat=[],x0=0,est=[];
  estX.forEach(function(x,i){plat.push(P_(x0,610,x-x0,160,'solid','epi'));var oc=P_(x,622,GAP,150,'solid','oclusiva');plat.push(oc);
    est.push({x:x,pl:oc,per:6.5,ph:i*1.7,abierto:false,ab:0});x0=x+GAP;});
  plat.push(P_(x0,610,W-x0,160,'solid','epi'));
  var r=rnd(77);for(var i=0;i<13;i++){var cx=200+i*310+r()*60;plat.push(P_(cx,i%2?330:450,150+r()*40,40,'one','celula'));}
  var items=estX.map(function(x,i){return {x:x+GAP/2,y:640,tp:'co2',oculto:true,yObj:300+((i*53)%140),est:i,vida:13};});
  var stom={tp:'stom',caja:null,dibujar:function(c,h,L){est.forEach(function(e){var a=e.ab,x=e.x,w=GAP;
      var gL=c.createLinearGradient(x,0,x+w/2,0);gL.addColorStop(0,'#7CC56A');gL.addColorStop(1,'#4F9E4A');
      c.fillStyle='#7CC56A';c.strokeStyle='#2F7A3A';c.lineWidth=3;
      [-1,1].forEach(function(s){var cx=x+w/2+s*(w/4+a*w*0.2);c.beginPath();c.ellipse(cx,640,w/4+4-a*6,30,0,0,7);c.fill();c.stroke();
        c.fillStyle='#3E9A4A';for(var k=-1;k<=1;k++){c.beginPath();c.ellipse(cx,640+k*14,7,5,0,0,7);c.fill();}c.fillStyle='#7CC56A';});
      etiqueta(c,a>0.5?'estoma abierto':'estoma cerrado',x+w/2,592,13);});}};
  return {isla:'F',nombre:'3 · La hoja: entra el dióxido de carbono',W:W,H:H,techo:150,plat:plat,peligros:[stom],items:items,
    cps:[{x:1300,y:610},{x:2500,y:610},{x:3700,y:610}],inicio:{x:300,y:520},meta:{x:4080,y:430,w:160,h:180},
    msgCaida:'Saliste de la hoja por un estoma abierto. Vuelves al último punto de control.',
    eq:{h2o:6,co2:0,glu:0,o2:0},cola0:['h2o','h2o','h2o','h2o','h2o','h2o'],
    datos:{co2:'Dióxido de carbono (CO<sub>2</sub>): viene del aire y entra a la hoja por los estomas.'},
    objetivo:function(L){return 'Atrapa 6 moléculas de dióxido de carbono que entran por los estomas ('+Math.min(6,L.eq.co2)+'/6)';},
    metaOK:function(L){var f=6-L.eq.co2;return f<=0?true:'Te faltan '+f+' moléculas de dióxido de carbono.';},
    update:function(L,dt){est.forEach(function(e,i){var ph=((L.t+e.ph)%e.per);e.abierto=ph<3.2;e.ab=lerp(e.ab,e.abierto?1:0,dt*4);e.pl.on=!e.abierto;
        var it=L.items[i];if(it.oculto&&e.ab>0.8){it.oculto=false;it.sube=true;it.vida=13;}
        if(it.sube){it.y=lerp(it.y,it.yObj,dt*1.2);if(Math.abs(it.y-it.yObj)<2)it.sube=false;}
        else if(!it.oculto&&!it.got){it.vida-=dt;if(it.vida<0){it.oculto=true;it.y=640;L.eq.co2=Math.max(0,L.eq.co2);pintarEcu();
          if(!L.avisado){L.avisado=1;toast('¡Se difundió! El dióxido de carbono sigue moviéndose: atrápalo antes de que se pierda. Vuelve a entrar por el estoma.',iconoMol('co2'),4);}}}});},
    fondo:function(c,L,cm){var g=c.createLinearGradient(0,0,0,VH);g.addColorStop(0,'#E8F6D6');g.addColorStop(1,'#CFEBB5');c.fillStyle=g;c.fillRect(0,0,VW,VH);
      var r=rnd(5);for(var i=0;i<26;i++){var x=((r()*3000-cm.x*0.35)%3000+3000)%3000-200,y=180+r()*380;c.fillStyle='rgba(160,210,120,.35)';c.beginPath();c.ellipse(x,y,70+r()*50,48+r()*20,0,0,7);c.fill();}},
    detras:function(c,L){var cm=JG.cam;var x0=Math.floor((cm.x-100)/130)*130;
      c.fillStyle='#F3FAE6';c.fillRect(cm.x-50,0,VW+100,40);c.fillStyle='#E3F2C9';for(var x=x0;x<cm.x+VW+100;x+=90){rr(c,x,40,86,46,12);c.fill();}
      for(x=x0;x<cm.x+VW+130;x+=130){var g=c.createLinearGradient(x,0,x+120,0);g.addColorStop(0,'#A9DB86');g.addColorStop(0.5,'#C9EBA6');g.addColorStop(1,'#A2D47E');c.fillStyle=g;rr(c,x+6,92,118,170,40);c.fill();c.strokeStyle='#6BAA4C';c.lineWidth=3;c.stroke();
        for(var k=0;k<6;k++)cloroplastoMini(c,x+30+(k%2)*58,118+Math.floor(k/2)*52,1,0.3*(k%3-1));}
      etiqueta(c,'epidermis superior',cm.x+VW*0.18,30,13);etiqueta(c,'células en empalizada (con cloroplastos)',cm.x+VW*0.5,280,13);
      if(L.t<1e9){etiqueta(c,'célula del parénquima esponjoso',360,520,13);}
      var mx=4160;c.fillStyle='rgba(255,255,255,.75)';c.beginPath();c.ellipse(mx,510,95,70,0,0,7);c.fill();cloroplastoMini(c,mx,500,2.6,0);
      etiqueta(c,'entrar al cloroplasto',mx,410,15);}
  };};

/* ---------- F4: cloroplasto ---------- */
NIV.F4=function(VW,VH){
  var W=3700,H=720,plat=[P_(-50,630,W+100,140,'solid','memClo')];
  var gr=[[380,500,170,96],[820,400,160,110],[1300,500,170,96],[1760,330,160,112],[2250,480,170,96],[2700,360,160,112],[3100,500,170,96]];
  var granas=gr.map(function(a,i){var p=P_(a[0],a[1],a[2],a[3],'solid','grana');if(i%2===1){p.meta=true;p.carga=0;}return p;});
  plat=plat.concat(granas);
  [[560,560,260],[990,470,300],[1480,420,280],[1930,420,320],[2430,440,270],[2870,470,230]].forEach(function(a){plat.push(P_(a[0],a[1],a[2],14,'one','lamela'));});
  var haces=[{b:900,a:260,v:0.32,ph:0},{b:1900,a:300,v:0.27,ph:2},{b:2800,a:260,v:0.3,ph:4}];
  function hx(h,t){return h.b+Math.sin(t*h.v+h.ph)*h.a;}
  var avisoSinLuz=0;
  var rads=[patrullero(550,1450,582,120,dibRadical,'¡Una molécula reactiva! Cuando llega demasiada luz se forman moléculas muy reactivas que dañan el cloroplasto.'),
    patrullero(700,1100,366,135,dibRadical,'¡Una molécula reactiva! Cuando llega demasiada luz se forman moléculas muy reactivas que dañan el cloroplasto.'),
    patrullero(1550,2050,296,150,dibRadical,'¡Una molécula reactiva! Cuando llega demasiada luz se forman moléculas muy reactivas que dañan el cloroplasto.'),
    patrullero(2400,3300,582,135,dibRadical,'¡Una molécula reactiva! Cuando llega demasiada luz se forman moléculas muy reactivas que dañan el cloroplasto.'),
    patrullero(2550,3000,326,160,dibRadical,'¡Una molécula reactiva! Cuando llega demasiada luz se forman moléculas muy reactivas que dañan el cloroplasto.')];
  return {isla:'F',nombre:'4 · El cloroplasto: la luz y la fabricación',W:W,H:H,techo:60,plat:plat,items:[],peligros:rads,
    cps:[{x:1300,y:630},{x:2250,y:630}],inicio:{x:300,y:540},meta:{x:3400,y:420,w:240,h:210},
    eq:{h2o:6,co2:6,glu:0,o2:0},cola0:['h2o','h2o','h2o','h2o','h2o','h2o','co2','co2','co2','co2','co2','co2'],granas:granas,
    objetivo:function(L){var n=granas.filter(function(g){return g.meta&&g.activo;}).length;return n<3?'Párate sobre los 3 grupos de tilacoides marcados cuando les llegue la luz ('+n+'/3)':'Lleva el agua y el dióxido de carbono a la zona de fabricación del estroma';},
    metaOK:function(L){var n=granas.filter(function(g){return g.meta&&g.activo;}).length;return n>=3?true:'Primero la clorofila tiene que captar la energía de la luz en los 3 grupos de tilacoides marcados.';},
    update:function(L,dt,P){granas.forEach(function(g){if(!g.meta||g.activo)return;var cx=g.x+g.w/2,luz=haces.some(function(h){return Math.abs(hx(h,L.t)-cx)<95;});g.conLuz=luz;
        if(P.suelo===g){if(luz){g.carga=Math.min(1,g.carga+dt/1.1);if(g.carga>=1){g.activo=true;sfx('luz');L.pts+=30;L.textos.push({x:cx,y:g.y-40,t:0,s:'+30'});
            toast('¡La clorofila de estos tilacoides captó la energía de la luz!',icoClorofila(),3);pintarObj();}}
          else if(L.t-avisoSinLuz>5){avisoSinLuz=L.t;toast('Sin luz, la clorofila no puede captar energía. Espera a que llegue un haz de luz.',icoLuz(),3.2);}}
        else if(!luz)g.carga=Math.max(0,g.carga-dt*0.3);});},
    alLlegar:function(L,P){var cx=3520,cy=470;L.anim=0;L.armando=true;var cola=P.cola.slice();P.cola=[];
      cola.forEach(function(tp,i){var h=P.hist[Math.min(P.hist.length-1,10+i*11)];L.fx.push({x:h.x,y:h.y,t:0,d:1.6+i*0.05,tp:'vuela',m:tp,x0:h.x,y0:h.y,
        dib:function(c,f,k){var u=Math.min(1,f.t/1.3);var e=u*u*(3-2*u);dibujarMol(c,f.m,lerp(f.x0,cx,e),lerp(f.y0,cy,e)-Math.sin(e*3.14)*80,0.9*(1-e*0.5),f.t*3);}});});
      setTimeout(function(){sfx('luz');L.eq.glu=1;L.eq.o2=6;pintarEcu();P.cola=['glu'];
        for(var i=0;i<6;i++)L.fx.push({t:0,d:3.2,i:i,dib:function(c,f){var u=f.t/3.2;dibujarMol(c,'o2',cx-120+f.i*48,cy-u*420,1.1,f.t*2);if(u<0.7)formula(c,'O2',cx-120+f.i*48,cy-u*420+28,14);}});
        L.fx.push({t:0,d:3.2,dib:function(c,f){var u=Math.min(1,f.t/0.5);c.save();c.globalAlpha=u;dibujarMol(c,'glu',cx,cy,1.5*u,0);formula(c,'C6H12O6',cx,cy+60,18);c.restore();}});
        toast('¡Se formó glucosa (materia orgánica) y se liberó oxígeno! El oxígeno sale de la hoja por los estomas.',iconoMol('glu'),4);},1700);
      setTimeout(function(){completar();},5200);},
    fondo:function(c,L,cm){var g=c.createLinearGradient(0,0,0,VH);g.addColorStop(0,'#E4F5C8');g.addColorStop(1,'#C4E6A0');c.fillStyle=g;c.fillRect(0,0,VW,VH);
      var r=rnd(9);for(var i=0;i<30;i++){var x=((r()*2600-cm.x*0.3)%2600+2600)%2600-150,y=100+r()*500;c.fillStyle='rgba(120,190,100,.18)';rr(c,x,y,60+r()*60,26,13);c.fill();}},
    detras:function(c,L){var cm=JG.cam;c.fillStyle='#BFE3A0';c.fillRect(cm.x-50,0,VW+100,62);c.strokeStyle='#5FA84A';c.lineWidth=4;c.beginPath();c.moveTo(cm.x-50,48);c.lineTo(cm.x+VW+50,48);c.moveTo(cm.x-50,60);c.lineTo(cm.x+VW+50,60);c.stroke();
      etiqueta(c,'envoltura del cloroplasto',cm.x+150,30,13);etiqueta(c,'estroma',cm.x+VW*0.62,110,14);etiqueta(c,'tilacoides (con clorofila)',420,470,13);
      haces.forEach(function(h){var x=hx(h,L.t);var g=c.createLinearGradient(x-90,0,x+90,0);g.addColorStop(0,'rgba(255,236,140,0)');g.addColorStop(0.5,'rgba(255,236,140,.55)');g.addColorStop(1,'rgba(255,236,140,0)');
        c.fillStyle=g;c.beginPath();c.moveTo(x-60,60);c.lineTo(x+60,60);c.lineTo(x+110,630);c.lineTo(x-10,630);c.closePath();c.fill();etiqueta(c,'luz',x,90,15,'rgba(255,240,170,.95)');});
      var cx=3520;c.save();c.setLineDash([12,8]);c.strokeStyle='#2E9E5B';c.lineWidth=4;rr(c,3400,400,240,230,26);c.stroke();c.restore();
      c.fillStyle='rgba(255,255,255,.45)';rr(c,3400,400,240,230,26);c.fill();etiqueta(c,'zona de fabricación (estroma)',cx,380,15);}
  };};
