/* Roda · Health Data Brasil (25/10/2026)
   O motor de giro compartilhado pela entrada (../site/) e pela Sistemática: um aro com N paradas em 360/N graus,
   a parada ativa sempre à direita (de frente para o painel), girando pelo caminho mais curto com rolagem, setas,
   arrasto ou clique. Nenhuma semântica mora aqui: as paradas vêm de quem chama (os quatro passos da convergência
   na entrada; as quatro camadas na Sistemática). Classes com prefixo rd- para não colidir com as cenas da Sistemática.
   API: HDBR.cria(el, opts) → { vai(i, imediato), repouso(), ativo(), theta() }
     paradas    [{ id, num, linhas:[a, b], cor, aberto, arco }]  nó i no ângulo i·360/N; nó 0 à direita
                arco = { cor, aberto, rotulo } descreve o arco que SAI do nó (ex.: a volta, tracejada, "↻ reuso")
     tamanho    "grande" (viewBox 800, nomes em duas linhas fora dos nós) | "dial" (viewBox 300, só os números)
     progresso  true: arco "já lido" do nó 0 ao ativo, e os nós anteriores marcados
     arcos      "cores": cada arco na cor do nó de origem | "neutro": todos no tom do aro
     centro     html (ou elemento) sobreposto ao centro, que não gira
     rolagem    elemento que recebe a rolagem (wheel); ausente = a rolagem não gira
     podeRolar  fn(e) → true quando a rolagem deve seguir normal (ex.: o painel ainda tem o que rolar)
     empilha    largura (px) abaixo da qual a rolagem não gira (a página passa a rolar)
     teclas     false desliga as setas
     ligado     fn() → false enquanto a roda deve ignorar rolagem e teclas (ex.: uma folha aberta por cima)
     repouso    true: há um estado sem parada acesa (Home e clique no centro vazio levam a ele)
     ao         fn(indice | null) chamado a cada mudança (null = repouso)
   Um nó "aberto" sai tracejado, e o arco que chega nele também: é a volta ainda por construir.
   Movimento: transição de transform no aro e nos rótulos; reduced-motion muda sem girar. */
window.HDBR = (function () {
  "use strict";
  var reduz = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches, cssPronto = false;
  function esc(s) { return String(s === null || s === undefined ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function garanteCss() {
    if (cssPronto || !document.head) return;
    cssPronto = true;
    var s = document.createElement("style");
    s.id = "hdbr-css";
    s.textContent = [
      ".rd{position:relative;aspect-ratio:1}",
      ".rd .rd-svg{width:100%;height:100%;display:block;touch-action:none;cursor:grab;user-select:none;overflow:visible}",
      ".rd .rd-svg:active{cursor:grabbing}",
      ".rd-orbita{fill:none;stroke:var(--rd-orbita,rgba(255,255,255,.16));stroke-width:1.5;stroke-dasharray:2 8;animation:rdGira 120s linear infinite}",
      ".rd-g,.rd-rot{transition:transform .8s cubic-bezier(.65,0,.3,1)}",
      ".rd-sem{transition:none!important}",
      ".rd-aro{fill:none;stroke:var(--rd-aro,rgba(255,255,255,.22));stroke-width:3}",
      ".rd-arco{fill:none;stroke-width:4;stroke-linecap:round;opacity:.92}",
      ".rd-arco.rd-neutro{stroke:var(--rd-aro,rgba(255,255,255,.22));stroke-width:3;opacity:1}",
      ".rd-prog{fill:none;stroke:var(--rd-prog,#0ea5e9);stroke-width:4.5;stroke-linecap:round}",
      ".rd-no{cursor:pointer;outline:none}",
      ".rd-no circle{fill:var(--rd-no,#16233a);stroke:var(--rd-no-borda,rgba(255,255,255,.5));stroke-width:2;transition:fill .3s,stroke .3s}",
      ".rd-no.rd-lido circle{stroke:var(--rd-prog,#0ea5e9)}",
      ".rd-no.rd-on circle{fill:var(--rd-on,#0ea5e9);stroke:var(--rd-on-borda,#fff);stroke-width:3}",
      ".rd-no:hover circle,.rd-no:focus-visible circle{stroke:var(--rd-on-borda,#fff)}",
      ".rd-no .rd-num{font-weight:800;fill:var(--rd-num,rgba(255,255,255,.85));pointer-events:none}",
      ".rd-no.rd-on .rd-num{fill:var(--rd-num-on,#0b1f3a)}",
      ".rd-no .rd-nome{font-weight:500;fill:var(--rd-nome,rgba(255,255,255,.62));pointer-events:none;letter-spacing:-.01em}",
      ".rd-no.rd-on .rd-nome{fill:var(--rd-nome-on,#fff);font-weight:700}",
      ".rd-no.rd-lido .rd-nome{fill:var(--rd-nome-lido,rgba(255,255,255,.8))}",
      ".rd-arco-rot{font-size:22px;font-weight:700;letter-spacing:.02em;pointer-events:none}",
      ".rd-arco-rot2{font-size:17px;font-weight:500;font-style:italic;opacity:.85}",
      ".rd-centro{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none}",
      ".rd-centro>*{pointer-events:auto}",
      "@keyframes rdGira{to{transform:rotate(360deg)}}",
      "@media (prefers-reduced-motion:reduce){.rd-g,.rd-rot,.rd-no circle{transition:none}.rd-orbita{animation:none}}"
    ].join("\n");
    document.head.appendChild(s);
  }

  function cria(el, o) {
    garanteCss();
    var P = o.paradas || [], N = P.length;
    if (!el || !N) return null;
    var grande = o.tamanho !== "dial";
    var VB = grande ? 800 : 300, CX = VB / 2, CY = VB / 2, R = grande ? 205 : 100, NR = grande ? 26 : 27, RL = R + NR + 79, PASSO = 360 / N;
    var fNum = grande ? 27 : 30, fNome = 23;
    function pol(a, r) { var t = a * Math.PI / 180; return [+(CX + r * Math.cos(t)).toFixed(2), +(CY + r * Math.sin(t)).toFixed(2)]; }
    function arco(a1, a2, r) { var p = pol(a1, r), q = pol(a2, r), g = (a2 - a1) % 360 > 180 ? 1 : 0; return "M" + p[0] + "," + p[1] + " A" + r + "," + r + " 0 " + g + " 1 " + q[0] + "," + q[1]; }
    var folga = (NR + 8) / R * 180 / Math.PI; /* graus que cada arco recua para não entrar no nó */
    el.classList.add("rd");
    var h = "<svg class='rd-svg' viewBox='0 0 " + VB + " " + VB + "' role='group' aria-label='" + esc(o.rotulo || "roda") + "'>";
    if (grande) h += "<circle class='rd-orbita' cx='" + CX + "' cy='" + CY + "' r='" + (R + 68) + "' style='transform-origin:" + CX + "px " + CY + "px'/>";
    h += "<g class='rd-g' style='transform-origin:" + CX + "px " + CY + "px'><circle class='rd-aro' cx='" + CX + "' cy='" + CY + "' r='" + R + "'/>";
    P.forEach(function (p, i) {
      var q = P[(i + 1) % N], a = p.arco || {}, corArco = a.cor || p.cor, cor = o.arcos === "cores" && corArco ? " stroke='" + corArco + "'" : "";
      h += "<path class='rd-arco" + (o.arcos === "cores" ? "" : " rd-neutro") + "' d='" + arco(PASSO * i + folga, PASSO * (i + 1) - folga, R) + "'" + cor + (q.aberto || a.aberto ? " stroke-dasharray='4 7'" : "") + "/>";
    });
    h += "<path class='rd-prog' d=''/>";
    P.forEach(function (p, i) {
      var c = pol(PASSO * i, R), l = pol(PASSO * i, RL), vars = p.cor ? " style='--rd-no-borda:" + p.cor + ";--rd-on:" + p.cor + "'" : "";
      h += "<g class='rd-no' data-i='" + i + "' tabindex='0' role='button' aria-label='" + esc((p.num ? p.num + " · " : "") + (p.linhas || []).join(" ")) + "'" + vars + ">" +
        "<circle cx='" + c[0] + "' cy='" + c[1] + "' r='" + NR + "'" + (p.aberto ? " stroke-dasharray='4 3'" : "") + "/>" +
        "<text class='rd-num' x='" + c[0] + "' y='" + (c[1] + fNum * 0.36).toFixed(1) + "' text-anchor='middle' font-size='" + fNum + "'>" + esc(p.num) + "</text>";
      if (grande && p.linhas && p.linhas.length) {
        h += "<g class='rd-rot' style='transform-origin:" + l[0] + "px " + l[1] + "px'><text class='rd-nome' x='" + l[0] + "' y='" + l[1] + "' text-anchor='middle' font-size='" + fNome + "'>" +
          "<tspan x='" + l[0] + "' dy='-4'>" + esc(p.linhas[0]) + "</tspan><tspan x='" + l[0] + "' dy='25'>" + esc(p.linhas[1] || "") + "</tspan></text></g>";
      }
      h += "</g>";
    });
    /* rótulos dos arcos (ex.: a volta), no meio do arco de saída, contra-girando como os nomes */
    if (grande) P.forEach(function (p, i) {
      var a = p.arco || {};
      if (!a.rotulo) return;
      var m = pol(PASSO * (i + 0.5), R + 52), ls = String(a.rotulo).split("\n");
      h += "<g class='rd-rot' style='transform-origin:" + m[0] + "px " + m[1] + "px'><text class='rd-arco-rot' x='" + m[0] + "' y='" + m[1] + "' text-anchor='middle' fill='" + (a.cor || p.cor || "") + "'>" +
        "<tspan x='" + m[0] + "' dy='-3'>" + esc(ls[0]) + "</tspan>" + (ls[1] ? "<tspan class='rd-arco-rot2' x='" + m[0] + "' dy='22'>" + esc(ls[1]) + "</tspan>" : "") + "</text></g>";
    });
    h += "</g></svg><div class='rd-centro'></div>";
    el.innerHTML = h;
    var svg = el.querySelector(".rd-svg"), g = el.querySelector(".rd-g"), prog = el.querySelector(".rd-prog"), centro = el.querySelector(".rd-centro");
    var nos = Array.prototype.slice.call(el.querySelectorAll(".rd-no")), rots = Array.prototype.slice.call(el.querySelectorAll(".rd-rot"));
    if (o.centro) { if (typeof o.centro === "string") centro.innerHTML = o.centro; else centro.appendChild(o.centro); }

    var ativo = -1, theta = 0;
    function aplica(t, sem) {
      var alvos = [g].concat(rots);
      if (sem) alvos.forEach(function (x) { x.classList.add("rd-sem"); });
      g.style.transform = "rotate(" + t + "deg)";
      rots.forEach(function (r) { r.style.transform = "rotate(" + (-t) + "deg)"; });
      if (sem) { void g.getBoundingClientRect(); alvos.forEach(function (x) { x.classList.remove("rd-sem"); }); }
    }
    function marca() {
      nos.forEach(function (n, k) { n.classList.toggle("rd-on", k === ativo); n.classList.toggle("rd-lido", !!o.progresso && ativo >= 0 && k < ativo); });
      prog.setAttribute("d", o.progresso && ativo > 0 ? arco(folga, PASSO * ativo - folga, R) : "");
    }
    function gira(alvo, imediato) {
      var delta = ((alvo - theta) % 360 + 540) % 360 - 180;
      theta += delta;
      aplica(theta, imediato || reduz);
    }
    function vai(i, imediato) {
      i = ((i % N) + N) % N;
      gira(-PASSO * i, imediato);
      if (i === ativo) return;
      ativo = i; marca();
      if (o.ao) o.ao(i);
    }
    function repouso(imediato) {
      gira(0, imediato);
      if (ativo === -1) return;
      ativo = -1; marca();
      if (o.ao) o.ao(null);
    }
    function proximo(d) { vai(ativo < 0 ? (d > 0 ? 0 : N - 1) : ativo + d); }
    nos.forEach(function (n) {
      var i = +n.getAttribute("data-i");
      n.addEventListener("click", function () { vai(i); });
      n.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); vai(i); } });
    });
    if (o.repouso) centro.addEventListener("click", function (e) { if (e.target === centro) repouso(); });

    /* rolagem = giro (uma parada por gesto); quem chama decide quando a rolagem deve seguir normal */
    var trava = 0;
    if (o.rolagem) o.rolagem.addEventListener("wheel", function (e) {
      if (o.ligado && !o.ligado()) return;
      if (o.empilha && window.innerWidth <= o.empilha) return;
      if (o.podeRolar && o.podeRolar(e)) return;
      e.preventDefault();
      var d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(d) < 4) return;
      var agora = Date.now(); if (agora - trava < 750) return; trava = agora;
      proximo(d > 0 ? 1 : -1);
    }, { passive: false });

    if (o.teclas !== false) document.addEventListener("keydown", function (e) {
      if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName || "") || e.ctrlKey || e.metaKey || e.altKey) return;
      if (o.ligado && !o.ligado()) return;
      if (o.empilha && window.innerWidth <= o.empilha && (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "PageDown" || e.key === "PageUp")) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); proximo(1); }
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); proximo(-1); }
      else if (e.key === "Home") { e.preventDefault(); if (o.repouso) repouso(); else vai(0); }
      else if (e.key === "End") { e.preventDefault(); vai(N - 1); }
    });

    /* arrasto: gira junto e encaixa na parada mais próxima ao soltar */
    var arr = null;
    function anguloDe(e) { var r = svg.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; }
    svg.addEventListener("pointerdown", function (e) {
      if (e.target.closest && e.target.closest(".rd-no")) return;
      arr = { a: anguloDe(e), t: theta };
      try { svg.setPointerCapture(e.pointerId); } catch (x) { /* nada */ }
    });
    svg.addEventListener("pointermove", function (e) {
      if (!arr) return;
      var d = anguloDe(e) - arr.a; d = ((d % 360) + 540) % 360 - 180;
      theta = arr.t + d; aplica(theta, true);
    });
    function solta() {
      if (!arr) return;
      arr = null;
      var i = Math.round(-theta / PASSO);
      vai(i);
      gira(-PASSO * (((i % N) + N) % N), false);
    }
    svg.addEventListener("pointerup", solta);
    svg.addEventListener("pointercancel", solta);

    return { vai: vai, repouso: repouso, ativo: function () { return ativo; }, theta: function () { return theta; }, centro: centro };
  }
  return { cria: cria };
})();
