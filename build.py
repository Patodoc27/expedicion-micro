import base64,os
d=os.path.dirname(os.path.abspath(__file__))
r=lambda p:open(os.path.join(d,p),encoding='utf-8').read()
b64=lambda p:base64.b64encode(open(os.path.join(d,p),'rb').read()).decode()
js='\n'.join(r('src/'+f) for f in ['a_art.js','b_motor.js','c_fotos.js','d_resp.js','e_ui.js'])
h=r('src/shell.html').replace('__FREDOKA__',b64('fredoka.woff2')).replace('__NUNITO__',b64('nunito.woff2')).replace('__BODY__',r('src/body.html')).replace('__JS__',js)
open(os.path.join(d,'index.html'),'w',encoding='utf-8').write(h);print(len(h))
