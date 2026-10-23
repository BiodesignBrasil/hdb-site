/* Sistemática Health Data Brasil — "o gargalo é demanda, não capacidade" (23/10/2026).
   Cada camada responde UMA pergunta e aponta para a seguinte, de fora para dentro:
     ecossistema — quem paga o spin-off, e quem ganha com ele (quem mais ganha não paga)
     sistema     — capacidade, empate e vendas; e o sprint de 20 dias com o status de cada atividade
     serviços    — o que se oferece em cada etapa, e quem paga cada parte
     jornadas    — o que o cliente vive, e o que roda por trás
   Dados: js/data.js, GERADO de 08_sintese/dados/*.csv (não editar à mão).
   Sem valores em reais nesta peça: eles ficam no vault e no painel do caso econômico.
   Arquitetura herdada da Sistemática Hernia3D (encaixa/dimensiona, estado na URL). */

(function () {
  "use strict";
  var D = window.HDB;
  var NS = "http://www.w3.org/2000/svg";
  var ENQ = D.enquadramentos;
  var ATOR = {}; D.atores.forEach(function (a) { ATOR[a.id] = a; });
  var ETAPA = {}; D.etapas.forEach(function (e) { ETAPA[e.id] = e; });
  var CONT = {}; D.contagens.forEach(function (c) { CONT[c.id] = c; });
  var COLS = D.etapas.map(function (e) { return e.id; });
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
      return "<div class='achado" + (tese && i === 0 ? " tese" : "") + "'><b>" + esc(a.titulo) + "</b><span>" + esc(maiuscula(a.texto)) + ".</span></div>";
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
    var topo = document.querySelector("header").offsetHeight + document.querySelector("nav").offsetHeight;
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
    { id: "sistema", n: "02", rot: "Capacidade e demanda", cam: "sistema", perg: "A equipe dá conta? Sim, e é esse o problema: falta quem compre." },
    { id: "servicos", n: "03", rot: "O que se oferece", cam: "serviços", perg: "O que o spin-off vende em cada etapa, e quem paga cada parte?" },
    { id: "jornadas", n: "04", rot: "O que se vive", cam: "jornadas", perg: "O que o cliente vive, e o que roda por trás?" }
  ];
  var PROXIMA = {
    ecossistema: ["sistema", "e a equipe dá conta do que esse ecossistema pede?"],
    sistema: ["servicos", "o que, exatamente, se vende?"],
    servicos: ["jornadas", "como o cliente vive isso, etapa por etapa?"],
    jornadas: ["ecossistema", "de volta a quem paga"]
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
      (vistaAtual === "sistema" && tempoAtual !== 1 ? "&tempo=" + tempoAtual : "");
    try { history.replaceState(null, "", q); } catch (e) { /* file:// em alguns navegadores */ }
  }
  function elo(vista) {
    var p = PROXIMA[vista];
    return "<button class='l-elo' data-vista='" + p[0] + "'>→ " + p[1] + "</button>";
  }
  function ligaElos(raiz) {
    Array.prototype.forEach.call(raiz.querySelectorAll(".l-elo"), function (b) {
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
      var r = texto(camadaSetas, (d[0] + m[0]) / 2, (d[1] + m[1]) / 2 - 6, f.oque, "rot-seta", "middle"); r.setAttribute("fill", cor);
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
      "<b>" + esc(ATOR[f.de].curto) + " → " + esc(ATOR[f.para].curto) + "</b>: " + esc(f.oque) + "</li>";
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
    html += "<div class='bloco'><div class='rotulo'>Como ler as setas</div><p style='margin-bottom:8px'>A cor diz <b>quem paga</b>. Linha cheia: pagamento · tracejada: <i>a confirmar</i> · pontilhada: ganho sem pagamento.</p>" +
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

  /* ================= 02 · SISTEMA: capacidade × empate × vendidos, e o sprint =================
     Dois tempos: (1) as três barras que resumem o gargalo; (2) o sprint de 20 dias com status. */
  var sis = document.getElementById("sis"), leituraSis = document.getElementById("leitura-sis");
  var tempoAtual = 1, TEMPOS = [[1, "Capacidade e demanda"], [2, "O sprint de 20 dias"]];
  var temposEl = document.getElementById("tempos");
  temposEl.innerHTML = "<span class='tempos-rot'>olhar</span>" + TEMPOS.map(function (t) {
    return "<button type='button' data-tempo='" + t[0] + "' role='tab'><b>" + t[0] + "</b>" + t[1] + "</button>";
  }).join("");
  Array.prototype.forEach.call(temposEl.querySelectorAll("button"), function (b) {
    b.addEventListener("click", function () { tempo(+b.dataset.tempo); selecionaSis(null); estadoNaUrl(); });
  });
  function tempo(n) {
    tempoAtual = n;
    Array.prototype.forEach.call(temposEl.querySelectorAll("button"), function (b) { b.classList.toggle("on", +b.dataset.tempo === n); });
    while (sis.firstChild) sis.removeChild(sis.firstChild);
    if (n === 1) montaBarras(); else montaSprint();
  }
  function montaBarras() {
    var cap = CONT.capacidade, emp = CONT.empate, ven = CONT.vendidos;
    var x0 = 170, x1 = 860, max = Math.ceil(cap.valor / 10) * 10 + 10, esc_ = function (v) { return x0 + (x1 - x0) * v / max; };
    texto(sis, x0, 36, "PACOTES POR ANO", "col-rot"); texto(sis, x0, 52, "a mesma régua para as três barras", "col-sub");
    for (var v = 0; v <= max; v += 10) {
      el("line", { x1: esc_(v), x2: esc_(v), y1: 70, y2: 400, "class": "tick-l" }, sis);
      texto(sis, esc_(v), 414, String(v), "tick", "middle");
    }
    [[cap, "barra-cap", 100], [emp, "barra-emp", 210], [ven, "barra-vend", 320]].forEach(function (b) {
      var c = b[0], y = b[2];
      el("rect", { x: x0, y: y, width: Math.max(4, esc_(c.valor) - x0), height: 56, rx: 4, "class": b[1] }, sis);
      texto(sis, x0 - 12, y + 24, c.rotulo, "barra-rot", "end");
      texto(sis, x0 - 12, y + 40, c.unidade, "barra-sub c-" + c.confianca, "end");
      var t = texto(sis, esc_(c.valor) + 10, y + 36, String(c.valor), "num"); t.setAttribute("fill", b[1] === "barra-vend" ? RISCO : b[1] === "barra-emp" ? OURO : TINTA);
    });
    el("path", { d: "M" + esc_(emp.valor) + ",190 L" + esc_(emp.valor) + ",180 L" + esc_(cap.valor) + ",180 L" + esc_(cap.valor) + ",190", "class": "ocioso" }, sis);
    texto(sis, (esc_(emp.valor) + esc_(cap.valor)) / 2, 174, "capacidade ociosa, paga todo mês", "ocioso-rot", "middle");
    texto(sis, x0, 450, "O empate é quantos pacotes por ano pagam a equipe. A capacidade é quantos ela consegue entregar. O vendido é o total histórico, não por ano.", "nota-svg");
    texto(sis, x0, 466, "Caso-base: o volume cresce de 3 para 30 pacotes por ano e o primeiro lucro operacional chega no ano " + CONT.primeiro_lucro.valor + ".", "nota-svg");
  }
  var FASES = [["diagnostico", "DIAGNÓSTICO", 1, 5, "#1A2C5B"], ["mercado", "MERCADO", 6, 12, "#2D6DB4"], ["modelo", "MODELO", 13, 18, "#4A82C0"], ["fechamento", "FECHO", 19, 20, "#0A7B6A"]];
  var ORDEM_FASE = { diagnostico: 0, mercado: 1, modelo: 2, fechamento: 3 }, ORDEM_TIPO = { atividade: 0, entregavel: 1, marco: 2 };
  var itensCr = [];
  function montaSprint() {
    var xl = 300, xd = 330, dw = (880 - xd) / 20, y0 = 62, rh = 21;
    var crono = D.cronograma.slice().sort(function (a, b) {
      return (ORDEM_FASE[a.fase] - ORDEM_FASE[b.fase]) || (a.dia_ini - b.dia_ini) || (ORDEM_TIPO[a.tipo] - ORDEM_TIPO[b.tipo]) || (a.dia_fim - b.dia_fim);
    });
    texto(sis, 20, 30, "O SPRINT DE 20 DIAS, E ONDE A CONSULTORIA ESTÁ", "col-rot");
    FASES.forEach(function (f) {
      var g = el("g", { "class": "fase" }, sis);
      el("rect", { x: xd + (f[2] - 1) * dw, y: 38, width: (f[3] - f[2] + 1) * dw - 2, height: 16, rx: 3, fill: f[4] }, g);
      texto(g, xd + (f[2] - 1) * dw + 5, 50, f[1]);
    });
    for (var d = 1; d <= 20; d++) texto(sis, xd + (d - 0.5) * dw, y0 - 4, String(d), "dia", "middle");
    itensCr = [];
    crono.forEach(function (c, i) {
      var y = y0 + i * rh, g = el("g", { "class": "cr clicavel " + c.tipo, tabindex: 0, role: "button" }, sis);
      el("rect", { x: 14, y: y, width: 872, height: rh, "class": "fundo" }, g);
      var rot = (c.tipo === "entregavel" ? "Entregável: " : c.tipo === "marco" ? "Marco: " : "") + c.atividade;
      texto(g, xl - 6, y + 14.5, rot.length > 52 ? rot.slice(0, 50) + "…" : rot, "rot", "end");
      if (c.tipo === "atividade") {
        el("rect", { x: xd + (c.dia_ini - 1) * dw + 1, y: y + 4, width: (c.dia_fim - c.dia_ini + 1) * dw - 2, height: rh - 8, rx: 3, "class": "b-" + c.status }, g);
      } else {
        var cx = xd + (c.dia_fim - 0.5) * dw, cy = y + rh / 2, r = 7;
        el("path", { d: c.tipo === "marco" ? "M" + cx + "," + (cy - r) + " L" + (cx + r) + "," + cy + " L" + cx + "," + (cy + r) + " L" + (cx - r) + "," + cy + " Z"
          : "M" + (cx - r) + "," + cy + " L" + (cx - r / 2) + "," + (cy - r) + " L" + (cx + r / 2) + "," + (cy - r) + " L" + (cx + r) + "," + cy + " L" + (cx + r / 2) + "," + (cy + r) + " L" + (cx - r / 2) + "," + (cy + r) + " Z", "class": "b-" + c.status }, g);
      }
      clicavel(g, function () { selecionaSis(selecao.sistema === c.id ? null : c.id); estadoNaUrl(); });
      itensCr.push({ c: c, g: g });
    });
    texto(sis, 20, y0 + crono.length * rh + 18, "barra = dias planejados · cor = status hoje · hexágono = entregável · losango = marco · clique numa linha para ver a evidência", "nota-svg");
  }
  function selecionaSis(id) {
    selecao.sistema = id;
    itensCr.forEach(function (it) { it.g.classList.toggle("on", it.c.id === id); });
    leituraSistema(id);
  }
  function leituraSistema(id) {
    var html = "";
    if (tempoAtual === 1) {
      html += "<div class='bloco'>" + achadosHtml("sistema", true) + "</div>";
      html += "<div class='bloco'><div class='rotulo'>Os números, sem reais</div><ul class='lista'>" + D.contagens.map(function (c) {
        return "<li style='cursor:default'><b>" + (c.unidade === "ano" ? "ano " + c.valor : c.valor + " " + esc(c.unidade)) + "</b> · " + esc(c.rotulo) + " " + conf(c.confianca) + "<br><span class='c-" + c.confianca + "'>" + esc(maiuscula(c.leitura)) + ".</span></li>";
      }).join("") + "</ul><p class='dica'>Os valores em reais ficam no painel do caso econômico, fora desta peça.</p></div>";
    } else {
      var c = id && D.cronograma.filter(function (x) { return x.id === id; })[0];
      if (c) {
        html += "<div class='bloco ficha'><div class='rotulo'>" + esc(c.tipo === "entregavel" ? "Entregável" : maiuscula(c.tipo)) + " · dias " + c.dia_ini + (c.dia_fim !== c.dia_ini ? " a " + c.dia_fim : "") + " " + st(c.status) + "</div><h3>" + esc(c.atividade) + "</h3><p>" + esc(maiuscula(c.evidencia)) + ".</p></div>";
      } else {
        var n = { feito: 0, parcial: 0, aberto: 0 }; D.cronograma.forEach(function (x) { n[x.status]++; });
        html += "<div class='bloco'><div class='achado tese'><b>Dos " + D.cronograma.length + " itens do sprint, " + n.feito + " feitos, " + n.parcial + " parciais e " + n.aberto + " em aberto</b><span>O que travou é o que depende de terceiros: entrevistas de mercado, auditoria de propriedade intelectual e a apresentação formal aos proponentes.</span></div></div>";
        html += "<div class='bloco'><div class='rotulo'>Como ler</div><p>" + st("feito") + " há evidência no vault · " + st("parcial") + " feito em parte, ou com valores provisórios no lugar de dados · " + st("aberto") + " não começou.</p><p class='dica'>Clique numa linha para ver a evidência de cada status.</p></div>";
      }
    }
    html += elo("sistema");
    escreve(leituraSis, html);
  }

  /* ================= 03 · SERVIÇOS: a matriz de cobertura =================
     Linhas: o que se vende. Colunas: as etapas. A cor diz quem paga. Reuso é "depois": lá está o que não existe. */
  var matriz = document.getElementById("matriz"), leituraServ = document.getElementById("leitura-serv");
  (function montaMatriz() {
    var h = "<div class='mz'><div></div><div class='mz-zona' style='grid-column:span 5'>O PACOTE, HOJE</div><div class='mz-zona depois'>DEPOIS</div>";
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
    var h = "<div class='bp'><div class='bp-zona vazio'></div><div class='bp-zona' style='grid-column:span 5'>O PACOTE, HOJE</div><div class='bp-zona depois'>DEPOIS</div>";
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

  /* ---------- início: estado vindo da URL ---------- */
  var q = new URLSearchParams(location.search);
  tempo(+q.get("tempo") || 1);
  leituraSistema(null);
  leituraEcossistema(null, null);
  selecionaServico(null);
  abre(q.get("vista") || "ecossistema", q.get("item") || undefined);
})();
