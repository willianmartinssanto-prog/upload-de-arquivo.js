<script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.2.4/fabric.min.js"></script>
<script>
(function(){if(window.MB_LOGIC)return;window.MB_LOGIC=1;
const CFG=(window.MockupBuilder&&window.MockupBuilder.config)||{},H=(window.MockupBuilder&&window.MockupBuilder.helpers)||{};
const cloudName=CFG.cloudName||"dckwn4y2a",uploadPreset=CFG.uploadPreset||"mdecoracoes",CLOUDINARY_BG_EFFECT=CFG.CLOUDINARY_BG_EFFECT||"e_background_removal";
function toast(t,type="success"){const n=document.createElement("div");n.className=`mockup-toast ${type}`,n.textContent=t,document.body.appendChild(n),setTimeout(()=>n.classList.add("show"),30),setTimeout(()=>{n.classList.remove("show"),setTimeout(()=>n.remove(),300)},3000)}
function cldFetch(u,w){const base=`https://res.cloudinary.com/${cloudName}/image/fetch/`,tr=(w?`f_auto,q_auto,w_${w}/`:`f_auto,q_auto/`);return base+tr+encodeURIComponent(u)}
async function uploadBlob(b,name){const fd=new FormData();fd.append("file",b,name||"file.png"),fd.append("upload_preset",uploadPreset);const go=async()=>{const r=await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,{method:"POST",body:fd});const j=await r.json().catch(()=>null);if(!r.ok||!j||!j.secure_url)throw new Error("Upload falhou: "+(j&&j.error&&j.error.message||"status "+r.status));return j};try{return await go()}catch{return await go()}}
function buildNoBgUrl(u){try{const p=u.split("/upload/");if(p.length<2)return null;return p[0]+"/upload/"+CLOUDINARY_BG_EFFECT+"/"+p[1]}catch{return null}}
async function fileToBlobResized(file,maxDim){return new Promise((res,rej)=>{if(!/^image\//.test(file.type))return rej(new Error("Arquivo inválido"));const fr=new FileReader();fr.onerror=()=>rej(new Error("Falha leitura"));fr.onload=()=>{const im=new Image();im.onload=()=>{let W=im.width,H=im.height;if(maxDim&&Math.max(W,H)>maxDim){const w=W>H?maxDim:Math.round(maxDim*W/H),h=W>H?Math.round(maxDim*H/W):maxDim,cv=document.createElement("canvas"),cx=cv.getContext("2d");cv.width=w;cv.height=h;cx.drawImage(im,0,0,w,h);cv.toBlob(b=>b?res(b):rej(new Error("Blob falhou")),"image/jpeg",.92)}else fetch(fr.result).then(r=>r.blob()).then(res).catch(rej)},im.onerror=()=>rej(new Error("Falha imagem")),im.src=fr.result},fr.readAsDataURL(file)})}

/* ---------- fit do canvas: usa a coluna do canvas e respeita viewport; zoom<=1 ---------- */
function outerH(el){if(!el)return 0;const cs=getComputedStyle(el);return el.offsetHeight+parseFloat(cs.marginTop||0)+parseFloat(cs.marginBottom||0)}
function fitCanvasToContainer(canvas, ui){
  const content = ui.querySelector('.mockup-content')||ui;
  const canvasCol = ui.querySelector('.canvas-col');
  const cvEl = ui.querySelector('#mockupCanvas');
  if(!content||!canvasCol||!cvEl) return;

  // largura máxima = largura da coluna do canvas menos paddings internos
  const colW = Math.floor(canvasCol.getBoundingClientRect().width) - 4; // borda/padding já pequenos
  // altura livre dentro do content (92vh), descontando blocos fora do canvas
  const vhLimit = Math.floor(window.innerHeight*0.92);
  const blocks = [
    ui.querySelector('.mockup-title'),
    ui.querySelector('.mockup-subtitle'),
    ui.querySelector('.mockup-divider'),
    ui.querySelector('.mockup-carousel-wrapper'),
    ui.querySelector('.mockup-actions')
  ];
  // também subtrai a coluna de controles, pois o content tem rolagem, mas limitamos o canvas para não estourar
  const othersH = blocks.reduce((a,e)=>a+outerH(e),0) + 48; // folga
  const maxH = Math.max(260, vhLimit - othersH);

  // lado permitido para o canvas (quadrado)
  const allowed = Math.max(260, Math.min(colW, maxH));
  const z = Math.min(1, allowed/500);       // 500 = base lógica
  const side = Math.max(260, Math.round(500*z));

  canvas.setWidth(side);
  canvas.setHeight(side);
  canvas.setZoom(z);
  canvas.requestRenderAll();
}
function debounce(fn,delay=120){let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),delay)}}

/* ---------- abrirMockupPopup (resto igual, só chamando fitCanvasToContainer nos lugares certos) ---------- */
window.abrirMockupPopup=function(initialLogoUrl,storageKey,storedObj){
  const ui=window.MB_createUI();document.body.appendChild(ui);

  let ro=null,onWinResize=null;
  function closeUI(){try{ro&&ro.disconnect()}catch{} try{onWinResize&&window.removeEventListener('resize',onWinResize)}catch{} ui.remove()}

  ui.querySelector(".mockup-close").onclick=()=>closeUI();
  ui.querySelector(".mockup-overlay").onclick=e=>{if(e.target.classList.contains("mockup-overlay")) closeUI()};

  const matches=(document.documentElement.innerHTML.match(/https:\/\/cdn\.awsli\.com\.br\/2500x2500\/[^\s"']+/g)||[]);
  const uniq=[...new Set(matches)];
  if(!uniq.length){toast("❌ Sem imagens do produto","error");return}

  const canvas=new fabric.Canvas("mockupCanvas",{preserveObjectStacking:!0});
  // fit inicial + observers
  fitCanvasToContainer(canvas, ui);
  ro=new ResizeObserver(()=>fitCanvasToContainer(canvas, ui));
  ro.observe(ui.querySelector('.mockup-content')||ui);
  onWinResize=debounce(()=>fitCanvasToContainer(canvas, ui),120);
  window.addEventListener('resize', onWinResize);

  let logoObj=null,baseUrl=null,logoOriginal=null,logoNoBg=null,variant="original";
  const state={opacity:1,outlineEnabled:!1,outlineColor:"#000",outlineSize:6,brightness:0,contrast:0,targetWidth:180};

  if(storedObj){logoOriginal=storedObj.logo_original_url||storedObj.logo_url||initialLogoUrl||null;logoNoBg=storedObj.logo_nobg_url||null;variant=storedObj.logo_variant||"original"}
  else{logoOriginal=initialLogoUrl||null;logoNoBg=null;variant="original"}

  function setBase(url){
    canvas.setBackgroundImage(null,canvas.renderAll.bind(canvas));
    fabric.Image.fromURL(cldFetch(url,500),img=>{
      img.scaleToWidth(500);
      canvas.setBackgroundImage(img,()=>{canvas.renderAll();if(logoObj)canvas.bringToFront(logoObj);fitCanvasToContainer(canvas, ui)},{scaleX:500/img.width,scaleY:500/img.height});
    },{crossOrigin:"anonymous"})
  }
  function applyLook(){
    if(!logoObj)return;
    const b=state.brightness/100,c=state.contrast/100,f=[];
    b&&f.push(new fabric.Image.filters.Brightness({brightness:b}));
    c&&f.push(new fabric.Image.filters.Contrast({contrast:c}));
    logoObj.filters=f; logoObj.applyFilters();
    logoObj.set("opacity",state.opacity);
    state.outlineEnabled&&state.outlineSize>0 ? logoObj.set("shadow",{color:state.outlineColor,blur:Math.max(0,state.outlineSize-1),offsetX:0,offsetY:0}) : logoObj.set("shadow",null);
    canvas.requestRenderAll();
  }
  function addLogo(url){
    fabric.Image.fromURL(url,img=>{
      logoObj&&canvas.remove(logoObj);
      img.scaleToWidth(state.targetWidth);
      img.set({left:180,top:200,cornerStyle:"circle",transparentCorners:!1});
      canvas.add(img);canvas.setActiveObject(img);logoObj=img;applyLook();fitCanvasToContainer(canvas, ui);
    },{crossOrigin:"anonymous"})
  }

  const thumbs=document.getElementById("mockupThumbs");
  uniq.forEach((url,idx)=>{const t=document.createElement("img");t.src=cldFetch(url,140);t.className="mockup-thumb";if(idx===0){t.classList.add("active-thumb");baseUrl=url;setBase(url)}t.onclick=()=>{setBase(url);baseUrl=url;const act=thumbs.querySelector(".active-thumb");act&&act.classList.remove("active-thumb");t.classList.add("active-thumb")};thumbs.appendChild(t)});
  document.getElementById("prevBtn").onclick=()=>thumbs.scrollBy({left:-120,behavior:"smooth"});
  document.getElementById("nextBtn").onclick=()=>thumbs.scrollBy({left:120,behavior:"smooth"});

  // Controles (iguais)
  const op=document.getElementById("op"),opv=document.getElementById("opv");
  op.oninput=e=>{if(!logoObj)return;state.opacity=(parseInt(e.target.value,10)||100)/100;opv.textContent=(state.opacity*100)+"%";applyLook()};
  const olOn=document.getElementById("olOn"),olC=document.getElementById("olC"),olS=document.getElementById("olS");
  olOn.onchange=()=>{if(!logoObj)return;state.outlineEnabled=olOn.checked;applyLook()};
  olC.oninput=()=>{if(!logoObj)return;state.outlineColor=olC.value;applyLook()};
  olS.oninput=()=>{if(!logoObj)return;state.outlineSize=parseInt(olS.value,10)||0;applyLook()};
  const br=document.getElementById("br"),ct=document.getElementById("ct"),bv=document.getElementById("bv"),cv=document.getElementById("cv");
  br.oninput=e=>{if(!logoObj)return;state.brightness=parseInt(e.target.value,10)||0;bv.textContent=state.brightness;applyLook()};
  ct.oninput=e=>{if(!logoObj)return;state.contrast=parseInt(e.target.value,10)||0;cv.textContent=state.contrast;applyLook()};

  const nb=document.getElementById("nb"),nbt=document.getElementById("nbt");
  if(variant==="nobg"&&logoNoBg){nb.checked=!0;nbt.textContent="Exibir SEM fundo"}else{nb.checked=!1;nbt.textContent="Exibir COM fundo"}

  nb.onchange=async function(){
    if(!logoObj){toast("⚠️ Carregue uma logo","error");this.checked=!1;nbt.textContent="Exibir COM fundo";return}
    if(this.checked){
      if(logoNoBg){logoObj.setSrc(logoNoBg,applyLook,{crossOrigin:"anonymous"});nbt.textContent="Exibir SEM fundo"}
      else if(logoOriginal){
        toast("Removendo fundo...");
        const nobg=buildNoBgUrl(logoOriginal); if(!nobg){toast("Recurso indisponível","error");this.checked=!1;nbt.textContent="Exibir COM fundo";return}
        const ok=await fetch(nobg,{method:"HEAD"}).then(r=>r.ok).catch(()=>!1); if(!ok){toast("Falha ao gerar","error");this.checked=!1;nbt.textContent="Exibir COM fundo";return}
        logoNoBg=nobg; logoObj.setSrc(logoNoBg,applyLook,{crossOrigin:"anonymous"}); nbt.textContent="Exibir SEM fundo";
        let obj;try{obj=JSON.parse(localStorage.getItem(storageKey))||{}}catch{obj={}};obj.logo_nobg_url=logoNoBg;obj.logo_variant="nobg";obj.logo_original_url=logoOriginal||obj.logo_original_url||null;localStorage.setItem(storageKey,JSON.stringify(obj));toast("✅ Fundo removido!")
      }else{toast("⚠️ Sem logo original","error");this.checked=!1;nbt.textContent="Exibir COM fundo"}
    }else{
      if(logoOriginal){logoObj.setSrc(logoOriginal,applyLook,{crossOrigin:"anonymous"});nbt.textContent="Exibir COM fundo"}
      else{toast("⚠️ Sem logo original","error");this.checked=!0}
    }
    let obj2;try{obj2=JSON.parse(localStorage.getItem(storageKey))||{}}catch{obj2={}};obj2.logo_variant=this.checked?"nobg":"original";logoOriginal&&(obj2.logo_original_url=logoOriginal);logoNoBg&&(obj2.logo_nobg_url=logoNoBg);localStorage.setItem(storageKey,JSON.stringify(obj2));
  };

  // Trocar/Remover/Salvar (iguais) – chamam fitCanvasToContainer após mudar logo
  document.getElementById("chg").addEventListener("click",()=>document.getElementById("fi").click());
  document.getElementById("fi").addEventListener("change",async function(ev){
    const file=ev.target.files[0];if(!file)return;
    try{
      if(file.size>25*1024*1024)throw new Error("Máx 25MB"); if(!/^image\//.test(file.type))throw new Error("Selecione uma imagem");
      toast("Enviando...");
      const blob=await fileToBlobResized(file,2000),up=await uploadBlob(blob,"logo.jpg");
      if(!up.secure_url)throw new Error("Sem URL segura");
      const keep=logoObj?{left:logoObj.left,top:logoObj.top,scaleX:logoObj.scaleX,scaleY:logoObj.scaleY,angle:logoObj.angle,opacity:logoObj.opacity}:null;
      fabric.Image.fromURL(up.secure_url,img=>{logoObj&&canvas.remove(logoObj);keep?img.set(keep):(img.scaleToWidth(180),img.set({left:180,top:200}));img.set({cornerStyle:"circle",transparentCorners:!1});canvas.add(img);canvas.setActiveObject(img);logoObj=img;applyLook();fitCanvasToContainer(canvas, ui)},{crossOrigin:"anonymous"});
      logoOriginal=up.secure_url;logoNoBg=null;nb.checked=!1;nbt.textContent="Exibir COM fundo";
      let obj;try{obj=JSON.parse(localStorage.getItem(storageKey))||{}}catch{obj={}};obj.logo_original_url=logoOriginal;obj.logo_nobg_url=null;obj.logo_variant="original";localStorage.setItem(storageKey,JSON.stringify(obj));
      toast("✅ Logo trocada!")
    }catch(err){toast(err&&err.message?err.message:"Erro ao trocar","error")}
    finally{ev.target.value=""}
  });

  document.getElementById("rmv").addEventListener("click",async function(){
    if(!logoOriginal){toast("⚠️ Sem logo","error");return}
    toast("Removendo fundo...");
    const nobg=buildNoBgUrl(logoOriginal); if(!nobg){toast("Recurso indisponível","error");return}
    const ok=await fetch(nobg,{method:"HEAD"}).then(r=>r.ok).catch(()=>!1); if(!ok){toast("Falhou remover","error");return}
    logoNoBg=nobg; if(nb.checked){logoObj.setSrc(logoNoBg,applyLook,{crossOrigin:"anonymous"});nbt.textContent="Exibir SEM fundo"}
    let obj;try{obj=JSON.parse(localStorage.getItem(storageKey))||{}}catch{obj={}};obj.logo_nobg_url=logoNoBg;obj.logo_original_url=logoOriginal||obj.logo_original_url||null;obj.logo_variant=nb.checked?"nobg":"original";localStorage.setItem(storageKey,JSON.stringify(obj));
    toast("✅ Fundo removido!")
  });

  document.getElementById("del").addEventListener("click",function(){
    if(!logoObj){toast("⚠️ Nada para remover","error");return}
    canvas.remove(logoObj);logoObj=null;logoOriginal=null;logoNoBg=null;nb.checked=!1;nbt.textContent="Exibir COM fundo";
    let s=localStorage.getItem(storageKey);if(s){try{let o=JSON.parse(s)||{};delete o.logo_original_url;delete o.logo_nobg_url;o.logo_variant="original";localStorage.setItem(storageKey,JSON.stringify(o))}catch{localStorage.removeItem(storageKey)}}
    toast("🗑️ Removida!")
  });

  document.getElementById("sav").addEventListener("click",async function(){
    try{
      canvas.discardActiveObject();canvas.renderAll();
      const blob=await new Promise(res=>canvas.lowerCanvasEl.toBlob(res,"image/png"));
      if(!blob){toast("Erro gerar","error");return}
      const up=await uploadBlob(blob,"mockup.png");
      let obj;try{obj=JSON.parse(localStorage.getItem(storageKey))||{}}catch{obj={}}
      obj.mockup=up.secure_url; obj.logo_variant=nb.checked?"nobg":"original";
      logoOriginal&&(obj.logo_original_url=logoOriginal); logoNoBg&&(obj.logo_nobg_url=logoNoBg);
      localStorage.setItem(storageKey,JSON.stringify(obj));
      const previewUrl=up.secure_url+(up.secure_url.includes("?")?"&":"?")+"v="+Date.now();
      window.dispatchEvent(new CustomEvent("MB_MOCKUP_SAVED",{detail:{storageKey,url:previewUrl}}));
      toast("✅ Mockup salvo!"); setTimeout(()=>closeUI(),800)
    }catch(e){toast("Erro ao salvar","error")}
  });

  (function(){const start=(nb.checked&&logoNoBg)?logoNoBg:logoOriginal;start&&addLogo(start)})();
};

/* Abrir pendente, se houver */
if(window.__MB_PENDING_OPEN&&typeof window.abrirMockupPopup==="function"){
  const {logoUrl,storageKey,obj}=window.__MB_PENDING_OPEN;try{window.abrirMockupPopup(logoUrl,storageKey,obj)}finally{window.__MB_PENDING_OPEN=null}
}
})();
</script>
