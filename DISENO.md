# Expedición Micro — notas de diseño (para continuar)
Archivos: src/shell.html (CSS, placeholders __FREDOKA__ __NUNITO__ __BODY__ __JS__), src/body.html, src/a_art.js (PJ, dibujarPJ, MOL, dibujarMol, formula, iconoMol, icoLuz, icoEnergia, icoClorofila, SVG), src/b_motor.js (ST, guardar, sfx, ajustar, input K/jBuf, JG, iniciarNivel(id), paso, dibujar, HUD pintarEcu/pintarObj/toast, ESTILO{}).
Falta: c_niveles.js (NIV.F1..F4, R1..R3 + ESTILO.* + fondos), d_ui.js (inicio, mapa SVG, modales intro/quiz/faro/completado/perdiste/pausa, final, completar(), perdiste(), pausar()), build.py -> index.html.
Def de nivel (NIV.X(VW,VH) devuelve): isla 'F'|'R', nombre, W,H, vertical?, fondo(c,L,cam) (coords pantalla), detras/encima(c,L) (mundo), frente(c,L,cam), plat[{x,y,w,h,t:'solid'|'one',st,mv:{ax,ay,per,ph,cond}}], items[{x,y,tp}], peligros[{caja(h),update(h,dt,L),dibujar(c,h,L),msg,pisable}], zonas[{x,y,w,h,f,max,dibujar}], cps[{x,y}], inicio{x,y}, meta{x,y,w,h}, metaOK(L)->true|msg, alLlegar(L,P) (anim y luego completar()), dibMeta, eq{...}, cola0[], datos{tp:texto toast}, objetivo(L)->html, update(L,dt,P), intro{...}, quiz[...]
Reglas rigor: sin frutas; moléculas modelo esferas+fórmula; luz y clorofila SOBRE la flecha (no se cuentan); respiración todo el tiempo con luz y sin luz, en todos los seres vivos (también plantas); nunca día/noche; "fabrica materia orgánica a partir de materia inorgánica"; "hidratos de carbono"; nota de escala (moléculas agrandadas); español neutro con tú (sin voseo), botones en infinitivo.
Niveles:
F1 Raíz/suelo (horizontal): 6 H2O, granos de suelo, 4 nematodos patrullan (pisables, quitan corazón), meta pelo absorbente.
F2 Xilema (vertical, ancho 1280): anillos/placas, corriente ascendente (transpiración), 9 burbujas de aire (embolia) dañan; cola 6 H2O; meta arriba -> hoja.
F3 Hoja (horizontal 720 alto): epidermis sup techo, células empalizada, esponjoso plataformas, epidermis inferior con estomas que abren/cierran (ventana abierta ~3.2s cada 6.5s); CO2 entra por estomas abiertos y se "difunde" si no se atrapa en 13s; 6 CO2; meta cloroplasto.
F4 Cloroplasto: granas plataformas, haces de luz se mueven; activar 3 granas parado bajo luz; 5 moléculas reactivas (radicales) patrullan piso y granas; luego zona de armado en estroma -> glucosa + 6 O2 (O2 sale por estomas).
R1 Citoplasma: 1 glucosa + 6 O2 (entra por membrana), 3 lisosomas patrullan; puerta mitocondria: glucosa se parte en 2 fragmentos.
R2 Mitocondria: crestas; 2 puestos de reacción: cada fragmento + 3 O2 -> 3 CO2 + 3 H2O + energía; 4 pulsos de calor liberado dañan (activos 1.2s cada 4.2s); energía activa ascensor.
R3 Citoplasma/membrana: usar energía en 3 actividades (transportar sustancias -> abre compuerta, moverse -> plataforma motor, fabricar/reparar -> puente), 2 vesículas transportadoras patrullan rápido; salir con CO2 por la membrana.
Quiz 2 por nivel (+50 c/u). Faro por isla: armar ecuación (+150). Final: certificado, rango, comparación islas.
Inicio: nombre, apellido, sección A/B, 4 personajes (Killa, Sofía, Inti, Mateo). localStorage expedicion-micro-v1, ?libre.
Publicar: repo nuevo Patodoc27/expedicion-micro con Pages (PAT secret:personal:GITHUB_PAT_PATODOC27).

## Estado (actualizar)
- HECHO: shell.html, body.html, a_art.js (probado visualmente con test_art.html: personajes y moléculas OK), b_motor.js, c_fotos.js (F1-F4 escritos, SIN probar aún).
- F4 usa L.fx con f.dib; completar() se llama desde alLlegar; ESTILO.pared vacío (paredes de F2 se dibujan en encima()).
- HECHO d_resp.js, e_ui.js (TXT, FARO, mapa, modales, final, táctil, arranque) y build.py (python3 build.py -> index.html). PENDIENTE: probar con ~/work/tools (playwright-core) y publicar.
- Quizzes/intro por nivel: ponerlos en e_ui.js en un objeto TXT[id]={intro,quiz}.
- Probado (shots/ con ~/work/tools/t1.js y t2.js): inicio, mapa, intro, 7 niveles sin errores JS. Ajustes hechos: cámara +60 en niveles horizontales (ecu tapaba el piso), inicio x=300 (botones táctiles tapaban), piso R3 unificado.
- PUBLICADO: repo nuevo Patodoc27/expedicion-micro, Pages activo en https://patodoc27.github.io/expedicion-micro/ (200 OK). Commit 70cdecf.
