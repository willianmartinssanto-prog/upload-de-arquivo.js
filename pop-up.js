<script>
(function(){ if(window.MB_UI) return; window.MB_UI = 1;

window.MB_createUI = function(){
  const wrap = document.createElement("div");
  wrap.id = "mockupPopup";
  wrap.innerHTML = `
  <div class="mockup-overlay">
    <div class="mockup-content">
      <span class="mockup-close">&times;</span>

      <h2 class="mockup-title">Monte seu Mockup</h2>
      <p class="mockup-subtitle">Arraste, redimensione e posicione sua logo</p>
      <hr class="mockup-divider"/>

            <div class="mockup-carousel-wrapper">
        <button class="carousel-btn" id="prevBtn" aria-label="Anterior">‹</button>
        <div class="mockup-thumbs" id="mockupThumbs"></div>
        <button class="carousel-btn" id="nextBtn" aria-label="Próximo">›</button>
      </div>

            <div class="mockup-grid">
        <div class="canvas-col">
          <div class="canvas-wrap">
            <canvas id="mockupCanvas" width="500" height="500"></canvas>
          </div>
        </div>

        <div class="controls-col">
          <div class="mockup-controls">
            <div class="ctrl-group">
              <label for="op"><strong>Opacidade</strong> <span id="opv">100%</span></label>
              <input type="range" id="op" min="20" max="100" value="100" step="1"/>
            </div>

            <div class="ctrl-group">
              <label><strong>Contorno</strong></label>
              <div class="row-wrap">
                <label class="switch"><input type="checkbox" id="olOn"><span class="slider"></span></label>
                <input type="color" id="olC" value="#000000"/>
                <input type="range" id="olS" min="0" max="20" value="6" step="1"/>
              </div>
            </div>

            <div class="ctrl-group">
              <label><strong>Filtros</strong></label>
              <div class="row-wrap">
                <div class="range-col">
                  <label for="br">Brilho <span id="bv">0</span></label>
                  <input type="range" id="br" min="-100" max="100" value="0" step="1"/>
                </div>
                <div class="range-col">
                  <label for="ct">Contraste <span id="cv">0</span></label>
                  <input type="range" id="ct" min="-100" max="100" value="0" step="1"/>
                </div>
              </div>
            </div>

            <div class="ctrl-group">
              <label><strong>Comparar fundo</strong></label>
              <div class="row-wrap">
                <label class="switch" title="Exibir sem fundo"><input type="checkbox" id="nb"><span class="slider"></span></label>
                <span id="nbt">Exibir COM fundo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

            <div class="mockup-actions">
        <input type="file" id="fi" accept="image/*" style="display:none"/>
        <button id="chg" class="btn-outline">🔄 Trocar Logo</button>
        <button id="rmv" class="btn-outline">🧹 Remover Fundo</button>
        <button id="del" class="btn-outline">🗑️ Remover Logo</button>
        <button id="sav" class="btn-primary">💾 Salvar Mockup</button>
      </div>
    </div>
  </div>`;

  return wrap;
};

/* Stub seguro: se a lógica ainda não estiver pronta, guarda o pedido */
if (typeof window.abrirMockupPopup !== "function"){
  window.abrirMockupPopup = function(logoUrl, storageKey, obj){
    window.__MB_PENDING_OPEN = { logoUrl, storageKey, obj: obj || null };
  };
}
})();
</script>
