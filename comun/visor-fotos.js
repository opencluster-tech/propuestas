/* ===========================================================================
   VISOR DE FOTOS EN GRANDE para la ficha de producto («Ver la ficha», ventana .fx)
   ---------------------------------------------------------------------------
   Rayen, 13-nov-2026: en todas las propuestas de salas, la foto grande de la
   ficha y sus miniaturas se tocan y se ven en grande (casi toda la pantalla).
   Se cierra tocando fuera, con «Cerrar» (X) o con Escape; con varias fotos se
   pasa con las flechas (pantalla y teclado) o deslizando el dedo.
   Es el mismo visor (.gx) de la propuesta de productos de CORESAM
   (gen_propuesta_productos.js), con los mismos colores y botones (z-index sobre la píldora de versión).
   Cada página lo carga con  <script src="../comun/visor-fotos.js"></script>
   No toca nada de la ficha: solo escucha los toques sobre .fx-foto y .fx-mini.
   =========================================================================== */
(function(){
  if (window.__visorFotosFicha) return;
  window.__visorFotosFicha = true;

  var CSS =
    '.fx .fx-foto img,.fx .fx-mini button{cursor:zoom-in}' +
    '.ocvf{position:fixed;inset:0;z-index:9998;background:rgba(4,10,28,.9);display:flex;align-items:center;justify-content:center;padding:56px 64px}' +
    '.ocvf[hidden]{display:none}' +
    '.ocvf-fig{margin:0;display:flex;flex-direction:column;align-items:center;gap:10px;max-width:100%;max-height:100%}' +
    '.ocvf-fig img{display:block;height:calc(100vh - 150px);width:auto;max-width:min(92vw,1100px);object-fit:contain;background:#fff;border-radius:4px;touch-action:pinch-zoom}' +
    '.ocvf-pie{display:flex;gap:14px;font-family:\'Montserrat\',system-ui,sans-serif;font-size:13px;color:#E6ECF7;text-align:center}' +
    '.ocvf-pie span:last-child{color:#9FB0CC;font-variant-numeric:tabular-nums;white-space:nowrap}' +
    '.ocvf button{position:absolute;display:flex;align-items:center;justify-content:center;gap:6px;border:1px solid rgba(255,255,255,.35);background:rgba(4,10,28,.55);color:#fff;font-family:\'Montserrat\',system-ui,sans-serif;font-size:12.5px;font-weight:700;border-radius:999px;cursor:pointer}' +
    '.ocvf button:hover{background:#08ACF2;border-color:#08ACF2}' +
    '.ocvf button:focus-visible{outline:2px solid #08ACF2;outline-offset:2px}' +
    '.ocvf button[hidden]{display:none}' +
    '.ocvf-x{top:14px;right:14px;padding:9px 16px}' +
    '.ocvf-ant,.ocvf-sig{top:50%;width:44px;height:44px;margin-top:-22px}' +
    '.ocvf-ant{left:12px}.ocvf-sig{right:12px}' +
    '.ocvf svg{width:20px;height:20px}' +
    '.ocvf-x svg{width:16px;height:16px}' +
    '@media(max-width:560px){' +
      '.ocvf{padding:56px 12px 70px}' +
      '.ocvf-fig img{width:calc(100vw - 24px);height:auto;max-height:calc(100vh - 176px)}' +
      '.ocvf-ant,.ocvf-sig{top:auto;bottom:14px;margin-top:0}' +
      '.ocvf-ant{left:calc(50% - 54px)}.ocvf-sig{right:calc(50% - 54px)}' +
    '}' +
    '@media print{.ocvf{display:none !important}}';

  var ICO_X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var ICO_ANT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
  var ICO_SIG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';

  var st = document.createElement('style');
  st.textContent = CSS;
  (document.head || document.documentElement).appendChild(st);

  var vf = null, vImg, vTit, vN, vAnt, vSig, vX;
  var lista = [], idx = 0, tit = '', volver = null;

  function crear(){
    if (vf) return;
    vf = document.createElement('div');
    vf.className = 'ocvf'; vf.hidden = true;
    vf.setAttribute('role', 'dialog'); vf.setAttribute('aria-modal', 'true'); vf.setAttribute('aria-label', 'Foto en grande');
    vf.innerHTML =
      '<figure class="ocvf-fig"><img alt=""><figcaption class="ocvf-pie"><span></span><span></span></figcaption></figure>' +
      '<button type="button" class="ocvf-x" aria-label="Cerrar">' + ICO_X + 'Cerrar</button>' +
      '<button type="button" class="ocvf-ant" aria-label="Foto anterior">' + ICO_ANT + '</button>' +
      '<button type="button" class="ocvf-sig" aria-label="Foto siguiente">' + ICO_SIG + '</button>';
    document.body.appendChild(vf);
    vImg = vf.querySelector('img');
    var sp = vf.querySelectorAll('.ocvf-pie span'); vTit = sp[0]; vN = sp[1];
    vX = vf.querySelector('.ocvf-x'); vAnt = vf.querySelector('.ocvf-ant'); vSig = vf.querySelector('.ocvf-sig');

    /* los toques dentro del visor no llegan a la ficha de abajo */
    vf.addEventListener('click', function(ev){
      ev.stopPropagation();
      var b = ev.target.closest ? ev.target.closest('button') : null;
      if (b === vX) return cerrar();
      if (b === vAnt){ idx--; mostrar(); return; }
      if (b === vSig){ idx++; mostrar(); return; }
      if (ev.target === vf || ev.target.classList.contains('ocvf-fig')) cerrar();
    });
    var tx = null, ty = 0;
    vf.addEventListener('touchstart', function(ev){
      if (ev.touches.length !== 1) { tx = null; return; }
      tx = ev.touches[0].clientX; ty = ev.touches[0].clientY;
    }, { passive: true });
    vf.addEventListener('touchend', function(ev){
      if (tx === null) return;
      var dx = ev.changedTouches[0].clientX - tx, dy = ev.changedTouches[0].clientY - ty; tx = null;
      if (lista.length < 2 || Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      idx += dx < 0 ? 1 : -1; mostrar();
    }, { passive: true });
  }

  function mostrar(){
    var n = lista.length; idx = (idx + n) % n;
    vImg.src = lista[idx]; vImg.alt = tit;
    vTit.textContent = tit; vN.textContent = n > 1 ? (idx + 1) + ' de ' + n : '';
    vAnt.hidden = vSig.hidden = n < 2;
  }

  function abrir(fotos, i, titulo){
    if (!fotos.length) return;
    crear();
    volver = document.activeElement;
    lista = fotos; idx = i; tit = titulo || '';
    mostrar();
    vf.hidden = false;
    try { vX.focus({ preventScroll: true }); } catch (e) {}
  }

  function cerrar(){
    if (!vf || vf.hidden) return;
    vf.hidden = true; vImg.removeAttribute('src');
    if (volver && volver.focus) try { volver.focus({ preventScroll: true }); } catch (e) {}
  }

  function fotosDeFicha(caja){
    var b = caja.querySelectorAll('.fx-mini [data-foto]');
    if (b.length) return [].map.call(b, function(x){ return x.getAttribute('data-foto'); });
    var img = caja.querySelector('.fx-foto img');
    return img ? [img.getAttribute('src')] : [];
  }
  function tituloDe(caja){ var h = caja.querySelector('.fx-n'); return h ? h.textContent.trim() : ''; }

  /* fase de captura: corre antes que la ficha, sin cortarle nada (la miniatura sigue cambiando la foto grande) */
  document.addEventListener('click', function(ev){
    var t = ev.target;
    if (!t || !t.closest || (vf && vf.contains(t))) return;
    var caja = t.closest('.fx');
    if (!caja) return;
    var mini = t.closest('.fx-mini [data-foto]');
    var grande = !mini && t.closest('.fx-foto img');
    if (!mini && !grande) return;
    var fotos = fotosDeFicha(caja), i = 0;
    if (mini) i = Math.max(0, fotos.indexOf(mini.getAttribute('data-foto')));
    else {
      var act = caja.querySelector('.fx-mini [aria-current="true"]');
      i = act ? Math.max(0, fotos.indexOf(act.getAttribute('data-foto'))) : Math.max(0, fotos.indexOf(grande.getAttribute('src')));
    }
    abrir(fotos, i, tituloDe(caja));
  }, true);

  /* con el visor abierto, Escape cierra solo el visor (la ficha queda abierta) */
  window.addEventListener('keydown', function(ev){
    if (!vf || vf.hidden) return;
    if (ev.key === 'Escape'){ ev.preventDefault(); ev.stopImmediatePropagation(); cerrar(); }
    else if (ev.key === 'ArrowLeft' && lista.length > 1){ ev.preventDefault(); ev.stopImmediatePropagation(); idx--; mostrar(); }
    else if (ev.key === 'ArrowRight' && lista.length > 1){ ev.preventDefault(); ev.stopImmediatePropagation(); idx++; mostrar(); }
  }, true);
})();
