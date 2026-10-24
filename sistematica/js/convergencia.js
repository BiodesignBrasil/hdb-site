/* Convergência · Health Data Brasil (24/10/2026)
   Os três Cs e a volta, lidos de window.HDB.convergencia (data.js, GERADO de 08_sintese/dados/convergencia.csv):
     C¹ Cruzamento → C² Coorte → C³ Comprovação → volta (reuso) → C¹
   Assim como M¹ M² M³ são o método na Longevidade, os três Cs são a convergência do HDB: a palavra-sistema que o
   leitor leva antes de qualquer detalhe. Um anel desenhado do dado: cada C é um nó; a volta é o arco de retorno,
   tracejado e em vermelho enquanto o estado for "aberto". Checkpoint, não travessia: nada bloqueia a página.
   Compartilhado pela entrada (../site/), pela Sistemática e pelo painel do caso econômico.
   API: HDBC.desenha(el, opts) · HDBC.svg(opts) · HDBC.etiquetas(["C1","volta"]) · HDBC.sigla("C1") · HDBC.resumo() · HDBC.nomes(lista)
     opts.lit     siglas acesas (["C1","C3"]); ausente = todas
     opts.escuro  true sobre fundo navy (paleta clara); ausente = segue o tema da página
     opts.nomes   true escreve nome e verbo fora dos nós e o rótulo da volta (o anel grande do herói)
     opts.anima   true desenha os arcos em sequência (reduced-motion mostra pronto)
     opts.centro  texto no centro do anel
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
      ".cv .cv-arco{fill:none;stroke-width:2.2;stroke-linecap:round}",
      ".cv .cv-volta{fill:none;stroke-width:2;stroke-linecap:round}",
      ".cv .cv-no circle{stroke-width:1.6}",
      ".cv .cv-sigla{font-weight:800;font-size:7.5px}",
      ".cv .cv-nome{font-weight:700;font-size:8.5px;letter-spacing:-.01em}",
      ".cv .cv-verbo{font-weight:500;font-size:6px;letter-spacing:.14em;text-transform:uppercase}",
      ".cv .cv-centro{font-weight:600;font-size:6px;letter-spacing:.24em;text-transform:uppercase}",
      ".cv .cv-volta-rot{font-weight:700;font-size:6.2px;letter-spacing:.04em}",
      ".cv .cv-volta-est{font-weight:500;font-size:5.4px;font-style:italic}",
      ".cv-anima .cv-arco{stroke-dasharray:100;stroke-dashoffset:100;animation:cvTraca .6s cubic-bezier(.4,0,.2,1) forwards}",
      ".cv-anima .cv-no,.cv-anima .cv-nome,.cv-anima .cv-verbo,.cv-anima .cv-centro{opacity:0;animation:cvNasce .4s ease-out forwards}",
      ".cv-anima .cv-volta,.cv-anima .cv-volta-rot,.cv-anima .cv-volta-est{opacity:0;animation:cvNasce .7s ease-out forwards}",
      "@keyframes cvTraca{to{stroke-dashoffset:0}}",
      "@keyframes cvNasce{to{opacity:1}}",
      "@media (prefers-reduced-motion:reduce){.cv-anima *{animation:none!important;opacity:1!important;stroke-dashoffset:0!important}}",
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
    var uid = "cv" + (++seq) + "-", grande = !!opts.nomes;
    var vb = grande ? "0 -6 160 128" : "33 13 94 76";
    var h = "<svg class='cv" + (opts.anima ? " cv-anima" : "") + (grande ? " cv-grande" : "") + "' viewBox='" + vb + "' role='img' aria-label='" + esc(rotulo()) + "'>";
    var vAberta = !V || V.estado === "aberto", vCor = vAberta ? P.aberto : P.C3;
    h += "<defs>" + N.map(function (c) {
      return "<marker id='" + uid + c.sigla + "' viewBox='0 0 6 6' refX='4.6' refY='3' markerWidth='3.6' markerHeight='3.6' orient='auto'><path d='M0,0 L6,3 L0,6 Z' fill='" + P[c.sigla] + "'/></marker>";
    }).join("") + "<marker id='" + uid + "volta' viewBox='0 0 6 6' refX='4.6' refY='3' markerWidth='3.6' markerHeight='3.6' orient='auto'><path d='M0,0 L6,3 L0,6 Z' fill='" + vCor + "'/></marker></defs>";
    /* os dois arcos que seguem: C¹→C² e C²→C³, na cor do nó de origem */
    N.forEach(function (c, i) {
      if (i === 2) return;
      var on = aceso(c.sigla) && aceso(N[i + 1].sigla);
      h += "<path class='cv-arco' d='" + arco(ang(i), ang(i + 1)) + "' pathLength='100' stroke='" + P[c.sigla] + "' opacity='" + (on ? ".95" : ".3") + "' marker-end='url(#" + uid + c.sigla + ")' style='animation-delay:" + (0.15 + i * 0.55).toFixed(2) + "s'/>";
    });
    /* a volta: C³→C¹, tracejada e em vermelho enquanto o reuso estiver aberto */
    h += "<path class='cv-volta' d='" + arco(ang(2), ang(3)) + "' stroke='" + vCor + "' opacity='" + (aceso("volta") ? ".95" : ".3") + "'" +
      (vAberta ? " stroke-dasharray='3.2 2.6'" : "") + " marker-end='url(#" + uid + "volta)' style='animation-delay:1.25s'/>";
    /* os nós */
    N.forEach(function (c, i) {
      var p = pt(ang(i), R), cor = P[c.sigla], on = aceso(c.sigla);
      var extra = (c.estado === "aberto" ? " stroke-dasharray='2 1.6'" : "") + (c.estado === "parcial" ? " fill-opacity='.45'" : "");
      h += "<g class='cv-no' style='animation-delay:" + (i * 0.55).toFixed(2) + "s'><title>" + esc(SUP[c.sigla] + " " + c.nome + ": " + c.oque) + "</title>" +
        "<circle cx='" + p[0] + "' cy='" + p[1] + "' r='" + NR + "' fill='" + (on ? cor : P.fundo) + "' stroke='" + cor + "'" + (on ? "" : " stroke-opacity='.55'") + extra + "/>" +
        "<text class='cv-sigla' x='" + p[0] + "' y='" + (p[1] + 2.7).toFixed(2) + "' text-anchor='middle' fill='" + (on ? P.textoNo : cor) + "'" + (on ? "" : " opacity='.75'") + ">" + SUP[c.sigla] + "</text></g>";
      if (grande) {
        var ny = i === 0 ? p[1] - NR - 9 : p[1] + NR + 9.5, vy = i === 0 ? p[1] - NR - 3.2 : p[1] + NR + 16.5;
        h += "<text class='cv-nome' x='" + p[0] + "' y='" + ny.toFixed(2) + "' text-anchor='middle' fill='" + (on ? P.tinta : P.cinza) + "' style='animation-delay:" + (i * 0.55 + 0.2).toFixed(2) + "s'>" + esc(c.nome) + "</text>" +
          "<text class='cv-verbo' x='" + p[0] + "' y='" + vy.toFixed(2) + "' text-anchor='middle' fill='" + P.cinza + "' style='animation-delay:" + (i * 0.55 + 0.25).toFixed(2) + "s'>" + esc(c.verbo) + "</text>";
      }
    });
    if (grande && V) {
      var q = pt(210 * PI / 180, R + 9);
      h += "<text class='cv-volta-rot' x='" + q[0] + "' y='" + (q[1] - 1).toFixed(2) + "' text-anchor='end' fill='" + vCor + "' style='animation-delay:1.3s'>" + SUP.volta + " " + esc(V.nome.toLowerCase()) + "</text>" +
        "<text class='cv-volta-est' x='" + q[0] + "' y='" + (q[1] + 6).toFixed(2) + "' text-anchor='end' fill='" + P.cinza + "' style='animation-delay:1.35s'>" + esc(vAberta ? "a construir" : "em uso") + "</text>";
    }
    if (opts.centro) h += "<text class='cv-centro' x='" + CX + "' y='" + (CY + 2.2) + "' text-anchor='middle' fill='" + P.cinza + "' style='animation-delay:.9s'>" + esc(opts.centro) + "</text>";
    return h + "</svg>";
  }
  function desenha(el, opts) {
    if (!el) return;
    el.innerHTML = svg(opts);
    if (!el.getAttribute("title")) el.setAttribute("title", resumo());
  }
  function etiquetas(lista) {
    if (!lista || !lista.length) return "";
    return "<span class='cv-tags'>" + lista.map(function (s) {
      var c = porSigla(s);
      return c ? "<span class='cv-tag cv-t-" + s + "' title='" + esc(c.oque) + "'>" + SUP[s] + " " + esc(c.nome) + "</span>" : "";
    }).join("") + "</span>";
  }
  function sigla(s) {
    var c = porSigla(s);
    return c ? "<span class='cv-sigla cv-t-" + s + "' title='" + esc(c.nome + ": " + c.oque) + "'>" + SUP[s] + "</span>" : "";
  }
  return { svg: svg, desenha: desenha, etiquetas: etiquetas, sigla: sigla, resumo: resumo, nomes: nomes, lista: dados, escuroAuto: escuroAuto };
})();
