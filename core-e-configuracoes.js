<script>
(function(){if(window.MB_CORE)return;window.MB_CORE=1;
/* === CONFIG (preservado) === */
const targetProduct="avental em tecido 100% poliéster c/ 1 bolso várias cores - personalizado com sua logo";
const cloudName="dckwn4y2a",uploadPreset="mdecoracoes";
const BG_REMOVAL_MODE="cloudinary",BG_API_ENDPOINT="https://api.remove.bg/v1.0/removebg",BG_API_KEY="SUA_CHAVE_AQUI";
const CLOUDINARY_BG_EFFECT="e_bgremoval",SERVER_COMPOSE_BASE_W=800;

/* === HELPERS (preservados) === */
function normalizeKey(s){return s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9\s]/g,"").trim().replace(/\s+/g,"_").toLowerCase()}
function waitForElement(sel,cb){const el=document.querySelector(sel);if(el)return cb(el);const mo=new MutationObserver(()=>{const e=document.querySelector(sel);if(e){mo.disconnect();cb(e)}});mo.observe(document.body,{childList:!0,subtree:!0})}
function getCloudinaryFetchUrl(u,w=800){return`https://res.cloudinary.com/${cloudName}/image/fetch/f_auto,q_auto,w_${w}/${encodeURIComponent(u)}`}
function showToast(msg,type="success"){const t=document.createElement("div");t.className=`mockup-toast ${type}`,t.textContent=msg,document.body.appendChild(t),setTimeout(()=>t.classList.add("show"),50),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.remove(),300)},3000)}
async function uploadBlobToCloudinary(blob,filename="file.png"){const fd=new FormData(),file=new File([blob],filename,{type:blob.type||"image/png"});fd.append("file",file),fd.append("upload_preset",uploadPreset);const r=await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,{method:"POST",body:fd});const d=await r.json();if(!d.secure_url)throw new Error("Cloudinary upload failed: "+JSON.stringify(d));return d}
async function uploadUrlToCloudinary(fileUrl,publicId){const fd=new FormData();fd.append("file",fileUrl),fd.append("upload_preset",uploadPreset),publicId&&fd.append("public_id",publicId);const r=await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,{method:"POST",body:fd});const d=await r.json();if(!d.secure_url)throw new Error("Cloudinary URL upload failed: "+JSON.stringify(d));return d}
async function callExternalBgRemoval(imageUrl){const f=new FormData();f.append("image_url",imageUrl),f.append("size","auto"),f.append("format","png");const r=await fetch(BG_API_ENDPOINT,{method:"POST",headers:{"X-Api-Key":BG_API_KEY},body:f});if(!r.ok){const text=await r.text();throw new Error("External BG removal failed: "+text)}return await r.blob()}
async function removeBackgroundAndReturnAsset(originalData){const originalUrl=originalData.secure_url;if(BG_REMOVAL_MODE==="cloudinary"){const transformed=`https://res.cloudinary.com/${cloudName}/image/fetch/${CLOUDINARY_BG_EFFECT}/${encodeURIComponent(originalUrl)}`,out=await uploadUrlToCloudinary(transformed);return{secure_url:out.secure_url,public_id:out.public_id}}if(BG_REMOVAL_MODE==="external"){const bgBlob=await callExternalBgRemoval(originalUrl),out=await uploadBlobToCloudinary(bgBlob,"logo-no-bg.png");return{secure_url:out.secure_url,public_id:out.public_id}}return{secure_url:originalUrl,public_id:originalData.public_id||null}}
function buildServerComposeUrl(baseOriginalUrl,logoUrl,logoState,outW=SERVER_COMPOSE_BASE_W){const scale=outW/500,wOverlay=Math.round(logoState.scaledWidth*scale),x=Math.round(logoState.left*scale),y=Math.round(logoState.top*scale),a=Math.round(logoState.angle||0);const base=`https://res.cloudinary.com/${cloudName}/image/fetch/f_auto,q_auto,w_${outW}/${encodeURIComponent(baseOriginalUrl)}`,overlay=`/l_fetch:${encodeURIComponent(logoUrl)}/w_${wOverlay},g_north_west,x_${x},y_${y}${a?(",a_"+a):""}`;return base+overlay}

/* === EXPORT === */
window.MockupBuilder=Object.assign(window.MockupBuilder||{},{
 config:{targetProduct,cloudName,uploadPreset,BG_REMOVAL_MODE,BG_API_ENDPOINT,BG_API_KEY,CLOUDINARY_BG_EFFECT,SERVER_COMPOSE_BASE_W},
 helpers:{normalizeKey,waitForElement,getCloudinaryFetchUrl,showToast,uploadBlobToCloudinary,uploadUrlToCloudinary,removeBackgroundAndReturnAsset,buildServerComposeUrl}
});
})();
</script>
