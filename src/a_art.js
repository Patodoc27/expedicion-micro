'use strict';
/* ================== UTILIDADES ================== */
function $(id){return document.getElementById(id);}
function clamp(v,a,b){return v<a?a:(v>b?b:v);}
function lerp(a,b,t){return a+(b-a)*t;}
function rnd(seed){var s=seed||1;return function(){s=(s*16807)%2147483647;return (s-1)/2147483646;};}
function rr(c,x,y,w,h,r){r=Math.min(r,w/2,h/2);c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();}
function shade(hex,f){var n=parseInt(hex.slice(1),16),r=n>>16,g=(n>>8)&255,b=n&255;
  if(f<0){r*=1+f;g*=1+f;b*=1+f;}else{r+=(255-r)*f;g+=(255-g)*f;b+=(255-b)*f;}
  return 'rgb('+Math.round(r)+','+Math.round(g)+','+Math.round(b)+')';}

/* ================== PERSONAJES ================== */
var PJ={
  killa:{nom:'Killa',g:'f',desc:'13 años. Le encanta escalar los cerros y sacar fotos de plantas.',skin:'#C48A5F',hair:'#1E1716',shirt:'#F2B134',pants:'#3F6FB5',shoes:'#E8574A',pack:'#2E9E5B',st:'trenza'},
  sofia:{nom:'Sofía',g:'f',desc:'12 años. Curiosa, siempre lleva su lupa y su cuaderno de campo.',skin:'#F0C6A0',hair:'#7A4526',shirt:'#2BB3A6',pants:'#7A4FB3',shoes:'#FFFFFF',pack:'#E0704A',st:'ondas'},
  inti:{nom:'Inti',g:'m',desc:'13 años. Juega al fútbol y quiere saber de dónde sale la energía.',skin:'#A56E48',hair:'#141111',shirt:'#E2553F',pants:'#556E34',shoes:'#2C3E50',pack:'#FFC43D',st:'corto'},
  mateo:{nom:'Mateo',g:'m',desc:'12 años. Fanático de los microscopios y de los experimentos.',skin:'#E7B48D',hair:'#8A4B26',shirt:'#3FA35B',pants:'#46607A',shoes:'#FFC43D',pack:'#3F6FB5',st:'rulos'}
};
var PJ_ORDEN=['killa','sofia','inti','mateo'];

function limb(c,x,y,a1,l1,a2,l2,w,col,col2){
  var kx=x+Math.sin(a1)*l1, ky=y+Math.cos(a1)*l1;
  var fx=kx+Math.sin(a2)*l2, fy=ky+Math.cos(a2)*l2;
  c.lineCap='round';c.lineJoin='round';
  c.strokeStyle=col;c.lineWidth=w;c.beginPath();c.moveTo(x,y);c.lineTo(kx,ky);if(!col2)c.lineTo(fx,fy);c.stroke();
  if(col2){c.strokeStyle=col2;c.lineWidth=w*0.82;c.beginPath();c.moveTo(kx,ky);c.lineTo(fx,fy);c.stroke();}
  return {x:fx,y:fy,kx:kx,ky:ky};
}
function shoe(c,p,col,a){c.save();c.translate(p.x,p.y);c.rotate(a||0);c.fillStyle=col;rr(c,-4,-3.5,13,7,3.5);c.fill();
  c.fillStyle='rgba(0,0,0,.25)';c.fillRect(-4,1.6,13,1.8);c.restore();}

/* dibuja personaje con los pies en (x,y). s=escala, f=+1 mira a la derecha, -1 izquierda */
function dibujarPJ(c,id,x,y,s,f,t,est,extra){
  var P=PJ[id]; if(!P)return; extra=extra||{};
  c.save();c.translate(x,y);c.scale(s*f,s);
  var run=est==='run', air=(est==='jump'||est==='fall');
  var ph=t*13, sw=run?Math.sin(ph)*0.75:0;
  var bob=run?-Math.abs(Math.cos(ph))*2.2:Math.sin(t*2.4)*0.7;
  // sombra
  if(!air){c.fillStyle='rgba(0,0,0,.18)';c.beginPath();c.ellipse(1,0,15,3.6,0,0,Math.PI*2);c.fill();}
  var hipY=-33+bob;
  var aA,bA,aB,bB;
  if(air){aA=0.75;bA=-0.2;aB=-0.35;bB=-0.75;if(est==='fall'){aA=0.35;bA=0.05;aB=-0.15;bB=-0.45;}}
  else if(run){aA=sw;bA=sw-Math.max(0,Math.sin(ph+1.7))*1.1;aB=-sw;bB=-sw-Math.max(0,Math.sin(ph+1.7+Math.PI))*1.1;}
  else {aA=0.06;bA=0.02;aB=-0.06;bB=-0.08;}
  // pierna trasera
  var pB=limb(c,-1,hipY,aB,15.5,bB,15.5,8.5,shade(P.pants,-0.25));shoe(c,pB,shade(P.shoes,-0.15),air?-0.3:0);
  // brazo trasero
  var shY=-53+bob, arA=air?-2.4:(run?-sw*0.95:0.12), arB=air?-2.0:(run?sw*0.95:-0.1);
  var hB=limb(c,-1,shY,arB,11,arB+0.6,10.5,6.5,shade(P.shirt,-0.25),shade(P.skin,-0.18));
  c.fillStyle=shade(P.skin,-0.18);c.beginPath();c.arc(hB.x,hB.y,3.3,0,7);c.fill();
  // mochila
  c.fillStyle=P.pack;rr(c,-19,-57+bob,12,24,5);c.fill();c.fillStyle=shade(P.pack,-0.25);rr(c,-19,-44+bob,12,9,4);c.fill();
  c.fillStyle=shade(P.pack,0.35);rr(c,-17,-54+bob,4,8,2);c.fill();
  // pierna delantera
  var pA=limb(c,2,hipY,aA,15.5,bA,15.5,8.5,P.pants);shoe(c,pA,P.shoes,air?0.25:0);
  // torso
  var gr=c.createLinearGradient(-10,0,12,0);gr.addColorStop(0,shade(P.shirt,-0.18));gr.addColorStop(0.6,P.shirt);gr.addColorStop(1,shade(P.shirt,0.15));
  c.fillStyle=gr;rr(c,-10,-59+bob,22,29,8);c.fill();
  c.fillStyle=P.pants;rr(c,-10,-36+bob,22,8,3);c.fill();
  c.fillStyle='rgba(255,255,255,.55)';c.fillRect(-2,-50+bob,10,2.2);
  c.strokeStyle=shade(P.pack,-0.3);c.lineWidth=2.6;c.beginPath();c.moveTo(-8,-57+bob);c.lineTo(-3,-38+bob);c.stroke();
  // cuello
  c.fillStyle=shade(P.skin,-0.12);c.fillRect(0,-63+bob,6,6);
  // cabeza
  var hx=4,hy=-74+bob;
  if(P.st==='trenza'){ // trenza detrás
    var ang=clamp((extra.vx||0)/-900,-0.5,0.5)+Math.sin(t*3)*0.05;
    c.save();c.translate(hx-9,hy+2);c.rotate(0.35+ang);c.fillStyle=P.hair;
    for(var i=0;i<5;i++){c.beginPath();c.ellipse(0,5+i*5.2,4.2-i*0.35,3.6,0,0,7);c.fill();}
    c.fillStyle='#E8574A';c.beginPath();c.arc(0,30,2.8,0,7);c.fill();c.restore();
  }
  if(P.st==='ondas'){c.fillStyle=P.hair;c.beginPath();c.moveTo(hx-12,hy-6);
    c.quadraticCurveTo(hx-19,hy+6,hx-14,hy+17);c.quadraticCurveTo(hx-10,hy+21,hx-6,hy+17);c.quadraticCurveTo(hx-3,hy+21,hx+1,hy+16);c.lineTo(hx,hy);c.closePath();c.fill();}
  var gh=c.createRadialGradient(hx+3,hy-4,3,hx,hy,15);gh.addColorStop(0,shade(P.skin,0.12));gh.addColorStop(1,P.skin);
  c.fillStyle=gh;c.beginPath();c.ellipse(hx,hy,12.2,13,0,0,7);c.fill();
  // oreja
  c.fillStyle=shade(P.skin,-0.08);c.beginPath();c.ellipse(hx-5,hy+1,3,3.8,0,0,7);c.fill();
  // pelo
  c.fillStyle=P.hair;
  if(P.st==='trenza'){c.beginPath();c.moveTo(hx+12.5,hy-3);c.quadraticCurveTo(hx+11,hy-15,hx-1,hy-14.5);c.quadraticCurveTo(hx-13,hy-13,hx-12.5,hy+2);c.quadraticCurveTo(hx-10,hy+9,hx-7,hy+7);c.quadraticCurveTo(hx-8,hy-3,hx-2,hy-6);c.quadraticCurveTo(hx+6,hy-8,hx+12.5,hy-3);c.fill();
    c.fillStyle='rgba(255,255,255,.18)';c.beginPath();c.ellipse(hx+1,hy-11,6,1.6,-0.2,0,7);c.fill();}
  if(P.st==='ondas'){c.beginPath();c.moveTo(hx+13,hy-1);c.quadraticCurveTo(hx+12,hy-16,hx-1,hy-15);c.quadraticCurveTo(hx-14,hy-14,hx-13,hy+3);c.quadraticCurveTo(hx-9,hy+6,hx-7,hy+3);c.quadraticCurveTo(hx-6,hy-5,hx+1,hy-6);c.quadraticCurveTo(hx+5,hy-2,hx+13,hy-1);c.fill();
    c.fillStyle='#FFC43D';c.beginPath();c.ellipse(hx+2,hy-10,3.2,2,0.4,0,7);c.fill();c.fillStyle='#E0704A';c.beginPath();c.arc(hx+2,hy-10,1.2,0,7);c.fill();}
  if(P.st==='corto'){c.beginPath();c.moveTo(hx+12.5,hy-4);c.lineTo(hx+13,hy-9);c.lineTo(hx+9,hy-12);c.lineTo(hx+10,hy-16);c.lineTo(hx+4,hy-15);c.lineTo(hx+2,hy-18);c.lineTo(hx-3,hy-15);c.lineTo(hx-8,hy-16);c.lineTo(hx-9,hy-12);c.lineTo(hx-14,hy-9);c.quadraticCurveTo(hx-13,hy+1,hx-9,hy+4);c.quadraticCurveTo(hx-8,hy-5,hx-2,hy-6);c.quadraticCurveTo(hx+5,hy-7,hx+12.5,hy-4);c.fill();}
  if(P.st==='rulos'){var cs=[[-10,-4,5],[-11,2,4.5],[-7,-10,5.2],[-1,-13,5.4],[5,-13,5],[10,-9,4.6],[12,-4,3.6],[-9,7,3.8]];
    for(var k=0;k<cs.length;k++){c.beginPath();c.arc(hx+cs[k][0],hy+cs[k][1],cs[k][2],0,7);c.fill();}
    c.fillStyle='rgba(255,255,255,.15)';c.beginPath();c.arc(hx+1,hy-14,2.4,0,7);c.fill();}
  // cara
  var ex1=hx+8.5, ex2=hx+0.6, ey=hy+0.5, blink=(Math.sin(t*1.3+ (id.length))>0.985);
  c.fillStyle='#fff';
  if(!blink){c.beginPath();c.ellipse(ex1,ey,2.8,3.4,0,0,7);c.fill();c.beginPath();c.ellipse(ex2,ey,2.3,3.2,0,0,7);c.fill();
    c.fillStyle='#2A1C14';c.beginPath();c.arc(ex1+0.8,ey+0.3,1.9,0,7);c.fill();c.beginPath();c.arc(ex2+0.8,ey+0.3,1.7,0,7);c.fill();
    c.fillStyle='#fff';c.beginPath();c.arc(ex1+1.4,ey-0.6,0.7,0,7);c.fill();c.beginPath();c.arc(ex2+1.3,ey-0.6,0.6,0,7);c.fill();}
  else{c.strokeStyle='#2A1C14';c.lineWidth=1.3;c.beginPath();c.moveTo(ex1-2.5,ey);c.lineTo(ex1+2.5,ey);c.moveTo(ex2-2,ey);c.lineTo(ex2+2,ey);c.stroke();}
  c.strokeStyle=shade(P.hair,0.1);c.lineWidth=1.4;c.lineCap='round';
  c.beginPath();c.moveTo(ex1-2.4,ey-5);c.lineTo(ex1+2.6,ey-5.6);c.moveTo(ex2-2,ey-5.4);c.lineTo(ex2+2.2,ey-5.6);c.stroke();
  if(P.st==='rulos'){c.strokeStyle='#2C3E50';c.lineWidth=1.3;c.beginPath();c.arc(ex1+0.4,ey,4.3,0,7);c.stroke();c.beginPath();c.arc(ex2+0.2,ey,3.8,0,7);c.stroke();
    c.beginPath();c.moveTo(ex2+4,ey-0.5);c.lineTo(ex1-3.9,ey-0.5);c.moveTo(ex2-3.6,ey-0.5);c.lineTo(hx-6,ey-1.5);c.stroke();}
  c.fillStyle=shade(P.skin,-0.12);c.beginPath();c.moveTo(hx+12,hy+1.5);c.quadraticCurveTo(hx+15.2,hy+4.5,hx+11.8,hy+5.6);c.fill();
  c.strokeStyle='#8A3B2E';c.lineWidth=1.4;c.beginPath();
  if(extra.dolor){c.arc(hx+8,hy+9.5,2.2,Math.PI*1.1,Math.PI*1.9);}else{c.arc(hx+8,hy+6.8,2.8,0.25,Math.PI-0.5);}c.stroke();
  c.fillStyle='rgba(232,87,74,.22)';c.beginPath();c.arc(hx+10.5,hy+4.5,2.4,0,7);c.fill();
  // brazo delantero
  var hA=limb(c,4,shY,arA,11,arA+(air?0.2:0.55),10.5,6.8,P.shirt,P.skin);
  c.fillStyle=P.skin;c.beginPath();c.arc(hA.x,hA.y,3.4,0,7);c.fill();
  c.restore();
}

/* ================== MOLÉCULAS (modelo de esferas, colores CPK) ================== */
var COL_AT={C:'#4B5159',O:'#E2483C',H:'#F3F5F7'};
var R_AT={C:7,O:7.6,H:4.6};
function atomo(c,x,y,el,k,ak){var r=R_AT[el]*k*(ak||1),col=COL_AT[el];
  var g=c.createRadialGradient(x-r*0.38,y-r*0.42,r*0.12,x,y,r);
  g.addColorStop(0,shade(col,el==='H'?0:0.55));g.addColorStop(0.45,col);g.addColorStop(1,shade(col,el==='H'?-0.28:-0.45));
  c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,7);c.fill();
  c.strokeStyle='rgba(0,0,0,.18)';c.lineWidth=0.8;c.stroke();}
function enlace(c,x1,y1,x2,y2,k,dbl){c.strokeStyle='#C9CED6';c.lineCap='round';
  if(dbl){var dx=y2-y1,dy=x1-x2,l=Math.sqrt(dx*dx+dy*dy)||1;dx*=2.2*k/l;dy*=2.2*k/l;c.lineWidth=1.8*k;
    c.beginPath();c.moveTo(x1+dx,y1+dy);c.lineTo(x2+dx,y2+dy);c.moveTo(x1-dx,y1-dy);c.lineTo(x2-dx,y2-dy);c.stroke();}
  else{c.lineWidth=2.6*k;c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();}}
/* geometrías: [elemento,x,y] y enlaces [i,j,doble] */
var MOL={
  h2o:{at:[['O',0,-2],['H',-8.6,5.2],['H',8.6,5.2]],en:[[0,1],[0,2]],nom:'agua',f:'H2O'},
  co2:{at:[['C',0,0],['O',-15,0],['O',15,0]],en:[[0,1,1],[0,2,1]],nom:'dióxido de carbono',f:'CO2'},
  o2:{at:[['O',-7,0],['O',7,0]],en:[[0,1,1]],nom:'oxígeno',f:'O2'},
  glu:(function(){ // anillo de glucosa (5 C + 1 O) con grupos -OH y -CH2OH
    var at=[],en=[],R=20;var ang=[-60,0,60,120,180,240];var els=['O','C','C','C','C','C'];
    for(var i=0;i<6;i++){var a=ang[i]*Math.PI/180;at.push([els[i],Math.cos(a)*R,Math.sin(a)*R*0.82]);}
    for(i=0;i<6;i++)en.push([i,(i+1)%6]);
    function sub(ci,dx,dy,tipo){var b=at[ci];var o=at.length;
      if(tipo==='OH'){at.push(['O',b[1]+dx,b[2]+dy]);at.push(['H',b[1]+dx*1.55,b[2]+dy*1.55]);en.push([ci,o]);en.push([o,o+1]);}
      else if(tipo==='H'){at.push(['H',b[1]+dx*0.75,b[2]+dy*0.75]);en.push([ci,o]);}
      else{at.push(['C',b[1]+dx,b[2]+dy]);at.push(['O',b[1]+dx*1.9,b[2]+dy*1.5]);at.push(['H',b[1]+dx*2.6,b[2]+dy*1.9]);en.push([ci,o]);en.push([o,o+1]);en.push([o+1,o+2]);}}
    sub(1,15,6,'OH');sub(2,7,15,'OH');sub(3,-7,15,'OH');sub(4,-15,6,'OH');sub(5,-8,-14,'CH2OH');
    sub(1,9,-13,'H');sub(2,14,-4,'H');sub(3,-14,-4,'H');sub(4,-13,-11,'H');
    return {at:at,en:en,nom:'glucosa',f:'C6H12O6',ak:0.72};})(),
  frag:{at:[['C',-14,0],['C',0,0],['C',14,0],['O',-22,-11],['O',-22,11],['H',-31,15],['O',0,-15],['H',21,-8],['H',23,7],['H',13,13]],en:[[0,1],[1,2],[0,3,1],[0,4],[4,5],[1,6,1],[2,7],[2,8],[2,9]],nom:'fragmento de glucosa',f:'',ak:0.85}
};
function dibujarMol(c,tipo,x,y,k,rot){var M=MOL[tipo];k=k||1;c.save();c.translate(x,y);if(rot)c.rotate(rot);
  var i,a,b;for(i=0;i<M.en.length;i++){a=M.at[M.en[i][0]];b=M.at[M.en[i][1]];enlace(c,a[1]*k,a[2]*k,b[1]*k,b[2]*k,k,M.en[i][2]);}
  var ord=M.at.map(function(v,j){return j;});ord.sort(function(p,q){return R_AT[M.at[p][0]]-R_AT[M.at[q][0]];});
  if(tipo==='glu'||tipo==='frag')ord=M.at.map(function(v,j){return j;});
  for(i=0;i<ord.length;i++){a=M.at[ord[i]];atomo(c,a[1]*k,a[2]*k,a[0],k,M.ak);}
  c.restore();}
/* fórmula con subíndices: los dígitos se escriben como subíndice */
function formula(c,txt,x,y,px,col,align){c.save();c.fillStyle=col||'#22313B';c.textBaseline='alphabetic';
  var w=0,i,ch,big='600 '+px+'px Fredoka, Nunito, sans-serif',sm='600 '+Math.round(px*0.62)+'px Fredoka, Nunito, sans-serif';
  for(i=0;i<txt.length;i++){ch=txt[i];c.font=/[0-9]/.test(ch)?sm:big;w+=c.measureText(ch).width;}
  var cx=align==='left'?x:x-w/2;
  for(i=0;i<txt.length;i++){ch=txt[i];var d=/[0-9]/.test(ch);c.font=d?sm:big;c.fillText(ch,cx,y+(d?px*0.22:0));cx+=c.measureText(ch).width;}
  c.restore();return w;}
function etiqueta(c,txt,x,y,px,fondo){c.save();c.font='800 '+px+'px Nunito, sans-serif';var w=c.measureText(txt).width+px*1.1;
  c.fillStyle=fondo||'rgba(255,255,255,.88)';rr(c,x-w/2,y-px*0.95,w,px*1.5,px*0.7);c.fill();
  c.fillStyle='#22313B';c.textAlign='center';c.fillText(txt,x,y+px*0.2);c.restore();}
/* íconos de moléculas como imagen (para HUD y modales) */
var ICO={};
function iconoMol(tipo){if(ICO[tipo])return ICO[tipo];var k=document.createElement('canvas');k.width=k.height=120;var c=k.getContext('2d');
  var esc={h2o:3.4,co2:2.7,o2:3.6,glu:1.75,frag:2.0}[tipo]||2;dibujarMol(c,tipo,60,62,esc);ICO[tipo]=k.toDataURL();return ICO[tipo];}
function icoLuz(){if(ICO.luz)return ICO.luz;var k=document.createElement('canvas');k.width=k.height=120;var c=k.getContext('2d');
  var g=c.createRadialGradient(60,60,6,60,60,56);g.addColorStop(0,'#FFF8D0');g.addColorStop(0.45,'#FFD24A');g.addColorStop(1,'rgba(255,196,61,0)');
  c.fillStyle=g;c.beginPath();c.arc(60,60,56,0,7);c.fill();c.strokeStyle='#F0A800';c.lineWidth=6;c.lineCap='round';
  for(var i=0;i<8;i++){var a=i*Math.PI/4;c.beginPath();c.moveTo(60+Math.cos(a)*30,60+Math.sin(a)*30);c.lineTo(60+Math.cos(a)*48,60+Math.sin(a)*48);c.stroke();}
  c.fillStyle='#FFC43D';c.beginPath();c.arc(60,60,22,0,7);c.fill();ICO.luz=k.toDataURL();return ICO.luz;}
function icoEnergia(){if(ICO.en)return ICO.en;var k=document.createElement('canvas');k.width=k.height=120;var c=k.getContext('2d');
  var g=c.createRadialGradient(60,60,4,60,60,56);g.addColorStop(0,'rgba(255,240,170,1)');g.addColorStop(1,'rgba(255,190,60,0)');c.fillStyle=g;c.beginPath();c.arc(60,60,56,0,7);c.fill();
  c.fillStyle='#FFB020';c.strokeStyle='#C27A00';c.lineWidth=4;c.beginPath();c.moveTo(66,14);c.lineTo(34,66);c.lineTo(58,66);c.lineTo(50,106);c.lineTo(86,50);c.lineTo(62,50);c.closePath();c.fill();c.stroke();
  ICO.en=k.toDataURL();return ICO.en;}
function icoClorofila(){if(ICO.clo)return ICO.clo;var k=document.createElement('canvas');k.width=k.height=120;var c=k.getContext('2d');
  c.save();c.translate(60,60);c.rotate(-0.4);var g=c.createLinearGradient(0,-30,0,30);g.addColorStop(0,'#7CD36A');g.addColorStop(1,'#2E8A48');c.fillStyle=g;c.beginPath();c.ellipse(0,0,48,28,0,0,7);c.fill();
  c.strokeStyle='#1F6B44';c.lineWidth=3;c.stroke();for(var i=-2;i<=2;i++){c.fillStyle='#3FA65A';rr(c,i*16-6,-14,12,28,4);c.fill();c.strokeStyle='#22713F';c.lineWidth=1.5;for(var j=-1;j<=1;j++){c.beginPath();c.moveTo(i*16-6,j*7);c.lineTo(i*16+6,j*7);c.stroke();}}
  c.restore();ICO.clo=k.toDataURL();return ICO.clo;}

/* SVG de íconos de interfaz */
var SVG={
  cor:'<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.2 0 3.6 1.3 5.3 3.2 1.7-1.9 3.1-3.2 5.3-3.2 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z" fill="#E8574A" stroke="#B83A2E" stroke-width="1.2"/><ellipse cx="8" cy="9" rx="2" ry="1.3" fill="#fff" opacity=".6"/></svg>',
  corV:'<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.2 0 3.6 1.3 5.3 3.2 1.7-1.9 3.1-3.2 5.3-3.2 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z" fill="#E7DCCB" stroke="#CDBFA6" stroke-width="1.2"/></svg>',
  est:'<svg viewBox="0 0 24 24"><path d="M12 2l3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21.1l1.4-7L2 9.3l7-.8z" fill="#FFC43D" stroke="#C98A00" stroke-width="1.2"/></svg>',
  estV:'<svg viewBox="0 0 24 24"><path d="M12 2l3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21.1l1.4-7L2 9.3l7-.8z" fill="#EFE6D6" stroke="#CDBFA6" stroke-width="1.2"/></svg>',
  son:'<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z" fill="#22313B"/><path d="M16 8.5c1.3 1 2 2.2 2 3.5s-.7 2.5-2 3.5M18.5 6c2 1.6 3 3.6 3 6s-1 4.4-3 6" stroke="#22313B" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
  sonNo:'<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z" fill="#22313B"/><path d="M16.5 9l5 6M21.5 9l-5 6" stroke="#E0704A" stroke-width="2.4" stroke-linecap="round"/></svg>',
  tilde:'<svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="#fff" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  candado:'<svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="11" rx="3" fill="#8C9AA3"/><path d="M8 10V7.5a4 4 0 018 0V10" stroke="#8C9AA3" stroke-width="2.6" fill="none"/></svg>',
  flecha:'<svg viewBox="0 0 90 20"><path d="M2 10h80" stroke="#22313B" stroke-width="3" stroke-linecap="round"/><path d="M74 3l10 7-10 7" stroke="#22313B" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  teclas:'<svg viewBox="0 0 200 130"><g font-family="Fredoka,Nunito" font-weight="600" text-anchor="middle"><rect x="72" y="6" width="56" height="54" rx="10" fill="#fff" stroke="#22313B" stroke-width="4"/><path d="M100 20l-13 15h26z" fill="#2E9E5B"/><text x="100" y="54" font-size="12" fill="#22313B">saltar</text><rect x="8" y="68" width="56" height="54" rx="10" fill="#fff" stroke="#22313B" stroke-width="4"/><path d="M24 95l15-13v26z" fill="#E0704A"/><rect x="72" y="68" width="56" height="54" rx="10" fill="#F3EDE2" stroke="#22313B" stroke-width="4"/><rect x="136" y="68" width="56" height="54" rx="10" fill="#fff" stroke="#22313B" stroke-width="4"/><path d="M176 95l-15-13v26z" fill="#E0704A"/></g></svg>'
};
