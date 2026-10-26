/* Percurso · Health Data Brasil (25/10/2026): a convergência como roda
   A linha principal são os três Cs: C¹ Cruzamento → C² Coorte → C³ Comprovação, lidos de window.HDB.convergencia
   (data.js, GERADO dos CSVs em 08_sintese/dados). Eles são as três paradas da roda (sistematica/js/roda.js); a volta
   (↻ reuso) não é parada, para não quebrar a dinâmica dos três Cs: é o arco de retorno, tracejado enquanto estiver aberta,
   e o seu conteúdo fecha o painel de C³ num bloco recolhido. Cada parada tem um painel curto: um título, uma definição, um número, os achados que
   tocam aquele C (só por título; o clique abre), a condição que precisa estar de pé, o que falta ali, e dois links.
   No centro da roda, o mantra dos três verbos (cruzar · construir · comprovar) e um gancho por passo: o número que
   fica na cabeça (20 minutos, 10 bases, 3 pacotes). Os seis movimentos do percurso são coadjuvantes: ficam numa folha
   que desliza sobre o painel, aberta pelos botões "aprofundar" dos painéis e pelo link sob a roda. Nada do conteúdo
   dos movimentos mudou; mudou a hierarquia.
   O que cada painel lê (tudo pela coluna c dos CSVs): glossario · etapas · contagens · achados · lacunas_publicas.
   Estado na URL: #inicio · #c1 #c2 #c3 (a roda; #volta abre C³) · #partida … #mudou (a folha, os ids antigos continuam valendo).
   Sem reais nesta peça. Os caminhos ../sistematica/ e ../../09_avaliacao_economica/ valem no vault; o publicador reescreve.
   26/10/2026 (método Goh): o painel de repouso é a capa em sete perguntas (sintese.csv, w_*), com os compradores
   como pontos; cada arco da roda leva quem faz a passagem (passagens.csv); a volta mostra o laço do reuso (laco.csv).
   O fio termina na Direção (05 na Sistemática); a conta é anexo e não aparece aqui. */
(function () {
  "use strict";
  var D = window.HDB, HC = window.HDBC, HR = window.HDBR;
  if (!D || !HR) return;
  var SIS = "sistematica/", DIRECAO = SIS + "?vista=direcao";
  var PASSA = {}; (D.passagens || []).forEach(function (p) { PASSA[p.de] = p; });
  function esc(s) { return String(s === null || s === undefined ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function conf(c) { var t = { confirmado: "confirmado", provavel: "provável", aberto: "em aberto" }[c]; return t ? "<span class='conf conf-" + c + "'>" + t + "</span>" : ""; }
  function ponto(s) { s = String(s || "").trim(); return /[.!?]$/.test(s) ? s : s + "."; }
  function maiuscula(s) { s = s || ""; return s.charAt(0).toUpperCase() + s.slice(1); }
  function dataBR(s) { var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || ""); return m ? m[3] + "/" + m[2] + "/" + m[1] : s; }
  var CONT = {}; (D.contagens || []).forEach(function (c) { CONT[c.id] = c; });
  var ETAPA = {}; (D.etapas || []).forEach(function (e) { ETAPA[e.id] = e; });
  var S = D.sintese || {};
  function sint(k) { return S[k] || { texto: "", confianca: "aberto" }; }
  function temC(lista, s) { return (lista || []).indexOf(s) >= 0; }

  var SUP = { C1: "C¹", C2: "C²", C3: "C³", volta: "↻" };
  var CORC = { C1: "#0369a1", C2: "#0f766e", C3: "#a8730e", volta: "#b91c1c" }; /* tinta sobre papel, não neon sobre navy */
  var CONV = D.convergencia || [];
  var VOLTA = CONV.filter(function (c) { return c.sigla === "volta"; })[0] || null;
  var CS3 = CONV.filter(function (c) { return c.sigla !== "volta"; }); /* as três paradas; a volta é o arco de retorno */
  var NOME = { ecossistema: "Quem paga", sistema: "Das bases à coorte", servicos: "O que se oferece", jornadas: "O que se vive", direcao: "O que decidir" };
  var CAM = { ecossistema: ["01", "Quem paga, quem ganha"], sistema: ["02", "Das bases à coorte"], servicos: ["03", "O que se oferece"], jornadas: ["04", "O que se vive"], direcao: ["05", "O que decidir"] };
  var ORDEM = { ecossistema: 1, sistema: 2, servicos: 3, jornadas: 4 };
  var CAMADA_DE = { C1: "sistema", C2: "sistema", C3: "servicos", volta: "jornadas" }; /* a camada da Sistemática que melhor explica cada C */
  var APROFUNDA = { C1: 2, C2: 1, C3: 3, volta: 4 };                                   /* o movimento do percurso que aprofunda cada C */
  var GATE_NOME = { G1: "constituição", G2: "captação", G3: "operação" };
  var MOV = [
    { id: "partida", nome: "De onde partimos" },
    { id: "camadas", nome: "O que olhamos" },
    { id: "achados", nome: "O que encontramos" },
    { id: "fecha", nome: "O que fecha" },
    { id: "falta", nome: "O que falta" },
    { id: "mudou", nome: "O que mudou" }
  ];

  /* ====================== o percurso (seis movimentos), na folha ====================== */
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

  var CAMADAS = [
    { id: "ecossistema", t: "Quem paga, quem ganha", p: "Quem paga o spin-off, e quem colhe o ganho da evidência? Treze atores e oito relações de dinheiro; três concorrentes.", ico: "<svg viewBox='0 0 24 24'><circle cx='12' cy='12' r='3'/><circle cx='4' cy='6' r='2'/><circle cx='20' cy='6' r='2'/><circle cx='4' cy='18' r='2'/><circle cx='20' cy='18' r='2'/><path d='M6 7l4 3M18 7l-4 3M6 17l4-3M18 17l-4-3'/></svg>" },
    { id: "sistema", t: "Das bases à coorte", p: "Como o dado público, que é de todos, vira uma coorte que alguém paga para ter: hoje à mão, e com o HDB.", ico: "<svg viewBox='0 0 24 24'><rect x='3' y='4' width='6' height='4' rx='1'/><rect x='3' y='10' width='6' height='4' rx='1'/><rect x='3' y='16' width='6' height='4' rx='1'/><path d='M9 6h4a3 3 0 0 1 3 3v6a3 3 0 0 0 3 3h2M9 12h12M9 18h4a3 3 0 0 0 3-3V9a3 3 0 0 1 3-3h2'/></svg>" },
    { id: "servicos", t: "O que se oferece", p: "O que o spin-off vende em cada etapa, e quem paga cada parte. Só um serviço é vendido hoje.", ico: "<svg viewBox='0 0 24 24'><rect x='3' y='5' width='18' height='4' rx='1'/><rect x='3' y='11' width='12' height='4' rx='1'/><rect x='3' y='17' width='8' height='4' rx='1'/></svg>" },
    { id: "jornadas", t: "O que se vive", p: "O que o cliente vive, etapa por etapa, e o que roda por trás da linha de visibilidade.", ico: "<svg viewBox='0 0 24 24'><path d='M3 12h4l2-5 4 10 2-5h6'/></svg>" },
    { id: "direcao", t: "O que decidir", p: "O modelo de negócio, bloco a bloco: o que precisamos da instituição, o que já sabemos e o que falta definir.", ico: "<svg viewBox='0 0 24 24'><rect x='3' y='4' width='18' height='16' rx='1'/><path d='M9 4v11M15 4v11M3 15h18M12 15v5'/></svg>" }
  ];
  document.getElementById("cartoes-camadas").innerHTML = CAMADAS.map(function (c) {
    var n = D.achados.filter(function (a) { return a.camada === c.id; }).length;
    return "<a class='passo' href='" + SIS + "?vista=" + c.id + "'><div class='icone'>" + c.ico + "</div><div class='cat'>Camada " + CAM[c.id][0] + "</div><b>" + esc(c.t) + "</b><p>" + esc(c.p) + "</p><div class='ir'>Abrir · " + n + " achado" + (n === 1 ? "" : "s") + " →</div></a>";
  }).join("");

  document.getElementById("lista-achados").innerHTML = D.achados.filter(function (a) { return a.camada !== "fecho"; }).sort(function (a, b) { return ORDEM[a.camada] - ORDEM[b.camada]; }).map(function (a) {
    return "<div class='ach'><a class='et et-" + a.camada + "' href='" + SIS + "?vista=" + a.camada + "'>" + esc(NOME[a.camada]) + "</a><div><b>" + esc(a.titulo) + "</b>" + (HC ? HC.etiquetas(a.c) : "") + "<span>" + esc(ponto(maiuscula(a.texto))) + "</span></div></div>";
  }).join("");
  document.getElementById("olhar-cliente").innerHTML = "<p class='rotulo-mini ouro'>Pelo olhar de quem compra</p><p>" + esc(ponto(sint("olhar_do_cliente").texto)) + " " + conf(sint("olhar_do_cliente").confianca) + "</p><p style='margin-top:8px'><a href='" + SIS + "?vista=jornadas'>Ver o que o cliente vive, etapa por etapa →</a></p>";

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

  var GATES = [["G1", "Constituição", "Decide se a empresa pode nascer"], ["G2", "Captação", "Decide se ela consegue capital e clientes"], ["G3", "Operação", "Só importa depois de nascer"]];
  /* quem ainda não ouvimos (nao_ouvidos.csv · Goh, as caixas vazias): o que falta saber começa por quem não falou */
  document.getElementById("nao-ouvidos").innerHTML = (D.nao_ouvidos || []).length ? "<p class='rotulo-mini'>Quem ainda não ouvimos</p><ul>" + D.nao_ouvidos.map(function (x) {
    return "<li><b>" + esc(x.grupo) + "</b>" + (HC ? HC.etiquetas(x.c) : "") + "<span>" + esc(ponto(maiuscula(x.por_que))) + " <i>Como ouvir: " + esc(ponto(x.como_ouvir)) + "</i></span></li>";
  }).join("") + "</ul>" : "";
  document.getElementById("portoes").innerHTML = GATES.map(function (g) {
    var itens = (D.lacunas_publicas || []).filter(function (l) { return l.gate === g[0]; });
    return "<div class='portao " + g[0].toLowerCase() + "'><h3>" + esc(g[1]) + "</h3><p class='decide'>" + esc(g[2]) + " · " + itens.length + " item" + (itens.length === 1 ? "" : "s") + "</p><ul>" + itens.map(function (l) {
      var prazo = l.prazo === "a definir" ? "<span class='aberto'>prazo a definir</span>" : "<span>até: " + esc(l.prazo) + "</span>";
      return "<li><b>" + esc(l.titulo) + "</b>" + (HC ? HC.etiquetas(l.c) : "") + "<span>quem resolve: " + esc(l.papel) + "</span>" + prazo + "</li>";
    }).join("") + "</ul></div>";
  }).join("");

  var V = D.versao || {};
  document.getElementById("publicacoes").innerHTML = (D.publicacoes || []).slice().reverse().map(function (p) {
    return "<li class='" + (p.versao === V.numero ? "atual" : "") + "'><div class='v'>Publ. " + p.versao + "<small>" + dataBR(p.data) + "</small></div><div><b>" + esc(p.titulo) + "</b><p>" + esc(ponto(p.o_que_mudou)) + "</p></div></li>";
  }).join("");
  document.getElementById("carimbo").textContent = "Estado em " + dataBR(V.data) + " · publicação " + V.numero + " · " + (V.titulo || "") + " · base: vault do projeto Health Data Brasil";

  /* anterior · próximo dentro da folha, entre os seis movimentos */
  MOV.forEach(function (m, i) {
    var ant = (i - 1 + MOV.length) % MOV.length, prox = (i + 1) % MOV.length;
    var div = document.createElement("div"); div.className = "passos-roda";
    div.innerHTML = "<button type='button' class='pr' data-folha='" + ant + "'>← " + (ant + 1) + " · " + esc(MOV[ant].nome) + "</button>" +
      "<button type='button' class='pr" + (prox === 0 ? " volta" : "") + "' data-folha='" + prox + "'>" + (prox === 0 ? "↻ 1 · " : (prox + 1) + " · ") + esc(MOV[prox].nome) + " →</button>";
    document.getElementById(m.id).appendChild(div);
  });

  /* ====================== os painéis da convergência (curtos por regra) ====================== */
  function idDe(sig) { return sig === "volta" ? "volta" : sig.toLowerCase(); }
  function chip(id) { var e = ETAPA[id]; return e ? "<span class='chip' title='" + esc(e.oque) + "'><b>" + esc(e.id) + "</b>" + esc(e.curto) + "</span>" : ""; }
  function numeroHtml(c) {
    var n = (D.contagens || []).filter(function (x) { return temC(x.c, c.sigla); })[0];
    if (n) return "<div class='numero-um'><b>" + n.valor + "</b><div><span>" + esc(n.unidade) + " · " + esc(n.rotulo) + "</span><small>" + esc(ponto(n.leitura)) + " " + conf(n.confianca) + "</small></div></div>";
    if (c.sigla === "C2") return "<div class='numero-um'><b>" + D.bases.length + "</b><div><span>bases públicas · a mesma pessoa em várias</span><small>DATASUS, ANS, IBGE e CadÚnico, sem um número comum entre elas: é o que a coorte junta.</small></div></div>";
    return "";
  }
  function painelC(c, i) {
    var sig = c.sigla, defin = (D.glossario || []).filter(function (g) { return temC(g.c, sig); })[0];
    var achs = D.achados.filter(function (a) { return a.camada !== "fecho" && temC(a.c, sig); }).sort(function (a, b) { return ORDEM[a.camada] - ORDEM[b.camada]; });
    var cond = D.achados.filter(function (a) { return a.camada === "fecho" && temC(a.c, sig); });
    var lacs = (D.lacunas_publicas || []).filter(function (l) { return temC(l.c, sig); });
    var cam = CAMADA_DE[sig], mov = MOV[APROFUNDA[sig]];
    var h = "<p class='rotulo'><b>" + SUP[sig] + "</b>" + esc(c.nome) + "<span class='verbo'>· " + esc(c.verbo) + "</span>" + (c.estado === "aberto" ? "<span class='conf conf-aberto'>a construir</span>" : "") + "</p>";
    h += "<h2>" + esc(ponto(maiuscula(c.oque))) + "</h2>";
    if (defin) h += "<p class='texto'>" + esc(ponto(defin.explicacao)) + "</p>";
    h += "<div class='linha-meio'>" + numeroHtml(c) + "<div class='chips'><span class='chips-rot'>etapas</span>" + (c.etapas || []).map(chip).join("") + "</div></div>";
    h += "<!--b-->";
    if (achs.length) h += "<div class='curtos'><p class='rotulo-mini'>O que encontramos aqui · " + achs.length + "</p>" + achs.map(function (a) {
      return "<details class='ac'><summary><span class='et et-" + a.camada + "'>" + esc(NOME[a.camada]) + "</span>" + esc(a.titulo) + "</summary><p>" + esc(ponto(maiuscula(a.texto))) + " <a href='" + SIS + "?vista=" + a.camada + "'>ver na camada " + CAM[a.camada][0] + " →</a></p></details>";
    }).join("") + "</div>";
    h += cond.map(function (a) { return "<div class='condicao'><p class='rotulo-mini'>O que precisa estar de pé</p><b>" + esc(a.titulo) + "</b><span>" + esc(ponto(maiuscula(a.texto))) + "</span></div>"; }).join("");
    if (lacs.length) {
      var porGate = {}; lacs.forEach(function (l) { porGate[l.gate] = (porGate[l.gate] || 0) + 1; });
      var resumo = Object.keys(porGate).sort().map(function (g) { return porGate[g] + " no portão de " + GATE_NOME[g]; }).join(", ");
      h += "<details class='falta-aqui'><summary>O que falta aqui: " + lacs.length + (lacs.length === 1 ? " item" : " itens") + " · " + resumo + "</summary><ul>" + lacs.map(function (l) {
        return "<li><b>" + esc(l.titulo) + "</b><span>quem resolve: " + esc(l.papel) + " · " + (l.prazo === "a definir" ? "<em>prazo a definir</em>" : "até: " + esc(l.prazo)) + "</span></li>";
      }).join("") + "</ul></details>";
    }
    var pas = PASSA[sig];
    if (pas) h += "<p class='passagem c-" + pas.confianca + "'><b>" + SUP[sig] + " → " + (pas.para === "C1" ? "↻ " : "") + SUP[pas.para] + "</b> " + esc(pas.rotulo) + " · <span>quem leva: " + esc(pas.quem) + "</span></p>";
    if (sig === "C3" && VOLTA) h += blocoVolta();
    h += "<!--links-->";
    h += "<div class='links'><a class='btn navy' href='" + SIS + "?vista=sistema&item=" + sig + "'>Na Sistemática: 02 · o sistema dos três Cs · " + SUP[sig] + " →</a>" +
      (sig === "C3" ? "<a class='btn linha' href='" + DIRECAO + "'>O que a instituição precisa decidir →</a>" : "") +
      "<button type='button' class='btn linha' data-folha='" + APROFUNDA[sig] + "'>Aprofundar: " + (APROFUNDA[sig] + 1) + " · " + esc(mov.nome) + "</button></div>";
    var N = CS3.length, ant = (i - 1 + N) % N, prox = (i + 1) % N, ultimo = i === N - 1;
    h += "<!--passos-->";
    h += "<div class='passos-roda'><button type='button' class='pr' data-vai='" + ant + "'>← " + SUP[CS3[ant].sigla] + " " + esc(CS3[ant].nome) + "</button>" +
      "<button type='button' class='pr" + (ultimo ? " volta" : "") + "' data-vai='" + prox + "'>" + (ultimo ? "↻ " : "") + SUP[CS3[prox].sigla] + " " + esc(CS3[prox].nome) + (ultimo ? " · a leitura recomeça" : " →") + "</button></div>";
    /* duas colunas: a afirmação e os links à esquerda; o que encontramos, a condição e o que falta à direita */
    var p = h.split("<!--b-->"), q = p[1].split("<!--links-->"), r = q[1].split("<!--passos-->");
    return "<div class='pc-grid'><div class='pc-a'>" + p[0] + r[0] + "</div><div class='pc-b'>" + q[0] + "</div></div>" + r[1];
  }
  /* a volta (reuso) não é parada: fecha o painel de C³ como o arco que ainda falta fechar */
  function blocoVolta() {
    var v = VOLTA, aberta = v.estado === "aberto";
    var achs = D.achados.filter(function (a) { return a.camada !== "fecho" && temC(a.c, "volta"); });
    var cond = D.achados.filter(function (a) { return a.camada === "fecho" && temC(a.c, "volta"); });
    var lacs = (D.lacunas_publicas || []).filter(function (l) { return temC(l.c, "volta"); });
    var n = (D.contagens || []).filter(function (x) { return temC(x.c, "volta"); })[0];
    return "<details class='volta-bloco'><summary><b>↻</b><span><strong>A volta: " + esc(v.nome.toLowerCase()) + "</strong> · " + esc(ponto(v.oque)) + (aberta ? " <em>a construir</em>" : "") + "</span></summary>" +
      (n ? "<p class='texto'><strong>" + n.valor + " " + esc(n.unidade) + "</strong> · " + esc(n.rotulo) + ": " + esc(ponto(n.leitura)) + "</p>" : "") +
      achs.map(function (a) { return "<p class='texto'><b>" + esc(a.titulo) + ".</b> " + esc(ponto(maiuscula(a.texto))) + "</p>"; }).join("") +
      cond.map(function (a) { return "<p class='texto'><b>O que precisa estar de pé:</b> " + esc(a.titulo) + ", " + esc(ponto(a.texto)) + "</p>"; }).join("") +
      (lacs.length ? "<p class='texto'><b>O que falta aqui:</b> " + lacs.map(function (l) { return esc(l.titulo); }).join(" · ") + ".</p>" : "") +
      (HC && HC.laco ? HC.laco() : "") +
      "<div class='links'><button type='button' class='btn linha' data-folha='" + APROFUNDA.volta + "'>Aprofundar: " + (APROFUNDA.volta + 1) + " · " + esc(MOV[APROFUNDA.volta].nome) + "</button></div></details>";
  }
  function painelInicio() {
    var p = painelInicioHtml().split("<!--b-->");
    return "<div class='pc-grid'><div class='pc-a'>" + p[0] + "</div><div class='pc-b'>" + p[1] + "</div></div>";
  }
  /* a capa em sete perguntas (molde: a abertura da Longevidade): o quê · por quê · para quem · onde · quando · como · quanto.
     "Para quem" leva os compradores como pontos (o circulado é o primeiro); "como" são os três Cs, que giram a roda;
     "quanto" sai em escala, sem reais, e aponta para a Direção, não para a conta. */
  function painelInicioHtml() {
    function linha(rot, k, extra) {
      var s = sint(k);
      return "<dt>" + rot + "</dt><dd" + (s.confianca !== "confirmado" ? " class='inf'" : "") + ">" + esc(ponto(s.texto)) + (extra || "") + "</dd>";
    }
    var pontos = (D.compradores || []).length ? "<span class='w5-pontos'>" + D.compradores.map(function (p) {
      return "<span class='" + (p.foco === "sim" ? "foco" : "") + "'><i></i>" + esc(p.nome) + "</span>";
    }).join("") + "</span>" : "";
    var passos = "<span class='w5-passos'>" + CS3.map(function (c, i) {
      return "<button type='button' class='pconv' data-vai='" + i + "'>" + (HC ? HC.sigla(c.sigla) : SUP[c.sigla]) + "<strong>" + esc(c.verbo) + "</strong></button>";
    }).join("") + (VOLTA ? "<span class='w5-volta'>" + (HC ? HC.sigla("volta") : SUP.volta) + esc(VOLTA.verbo) + (VOLTA.estado === "aberto" ? " · <em>a construir</em>" : "") + "</span>" : "") + "</span>";
    return "<p class='rotulo'><b>C¹ C² C³</b>A convergência<span class='pill-mini'>spin-off em avaliação</span></p><h2>" + esc(sint("pergunta").texto) + "</h2>" +
      "<p class='texto grande'>" + esc(ponto(sint("resposta").texto)) + conf(sint("resposta").confianca) + "</p>" +
      "<!--b--><dl class='w5h'>" +
      linha("O quê", "w_oque") + linha("Por quê", "w_porque") + linha("Para quem", "w_paraquem", pontos) +
      linha("Onde", "w_onde") + linha("Quando", "w_quando") + linha("Como", "w_como", passos) +
      linha("Quanto", "w_quanto", " <a href='" + DIRECAO + "'>o que a instituição precisa decidir →</a>") + "</dl>" +
      "<p class='como-ler'>Gire a roda ou clique num C. Depois da comprovação vem o cruzamento de novo: a leitura é um ciclo, como o negócio. Em <i>itálico</i>, leitura nossa.</p>";
  }
  CS3.forEach(function (c, i) { document.getElementById("p-" + idDe(c.sigla)).innerHTML = painelC(c, i); });
  document.getElementById("p-inicio").innerHTML = painelInicio();

  /* ====================== encaixe: cada painel cabe na tela, sem rolar (no desktop) ====================== */
  /* o mesmo mecanismo da Sistemática: o conteúdo é escrito num invólucro e recebe um zoom até caber na altura livre.
     Reencaixa ao redimensionar, quando as fontes chegam e quando um achado é aberto. Abaixo de 900px, zoom 1 e a página rola. */
  Array.prototype.forEach.call(document.querySelectorAll(".pc, .mov"), function (p) { p.innerHTML = "<div class='ajusta'>" + p.innerHTML + "</div>"; });
  function encaixa(cont, caixa, folga, piso) {
    var w = cont && cont.firstElementChild;
    if (!w) return;
    w.style.zoom = "1";
    if (window.innerWidth <= 900 || !caixa || !caixa.clientHeight) return;
    var alvo = caixa.clientHeight - folga;
    for (var z = 1; z > piso && w.getBoundingClientRect().height > alvo;) { z -= 0.02; w.style.zoom = z.toFixed(2); }
  }
  function encaixaPainel() { var on = document.querySelector(".pc.on"); if (on) encaixa(on, painel, 66, 0.58); }
  function encaixaFolha() { var on = document.querySelector(".mov.on"); if (on) encaixa(on, document.getElementById("folha-corpo"), 84, 0.5); }
  function reencaixa() { encaixaPainel(); if (folhaAberta >= 0) encaixaFolha(); }
  var esperaEnc;
  window.addEventListener("resize", function () { clearTimeout(esperaEnc); esperaEnc = setTimeout(reencaixa, 150); });
  window.addEventListener("load", reencaixa);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(reencaixa);
  document.addEventListener("toggle", function () { reencaixa(); }, true);

  /* ====================== a roda: os três passos; no centro, o mantra ====================== */
  var PARADAS = CS3.map(function (c, i) {
    var p = { id: idDe(c.sigla), num: SUP[c.sigla], linhas: [c.nome, c.verbo], cor: CORC[c.sigla], aberto: false }, pas = PASSA[c.sigla];
    /* cada arco leva quem faz a passagem ao C seguinte (passagens.csv); a volta, o reuso e quem o leva */
    if (pas && !(i === CS3.length - 1 && VOLTA)) p.arco = { rotulo: "quem leva\n" + pas.quem };
    if (i === CS3.length - 1 && VOLTA) p.arco = { cor: CORC.volta, aberto: VOLTA.estado === "aberto", rotulo: "↻ " + VOLTA.nome.toLowerCase() + " · " + (VOLTA.estado === "aberto" ? "a construir" : "em uso") + (pas ? "\nquem leva: " + pas.quem : "") };
    return p;
  });
  /* o centro: o mantra dos três verbos, e um gancho por passo (o número que fica na cabeça) */
  function ganchoDe(c) {
    var n = (D.contagens || []).filter(function (x) { return temC(x.c, c.sigla); })[0];
    if (n) return n.valor + " " + n.unidade + " · " + n.rotulo.toLowerCase();
    if (c.sigla === "C2") return D.bases.length + " bases públicas, uma pessoa";
    return "";
  }
  var centro = "<div class='mantra' id='mantra'><p class='mantra-rot'>a convergência</p><ol class='mantra-lista'>" + CS3.map(function (c, i) {
    return "<li data-vai='" + i + "' style='--cor:" + CORC[c.sigla] + "' title='" + esc(c.nome + ": " + c.oque) + "'><b>" + SUP[c.sigla] + "</b><span>" + esc(c.verbo) + "</span></li>";
  }).join("") + "</ol><p class='mantra-gancho' id='mantra-gancho'></p></div>";
  var painel = document.getElementById("painel"), folha = document.getElementById("folha"), veu = document.getElementById("veu"), folhaAberta = -1;
  var roda = HR.cria(document.getElementById("roda"), {
    paradas: PARADAS, tamanho: "grande", progresso: false, arcos: "cores", centro: centro, repouso: true,
    rotulo: HC ? HC.resumo() : "a convergência", rolagem: document.getElementById("palco"), empilha: 900,
    ligado: function () { return folhaAberta < 0; },
    podeRolar: function (e) {
      if (!painel.contains(e.target)) return false;
      var desce = painel.scrollTop + painel.clientHeight < painel.scrollHeight - 1, sobe = painel.scrollTop > 0;
      return (e.deltaY > 0 && desce) || (e.deltaY < 0 && sobe);
    },
    ao: mostra
  });
  function mostra(i) {
    var id = i === null ? "inicio" : PARADAS[i].id;
    Array.prototype.forEach.call(document.querySelectorAll(".pc"), function (p) { p.classList.toggle("on", p.id === "p-" + id); });
    painel.scrollTop = 0;
    encaixaPainel();
    Array.prototype.forEach.call(document.querySelectorAll("#mantra li"), function (li, k) { li.classList.toggle("on", k === i); li.classList.toggle("dim", i !== null && k !== i); });
    var g = document.getElementById("mantra-gancho"); if (g) g.textContent = i === null ? "gire, ou clique num C" : ganchoDe(CS3[i]);
    if (folhaAberta < 0) hash(id);
    document.title = "Health Data Brasil · " + (i === null ? "a convergência" : PARADAS[i].num + " " + CS3[i].nome);
  }
  function hash(id) { try { history.replaceState(null, "", "#" + id); } catch (e) { /* file:// em alguns navegadores */ } }

  /* ====================== a folha: um movimento por vez, sobre o painel ====================== */
  function abreFolha(k) {
    k = ((k % MOV.length) + MOV.length) % MOV.length;
    folhaAberta = k;
    MOV.forEach(function (m, j) { document.getElementById(m.id).classList.toggle("on", j === k); });
    document.getElementById("folha-num").textContent = (k + 1 < 10 ? "0" : "") + (k + 1);
    document.getElementById("folha-nome").textContent = MOV[k].nome;
    folha.hidden = false; veu.hidden = false; document.body.classList.add("com-folha");
    document.getElementById("folha-corpo").scrollTop = 0;
    encaixaFolha();
    hash(MOV[k].id);
    document.getElementById("folha-fechar").focus();
  }
  function fechaFolha() {
    if (folhaAberta < 0) return;
    folhaAberta = -1;
    folha.hidden = true; veu.hidden = true; document.body.classList.remove("com-folha");
    var a = roda.ativo(); hash(a < 0 ? "inicio" : PARADAS[a].id);
  }
  document.getElementById("folha-fechar").addEventListener("click", fechaFolha);
  veu.addEventListener("click", fechaFolha);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") fechaFolha(); });
  /* botões delegados: data-folha abre a folha; data-vai gira a roda */
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-folha],[data-vai]");
    if (!b) return;
    if (b.hasAttribute("data-folha")) abreFolha(+b.getAttribute("data-folha"));
    else { fechaFolha(); roda.vai(+b.getAttribute("data-vai")); }
  });

  /* ====================== estado na URL ====================== */
  function doHash() {
    var id = (location.hash || "").replace("#", ""); if (id === "volta") id = "c3";
    var ip = PARADAS.map(function (p) { return p.id; }).indexOf(id), im = MOV.map(function (m) { return m.id; }).indexOf(id);
    if (ip >= 0) { fechaFolha(); roda.vai(ip, true); }
    else if (im >= 0) { if (roda.ativo() < 0) mostra(null); abreFolha(im); }
    else { fechaFolha(); roda.repouso(true); mostra(null); }
  }
  window.addEventListener("hashchange", doHash);
  doHash();
})();
