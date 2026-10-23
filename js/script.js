/* Percurso · Health Data Brasil (23/10/2026)
   Seis movimentos lidos de window.HDB (js/data.js, GERADO dos CSVs em 08_sintese/dados):
     1 De onde partimos      ← sintese (pergunta, por_que_agora), glossario
     2 O que olhamos         ← as quatro camadas (texto fixo: nomes e perguntas das camadas) + contagem de achados
     3 O que encontramos     ← achados por camada; olhar_do_cliente
     4 O que fecha           ← sintese (resposta, porque, teste_de_valor), achados "fecho", contagens empate/vendidos
     5 O que falta           ← lacunas_publicas (G1 · G2 · G3)
     6 O que mudou           ← publicacoes; carimbo ← versao
   Sem reais nesta peça. Os caminhos ../sistematica/ e ../../09_avaliacao_economica/ valem no vault;
   o publicador reescreve para sistematica/ e caso-economico/. Movimento: fio ligado ao scroll (passivo) e reveal por IntersectionObserver. */
(function () {
  "use strict";
  var D = window.HDB;
  if (!D) return;
  var SIS = "sistematica/", CONTA = "caso-economico/";
  function esc(s) { return String(s === null || s === undefined ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function conf(c) { var t = { confirmado: "confirmado", provavel: "provável", aberto: "em aberto" }[c]; return t ? "<span class='conf conf-" + c + "'>" + t + "</span>" : ""; }
  function ponto(s) { s = String(s || "").trim(); return /[.!?]$/.test(s) ? s : s + "."; }
  var CONT = {}; (D.contagens || []).forEach(function (c) { CONT[c.id] = c; });
  var S = D.sintese || {};
  function sint(k) { return S[k] || { texto: "", confianca: "aberto" }; }

  /* ---------- herói ---------- */
  document.getElementById("lead").textContent = ponto(sint("em_uma_frase").texto) + " Esta é a síntese do projeto, em seis movimentos, para quem decide dentro da instituição.";
  var nums = [
    [D.bases.length, "bases públicas", "DATASUS, ANS, IBGE, CadÚnico"],
    [D.atores.length, "atores no ecossistema", D.fluxos.length + " relações de dinheiro, " + D.fluxos.filter(function (f) { return f.tipo === "pagamento"; }).length + " confirmadas"],
    [D.etapas.length, "etapas, da pergunta ao reuso", "cruzamento em cerca de " + (CONT.cruzamento ? CONT.cruzamento.valor + " " + CONT.cruzamento.unidade : "20 minutos")],
    [D.achados.filter(function (a) { return a.camada === "fecho"; }).length, "condições para o spin-off", "licença, cartas de intenção, preço"]
  ];
  document.getElementById("numeros").innerHTML = nums.map(function (n) { return "<div class='num'><b>" + n[0] + "</b><span>" + esc(n[1]) + "</span><small>" + esc(n[2]) + "</small></div>"; }).join("");

  /* ---------- 1 · de onde partimos ---------- */
  document.getElementById("pergunta").innerHTML = esc(sint("pergunta").texto) + conf(sint("pergunta").confianca);
  document.getElementById("por-que-agora").innerHTML = esc(ponto(sint("por_que_agora").texto));
  document.getElementById("glossario").innerHTML = "<p class='rotulo' style='margin-bottom:2px'>As palavras para ler o resto</p>" + (D.glossario || []).map(function (g) {
    return "<div class='gl'><b>" + esc(g.termo) + "</b><p>" + esc(ponto(g.explicacao)) + "</p></div>";
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
    return "<a class='passo rv' href='" + SIS + "?vista=" + c.id + "'><div class='icone'>" + c.ico + "</div><div class='cat'>" + c.n + "</div><b>" + esc(c.t) + "</b><p>" + esc(c.p) + "</p><div class='ir'>Abrir · " + n + " achado" + (n === 1 ? "" : "s") + " →</div></a>";
  }).join("");

  /* ---------- 3 · o que encontramos ---------- */
  var NOME = { ecossistema: "Quem paga", sistema: "Das bases à coorte", servicos: "O que se oferece", jornadas: "O que se vive" };
  var ORDEM = { ecossistema: 1, sistema: 2, servicos: 3, jornadas: 4 };
  document.getElementById("lista-achados").innerHTML = D.achados.filter(function (a) { return a.camada !== "fecho"; }).sort(function (a, b) { return ORDEM[a.camada] - ORDEM[b.camada]; }).map(function (a) {
    return "<div class='ach rv'><a class='et et-" + a.camada + "' href='" + SIS + "?vista=" + a.camada + "'>" + esc(NOME[a.camada]) + "</a><div><b>" + esc(a.titulo) + "</b><span>" + esc(ponto(a.texto.charAt(0).toUpperCase() + a.texto.slice(1))) + "</span></div></div>";
  }).join("");
  document.getElementById("olhar-cliente").innerHTML = "<p class='rotulo'>Pelo olhar de quem compra</p><p>" + esc(ponto(sint("olhar_do_cliente").texto)) + " " + conf(sint("olhar_do_cliente").confianca) + "</p><p style='margin-top:8px'><a href='" + SIS + "?vista=jornadas'>Ver o que o cliente vive, etapa por etapa →</a></p>";

  /* ---------- 4 · o que fecha ---------- */
  var resp = sint("resposta").texto, primeira = resp.split(".")[0];
  document.getElementById("resposta-titulo").textContent = primeira + ".";
  document.getElementById("resposta").innerHTML = esc(ponto(resp.slice(primeira.length + 1).trim())) + conf(sint("resposta").confianca);
  document.getElementById("porque").innerHTML = esc(ponto(sint("porque").texto)) + conf(sint("porque").confianca);
  var emp = CONT.empate, ven = CONT.vendidos;
  document.getElementById("contagem-dupla").innerHTML = (emp ? "<div class='cd ouro'><b>" + emp.valor + "</b><span>" + esc(emp.rotulo) + " · " + esc(emp.unidade) + "</span><small>" + esc(ponto(emp.leitura)) + "</small></div>" : "") +
    (ven ? "<div class='cd risco'><b>" + ven.valor + "</b><span>" + esc(ven.rotulo) + " · " + esc(ven.unidade) + "</span><small>" + esc(ponto(ven.leitura)) + "</small></div>" : "");
  document.getElementById("condicoes").innerHTML = "<p class='rotulo' style='margin-bottom:2px'>As três condições, antes de abrir a empresa</p>" + D.achados.filter(function (a) { return a.camada === "fecho"; }).map(function (a) {
    return "<div class='cond'><div><b>" + esc(a.titulo) + "</b><span>" + esc(ponto(a.texto.charAt(0).toUpperCase() + a.texto.slice(1))) + "</span></div></div>";
  }).join("");
  document.getElementById("teste-de-valor").textContent = ponto(sint("teste_de_valor").texto);

  /* ---------- 5 · o que falta ---------- */
  var GATES = [["G1", "Constituição", "Decide se a empresa pode nascer"], ["G2", "Captação", "Decide se ela consegue capital e clientes"], ["G3", "Operação", "Só importa depois de nascer"]];
  document.getElementById("portoes").innerHTML = GATES.map(function (g) {
    var itens = (D.lacunas_publicas || []).filter(function (l) { return l.gate === g[0]; });
    return "<div class='portao " + g[0].toLowerCase() + " rv'><h3>" + esc(g[1]) + "</h3><p class='decide'>" + esc(g[2]) + " · " + itens.length + " item" + (itens.length === 1 ? "" : "s") + "</p><ul>" + itens.map(function (l) {
      var prazo = l.prazo === "a definir" ? "<span class='aberto'>prazo a definir</span>" : "<span>até: " + esc(l.prazo) + "</span>";
      return "<li><b>" + esc(l.titulo) + "</b><span>quem resolve: " + esc(l.papel) + "</span>" + prazo + "</li>";
    }).join("") + "</ul></div>";
  }).join("");

  /* ---------- 6 · o que mudou + carimbo ---------- */
  var V = D.versao || {};
  function dataBR(s) { var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || ""); return m ? m[3] + "/" + m[2] + "/" + m[1] : s; }
  document.getElementById("publicacoes").innerHTML = (D.publicacoes || []).slice().reverse().map(function (p) {
    return "<li class='rv" + (p.versao === V.numero ? " atual" : "") + "'><div class='v'>Publ. " + p.versao + "<small>" + dataBR(p.data) + "</small></div><div><b>" + esc(p.titulo) + "</b><p>" + esc(ponto(p.o_que_mudou)) + "</p></div></li>";
  }).join("");
  document.getElementById("carimbo").textContent = "Estado em " + dataBR(V.data) + " · publicação " + V.numero + " · " + (V.titulo || "") + " · base: vault do projeto Health Data Brasil";

  /* ---------- movimento: revelar, realçar a âncora, costurar o fio ---------- */
  var reduz = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var rvs = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window && !reduz) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("visto"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    Array.prototype.forEach.call(rvs, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(rvs, function (el) { el.classList.add("visto"); });
  }
  var ancoras = Array.prototype.slice.call(document.querySelectorAll("#ancoras a"));
  var secoes = ancoras.map(function (a) { return document.querySelector(a.getAttribute("href")); });
  var linha = document.getElementById("fio-linha"), perc = document.getElementById("percurso");
  function atualiza() {
    var y = window.scrollY + window.innerHeight * 0.38, atual = -1;
    secoes.forEach(function (s, i) { if (s && s.offsetTop <= y) atual = i; });
    ancoras.forEach(function (a, i) { a.classList.toggle("on", i === atual); });
    if (linha && perc && !reduz) {
      var topo = perc.offsetTop, alt = perc.offsetHeight, fim = window.scrollY + window.innerHeight * 0.6;
      var frac = Math.max(0, Math.min(1, (fim - topo) / alt));
      linha.style.strokeDashoffset = String(100 - frac * 100);
    }
  }
  window.addEventListener("scroll", atualiza, { passive: true });
  window.addEventListener("resize", atualiza);
  window.addEventListener("load", atualiza);
  atualiza();
})();
