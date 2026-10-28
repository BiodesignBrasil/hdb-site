/* GERADO por 08_sintese/dados/build_dados.py a partir dos CSVs. Não editar à mão. */
window.HDB = {
 "atores": [
  {
   "id": "hdb",
   "nome": "Health Data Brasil",
   "papel": "liga a mesma pessoa entre as bases e entrega a análise: o método, a escolha dos códigos, a estatística",
   "curto": "Health Data Brasil",
   "lado": "dentro",
   "confianca": "confirmado"
  },
  {
   "id": "fundadores",
   "nome": "Fundadores (produto · estatística · ciência)",
   "papel": "produto/app · estatística e engenharia de dados · ciência",
   "curto": "Fundadores",
   "lado": "dentro",
   "confianca": "confirmado"
  },
  {
   "id": "infra",
   "nome": "Infraestrutura local",
   "papel": "processamento em máquina local de 32 GB · nuvem bloqueada de propósito",
   "curto": "Infraestrutura local",
   "lado": "dentro",
   "confianca": "confirmado"
  },
  {
   "id": "pharma",
   "nome": "Indústria farmacêutica e empresas de pesquisa clínica",
   "papel": "compra os pacotes para pedir que o SUS e os planos de saúde adotem o remédio · é o cliente principal",
   "curto": "Farmacêutica e pesquisa clínica",
   "lado": "fora",
   "confianca": "confirmado"
  },
  {
   "id": "einstein",
   "nome": "Hospital Israelita Albert Einstein",
   "papel": "dono provável de parte do método (o programa que coleta os dados) · papel na empresa nova em aberto",
   "curto": "Einstein (propriedade e licença)",
   "lado": "fora",
   "confianca": "provavel"
  },
  {
   "id": "orgaos",
   "nome": "Órgãos públicos donos das bases",
   "papel": "DATASUS · IBGE · CadÚnico (via convênio) · fornecem a matéria-prima gratuita",
   "curto": "DATASUS · IBGE · CadÚnico",
   "lado": "fora",
   "confianca": "confirmado"
  },
  {
   "id": "conitec",
   "nome": "CONITEC e SUS",
   "papel": "quem decide o que o SUS adota: recebe a prova no pedido da farmacêutica",
   "curto": "CONITEC e SUS",
   "lado": "fora",
   "confianca": "provavel"
  },
  {
   "id": "pesquisador",
   "nome": "Pesquisadores acadêmicos",
   "papel": "usam a coorte para artigo · pagam com fomento · têm o Cidacs como substituto gratuito",
   "curto": "Pesquisadores",
   "lado": "fora",
   "confianca": "provavel"
  },
  {
   "id": "fomento",
   "nome": "Fomento à pesquisa",
   "papel": "FAPESP · CNPq · até hoje zero resultado para o HDB",
   "curto": "Fomento (FAPESP · CNPq)",
   "lado": "fora",
   "confianca": "confirmado"
  },
  {
   "id": "techtrials",
   "nome": "Techtrials",
   "papel": "concorrente direto · vende acesso seguro a dados de saúde · foco em farmacêuticas e nos pedidos ao SUS",
   "curto": "Techtrials",
   "lado": "fora",
   "confianca": "confirmado"
  },
  {
   "id": "precision",
   "nome": "Precision Data",
   "papel": "concorrente direto · ambiente seguro Tab4u · foco em pharma e ANVISA/CONITEC",
   "curto": "Precision Data",
   "lado": "fora",
   "confianca": "provavel"
  },
  {
   "id": "cidacs",
   "nome": "Cidacs/Fiocruz",
   "papel": "coorte pública de 140 milhões de pessoas, cruzada entre bases · substituto gratuito no segmento acadêmico",
   "curto": "Cidacs (substituto público)",
   "lado": "fora",
   "confianca": "confirmado"
  }
 ],
 "enquadramentos": {
  "pharma": {
   "rotulo": "Pago pela indústria farmacêutica, por empresa de pesquisa clínica ou consultoria",
   "curto": "farmacêutica",
   "cor": "#1C7CF9",
   "fundo": "#DFECFB"
  },
  "spinoff": {
   "rotulo": "Pago pela empresa nova",
   "curto": "empresa",
   "cor": "#0C3A6F",
   "fundo": "#E6ECF3"
  },
  "fomento": {
   "rotulo": "Pago por fomento à pesquisa",
   "curto": "fomento",
   "cor": "#14804A",
   "fundo": "#DDF2E6"
  },
  "publico": {
   "rotulo": "Pago pelo gestor público (licitação)",
   "curto": "gestor público",
   "cor": "#0A7B6A",
   "fundo": "#DDF2E6"
  },
  "operadora": {
   "rotulo": "Pago pela operadora de saúde",
   "curto": "operadora",
   "cor": "#6D28D9",
   "fundo": "#EDE9FE"
  },
  "nenhum": {
   "rotulo": "Ninguém paga (benefício sem pagamento)",
   "curto": "sem pagamento",
   "cor": "#5B6B7F",
   "fundo": "#EEF1F4"
  }
 },
 "fluxos": [
  {
   "id": "F1",
   "de": "pharma",
   "para": "hdb",
   "oque": "pacote de análise",
   "tipo": "pagamento",
   "enquadramento": "pharma",
   "etapas": [
    "E4",
    "V"
   ]
  },
  {
   "id": "F2",
   "de": "hdb",
   "para": "einstein",
   "oque": "pagamento de licença da propriedade intelectual",
   "tipo": "confirmar",
   "enquadramento": "spinoff",
   "etapas": [
    "E2",
    "M",
    "E3",
    "E4"
   ]
  },
  {
   "id": "F4",
   "de": "orgaos",
   "para": "hdb",
   "oque": "dado público (matéria-prima)",
   "tipo": "beneficio",
   "enquadramento": "nenhum",
   "etapas": [
    "M"
   ]
  },
  {
   "id": "F5",
   "de": "hdb",
   "para": "fundadores",
   "oque": "remuneração dos fundadores",
   "tipo": "confirmar",
   "enquadramento": "spinoff",
   "etapas": [
    "E2",
    "M",
    "E3"
   ]
  },
  {
   "id": "F6",
   "de": "pharma",
   "para": "conitec",
   "oque": "a prova, no pedido para o SUS adotar o remédio",
   "tipo": "beneficio",
   "enquadramento": "nenhum",
   "etapas": [
    "E4"
   ]
  },
  {
   "id": "F7",
   "de": "fomento",
   "para": "hdb",
   "oque": "estudo acadêmico, via pesquisador",
   "tipo": "confirmar",
   "enquadramento": "fomento",
   "etapas": [
    "V"
   ]
  },
  {
   "id": "F9",
   "de": "pesquisador",
   "para": "hdb",
   "oque": "pacote para o artigo, pago com o fomento",
   "tipo": "confirmar",
   "enquadramento": "fomento",
   "etapas": [
    "V"
   ]
  },
  {
   "id": "F8",
   "de": "hdb",
   "para": "infra",
   "oque": "processamento local",
   "tipo": "pagamento",
   "enquadramento": "spinoff",
   "etapas": [
    "M"
   ]
  }
 ],
 "etapas": [
  {
   "id": "E1",
   "nome": "Pergunta",
   "curto": "Pergunta",
   "oque": "o cliente faz a pergunta: este tratamento funciona em quem?",
   "recurso": "comercial (inexistente hoje)",
   "gate": "sem compradores por escrito, não há volume",
   "confianca": "provavel"
  },
  {
   "id": "E2",
   "nome": "Desenho do estudo",
   "curto": "Desenho",
   "oque": "escolher os códigos certos de doença e procedimento, trabalho de quem conhece a clínica",
   "recurso": "ciência e curadoria",
   "gate": "a quem pertence o método: ao Einstein ou aos fundadores?",
   "confianca": "provavel"
  },
  {
   "id": "M",
   "nome": "Cruzamento e coorte",
   "curto": "Cruzamento e coorte",
   "oque": "ligar os registros da mesma pessoa entre as bases e montar o grupo",
   "recurso": "máquina local e bases públicas",
   "gate": "privacidade: os dados pessoais ficam só no cruzamento",
   "confianca": "provavel"
  },
  {
   "id": "E3",
   "nome": "Análise e revisão clínica",
   "curto": "Análise",
   "oque": "analisar: funciona? quanto? com que certeza? De um jeito que outro pesquisador possa conferir",
   "recurso": "analista e revisor clínico",
   "gate": "a qualidade ainda não foi publicada: nenhum artigo usou o método",
   "confianca": "provavel"
  },
  {
   "id": "E4",
   "nome": "Entrega e uso",
   "curto": "Entrega",
   "oque": "entregar ao cliente, que leva ao SUS, ao plano de saúde ou à revista científica",
   "recurso": "—",
   "gate": "quem paga pela prova é quem vende o remédio: risco para a reputação",
   "confianca": "provavel"
  },
  {
   "id": "V",
   "nome": "A volta",
   "curto": "Volta",
   "oque": "o mesmo grupo responde à próxima pergunta, sem pagar a montagem de novo",
   "recurso": "coorte guardada (a construir)",
   "gate": "sem cliente que volta, cada venda é um projeto novo",
   "confianca": "provavel"
  }
 ],
 "achados": [
  {
   "camada": "ecossistema",
   "titulo": "Quem mais ganha não paga",
   "texto": "a prova serve ao SUS, que decide o que adotar. Mas quem paga é a farmacêutica, e só quando a prova ajuda o pedido dela",
   "componente": "receita",
   "c": [
    "C3"
   ]
  },
  {
   "camada": "sistema",
   "titulo": "O que se vende é o cruzamento, não o dado",
   "texto": "a matéria-prima é pública, para todos. O valor está em ligar a mesma pessoa entre as bases e escolher os códigos certos",
   "componente": "proposta",
   "c": [
    "C1"
   ]
  },
  {
   "camada": "servicos",
   "titulo": "Cada pacote paga o próprio custo",
   "texto": "cada pacote vendido deixa sobra. O que falta é vender o bastante para pagar a equipe",
   "componente": "receita",
   "c": [
    "C3"
   ]
  },
  {
   "camada": "jornadas",
   "titulo": "Cada cliente é um projeto novo",
   "texto": "sem guardar o grupo de pacientes para a próxima pergunta, a receita não cresce. É onde empresas de dados costumam travar",
   "componente": "relacionamento",
   "c": [
    "volta"
   ]
  },
  {
   "camada": "fecho",
   "titulo": "A licença do método",
   "texto": "a definir com o Einstein, antes de buscar investidor",
   "componente": "parcerias",
   "c": [
    "C1"
   ]
  },
  {
   "camada": "ecossistema",
   "titulo": "A matéria-prima é grátis para todos",
   "texto": "o dado público está aberto também aos concorrentes. O que se vende é o método, e o método ainda não tem um artigo publicado que o prove",
   "componente": "recursos",
   "c": [
    "C1",
    "C3"
   ]
  },
  {
   "camada": "sistema",
   "titulo": "A licença do método ainda não foi definida",
   "texto": "o programa que coleta os dados foi feito na área de informática do Einstein. A licença é condição para a empresa buscar investidor",
   "componente": "parcerias",
   "c": [
    "C1"
   ]
  },
  {
   "camada": "servicos",
   "titulo": "Vender contra consultoria, não contra equipe interna",
   "texto": "comparado a uma consultoria, o pacote ganha em todos os cenários. Comparado a uma equipe interna enxuta, empata",
   "componente": "proposta",
   "c": [
    "C3"
   ]
  },
  {
   "camada": "fecho",
   "titulo": "Compradores por escrito: farmacêuticas e empresas de pesquisa",
   "texto": "compradores suficientes para a conta fechar até o terceiro ano",
   "componente": "segmentos",
   "c": [
    "volta"
   ]
  },
  {
   "camada": "ecossistema",
   "titulo": "Há concorrente local com a mesma promessa",
   "texto": "a Precision Data promete, ao mesmo público, em 2 dias o que levaria 2 semanas",
   "componente": "proposta",
   "c": [
    "C1"
   ]
  },
  {
   "camada": "sistema",
   "titulo": "Tempo dito, não medido",
   "texto": "os 20 minutos são o tempo da máquina, dito pelos fundadores. Ninguém mediu o tempo do pacote inteiro, da pergunta à entrega",
   "componente": "atividades",
   "c": [
    "C1",
    "C2"
   ]
  },
  {
   "camada": "servicos",
   "titulo": "O problema não é fazer, é vender",
   "texto": "a equipe consegue entregar muito mais do que vende. O prejuízo dos primeiros anos é gente parada",
   "componente": "segmentos",
   "c": [
    "volta"
   ]
  },
  {
   "camada": "fecho",
   "titulo": "Preço parecido com o de uma consultoria",
   "texto": "conferido em entrevistas com quem decide compras nas farmacêuticas",
   "componente": "receita",
   "c": [
    "C3"
   ]
  },
  {
   "camada": "servicos",
   "titulo": "Onde a coorte já foi montada, e onde ninguém está",
   "texto": "3 pacotes vendidos em oncologia adulto, a linha mais disputada pelo concorrente. Na patologia cirúrgica, a linha dos inventores, não há concorrente em cirurgia vascular e ainda não há comprador",
   "componente": "segmentos",
   "c": [
    "C2"
   ]
  }
 ],
 "servicos": [
  {
   "id": "pacote",
   "nome": "Pacote de coorte",
   "curto": "Pacote",
   "descricao": "Uma pergunta, o grupo de pacientes montado e a análise pronta, em dias. Sob encomenda, um projeto por vez",
   "enquadramento": "pharma",
   "confianca": "confirmado",
   "para_quem": "Farmacêutica · Consultoria",
   "destrava": "A volta · Coorte viva",
   "etapas": [
    "E1",
    "E2",
    "M",
    "E3",
    "E4"
   ]
  },
  {
   "id": "reuso",
   "nome": "A volta: a mesma coorte, nova pergunta",
   "curto": "Volta",
   "descricao": "Quem já comprou um pacote volta com nova pergunta sobre o mesmo grupo e não paga a montagem de novo. Mais rápido e mais barato que o primeiro",
   "enquadramento": "pharma",
   "confianca": "aberto",
   "para_quem": "Quem já comprou um pacote",
   "destrava": "Coorte viva",
   "etapas": [
    "V",
    "E3",
    "E4"
   ]
  },
  {
   "id": "viva",
   "nome": "Coorte viva",
   "curto": "Coorte viva",
   "descricao": "O grupo guardado e atualizado a cada nova carga das bases, com um relatório do que mudou. Assinatura por ano",
   "enquadramento": "operadora",
   "confianca": "aberto",
   "para_quem": "Operadora · Farmacêutica, depois do lançamento",
   "destrava": "Receita que se repete",
   "etapas": [
    "M",
    "E3",
    "E4",
    "V"
   ]
  }
 ],
 "jornada": [
  {
   "etapa": "E1",
   "quando": "no início",
   "vive": "A gerente de acesso faz a pergunta: este tratamento funciona em quem?",
   "atua": "contato comercial com o HDB (hoje, os próprios fundadores)",
   "bastidor": "—",
   "recurso": "comercial, que hoje não existe",
   "decide": "gerente de acesso e economia da saúde da farmacêutica",
   "fonte": "inferencia",
   "espera": "",
   "paga": [],
   "ganha": []
  },
  {
   "etapa": "E2",
   "quando": "primeira semana",
   "vive": "Define com a equipe o desenho: quais pacientes, qual período, o que medir",
   "atua": "o cientista dos fundadores e a curadoria clínica",
   "bastidor": "escolha dos códigos de doença e de procedimento que capturam cada caso",
   "recurso": "ciência e curadoria clínica",
   "decide": "cliente e HDB, juntos",
   "fonte": "inferencia",
   "espera": "",
   "paga": [],
   "ganha": []
  },
  {
   "etapa": "M",
   "quando": "em seguida",
   "vive": "Espera",
   "atua": "—",
   "bastidor": "cruzamento das bases pela mesma pessoa, em cerca de 20 minutos (dito pelos fundadores)",
   "recurso": "máquina local e bases públicas",
   "decide": "HDB",
   "fonte": "inferencia",
   "espera": "",
   "paga": [],
   "ganha": [
    "hdb"
   ]
  },
  {
   "etapa": "E3",
   "quando": "semanas seguintes",
   "vive": "Recebe o rascunho e devolve dúvidas",
   "atua": "o estatístico dos fundadores, com revisão clínica",
   "bastidor": "análise pronta, de um jeito que outro pesquisador possa conferir",
   "recurso": "analista e revisor clínico",
   "decide": "HDB",
   "fonte": "inferencia",
   "espera": "semanas, até o rascunho",
   "paga": [
    "spinoff"
   ],
   "ganha": [
    "fundadores",
    "infra"
   ]
  },
  {
   "etapa": "E4",
   "quando": "na entrega",
   "vive": "Recebe o grupo e a análise, e usa no pedido ao SUS",
   "atua": "o cliente, que leva ao SUS, ao plano de saúde ou à revista científica",
   "bastidor": "—",
   "recurso": "—",
   "decide": "o SUS, o plano de saúde ou a revista",
   "fonte": "inferencia",
   "espera": "",
   "paga": [
    "pharma"
   ],
   "ganha": [
    "hdb",
    "pharma",
    "conitec"
   ]
  },
  {
   "etapa": "V",
   "quando": "depois",
   "vive": "Volta com nova pergunta sobre o mesmo grupo",
   "atua": "cliente · pesquisadores",
   "bastidor": "grupo guardado, ainda a construir",
   "recurso": "grupo guardado (a construir)",
   "decide": "cliente",
   "fonte": "inferencia",
   "espera": "sem data: só se houver nova pergunta",
   "paga": [
    "pharma",
    "fomento"
   ],
   "ganha": [
    "pharma",
    "hdb"
   ]
  }
 ],
 "cronograma": [
  {
   "id": "A01",
   "fase": "diagnostico",
   "tipo": "atividade",
   "atividade": "Demo do app com proponentes",
   "status": "parcial",
   "evidencia": "respostas oficiais registradas no roteiro · sessão cronometrada com tela gravada ainda não aconteceu",
   "dia_ini": 1,
   "dia_fim": 2
  },
  {
   "id": "A05",
   "fase": "mercado",
   "tipo": "atividade",
   "atividade": "Pesquisa secundária de mercado",
   "status": "feito",
   "evidencia": "análise de mercado com 16 fontes · disposição a pagar ainda sem entrevista",
   "dia_ini": 6,
   "dia_fim": 10
  },
  {
   "id": "A07",
   "fase": "modelo",
   "tipo": "atividade",
   "atividade": "Business Model Canvas: modelo institucional",
   "status": "feito",
   "evidencia": "BMC e Lean no quadro de conceituação · modelo decidido: spin-off",
   "dia_ini": 13,
   "dia_fim": 14
  },
  {
   "id": "A12",
   "fase": "fechamento",
   "tipo": "atividade",
   "atividade": "Pacote de entregáveis finais",
   "status": "aberto",
   "evidencia": "não começou",
   "dia_ini": 19,
   "dia_fim": 20
  },
  {
   "id": "A02",
   "fase": "diagnostico",
   "tipo": "atividade",
   "atividade": "Entrevistas Berg, Wolosker e Freitas",
   "status": "feito",
   "evidencia": "três reuniões transcritas (11, 17 e 18/09) e cruzadas com o roteiro",
   "dia_ini": 2,
   "dia_fim": 4
  },
  {
   "id": "A06",
   "fase": "mercado",
   "tipo": "atividade",
   "atividade": "Análise competitiva Techtrials e HDB",
   "status": "feito",
   "evidencia": "9 métodos de inteligência executados · a Precision Data apareceu e ainda não foi mapeada",
   "dia_ini": 8,
   "dia_fim": 12
  },
  {
   "id": "A08",
   "fase": "modelo",
   "tipo": "atividade",
   "atividade": "Projeção financeira em cenários",
   "status": "parcial",
   "evidencia": "projeção de 5 anos com 14 cenários, com valores provisórios · os dados reais de equipe, volume e preço ainda faltam",
   "dia_ini": 14,
   "dia_fim": 15
  },
  {
   "id": "E04",
   "fase": "fechamento",
   "tipo": "entregavel",
   "atividade": "Pacote final: ficha, mapa de gaps, recomendação e plano de 90 dias",
   "status": "parcial",
   "evidencia": "ficha feita e mapa de gaps feito (registro de lacunas) · recomendação parcial · plano de 90 dias não existe",
   "dia_ini": 20,
   "dia_fim": 20
  },
  {
   "id": "A03",
   "fase": "diagnostico",
   "tipo": "atividade",
   "atividade": "Auditoria de propriedade intelectual com o jurídico",
   "status": "parcial",
   "evidencia": "evidência documental para 2 das 5 camadas · o jurídico do Einstein ainda não foi acionado",
   "dia_ini": 3,
   "dia_fim": 5
  },
  {
   "id": "E02",
   "fase": "mercado",
   "tipo": "entregavel",
   "atividade": "Mapa de mercado: oportunidade, competidores e posicionamento",
   "status": "feito",
   "evidencia": "segmento-alvo escolhido e mapa de concorrentes",
   "dia_ini": 12,
   "dia_fim": 12
  },
  {
   "id": "A09",
   "fase": "modelo",
   "tipo": "atividade",
   "atividade": "Matriz de requisitos por modelo",
   "status": "parcial",
   "evidencia": "virou as 3 condições de constituição do spin-off · a matriz formal não existe",
   "dia_ini": 15,
   "dia_fim": 16
  },
  {
   "id": "M04",
   "fase": "fechamento",
   "tipo": "marco",
   "atividade": "Pacote final entregue: pronto para a decisão de seguir ou não",
   "status": "aberto",
   "evidencia": "depende da nota de viabilização fechar e do plano de 90 dias",
   "dia_ini": 20,
   "dia_fim": 20
  },
  {
   "id": "A04",
   "fase": "diagnostico",
   "tipo": "atividade",
   "atividade": "Revisão dos 11 papers do Wolosker",
   "status": "feito",
   "evidencia": "revisão feita · os papers não fundamentam a plataforma",
   "dia_ini": 1,
   "dia_fim": 4
  },
  {
   "id": "M02",
   "fase": "mercado",
   "tipo": "marco",
   "atividade": "Validação de mercado: pesquisa secundária concluída",
   "status": "feito",
   "evidencia": "oportunidade, competidores e posicionamento mapeados",
   "dia_ini": 12,
   "dia_fim": 12
  },
  {
   "id": "A10",
   "fase": "modelo",
   "tipo": "atividade",
   "atividade": "Construção da recomendação",
   "status": "parcial",
   "evidencia": "nota de viabilização em rodada 1, ainda aberta · prancha de decisão em produção",
   "dia_ini": 16,
   "dia_fim": 17
  },
  {
   "id": "E01",
   "fase": "diagnostico",
   "tipo": "entregavel",
   "atividade": "Ficha de diagnóstico: o que é real, o que é promessa, o que é gap",
   "status": "feito",
   "evidencia": "ficha de diagnóstico da fase 1 com 30 perguntas cruzadas",
   "dia_ini": 5,
   "dia_fim": 5
  },
  {
   "id": "A11",
   "fase": "modelo",
   "tipo": "atividade",
   "atividade": "Apresentação formal aos proponentes",
   "status": "aberto",
   "evidencia": "não aconteceu",
   "dia_ini": 17,
   "dia_fim": 18
  },
  {
   "id": "M01",
   "fase": "diagnostico",
   "tipo": "marco",
   "atividade": "Diagnóstico concluído: clareza sobre o que existe e o que é narrativa",
   "status": "feito",
   "evidencia": "ficha e roteiro respondido",
   "dia_ini": 5,
   "dia_fim": 5
  },
  {
   "id": "E03",
   "fase": "modelo",
   "tipo": "entregavel",
   "atividade": "Recomendação fundamentada: modelo e condições explícitas",
   "status": "parcial",
   "evidencia": "as condições existem · a recomendação aguarda a nota fechar",
   "dia_ini": 18,
   "dia_fim": 18
  },
  {
   "id": "M03",
   "fase": "modelo",
   "tipo": "marco",
   "atividade": "Recomendação pronta: modelo escolhido com critérios e condições",
   "status": "parcial",
   "evidencia": "modelo escolhido (spin-off) · condições dependem de lacunas abertas",
   "dia_ini": 18,
   "dia_fim": 18
  }
 ],
 "contagens": [
  {
   "id": "capacidade",
   "rotulo": "Capacidade da equipe",
   "unidade": "pacotes por ano",
   "leitura": "o que 3 pessoas em tempo integral conseguem entregar: 2 analisando, 1 revisando",
   "confianca": "provavel",
   "valor": 65,
   "c": []
  },
  {
   "id": "empate",
   "rotulo": "Para a conta fechar",
   "unidade": "pacotes por ano",
   "leitura": "quantos pacotes por ano pagam a equipe, ao preço de hoje",
   "confianca": "provavel",
   "valor": 17,
   "c": [
    "volta"
   ]
  },
  {
   "id": "vendidos",
   "rotulo": "Vendidos até hoje",
   "unidade": "pacotes, no total",
   "leitura": "3 projetos avulsos. Nenhum cliente voltou",
   "confianca": "confirmado",
   "valor": 3,
   "c": [
    "C3"
   ]
  },
  {
   "id": "equipe",
   "rotulo": "Equipe",
   "unidade": "pessoas em tempo integral",
   "leitura": "os 3 fundadores, com o tempo de dedicação ainda não combinado",
   "confianca": "provavel",
   "valor": 3,
   "c": []
  },
  {
   "id": "cruzamento",
   "rotulo": "Tempo de cruzamento",
   "unidade": "minutos",
   "leitura": "o tempo da máquina para cruzar as bases, segundo os fundadores. Entregar o pacote inteiro leva semanas",
   "confianca": "confirmado",
   "valor": 20,
   "c": [
    "C1"
   ]
  },
  {
   "id": "primeiro_lucro",
   "rotulo": "Primeiro ano com lucro operacional",
   "unidade": "ano",
   "leitura": "se as vendas subirem de 3 para 30 pacotes por ano",
   "confianca": "provavel",
   "valor": 4,
   "c": [
    "volta"
   ]
  }
 ],
 "bases": [
  {
   "id": "cadunico",
   "dominio": "Cadastros sociais",
   "nome": "CadÚnico",
   "cobre": "114 milhões de pessoas, renda e composição da família · acesso por convênio com o órgão gestor",
   "confianca": "confirmado"
  },
  {
   "id": "sinasc",
   "dominio": "Eventos vitais",
   "nome": "SINASC",
   "cobre": "nascimentos, 97% de cobertura, desde 1994",
   "confianca": "confirmado"
  },
  {
   "id": "sim",
   "dominio": "Eventos vitais",
   "nome": "SIM",
   "cobre": "óbitos com a causa (CID), desde 1975",
   "confianca": "confirmado"
  },
  {
   "id": "sih",
   "dominio": "Atenção hospitalar",
   "nome": "SIH (AIH)",
   "cobre": "internações do SUS, 75% do total, com procedimento e custo · defasagem de 3 a 6 meses",
   "confianca": "confirmado"
  },
  {
   "id": "sia",
   "dominio": "Atenção ambulatorial",
   "nome": "SIA (APAC e BPA)",
   "cobre": "procedimentos ambulatoriais e de alto custo",
   "confianca": "confirmado"
  },
  {
   "id": "sinan",
   "dominio": "Doenças e agravos",
   "nome": "SINAN",
   "cobre": "notificações compulsórias: dengue, HIV, tuberculose, COVID-19",
   "confianca": "confirmado"
  },
  {
   "id": "pni",
   "dominio": "Medicamentos e vacinas",
   "nome": "SI-PNI",
   "cobre": "vacinação, pessoa a pessoa",
   "confianca": "confirmado"
  },
  {
   "id": "cnes",
   "dominio": "Rede assistencial",
   "nome": "CNES",
   "cobre": "estabelecimentos, leitos, equipes e equipamentos, mês a mês",
   "confianca": "confirmado"
  },
  {
   "id": "ans",
   "dominio": "Saúde suplementar",
   "nome": "ANS (TISS)",
   "cobre": "procedimentos dos planos de saúde, 49 milhões de beneficiários",
   "confianca": "confirmado"
  },
  {
   "id": "rnds",
   "dominio": "Saúde suplementar",
   "nome": "RNDS",
   "cobre": "registros do SUS e dos planos no mesmo padrão, desde outubro de 2025",
   "confianca": "provavel"
  }
 ],
 "publicacoes": [
  {
   "data": "2026-10-23",
   "titulo": "Primeira publicação",
   "o_que_mudou": "Sistemática em quatro camadas e painel do caso econômico publicados pela primeira vez · site criado como repositório público, só com arquivos gerados do vault",
   "versao": 1
  },
  {
   "data": "2026-10-23",
   "titulo": "Uma história só",
   "o_que_mudou": "Entrada em três passos, barra comum nas três páginas e o painel ligado ao fim da Sistemática · a camada 02 passou a mostrar as dez bases públicas e como viram uma coorte, em vez de números da conta",
   "versao": 2
  },
  {
   "data": "2026-10-23",
   "titulo": "A marca do HDB",
   "o_que_mudou": "As três páginas vestiram a identidade do site oficial: Montserrat, azul-marinho, céu e verde-água · rótulos de seção com travessão e cartões com borda colorida",
   "versao": 3
  },
  {
   "data": "2026-10-23",
   "titulo": "O percurso",
   "o_que_mudou": "A entrada virou um percurso em seis movimentos: de onde partimos, o que olhamos, o que encontramos, o que fecha e em que condições, o que falta e quem resolve, o que mudou. Carimbo de versão em toda página e publicação em um comando",
   "versao": 4
  },
  {
   "data": "2026-10-24",
   "titulo": "A convergência",
   "o_que_mudou": "Os três Cs entram como símbolo e checkpoint: C¹ Cruzamento, C² Coorte, C³ Comprovação, e a volta do reuso, ainda aberta. A entrada deixou de rolar e virou uma roda: os seis movimentos num aro que gira, o anel dos três Cs no centro acendendo o que cada movimento toca, e depois do sexto o primeiro. As etiquetas dos Cs marcam achados, condições e glossário · o anel aparece também no cabeçalho da Sistemática e da conta",
   "versao": 5
  },
  {
   "data": "2026-10-25",
   "titulo": "A convergência como roda",
   "o_que_mudou": "Os três Cs viraram a própria roda: C¹ Cruzamento, C² Coorte e C³ Comprovação são as paradas, com um painel curto cada, e a volta do reuso é o arco de retorno, tracejado enquanto estiver por construir. No centro da roda, o mantra dos três verbos (cruzar, construir, comprovar) e um número por passo. Os seis movimentos viraram coadjuvantes: uma folha, aberta pelos botões de aprofundar e por um link sob a roda. Na Sistemática, a cena das bases à coorte virou o sistema dos três Cs: três bandas clicáveis, cruzar, construir, comprovar, com a volta do reuso tracejada. As três peças trocaram a pele de landing pela de relatório: papel, serifa, filetes, sem gradiente nem cartão",
   "versao": 6
  },
  {
   "data": "2026-10-25",
   "titulo": "A leitura e o recorte",
   "o_que_mudou": "A conta abre por uma capa de leitura, a conta em uma página, antes dos controles. As camadas 01, 03 e 04 da Sistemática ganharam a faixa dos três Cs sobre as etapas, e cada relação de dinheiro diz em que C passa. O relatório orgânico passou a emitir o recorte: o estado público, datado, em HTML e PDF, a partir dos mesmos dados",
   "versao": 7
  },
  {
   "data": "2026-10-26",
   "titulo": "A direção e os ausentes",
   "o_que_mudou": "A Sistemática ganhou a quinta camada, a Direção: o modelo de negócio bloco a bloco, cada um com o que precisamos da instituição, o que já temos, o que já sabemos e o que falta definir, com quem resolve. O fio público termina nela, e a conta virou anexo, aberta só pelos blocos de custos e receitas. A entrada abre em sete perguntas, com os compradores como pontos. Cada passagem entre os Cs diz quem leva, e a volta mostra o laço que faria o reuso valer. Quem ainda não ouvimos ganhou lugar na Direção e no percurso, e o blueprint mostra as esperas",
   "versao": 8
  },
  {
   "data": "2026-10-27",
   "titulo": "Uma peça só",
   "o_que_mudou": "A síntese passou a ser uma peça só, em seis abas que cabem numa tela: 00 De onde partimos, com a roda dos três Cs e o contexto (quem precisa da evidência, os três pacotes vendidos, a virada: 3 vendidos, 17 de empate, 65 de capacidade, e a frase que o leitor leva) · 01 a 04, o núcleo · 05 O que decidir, com as três respostas da instituição, o teste de valor e o modelo de negócio. A entrada separada saiu e o endereço antigo da Sistemática redireciona. Cada ideia passou a ter um nome só: a volta, as três respostas, o que falta e quem resolve. O recorte sai na ordem do contexto, dos três Cs e da direção",
   "versao": 9
  },
  {
   "data": "2026-10-28",
   "titulo": "O laço dos três momentos",
   "o_que_mudou": "A aba 00 trocou a roda pelo laço dos três momentos, a forma escolhida entre seis desenhadas lado a lado. Dois atos em forma de oito: quem pergunta, à esquerda, o método, à direita. Três momentos como regiões, para olhar um a um, na espinha dos três Cs: a pergunta, o cruzamento e a coorte, a comprovação. Cada momento entrega algo ao seguinte: a pergunta certa, o grupo de pacientes, o número para o pedido. Na figura, só as siglas e o número de cada momento, com o C¹ no cruzamento dos dois laços, e ao lado a legenda com os nomes, os verbos e as portas. A volta é o arco de retorno de quem pergunta, tracejado enquanto não existir. Clicar num momento, num C ou numa etapa, na figura ou na legenda, abre o seu detalhe embaixo, com o elo para a camada onde vive. O símbolo do cabeçalho, no site e na conta, também virou o laço. A aba 03 virou o portfólio, no molde da Longevidade: em cima, as linhas clínicas que os fundadores nomearam (oncologia adulto, onde já se vendeu, oncologia pediátrica, sem concorrente, e patologia cirúrgica, a linha dos inventores) e, embaixo, um cartão por pacote (o pacote, que já se vende, a volta e a coorte viva) com para quem é, o que entra, o que já foi feito e o que destrava adiante. A pergunta é do cliente, a coorte é do HDB, a comprovação é a análise. A peça deixou de dizer que a empresa não existe: o CNPJ está em abertura e o contrato de sócios, em andamento, e a pergunta passou a ser o que falta para ela ficar de pé. O filme dos três pacotes saiu da aba 00. Tom neutro para a plateia do Einstein: a peça descreve o que está em aberto e quem resolve, sem cobrar, e as três respostas passaram a chamar-se as três definições em aberto",
   "versao": 10
  },
  {
   "data": "2026-10-28",
   "titulo": "Legível de bater o olho",
   "o_que_mudou": "A revisão ao vivo da peça, aba a aba, com o usuário no Chrome. A 02 abre com os dois olhares lado a lado e um clique põe um deles em foco, esquema à esquerda e leitura à direita · a 03 passou ao mesmo molde, com o pacote aberto lido à direita · a 04 ocupa a tela inteira · a 01 numera as setas do ator aberto e traz o depoimento dos fundadores sobre o concorrente mais próximo · a 00 ganhou o laço a traço de pena, maior, com a legenda embaixo e uma frase única com valor. Nada fica escondido no mouse, nada se repete, e o encaixe para em 0,82 de escala, com rolagem interna só se faltar espaço",
   "versao": 11
  },
  {
   "data": "2026-10-28",
   "titulo": "Ajustes de celular",
   "o_que_mudou": "Conferência de responsividade depois da publicação 11: em celular, os dois olhares da 02 voltam a rolar de lado em vez de encolher, e a legenda do laço da 00 passa a uma coluna. Nada muda no desktop",
   "versao": 12
  },
  {
   "data": "2026-10-28",
   "titulo": "O pacote no celular",
   "o_que_mudou": "Empilhada (celular e tablet), a aba 03 escondia a leitura da direita embaixo dos cartões e o pacote aberto aparecia duas vezes. Agora, empilhado, o pacote aberto se lê no próprio cartão (descrição, entregas com a descrição, o que destrava) e a leitura da direita some. No desktop nada muda",
   "versao": 13
  },
  {
   "data": "2026-10-28",
   "titulo": "Os achados no celular",
   "o_que_mudou": "Na 03 empilhada, o bloco \"o que já sabemos\" vinha numa grade de três colunas e os achados saíam esmagados. Em celular passa a uma coluna. No desktop nada muda",
   "versao": 14
  },
  {
   "data": "2026-10-28",
   "titulo": "A abertura em sete perguntas",
   "o_que_mudou": "A 00 chama-se Abertura e o quadro à direita passou às sete perguntas (o quê, por quê, para quem, onde, quando, como, quanto), no molde da Longevidade, para quem chega sem contexto. Sob o laço ficam só os nomes: saíram os itálicos e a linha \"como ler\". Na 01 saiu o financiador e o pesquisador liga-se ao fomento. Na 02 saiu o chip M sob os Cs. Na 03 a coluna do pacote aberto saiu: a aba ocupa a tela inteira e cada um dos três pacotes se lê completo no próprio cartão, em letra maior, com as linhas clínicas abaixo",
   "versao": 15
  },
  {
   "data": "2026-10-28",
   "titulo": "Nada rola na janela maximizada",
   "o_que_mudou": "Medida ao vivo, a janela maximizada do usuário dá 1264 × 561. Para nenhuma aba rolar aí, com a escala no mínimo em 0,75, saiu o acessório: na 00 a introdução, a linha das camadas e a motivação dos compradores, com os textos encurtados· na 01 a tabela compacta e o fomento ligado direto à empresa· na 02 a ficha do C sem glossário e passagem· na 03 as entregas só pelo nome, as linhas clínicas só com o estado e sem \"o que já sabemos\"· na 04 e na 05 as células mais justas. A 00 na barra em maiúsculo, como as outras",
   "versao": 16
  }
 ],
 "sintese": {
  "pergunta": {
   "texto": "O que precisa acontecer para a empresa Health Data Brasil ficar de pé?",
   "confianca": "confirmado"
  },
  "resposta": {
   "texto": "A empresa está sendo aberta, mas ainda não se sustenta. Cada pacote vendido paga o próprio custo com folga. Mas uma equipe de 3 pessoas precisa de 17 pacotes por ano, e até hoje foram 3 no total. O problema não é fazer, é vender",
   "confianca": "provavel"
  },
  "porque": {
   "texto": "Comparado a uma consultoria, o pacote sai melhor e mais barato em todos os cenários. Comparado a uma equipe interna enxuta, empata. O que mais pesa no resultado é o custo da equipe, depois quantos pacotes se vendem, depois o preço",
   "confianca": "provavel"
  },
  "teste_de_valor": {
   "texto": "Depois de ler isto, quem decide enxerga as três definições em aberto e quem resolve o que falta. Se não enxergar, a falha é desta peça",
   "confianca": "confirmado"
  },
  "direcao": {
   "texto": "A empresa fica de pé com três definições: a licença do método, a equipe e o capital, e os primeiros compradores",
   "confianca": "provavel"
  },
  "manchete_ecossistema": {
   "texto": "Quem paga é a farmacêutica. Quem mais ganha é o SUS, que não paga",
   "confianca": "provavel"
  },
  "manchete_sistema": {
   "texto": "O dado é de todos. O que se vende é o trabalho de ligar a mesma pessoa entre as bases",
   "confianca": "confirmado"
  },
  "manchete_servicos": {
   "texto": "Três pacotes, um método. A pergunta é do cliente, a coorte é do HDB, a comprovação é a análise",
   "confianca": "confirmado"
  },
  "manchete_jornadas": {
   "texto": "Da pergunta à entrega levam semanas. Depois da entrega, ninguém acompanha o cliente",
   "confianca": "provavel"
  },
  "manchete_direcao": {
   "texto": "Três definições em aberto: a licença do método, a equipe e o capital, os primeiros compradores",
   "confianca": "provavel"
  },
  "laco_titulo": {
   "texto": "O que faria o cliente voltar",
   "confianca": "provavel"
  },
  "laco_nota": {
   "texto": "Hoje não gira: cada cliente é um projeto novo. Guardar o grupo de pacientes é o que faria girar",
   "confianca": "provavel"
  },
  "frase_unica": {
   "texto": "Dez bases públicas cruzadas pela mesma pessoa em cerca de 20 minutos, um método já vendido 3 vezes e uma empresa em abertura para vendê-lo",
   "confianca": "confirmado"
  },
  "ato1_historia": {
   "texto": "A gerente de acesso de uma farmacêutica precisa provar que um remédio funciona em pacientes brasileiros de verdade, para o SUS adotá-lo",
   "confianca": "provavel"
  },
  "ato1_obstaculos": {
   "texto": "Fazer a pergunta certa · Achar os pacientes certos, espalhados em 10 bases públicas que não se falam · Esperar semanas ou meses por uma consultoria · Provar que o número está certo · Se vier outra pergunta, pagar tudo de novo",
   "confianca": "provavel"
  },
  "ato1_porque": {
   "texto": "O dado é público: qualquer um pode baixar. O trabalho caro é ligar os registros da mesma pessoa entre as bases e escolher os códigos certos. Quem mais ganha com a resposta é o SUS, e o SUS não paga por ela",
   "confianca": "provavel"
  },
  "ato1_entrega": {
   "texto": "O método entrega. O que não acontece é a próxima venda",
   "confianca": "provavel"
  },
  "ato2_virada": {
   "texto": "O problema não é fazer, é vender. A equipe de hoje dá conta de 65 pacotes por ano. A conta fecha com 17. Até hoje foram 3",
   "confianca": "provavel"
  },
  "ato2_outra_metade": {
   "texto": "Cada pacote paga o próprio custo com folga. Contra uma consultoria, o pacote ganha em todos os cenários. Contra uma equipe interna, empata. O que ainda não existe é a operação: alguém que venda, guarde o grupo de pacientes e receba a próxima pergunta",
   "confianca": "provavel"
  },
  "ato2_entrega": {
   "texto": "Então, o que é que se vende? E o que falta para o cliente voltar?",
   "confianca": "provavel"
  },
  "ato3_como": {
   "texto": "Três passos: cruzar as bases, construir o grupo de pacientes, comprovar o resultado. A volta, quando o mesmo grupo responde à próxima pergunta, ainda não existe",
   "confianca": "confirmado"
  },
  "resposta_licenca": {
   "texto": "A licença do método: o método nasceu no Einstein. A licença define em que condições a empresa pode usá-lo e buscar investidor",
   "confianca": "provavel"
  },
  "resposta_gente_capital": {
   "texto": "A equipe e o capital: a dedicação dos 3 fundadores e a participação do Einstein na empresa, em definição",
   "confianca": "provavel"
  },
  "resposta_compradores": {
   "texto": "Os primeiros compradores: farmacêuticas e empresas de pesquisa dizendo por escrito que vão comprar, a um preço parecido com o de uma consultoria",
   "confianca": "provavel"
  },
  "reflexao_fit": {
   "texto": "Dinheiro: quem financia a empresa até o primeiro ano de lucro ainda não está definido · Infraestrutura: hoje o cruzamento roda numa máquina própria, e o custo na nuvem em escala ainda não foi medido · Talento: o método, a curadoria clínica e a estatística estão nos 3 fundadores, e o tempo deles ainda não está combinado",
   "confianca": "provavel"
  },
  "reflexao": {
   "texto": "O que sabemos está marcado como confirmado. O que lemos dos dados, como provável. O que ninguém sabe ainda está em aberto, com quem resolve ao lado",
   "confianca": "confirmado"
  },
  "fator_limitante": {
   "texto": "Um sistema cresce só até onde o recurso mais escasso deixa: é a lei do mínimo. Aqui sobra capacidade: 65 pacotes por ano. Falta demanda: 3 vendidos, 17 para a conta fechar. O mínimo hoje é quem compra. Antes dele vem a licença. Reforçar o que já sobra não muda o resultado",
   "confianca": "provavel"
  },
  "fator_minimo": {
   "texto": "resposta_compradores",
   "confianca": "provavel"
  },
  "momento_pergunta": {
   "texto": "A pergunta: da entrega à pergunta certa",
   "confianca": "confirmado"
  },
  "momento_coorte": {
   "texto": "Cruzamento e coorte: dez bases cruzadas pela mesma pessoa, e o grupo de pacientes construído",
   "confianca": "confirmado"
  },
  "momento_prova": {
   "texto": "Comprovação: funciona? quanto? com que certeza?",
   "confianca": "confirmado"
  },
  "entrega_pergunta": {
   "texto": "a pergunta certa, com os códigos de doença e de procedimento escolhidos",
   "confianca": "confirmado"
  },
  "entrega_coorte": {
   "texto": "o grupo de pacientes, pronto para a análise e guardado para a próxima pergunta",
   "confianca": "confirmado"
  },
  "entrega_prova": {
   "texto": "o número que vai no pedido ao SUS, ao plano ou à revista. E, quando o cliente volta, a volta",
   "confianca": "provavel"
  },
  "revela_servicos": {
   "texto": "A linha clínica não é o pacote: a mesma coorte de oncologia sai como pacote, volta ou coorte viva. A coorte sozinha não se vende: o valor está na comprovação",
   "confianca": "provavel"
  },
  "w_oque": {
   "texto": "Empresa nova, nascida no Einstein: cruza as bases públicas de saúde pela mesma pessoa e entrega a coorte analisada, em dias",
   "confianca": "confirmado"
  },
  "w_porque": {
   "texto": "O dado é público. O caro é ligar a mesma pessoa entre dez bases que não se falam, e isso hoje leva semanas",
   "confianca": "provavel"
  },
  "w_quem": {
   "texto": "Quem precisa provar, com pacientes brasileiros, que um tratamento funciona. Até hoje comprou a área de acesso de farmacêuticas",
   "confianca": "provavel"
  },
  "w_onde": {
   "texto": "Nas dez bases públicas de saúde do Brasil, cruzadas numa máquina própria, sem nuvem. O método nasceu no Einstein",
   "confianca": "confirmado"
  },
  "w_quando": {
   "texto": "Dias em vez de semanas: o cruzamento leva cerca de 20 minutos, a leitura clínica e a análise levam o resto",
   "confianca": "provavel"
  },
  "w_como": {
   "texto": "Em três momentos, que se repetem a cada nova pergunta (o desenho ao lado)",
   "confianca": "confirmado"
  },
  "w_como_1": {
   "texto": "quem pergunta, e o desenho do estudo",
   "confianca": "confirmado"
  },
  "w_como_2": {
   "texto": "o cruzamento das bases e a coorte",
   "confianca": "confirmado"
  },
  "w_como_3": {
   "texto": "a análise, a prova e a entrega",
   "confianca": "confirmado"
  },
  "w_quanto": {
   "texto": "Cada pacote pago cobre o próprio custo com folga. A equipe dá conta de 65 por ano, a conta fecha com 17, até hoje foram 3",
   "confianca": "provavel"
  }
 },
 "glossario": [
  {
   "termo": "Cruzamento pela mesma pessoa",
   "explicacao": "As bases públicas não têm um número comum: a mesma pessoa aparece numa internação, numa vacina, num óbito, sem ligação entre elas. Cruzar é ligar esses registros pelo nome, nome da mãe, data de nascimento e município. À mão leva semanas. Com o método, cerca de 20 minutos",
   "c": [
    "C1"
   ]
  },
  {
   "termo": "Coorte",
   "explicacao": "Um grupo de pacientes acompanhado ao longo do tempo nos registros de saúde: quem fez tal tratamento e o que aconteceu depois. É a matéria-prima da prova",
   "c": [
    "C2"
   ]
  },
  {
   "termo": "Comprovação",
   "explicacao": "A resposta à pergunta: o tratamento funciona? Quanto? Com que certeza? Feita de um jeito que outro pesquisador possa conferir. É o que a farmacêutica leva ao pedido para o SUS adotar o remédio",
   "c": [
    "C3"
   ]
  },
  {
   "termo": "Pacote",
   "explicacao": "O que se vende hoje: uma pergunta, o grupo de pacientes montado e a análise pronta. Um projeto por vez, sob encomenda",
   "c": []
  },
  {
   "termo": "Spin-off",
   "explicacao": "Uma empresa nova, fora do Einstein, que recebe a licença do método e o opera. Foi o modelo escolhido",
   "c": []
  },
  {
   "termo": "A volta",
   "explicacao": "O mesmo grupo de pacientes respondendo à próxima pergunta, sem pagar a montagem de novo. É o que faria a receita crescer. Hoje não existe: cada cliente é um projeto novo",
   "c": [
    "volta"
   ]
  }
 ],
 "convergencia": [
  {
   "sigla": "C1",
   "nome": "Cruzamento",
   "verbo": "cruzar",
   "oque": "ligar os registros da mesma pessoa entre as bases públicas",
   "estado": "feito",
   "confianca": "confirmado",
   "etapas": [
    "E1",
    "E2",
    "M"
   ]
  },
  {
   "sigla": "C2",
   "nome": "Coorte",
   "verbo": "construir",
   "oque": "o grupo de pacientes que responde à pergunta, pronto para a análise e guardado para a próxima",
   "estado": "feito",
   "confianca": "confirmado",
   "etapas": [
    "M"
   ]
  },
  {
   "sigla": "C3",
   "nome": "Comprovação",
   "verbo": "comprovar",
   "oque": "a prova de que o tratamento funciona, e quanto, no pedido de quem decide",
   "estado": "feito",
   "confianca": "provavel",
   "etapas": [
    "E3",
    "E4"
   ]
  },
  {
   "sigla": "volta",
   "nome": "Volta",
   "verbo": "voltar",
   "oque": "o mesmo grupo de pacientes responde à próxima pergunta, sem pagar a montagem de novo",
   "estado": "aberto",
   "confianca": "aberto",
   "etapas": [
    "V"
   ]
  }
 ],
 "proposta": [
  {
   "id": "segmentos",
   "bloco": "Segmentos de clientes",
   "componente": "quem compra",
   "cor": "#0F766E",
   "temos": "um tipo de comprador que já pagou: a área de acesso das farmacêuticas, 3 pacotes",
   "preciso": "qual dos 5 tipos de comprador paga primeiro, quanto e em quanto tempo",
   "pedido": "conversas com 3 farmacêuticas e 2 gestores públicos, para ouvir quem ainda não ouvimos",
   "confianca": "provavel"
  },
  {
   "id": "proposta",
   "bloco": "Proposta de valor",
   "componente": "o que se entrega",
   "cor": "#00539A",
   "temos": "ligar a mesma pessoa entre 10 bases públicas e entregar a análise pronta, em dias e não em semanas",
   "preciso": "provar, lado a lado com os concorrentes, que o cruzamento é diferente do que já se vende",
   "pedido": "a validação do método com uma área de pesquisa do Einstein, num estudo que possa ser publicado",
   "confianca": "provavel"
  },
  {
   "id": "canais",
   "bloco": "Canais",
   "componente": "como o cliente chega",
   "cor": "#0F766E",
   "temos": "o contato pessoal dos fundadores. Ninguém sai para vender",
   "preciso": "um caminho que traga cliente sem depender da agenda dos fundadores",
   "pedido": "se e como o nome Einstein aparece na apresentação a clientes",
   "confianca": "provavel"
  },
  {
   "id": "relacionamento",
   "bloco": "Relacionamento",
   "componente": "por que o cliente volta",
   "cor": "#0F766E",
   "temos": "atendimento sob medida, um projeto por cliente · ninguém acompanha o cliente depois da entrega",
   "preciso": "um jeito de o cliente voltar com outra pergunta sobre o mesmo grupo, sem pagar a montagem de novo",
   "pedido": "uma área do Einstein que possa ser o primeiro cliente que volta",
   "confianca": "aberto"
  },
  {
   "id": "receita",
   "bloco": "Fontes de receita",
   "componente": "quem paga e como",
   "cor": "#A8730E",
   "temos": "um pacote por projeto, sob encomenda. Nenhuma receita que se repete",
   "preciso": "um preço de assinatura testado com quem compra, parecido com o de uma consultoria",
   "pedido": "o preço conferido com a área de economia da saúde do Einstein",
   "confianca": "provavel"
  },
  {
   "id": "recursos",
   "bloco": "Recursos-chave",
   "componente": "o que não pode faltar",
   "cor": "#16233A",
   "temos": "o método, a curadoria clínica dos códigos e as bases já tratadas numa máquina própria",
   "preciso": "o tempo combinado de cada fundador, e quem responde pela ciência se um deles sair",
   "pedido": "se pesquisadores do Einstein podem dedicar horas à empresa nova, e como",
   "confianca": "provavel"
  },
  {
   "id": "atividades",
   "bloco": "Atividades-chave",
   "componente": "o que se faz todo dia",
   "cor": "#16233A",
   "temos": "cruzar as bases, montar o grupo e analisar, em parte ainda à mão",
   "preciso": "o tempo real de um pacote, do pedido à entrega, e não só o da máquina",
   "pedido": "um estudo já publicado, refeito do zero com o relógio ligado",
   "confianca": "provavel"
  },
  {
   "id": "parcerias",
   "bloco": "Parcerias-chave",
   "componente": "quem precisa estar junto",
   "cor": "#16233A",
   "temos": "o Einstein como origem do método e casa provável da empresa. A relação ainda não está no papel",
   "preciso": "a licença do método e o papel do Einstein na empresa nova",
   "pedido": "a licença do método e se o Einstein participa da empresa",
   "confianca": "aberto"
  },
  {
   "id": "custos",
   "bloco": "Estrutura de custos",
   "componente": "o que custa ficar de pé",
   "cor": "#A8730E",
   "temos": "custo baixo hoje, com uma máquina própria. O custo grande é a equipe",
   "preciso": "quanto custa cada pacote entregue, e quem banca a empresa até o primeiro ano de lucro",
   "pedido": "se o dinheiro inicial vem do Einstein ou de um investidor de fora",
   "confianca": "provavel"
  }
 ],
 "nao_ouvidos": [
  {
   "grupo": "Farmacêuticas fora da oncologia",
   "por_que": "os 3 pacotes vieram de uma área só. Não sabemos se as outras pagam",
   "como_ouvir": "3 conversas com gerentes de acesso de outras áreas",
   "c": [
    "C3"
   ]
  },
  {
   "grupo": "Pesquisadores acadêmicos",
   "por_que": "já usam de graça a base do Cidacs, na Bahia. Não sabemos por que pagariam",
   "como_ouvir": "2 conversas com grupos que usam o Cidacs",
   "c": [
    "C2"
   ]
  },
  {
   "grupo": "Gestores públicos",
   "por_que": "compram painéis de indicadores por licitação, não grupos de pacientes",
   "como_ouvir": "1 conversa com uma secretaria de saúde que comprou painel",
   "c": [
    "C3"
   ]
  },
  {
   "grupo": "Planos de saúde",
   "por_que": "recebem o pedido da farmacêutica e podem comprar a prova direto",
   "como_ouvir": "1 conversa com quem avalia tratamentos num plano de saúde",
   "c": [
    "C3"
   ]
  },
  {
   "grupo": "Quem comprou uma vez e não voltou",
   "por_que": "o cliente que volta é o que faz o negócio crescer. Nunca se perguntou por que não houve segundo pacote",
   "como_ouvir": "1 conversa com cada um dos 3 clientes",
   "c": [
    "volta"
   ]
  }
 ],
 "compradores": [
  {
   "nome": "Farmacêutica",
   "motivacao": "provar ao SUS, em semanas, que o remédio funciona em brasileiros",
   "foco": "sim"
  },
  {
   "nome": "Pesquisador",
   "motivacao": "publicar com um grupo grande de pacientes, pago com verba de pesquisa",
   "foco": ""
  },
  {
   "nome": "Gestor público",
   "motivacao": "planejar a rede com indicadores da própria população",
   "foco": ""
  },
  {
   "nome": "Operadora",
   "motivacao": "decidir o que cobrir com dados de pacientes reais",
   "foco": ""
  },
  {
   "nome": "Consultoria",
   "motivacao": "terceirizar a montagem da base de um projeto",
   "foco": ""
  }
 ],
 "passagens": [
  {
   "id": "c1-c2",
   "de": "C1",
   "para": "C2",
   "rotulo": "dos códigos certos ao grupo de pacientes",
   "quem": "curadoria clínica",
   "confianca": "provavel"
  },
  {
   "id": "c2-c3",
   "de": "C2",
   "para": "C3",
   "rotulo": "do grupo à análise revisada",
   "quem": "analista e revisor clínico",
   "confianca": "provavel"
  },
  {
   "id": "c3-c1",
   "de": "C3",
   "para": "C1",
   "rotulo": "da entrega à próxima pergunta · hoje ninguém acompanha o cliente depois da entrega",
   "quem": "a definir",
   "confianca": "aberto"
  }
 ],
 "laco": [
  {
   "rotulo": "coorte entregue",
   "fonte": "inferencia"
  },
  {
   "rotulo": "coorte guardada",
   "fonte": "inferencia"
  },
  {
   "rotulo": "próxima pergunta mais rápida",
   "fonte": "inferencia"
  },
  {
   "rotulo": "mais pacotes por ano",
   "fonte": "inferencia"
  }
 ],
 "comparativo": [
  {
   "tema": "O cruzamento",
   "hdb": "linkage real entre fontes, por chave comum, até o resultado estatístico",
   "rival": "módulos individuais por fonte, para montar dashboards",
   "confianca": "confirmado"
  },
  {
   "tema": "As bases",
   "hdb": "cruza DATASUS + ANS + RNDS por paciente e por evento, não por módulo",
   "rival": "SUS e ANS/suplementar em módulos separados (EpiMarket)",
   "confianca": "confirmado"
  },
  {
   "tema": "A entrega",
   "hdb": "coorte linkada → p-valor e tamanho de efeito, para pesquisa ou jornada",
   "rival": "visualização e benchmarking por módulo",
   "confianca": "confirmado"
  },
  {
   "tema": "A caixa de ferramentas",
   "hdb": "aberta (dado público): vendemos o manual",
   "rival": "fechada, com instruções, mas sem o resultado cruzado",
   "confianca": "confirmado"
  }
 ],
 "linhas": [
  {
   "id": "onco_adulto",
   "nome": "Oncologia adulto",
   "estado": "vendido",
   "leitura": "Os 3 pacotes vendidos foram aqui, para a área de acesso de uma farmacêutica. É também a linha mais disputada: o concorrente concentra os seus estudos em câncer de próstata",
   "confianca": "confirmado"
  },
  {
   "id": "onco_ped",
   "nome": "Oncologia pediátrica",
   "estado": "a_validar",
   "leitura": "Está no foco atual dos fundadores e nenhum concorrente cobre. Falta o primeiro comprador",
   "confianca": "provavel"
  },
  {
   "id": "cirurgica",
   "nome": "Patologia cirúrgica",
   "estado": "expertise",
   "leitura": "A aspiração dos fundadores e a linha dos inventores: 8 artigos com dados do SUS em cirurgia vascular, onde não há concorrente, e 1 em cirurgia colorretal, onde já há. Falta confirmar quem paga",
   "confianca": "provavel"
  }
 ],
 "entregas": [
  {
   "id": "codigos",
   "c": "C1",
   "nome": "Os códigos certos",
   "descricao": "a escolha dos códigos de doença e de procedimento que capturam cada caso, feita por quem conhece a clínica",
   "estado": "feito"
  },
  {
   "id": "cruzamento",
   "c": "C1",
   "nome": "O cruzamento",
   "descricao": "a mesma pessoa ligada entre as bases públicas, em cerca de 20 minutos",
   "estado": "feito"
  },
  {
   "id": "coorte",
   "c": "C2",
   "nome": "O grupo de pacientes, documentado",
   "descricao": "critérios, período e o que foi medido, prontos para a análise",
   "estado": "feito"
  },
  {
   "id": "guarda",
   "c": "C2",
   "nome": "A coorte guardada",
   "descricao": "o grupo versionado e guardado para a próxima pergunta",
   "estado": "a_construir"
  },
  {
   "id": "atualizacao",
   "c": "C2",
   "nome": "A atualização",
   "descricao": "o grupo refeito a cada nova carga das bases públicas",
   "estado": "a_construir"
  },
  {
   "id": "analise",
   "c": "C3",
   "nome": "A análise",
   "descricao": "funciona? quanto? com que certeza? De um jeito que outro pesquisador possa conferir",
   "estado": "feito"
  },
  {
   "id": "revisao",
   "c": "C3",
   "nome": "A revisão clínica",
   "descricao": "um clínico lê o resultado antes de sair",
   "estado": "feito"
  },
  {
   "id": "relatorio",
   "c": "C3",
   "nome": "O relatório no formato do pedido",
   "descricao": "para o SUS, o plano de saúde ou a revista científica",
   "estado": "feito"
  },
  {
   "id": "mudou",
   "c": "C3",
   "nome": "O que mudou",
   "descricao": "o relatório do que mudou desde a última carga",
   "estado": "a_construir"
  },
  {
   "id": "volta",
   "c": "volta",
   "nome": "A próxima pergunta, direto à análise",
   "descricao": "sem montar o grupo de novo",
   "estado": "a_construir"
  }
 ],
 "componentes": [
  {
   "servico": "pacote",
   "entrega": "codigos"
  },
  {
   "servico": "pacote",
   "entrega": "cruzamento"
  },
  {
   "servico": "pacote",
   "entrega": "coorte"
  },
  {
   "servico": "pacote",
   "entrega": "analise"
  },
  {
   "servico": "pacote",
   "entrega": "revisao"
  },
  {
   "servico": "pacote",
   "entrega": "relatorio"
  },
  {
   "servico": "reuso",
   "entrega": "guarda"
  },
  {
   "servico": "reuso",
   "entrega": "volta"
  },
  {
   "servico": "reuso",
   "entrega": "analise"
  },
  {
   "servico": "reuso",
   "entrega": "revisao"
  },
  {
   "servico": "reuso",
   "entrega": "relatorio"
  },
  {
   "servico": "viva",
   "entrega": "codigos"
  },
  {
   "servico": "viva",
   "entrega": "cruzamento"
  },
  {
   "servico": "viva",
   "entrega": "coorte"
  },
  {
   "servico": "viva",
   "entrega": "analise"
  },
  {
   "servico": "viva",
   "entrega": "revisao"
  },
  {
   "servico": "viva",
   "entrega": "relatorio"
  },
  {
   "servico": "viva",
   "entrega": "guarda"
  },
  {
   "servico": "viva",
   "entrega": "atualizacao"
  },
  {
   "servico": "viva",
   "entrega": "mudou"
  },
  {
   "servico": "viva",
   "entrega": "volta"
  }
 ],
 "lacunas_publicas": [
  {
   "titulo": "Preço recorrente e faixas de preço",
   "gate": "G2",
   "papel": "fundadores, com entrevistas de mercado",
   "c": [
    "volta"
   ],
   "componente": "receita",
   "prazo": "a definir"
  },
  {
   "titulo": "Custo por coorte entregue",
   "gate": "G3",
   "papel": "fundadores",
   "c": [
    "C2"
   ],
   "componente": "custos",
   "prazo": "a definir"
  },
  {
   "titulo": "Disposição a pagar e ciclo de venda por segmento",
   "gate": "G2",
   "papel": "mesa de decisão",
   "c": [
    "C3"
   ],
   "componente": "segmentos",
   "prazo": "a definir"
  },
  {
   "titulo": "Dedicação e participação dos 3 fundadores",
   "gate": "G1",
   "papel": "fundadores",
   "c": [],
   "componente": "recursos",
   "prazo": "a definir"
  },
  {
   "titulo": "Custo de nuvem em escala",
   "gate": "G3",
   "papel": "fundadores",
   "c": [
    "C2"
   ],
   "componente": "custos",
   "prazo": "a definir"
  },
  {
   "titulo": "Propriedade intelectual em 5 camadas",
   "gate": "G1",
   "papel": "jurídico do Einstein e fundadores",
   "c": [
    "C1"
   ],
   "componente": "parcerias",
   "prazo": "a definir"
  },
  {
   "titulo": "Tempo medido: geração da coorte e entrega do pacote",
   "gate": "G3",
   "papel": "fundadores",
   "c": [
    "C1"
   ],
   "componente": "atividades",
   "prazo": "a definir"
  },
  {
   "titulo": "Teste do cruzamento de bases contra a Techtrials",
   "gate": "G2",
   "papel": "mesa de decisão",
   "c": [
    "C1"
   ],
   "componente": "proposta",
   "prazo": "a definir"
  },
  {
   "titulo": "Curva de adoção (clientes por ano)",
   "gate": "G2",
   "papel": "a definir",
   "c": [
    "volta"
   ],
   "componente": "canais",
   "prazo": "a definir"
  },
  {
   "titulo": "Apetite do Einstein por participação e por operar um produto",
   "gate": "G1",
   "papel": "direção do Einstein",
   "c": [],
   "componente": "parcerias",
   "prazo": "a definir"
  },
  {
   "titulo": "Mapear a Precision Data",
   "gate": "G2",
   "papel": "equipe do projeto",
   "c": [
    "C1"
   ],
   "componente": "proposta",
   "prazo": "antes de qualquer pitch"
  },
  {
   "titulo": "Dimensionar o segmento farmacêutico de baixo para cima",
   "gate": "G2",
   "papel": "equipe do projeto",
   "c": [
    "C3"
   ],
   "componente": "segmentos",
   "prazo": "a definir"
  },
  {
   "titulo": "Quem financia o capital até o primeiro lucro",
   "gate": "G2",
   "papel": "mesa de decisão e fundadores",
   "c": [
    "volta"
   ],
   "componente": "custos",
   "prazo": "a definir"
  },
  {
   "titulo": "Posição da Precision Data no mapa, inferida e não medida",
   "gate": "G2",
   "papel": "equipe do projeto",
   "c": [
    "C1"
   ],
   "componente": "proposta",
   "prazo": "junto com o mapa da Precision Data"
  },
  {
   "titulo": "Certificado do site oficial vencido",
   "gate": "G2",
   "papel": "fundadores",
   "c": [],
   "componente": "canais",
   "prazo": "imediato"
  }
 ],
 "versao": {
  "numero": 16,
  "data": "2026-10-28",
  "titulo": "Nada rola na janela maximizada"
 }
};
