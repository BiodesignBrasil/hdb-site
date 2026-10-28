/* Convergência · Health Data Brasil (24/10/2026)
   Os três Cs e a volta, lidos de window.HDB.convergencia (data.js, GERADO de 08_sintese/dados/convergencia.csv):
     C¹ Cruzamento → C² Coorte → C³ Comprovação → volta (reuso) → C¹
   Assim como M¹ M² M³ são o método na Longevidade, os três Cs são a convergência do HDB: a palavra-sistema que o
   leitor leva antes de qualquer detalhe. Até 27/10 o símbolo era um anel (cada C um nó, a volta o arco de retorno);
   desde 28/10/2026 é o laço dos três momentos em miniatura, o mesmo core da aba 00: quem pergunta à esquerda (cinza),
   o método à direita com os três Cs sobre ele (C¹ no cruzamento, C² na ponta, C³ embaixo), as duas metades do método tingidas
   como os momentos (a coorte, a prova); a volta é o arco de retorno de quem pergunta, tracejado enquanto estiver "aberta".
   Checkpoint, não travessia: nada bloqueia a página. Compartilhado pela Sistemática e pelo painel do caso econômico.
   API: HDBC.desenha(el, opts) · HDBC.svg(opts) · HDBC.etiquetas(["C1","volta"]) · HDBC.sigla("C1") · HDBC.resumo() · HDBC.nomes(lista)
        · HDBC.laco() (o laço do reuso, de laco.csv)
     opts.lit     siglas acesas (["C1","C3"]); ausente = todas (as apagadas ficam vazadas e o trecho delas esmaece)
     opts.escuro  true sobre fundo navy (paleta clara); ausente = segue o tema da página
     opts.anima   true desenha os traços em sequência (reduced-motion mostra pronto)
     opts.centro  texto curto dentro do laço de quem pergunta
   O CSS vai uma vez para o <head> (um <style> dentro de SVG inline vale para a página inteira), tudo com prefixo cv-. */
window.HDBC = (function () {
  "use strict";
  var SUP = { C1: "C¹", C2: "C²", C3: "C³", volta: "↻" };
  var COR = {
    claro: { C1: "#0ea5e9", C2: "#0f766e", C3: "#a8730e", aberto: "#b91c1c", base: "#b4bfcd", tinta: "#16233a", cinza: "#5b6b7f", fundo: "#ffffff", textoNo: "#ffffff" },
    escuro: { C1: "#38bdf8", C2: "#7ccfb6", C3: "#f2cb6e", aberto: "#f08a7e", base: "rgba(255,255,255,.4)", tinta: "#ffffff", cinza: "#c9d8ec", fundo: "#10294a", textoNo: "#0b1f3a" }
  };
  var CX = 80, CY = 60, R = 36, NR = 9.5, PI = Math.PI, seq = 0, cssPronto = false;

  function esc(s) { return String(s === null || s === undefined ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function dados() { var D = window.HDB; return (D && D.convergencia) || []; }
  function nos() { return dados().filter(function (c) { return c.sigla !== "volta"; }); }
  function volta() { return dados().filter(function (c) { return c.sigla === "volta"; })[0] || null; }
  function porSigla(s) { return dados().filter(function (c) { return c.sigla === s; })[0] || null; }
  function ang(i) { return (-90 + 120 * i) * PI / 180; }
  function pt(a, r) { return [+(CX + r * Math.cos(a)).toFixed(2), +(CY + r * Math.sin(a)).toFixed(2)]; }
  function arco(a1, a2) { var d = (NR + 2.2) / R, p = pt(a1 + d, R), q = pt(a2 - d, R); return "M" + p[0] + "," + p[1] + " A" + R + "," + R + " 0 0 1 " + q[0] + "," + q[1]; }
  function escuroAuto() {
    var r = document.documentElement, t = r.getAttribute("data-theme");
    if (t === "dark") return true;
    if (t === "light") return false;
    return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }
  function garanteCss() {
    if (cssPronto || !document.head) return;
    cssPronto = true;
    var s = document.createElement("style");
    s.id = "hdbc-css";
    s.textContent = [
      ".cv{display:block;overflow:visible;font-family:inherit}",
      ".cv .cv-arco{fill:none;stroke-width:2;stroke-linecap:round}",
      ".cv .cv-volta{fill:none;stroke-width:1.7;stroke-linecap:round}",
      ".cv .cv-no circle{stroke-width:1.4}",
      ".cv .cv-sigla{font-weight:800;font-size:6.2px}",
      ".cv .cv-nome{font-weight:700;font-size:8.5px;letter-spacing:-.01em}",
      ".cv .cv-verbo{font-weight:500;font-size:6px;letter-spacing:.14em;text-transform:uppercase}",
      ".cv .cv-centro{font-weight:600;font-size:5.6px;letter-spacing:.2em;text-transform:uppercase}",
      ".cv .cv-volta-rot{font-weight:700;font-size:6.2px;letter-spacing:.04em}",
      ".cv .cv-volta-est{font-weight:500;font-size:5.4px;font-style:italic}",
      ".cv-anima .cv-arco{stroke-dasharray:100;stroke-dashoffset:100;animation:cvTraca .6s cubic-bezier(.4,0,.2,1) forwards}",
      ".cv-anima .cv-no,.cv-anima .cv-nome,.cv-anima .cv-verbo,.cv-anima .cv-centro{opacity:0;animation:cvNasce .4s ease-out forwards}",
      ".cv-anima .cv-volta,.cv-anima .cv-volta-rot,.cv-anima .cv-volta-est{opacity:0;animation:cvNasce .7s ease-out forwards}",
      "@keyframes cvTraca{to{stroke-dashoffset:0}}",
      "@keyframes cvNasce{to{opacity:1}}",
      "@media (prefers-reduced-motion:reduce){.cv-anima *{animation:none!important;opacity:1!important;stroke-dashoffset:0!important}}",
      ".cv-laco{margin:0}",
      ".cv-laco figcaption{font-family:\"Fraunces\",Georgia,serif;font-size:15px;color:var(--tinta,#16233a);margin:0 0 2px}",
      ".cv-laco-svg{display:block;width:100%;max-width:300px;height:auto;overflow:visible}",
      ".cv-laco-seta{fill:none;stroke:var(--ok,#0f766e);stroke-width:1.6}",
      ".cv-laco-seta.cv-laco-aberta{stroke:var(--risco,#b91c1c);stroke-dasharray:5 4}",
      ".cv-laco-no{fill:var(--papel,#fff);stroke:var(--tinta,#16233a);stroke-width:1.6}",
      ".cv-laco-rot{font-size:11px;font-weight:600;fill:var(--tinta,#16233a)}",
      ".cv-laco-rot.cv-laco-inf{font-style:italic;font-weight:500}",
      ".cv-laco-centro{font-size:9.5px;font-style:italic;fill:var(--risco,#b91c1c);letter-spacing:.04em}",
      ".cv-laco p{font-size:12px;font-style:italic;color:var(--cinza,#5b6b7f);margin:2px 0 0;line-height:1.4}",
      ".cv-tags{display:flex;flex-wrap:wrap;gap:4px;margin:3px 0 5px}",
      ".cv-tags span.cv-tag,span.cv-sigla{display:inline-block;font-size:9.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:1px 7px;border-radius:999px;border:1px solid;line-height:1.7;white-space:nowrap}",
      "span.cv-sigla{margin-right:7px;padding:0 6px;vertical-align:middle;text-transform:none;letter-spacing:0;font-size:10.5px;line-height:1.6}",
      ".cv-t-C1{color:#0369a1;background:#e0f4fd;border-color:#0ea5e966}",
      ".cv-t-C2{color:#0f766e;background:#d9efec;border-color:#0f766e66}",
      ".cv-t-C3{color:#a8730e;background:#f6ebcf;border-color:#a8730e66}",
      ".cv-t-volta{color:#b91c1c;background:#f8dedb;border-color:#b91c1c;border-style:dashed}",
      "@media (prefers-color-scheme:dark){:root:not([data-theme=\"light\"]) .cv-t-C1{color:#7dd3fc;background:#12324a}:root:not([data-theme=\"light\"]) .cv-t-C2{color:#7ccfb6;background:#1a3330}:root:not([data-theme=\"light\"]) .cv-t-C3{color:#e0b04a;background:#3a3018}:root:not([data-theme=\"light\"]) .cv-t-volta{color:#f08a7e;background:#3a1f1c}}",
      ":root[data-theme=\"dark\"] .cv-t-C1{color:#7dd3fc;background:#12324a}:root[data-theme=\"dark\"] .cv-t-C2{color:#7ccfb6;background:#1a3330}:root[data-theme=\"dark\"] .cv-t-C3{color:#e0b04a;background:#3a3018}:root[data-theme=\"dark\"] .cv-t-volta{color:#f08a7e;background:#3a1f1c}"
    ].join("\n");
    document.head.appendChild(s);
  }

  function nomes(lista) {
    var N = dados();
    if (!lista) return N.map(function (c) { return SUP[c.sigla] + " " + c.nome; }).join(" · ");
    return N.filter(function (c) { return lista.indexOf(c.sigla) >= 0; }).map(function (c) { return SUP[c.sigla] + " " + c.nome; }).join(" · ");
  }
  function resumo() {
    var V = volta();
    return nos().map(function (c) { return SUP[c.sigla] + " " + c.nome; }).join(" · ") +
      (V ? " · " + SUP.volta + " " + V.nome + (V.estado === "aberto" ? " (a construir)" : "") : "");
  }
  function rotulo() { return "A convergência do Health Data Brasil: " + resumo(); }

  function svg(opts) {
    opts = opts || {};
    garanteCss();
    var N = nos(), V = volta();
    if (N.length !== 3) return "";
    var escuro = opts.escuro === undefined ? escuroAuto() : !!opts.escuro, P = COR[escuro ? "escuro" : "claro"];
    var lit = null;
    if (opts.lit) { lit = {}; opts.lit.forEach(function (s) { lit[s] = true; }); }
    function aceso(s) { return !lit || !!lit[s]; }
    var uid = "cv" + (++seq) + "-", c1 = N[0], c2 = N[1], c3 = N[2];
    var vAberta = !V || V.estado === "aberto";
    var tint = escuro ? ["rgba(255,255,255,.07)", "rgba(124,207,182,.16)", "rgba(242,203,110,.16)"] : ["#eef1f5", "#e4f2ef", "#f7f0e1"];
    var h = "<svg class='cv" + (opts.anima ? " cv-anima" : "") + "' viewBox='0 0 120 72' role='img' aria-label='" + esc(rotulo()) + "'>";
    /* os dois atos: quem pergunta (cinza) e o método, com as duas metades tingidas como os momentos 2 e 3 */
    h += "<path d='M60,36 C48,18 14,18 14,36 C14,54 48,54 60,36 Z' fill='" + tint[0] + "'/>";
    h += "<path d='M60,36 C72,18 106,18 106,36 Z' fill='" + tint[1] + "'/><path d='M106,36 C106,54 72,54 60,36 Z' fill='" + tint[2] + "'/>";
    /* o arco de cima de quem pergunta é a volta: tracejado enquanto estiver por construir */
    h += "<path class='cv-arco' d='M60,36 C48,18 14,18 14,36' pathLength='100' stroke='" + P.base + "' opacity='" + (aceso("volta") ? "1" : ".4") + "'" + (vAberta ? " stroke-dasharray='2.4 2'" : "") + " style='animation-delay:0s'/>";
    h += "<path class='cv-arco' d='M14,36 C14,54 48,54 60,36' pathLength='100' stroke='" + P.base + "' style='animation-delay:.2s'/>";
    h += "<path class='cv-arco' d='M60,36 C72,18 106,18 106,36' pathLength='100' stroke='" + P[c2.sigla] + "' opacity='" + (aceso(c1.sigla) && aceso(c2.sigla) ? ".95" : ".3") + "' style='animation-delay:.35s'/>";
    h += "<path class='cv-arco' d='M106,36 C106,54 72,54 60,36' pathLength='100' stroke='" + P[c3.sigla] + "' opacity='" + (aceso(c3.sigla) ? ".95" : ".3") + "' style='animation-delay:.7s'/>";
    /* os três Cs sobre o laço do método */
    var POS = { C1: [60, 36], C2: [106, 36], C3: [84, 49.5] };
    N.forEach(function (c, i) {
      var p = POS[c.sigla] || [60, 36], cor = P[c.sigla], on = aceso(c.sigla);
      var extra = (c.estado === "aberto" ? " stroke-dasharray='2 1.6'" : "") + (c.estado === "parcial" ? " fill-opacity='.45'" : "");
      h += "<g class='cv-no' style='animation-delay:" + (i * 0.35).toFixed(2) + "s'><title>" + esc(SUP[c.sigla] + " " + c.nome + ": " + c.oque) + "</title>" +
        "<circle cx='" + p[0] + "' cy='" + p[1] + "' r='6.4' fill='" + (on ? cor : P.fundo) + "' stroke='" + cor + "'" + (on ? "" : " stroke-opacity='.55'") + extra + "/>" +
        "<text class='cv-sigla' x='" + p[0] + "' y='" + (p[1] + 2.2).toFixed(2) + "' text-anchor='middle' fill='" + (on ? P.textoNo : cor) + "'" + (on ? "" : " opacity='.75'") + ">" + SUP[c.sigla] + "</text></g>";
    });
    if (opts.centro) h += "<text class='cv-centro' x='37' y='38.4' text-anchor='middle' fill='" + P.cinza + "' style='animation-delay:.9s'>" + esc(opts.centro) + "</text>";
    return h + "</svg>";
  }
  function desenha(el, opts) {
    if (!el) return;
    el.innerHTML = svg(opts);
    if (!el.getAttribute("title")) el.setAttribute("title", resumo());
  }
  function etiquetas(lista) {
    garanteCss();
    if (!lista || !lista.length) return "";
    return "<span class='cv-tags'>" + lista.map(function (s) {
      var c = porSigla(s);
      return c ? "<span class='cv-tag cv-t-" + s + "' title='" + esc(c.oque) + "'>" + SUP[s] + " " + esc(c.nome) + "</span>" : "";
    }).join("") + "</span>";
  }
  function sigla(s) {
    garanteCss();
    var c = porSigla(s);
    return c ? "<span class='cv-sigla cv-t-" + s + "' title='" + esc(c.nome + ": " + c.oque) + "'>" + SUP[s] + "</span>" : "";
  }
  /* o laço que faria o reuso valer (laco.csv, 26/10 · Goh, "ache o laço antes que ele te ache"): quatro nós num ciclo,
     sem número. O trecho que fecha o ciclo sai tracejado em vermelho enquanto a volta estiver aberta; nó inferido em itálico. */
  function laco() {
    garanteCss();
    var D = window.HDB || {}, L = D.laco || [], S = D.sintese || {}, v = volta(), aberta = !v || v.estado === "aberto";
    if (L.length !== 4) return "";
    var P = [[170, 24], [280, 76], [170, 128], [60, 76]];
    var seg = [["A110,52 0 0 1 ", 1], ["A110,52 0 0 1 ", 2], ["A110,52 0 0 1 ", 3], ["A110,52 0 0 1 ", 0]];
    var h = "<svg class='cv-laco-svg' viewBox='0 0 340 156' role='img' aria-label='" + esc(L.map(function (n) { return n.rotulo; }).join(" → ") + " → de volta") + "'>";
    seg.forEach(function (s, i) {
      var a = P[i], b = P[s[1]], fecha = i === 3;
      h += "<path class='cv-laco-seta" + (fecha && aberta ? " cv-laco-aberta" : "") + "' d='M" + a.join(",") + " " + s[0] + b.join(",") + "'/>";
    });
    L.forEach(function (n, i) {
      var p = P[i], dy = i === 0 ? -9 : 17;
      h += "<circle class='cv-laco-no' cx='" + p[0] + "' cy='" + p[1] + "' r='5'/>" +
        "<text class='cv-laco-rot" + (n.fonte === "inferencia" ? " cv-laco-inf" : "") + "' x='" + p[0] + "' y='" + (p[1] + dy) + "' text-anchor='middle'>" + esc(n.rotulo) + "</text>";
    });
    h += "<text class='cv-laco-centro' x='170' y='70' text-anchor='middle'>" + (aberta ? "a construir" : "em uso") + "</text></svg>";
    return "<figure class='cv-laco'>" + (S.laco_titulo ? "<figcaption>" + esc(S.laco_titulo.texto) + "</figcaption>" : "") + h +
      (S.laco_nota ? "<p>" + esc(S.laco_nota.texto) + ".</p>" : "") + "</figure>";
  }
  return { svg: svg, desenha: desenha, etiquetas: etiquetas, sigla: sigla, resumo: resumo, nomes: nomes, lista: dados, escuroAuto: escuroAuto, laco: laco };
})();
