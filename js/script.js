/* Sistemática Health Data Brasil — "o dado é de todos; a coorte, alguém paga para ter" (23/10/2026).
   Cada camada responde UMA pergunta e aponta para a seguinte, de fora para dentro:
     ecossistema — quem paga o spin-off, e quem ganha com ele (quem mais ganha não paga)
     sistema     — das bases públicas à coorte: hoje à mão, e com o HDB (cruzamento pela mesma pessoa)
     serviços    — o que se oferece em cada etapa, e quem paga cada parte
     jornadas    — o que o cliente vive, e o que roda por trás
     direção     — o que a instituição precisa decidir, bloco a bloco do modelo de negócio (molde: a Direção da Longevidade)
   Dados: js/data.js, GERADO de 08_sintese/dados/*.csv (não editar à mão).
   Sem valores em reais nesta peça: eles ficam no vault e no painel do caso econômico.
   Arquitetura herdada da Sistemática Hernia3D (encaixa/dimensiona, estado na URL).
   25/10/2026: a cena "com o HDB" da camada 02 virou o sistema dos três Cs (três bandas clicáveis, ficha por C na leitura);
   os achados ganharam as etiquetas dos Cs. As abas continuam abas (um dial foi testado e retirado a pedido do usuário).
   26/10/2026 (método Goh): a quinta camada, Direção, fecha o fio; a conta virou anexo, aberta só por Custos e Receitas.
   Cada camada abre com uma manchete (sintese.csv, manchete_*); quem não ouvimos, as passagens com dono, o laço da volta
   e as esperas vêm de nao_ouvidos · passagens · laco · jornada.espera.
   27/10/2026: um nome por ideia (a volta · as três respostas · o que falta, e quem resolve); a Direção abre pelas três
   respostas da instituição (sintese.csv, resposta_*), e cada cartão diz qual delas destrava.
   27/10/2026, à tarde (uma peça só): a entrada separada foi aposentada. Esta página é o site inteiro: a aba 00, o contexto,
   traz a roda dos três Cs (js/roda.js) e a história (quem precisa da evidência, os três pacotes, a virada 3 · 17 · 65,
   a frase única); as camadas 01 a 04 são o núcleo; a 05, a direção, é o depois. Tudo em uma tela no desktop. */

(function () {
  "use strict";
  var D = window.HDB;
  var NS = "http://www.w3.org/2000/svg";
  var ENQ = D.enquadramentos;
  var ATOR = {}; D.atores.forEach(function (a) { ATOR[a.id] = a; });
  var ETAPA = {}; D.etapas.forEach(function (e) { ETAPA[e.id] = e; });
  /* as etapas que o cliente vive são E1 a E4; M é o trabalho do método (cruzamento e coorte: C¹ C²) e V é a volta (28/10/2026) */
  var SIGLA_DE = { M: "C¹ C²", V: "↻" };
  function siglaEtapa(id) { return SIGLA_DE[id] || id; }
  var CONT = {}; D.contagens.forEach(function (c) { CONT[c.id] = c; });
  var COLS = D.etapas.map(function (e) { return e.id; });
  /* os três Cs por etapa (de convergencia.csv): a mesma gramática da entrada, lida nas cinco camadas */
  var CSUP = { C1: "C¹", C2: "C²", C3: "C³", volta: "↻" }, C_DE_ETAPA = {};
  (D.convergencia || []).forEach(function (c) { (c.etapas || []).forEach(function (x) { (C_DE_ETAPA[x] = C_DE_ETAPA[x] || []).push(c.sigla); }); });
  function csDeEtapas(etapas) { var v = {}; (etapas || []).forEach(function (x) { (C_DE_ETAPA[x] || []).forEach(function (s) { v[s] = true; }); }); return Object.keys(v); }
  function faixaCs(cls) { /* a faixa dos Cs sobre as seis colunas das etapas: C¹ cruzar (E1 E2) · C¹→C² construir (M) · C³ comprovar (E3 E4) · ↻ a volta (V) */
    return "<div class='" + cls + " z-C1' style='grid-column:span 2'>C¹ CRUZAR</div><div class='" + cls + " z-C2'>C¹→C² CONSTRUIR</div><div class='" + cls + " z-C3' style='grid-column:span 2'>C³ COMPROVAR</div><div class='" + cls + " depois'>↻ A VOLTA</div>";
  }
  /* as três respostas da instituição (a mesma estrutura da entrada): texto em sintese.csv, o bloco do modelo de negócio que abre cada uma */
  var RESPOSTAS = [["resposta_licenca", "parcerias", ["parcerias"]], ["resposta_gente_capital", "recursos", ["recursos", "custos"]], ["resposta_compradores", "segmentos", ["segmentos", "receita"]]];
  var RESP_DE = {}; RESPOSTAS.forEach(function (r, i) { r[2].forEach(function (id) { RESP_DE[id] = i + 1; }); });
  function respostaTC(k) { var s = (D.sintese || {})[k], t = s ? s.texto : "", i = t.indexOf(": "); return i > 0 ? [t.slice(0, i), t.slice(i + 2)] : [t, ""]; }
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
  function ponto(s) { s = String(s || "").trim(); return /[.!?]$/.test(s) ? s : s + "."; }
  var CONF_TXT = { confirmado: "confirmado", provavel: "provável", aberto: "em aberto" };
  function conf(c) { return "<span class='conf conf-" + c + "'>" + CONF_TXT[c] + "</span>"; }
  var ST_TXT = { feito: "feito", parcial: "parcial", aberto: "em aberto" };
  function st(s) { return "<span class='st st-" + s + "'>" + ST_TXT[s] + "</span>"; }
  function tagEnq(k, prefixo, curto) {
    var e = ENQ[k];
    return "<span class='tag' style='color:" + e.cor + ";background:" + e.fundo + ";border-color:" + e.cor + "55'>" +
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
    /* a altura livre desconta o padding do cartão; a Direção e o contexto descem mais (data-piso) */
    var cs = getComputedStyle(cont), pad = (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);
    /* o piso é 0,82 para todas as abas (legibilidade, o usuário, 28/10); o que não couber rola por dentro do cartão */
    var alvo = cont.clientHeight - pad - 6, piso = Math.max(+(cont.getAttribute("data-piso") || 0.6), 0.82);
    for (var z = 1; z > piso && w.getBoundingClientRect().height > alvo;) {
      z -= 0.03;
      w.style.zoom = String(z);
    }
    cont.classList.toggle("rola", w.getBoundingClientRect().height > alvo + 2);
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
    var topo = document.querySelector("nav.barra").offsetHeight; /* uma barra só: a marca, as abas e o anel */
    palco.style.height = Math.max(420, document.documentElement.clientHeight - topo) + "px";
  }
  function reencaixa() { dimensiona(); ajustaveis.forEach(encaixa); }
  var espera;
  window.addEventListener("resize", function () { clearTimeout(espera); espera = setTimeout(reencaixa, 150); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(reencaixa);
  window.addEventListener("load", reencaixa);
  document.addEventListener("toggle", reencaixa, true); /* um <details> aberto muda a altura */

  /* ---------- as cinco camadas, como capítulos ---------- */
  var VISTAS = [
    { id: "contexto", n: "00", rot: "De onde partimos", cam: "contexto", perg: "O dado é de todos. A coorte, alguém paga para ter." },
    { id: "ecossistema", n: "01", rot: "Quem paga, quem ganha", cam: "ecossistema", perg: "Quem paga, e quem ganha?" },
    { id: "sistema", n: "02", rot: "Das bases à coorte", cam: "sistema", perg: "Como um dado público vira algo que alguém paga para ter?" },
    { id: "servicos", n: "03", rot: "O que se vende", cam: "serviços", perg: "O que entra em cada pacote, e para quem?" },
    { id: "jornadas", n: "04", rot: "O que o cliente vive", cam: "jornadas", perg: "O que o cliente vive, e o que roda por trás?" },
    { id: "direcao", n: "05", rot: "O que decidir", cam: "direção", perg: "O que falta definir para a empresa ficar de pé?" }
  ];
  /* o checkpoint da convergência no cabeçalho: que Cs cada camada acende (C1 cruzamento · C2 coorte · C3 comprovação · volta = reuso) */
  var LIT_VISTA = { contexto: ["C1", "C2", "C3", "volta"], ecossistema: ["C3", "volta"], sistema: ["C1", "C2", "C3"], servicos: ["C3", "volta"], jornadas: ["C1", "C2", "C3", "volta"], direcao: ["C1", "C2", "C3", "volta"] };
  var PROXIMA = {
    contexto: ["ecossistema", "quem paga por isso, e quem ganha?"],
    ecossistema: ["sistema", "e como o dado público vira algo que a farmacêutica paga?"],
    sistema: ["servicos", "o que, exatamente, se vende?"],
    servicos: ["jornadas", "como o cliente vive isso, etapa por etapa?"],
    jornadas: ["direcao", "o que falta definir?"],
    direcao: ["contexto", "de volta ao começo: de onde partimos"]
  };
  /* a manchete de cada camada (sintese.csv, manchete_*); a do contexto é a frase única, a que o leitor leva */
  function manchete(id) { var m = (D.sintese || {})[id === "contexto" ? "frase_unica" : "manchete_" + id]; return m ? m.texto : ""; }
  var botoes = {}, vistaAtual = null;
  var nav = document.getElementById("camadas");
  /* as abas como pílulas, na barra (molde: a Sistemática da Longevidade): o número e o nome da camada; a 00 em itálico de livro */
  VISTAS.forEach(function (v) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "f-camada" + (v.id === "contexto" ? " f-livro" : ""); b.setAttribute("role", "tab");
    b.innerHTML = "<small>" + v.n + "</small>" + esc(v.id === "contexto" ? v.rot : v.cam);
    b.title = v.rot;
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
    /* a linha de cima: o número e o nome em caixa alta, a pergunta em itálico (a 00 traz a tese); a manchete é a afirmação da camada.
       Na direção não há manchete: a conclusão abre a coluna da esquerda, como na Longevidade */
    document.getElementById("pergunta").innerHTML = "<b>" + v.n + " · " + esc(v.rot) + "</b> · " + esc(v.perg);
    var mEl = document.getElementById("manchete"); if (mEl) mEl.textContent = (v.id !== "direcao" && v.id !== "contexto" && manchete(v.id)) ? manchete(v.id) + "." : ""; /* na 00 a figura é a manchete; a frase única está no cartão */
    if (window.HDBC) {
      var cvh = document.getElementById("cv-header");
      if (cvh) { HDBC.desenha(cvh, { lit: LIT_VISTA[v.id], escuro: false }); cvh.setAttribute("title", "Nesta camada: " + HDBC.nomes(LIT_VISTA[v.id])); }
    }
    if (v.id === "contexto") montaLaco();
    if (item !== undefined) seleciona(v.id, item);
    estadoNaUrl();
    reencaixa();
  }
  var selecao = { contexto: null, ecossistema: null, sistema: null, servicos: null, jornadas: null, direcao: null };
  function seleciona(vista, item) {
    if (vista === "ecossistema") selecionaEco(item);
    else if (vista === "sistema") selecionaSis(item);
    else if (vista === "servicos") selecionaServico(item);
    else if (vista === "direcao") mostraBloco(item);
    else if (vista === "contexto") mostraDetalhe("momento", item);
  }
  function estadoNaUrl() {
    var q = "?vista=" + vistaAtual + (selecao[vistaAtual] ? "&item=" + encodeURIComponent(selecao[vistaAtual]) : "") +
      (vistaAtual === "sistema" && !comparativo ? "&tempo=" + tempoAtual : "");
    try { history.replaceState(null, "", q); } catch (e) { /* file:// em alguns navegadores */ }
  }
  /* a conta é anexo : só os blocos Custos e Receitas da Direção levam a ela. O publicador reescreve para ../caso-economico/ */
  var CONTA = "caso-economico/";
  function elo(vista) {
    var p = PROXIMA[vista];
    return "<button class='l-elo' data-vista='" + p[0] + "'>" + (vista === "direcao" ? "↻ " : "→ ") + p[1] + "</button>";
  }
  function ligaElos(raiz) {
    Array.prototype.forEach.call(raiz.querySelectorAll("button.l-elo"), function (b) {
      if (b.dataset.ligado) return;
      b.dataset.ligado = "1";
      b.addEventListener("click", function () { abre(b.dataset.vista, b.dataset.item || undefined); });
    });
  }

  /* ================= 00 · CONTEXTO: o laço dos três momentos e a história, em uma tela (28/10/2026) =================
     À esquerda, o core da peça, escolhido pelo usuário entre seis formas (08_sintese/site/opcoes_core.html): a fusão dos
     diamantes (três momentos, para olhar um a um) com o laço (o ciclo fluido e os dois atos). Dois atos em forma de oito:
     quem pergunta, à esquerda; a convergência dos três Cs, à direita. Três momentos como regiões: 1 a pergunta (o laço da
     esquerda: E1 pergunta → E2 desenho), 2 Cruzamento e coorte (a metade de cima do laço da convergência: C¹ cruzar, no
     cruzamento dos dois laços, → C² construir), 3 Comprovação (a metade de baixo: C³ comprovar → E3 análise → E4 entrega).
     As três respostas do Einstein vivem só na 05: as portas (anel duplo em E1, C¹ e E4) saíram da figura na noite de
     28/10 ("tire, não fica claro"). A volta é o arco de retorno do
     laço de quem pergunta, tracejado enquanto estiver por construir; não é um ponto nem uma linha à parte. Na figura só
     as siglas e o número de cada momento; nomes, verbos e portas ficam na legenda ao lado, clicável. A posição é estrutura
     e fica aqui; os textos vêm de sintese.csv (momento_*, entrega_*, resposta_*), etapas.csv, convergencia.csv e
     passagens.csv. Clicar numa região, num C ou numa etapa, na figura ou na legenda, escreve o detalhe na linha sob a
     figura, com o elo para a camada onde vive (02, 04, 05). À direita, o contexto: quem precisa da evidência e o filme
     dos três pacotes, o caminho dela e onde emperra, a virada com a régua 3 · 17 · 65, e a frase única, que é também a
     manchete da aba. Rodadas do usuário no mesmo dia, em ordem: "melhore a nitidez" · "troque o símbolo no cabeçalho" ·
     "somente as letras; traga à direita as etapas e os Cs; não gosto dessa linha vermelha" · "tire o E6; E3 e C1 são
     iguais, coloque C1 ao centro" · "3 a prova ficou ruim demais; o 2 é cruzamento + coorte; resgate os 3 Cs" ·
     "renumere os Es" (daí E1 E2 M E3 E4 V nos dados). */
  var CORW = { C1: "#0369a1", C2: "#0f766e", C3: "#a8730e", volta: "#b91c1c", tinta: "#16233a" };
  var VOLTA = (D.convergencia || []).filter(function (c) { return c.sigla === "volta"; })[0] || null;
  var VOLTA_ABERTA = !VOLTA || VOLTA.estado === "aberto";
  var PASSA = {}; (D.passagens || []).forEach(function (p) { PASSA[p.de] = p; });
  var lacoEl = document.getElementById("laco"), lacoRot = document.getElementById("laco-rot"), leituraCtx = document.getElementById("leitura-ctx");
  function sintTxt(k) { var s = (D.sintese || {})[k]; return s ? s.texto : ""; }
  function sintConf(k) { var s = (D.sintese || {})[k]; return s && s.confianca ? " " + conf(s.confianca) : ""; }
  function tituloCorpo(k) { var x = sintTxt(k), i = x.indexOf(": "); return i > 0 ? [x.slice(0, i), x.slice(i + 2)] : [x, ""]; }
  /* os três momentos: a região, o fio (etapas e Cs na ordem em que o leitor os percorre) e a camada que abrem */
  var MOMENTOS = [
    { id: "pergunta", n: 1, cor: "tinta", fio: ["E1", "E2"], vista: "jornadas" },
    { id: "coorte", n: 2, cor: "C2", fio: ["C1", "C2"], vista: "sistema", item: "C2" },
    { id: "prova", n: 3, cor: "C3", fio: ["C3", "E3", "E4"], vista: "sistema", item: "C3" }
  ];
  var CAMADA_DE = { ecossistema: "01", sistema: "02", servicos: "03", jornadas: "04", direcao: "05" };
  function momentoDe(id) { return MOMENTOS.filter(function (m) { return m.id === id; })[0]; }
  function eloPara(vista, item, rot) { return " <button type='button' class='l-elo inline' data-vista='" + vista + "'" + (item ? " data-item='" + esc(item) + "'" : "") + ">" + rot + "</button>"; }
  /* a geometria do oito, compacta (300 × 170): o cruzamento em (150,85), onde fica o C¹; quem pergunta à esquerda, a
     convergência à direita. Só as siglas e os números dos momentos na figura; o resto na legenda. */
  var LACO = { E1: [42.4, 138.6], E2: [108.7, 138.6], C1: [150, 85], C2: [280, 85], C3: [242.9, 146.2], E3: [205.2, 145.2], E4: [172, 122.6] };
  var ARCO = { esqCima: "M150,85 C120,0 20,0 20,85", esqBaixo: "M20,85 C20,170 120,170 150,85", dirCima: "M150,85 C180,0 280,0 280,85", dirBaixo: "M280,85 C280,170 180,170 150,85" };
  var REGIAO = { pergunta: ARCO.esqCima + " C20,170 120,170 150,85 Z", coorte: ARCO.dirCima + " Z", prova: ARCO.dirBaixo + " Z" };
  var NUMERO_MOMENTO = { pergunta: [82, 95], coorte: [222, 66], prova: [222, 124] };
  var SIGLA_ETAPA = { E1: [42.4, 152.5], E2: [108.7, 152.5], E3: [205.2, 160], E4: [170, 140] };
  /* os dois atos: quem pergunta (o laço da esquerda) e a convergência dos três Cs (o da direita: a palavra-sistema do HDB, desde 24/10/2026) */
  var ATO_DE = { pergunta: "quem pergunta", coorte: "a convergência", prova: "a convergência" };
  function corDe(id) { var cs = C_DE_ETAPA[id] || []; return CORW[cs.length > 1 && cs.indexOf("C2") >= 0 ? "C2" : cs[0]] || CORW.volta; }
  /* o traço de pena: amostra a cúbica "M x,y C x,y x,y x,y", desloca cada ponto pela normal com uma largura que sobe e
     desce (fina nas pontas, 3,4 no meio) e fecha o caminho; sem filtro, sem tremor */
  function cubica(d) {
    var n = d.match(/-?[\d.]+/g).map(Number), P = [[n[0], n[1]], [n[2], n[3]], [n[4], n[5]], [n[6], n[7]]];
    return function (t) {
      var u = 1 - t, a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, e = t * t * t;
      var x = a * P[0][0] + b * P[1][0] + c * P[2][0] + e * P[3][0], y = a * P[0][1] + b * P[1][1] + c * P[2][1] + e * P[3][1];
      var dx = 3 * u * u * (P[1][0] - P[0][0]) + 6 * u * t * (P[2][0] - P[1][0]) + 3 * t * t * (P[3][0] - P[2][0]);
      var dy = 3 * u * u * (P[1][1] - P[0][1]) + 6 * u * t * (P[2][1] - P[1][1]) + 3 * t * t * (P[3][1] - P[2][1]);
      var L = Math.sqrt(dx * dx + dy * dy) || 1;
      return { x: x, y: y, nx: -dy / L, ny: dx / L };
    };
  }
  function faixa(d, cor) {
    var f = cubica(d), N = 48, esq = [], dir = [], i, t, p, w;
    for (i = 0; i <= N; i++) {
      t = i / N; p = f(t); w = 0.7 + 2.7 * Math.pow(Math.sin(Math.PI * t), 0.9);
      esq.push((p.x + p.nx * w / 2).toFixed(2) + "," + (p.y + p.ny * w / 2).toFixed(2));
      dir.push((p.x - p.nx * w / 2).toFixed(2) + "," + (p.y - p.ny * w / 2).toFixed(2));
    }
    return "<path class='lc-arco' d='M" + esq.join(" L") + " L" + dir.reverse().join(" L") + " Z' fill='" + cor + "'/>";
  }
  function pontilha(d, cor) {
    var f = cubica(d), N = 26, h = "", i, p, r;
    for (i = 1; i < N; i++) { p = f(i / N); r = 0.9 + 0.6 * Math.sin(Math.PI * i / N); h += "<circle class='lc-arco lc-aberta' cx='" + p.x.toFixed(2) + "' cy='" + p.y.toFixed(2) + "' r='" + r.toFixed(2) + "' fill='" + cor + "'/>"; }
    return h;
  }
  function montaLaco() {
    if (!lacoEl || lacoEl.firstChild || CS3.length !== 3) return;
    var h = "<svg class='lc-svg' viewBox='0 0 300 170' role='group' aria-label='" + esc(window.HDBC ? HDBC.resumo() : "o laço dos três momentos") + "'>";
    /* as três regiões: os momentos (clicáveis) */
    MOMENTOS.forEach(function (m) {
      var tc = tituloCorpo("momento_" + m.id), rot = m.n + " · " + tc[0] + (tc[1] ? ": " + tc[1] : "");
      h += "<path class='lc-reg lc-reg-" + m.id + "' d='" + REGIAO[m.id] + "' data-momento='" + m.id + "' role='button' tabindex='0' aria-label='" + esc(rot) + "'></path>";
    });
    /* os arcos como traços de pena: uma fita que engrossa no meio e afina nas pontas (um caminho fechado, não um stroke),
       cinza em quem pergunta e na cor do momento na convergência. A volta, por construir, é um pontilhado de tinta.
       (O usuário, 28/10: "o símbolo está quebrado, parece feito por uma criança; traga um tom artístico".) */
    h += VOLTA_ABERTA ? pontilha(ARCO.esqCima, "#9aa3b2") : faixa(ARCO.esqCima, "#9aa3b2");
    h += faixa(ARCO.esqBaixo, "#9aa3b2");
    h += faixa(ARCO.dirCima, CORW.C2);
    h += faixa(ARCO.dirBaixo, CORW.C3);
    [[73.8, 21.3, 180, "#9aa3b2"], [73.8, 148.8, 0, "#9aa3b2"], [183, 37.2, -38, CORW.C2], [263.8, 132.8, 133, CORW.C3]].forEach(function (s) {
      h += "<path class='lc-seta' d='M-4.5,-3.2 L4,0 L-4.5,3.2 Q-2.2,0 -4.5,-3.2 Z' transform='translate(" + s[0] + "," + s[1] + ") rotate(" + s[2] + ")' fill='" + s[3] + "'/>";
    });
    /* o número de cada momento, grande e leve, dentro da região */
    MOMENTOS.forEach(function (m) {
      var q = NUMERO_MOMENTO[m.id];
      h += "<text class='lc-num' x='" + q[0] + "' y='" + q[1] + "' text-anchor='middle' fill='" + CORW[m.cor] + "'>" + m.n + "</text>";
    });
    /* os três Cs, sobre o laço do método */
    CS3.forEach(function (c) {
      var q = LACO[c.sigla], cor = CORW[c.sigla];
      if (!q) return;
      h += "<g class='lc-no' data-c='" + c.sigla + "' role='button' tabindex='0' style='--cor:" + cor + "' aria-label='" + esc(CSUP[c.sigla] + " " + c.nome) + "'>" +
        "<circle cx='" + q[0] + "' cy='" + q[1] + "' r='11'/><text class='lc-nt' x='" + q[0] + "' y='" + (q[1] + 3.3) + "' text-anchor='middle'>" + CSUP[c.sigla] + "</text></g>";
    });
    /* as seis etapas: pontos na cor do C que as agrupa, a sigla ao lado; as portas levam o anel duplo */
    (D.etapas || []).forEach(function (e) {
      var q = LACO[e.id], s = SIGLA_ETAPA[e.id];
      if (!q || !s) return;
      var cor = corDe(e.id), vazio = false;
      h += "<g class='lc-etapa' data-etapa='" + e.id + "' role='button' tabindex='0' aria-label='" + esc(e.id + " " + e.nome) + "'>" +
        "<circle class='lc-ponto' cx='" + q[0] + "' cy='" + q[1] + "' r='4' fill='" + (vazio ? "#fff" : cor) + "' stroke='" + cor + "'" + (vazio ? " stroke-dasharray='2.4 1.6'" : "") + "/>" +
        "<text class='lc-sg' x='" + s[0] + "' y='" + s[1] + "' text-anchor='middle' fill='" + cor + "'>" + siglaEtapa(e.id) + "</text></g>";
    });
    h += "</svg>";
    lacoEl.innerHTML = h;
    legendaLaco();
    /* cliques e teclado, delegados na cena (figura e legenda): cada coisa abre o seu detalhe na linha sob a figura */
    var cena = document.getElementById("cena-ctx") || lacoEl;
    cena.addEventListener("click", function (e) {
      var alvo = e.target.closest && e.target.closest("[data-momento],[data-c],[data-etapa]");
      if (!alvo) { if (e.target.closest && e.target.closest(".lc-svg")) mostraDetalhe(null); return; }
      if (alvo.hasAttribute("data-momento")) mostraDetalhe("momento", alvo.getAttribute("data-momento"));
      else if (alvo.hasAttribute("data-c")) mostraDetalhe("c", alvo.getAttribute("data-c"));
      else mostraDetalhe("etapa", alvo.getAttribute("data-etapa"));
    });
    cena.addEventListener("keydown", function (e) {
      if ((e.key === "Enter" || e.key === " ") && e.target.closest && e.target.closest(".lc-svg [role=button]")) { e.preventDefault(); e.target.click(); }
    });
    mostraDetalhe(null);
  }
  /* a legenda ao lado da figura: os três momentos, cada um com o seu fio (siglas, nomes, verbos e portas); tudo clicável */
  function legendaLaco() {
    var leg = document.getElementById("laco-leg");
    if (!leg) return;
    leg.innerHTML = MOMENTOS.map(function (m) {
      var tc = tituloCorpo("momento_" + m.id);
      var itens = m.fio.map(function (k) {
        var c = CS3.filter(function (x) { return x.sigla === k; })[0];
        if (c) return "<button type='button' class='lg-item' data-c='" + k + "' style='--cor:" + CORW[k] + "'><b>" + CSUP[k] + "</b><span>" + esc(c.nome) + " <i>" + esc(c.verbo) + "</i></span></button>";
        var e = ETAPA[k];
        if (!e) return "";
        return "<button type='button' class='lg-item' data-etapa='" + k + "' style='--cor:" + corDe(k) + "'><b>" + siglaEtapa(k) + "</b><span>" + esc(e.curto) + "</span></button>";
      }).join("");
      return "<div class='lg-grupo' style='--cor:" + CORW[m.cor] + "'><button type='button' class='lg-titulo' data-momento='" + m.id + "'><b>" + m.n + "</b><span>" + esc(tc[0]) + " <i>" + ATO_DE[m.id] + "</i></span></button>" + itens + "</div>";
    }).join("");
  }
  function mostraDetalhe(tipo, id) {
    if (!lacoEl) return;
    if (tipo === "momento" && !momentoDe(id)) tipo = null;
    Array.prototype.forEach.call(lacoEl.querySelectorAll(".lc-reg"), function (r) {
      var meu = r.getAttribute("data-momento") === id;
      r.classList.toggle("on", tipo === "momento" && meu);
      r.classList.toggle("dim", tipo === "momento" && !meu);
    });
    var cena = document.getElementById("cena-ctx") || lacoEl, attr = { momento: "data-momento", c: "data-c", etapa: "data-etapa" }[tipo];
    Array.prototype.forEach.call(cena.querySelectorAll("[data-momento],[data-c],[data-etapa]"), function (x) {
      x.classList.toggle("on", !!attr && x.getAttribute(attr) === id);
    });
    selecao.contexto = tipo === "momento" ? id : null;
    if (vistaAtual === "contexto") estadoNaUrl();
    if (!lacoRot) return;
    var html, c, e;
    if (!tipo) {
      html = "<b>Como ler</b> dois laços: quem pergunta, e a convergência dos três Cs · três momentos, 1 2 3, cada um com o seu fio ao lado (clique) · tracejado: a volta, por construir";
    } else if (tipo === "momento") {
      var m = momentoDe(id), tc = tituloCorpo("momento_" + id);
      var fio = m.fio.map(function (k) {
        var cc = CS3.filter(function (x) { return x.sigla === k; })[0]; if (cc) return CSUP[k] + " " + cc.verbo;
        var ee = ETAPA[k]; return ee ? siglaEtapa(k) + " " + ee.curto.toLowerCase() : k;
      }).join(" → ");
      html = "<b>" + m.n + " · " + esc(tc[0]) + "</b> " + esc(fio) + ". Entrega: " + esc(ponto(sintTxt("entrega_" + id))) +
        eloPara(m.vista, m.item, "abrir na camada " + CAMADA_DE[m.vista] + " →");
    } else if (tipo === "c") {
      c = CS3.filter(function (x) { return x.sigla === id; })[0];
      html = c ? "<b>" + CSUP[id] + " " + esc(c.nome) + "</b> " + esc(ponto(c.oque)) + eloPara("sistema", id, "abrir na camada 02 →") : "";
    } else if (tipo === "etapa") {
      e = ETAPA[id];
      html = e ? "<b>" + siglaEtapa(id) + " " + esc(e.nome) + "</b> " + esc(ponto(e.oque)) +
        (id === "V" ? (VOLTA_ABERTA ? " " + esc(ponto(sintTxt("laco_nota"))) + " Tracejado: por construir." : "") + eloPara("direcao", null, "abrir na camada 05 →")
          : eloPara("jornadas", null, "abrir na camada 04 →")) : "";
    } else {
      html = "";
    }
    lacoRot.innerHTML = html;
    ligaElos(lacoRot);
  }
  /* a régua: o número barulhento e os silenciosos na mesma escala (vendidos · empate · capacidade, em pacotes por ano) */
  function regua() {
    var v = CONT.vendidos, e = CONT.empate, c = CONT.capacidade;
    if (!v || !e || !c) return "";
    var max = Math.max(+c.valor, +e.valor, +v.valor) * 1.06, W = 600, x0 = 20, x1 = W - 20, y = 56;
    function X(n) { return +(x0 + (x1 - x0) * n / max).toFixed(1); }
    var xv = X(v.valor), xe = X(e.valor), xc = X(c.valor);
    /* só três rótulos, grandes o bastante para a coluna estreita; "o que falta vender" e "capacidade ociosa" ficam no texto */
    var h = "<svg class='regua-svg' viewBox='0 0 " + W + " 110' role='img' aria-label='" + esc(v.valor + " " + v.rotulo.toLowerCase() + ", " + e.valor + " de " + e.rotulo.toLowerCase() + " e " + c.valor + " de " + c.rotulo.toLowerCase() + ", na mesma escala, em " + c.unidade) + "'>";
    h += "<line class='rg-base' x1='" + x0 + "' y1='" + y + "' x2='" + x1 + "' y2='" + y + "'/>";
    h += "<line class='rg-feito' x1='" + x0 + "' y1='" + y + "' x2='" + xv + "' y2='" + y + "'/>";
    h += "<line class='rg-falta' x1='" + xv + "' y1='" + y + "' x2='" + xe + "' y2='" + y + "'/>";
    h += "<line class='rg-sobra' x1='" + xe + "' y1='" + y + "' x2='" + xc + "' y2='" + y + "'/>";
    /* o 3 e o 17 ficam perto na escala: o rótulo do 17 desce uma linha para não cobrir o do 3 */
    [[xv, v, "risco", "start", x0, "start", 28], [xe, e, "ouro", "middle", xe, "start", 50], [xc, c, "tinta", "end", x1, "end", 28]].forEach(function (m) {
      h += "<circle class='rg-no rg-" + m[2] + "' cx='" + m[0] + "' cy='" + y + "' r='5.5'/>";
      h += "<text class='rg-num rg-" + m[2] + "' x='" + m[0] + "' y='" + (y - 16) + "' text-anchor='" + m[3] + "'>" + m[1].valor + "</text>";
      h += "<text class='rg-rot' x='" + m[4] + "' y='" + (y + m[6]) + "' text-anchor='" + m[5] + "'>" + esc(m[1].rotulo.toLowerCase()) + "</text>";
    });
    return h + "</svg>";
  }
  function leituraContexto() {
    if (!leituraCtx) return;
    var obst = sintTxt("ato1_obstaculos").split(" · ").map(function (s) { return s.trim(); }).filter(Boolean);
    var html = "<div class='ctx-grid'><div>";
    html += "<div class='bloco ficha'><div class='rotulo'>Quem precisa da prova</div><h3 class='ctx-h'>" + esc(ponto(sintTxt("ato1_historia"))) + "</h3></div>"; /* o filme dos três pacotes saiu a pedido do usuário (28/10): a régua e a frase única já dizem o que importa */
    if (obst.length) html += "<div class='bloco'><div class='rotulo'>O caminho dela, e onde emperra</div><ol class='obst'>" + obst.map(function (o, i) {
      return "<li" + (i === obst.length - 1 ? " class='aberta'" : "") + ">" + esc(maiuscula(o.replace(/^e,\s*/, ""))) + "</li>";
    }).join("") + "</ol></div>";
    html += "</div><div>";
    /* a virada continua o caminho: abre com a frase que fecha os obstáculos ("o método entrega; o que não acontece é a
       próxima venda"), a régua, e a leitura dos números. Era uma caixa tingida à parte, "solta" (o usuário, 28/10). */
    html += "<div class='bloco ctx-box'><div class='rotulo'>A virada</div><p class='ctx-entrega'>" + esc(ponto(sintTxt("ato1_entrega"))) + "</p>" + regua() +
      "<p class='ctx-virada'>" + esc(ponto(sintTxt("ato2_virada"))) + sintConf("ato2_virada") + "</p></div>"; /* sem a nota sob a régua: repetia a virada e os obstáculos (o usuário, 28/10) */
    html += "</div></div>";
    html += "<p class='ctx-frase'>" + esc(ponto(sintTxt("frase_unica"))) + "</p>";
    html += elo("contexto");
    escreve(leituraCtx, html);
  }

  /* ================= 01 · ECOSSISTEMA: quem paga → o spin-off → quem ganha =================
     Posições fixas: a cena é uma composição, não um layout automático. */
  var eco = document.getElementById("eco"), leituraEco = document.getElementById("leitura-eco");
  var W = 250, H = 50, X0 = 20, X1 = 325, X2 = 630;
  var POS = {
    pharma: { x: X0, y: 70, col: 0 }, financiador: { x: X0, y: 140, col: 0 }, fomento: { x: X0, y: 210, col: 0 },
    pesquisador: { x: X0, y: 280, col: 0 }, orgaos: { x: X0, y: 350, col: 0 },
    hdb: { x: X1, y: 130, col: 1, h: 70 }, fundadores: { x: X1, y: 270, col: 1, w: 96 }, infra: { x: X1 + 102, y: 270, col: 1, w: 148 }, /* "Infraestrutura local" precisa de 148 com folga */
    conitec: { x: X2, y: 80, col: 2 }, einstein: { x: X2, y: 200, col: 2 },
    techtrials: { x: 40, y: 462, col: 3 }, precision: { x: 325, y: 462, col: 3 }, cidacs: { x: 610, y: 462, col: 3 }
  };
  var setas = [];
  (function montaEco() {
    [[X0, "QUEM PAGA OU FORNECE", "a farmacêutica paga; o dado público é grátis"], [X1, "A EMPRESA NOVA", "o método, a curadoria clínica e uma máquina própria"],
     [X2, "QUEM GANHA", "quem ganha com a prova não paga por ela"]].forEach(function (c) {
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
      setas.push({ f: f, p: p, meio: [(d[0] + m[0]) / 2, (d[1] + m[1]) / 2], cor: cor });
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
    /* os números das setas ficam numa camada acima das caixas: o vão entre as colunas (55 px) não cabe um rótulo escrito,
       e o escrito ficava atrás dos quadros (o usuário, 28/10). O número liga a seta à linha da leitura */
    var camadaNums = el("g", { "class": "nums" }, eco);
    setas.forEach(function (s) {
      s.r = el("g", { "class": "rot-seta" }, camadaNums);
      el("circle", { cx: s.meio[0], cy: s.meio[1], r: 9, fill: s.cor }, s.r);
      s.t = texto(s.r, s.meio[0], s.meio[1] + 3.5, "", "", "middle");
    });
    texto(eco, 880, 522, "setas: cor = quem paga · cheia = pagamento · tracejada = a confirmar · pontilhada = ganho sem pagamento", "nota-svg", "end");
  })();
  var numFluxo = {};
  function selecionaEco(item) {
    selecao.ecossistema = item;
    var ator = item && item.indexOf("a:") === 0 ? item.slice(2) : null;
    var fluxo = item && item.indexOf("f:") === 0 ? item.slice(2) : null;
    Object.keys(POS).forEach(function (id) {
      var on = id === ator || (fluxo && setas.some(function (s) { return s.f.id === fluxo && (s.f.de === id || s.f.para === id); }));
      POS[id].g.classList.toggle("on", !!on);
    });
    numFluxo = {};
    var n = 0;
    setas.forEach(function (s) {
      var on = (ator && (s.f.de === ator || s.f.para === ator)) || (fluxo && s.f.id === fluxo);
      if (on) { n += 1; numFluxo[s.f.id] = n; s.t.textContent = String(n); }
      s.p.classList.toggle("on", !!on); s.r.classList.toggle("on", !!on);
      s.p.classList.toggle("apaga", !!item && !on);
    });
    leituraEcossistema(ator, fluxo);
  }
  function itemFluxo(f, ativo) {
    var n = numFluxo[f.id], cor = ENQ[f.enquadramento].cor;
    return "<li class='clicavel t-" + f.tipo + (ativo ? " on" : "") + "' tabindex='0' data-fluxo='" + f.id + "' style='border-left-color:" + cor + "'>" +
      (n ? "<span class='n' style='background:" + cor + "'>" + n + "</span>" : "") +
      "<b>" + esc(ATOR[f.de].curto) + " → " + esc(ATOR[f.para].curto) + "</b>: " + esc(f.oque) +
      "<span class='cs-mini'>" + csDeEtapas(f.etapas).map(function (s) { return CSUP[s]; }).join(" ") + "</span></li>";
  }
  function leituraEcossistema(ator, fluxo) {
    var html = "";
    if (ator) {
      var a = ATOR[ator];
      var seus = D.fluxos.filter(function (f) { return f.de === ator || f.para === ator; });
      html += "<div class='bloco ficha'><div class='rotulo'>Ator " + conf(a.confianca) + "</div><h3>" + esc(a.nome) + "</h3><p>" + esc(maiuscula(a.papel)) + ".</p></div>";
      if (seus.length || ator !== "techtrials") html += "<div class='bloco'><div class='rotulo'>Relações de dinheiro</div><ul class='lista'>" +
        (seus.length ? seus.map(function (f) { return itemFluxo(f, false); }).join("") : "<li>Nenhuma relação de dinheiro registrada: " + (POS[ator].col === 3 ? "concorre pelo mesmo cliente, ou o substitui de graça." : "o ganho não volta como pagamento.") + "</li>") + "</ul></div>";
    } else {
      /* uma coisa primeiro (Goh): a tese em caixa; os outros achados só pelo título, com o texto no mouse, como na 03.
         "Como ler as setas" saiu: a nota ao pé do desenho já diz; fica só a linha das cores (o usuário, 28/10: "muita informação") */
      var achs = D.achados.filter(function (a) { return a.camada === "ecossistema"; }), a0 = achs[0];
      if (a0) html += "<div class='bloco'><div class='achado tese'><b>" + esc(a0.titulo) + "</b>" + (window.HDBC ? HDBC.etiquetas(a0.c) : "") + "<span>" + esc(maiuscula(a0.texto)) + ".</span></div>" +
        achs.slice(1).map(function (a) { return "<div class='achado mini'><b>" + esc(a.titulo) + "</b><span>" + esc(maiuscula(a.texto)) + ".</span></div>"; }).join("") + "</div>"; /* texto à vista, nada no mouse (o usuário, 28/10) */
    }
    /* sem legenda das cores nem a lista de todas as relações na leitura: as relações se leem clicando num ator, numeradas
       ("para que ficar explicando se é didático"; "isso está pequeno demais, qual o intuito?", o usuário, 28/10) */
    if (fluxo && !ator) {
      var fl = D.fluxos.filter(function (f) { return f.id === fluxo; })[0];
      if (fl) html += "<div class='bloco'><div class='rotulo'>Relação de dinheiro</div><ul class='lista'>" + itemFluxo(fl, true) + "</ul></div>";
    }
    /* o concorrente mais próximo, nas palavras dos fundadores (comparativo.csv): o que o HDB faz e o que o rival faz */
    if (ator === "techtrials" && (D.comparativo || []).length) {
      html += "<div class='bloco'><div class='rotulo'>Nas palavras dos fundadores " + conf(D.comparativo[0].confianca) + "</div><table class='compara'><thead><tr><th></th><th>Health Data Brasil</th><th>" + esc(ATOR.techtrials.curto) + "</th></tr></thead><tbody>" +
        D.comparativo.map(function (r) { return "<tr><th>" + esc(r.tema) + "</th><td>" + esc(maiuscula(r.hdb)) + "</td><td>" + esc(maiuscula(r.rival)) + "</td></tr>"; }).join("") + "</tbody></table></div>";
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
  var sisFoco = document.getElementById("sis"), sis = sisFoco, leituraSis = document.getElementById("leitura-sis");
  var DUO = { 1: document.getElementById("sis1"), 2: document.getElementById("sis2") };
  /* os dois olhares como dois cartões largos, cada um com o seu efeito numa linha ("isso está escondido", o usuário, 28/10).
     O que era o bloco "O que muda" da leitura vive aqui. A camada abre com os dois fluxos desenhados lado a lado, como
     comparativo, na tela inteira; clicar num deles (no cartão, no desenho, numa base ou num C) põe esse olhar em foco:
     o esquema à esquerda e a leitura à direita, como nas outras camadas. "← lado a lado" volta ao comparativo. */
  var c20 = CONT.cruzamento;
  var tempoAtual = 2, comparativo = true, TEMPOS = [
    [1, "Hoje, à mão", "cada base baixada, limpa e arrumada em separado: <b>2 a 8 semanas</b> por análise (estimativa), em tabelas soltas, sem a mesma pessoa ligada entre elas"],
    [2, "Com o HDB · os três Cs", "a mesma pessoa ligada entre as bases em <b>cerca de " + c20.valor + " " + esc(c20.unidade) + "</b> (" + CONF_TXT[c20.confianca] + "; o tempo da máquina, não do pacote), e a análise pronta: funciona, quanto, com que certeza"]
  ];
  var SUPC = { C1: "C¹", C2: "C²", C3: "C³" }, CS3 = (D.convergencia || []).filter(function (c) { return c.sigla !== "volta"; }), CONVS = {};
  CS3.forEach(function (c) { CONVS[c.sigla] = c; });
  var temposEl = document.getElementById("tempos"), vSistema = document.getElementById("v-sistema");
  temposEl.innerHTML = TEMPOS.map(function (t) {
    return "<button type='button' data-tempo='" + t[0] + "' role='tab'><b>" + t[0] + "</b><span class='tp-t'>" + t[1] + "</span><small>" + t[2] + "</small></button>";
  }).join("");
  Array.prototype.forEach.call(temposEl.querySelectorAll("button"), function (b) {
    b.addEventListener("click", function () { escolheTempo(+b.dataset.tempo); });
  });
  var BASE = {}; D.bases.forEach(function (b) { BASE[b.id] = b; });
  var caixas = {};
  /* o olhar em foco, desenhado na cena da esquerda */
  function tempo(n) {
    tempoAtual = n;
    Array.prototype.forEach.call(temposEl.querySelectorAll("button"), function (b) { b.classList.toggle("on", !comparativo && +b.dataset.tempo === n); });
    caixas = {};
    desenhaSis(sisFoco, n, true);
  }
  function desenhaSis(svg, n, foco) {
    sis = svg;
    while (sis.firstChild) sis.removeChild(sis.firstChild);
    montaSistema(n, foco);
    sis = sisFoco;
  }
  function escolheTempo(n, id) {
    comparativo = false;
    if (vSistema) vSistema.classList.remove("cheia");
    tempo(n);
    selecionaSis(id || null);
    estadoNaUrl();
  }
  function comparar() {
    comparativo = true;
    selecao.sistema = null;
    if (vSistema) vSistema.classList.add("cheia");
    Array.prototype.forEach.call(temposEl.querySelectorAll("button"), function (b) { b.classList.remove("on"); });
    leituraSis.innerHTML = "";
    estadoNaUrl();
    reencaixa();
  }
  /* os dois fluxos do comparativo, desenhados uma vez; um clique fora de um nó põe o olhar em foco */
  [1, 2].forEach(function (n) {
    if (!DUO[n]) return;
    desenhaSis(DUO[n], n, false);
    DUO[n].addEventListener("click", function (ev) { if (!(ev.target.closest && ev.target.closest(".clicavel"))) escolheTempo(n); });
  });
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
  function montaSistema(n, foco) {
    var BW = 150, BH = 42, X0 = 20, X1 = 182, Y0 = 78, GAP = 10;
    /* em foco, o clique abre a ficha ao lado; no comparativo, põe este olhar em foco já com o item escolhido */
    var aoClicar = foco ? function (id) { selecionaSis(selecao.sistema === id ? null : id); estadoNaUrl(); } : function (id) { escolheTempo(n, id); };
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
      clicavel(g, function () { aoClicar(b.id); });
      if (foco) caixas[b.id] = g;
      if (col) ys.push(y + BH / 2);
    });
    var xSai = X1 + BW, yMeio = Y0 + 2.5 * (BH + GAP) - GAP / 2;
    if (n === 1) {
      texto(sis, 880, 52, "hoje, à mão", "tempo-rot risco", "end");
      ys.forEach(function (y) { seta("fio-hoje", xSai, y, 400, yMeio); });
      no("no-hoje", 400, yMeio - 60, 250, 120, "Quem precisa da coorte", "baixa cada base, limpa e concilia à mão", "2 a 8 semanas por análise (estimativa)");
      seta("fio-hoje", 650, yMeio, 700, yMeio);
      no("no-saida", 700, yMeio - 45, 180, 90, "Tabelas por base", "uma pessoa não se liga", "de uma base à outra");
      texto(sis, 400, 372, "Os 11 artigos dos fundadores usaram tabelas prontas, sem cruzar bases:", "nota-svg");
      texto(sis, 400, 386, "provam o método antigo, não a plataforma (dito pelos fundadores).", "nota-svg");
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
        clicavel(g, function () { aoClicar(c.sigla); });
        if (foco) caixas[c.sigla] = g;
      });
      ys.forEach(function (y) { seta("fio-hdb", xSai, y, 362, yMeio, "ponta-azul"); });
      no("no-hdb", 374, 112, 162, 100, "Cruzamento", "pela mesma pessoa", "nome, mãe, nascimento");
      texto(sis, 374, 232, "cerca de 20 minutos (dito)", "nota-svg");
      texto(sis, 374, 246, "identificadores só aqui", "nota-svg");
      no("no-saida ok", 576, 112, 130, 70, "Coorte", "a mesma pessoa", "ligada entre as bases");
      no("no-saida a-construir", 576, 206, 130, 60, "Coorte guardada", "para a próxima", "pergunta");
      texto(sis, 576, 284, "a construir", "volta-rot");
      no("no-saida", 748, 112, 120, 66, "Análise", "funciona? quanto?", "com que certeza?");
      no("no-saida", 748, 206, 120, 66, "Entrega", "ao SUS, ao plano", "ou à revista");
      seta("fio-c", 536, 162, 576, 147, "ponta-c");
      seta("fio-c", 706, 147, 748, 145, "ponta-c");
      seta("fio-ouro", 808, 178, 808, 206, "ponta");
      el("path", { d: "M808,272 L808,300 L641,300 L641,270", "class": "fio-volta" }, sis);
      el("circle", { cx: 641, cy: 268, r: 3.2, "class": "ponta-volta" }, sis);
      texto(sis, 724, 313, "↻ a volta · a construir", "volta-rot", "middle");
      /* a passagem da volta (passagens.csv): quem leva o cliente da entrega à próxima pergunta; as outras duas estão na ficha do C */
      var pv = (D.passagens || []).filter(function (p) { return p.id === "c3-c1"; })[0];
      if (pv) texto(sis, 724, 326, "quem leva: " + pv.quem, "pas-quem c-" + pv.confianca, "middle");
      texto(sis, 362, 384, "Os dados pessoais ficam só no cruzamento; o grupo sai sem eles (privacidade).", "nota-svg");
      texto(sis, 362, 398, "O cruzamento ainda não foi testado lado a lado com a Techtrials. Clique numa banda para ler o C.", "nota-svg");
    }
    texto(sis, 20, 425, foco ? "clique numa base para ver o que ela cobre · o outro olhar está no cartão de cima · \"lado a lado\" volta ao comparativo" : "clique neste olhar para abri-lo ao lado, com a leitura", "nota-svg");
  }
  /* a passagem que sai deste C (passagens.csv · Goh, "as passagens têm dono") */
  function passagemHtml(sig) {
    var p = (D.passagens || []).filter(function (x) { return x.de === sig; })[0];
    if (!p) return "";
    return "<p class='passagem c-" + p.confianca + "'><b>" + SUPC[sig] + " → " + (p.para === "C1" && sig === "C3" ? "↻ " : "") + (SUPC[p.para] || p.para) + "</b> " + esc(p.rotulo) +
      " · <span>quem leva: " + esc(p.quem) + "</span></p>";
  }
  function selecionaSis(id) {
    if (id && comparativo) { escolheTempo(tempoAtual, id); return; }
    selecao.sistema = id;
    Object.keys(caixas).forEach(function (k) { caixas[k].classList.toggle("on", k === id); });
    leituraSistema(id);
    reencaixa();
  }
  function leituraSistema(id) {
    var html = "<button type='button' class='volta-duo'>← os dois olhares, lado a lado</button>", b = id && BASE[id], c = id && CONVS[id];
    if (b || c) html = "<button type='button' class='fecha-leitura' aria-label='fechar a ficha'>×</button>" + html;
    if (c) {
      var gl = (D.glossario || []).filter(function (g) { return (g.c || []).indexOf(id) >= 0; })[0];
      html += "<div class='bloco ficha'><div class='rotulo'>" + SUPC[id] + " · " + esc(c.nome) + " · " + esc(c.verbo) + " " + conf(c.confianca) + "</div><h3>" + esc(maiuscula(c.oque)) + ".</h3>" +
        (gl ? "<p>" + esc(gl.explicacao) + ".</p>" : "") +
        passagemHtml(id) + "</div>"; /* sem a lista das etapas: as etapas vivem na 04 e já estão nas fichas da banda; aqui, uma coisa primeiro */
      /* os achados deste C só pelo título, como na 03 (o texto no mouse): com os textos inteiros a ficha descia a 0,58 */
      /* só os achados desta camada que tocam o C; os das outras camadas vivem nelas (com os de todas, a ficha caía a 0,58) */
      var achs = D.achados.filter(function (a) { return a.camada === "sistema" && (a.c || []).indexOf(id) >= 0; });
      if (achs.length) html += "<div class='bloco'><div class='rotulo'>O que já sabemos</div>" + achs.map(function (a) { return "<div class='achado mini'><b>" + esc(a.titulo) + "</b><span>" + esc(maiuscula(a.texto)) + ".</span></div>"; }).join("") + "</div>"; /* texto à vista, nada no mouse */
    } else if (b) {
      html += "<div class='bloco ficha'><div class='rotulo'>Base pública " + conf(b.confianca) + "</div><h3>" + esc(b.nome) + "</h3><p>" + esc(maiuscula(b.cobre)) + ".</p>" +
        "<dl><dt>Domínio</dt><dd>" + esc(b.dominio) + "</dd><dt>Como se liga às outras</dt><dd>pela pessoa: nome, nome da mãe, data de nascimento, município e sexo; não há um número comum entre as bases</dd></dl></div>";
    } else if (tempoAtual === 1) {
      /* o repouso do olhar 1: o que o desenho diz, em prosa */
      html += "<div class='bloco ficha'><div class='rotulo'>Hoje, à mão</div><h3>Cada base é um trabalho à parte; a mesma pessoa não se liga de uma base à outra.</h3>" +
        "<p>Quem precisa da coorte baixa cada base, limpa e concilia à mão: <b>2 a 8 semanas</b> por análise <span class='c-provavel'>(estimativa)</span>. O resultado são tabelas por base, soltas.</p>" +
        "<p>Os 11 artigos dos fundadores usaram tabelas prontas, sem cruzar bases: provam o método antigo, não a plataforma <span class='c-provavel'>(dito pelos fundadores)</span>.</p></div>";
    } else {
      html += "<div class='bloco'>" + achadosHtml("sistema", true) + "</div>";
    }
    html += elo("sistema");
    escreve(leituraSis, html);
    var fx = leituraSis.querySelector(".fecha-leitura"), vd = leituraSis.querySelector(".volta-duo");
    if (fx) fx.addEventListener("click", function () { selecionaSis(null); estadoNaUrl(); });
    if (vd) vd.addEventListener("click", comparar);
  }

  /* ================= 03 · SERVIÇOS: o portfólio, no molde da Longevidade (28/10/2026) =================
     Em cima, as linhas clínicas: onde a coorte já foi montada e onde a expertise existe (linhas.csv). Embaixo, um cartão
     por pacote (servicos.csv): para quem, o que entra (entregas.csv × componentes.csv) agrupado pelos três Cs e pela
     volta, o que já foi feito e o que falta construir, e o que cada pacote destrava adiante. Um pacote que contém outro
     inteiro diz "tudo do X" e lista só o que acrescenta, como os pacotes da Longevidade. O usuário (28/10): "e sobre os
     segmentos, que eles falaram de oncologia, cirurgia, ou por cliente; gere um portfólio e coloque na aba Serviços assim
     como no projeto Longevidade". A matriz serviços × etapas que vivia aqui saiu: a cobertura está nos grupos dos cartões.
     Três pacotes, pelo princípio do usuário: "a pergunta é do cliente, a coorte é do HDB e a comprovação é a análise";
     saíram o painel para o gestor (canal condicionado a edital) e a coorte entregue (perde valor sem a comprovação). */
  var portfolio = document.getElementById("portfolio");
  var LINHA_ESTADO = { vendido: ["vendido", "ok"], a_validar: ["sem concorrente · a validar", "ceu"], expertise: ["expertise dos inventores · demanda a confirmar", "ouro"], parcial: ["parcial · concorrente presente", "cinza"], aspiracao: ["aspiração", "cinza"] };
  var leituraPf = document.getElementById("leitura-pf"), SERV = {}, ORDEM_C = ["C1", "C2", "C3", "volta"], NOME_C = {};
  function selecionaServico(id) {
    selecao.servicos = id || null;
    if (!portfolio) return;
    Array.prototype.forEach.call(portfolio.querySelectorAll(".pf-cartao"), function (c) { c.classList.toggle("on", c.getAttribute("data-serv") === id); });
    leituraPortfolio(id);
  }
  /* a leitura do pacote aberto, à direita: o que entra, com a descrição de cada entrega à vista, e o que destrava */
  function leituraPortfolio(id) {
    if (!leituraPf) return;
    var s = id && SERV[id], html = "";
    if (!s) {
      html = "<p class='dica'>Clique num pacote para ler o que entra nele.</p>";
    } else {
      html += "<div class='bloco ficha'><div class='rotulo'>Pacote " + conf(s.s.confianca) + "</div><h3>" + esc(s.s.nome) + "</h3>" +
        "<p class='pf-quem'><span class='pf-sub'>Para quem</span>" + esc(s.s.para_quem || "") + "</p><p>" + esc(maiuscula(s.s.descricao)) + ".</p></div>";
      html += "<div class='bloco'><div class='rotulo'>O que entra</div>" + (s.base ? "<p class='pf-base'>Tudo do " + esc(s.base.nome) + "</p><p class='pf-mais'>O que só este pacote acrescenta</p>" : "") +
        ORDEM_C.filter(function (c) { return s.grupos[c]; }).map(function (c) {
          return "<p class='pf-c' style='--cor:" + CORW[c] + "'>" + esc(NOME_C[c] || c) + "</p><ul class='pf-lista'>" + s.grupos[c].map(function (e) {
            return "<li class='" + (e.estado === "feito" ? "pf-feito" : "pf-abrir") + "' style='--cor:" + CORW[c] + "'>" + esc(e.nome) + "<small>" + esc(ponto(e.descricao)) + "</small></li>";
          }).join("") + "</ul>";
        }).join("") + "</div>";
      html += "<div class='bloco'><div class='rotulo'>Destrava adiante</div><p class='pf-destrava'>" + s.destrava + "</p><p class='pf-pe'>" + tagEnq(s.s.enquadramento, "", true) + "</p></div>";
    }
    html += elo("servicos");
    escreve(leituraPf, html);
  }
  (function montaPortfolio() {
    if (!portfolio || !(D.servicos || []).length) return;
    var ENT = {}; (D.entregas || []).forEach(function (e) { ENT[e.id] = e; });
    var COMP = {}; (D.componentes || []).forEach(function (c) { (COMP[c.servico] = COMP[c.servico] || []).push(c.entrega); });
    CS3.forEach(function (c) { NOME_C[c.sigla] = CSUP[c.sigla] + " " + c.verbo; });
    NOME_C.volta = "↻ a " + (VOLTA ? VOLTA.nome.toLowerCase() : "volta");
    /* o que cada pacote contém, calculado uma vez: a base herdada, o que só ele acrescenta (por C) e o que destrava */
    D.servicos.forEach(function (s) {
      var itens = COMP[s.id] || [], tem = {};
      itens.forEach(function (k) { tem[k] = true; });
      /* um pacote só "herda" de outro que vem antes dele na ordem do portfólio: o Pacote de coorte é a referência */
      var base = null, posS = D.servicos.indexOf(s);
      D.servicos.forEach(function (o, posO) {
        var outros = COMP[o.id] || [];
        if (posO >= posS || !outros.length || outros.length >= itens.length) return;
        if (outros.every(function (k) { return tem[k]; }) && (!base || outros.length > (COMP[base.id] || []).length)) base = o;
      });
      var herdadas = {}; if (base) (COMP[base.id] || []).forEach(function (k) { herdadas[k] = true; });
      var proprias = itens.filter(function (k) { return !herdadas[k]; });
      /* sem contagens: "N entregas · M feitas" era uma soma do nosso próprio catálogo, sem fonte (o usuário, 28/10: "sem fontes, retire-os") */
      var grupos = {}; proprias.forEach(function (k) { var e = ENT[k]; if (e) (grupos[e.c] = grupos[e.c] || []).push(e); });
      var destrava = s.destrava && s.destrava !== "—" ? s.destrava.split(" · ").map(function (d) { return "<span class='pf-mod'>" + esc(d) + "</span>"; }).join("") : "—";
      SERV[s.id] = { s: s, base: base, grupos: grupos, destrava: destrava };
    });
    var h = "";
    /* as linhas clínicas */
    if ((D.linhas || []).length) {
      h += "<div class='pf-linhas'><span class='pf-rot'>As linhas clínicas · onde a coorte já foi montada, e onde a expertise existe</span><div class='pf-chips'>" + D.linhas.map(function (l) {
        var est = LINHA_ESTADO[l.estado] || [l.estado, "cinza"];
        return "<span class='pf-linha pf-" + est[1] + (l.estado === "a_validar" || l.estado === "aspiracao" ? " pf-trac" : "") + "'><b>" + esc(l.nome) + "</b><i>" + esc(est[0]) + "</i><small>" + esc(ponto(l.leitura)) + "</small></span>";
      }).join("") + "</div></div>";
    }
    /* um cartão por pacote, compacto: o esquema à esquerda; o pacote aberto se lê à direita (o usuário, 28/10: "a informação ficou pequena e difícil de ler") */
    var cartoes = D.servicos.map(function (s) {
      var p = SERV[s.id];
      var corpo = (p.base ? "<p class='pf-base'>Tudo do " + esc(p.base.nome) + "</p><p class='pf-mais'>O que só este pacote acrescenta</p>" : "") +
        ORDEM_C.filter(function (c) { return p.grupos[c]; }).map(function (c) {
          return "<p class='pf-c' style='--cor:" + CORW[c] + "'>" + esc(NOME_C[c] || c) + "</p><ul class='pf-lista'>" + p.grupos[c].map(function (e) {
            return "<li class='" + (e.estado === "feito" ? "pf-feito" : "pf-abrir") + "' style='--cor:" + CORW[c] + "'>" + esc(e.nome) + "</li>";
          }).join("") + "</ul>";
        }).join("");
      return "<article class='pf-cartao c-" + s.confianca + "' data-serv='" + s.id + "' tabindex='0'><h3>" + esc(s.nome) + "</h3>" +
        "<p class='pf-quem'><span class='pf-sub'>Para quem</span>" + esc(s.para_quem || "") + "</p>" + corpo +
        "<p class='pf-pe'>" + tagEnq(s.enquadramento, "", true) + conf(s.confianca) + "</p></article>";
    }).join("");
    h += "<div class='pf-grade'>" + cartoes + "</div>";
    h += "<p class='pf-leg'>" + ORDEM_C.map(function (c) { return "<span class='pf-leg-c' style='--cor:" + CORW[c] + "'>" + esc(NOME_C[c]) + "</span>"; }).join("") +
      "<span><i>itálico: a construir</i> · a etiqueta diz quem paga · clique num pacote para ler o que entra</span></p>";
    /* os achados desta camada, com o texto à vista, e o que a camada revela */
    var achs = (D.achados || []).filter(function (a) { return a.camada === "servicos"; });
    if (achs.length) h += "<div class='pf-sabemos'><span class='pf-rot'>O que já sabemos</span>" + achs.map(function (a) { return "<div class='achado mini'><b>" + esc(a.titulo) + "</b><span>" + esc(maiuscula(a.texto)) + ".</span></div>"; }).join("") + "</div>";
    if (sintTxt("revela_servicos")) h += "<p class='pf-revela'><span class='pf-rot'>O que isso revela</span>" + esc(ponto(sintTxt("revela_servicos"))) + sintConf("revela_servicos") + "</p>";
    escreve(portfolio, h);
    portfolio.addEventListener("click", function (e) {
      var c = e.target.closest && e.target.closest(".pf-cartao");
      if (!c || (e.target.closest && e.target.closest("button"))) return;
      selecionaServico(c.getAttribute("data-serv"));
      estadoNaUrl();
    });
  })();

  /* ================= 04 · JORNADAS: o blueprint ================= */
  (function montaBlueprint() {
    var J = {}; D.jornada.forEach(function (j) { J[j.etapa] = j; });
    function linha(rotulo, cel) {
      return "<div class='bp-lin'>" + rotulo + "</div>" + COLS.map(function (c) { return cel(J[c], ETAPA[c]).replace("<div", c === "V" ? "<div class='depois'" : "<div").replace("class='depois' class='", "class='depois "); }).join("");
    }
    var h = "<div class='bp'><div class='bp-zona vazio'></div>" + faixaCs("bp-zona");
    /* a espera antes da etapa (jornada.espera · Goh, "a rota real"): um círculo vazado e a duração, em itálico */
    h += "<div class='bp-lin'></div>" + COLS.map(function (c) { return "<div class='bp-cab" + (c === "V" ? " depois" : "") + "'><small>" + siglaEtapa(c) + "</small><b>" + esc(ETAPA[c].curto) + "</b><small>" + esc(J[c].quando) + "</small>" +
      (J[c].espera ? "<span class='bp-espera'><i></i>" + esc(J[c].espera) + "</span>" : "") + "</div>"; }).join("");
    h += linha("O cliente vive", function (j) { return "<div class='bp-palco" + (j.fonte === "inferencia" ? " inf" : "") + "'>" + esc(maiuscula(j.vive)) + "</div>"; });
    h += "<div class='bp-vis'><span>LINHA DE VISIBILIDADE</span></div>";
    h += linha("Quem atua", function (j) { return "<div>" + esc(maiuscula(j.atua)) + "</div>"; });
    h += linha("Bastidor", function (j) { return "<div>" + esc(maiuscula(j.bastidor)) + "</div>"; });
    h += linha("Recurso", function (j) { return "<div>" + esc(maiuscula(j.recurso)) + "</div>"; });
    h += linha("Quem decide", function (j) { return "<div>" + esc(maiuscula(j.decide)) + "</div>"; });
    h += linha("Quem paga", function (j) { return "<div class='chips'>" + (j.paga.length ? j.paga.map(function (k) { return tagEnq(k, "", true); }).join("") : "—") + "</div>"; });
    h += linha("Quem ganha", function (j) { return "<div>" + (j.ganha.length ? j.ganha.map(function (a) { return esc(ATOR[a].curto); }).join(", ") : "—") + "</div>"; });
    h += linha("O que falta aqui", function (j, e) { return "<div class='bp-risco" + (e.gate ? "" : " vazio") + "'>" + (e.gate ? esc(maiuscula(e.gate)) : "—") + "</div>"; });
    h += "</div>";
    /* o blueprint ocupa a tela inteira: o quadro lateral (achados, o laço da volta, as três definições) saiu a pedido do
       usuário (28/10); as definições vivem na 05, para onde o elo leva. Fica só a legenda de leitura, com o elo. */
    h += "<p class='bp-pe'><span>Acima da linha, o que o cliente vê; abaixo, o que roda por trás. Círculo vazado: a espera antes da etapa. Itálico: leitura nossa, ainda não observada num cliente real.</span>" + elo("jornadas") + "</p>";
    escreve(document.getElementById("blueprint"), h);
  })();

  /* ================= 05 · DIREÇÃO: o modelo de negócio, bloco a bloco  =================
     Molde: a Direção da Longevidade. À esquerda, a conclusão e o BMC nas posições de Osterwalder (só títulos; os seis elos
     da cadeia, do cliente à receita, levam número). À direita, um cartão por bloco, todos na mesma célula da grade, para a
     escala não mudar entre blocos: o que precisamos da instituição · o que já temos · o que precisamos definir · o que já
     sabemos (achados, com "ver na camada") · o que falta definir (lacunas públicas, com quem resolve e prazo). Listas inteiras,
     nada escondido atrás do mouse. Segmentos leva os compradores como pontos e quem ainda não ouvimos; Custos e Receitas
     são as únicas portas para a conta, que é anexo. Dados: proposta · achados · lacunas_publicas · nao_ouvidos · compradores. */
  var direcao = document.getElementById("direcao"), mostraBloco = function () {};
  (function montaDirecao() {
    if (!direcao || !(D.proposta || []).length) return;
    var GRADE = { parcerias: "1/1/3/3", atividades: "1/3/2/5", recursos: "2/3/3/5", proposta: "1/5/3/7",
                  relacionamento: "1/7/2/9", canais: "2/7/3/9", segmentos: "1/9/3/11", custos: "3/1/4/6", receita: "3/6/4/11" };
    var CADEIA = ["segmentos", "proposta", "atividades", "recursos", "custos", "receita"];
    var GRUPO = { G1: "para a empresa ficar de pé", G2: "para captar e vender", G3: "só depois de aberta" };
    var NOME_CAM = {}; VISTAS.forEach(function (v) { NOME_CAM[v.id] = v.n + " · " + v.rot.toLowerCase(); });
    function doBloco(lista, id) { return (lista || []).filter(function (x) { return x.componente === id; }); }
    function rot(t, qt) { return "<p class='pc-rot'>" + t + (qt !== undefined ? "<span>" + qt + "</span>" : "") + "</p>"; }
    var vazio = "<li class='pc-vazio'>nada registrado ainda</li>";
    function blocoBmc(c) {
      var n = CADEIA.indexOf(c.id) + 1;
      return "<button type='button' class='bmc-b' data-pv='" + c.id + "' style='grid-area:" + GRADE[c.id] + ";--pv:" + c.cor + "'>" +
        "<span class='bmc-tit'>" + (n ? "<i>" + n + "</i>" : "") + esc(c.bloco).replace("Relacionamento", "Relaciona&shy;mento") + "</span></button>";
    }
    function card(c) {
      var n = CADEIA.indexOf(c.id) + 1;
      var achs = doBloco(D.achados, c.id), sabe = achs.filter(function (a) { return a.camada !== "fecho"; }), cond = achs.filter(function (a) { return a.camada === "fecho"; });
      var falta = doBloco(D.lacunas_publicas, c.id).map(function (l) {
        return "<li><b>" + esc(l.titulo) + "</b><small>" + GRUPO[l.gate] + " · quem resolve: " + esc(l.papel) + " · " +
          (l.prazo === "a definir" ? "<em>prazo a definir</em>" : "até: " + esc(l.prazo)) + "</small></li>";
      });
      /* quem ainda não ouvimos, numa linha só (os cinco grupos; o porquê e o como ouvir ficam no recorte), para o cartão não crescer */
      if (c.id === "segmentos" && (D.nao_ouvidos || []).length) falta = falta.concat(["<li class='pc-ouvir'><b>Ouvir quem ainda não ouvimos</b><small>" +
        D.nao_ouvidos.map(function (x) { return esc(x.grupo.charAt(0).toLowerCase() + x.grupo.slice(1)); }).join(" · ") + "</small></li>"]);
      /* os compradores como pontos numa linha (o circulado é o primeiro); a motivação de cada um está na Abertura do percurso */
      var pontos = c.id === "segmentos" && (D.compradores || []).length ?
        "<div class='pc-pontos'>" + rot("Quem pode comprar · o circulado é o primeiro") + "<ol>" + D.compradores.map(function (p) {
          return "<li class='" + (p.foco === "sim" ? "foco" : "") + "'><i></i><b>" + esc(p.nome) + "</b></li>";
        }).join("") + "</ol></div>" : "";
      var conta = (c.id === "custos" || c.id === "receita") ?
        "<p class='pc-conta'><a href='" + CONTA + "'>Para quem quer o número: a conta, em anexo →</a></p>" : "";
      return "<header class='pc-cab'><p class='pc-eyebrow'>" + (n ? "elo " + n + " da cadeia · " : "") + esc(c.componente) + " " + conf(c.confianca) +
        (RESP_DE[c.id] ? " · <b class='pc-resp'>definição " + RESP_DE[c.id] + "</b>" : "") + "</p>" +
        "<h3 class='pc-tit'>" + esc(c.bloco) + "</h3></header>" +
        "<div class='pc-pede'>" + rot("Em aberto com a instituição") + "<p>" + esc(ponto(maiuscula(c.pedido))) + "</p></div>" +
        "<div class='pc-dupla'><div>" + rot("O que já temos") + "<p class='pc-txt'>" + esc(ponto(maiuscula(c.temos))) + "</p></div>" +
        "<div>" + rot("O que ainda não está definido") + "<p class='pc-txt'>" + esc(ponto(maiuscula(c.preciso))) + "</p></div></div>" +
        pontos +
        cond.map(function (a) { return "<p class='pc-cond'><b>Uma das três definições:</b> " + esc(a.titulo) + ", " + esc(ponto(a.texto)) + "</p>"; }).join("") +
        "<div class='pc-listas'><section>" + rot("O que já sabemos", sabe.length) + "<ul class='pc-ul'>" + (sabe.map(function (a) {
          return "<li><b>" + esc(a.titulo) + "</b><button type='button' class='l-elo pc-ver' data-vista='" + a.camada + "'>ver em " + esc((NOME_CAM[a.camada] || a.camada).replace(/^\d+ · /, "")) + " →</button></li>";
        }).join("") || vazio) + "</ul></section>" +
        "<section>" + rot("O que falta definir", falta.length) + "<ul class='pc-ul'>" + (falta.join("") || vazio) + "</ul></section></div>" + conta;
    }
    function ponto(s) { s = String(s || "").trim(); return /[.!?]$/.test(s) ? s : s + "."; }
    var conc = (D.sintese || {}).direcao;
    escreve(direcao,
      "<div class='bmc-dir'><div class='bmc-col'>" +
      /* a coluna da esquerda, curta (molde: a Longevidade): a conclusão, as três respostas numeradas, uma linha da lei do mínimo
         (Liebig; o mínimo vem de sintese.csv, fator_minimo; o parágrafo inteiro, fator_limitante, fica no recorte) e o quadro */
      "<div class='dc-conc'><div class='rotulo'>O que a síntese conclui</div><p class='dc-frase'>" + esc(conc ? ponto(conc.texto) : "") + "</p>" +
      "<ol class='dc-tres'>" + RESPOSTAS.map(function (r, i) {
        var tc = respostaTC(r[0]), minimo = sintTxt("fator_minimo") === r[0];
        return tc[0] ? "<li" + (minimo ? " class='minimo'" : "") + "><button type='button' class='dc-resp' data-pv='" + r[1] + "'><i>" + (i + 1) + "</i><span>" + esc(tc[0]) + (minimo ? " <em class='dc-min'>o mínimo hoje</em>" : "") + "</span></button></li>" : "";
      }).join("") + "</ol>" +
      (function () {
        var v = CONT.vendidos, e = CONT.empate, c = CONT.capacidade, m = RESPOSTAS.filter(function (r) { return r[0] === sintTxt("fator_minimo"); })[0];
        if (!(v && e && c && m)) return "";
        return "<p class='dc-limite'><b>Lei do mínimo</b> sobra capacidade (" + c.valor + " pacotes por ano) e falta quem compre (" + v.valor + " vendidos, " + e.valor + " para a conta fechar). Reforçar o que sobra não muda o resultado.</p>";
      })() + "</div>" +
      "<div class='rotulo'>O modelo de negócio · clique num bloco</div>" +
      "<div class='bmc'>" + D.proposta.map(blocoBmc).join("") + "</div>" +
      elo("direcao") + "</div>" +
      "<div class='pv-cards'>" + D.proposta.map(function (c) {
        return "<div class='pv-card' data-pv='" + c.id + "' style='--pv:" + c.cor + "'>" + card(c) + "</div>";
      }).join("") + "</div></div>");
    mostraBloco = function (id) {
      if (!id || !direcao.querySelector(".pv-card[data-pv='" + id + "']")) id = "proposta";
      selecao.direcao = id === "proposta" ? null : id;
      Array.prototype.forEach.call(direcao.querySelectorAll(".bmc-b, .pv-card"), function (x) { x.classList.toggle("on", x.dataset.pv === id); });
    };
    Array.prototype.forEach.call(direcao.querySelectorAll(".bmc-b, .dc-resp"), function (b) {
      b.addEventListener("click", function () { mostraBloco(b.dataset.pv); estadoNaUrl(); });
    });
    mostraBloco("proposta");
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
  comparativo = !q.get("tempo"); /* com &tempo= a 02 abre já em foco; sem ele, no comparativo */
  if (vSistema) vSistema.classList.toggle("cheia", comparativo);
  tempo(+q.get("tempo") || 2);
  leituraContexto();
  if (!comparativo) leituraSistema(null);
  leituraEcossistema(null, null);
  selecionaServico((D.servicos || []).length ? D.servicos[0].id : null); /* o primeiro pacote abre de saída, com as descrições das entregas */
  abre(q.get("vista") || "contexto", q.get("item") || undefined);
})();
