/* Sistemática Health Data Brasil — "o dado é de todos; a coorte, alguém paga para ter" (23/10/2026).
   Cada camada responde UMA pergunta e aponta para a seguinte, de fora para dentro:
     ecossistema — quem paga o spin-off, e quem ganha com ele (quem mais ganha não paga)
     sistema     — das bases públicas à coorte: hoje à mão, e com o HDB (cruzamento pela mesma pessoa)
     serviços    — o que se oferece em cada etapa, e quem paga cada parte
     jornadas    — o que o cliente vive, e o que roda por trás
   Dados: js/data.js, GERADO de 08_sintese/dados/*.csv (não editar à mão).
   Sem valores em reais nesta peça: eles ficam no vault e no painel do caso econômico.
   Arquitetura herdada da Sistemática Hernia3D (encaixa/dimensiona, estado na URL).
   25/10/2026: a cena "com o HDB" da camada 02 virou o sistema dos três Cs (três bandas clicáveis, ficha por C na leitura);
   os achados ganharam as etiquetas dos Cs. As abas continuam abas (um dial foi testado e retirado a pedido do usuário). */

(function () {
  "use strict";
  var D = window.HDB;
  var NS = "http://www.w3.org/2000/svg";
  var ENQ = D.enquadramentos;
  var ATOR = {}; D.atores.forEach(function (a) { ATOR[a.id] = a; });
  var ETAPA = {}; D.etapas.forEach(function (e) { ETAPA[e.id] = e; });
  var CONT = {}; D.contagens.forEach(function (c) { CONT[c.id] = c; });
  var COLS = D.etapas.map(function (e) { return e.id; });
  /* os três Cs por etapa (de convergencia.csv): a mesma gramática da entrada, lida nas quatro camadas */
  var CSUP = { C1: "C¹", C2: "C²", C3: "C³", volta: "↻" }, C_DE_ETAPA = {};
  (D.convergencia || []).forEach(function (c) { (c.etapas || []).forEach(function (x) { (C_DE_ETAPA[x] = C_DE_ETAPA[x] || []).push(c.sigla); }); });
  function csDeEtapas(etapas) { var v = {}; (etapas || []).forEach(function (x) { (C_DE_ETAPA[x] || []).forEach(function (s) { v[s] = true; }); }); return Object.keys(v); }
  function faixaCs(cls) { /* a faixa dos Cs sobre as colunas E1–E6: C¹ cruzar (E1 E2) · C¹→C² construir (E3) · C³ comprovar (E4 E5) · ↻ reuso (E6) */
    return "<div class='" + cls + " z-C1' style='grid-column:span 2'>C¹ CRUZAR</div><div class='" + cls + " z-C2'>C¹→C² CONSTRUIR</div><div class='" + cls + " z-C3' style='grid-column:span 2'>C³ COMPROVAR</div><div class='" + cls + " depois'>↻ REUSO</div>";
  }
  var TINTA = "#0C3A6F", OURO = "#A8730E", RISCO = "#B3261E", CINZA = "#5B6B7F";

  /* ---------- utilidades ---------- */
  function el(tag, attrs, pai) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (pai) pai.appendChild(e);
    return e;
  }
  function texto(pai, x, y, s, cls, ancora) {
    var t = el("text", { x: x, y: y, "class": cls || "", "text-anchor": ancora || "start" }, pai);
    t.textContent = s;
    return t;
  }
  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }
  function maiuscula(s) { s = s || ""; return s.charAt(0).toUpperCase() + s.slice(1); }
  var CONF_TXT = { confirmado: "confirmado", provavel: "provável", aberto: "em aberto" };
  function conf(c) { return "<span class='conf conf-" + c + "'>" + CONF_TXT[c] + "</span>"; }
  var ST_TXT = { feito: "feito", parcial: "parcial", aberto: "em aberto" };
  function st(s) { return "<span class='st st-" + s + "'>" + ST_TXT[s] + "</span>"; }
  function tagEnq(k, prefixo, curto) {
    var e = ENQ[k];
    return "<span class='tag' title='" + esc(e.rotulo) + "' style='color:" + e.cor + ";background:" + e.fundo + ";border-color:" + e.cor + "55'>" +
      (prefixo || "") + esc(curto ? e.curto : e.rotulo) + "</span>";
  }
  function clicavel(g, fn) {
    g.addEventListener("click", fn);
    g.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); fn(); } });
  }
  function achadosHtml(camada, tese) {
    return D.achados.filter(function (a) { return a.camada === camada; }).map(function (a, i) {
      return "<div class='achado" + (tese && i === 0 ? " tese" : "") + "'><b>" + esc(a.titulo) + "</b>" + (window.HDBC ? HDBC.etiquetas(a.c) : "") + "<span>" + esc(maiuscula(a.texto)) + ".</span></div>";
    }).join("");
  }

  /* ---------- encaixe: cada painel cabe na altura da tela (desktop) ---------- */
  var EMPILHA = 1020, ajustaveis = [];
  function encaixa(cont) {
    var w = cont && cont.firstElementChild;
    if (!w) return;
    if (window.innerWidth <= EMPILHA) { w.style.zoom = "1"; return; }
    if (!cont.clientHeight) return;
    w.style.zoom = "1";
    var alvo = cont.clientHeight - 6;
    for (var z = 1; z > 0.6 && w.getBoundingClientRect().height > alvo;) {
      z -= 0.03;
      w.style.zoom = String(z);
    }
  }
  function escreve(cont, html) {
    cont.innerHTML = "<div class='ajusta'>" + html + "</div>";
    if (ajustaveis.indexOf(cont) < 0) ajustaveis.push(cont);
    encaixa(cont);
    ligaElos(cont);
  }
  function dimensiona() {
    var palco = document.querySelector(".palco");
    if (window.innerWidth <= EMPILHA) { palco.style.height = ""; return; }
    var topo = document.querySelector("header").offsetHeight + document.getElementById("camadas").offsetHeight;
    palco.style.height = Math.max(420, document.documentElement.clientHeight - topo) + "px";
  }
  function reencaixa() { dimensiona(); ajustaveis.forEach(encaixa); }
  var espera;
  window.addEventListener("resize", function () { clearTimeout(espera); espera = setTimeout(reencaixa, 150); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(reencaixa);
  window.addEventListener("load", reencaixa);

  /* ---------- as quatro camadas, como capítulos ---------- */
  var VISTAS = [
    { id: "ecossistema", n: "01", rot: "Quem paga, quem ganha", cam: "ecossistema", perg: "Quem paga o spin-off, e quem colhe o ganho da evidência?" },
    { id: "sistema", n: "02", rot: "Das bases à coorte", cam: "sistema", perg: "Como o dado público, que é de todos, vira uma coorte que alguém paga para ter?" },
    { id: "servicos", n: "03", rot: "O que se oferece", cam: "serviços", perg: "O que o spin-off vende em cada etapa, e quem paga cada parte?" },
    { id: "jornadas", n: "04", rot: "O que se vive", cam: "jornadas", perg: "O que o cliente vive, e o que roda por trás?" }
  ];
  /* o checkpoint da convergência no cabeçalho: que Cs cada camada acende (C1 cruzamento · C2 coorte · C3 comprovação · volta = reuso) */
  var LIT_VISTA = { ecossistema: ["C3", "volta"], sistema: ["C1", "C2", "C3"], servicos: ["C3", "volta"], jornadas: ["C1", "C2", "C3", "volta"] };
  var PROXIMA = {
    ecossistema: ["sistema", "e como o dado público vira a coorte que a farmacêutica paga?"],
    sistema: ["servicos", "o que, exatamente, se vende?"],
    servicos: ["jornadas", "como o cliente vive isso, etapa por etapa?"],
    jornadas: ["conta", "a conta: quantos pacotes por ano o spin-off precisa vender?"]
  };
  var botoes = {}, vistaAtual = null;
  var nav = document.getElementById("camadas");
  VISTAS.forEach(function (v) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "f-camada"; b.setAttribute("role", "tab");
    b.innerHTML = "<span class='n'>" + v.n + "</span><span class='t'>" + v.rot + "</span><span class='c'>" + v.cam + "</span>";
    b.addEventListener("click", function () { abre(v.id); });
    nav.appendChild(b); botoes[v.id] = b;
  });
  function abre(id, item) {
    var v = VISTAS.filter(function (x) { return x.id === id; })[0] || VISTAS[0];
    vistaAtual = v.id;
    VISTAS.forEach(function (x) {
      document.getElementById("v-" + x.id).classList.toggle("on", x.id === v.id);
      botoes[x.id].classList.toggle("on", x.id === v.id);
      botoes[x.id].setAttribute("aria-selected", x.id === v.id ? "true" : "false");
    });
    document.getElementById("pergunta").textContent = v.perg;
    if (window.HDBC) {
      var cvh = document.getElementById("cv-header");
      if (cvh) { HDBC.desenha(cvh, { lit: LIT_VISTA[v.id], escuro: false }); cvh.setAttribute("title", "Nesta camada: " + HDBC.nomes(LIT_VISTA[v.id])); }
    }
    if (item !== undefined) seleciona(v.id, item);
    estadoNaUrl();
    reencaixa();
  }
  var selecao = { ecossistema: null, sistema: null, servicos: null, jornadas: null };
  function seleciona(vista, item) {
    if (vista === "ecossistema") selecionaEco(item);
    else if (vista === "sistema") selecionaSis(item);
    else if (vista === "servicos") selecionaServico(item);
  }
  function estadoNaUrl() {
    var q = "?vista=" + vistaAtual + (selecao[vistaAtual] ? "&item=" + encodeURIComponent(selecao[vistaAtual]) : "") +
      (vistaAtual === "sistema" && tempoAtual !== 2 ? "&tempo=" + tempoAtual : "");
    try { history.replaceState(null, "", q); } catch (e) { /* file:// em alguns navegadores */ }
  }
  var CONTA = "../caso-economico/"; /* o publicador reescreve para ../caso-economico/ */
  function elo(vista) {
    var p = PROXIMA[vista];
    if (p[0] === "conta") return "<a class='l-elo' href='" + CONTA + "'>→ " + p[1] + "</a>";
    return "<button class='l-elo' data-vista='" + p[0] + "'>→ " + p[1] + "</button>";
  }
  function ligaElos(raiz) {
    Array.prototype.forEach.call(raiz.querySelectorAll("button.l-elo"), function (b) {
      b.addEventListener("click", function () { abre(b.dataset.vista); });
    });
  }

  /* ================= 01 · ECOSSISTEMA: quem paga → o spin-off → quem ganha =================
     Posições fixas: a cena é uma composição, não um layout automático. */
  var eco = document.getElementById("eco"), leituraEco = document.getElementById("leitura-eco");
  var W = 250, H = 50, X0 = 20, X1 = 325, X2 = 630;
  var POS = {
    pharma: { x: X0, y: 70, col: 0 }, financiador: { x: X0, y: 140, col: 0 }, fomento: { x: X0, y: 210, col: 0 },
    pesquisador: { x: X0, y: 280, col: 0 }, orgaos: { x: X0, y: 350, col: 0 },
    hdb: { x: X1, y: 130, col: 1, h: 70 }, fundadores: { x: X1, y: 270, col: 1, w: 122 }, infra: { x: X1 + 128, y: 270, col: 1, w: 122 },
    conitec: { x: X2, y: 80, col: 2 }, einstein: { x: X2, y: 200, col: 2 },
    techtrials: { x: 40, y: 462, col: 3 }, precision: { x: 325, y: 462, col: 3 }, cidacs: { x: 610, y: 462, col: 3 }
  };
  var setas = [];
  (function montaEco() {
    [[X0, "QUEM PAGA OU FORNECE", "a farmacêutica paga; o dado público é grátis"], [X1, "O SPIN-OFF", "método, curadoria e máquina local"],
     [X2, "QUEM GANHA", "o ganho da evidência não volta como pagamento"]].forEach(function (c) {
      texto(eco, c[0], 28, c[1], "col-rot"); texto(eco, c[0], 44, c[2], "col-sub");
      el("line", { x1: c[0], x2: c[0] + W, y1: 52, y2: 52, "class": "col-fio" }, eco);
    });
    el("rect", { x: 20, y: 430, width: 860, height: 100, rx: 6, "class": "faixa" }, eco);
    texto(eco, 40, 450, "QUEM DISPUTA O MESMO CLIENTE, OU O SUBSTITUI DE GRAÇA", "faixa-rot");
    var camadaSetas = el("g", {}, eco), camadaAtores = el("g", {}, eco);
    function borda(id, lado) {
      var p = POS[id], w = p.w || W, h = p.h || H;
      return lado === "dir" ? [p.x + w, p.y + h / 2] : lado === "esq" ? [p.x, p.y + h / 2] : lado === "baixo" ? [p.x + w / 2, p.y + h] : [p.x + w / 2, p.y];
    }
    D.fluxos.forEach(function (f) {
      var a = POS[f.de], b = POS[f.para], d, c1, c2, m;
      if (a.col === b.col) { // dentro do spin-off: desce em linha reta
        var xa = a.x + 60, xb = b.x + (b.w || W) / 2;
        d = [xa, a.y + (a.h || H)]; m = [xb, b.y];
        c1 = [xa, d[1] + 30]; c2 = [xb, m[1] - 30];
      } else {
        d = borda(f.de, a.col < b.col ? "dir" : "esq"); m = borda(f.para, a.col < b.col ? "esq" : "dir");
        if (f.de === "pharma" && f.para === "conitec") { d = [a.x + W, a.y + 12]; m = [b.x, b.y + 14]; }
        c1 = [d[0] + (m[0] - d[0]) * 0.45, d[1]]; c2 = [d[0] + (m[0] - d[0]) * 0.55, m[1]];
      }
      var cor = ENQ[f.enquadramento].cor;
      var p = el("path", { d: "M" + d.join(",") + " C" + c1.join(",") + " " + c2.join(",") + " " + m.join(","), "class": "seta t-" + f.tipo, stroke: cor }, camadaSetas);
      el("circle", { cx: m[0], cy: m[1], r: 3.2, fill: cor, "class": "seta-ponta" }, camadaSetas);
      var r = texto(camadaSetas, (d[0] + m[0]) / 2, (d[1] + m[1]) / 2 - 6, f.oque + " · " + csDeEtapas(f.etapas).map(function (s) { return CSUP[s]; }).join(" "), "rot-seta", "middle"); r.setAttribute("fill", cor);
      setas.push({ f: f, p: p, r: r });
    });
    Object.keys(POS).forEach(function (id) {
      var a = ATOR[id], pz = POS[id], h = pz.h || H, w = pz.w || W;
      var cls = "ator clicavel c-" + a.confianca + (id === "hdb" ? " projeto" : pz.col === 1 ? " dentro" : "") + (pz.col === 2 ? " ganha" : "") + (pz.col === 3 ? " rival" : "");
      var g = el("g", { "class": cls, tabindex: 0, role: "button" }, camadaAtores);
      el("rect", { x: pz.x, y: pz.y, width: w, height: h, rx: 4 }, g);
      /* caixa de 250 px: o curto (≤36 caracteres) é a primeira linha; o nome completo só se couber */
      var nome = a.curto, papel = (w >= 200 && a.nome !== a.curto && a.nome.length <= 42) ? a.nome : "";
      texto(g, pz.x + 10, pz.y + h / 2 + (papel ? -4 : 4), nome, "nome");
      if (papel) texto(g, pz.x + 10, pz.y + h / 2 + 12, papel, "papel");
      clicavel(g, function () { selecionaEco(selecao.ecossistema === "a:" + id ? null : "a:" + id); estadoNaUrl(); });
      pz.g = g;
    });
    texto(eco, 880, 522, "setas: cor = quem paga · cheia = pagamento · tracejada = a confirmar · pontilhada = ganho sem pagamento", "nota-svg", "end");
  })();
  function selecionaEco(item) {
    selecao.ecossistema = item;
    var ator = item && item.indexOf("a:") === 0 ? item.slice(2) : null;
    var fluxo = item && item.indexOf("f:") === 0 ? item.slice(2) : null;
    Object.keys(POS).forEach(function (id) {
      var on = id === ator || (fluxo && setas.some(function (s) { return s.f.id === fluxo && (s.f.de === id || s.f.para === id); }));
      POS[id].g.classList.toggle("on", !!on);
    });
    setas.forEach(function (s) {
      var on = (ator && (s.f.de === ator || s.f.para === ator)) || (fluxo && s.f.id === fluxo);
      s.p.classList.toggle("on", !!on); s.r.classList.toggle("on", !!on);
      s.p.classList.toggle("apaga", !!item && !on);
    });
    leituraEcossistema(ator, fluxo);
  }
  function itemFluxo(f, ativo) {
    return "<li class='clicavel t-" + f.tipo + (ativo ? " on" : "") + "' tabindex='0' data-fluxo='" + f.id + "' style='border-left-color:" + ENQ[f.enquadramento].cor + "'>" +
      "<b>" + esc(ATOR[f.de].curto) + " → " + esc(ATOR[f.para].curto) + "</b>: " + esc(f.oque) + (window.HDBC ? HDBC.etiquetas(csDeEtapas(f.etapas)) : "") + "</li>";
  }
  function leituraEcossistema(ator, fluxo) {
    var html = "";
    if (ator) {
      var a = ATOR[ator];
      var seus = D.fluxos.filter(function (f) { return f.de === ator || f.para === ator; });
      html += "<div class='bloco ficha'><div class='rotulo'>Ator " + conf(a.confianca) + "</div><h3>" + esc(a.nome) + "</h3><p>" + esc(maiuscula(a.papel)) + ".</p></div>";
      html += "<div class='bloco'><div class='rotulo'>Relações de dinheiro</div><ul class='lista'>" +
        (seus.length ? seus.map(function (f) { return itemFluxo(f, false); }).join("") : "<li>Nenhuma relação de dinheiro registrada: " + (POS[ator].col === 3 ? "concorre pelo mesmo cliente, ou o substitui de graça." : "o ganho não volta como pagamento.") + "</li>") + "</ul></div>";
    } else {
      html += "<div class='bloco'>" + achadosHtml("ecossistema", true) + "</div>";
    }
    html += "<div class='bloco'><div class='rotulo'>Como ler as setas</div><p style='margin-bottom:8px'>A cor diz <b>quem paga</b>. Linha cheia: pagamento · tracejada: <i>a confirmar</i> · pontilhada: ganho sem pagamento. A etiqueta diz <b>em que C</b> o dinheiro passa.</p>" +
      Object.keys(ENQ).map(function (k) { return tagEnq(k); }).join(" ") + "</div>";
    if (!ator) {
      html += "<div class='bloco'><div class='rotulo'>Todas as relações (clique para ver)</div><ul class='lista'>" +
        D.fluxos.map(function (f) { return itemFluxo(f, f.id === fluxo); }).join("") + "</ul></div>";
    }
    html += elo("ecossistema");
    escreve(leituraEco, html);
    Array.prototype.forEach.call(leituraEco.querySelectorAll("[data-fluxo]"), function (li) {
      clicavel(li, function () { var alvo = "f:" + li.dataset.fluxo; selecionaEco(selecao.ecossistema === alvo ? null : alvo); estadoNaUrl(); });
    });
  }

  /* ================= 02 · SISTEMA: das bases públicas à coorte =================
     As dez bases à esquerda são as mesmas nos dois tempos. O que muda é o meio:
     (1) hoje, à mão: cada base baixada, limpa e conciliada em separado, sem a mesma pessoa entre elas;
     (2) com o HDB: cruzamento pela mesma pessoa → coorte → análise → dossiê. */
  var sis = document.getElementById("sis"), leituraSis = document.getElementById("leitura-sis");
  var tempoAtual = 2, TEMPOS = [[1, "Hoje, à mão"], [2, "Com o HDB · os três Cs"]];
  var SUPC = { C1: "C¹", C2: "C²", C3: "C³" }, CS3 = (D.convergencia || []).filter(function (c) { return c.sigla !== "volta"; }), CONVS = {};
  CS3.forEach(function (c) { CONVS[c.sigla] = c; });
  var temposEl = document.getElementById("tempos");
  temposEl.innerHTML = "<span class='tempos-rot'>olhar</span>" + TEMPOS.map(function (t) {
    return "<button type='button' data-tempo='" + t[0] + "' role='tab'><b>" + t[0] + "</b>" + t[1] + "</button>";
  }).join("");
  Array.prototype.forEach.call(temposEl.querySelectorAll("button"), function (b) {
    b.addEventListener("click", function () { tempo(+b.dataset.tempo); selecionaSis(null); estadoNaUrl(); });
  });
  var BASE = {}; D.bases.forEach(function (b) { BASE[b.id] = b; });
  var caixas = {};
  function tempo(n) {
    tempoAtual = n;
    Array.prototype.forEach.call(temposEl.querySelectorAll("button"), function (b) { b.classList.toggle("on", +b.dataset.tempo === n); });
    while (sis.firstChild) sis.removeChild(sis.firstChild);
    montaSistema();
  }
  function no(cls, x, y, w, h, titulo, sub1, sub2) {
    var g = el("g", { "class": "no " + cls }, sis);
    el("rect", { x: x, y: y, width: w, height: h, rx: 6 }, g);
    var cy = y + (sub2 ? 22 : sub1 ? 26 : h / 2 + 4);
    texto(g, x + w / 2, cy, titulo, "t", "middle");
    if (sub1) texto(g, x + w / 2, cy + 18, sub1, "s", "middle");
    if (sub2) texto(g, x + w / 2, cy + 34, sub2, "s", "middle");
    return g;
  }
  function seta(cls, x1, y1, x2, y2, ponta) {
    var cx = (x1 + x2) / 2;
    el("path", { d: "M" + x1 + "," + y1 + " C" + cx + "," + y1 + " " + cx + "," + y2 + " " + x2 + "," + y2, "class": cls }, sis);
    if (ponta) el("circle", { cx: x2, cy: y2, r: 3.2, "class": ponta }, sis);
  }
  function montaSistema() {
    var BW = 150, BH = 42, X0 = 20, X1 = 182, Y0 = 78, GAP = 10;
    texto(sis, X0, 36, "AS BASES PÚBLICAS", "col-rot");
    texto(sis, X0, 52, "abertas a todos · a mesma pessoa aparece em várias, sem um número comum", "col-sub");
    caixas = {};
    var ys = [];
    D.bases.forEach(function (b, i) {
      var col = i < 5 ? 0 : 1, x = col ? X1 : X0, y = Y0 + (i % 5) * (BH + GAP);
      var g = el("g", { "class": "base clicavel c-" + b.confianca, tabindex: 0, role: "button" }, sis);
      el("rect", { x: x, y: y, width: BW, height: BH, rx: 4 }, g);
      texto(g, x + 9, y + 18, b.nome, "nome");
      texto(g, x + 9, y + 33, b.dominio.toUpperCase(), "dom");
      clicavel(g, function () { selecionaSis(selecao.sistema === b.id ? null : b.id); estadoNaUrl(); });
      caixas[b.id] = g;
      if (col) ys.push(y + BH / 2);
    });
    var xSai = X1 + BW, yMeio = Y0 + 2.5 * (BH + GAP) - GAP / 2;
    if (tempoAtual === 1) {
      texto(sis, 880, 52, "hoje, à mão", "tempo-rot risco", "end");
      ys.forEach(function (y) { seta("fio-hoje", xSai, y, 400, yMeio); });
      no("no-hoje", 400, yMeio - 60, 250, 120, "Quem precisa da coorte", "baixa cada base, limpa e concilia à mão", "2 a 8 semanas por análise (estimativa)");
      seta("fio-hoje", 650, yMeio, 700, yMeio);
      no("no-saida", 700, yMeio - 45, 180, 90, "Tabelas por base", "uma pessoa não se liga", "de uma base à outra");
      texto(sis, 400, 372, "Os 11 artigos dos fundadores usaram tabelas públicas do TabNet, sem cruzamento:", "nota-svg");
      texto(sis, 400, 386, "comprovam o método antigo, não a plataforma (dito pelos fundadores, 17/09).", "nota-svg");
    } else {
      texto(sis, 880, 52, "com o HDB · o sistema dos três Cs", "tempo-rot", "end");
      /* três bandas, uma por C: cruzar → construir → comprovar. A volta tracejada é o reuso, ainda por construir.
         Cada banda é clicável e abre a ficha do C na leitura (como os grupos do funil na Longevidade abrem o M). */
      var BY = 64, BH2 = 300, BANDA = { C1: [362, 186], C2: [564, 154], C3: [736, 144] };
      CS3.forEach(function (c) {
        var x = BANDA[c.sigla][0], w = BANDA[c.sigla][1];
        var g = el("g", { "class": "banda clicavel banda-" + c.sigla, tabindex: 0, role: "button", "aria-label": SUPC[c.sigla] + " " + c.nome }, sis);
        el("rect", { x: x, y: BY, width: w, height: BH2, rx: 10 }, g);
        texto(g, x + 12, BY + 22, SUPC[c.sigla] + " " + c.nome.toUpperCase(), "banda-rot");
        texto(g, x + 12, BY + 36, c.verbo, "banda-verbo");
        var cx = x + 12;
        (c.etapas || []).forEach(function (e) {
          var ch = el("g", { "class": "chip-e" }, g);
          el("rect", { x: cx, y: BY + BH2 - 28, width: 40, height: 16, rx: 8 }, ch);
          texto(ch, cx + 20, BY + BH2 - 17, e, "", "middle");
          cx += 44;
        });
        clicavel(g, function () { selecionaSis(selecao.sistema === c.sigla ? null : c.sigla); estadoNaUrl(); });
        caixas[c.sigla] = g;
      });
      ys.forEach(function (y) { seta("fio-hdb", xSai, y, 362, yMeio, "ponta-azul"); });
      no("no-hdb", 374, 112, 162, 100, "Cruzamento", "pela mesma pessoa", "nome, mãe, nascimento");
      texto(sis, 374, 232, "cerca de 20 minutos (dito)", "nota-svg");
      texto(sis, 374, 246, "identificadores só aqui", "nota-svg");
      no("no-saida ok", 576, 112, 130, 70, "Coorte", "a mesma pessoa", "ligada entre as bases");
      no("no-saida a-construir", 576, 206, 130, 60, "Coorte versionada", "guardada para a", "próxima pergunta");
      texto(sis, 576, 284, "a construir", "volta-rot");
      no("no-saida", 748, 112, 120, 66, "Análise", "p-valor, tamanho", "de efeito");
      no("no-saida", 748, 206, 120, 66, "Dossiê", "CONITEC · operadora", "· periódico");
      seta("fio-c", 536, 162, 576, 147, "ponta-c");
      seta("fio-c", 706, 147, 748, 145, "ponta-c");
      seta("fio-ouro", 808, 178, 808, 206, "ponta");
      el("path", { d: "M808,272 L808,300 L641,300 L641,270", "class": "fio-volta" }, sis);
      el("circle", { cx: 641, cy: 268, r: 3.2, "class": "ponta-volta" }, sis);
      texto(sis, 724, 313, "↻ reuso · a construir", "volta-rot", "middle");
      texto(sis, 362, 384, "Identificadores pessoais só no cruzamento; a coorte sai sem eles (ética e proteção de dados).", "nota-svg");
      texto(sis, 362, 398, "O cruzamento ainda não foi testado lado a lado com a Techtrials. Clique numa banda para ler o C.", "nota-svg");
    }
    texto(sis, 20, 425, "clique numa base para ver o que ela cobre · alterne \"hoje, à mão\" e \"com o HDB\" para ver o que muda", "nota-svg");
  }
  function selecionaSis(id) {
    selecao.sistema = id;
    Object.keys(caixas).forEach(function (k) { caixas[k].classList.toggle("on", k === id); });
    leituraSistema(id);
  }
  function leituraSistema(id) {
    var html = "", b = id && BASE[id], c = id && CONVS[id];
    if (c) {
      var gl = (D.glossario || []).filter(function (g) { return (g.c || []).indexOf(id) >= 0; })[0];
      html += "<div class='bloco ficha'><div class='rotulo'>" + SUPC[id] + " · " + esc(c.nome) + " · " + esc(c.verbo) + " " + conf(c.confianca) + "</div><h3>" + esc(maiuscula(c.oque)) + ".</h3>" +
        (gl ? "<p>" + esc(gl.explicacao) + ".</p>" : "") +
        "<dl>" + (c.etapas || []).map(function (e) { var et = ETAPA[e]; return et ? "<dt>" + e + " · " + esc(et.curto) + "</dt><dd>" + esc(et.oque) + "</dd>" : ""; }).join("") + "</dl></div>";
      html += "<div class='bloco'>" + D.achados.filter(function (a) { return a.camada !== "fecho" && (a.c || []).indexOf(id) >= 0; }).map(function (a) {
        return "<div class='achado'><b>" + esc(a.titulo) + "</b><span>" + esc(maiuscula(a.texto)) + ".</span></div>";
      }).join("") + "</div>";
    } else if (b) {
      html += "<div class='bloco ficha'><div class='rotulo'>Base pública " + conf(b.confianca) + "</div><h3>" + esc(b.nome) + "</h3><p>" + esc(maiuscula(b.cobre)) + ".</p>" +
        "<dl><dt>Domínio</dt><dd>" + esc(b.dominio) + "</dd><dt>Como se liga às outras</dt><dd>pela pessoa: nome, nome da mãe, data de nascimento, município e sexo; não há um número comum entre as bases</dd></dl></div>";
    } else {
      html += "<div class='bloco'>" + achadosHtml("sistema", true) + "</div>";
    }
    var c20 = CONT.cruzamento;
    html += "<div class='bloco'><div class='rotulo'>O que muda</div><div class='dois'>" +
      "<div><h5 class='risco'>Hoje, à mão</h5><p>Cada base é baixada, limpa e conciliada em separado: <b>2 a 8 semanas</b> por análise <span class='c-provavel'>(estimativa)</span>. O resultado são tabelas por base, sem a mesma pessoa ligada entre elas.</p></div>" +
      "<div><h5 class='ok'>Com o HDB</h5><p>Cruzamento pela mesma pessoa em <b>cerca de " + c20.valor + " " + esc(c20.unidade) + "</b> " + conf(c20.confianca) + ", e a análise pronta: p-valor e tamanho de efeito. <span class='c-provavel'>O tempo mede a geração da coorte, não a entrega do pacote.</span></p></div></div></div>";
    html += elo("sistema");
    escreve(leituraSis, html);
  }

  /* ================= 03 · SERVIÇOS: a matriz de cobertura =================
     Linhas: o que se vende. Colunas: as etapas. A cor diz quem paga. Reuso é "depois": lá está o que não existe. */
  var matriz = document.getElementById("matriz"), leituraServ = document.getElementById("leitura-serv");
  (function montaMatriz() {
    var h = "<div class='mz'><div></div>" + faixaCs("mz-zona");
    h += "<div class='mz-cab'></div>" + COLS.map(function (c) { return "<div class='mz-cab'><small>" + c + "</small><b>" + esc(ETAPA[c].curto) + "</b></div>"; }).join("");
    D.servicos.forEach(function (s) {
      var e = ENQ[s.enquadramento];
      h += "<div class='mz-l clicavel c-" + s.confianca + "' data-serv='" + s.id + "' tabindex='0'><div class='mz-lin'><b>" + esc(s.nome) + "</b><div class='meta'>" + tagEnq(s.enquadramento, "", true) + conf(s.confianca) + "</div></div>";
      COLS.forEach(function (c, i) {
        var tem = s.etapas.indexOf(c) >= 0;
        var antes = i > 0 && s.etapas.indexOf(COLS[i - 1]) >= 0, depois = i < COLS.length - 1 && s.etapas.indexOf(COLS[i + 1]) >= 0;
        h += "<div class='mz-cel" + (c === "E6" ? " depois" : "") + (tem && !antes ? " ini" : "") + (tem && !depois ? " fim" : "") + "'>" + (tem ? "<i style='background-color:" + e.cor + "'></i>" : "") + "</div>";
      });
      h += "</div>";
    });
    h += "<div class='mz-rodape'><span>Clique numa linha para ver o que ela é.</span><span class='depois'>Só um serviço é vendido hoje; o que acumula receita ainda não existe.</span></div></div>";
    escreve(matriz, h);
    Array.prototype.forEach.call(matriz.querySelectorAll(".mz-l"), function (l) {
      clicavel(l, function () { selecionaServico(selecao.servicos === l.dataset.serv ? null : l.dataset.serv); estadoNaUrl(); });
    });
  })();
  function selecionaServico(id) {
    selecao.servicos = id;
    Array.prototype.forEach.call(matriz.querySelectorAll(".mz-l"), function (l) { l.classList.toggle("on", l.dataset.serv === id); });
    var s = id && D.servicos.filter(function (x) { return x.id === id; })[0], html = "";
    if (s) {
      html += "<div class='bloco ficha'><div class='rotulo'>Serviço " + conf(s.confianca) + "</div><h3>" + esc(s.nome) + "</h3><p>" + esc(maiuscula(s.descricao)) + ".</p>" +
        "<dl><dt>Quem paga</dt><dd>" + tagEnq(s.enquadramento) + "</dd><dt>Etapas</dt><dd>" + s.etapas.map(function (e) { return esc(ETAPA[e].curto); }).join(" · ") + "</dd></dl></div>";
      html += "<div class='bloco'><div class='rotulo'>O que cada etapa exige</div><ul class='lista'>" + s.etapas.map(function (e) {
        return "<li style='cursor:default'><b>" + esc(ETAPA[e].nome) + "</b>: " + esc(ETAPA[e].oque) + (ETAPA[e].recurso && ETAPA[e].recurso !== "—" ? " · <i>" + esc(ETAPA[e].recurso) + "</i>" : "") + "</li>";
      }).join("") + "</ul></div>";
    } else {
      html += "<div class='bloco'>" + achadosHtml("servicos", true) + "</div>";
      var usados = {}; D.servicos.forEach(function (x) { usados[x.enquadramento] = 1; });
      html += "<div class='bloco'><div class='rotulo'>A cor diz quem paga</div>" + Object.keys(usados).map(function (k) { return tagEnq(k); }).join(" ") + "<p class='dica'>Barra listrada: serviço ainda em aberto, sem comprador confirmado.</p></div>";
    }
    html += elo("servicos");
    escreve(leituraServ, html);
  }

  /* ================= 04 · JORNADAS: o blueprint ================= */
  (function montaBlueprint() {
    var J = {}; D.jornada.forEach(function (j) { J[j.etapa] = j; });
    function linha(rotulo, cel) {
      return "<div class='bp-lin'>" + rotulo + "</div>" + COLS.map(function (c) { return cel(J[c], ETAPA[c]).replace("<div", c === "E6" ? "<div class='depois'" : "<div").replace("class='depois' class='", "class='depois "); }).join("");
    }
    var h = "<div class='bp'><div class='bp-zona vazio'></div>" + faixaCs("bp-zona");
    h += "<div class='bp-lin'></div>" + COLS.map(function (c) { return "<div class='bp-cab" + (c === "E6" ? " depois" : "") + "'><small>" + c + "</small><b>" + esc(ETAPA[c].curto) + "</b><small>" + esc(J[c].quando) + "</small></div>"; }).join("");
    h += linha("O cliente vive", function (j) { return "<div class='bp-palco" + (j.fonte === "inferencia" ? " inf" : "") + "'>" + esc(maiuscula(j.vive)) + "</div>"; });
    h += "<div class='bp-vis'><span>LINHA DE VISIBILIDADE</span></div>";
    h += linha("Quem atua", function (j) { return "<div>" + esc(maiuscula(j.atua)) + "</div>"; });
    h += linha("Bastidor", function (j) { return "<div>" + esc(maiuscula(j.bastidor)) + "</div>"; });
    h += linha("Recurso", function (j) { return "<div>" + esc(maiuscula(j.recurso)) + "</div>"; });
    h += linha("Quem decide", function (j) { return "<div>" + esc(maiuscula(j.decide)) + "</div>"; });
    h += linha("Quem paga", function (j) { return "<div class='chips'>" + (j.paga.length ? j.paga.map(function (k) { return tagEnq(k, "", true); }).join("") : "—") + "</div>"; });
    h += linha("Quem ganha", function (j) { return "<div>" + (j.ganha.length ? j.ganha.map(function (a) { return esc(ATOR[a].curto); }).join(", ") : "—") + "</div>"; });
    h += linha("Gate e risco", function (j, e) { return "<div class='bp-risco" + (e.gate ? "" : " vazio") + "'>" + (e.gate ? esc(maiuscula(e.gate)) : "—") + "</div>"; });
    h += "</div>";
    escreve(document.getElementById("blueprint"), h);
    var fecho = D.achados.filter(function (a) { return a.camada === "fecho"; });
    escreve(document.getElementById("leitura-jor"),
      "<div class='bloco'>" + achadosHtml("jornadas", true) + "</div>" +
      "<div class='bloco'><div class='rotulo'>Como ler</div><p>Acima da linha: o que o cliente vê. Abaixo: quem atua, o que roda por trás, quem decide e quem paga. <i>Itálico</i>: leitura nossa, ainda não observada num cliente real.</p></div>" +
      "<div class='bloco fecho'><div class='rotulo'>O que falta para o spin-off ficar de pé</div><ol>" + fecho.map(function (a) {
        return "<li><b>" + esc(a.titulo) + "</b><span>" + esc(maiuscula(a.texto)) + ".</span></li>";
      }).join("") + "</ol></div>" + elo("jornadas"));
  })();

  /* ---------- carimbo de versão (publicacoes.csv → data.js) ---------- */
  (function () {
    var V = D.versao, el = document.getElementById("carimbo");
    if (!V || !el) return;
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(V.data || ""), data = m ? m[3] + "/" + m[2] + "/" + m[1] : V.data;
    el.textContent = "Estado em " + data + " · publicação " + V.numero + " · base: vault do projeto Health Data Brasil. Sem valores em reais nesta peça.";
  })();

  /* ---------- início: estado vindo da URL ---------- */
  var q = new URLSearchParams(location.search);
  tempo(+q.get("tempo") || 2);
  leituraSistema(null);
  leituraEcossistema(null, null);
  selecionaServico(null);
  abre(q.get("vista") || "ecossistema", q.get("item") || undefined);
})();
