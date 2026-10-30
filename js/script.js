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
   a frase única); as camadas 01 a 04 são o núcleo; a 05, a direção, é o depois. Tudo em uma tela no desktop.
   29/10/2026 (reunião com o par de projeto, 04_transcricao/29-10_revisao_abas): o tempo é a métrica (o Quanto da 00 e o
   relógio da 02); a 01 vira atores → HDB, em codesenvolvimento com o Einstein → desfechos, com os concorrentes embutidos;
   a 03 é One Page · Pacote · Coorte viva, sem "para quem"; a volta saiu de tudo; a 04 fica oculta até ser retrabalhada. */

(function () {
  "use strict";
  var D = window.HDB;
  var NS = "http://www.w3.org/2000/svg";
  var ENQ = D.enquadramentos;
  var ATOR = {}; D.atores.forEach(function (a) { ATOR[a.id] = a; });
  var ETAPA = {}; D.etapas.forEach(function (e) { ETAPA[e.id] = e; });
  /* as etapas que o cliente vive são E1 a E4; M é o trabalho do método (cruzamento e coorte: C¹ C²) e R é a retenção
     (29/10/2026: a volta saiu de todos os posicionamentos; a etapa só aparece na 04, oculta) */
  var SIGLA_DE = { M: "C¹ C²" };
  function siglaEtapa(id) { return SIGLA_DE[id] || id; }
  var CONT = {}; D.contagens.forEach(function (c) { CONT[c.id] = c; });
  /* a métrica do HDB é o tempo (29/10/2026): a montagem à mão (contagens manual_min · manual_max) contra o cruzamento */
  var MANUAL = CONT.manual_min && CONT.manual_max ? CONT.manual_min.valor + " a " + CONT.manual_max.valor + " " + CONT.manual_max.unidade : "";
  var COLS = D.etapas.map(function (e) { return e.id; });
  /* os três Cs por etapa (de convergencia.csv): a mesma gramática da entrada, lida nas cinco camadas */
  var CSUP = { C1: "C¹", C2: "C²", C3: "C³" }, C_DE_ETAPA = {};
  (D.convergencia || []).forEach(function (c) { (c.etapas || []).forEach(function (x) { (C_DE_ETAPA[x] = C_DE_ETAPA[x] || []).push(c.sigla); }); });
  function csDeEtapas(etapas) { var v = {}; (etapas || []).forEach(function (x) { (C_DE_ETAPA[x] || []).forEach(function (s) { v[s] = true; }); }); return Object.keys(v); }
  function faixaCs(cls) { /* a faixa dos Cs sobre as seis colunas das etapas: C¹ cruzar (E1 E2) · C¹→C² construir (M) · C³ comprovar (E3 E4) · R a retenção */
    return "<div class='" + cls + " z-C1' style='grid-column:span 2'>C¹ CRUZAR</div><div class='" + cls + " z-C2'>C¹→C² CONSTRUIR</div><div class='" + cls + " z-C3' style='grid-column:span 2'>C³ COMPROVAR</div><div class='" + cls + " depois'>R RETENÇÃO</div>";
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
    /* o piso é 0,75 para todas as abas (28/10, à noite: "não quero dar scroll em nada"; o acessório saiu para caber a 1264 × 561).
       A classe `rola` fica como rede: na janela maximizada do usuário nenhuma aba deve acendê-la */
    var alvo = cont.clientHeight - pad - 6, piso = Math.max(+(cont.getAttribute("data-piso") || 0.6), 0.75);
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
    { id: "contexto", n: "00", rot: "Abertura", cam: "contexto", perg: "O dado é de todos. A coorte, alguém paga para ter." },
    { id: "ecossistema", n: "01", rot: "Quem usa, e para quê", cam: "ecossistema", perg: "Quem precisa da coorte, e para chegar aonde?" },
    { id: "sistema", n: "02", rot: "Das bases à coorte", cam: "sistema", perg: "Como um dado público vira algo que alguém paga para ter?" },
    { id: "servicos", n: "03", rot: "O que se vende", cam: "serviços", perg: "O que se vende, e em que ordem?" },
    /* a 04 fica oculta (reunião de 29/10/2026: "vamos ocultar para mexer depois"): sem botão na barra e fora do fio; ?vista=jornadas ainda abre */
    { id: "jornadas", n: "04", rot: "O que o cliente vive", cam: "jornadas", perg: "O que o cliente vive, e o que roda por trás?", oculta: true },
    { id: "direcao", n: "05", rot: "O que decidir", cam: "direção", perg: "O que falta definir para a empresa ficar de pé?" }
  ];
  /* o checkpoint da convergência no cabeçalho: que Cs cada camada acende (C1 cruzamento · C2 coorte · C3 comprovação) */
  var LIT_VISTA = { contexto: ["C1", "C2", "C3"], ecossistema: ["C3"], sistema: ["C1", "C2", "C3"], servicos: ["C2", "C3"], jornadas: ["C1", "C2", "C3"], direcao: ["C1", "C2", "C3"] };
  var PROXIMA = {
    contexto: ["ecossistema", "quem precisa da coorte, e para chegar aonde?"],
    ecossistema: ["sistema", "e quanto tempo leva, hoje e com o HDB?"],
    sistema: ["servicos", "o que, exatamente, se vende?"],
    servicos: ["direcao", "o que falta definir?"],
    jornadas: ["direcao", "o que falta definir?"],
    direcao: ["contexto", "ao começo: a abertura"]
  };
  /* a manchete de cada camada (sintese.csv, manchete_*); a do contexto é a frase única, a que o leitor leva */
  function manchete(id) { var m = (D.sintese || {})[id === "contexto" ? "frase_unica" : "manchete_" + id]; return m ? m.texto : ""; }
  var botoes = {}, vistaAtual = null;
  var nav = document.getElementById("camadas");
  /* as abas como pílulas, na barra (molde: a Sistemática da Longevidade): o número e o nome da camada; a 00 em itálico de livro */
  VISTAS.forEach(function (v) {
    if (v.oculta) return;
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
      if (!botoes[x.id]) return;
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
    return "<button class='l-elo' data-vista='" + p[0] + "'>" + (vista === "direcao" ? "← " : "→ ") + p[1] + "</button>";
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
     28/10 ("tire, não fica claro"). O arco de cima do
     laço de quem pergunta era a volta, tracejada; desde 29/10/2026 é traço cheio (a volta saiu de todos os posicionamentos). Na figura só
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
  var PASSA = {}; (D.passagens || []).forEach(function (p) { PASSA[p.de] = p; });
  var lacoEl = document.getElementById("laco"), leituraCtx = document.getElementById("leitura-ctx");
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
  function montaLaco() {
    if (!lacoEl || lacoEl.firstChild || CS3.length !== 3) return;
    var h = "<svg class='lc-svg' viewBox='0 0 300 170' role='group' aria-label='" + esc(window.HDBC ? HDBC.resumo() : "o laço dos três momentos") + "'>";
    /* as três regiões: os momentos (clicáveis) */
    MOMENTOS.forEach(function (m) {
      var tc = tituloCorpo("momento_" + m.id), rot = m.n + " · " + tc[0] + (tc[1] ? ": " + tc[1] : "");
      h += "<path class='lc-reg lc-reg-" + m.id + "' d='" + REGIAO[m.id] + "' data-momento='" + m.id + "' role='button' tabindex='0' aria-label='" + esc(rot) + "'></path>";
    });
    /* os arcos como traços de pena: uma fita que engrossa no meio e afina nas pontas (um caminho fechado, não um stroke),
       cinza em quem pergunta e na cor do momento na convergência. O arco de cima, que era a volta pontilhada, é traço cheio
       desde 29/10/2026 (a volta saiu de todos os posicionamentos): o laço fecha.
       (O usuário, 28/10: "o símbolo está quebrado, parece feito por uma criança; traga um tom artístico".) */
    h += faixa(ARCO.esqCima, "#9aa3b2");
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
        if (c) return "<button type='button' class='lg-item' data-c='" + k + "' style='--cor:" + CORW[k] + "'><b>" + CSUP[k] + "</b><span>" + esc(c.nome) + "</span></button>";
        var e = ETAPA[k];
        if (!e) return "";
        return "<button type='button' class='lg-item' data-etapa='" + k + "' style='--cor:" + corDe(k) + "'><b>" + siglaEtapa(k) + "</b><span>" + esc(e.curto) + "</span></button>";
      }).join("");
      return "<div class='lg-grupo' style='--cor:" + CORW[m.cor] + "'><button type='button' class='lg-titulo' data-momento='" + m.id + "'><b>" + m.n + "</b><span>" + esc(tc[0]) + "</span></button>" + itens + "</div>";
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
    if (leituraCtx) Array.prototype.forEach.call(leituraCtx.querySelectorAll(".w5-passo"), function (b) {
      b.classList.toggle("on", tipo === "momento" && b.getAttribute("data-momento") === id);
    });
    selecao.contexto = tipo === "momento" ? id : null;
    if (vistaAtual === "contexto") estadoNaUrl();
    /* a linha "como ler" e o detalhe sob a figura saíram (o usuário, 28/10: "já fica entendível ao olhar o desenho e suas legendas") */
  }
  /* a régua do tempo (29/10/2026: "no Quanto, a nossa métrica será tempo"): a montagem à mão, de 2 a 8 semanas por análise,
     contra o HDB, em dias, com o cruzamento em cerca de 20 minutos. Só os rótulos com fonte: sem eixo numérico inventado.
     O 3 · 17 · 65 (vendidos · empate · capacidade) saiu da Abertura e segue na 05, na lei do mínimo.
     A ordem é a da 02 (o usuário, 29/10: "o concorrente à esquerda e o HDB à direita, assim como em 02 Sistema"):
     o eixo corre de 8 semanas, à esquerda, até perto de zero, à direita, onde fica o HDB. */
  function regua() {
    var a = CONT.manual_min, b = CONT.manual_max, c = CONT.cruzamento;
    if (!a || !b || !c) return "";
    var W = 600, x0 = 20, x1 = W - 20, y = 56, max = b.valor * 1.06;
    function X(n) { return +(x1 - (x1 - x0) * n / max).toFixed(1); }
    var xa = X(a.valor), xb = X(b.valor);
    var h = "<svg class='regua-svg' viewBox='0 0 " + W + " 120' role='img' aria-label='" + esc("à mão, " + MANUAL + " por análise; com o HDB, dias, com o cruzamento em cerca de " + c.valor + " " + c.unidade) + "'>";
    h += "<line class='rg-base' x1='" + x0 + "' y1='" + y + "' x2='" + x1 + "' y2='" + y + "'/>";
    h += "<line class='rg-feito' x1='" + xb + "' y1='" + y + "' x2='" + xa + "' y2='" + y + "'/>";
    h += "<circle class='rg-no rg-risco' cx='" + xb + "' cy='" + y + "' r='5.5'/><circle class='rg-no rg-risco' cx='" + xa + "' cy='" + y + "' r='5.5'/>";
    h += "<text class='rg-num rg-risco' x='" + xb + "' y='" + (y - 16) + "' text-anchor='start'>" + esc(MANUAL) + "</text>";
    h += "<text class='rg-rot' x='" + xb + "' y='" + (y + 28) + "' text-anchor='start'>à mão, por análise</text>";
    h += "<circle class='rg-no rg-ceu' cx='" + x1 + "' cy='" + y + "' r='6.5'/>";
    h += "<text class='rg-num rg-ceu' x='" + x1 + "' y='" + (y - 16) + "' text-anchor='end'>dias</text>";
    h += "<text class='rg-rot' x='" + x1 + "' y='" + (y + 28) + "' text-anchor='end'>com o HDB</text>";
    h += "<text class='rg-rot rg-fino' x='" + x1 + "' y='" + (y + 52) + "' text-anchor='end'>cruzamento: cerca de " + c.valor + " " + esc(c.unidade) + "</text>";
    return h + "</svg>";
  }
  /* a abertura em sete perguntas (5W2H), para quem chega sem contexto: o molde é a Longevidade (montaAbertura). O usuário,
     28/10: "chame de Abertura, inclusive no conteúdo do quadro à direita, um 5W2H didático e contextualizador a quem está
     tendo contato pela primeira vez". Textos em sintese.csv (w_*); "para quem" lê compradores.csv; "como" são os três
     momentos do laço ao lado (clicar acende o momento na figura); "quanto" leva a régua 3 · 17 · 65, sem reais. */
  function leituraContexto() {
    if (!leituraCtx) return;
    function linha(rot, corpo, cls) { return "<div class='w5" + (cls ? " " + cls : "") + "'><dt>" + rot + "</dt><dd>" + corpo + "</dd></div>"; }
    /* só os nomes: os sete atores da 01 (29/10/2026, "traga o macro sem nichar"); a farmacêutica, que já comprou, circulada.
       compradores.csv segue só na Direção, em Segmentos */
    var comp = ATORES_01.map(function (id) {
      return ATOR[id] ? "<i" + (id === "pharma" ? " class='foco'" : "") + ">" + esc(ATOR[id].curto) + "</i>" : "";
    }).join("");
    var passos = MOMENTOS.map(function (m, i) {
      var tc = tituloCorpo("momento_" + m.id);
      return "<button type='button' class='w5-passo' data-momento='" + m.id + "' style='--cor:" + CORW[m.cor] + "'><b>" + m.n + " " + esc(tc[0]) + "</b>" + esc(sintTxt("w_como_" + (i + 1))) + "</button>";
    }).join("");
    var html = "<dl class='w5h'>" +
      linha("O quê", esc(ponto(sintTxt("w_oque")))) +
      linha("Por quê", esc(ponto(sintTxt("w_porque")))) +
      linha("Para quem", esc(ponto(sintTxt("w_quem"))) + (comp ? "<span class='w5-pes'>" + comp + "</span>" : ""), "w5-quem") +
      linha("Onde", esc(ponto(sintTxt("w_onde")))) +
      linha("Quando", esc(ponto(sintTxt("w_quando")))) +
      linha("Como", esc(ponto(sintTxt("w_como"))) + "<span class='w5-passos'>" + passos + "</span>", "w5-como") +
      linha("Quanto", esc(ponto(sintTxt("w_quanto"))) + regua(), "w5-quanto") +
      "</dl>"; /* sem a linha "depois, as cinco camadas": a barra já as mostra */
    html += elo("contexto");
    escreve(leituraCtx, html);
    Array.prototype.forEach.call(leituraCtx.querySelectorAll(".w5-passo"), function (b) {
      b.addEventListener("click", function () { mostraDetalhe("momento", b.getAttribute("data-momento")); });
    });
  }

  /* ================= 01 · ECOSSISTEMA: os atores → o HDB → os desfechos (29/10/2026) =================
     A reunião com o par de projeto (04_transcricao/29-10_revisao_abas): "na primeira coluna os atores, ao centro o HDB e à
     direita os desfechos esperados de cada ator"; "traga o macro sem nichar, pois essas coortes podem ser usadas para
     diversos fins, assim como a coorte de 100 milhões de brasileiros". Sete atores em linhas: cada um liga ao HDB (a cor diz
     quem paga, o traço diz se já comprou) e o HDB liga ao desfecho daquele ator, na mesma linha. Ao centro, o HDB e o
     Einstein, em codesenvolvimento (a licença desce de um ao outro). No rodapé, quem disputa o mesmo cliente ou o substitui
     de graça: os três concorrentes e o código aberto; clicar num deles abre, no quadro à direita, o site dele: ao vivo onde
     o site aceita ser embutido, um print do dia onde não aceita. Posições fixas: a cena é uma composição, não um layout automático. */
  var eco = document.getElementById("eco"), leituraEco = document.getElementById("leitura-eco");
  var ATORES_01 = ["pharma", "cro", "pesq_academico", "pesq_empresarial", "orgaos", "hospital", "operadora"];
  var RIVAIS = ["techtrials", "precision", "cidacs", "opensource"];
  var W = 230, H = 42, X0 = 20, X1 = 335, X2 = 650, Y0 = 62, PASSO = 51;
  var POS = { hdb: { x: X1, y: 136, col: 1, h: 104 }, einstein: { x: X1, y: 274, col: 1, h: 46 } };
  ATORES_01.forEach(function (id, i) { POS[id] = { x: X0, y: Y0 + i * PASSO, col: 0 }; });
  RIVAIS.forEach(function (id, i) { POS[id] = { x: 40 + i * 210, y: 470, col: 3, w: 190 }; });
  /* o site de cada concorrente: Precision Data e Cidacs recusam ser embutidos (X-Frame-Options: SAMEORIGIN) e o github.com
     também (deny); aí entra o print do dia (img/), com o link. Do código aberto, o repositório de RWE com mais forks no GitHub */
  var DATA_SITE = "29/10/2026";
  var SITE = {
    techtrials: { url: "https://ttrials.com/en", embed: "https://ttrials.com/en", rot: "abrir o site" },
    precision: { url: "https://www.precisiondata.ai/index.html", print: "img/precision.png", rot: "abrir o site" },
    cidacs: { url: "https://cidacs.bahia.fiocruz.br/plataforma/coorte-de-100-milhoes-de-brasileiros/", print: "img/cidacs.png", rot: "abrir a Coorte de 100 Milhões" },
    opensource: { url: "https://github.com/OHDSI/CommonDataModel", embed: "https://ohdsi.github.io/CommonDataModel/", rot: "abrir o repositório",
      nota: "O repositório de dados de pacientes reais com mais forks no GitHub (513 em " + DATA_SITE + "). No Brasil, PySUS e microdatasus baixam e limpam o DATASUS de graça." }
  };
  var setas = [], desfechos = {};
  /* quebra um texto em linhas de até max caracteres, sem partir palavra (o SVG não quebra sozinho) */
  function quebra(s, max) {
    var linhas = [], atual = "";
    String(s || "").split(" ").forEach(function (p) {
      if (atual && (atual + " " + p).length > max) { linhas.push(atual); atual = p; } else atual = atual ? atual + " " + p : p;
    });
    if (atual) linhas.push(atual);
    return linhas;
  }
  (function montaEco() {
    [[X0, "OS ATORES", "a mesma coorte serve a muitos fins"], [X1, "QUEM ENTREGA A COORTE", "em codesenvolvimento com o Einstein"],
     [X2, "DESFECHOS ESPERADOS", "todos precisam de tempo para chegar lá"]].forEach(function (c) {
      texto(eco, c[0], 28, c[1], "col-rot"); texto(eco, c[0], 44, c[2], "col-sub");
      el("line", { x1: c[0], x2: c[0] + W, y1: 52, y2: 52, "class": "col-fio" }, eco);
    });
    el("rect", { x: 20, y: 432, width: 860, height: 104, rx: 6, "class": "faixa" }, eco);
    texto(eco, 40, 454, "QUEM DISPUTA O MESMO CLIENTE, OU O SUBSTITUI DE GRAÇA · clique para ver o site", "faixa-rot");
    var camadaSetas = el("g", {}, eco), camadaAtores = el("g", {}, eco);
    function borda(id, lado) {
      var p = POS[id], w = p.w || W, h = p.h || H;
      return lado === "dir" ? [p.x + w, p.y + h / 2] : lado === "esq" ? [p.x, p.y + h / 2] : lado === "baixo" ? [p.x + w / 2, p.y + h] : [p.x + w / 2, p.y];
    }
    function curva(d, m) {
      var c1 = [d[0] + (m[0] - d[0]) * 0.45, d[1]], c2 = [d[0] + (m[0] - d[0]) * 0.55, m[1]];
      return "M" + d.join(",") + " C" + c1.join(",") + " " + c2.join(",") + " " + m.join(",");
    }
    /* cada ator entra e sai do HDB numa altura própria da borda, para as sete setas não se sobreporem */
    var hdb = POS.hdb, entra = {}, sai = {};
    ATORES_01.forEach(function (id, i) {
      var y = +(hdb.y + 12 + i * (hdb.h - 24) / (ATORES_01.length - 1)).toFixed(1);
      entra[id] = [hdb.x, y]; sai[id] = [hdb.x + W, y];
    });
    D.fluxos.forEach(function (f) {
      var a = POS[f.de], b = POS[f.para], d, m, path;
      if (!a || !b) return;
      if (a.col === b.col) { /* o HDB e o Einstein, um sobre o outro: a licença desce em linha reta */
        d = borda(f.de, "baixo"); m = borda(f.para, "cima");
        path = "M" + d.join(",") + " L" + m.join(",");
      } else {
        var ator = f.de === "hdb" ? f.para : f.de;
        d = borda(ator, "dir"); m = entra[ator] || borda("hdb", "esq");
        path = curva(d, m);
      }
      var cor = ENQ[f.enquadramento].cor;
      var p = el("path", { d: path, "class": "seta t-" + f.tipo, stroke: cor }, camadaSetas);
      el("circle", { cx: m[0], cy: m[1], r: 3.2, fill: cor, "class": "seta-ponta" }, camadaSetas);
      setas.push({ f: f, p: p, meio: [(d[0] + m[0]) / 2, (d[1] + m[1]) / 2], cor: cor });
    });
    /* do HDB ao desfecho de cada ator, na linha dele: um fio fino, aceso quando o ator está aberto */
    ATORES_01.forEach(function (id) {
      var a = ATOR[id], y = POS[id].y;
      if (!a || !a.desfecho) return;
      var fio = el("path", { d: curva(sai[id], [X2, y + H / 2]), "class": "fio-desfecho" }, camadaSetas);
      var g = el("g", { "class": "ator desfecho clicavel c-" + a.confianca, tabindex: 0, role: "button", "aria-label": "desfecho esperado de " + a.curto + ": " + a.desfecho }, camadaAtores);
      el("rect", { x: X2, y: y, width: W, height: H, rx: 4 }, g);
      var ls = quebra(maiuscula(a.desfecho), 34).slice(0, 2), yl = y + H / 2 - (ls.length - 1) * 7 + 4;
      ls.forEach(function (l, i) { texto(g, X2 + 9, yl + i * 14, l, "desf"); });
      clicavel(g, function () { selecionaEco(selecao.ecossistema === "a:" + id ? null : "a:" + id); estadoNaUrl(); });
      desfechos[id] = { g: g, fio: fio };
    });
    Object.keys(POS).forEach(function (id) {
      var a = ATOR[id], pz = POS[id], h = pz.h || H, w = pz.w || W;
      if (!a) return;
      var cls = "ator clicavel c-" + a.confianca + (id === "hdb" ? " projeto" : pz.col === 1 ? " dentro" : "") + (pz.col === 3 ? " rival" : "");
      var g = el("g", { "class": cls, tabindex: 0, role: "button" }, camadaAtores);
      el("rect", { x: pz.x, y: pz.y, width: w, height: h, rx: 4 }, g);
      if (id === "hdb") { /* a caixa do HDB, mais alta: o nome e o que faz (o papel até os dois-pontos) */
        texto(g, pz.x + 12, pz.y + 32, a.curto, "nome");
        quebra(maiuscula(a.papel.split(":")[0]), 34).slice(0, 3).forEach(function (l, i) { texto(g, pz.x + 12, pz.y + 54 + i * 15, l, "papel"); });
      } else texto(g, pz.x + 10, pz.y + h / 2 + 4, a.curto, "nome");
      clicavel(g, function () { selecionaEco(selecao.ecossistema === "a:" + id ? null : "a:" + id); estadoNaUrl(); });
      pz.g = g;
    });
    /* os números das setas, numa camada acima das caixas: o número liga a seta à linha da leitura (28/10) */
    var camadaNums = el("g", { "class": "nums" }, eco);
    setas.forEach(function (s) {
      s.r = el("g", { "class": "rot-seta" }, camadaNums);
      el("circle", { cx: s.meio[0], cy: s.meio[1], r: 9, fill: s.cor }, s.r);
      s.t = texto(s.r, s.meio[0], s.meio[1] + 3.5, "", "", "middle");
    });
    texto(eco, 880, 558, "setas: cor = quem paga · cheia = já comprou · tracejada = a confirmar · pontilhada = fornece sem pagar", "nota-svg", "end");
  })();
  var numFluxo = {};
  function selecionaEco(item) {
    selecao.ecossistema = item;
    var ator = item && item.indexOf("a:") === 0 ? item.slice(2) : null;
    var fluxo = item && item.indexOf("f:") === 0 ? item.slice(2) : null;
    Object.keys(POS).forEach(function (id) {
      if (!POS[id].g) return;
      var on = id === ator || (fluxo && setas.some(function (s) { return s.f.id === fluxo && (s.f.de === id || s.f.para === id); }));
      POS[id].g.classList.toggle("on", !!on);
    });
    /* o desfecho acende com o seu ator, com uma relação dele, ou com o HDB (que entrega a todos) */
    Object.keys(desfechos).forEach(function (id) {
      var on = id === ator || ator === "hdb" || (fluxo && setas.some(function (s) { return s.f.id === fluxo && s.f.de === id; }));
      desfechos[id].g.classList.toggle("on", !!on);
      desfechos[id].fio.classList.toggle("on", !!on);
      desfechos[id].fio.classList.toggle("apaga", !!item && !on);
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
  /* na lista, o centro pelo nome curto: com as oito relações do HDB, "Health Data Brasil" em toda linha empurrava a ficha */
  var NA_LISTA = { hdb: "HDB", einstein: "Einstein" };
  function itemFluxo(f, ativo) {
    var n = numFluxo[f.id], cor = ENQ[f.enquadramento].cor;
    return "<li class='clicavel t-" + f.tipo + (ativo ? " on" : "") + "' tabindex='0' data-fluxo='" + f.id + "' style='border-left-color:" + cor + "'>" +
      (n ? "<span class='n' style='background:" + cor + "'>" + n + "</span>" : "") +
      "<b>" + esc(NA_LISTA[f.de] || ATOR[f.de].curto) + " → " + esc(NA_LISTA[f.para] || ATOR[f.para].curto) + "</b>: " + esc(f.oque) +
      "<span class='cs-mini'>" + csDeEtapas(f.etapas).map(function (s) { return CSUP[s]; }).join(" ") + "</span></li>";
  }
  /* o site do concorrente no quadro à direita: a janela ao vivo (o site a 40 %, para caber inteiro) ou o print do dia */
  function siteHtml(id) {
    var s = SITE[id], a = ATOR[id];
    if (!s || !a) return "";
    var janela = s.embed ?
      "<div class='embed-janela'><iframe src='" + s.embed + "' title='" + esc("o site de " + a.curto) + "' loading='lazy' referrerpolicy='no-referrer' sandbox='allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox'></iframe></div>" :
      "<a class='embed-janela' href='" + s.url + "' target='_blank' rel='noopener'><img src='" + s.print + "' alt='" + esc("o site de " + a.curto + ", em " + DATA_SITE) + "' loading='lazy'></a>";
    return "<div class='bloco embed'><div class='rotulo'>" + (s.embed ? "O site, ao vivo" : "O site, em " + DATA_SITE) + "</div>" + janela +
      (s.nota ? "<p class='embed-nota'>" + esc(s.nota) + "</p>" : "") +
      "<p class='embed-pe'>" + (s.embed ? "" : "o site não deixa ser embutido: a imagem é do dia · ") +
      "<a href='" + s.url + "' target='_blank' rel='noopener'>" + esc(s.rot) + " ↗</a></p></div>";
  }
  function leituraEcossistema(ator, fluxo) {
    var html = "";
    if (ator) {
      var a = ATOR[ator], rival = RIVAIS.indexOf(ator) >= 0;
      var seus = D.fluxos.filter(function (f) { return f.de === ator || f.para === ator; });
      html += "<div class='bloco ficha'><div class='rotulo'>" + (rival ? "Quem disputa o cliente" : ator === "hdb" || ator === "einstein" ? "Ao centro" : "Ator") + " " + conf(a.confianca) + "</div><h3>" + esc(a.nome) + "</h3><p>" + esc(maiuscula(a.papel)) + ".</p></div>";
      if (a.desfecho) html += "<div class='bloco'><div class='rotulo'>Desfecho esperado</div><p class='desf-txt'>" + esc(ponto(maiuscula(a.desfecho))) + "</p></div>";
      if (seus.length) html += "<div class='bloco'><div class='rotulo'>" + (seus.length > 1 ? "As relações com o HDB" : "A relação com o HDB") + "</div><ul class='lista'>" +
        seus.map(function (f) { return itemFluxo(f, false); }).join("") + "</ul></div>";
      /* o site primeiro (é o que a reunião pediu no quadro à direita). Na Techtrials há também o comparativo dos fundadores
         (comparativo.csv): os dois juntos não cabiam sem rolar, então duas pílulas trocam um pelo outro, num clique */
      if (ator === "techtrials" && (D.comparativo || []).length) {
        html += "<div class='alterna' role='tablist'><button type='button' class='on' data-alt='site' role='tab'>O site, ao vivo</button><button type='button' data-alt='compara' role='tab'>Nas palavras dos fundadores</button></div>" +
          "<div data-bloco='site'>" + siteHtml(ator) + "</div>" +
          "<div data-bloco='compara' hidden><div class='bloco'><div class='rotulo'>Nas palavras dos fundadores " + conf(D.comparativo[0].confianca) + "</div><table class='compara'><thead><tr><th></th><th>Health Data Brasil</th><th>" + esc(ATOR.techtrials.curto) + "</th></tr></thead><tbody>" +
          D.comparativo.map(function (r) { return "<tr><th>" + esc(r.tema) + "</th><td>" + esc(maiuscula(r.hdb)) + "</td><td>" + esc(maiuscula(r.rival)) + "</td></tr>"; }).join("") + "</tbody></table></div></div>";
      } else if (rival) html += siteHtml(ator);
    } else {
      /* uma coisa primeiro (Goh): a tese em caixa; os outros achados só pelo título e uma linha, à vista (nada no mouse) */
      var achs = D.achados.filter(function (a) { return a.camada === "ecossistema"; }), a0 = achs[0];
      if (a0) html += "<div class='bloco'><div class='achado tese'><b>" + esc(a0.titulo) + "</b>" + (window.HDBC ? HDBC.etiquetas(a0.c) : "") + "<span>" + esc(maiuscula(a0.texto)) + ".</span></div>" +
        achs.slice(1).map(function (a) { return "<div class='achado mini'><b>" + esc(a.titulo) + "</b><span>" + esc(maiuscula(a.texto)) + ".</span></div>"; }).join("") + "</div>";
    }
    if (fluxo && !ator) {
      var fl = D.fluxos.filter(function (f) { return f.id === fluxo; })[0];
      if (fl) html += "<div class='bloco'><div class='rotulo'>A relação com o HDB</div><ul class='lista'>" + itemFluxo(fl, true) + "</ul></div>";
    }
    html += elo("ecossistema");
    escreve(leituraEco, html);
    Array.prototype.forEach.call(leituraEco.querySelectorAll("[data-fluxo]"), function (li) {
      clicavel(li, function () { var alvo = "f:" + li.dataset.fluxo; selecionaEco(selecao.ecossistema === alvo ? null : alvo); estadoNaUrl(); });
    });
    Array.prototype.forEach.call(leituraEco.querySelectorAll(".alterna button"), function (b) {
      b.addEventListener("click", function () {
        Array.prototype.forEach.call(leituraEco.querySelectorAll(".alterna button"), function (x) { x.classList.toggle("on", x === b); x.setAttribute("aria-selected", x === b ? "true" : "false"); });
        Array.prototype.forEach.call(leituraEco.querySelectorAll("[data-bloco]"), function (x) { x.hidden = x.getAttribute("data-bloco") !== b.getAttribute("data-alt"); });
        encaixa(leituraEco);
      });
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
    [1, "Hoje, à mão", "cada base baixada, limpa e arrumada em separado: <b>" + esc(MANUAL) + "</b> por análise (estimativa), em tabelas soltas, sem a mesma pessoa ligada entre elas"],
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
  /* o relógio entre os dois olhares (reunião de 29/10/2026: "um relógio no meio, pois esse é o gancho de diferenciação entre
     eles e a grande métrica do HDB; não importa o desfecho dos múltiplos atores, todos necessitarão de tempo para atingi-lo,
     e o método 3Cs tem seu valor nessa agilidade"). O mostrador a traço de pena, como o laço da 00 (faixa); a fatia é o
     cruzamento, cerca de 20 minutos; de um lado o tempo à mão, do outro o do HDB. Só aparece no comparativo, com o .duo */
  (function montaRelogio() {
    var rel = document.getElementById("relogio");
    if (!rel || !c20) return;
    var k = +(0.5523 * 40).toFixed(2), a1 = 50 + k, a0 = 50 - k;
    var quartos = ["M50,10 C" + a1 + ",10 90," + a0 + " 90,50", "M90,50 C90," + a1 + " " + a1 + ",90 50,90",
                   "M50,90 C" + a0 + ",90 10," + a1 + " 10,50", "M10,50 C10," + a0 + " " + a0 + ",10 50,10"];
    var ang = 360 * Math.min(+c20.valor, 59) / 60, rad = (ang - 90) * Math.PI / 180;
    var fx = (50 + 33 * Math.cos(rad)).toFixed(2), fy = (50 + 33 * Math.sin(rad)).toFixed(2);
    var h = "<svg class='rl-svg' viewBox='0 0 100 100' role='img' aria-label='" + esc("o tempo, a métrica do HDB: à mão, " + MANUAL + " por análise; com o HDB, dias, com o cruzamento em cerca de " + c20.valor + " " + c20.unidade) + "'>";
    h += "<path class='rl-fatia' d='M50,50 L50,17 A33,33 0 " + (ang > 180 ? 1 : 0) + " 1 " + fx + "," + fy + " Z'/>";
    for (var i = 0; i < 12; i++) {
      var r = i * Math.PI / 6, r1 = i % 3 ? 32 : 29;
      h += "<line class='rl-marca' x1='" + (50 + r1 * Math.sin(r)).toFixed(2) + "' y1='" + (50 - r1 * Math.cos(r)).toFixed(2) + "' x2='" + (50 + 35 * Math.sin(r)).toFixed(2) + "' y2='" + (50 - 35 * Math.cos(r)).toFixed(2) + "'/>";
    }
    quartos.forEach(function (d) { h += faixa(d, "#16233a"); });
    h += "<line class='rl-ponteiro' x1='50' y1='50' x2='50' y2='26'/><line class='rl-ponteiro rl-min' x1='50' y1='50' x2='" + fx + "' y2='" + fy + "'/><circle cx='50' cy='50' r='2.6' fill='#16233a'/></svg>";
    rel.innerHTML = "<p class='rl-rot'>O tempo</p>" + h +
      "<p class='rl-lado rl-hoje'><b>← " + esc(MANUAL) + "</b>à mão</p>" +
      "<p class='rl-lado rl-hdb'><b>dias →</b>cruzamento em cerca de " + c20.valor + " " + esc(c20.unidade) + "</p>" +
      "<p class='rl-nota'>todo ator precisa de tempo até o seu desfecho: os três Cs o encurtam</p>";
  })();
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
      no("no-hoje", 400, yMeio - 60, 250, 120, "Quem precisa da coorte", "baixa cada base, limpa e concilia à mão", MANUAL + " por análise (estimativa)");
      seta("fio-hoje", 650, yMeio, 700, yMeio);
      no("no-saida", 700, yMeio - 45, 180, 90, "Tabelas por base", "uma pessoa não se liga", "de uma base à outra");
      texto(sis, 400, 372, "Os 11 artigos dos fundadores usaram tabelas prontas, sem cruzar bases:", "nota-svg");
      texto(sis, 400, 386, "provam o método antigo, não a plataforma (dito pelos fundadores).", "nota-svg");
    } else {
      texto(sis, 880, 52, "com o HDB · o sistema dos três Cs", "tempo-rot", "end");
      /* três bandas, uma por C: cruzar → construir → comprovar. A coorte guardada (One Page, coorte viva) ainda está por
         construir; a volta tracejada saiu em 29/10/2026 ("nada de a volta, elimine isso de todos os posicionamentos").
         Cada banda é clicável e abre a ficha do C na leitura (como os grupos do funil na Longevidade abrem o M). */
      var BY = 64, BH2 = 300, BANDA = { C1: [362, 186], C2: [564, 154], C3: [736, 144] };
      CS3.forEach(function (c) {
        var x = BANDA[c.sigla][0], w = BANDA[c.sigla][1];
        var g = el("g", { "class": "banda clicavel banda-" + c.sigla, tabindex: 0, role: "button", "aria-label": SUPC[c.sigla] + " " + c.nome }, sis);
        el("rect", { x: x, y: BY, width: w, height: BH2, rx: 10 }, g);
        texto(g, x + 12, BY + 22, SUPC[c.sigla] + " " + c.nome.toUpperCase(), "banda-rot");
        texto(g, x + 12, BY + 36, c.verbo, "banda-verbo");
        var cx = x + 12;
        /* só as etapas que o cliente vive (E1 a E4): o M é o trabalho do próprio C e, como sigla, não dizia nada (o usuário, 28/10) */
        (c.etapas || []).filter(function (e) { return e !== "M"; }).forEach(function (e) {
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
      no("no-saida a-construir", 576, 206, 130, 60, "Coorte guardada", "One Page", "e coorte viva");
      texto(sis, 576, 284, "a construir", "construir-rot");
      no("no-saida", 748, 112, 120, 66, "Análise", "funciona? quanto?", "com que certeza?");
      no("no-saida", 748, 206, 120, 66, "Entrega", "ao SUS, ao plano", "ou à revista");
      seta("fio-c", 536, 162, 576, 147, "ponta-c");
      seta("fio-c", 706, 147, 748, 145, "ponta-c");
      seta("fio-ouro", 808, 178, 808, 206, "ponta");
      texto(sis, 362, 384, "Os dados pessoais ficam só no cruzamento; o grupo sai sem eles (privacidade).", "nota-svg");
      texto(sis, 362, 398, "O cruzamento ainda não foi testado lado a lado com a Techtrials. Clique numa banda para ler o C.", "nota-svg");
    }
    texto(sis, 20, 425, foco ? "clique numa base para ver o que ela cobre · o outro olhar está no cartão de cima · \"lado a lado\" volta ao comparativo" : "clique neste olhar para abri-lo ao lado, com a leitura", "nota-svg");
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
      /* sem o glossário nem a passagem (vivem na 04 e no vault) e sem a lista das etapas: a ficha precisa caber sem rolar */
      html += "<div class='bloco ficha'><div class='rotulo'>" + SUPC[id] + " · " + esc(c.nome) + " · " + esc(c.verbo) + " " + conf(c.confianca) + "</div><h3>" + esc(maiuscula(c.oque)) + ".</h3></div>";
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
        "<p>Quem precisa da coorte baixa cada base, limpa e concilia à mão: <b>" + esc(MANUAL) + "</b> por análise <span class='c-provavel'>(estimativa)</span>. O resultado são tabelas por base, soltas.</p>" +
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
     volta (até 29/10/2026), o que já foi feito e o que falta construir, e o que cada pacote destrava adiante. Um pacote que contém outro
     inteiro diz "tudo do X" e lista só o que acrescenta, como os pacotes da Longevidade. O usuário (28/10): "e sobre os
     segmentos, que eles falaram de oncologia, cirurgia, ou por cliente; gere um portfólio e coloque na aba Serviços assim
     como no projeto Longevidade". A matriz serviços × etapas que vivia aqui saiu: a cobertura está nos grupos dos cartões.
     Três pacotes, pelo princípio do usuário: "a pergunta é do cliente, a coorte é do HDB e a comprovação é a análise";
     saíram o painel para o gestor (canal condicionado a edital) e a coorte entregue (perde valor sem a comprovação). */
  var portfolio = document.getElementById("portfolio");
  var LINHA_ESTADO = { vendido: ["vendido", "ok"], a_validar: ["sem concorrente · a validar", "ceu"], expertise: ["expertise dos inventores · demanda a confirmar", "ouro"], parcial: ["parcial · concorrente presente", "cinza"], aspiracao: ["aspiração", "cinza"] };
  /* 29/10/2026: One Page · Pacote · Coorte viva, nessa ordem; sem "para quem" ("servem para todos os atores") e sem a volta */
  var SERV = {}, ORDEM_C = ["C1", "C2", "C3"], NOME_C = {};
  /* não há mais pacote "aberto": os três cartões levam tudo, lado a lado (o usuário, 28/10: "a última coluna, pacote em aberto,
     é redundante; tire e dê maior enfoque de tamanho e tela aos três itens do portfólio"). `?item=` só realça um cartão */
  function selecionaServico(id) {
    selecao.servicos = id || null;
    if (!portfolio) return;
    Array.prototype.forEach.call(portfolio.querySelectorAll(".pf-cartao"), function (c) { c.classList.toggle("on", !!id && c.getAttribute("data-serv") === id); });
  }
  (function montaPortfolio() {
    if (!portfolio || !(D.servicos || []).length) return;
    var ENT = {}; (D.entregas || []).forEach(function (e) { ENT[e.id] = e; });
    var COMP = {}; (D.componentes || []).forEach(function (c) { (COMP[c.servico] = COMP[c.servico] || []).push(c.entrega); });
    CS3.forEach(function (c) { NOME_C[c.sigla] = CSUP[c.sigla] + " " + c.verbo; });
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
    var h = "", linhas = "";
    /* as linhas clínicas, abaixo dos pacotes: a primeira tela abre nos três cartões ("uma coisa primeiro") */
    if ((D.linhas || []).length) {
      /* só nome e estado: a leitura de cada linha vive no vault e no recorte (cortar o acessório para caber sem rolar, 28/10) */
      linhas += "<div class='pf-linhas'><span class='pf-rot'>As linhas clínicas</span><div class='pf-chips'>" + D.linhas.map(function (l) {
        var est = LINHA_ESTADO[l.estado] || [l.estado, "cinza"];
        return "<span class='pf-linha pf-" + est[1] + (l.estado === "a_validar" || l.estado === "aspiracao" ? " pf-trac" : "") + "'><b>" + esc(l.nome) + "</b><i>" + esc(est[0]) + "</i></span>";
      }).join("") + "</div></div>";
    }
    /* um cartão por produto: a descrição, o que entra (só o nome de cada entrega: a descrição vive no recorte) e o que destrava.
       Sem "para quem" e sem a etiqueta de quem paga, que também definia público (29/10/2026: "servem para todos os atores") */
    var cartoes = D.servicos.map(function (s) {
      var p = SERV[s.id];
      var corpo = (p.base ? "<p class='pf-base'>Tudo do " + esc(p.base.nome) + "</p><p class='pf-mais'>O que só este produto acrescenta</p>" : "") +
        ORDEM_C.filter(function (c) { return p.grupos[c]; }).map(function (c) {
          return "<p class='pf-c' style='--cor:" + CORW[c] + "'>" + esc(NOME_C[c] || c) + "</p><ul class='pf-lista'>" + p.grupos[c].map(function (e) {
            return "<li class='" + (e.estado === "feito" ? "pf-feito" : "pf-abrir") + "' style='--cor:" + CORW[c] + "'>" + esc(e.nome) + "</li>";
          }).join("") + "</ul>";
        }).join("");
      return "<article class='pf-cartao c-" + s.confianca + "' data-serv='" + s.id + "'><h3>" + esc(s.nome) + "</h3>" +
        "<p class='pf-desc'>" + esc(maiuscula(s.descricao)) + ".</p>" + corpo +
        "<p class='pf-destrava'><span class='pf-sub'>Destrava adiante</span>" + p.destrava + "</p>" +
        "<p class='pf-pe'>" + conf(s.confianca) + "</p></article>";
    }).join("");
    h += "<div class='pf-grade'>" + cartoes + "</div>";
    /* o rodapé numa linha: a legenda das cores à esquerda, as linhas clínicas à direita (para caber sem rolar a 1264 × 561) */
    h += "<div class='pf-rodape'><p class='pf-leg'>" + ORDEM_C.map(function (c) { return "<span class='pf-leg-c' style='--cor:" + CORW[c] + "'>" + esc(NOME_C[c]) + "</span>"; }).join("") +
      "<span><i>itálico: a construir</i></span></p>" + linhas + "</div>";
    /* sem "o que já sabemos": os achados desta camada vivem no recorte e na Direção (cortar o acessório para caber sem rolar, 28/10) */
    /* sem "o que isso revela" (o usuário, 28/10: "tire isso"): a chave revela_servicos segue no vault e no recorte */
    h += "<p class='pf-revela'>" + elo("servicos") + "</p>";
    escreve(portfolio, h);
  })();

  /* ================= 04 · JORNADAS: o blueprint ================= */
  (function montaBlueprint() {
    var J = {}; D.jornada.forEach(function (j) { J[j.etapa] = j; });
    function linha(rotulo, cel) {
      return "<div class='bp-lin'>" + rotulo + "</div>" + COLS.map(function (c) { return cel(J[c], ETAPA[c]).replace("<div", c === "R" ? "<div class='depois'" : "<div").replace("class='depois' class='", "class='depois "); }).join("");
    }
    var h = "<div class='bp'><div class='bp-zona vazio'></div>" + faixaCs("bp-zona");
    /* a espera antes da etapa (jornada.espera · Goh, "a rota real"): um círculo vazado e a duração, em itálico */
    h += "<div class='bp-lin'></div>" + COLS.map(function (c) { return "<div class='bp-cab" + (c === "R" ? " depois" : "") + "'><small>" + siglaEtapa(c) + "</small><b>" + esc(ETAPA[c].curto) + "</b><small>" + esc(J[c].quando) + "</small>" +
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
    var NOME_CAM = {}, OCULTA = {}; VISTAS.forEach(function (v) { NOME_CAM[v.id] = v.n + " · " + v.rot.toLowerCase(); if (v.oculta) OCULTA[v.id] = true; });
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
          /* sem o elo quando a camada está oculta (a 04, desde 29/10/2026) */
          return "<li><b>" + esc(a.titulo) + "</b>" + (OCULTA[a.camada] ? "" : "<button type='button' class='l-elo pc-ver' data-vista='" + a.camada + "'>ver em " + esc((NOME_CAM[a.camada] || a.camada).replace(/^\d+ · /, "")) + " →</button>") + "</li>";
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
  selecionaServico(selecao.servicos); /* só realça o pacote vindo da URL; de saída, nenhum: os três se leem inteiros */
  abre(q.get("vista") || "contexto", q.get("item") || undefined);
})();
