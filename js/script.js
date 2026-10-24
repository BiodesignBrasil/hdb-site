/* Percurso · Health Data Brasil (24/10/2026): a roda
   A entrada deixou de rolar. Os seis movimentos ficam num aro que gira (rolagem, arrasto, setas ou clique) e o
   movimento ativo vem para a frente do painel de leitura. Depois do sexto vem o primeiro: a síntese é viva, e a
   leitura é um ciclo, como o processo que ela descreve. No centro do aro, os três Cs (sistematica/js/convergencia.js),
   acendendo os que o movimento ativo toca; o aro externo é como se lê, o anel interno é o que o HDB faz.
   Seis movimentos lidos de window.HDB (js/data.js, GERADO dos CSVs em 08_sintese/dados):
     1 De onde partimos      ← sintese (em_uma_frase, pergunta, por_que_agora), contagens, glossario (coluna c)
     2 O que olhamos         ← as quatro camadas (texto fixo: nomes e perguntas) + contagem de achados
     3 O que encontramos     ← achados por camada (coluna c); olhar_do_cliente
     4 O que fecha           ← sintese (resposta, porque, teste_de_valor), achados "fecho", contagens empate/vendidos
     5 O que falta           ← lacunas_publicas (G1 · G2 · G3)
     6 O que mudou           ← publicacoes; carimbo ← versao
   Sem reais nesta peça. Os caminhos ../sistematica/ e ../../09_avaliacao_economica/ valem no vault;
   o publicador reescreve para sistematica/ e caso-economico/. Estado na URL: #partida … #mudou (os links das
   outras peças continuam valendo). prefers-reduced-motion: a roda muda sem girar e a órbita para. */
(function () {
  "use strict";
  var D = window.HDB;
  if (!D) return;
  var HC = window.HDBC;
  var SIS = "sistematica/", CONTA = "caso-economico/";
  var reduz = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function esc(s) { return String(s === null || s === undefined ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function conf(c) { var t = { confirmado: "confirmado", provavel: "provável", aberto: "em aberto" }[c]; return t ? "<span class='conf conf-" + c + "'>" + t + "</span>" : ""; }
  function ponto(s) { s = String(s || "").trim(); return /[.!?]$/.test(s) ? s : s + "."; }
  function maiuscula(s) { s = s || ""; return s.charAt(0).toUpperCase() + s.slice(1); }
  var CONT = {}; (D.contagens || []).forEach(function (c) { CONT[c.id] = c; });
  var S = D.sintese || {};
  function sint(k) { return S[k] || { texto: "", confianca: "aberto" }; }

  /* ---------- os seis movimentos: a estrutura da roda ---------- */
  var MOV = [
    { id: "partida", nome: "De onde partimos", linhas: ["De onde", "partimos"] },
    { id: "camadas", nome: "O que olhamos", linhas: ["O que", "olhamos"] },
    { id: "achados", nome: "O que encontramos", linhas: ["O que", "encontramos"] },
    { id: "fecha", nome: "O que fecha", linhas: ["O que", "fecha"] },
    { id: "falta", nome: "O que falta", linhas: ["O que", "falta"] },
    { id: "mudou", nome: "O que mudou", linhas: ["O que", "mudou"] }
  ];
  var N = MOV.length;

  /* ---------- 1 · de onde partimos ---------- */
  document.getElementById("lead").textContent = ponto(sint("em_uma_frase").texto) + " Esta é a síntese do projeto, em seis movimentos, para quem decide dentro da instituição.";
  var nums = [
    [D.bases.length, "bases públicas", "DATASUS, ANS, IBGE, CadÚnico"],
    [D.atores.length, "atores no ecossistema", D.fluxos.length + " relações de dinheiro, " + D.fluxos.filter(function (f) { return f.tipo === "pagamento"; }).length + " confirmadas"],
    [D.etapas.length, "etapas, da pergunta ao reuso", "cruzamento em cerca de " + (CONT.cruzamento ? CONT.cruzamento.valor + " " + CONT.cruzamento.unidade : "20 minutos")],
    [D.achados.filter(function (a) { return a.camada === "fecho"; }).length, "condições para o spin-off", "licença, cartas de intenção, preço"]
  ];
  document.getElementById("numeros").innerHTML = nums.map(function (n) { return "<div class='num'><b>" + n[0] + "</b><span>" + esc(n[1]) + "</span><small>" + esc(n[2]) + "</small></div>"; }).join("");
  document.getElementById("pergunta").innerHTML = esc(sint("pergunta").texto) + conf(sint("pergunta").confianca);
  document.getElementById("por-que-agora").innerHTML = esc(ponto(sint("por_que_agora").texto));
  document.getElementById("glossario").innerHTML = "<p class='rotulo-mini'>As palavras para ler o resto</p>" + (D.glossario || []).map(function (g) {
    return "<div class='gl'><b>" + (HC && g.c && g.c.length ? HC.sigla(g.c[0]) : "") + esc(g.termo) + "</b><p>" + esc(ponto(g.explicacao)) + "</p></div>";
  }).join("");

  /* ---------- 2 · o que olhamos ---------- */
  var CAMADAS = [
    { id: "ecossistema", n: "Camada 01", t: "Quem paga, quem ganha", p: "Quem paga o spin-off, e quem colhe o ganho da evidência? Treze atores e oito relações de dinheiro; três concorrentes.", ico: "<svg viewBox='0 0 24 24'><circle cx='12' cy='12' r='3'/><circle cx='4' cy='6' r='2'/><circle cx='20' cy='6' r='2'/><circle cx='4' cy='18' r='2'/><circle cx='20' cy='18' r='2'/><path d='M6 7l4 3M18 7l-4 3M6 17l4-3M18 17l-4-3'/></svg>" },
    { id: "sistema", n: "Camada 02", t: "Das bases à coorte", p: "Como o dado público, que é de todos, vira uma coorte que alguém paga para ter: hoje à mão, e com o HDB.", ico: "<svg viewBox='0 0 24 24'><rect x='3' y='4' width='6' height='4' rx='1'/><rect x='3' y='10' width='6' height='4' rx='1'/><rect x='3' y='16' width='6' height='4' rx='1'/><path d='M9 6h4a3 3 0 0 1 3 3v6a3 3 0 0 0 3 3h2M9 12h12M9 18h4a3 3 0 0 0 3-3V9a3 3 0 0 1 3-3h2'/></svg>" },
    { id: "servicos", n: "Camada 03", t: "O que se oferece", p: "O que o spin-off vende em cada etapa, e quem paga cada parte. Só um serviço é vendido hoje.", ico: "<svg viewBox='0 0 24 24'><rect x='3' y='5' width='18' height='4' rx='1'/><rect x='3' y='11' width='12' height='4' rx='1'/><rect x='3' y='17' width='8' height='4' rx='1'/></svg>" },
    { id: "jornadas", n: "Camada 04", t: "O que se vive", p: "O que o cliente vive, etapa por etapa, e o que roda por trás da linha de visibilidade.", ico: "<svg viewBox='0 0 24 24'><path d='M3 12h4l2-5 4 10 2-5h6'/></svg>" }
  ];
  document.getElementById("cartoes-camadas").innerHTML = CAMADAS.map(function (c) {
    var n = D.achados.filter(function (a) { return a.camada === c.id; }).length;
    return "<a class='passo' href='" + SIS + "?vista=" + c.id + "'><div class='icone'>" + c.ico + "</div><div class='cat'>" + c.n + "</div><b>" + esc(c.t) + "</b><p>" + esc(c.p) + "</p><div class='ir'>Abrir · " + n + " achado" + (n === 1 ? "" : "s") + " →</div></a>";
  }).join("");

  /* ---------- 3 · o que encontramos ---------- */
  var NOME = { ecossistema: "Quem paga", sistema: "Das bases à coorte", servicos: "O que se oferece", jornadas: "O que se vive" };
  var ORDEM = { ecossistema: 1, sistema: 2, servicos: 3, jornadas: 4 };
  document.getElementById("lista-achados").innerHTML = D.achados.filter(function (a) { return a.camada !== "fecho"; }).sort(function (a, b) { return ORDEM[a.camada] - ORDEM[b.camada]; }).map(function (a) {
    return "<div class='ach'><a class='et et-" + a.camada + "' href='" + SIS + "?vista=" + a.camada + "'>" + esc(NOME[a.camada]) + "</a><div><b>" + esc(a.titulo) + "</b>" + (HC ? HC.etiquetas(a.c) : "") + "<span>" + esc(ponto(maiuscula(a.texto))) + "</span></div></div>";
  }).join("");
  document.getElementById("olhar-cliente").innerHTML = "<p class='rotulo-mini ouro'>Pelo olhar de quem compra</p><p>" + esc(ponto(sint("olhar_do_cliente").texto)) + " " + conf(sint("olhar_do_cliente").confianca) + "</p><p style='margin-top:8px'><a href='" + SIS + "?vista=jornadas'>Ver o que o cliente vive, etapa por etapa →</a></p>";

  /* ---------- 4 · o que fecha ---------- */
  var resp = sint("resposta").texto, primeira = resp.split(".")[0];
  document.getElementById("resposta-titulo").textContent = primeira + ".";
  document.getElementById("resposta").innerHTML = esc(ponto(resp.slice(primeira.length + 1).trim())) + conf(sint("resposta").confianca);
  document.getElementById("porque").innerHTML = esc(ponto(sint("porque").texto)) + conf(sint("porque").confianca);
  var emp = CONT.empate, ven = CONT.vendidos;
  document.getElementById("contagem-dupla").innerHTML = (emp ? "<div class='cd ouro'><b>" + emp.valor + "</b><span>" + esc(emp.rotulo) + " · " + esc(emp.unidade) + "</span><small>" + esc(ponto(emp.leitura)) + "</small></div>" : "") +
    (ven ? "<div class='cd risco'><b>" + ven.valor + "</b><span>" + esc(ven.rotulo) + " · " + esc(ven.unidade) + "</span><small>" + esc(ponto(ven.leitura)) + "</small></div>" : "");
  document.getElementById("condicoes").innerHTML = "<p class='rotulo-mini'>As três condições, antes de abrir a empresa</p>" + D.achados.filter(function (a) { return a.camada === "fecho"; }).map(function (a) {
    return "<div class='cond'><div><b>" + esc(a.titulo) + "</b>" + (HC ? HC.etiquetas(a.c) : "") + "<span>" + esc(ponto(maiuscula(a.texto))) + "</span></div></div>";
  }).join("");
  document.getElementById("teste-de-valor").textContent = ponto(sint("teste_de_valor").texto);

  /* ---------- 5 · o que falta ---------- */
  var GATES = [["G1", "Constituição", "Decide se a empresa pode nascer"], ["G2", "Captação", "Decide se ela consegue capital e clientes"], ["G3", "Operação", "Só importa depois de nascer"]];
  document.getElementById("portoes").innerHTML = GATES.map(function (g) {
    var itens = (D.lacunas_publicas || []).filter(function (l) { return l.gate === g[0]; });
    return "<div class='portao " + g[0].toLowerCase() + "'><h3>" + esc(g[1]) + "</h3><p class='decide'>" + esc(g[2]) + " · " + itens.length + " item" + (itens.length === 1 ? "" : "s") + "</p><ul>" + itens.map(function (l) {
      var prazo = l.prazo === "a definir" ? "<span class='aberto'>prazo a definir</span>" : "<span>até: " + esc(l.prazo) + "</span>";
      return "<li><b>" + esc(l.titulo) + "</b><span>quem resolve: " + esc(l.papel) + "</span>" + prazo + "</li>";
    }).join("") + "</ul></div>";
  }).join("");

  /* ---------- 6 · o que mudou + carimbo ---------- */
  var V = D.versao || {};
  function dataBR(s) { var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || ""); return m ? m[3] + "/" + m[2] + "/" + m[1] : s; }
  document.getElementById("publicacoes").innerHTML = (D.publicacoes || []).slice().reverse().map(function (p) {
    return "<li class='" + (p.versao === V.numero ? "atual" : "") + "'><div class='v'>Publ. " + p.versao + "<small>" + dataBR(p.data) + "</small></div><div><b>" + esc(p.titulo) + "</b><p>" + esc(ponto(p.o_que_mudou)) + "</p></div></li>";
  }).join("");
  document.getElementById("carimbo").textContent = "Estado em " + dataBR(V.data) + " · publicação " + V.numero + " · " + (V.titulo || "") + " · base: vault do projeto Health Data Brasil";

  /* ---------- os Cs que cada movimento acende (do dado onde há dado; fixo onde é estrutura) ---------- */
  function csDe(lista) { var v = {}; lista.forEach(function (a) { (a.c || []).forEach(function (s) { v[s] = true; }); }); return Object.keys(v); }
  var SEC_C = {
    partida: csDe(D.glossario || []),
    camadas: null,
    achados: csDe(D.achados.filter(function (a) { return a.camada !== "fecho"; })),
    fecha: csDe(D.achados.filter(function (a) { return a.camada === "fecho"; })),
    falta: ["C1", "C3", "volta"],
    mudou: null
  };

  /* ---------- os passos no fim de cada painel: anterior · próximo (o sexto volta ao primeiro) ---------- */
  MOV.forEach(function (m, i) {
    var ant = MOV[(i - 1 + N) % N], prox = MOV[(i + 1) % N], ultimo = i === N - 1;
    var div = document.createElement("div"); div.className = "passos-roda";
    div.innerHTML = "<button type='button' class='pr ant' data-i='" + ((i - 1 + N) % N) + "'>← " + (((i - 1 + N) % N) + 1) + " · " + esc(ant.nome) + "</button>" +
      "<button type='button' class='pr prox" + (ultimo ? " volta" : "") + "' data-i='" + ((i + 1) % N) + "'>" + (ultimo ? "↻ 1 · " + esc(prox.nome) + " · a leitura recomeça" : ((i + 1) % N + 1) + " · " + esc(prox.nome) + " →") + "</button>";
    document.getElementById(m.id).appendChild(div);
  });
  Array.prototype.forEach.call(document.querySelectorAll(".pr"), function (b) { b.addEventListener("click", function () { vai(+b.getAttribute("data-i")); }); });

  /* ---------- a roda ---------- */
  var svg = document.getElementById("roda-svg"), CX = 400, CY = 400, R = 205, NR = 26, RL = R + NR + 79;
  function pol(a, r) { var t = a * Math.PI / 180; return [+(CX + r * Math.cos(t)).toFixed(2), +(CY + r * Math.sin(t)).toFixed(2)]; }
  function arco(a1, a2, r) { var p = pol(a1, r), q = pol(a2, r), grande = (a2 - a1) % 360 > 180 ? 1 : 0; return "M" + p[0] + "," + p[1] + " A" + r + "," + r + " 0 " + grande + " 1 " + q[0] + "," + q[1]; }
  /* o nó i mora no ângulo 60·i (0 = à direita, de frente para o painel); girar o aro em -60·i traz o nó i para a frente */
  var h = "<circle class='orbita' cx='" + CX + "' cy='" + CY + "' r='" + (R + 68) + "'/>";
  h += "<g id='roda-g'><circle class='aro' cx='" + CX + "' cy='" + CY + "' r='" + R + "'/>";
  h += "<path class='aro-volta' d='" + arco(300 + 7, 360 - 7, R) + "'/>";
  h += "<path class='aro-prog' id='aro-prog' d=''/>";
  MOV.forEach(function (m, i) {
    var a = 60 * i, p = pol(a, R), l = pol(a, RL);
    h += "<g class='no' data-i='" + i + "' tabindex='0' role='button' aria-label='" + (i + 1) + " · " + esc(m.nome) + "'>" +
      "<circle cx='" + p[0] + "' cy='" + p[1] + "' r='" + NR + "'/>" +
      "<text class='num' x='" + p[0] + "' y='" + (p[1] + 7) + "' text-anchor='middle'>" + (i + 1) + "</text>" +
      "<g class='rot' style='transform-origin:" + l[0] + "px " + l[1] + "px'><text class='nome' x='" + l[0] + "' y='" + l[1] + "' text-anchor='middle'>" +
      "<tspan x='" + l[0] + "' dy='-4'>" + esc(m.linhas[0]) + "</tspan><tspan x='" + l[0] + "' dy='25'>" + esc(m.linhas[1]) + "</tspan></text></g></g>";
  });
  h += "</g>";
  svg.innerHTML = h;
  var g = document.getElementById("roda-g"), prog = document.getElementById("aro-prog");
  var nos = Array.prototype.slice.call(svg.querySelectorAll(".no")), rots = Array.prototype.slice.call(svg.querySelectorAll(".rot"));
  nos.forEach(function (el) {
    el.addEventListener("click", function () { vai(+el.getAttribute("data-i")); });
    el.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); vai(+el.getAttribute("data-i")); } });
  });

  var ativo = -1, theta = 0; /* theta: rotação acumulada do aro, em graus; nunca dá a volta mais longa */
  function aplica(t, semTransicao) {
    if (semTransicao) { g.classList.add("sem"); rots.forEach(function (r) { r.classList.add("sem"); }); }
    g.style.transform = "rotate(" + t + "deg)";
    rots.forEach(function (r) { r.style.transform = "rotate(" + (-t) + "deg)"; });
    if (semTransicao) { void g.getBoundingClientRect(); g.classList.remove("sem"); rots.forEach(function (r) { r.classList.remove("sem"); }); }
  }
  function vai(i, imediato) {
    i = ((i % N) + N) % N;
    var alvo = -60 * i, delta = ((alvo - theta) % 360 + 540) % 360 - 180; /* o caminho mais curto */
    theta += delta;
    aplica(theta, imediato || reduz);
    if (i === ativo) return;
    ativo = i;
    var m = MOV[i];
    MOV.forEach(function (x, k) { document.getElementById(x.id).classList.toggle("on", k === i); });
    nos.forEach(function (el, k) { el.classList.toggle("on", k === i); el.classList.toggle("lido", k < i); });
    prog.setAttribute("d", i === 0 ? "" : arco(7, 60 * i - 7, R));
    var painel = document.getElementById("painel"); painel.scrollTop = 0;
    if (HC) {
      HC.desenha(document.getElementById("cv-centro"), { lit: SEC_C[m.id] });
      document.getElementById("cv-centro-leg").textContent = "neste movimento: " + (SEC_C[m.id] ? HC.nomes(SEC_C[m.id]) : "os três Cs, e a volta");
    }
    try { history.replaceState(null, "", "#" + m.id); } catch (e) { /* file:// em alguns navegadores */ }
    document.title = "Health Data Brasil · " + (i + 1) + " · " + m.nome;
  }

  /* rolagem = giro. Dentro do painel, a rolagem primeiro rola o painel; no fim dele, gira a roda. */
  var trava = 0;
  document.getElementById("palco").addEventListener("wheel", function (e) {
    var painel = document.getElementById("painel");
    if (painel.contains(e.target)) {
      var desce = painel.scrollTop + painel.clientHeight < painel.scrollHeight - 1, sobe = painel.scrollTop > 0;
      if ((e.deltaY > 0 && desce) || (e.deltaY < 0 && sobe)) return;
    }
    e.preventDefault();
    var d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(d) < 4) return;
    var agora = Date.now(); if (agora - trava < 750) return; trava = agora;
    vai(ativo + (d > 0 ? 1 : -1));
  }, { passive: false });

  /* setas e página */
  document.addEventListener("keydown", function (e) {
    if (/INPUT|TEXTAREA|SELECT/.test((e.target.tagName || "")) || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); vai(ativo + 1); }
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); vai(ativo - 1); }
    else if (e.key === "Home") { e.preventDefault(); vai(0); }
    else if (e.key === "End") { e.preventDefault(); vai(N - 1); }
  });

  /* arrasto: gira junto com o dedo ou o mouse e encaixa no nó mais próximo ao soltar */
  var arr = null;
  function anguloDe(e) { var r = svg.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; }
  svg.addEventListener("pointerdown", function (e) {
    if (e.target.closest && e.target.closest(".no")) return;
    arr = { a: anguloDe(e), t: theta, mexeu: false };
    try { svg.setPointerCapture(e.pointerId); } catch (x) { /* nada */ }
  });
  svg.addEventListener("pointermove", function (e) {
    if (!arr) return;
    var d = anguloDe(e) - arr.a; d = ((d % 360) + 540) % 360 - 180;
    if (Math.abs(d) > 2) arr.mexeu = true;
    theta = arr.t + d; aplica(theta, true);
  });
  function solta() {
    if (!arr) return;
    var i = Math.round(-theta / 60); arr = null;
    vai(i);
    if (ativo === ((i % N) + N) % N) aplica(theta, false);
  }
  svg.addEventListener("pointerup", solta);
  svg.addEventListener("pointercancel", solta);

  /* estado na URL: #partida … #mudou, inclusive vindo das outras peças */
  function doHash() {
    var id = (location.hash || "").replace("#", ""), i = MOV.map(function (m) { return m.id; }).indexOf(id);
    vai(i < 0 ? 0 : i, true);
  }
  window.addEventListener("hashchange", doHash);
  doHash();
})();
