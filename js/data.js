/* GERADO por 08_sintese/dados/build_dados.py a partir dos CSVs. Não editar à mão. */
window.HDB = {
 "atores": [
  {
   "id": "hdb",
   "nome": "A empresa nova (Health Data Brasil)",
   "papel": "liga a mesma pessoa entre as bases e entrega a análise: o método, a escolha dos códigos, a estatística",
   "curto": "A empresa nova · HDB",
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
   "id": "financiador",
   "nome": "Quem financia a empresa nova",
   "papel": "quem aporta o capital até o primeiro lucro · fundadores, Einstein ou investidor",
   "curto": "Financiador (a definir)",
   "lado": "fora",
   "confianca": "aberto"
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
   "rotulo": "Pago pela indústria farmacêutica ou empresa de pesquisa clínica",
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
  "financiador": {
   "rotulo": "Pago pelo financiador (a definir)",
   "curto": "financiador",
   "cor": "#9C5518",
   "fundo": "#F8EBDD"
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
    "E5",
    "E6"
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
    "E3",
    "E4",
    "E5"
   ]
  },
  {
   "id": "F3",
   "de": "financiador",
   "para": "hdb",
   "oque": "capital até o primeiro lucro operacional",
   "tipo": "confirmar",
   "enquadramento": "financiador",
   "etapas": [
    "E1"
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
    "E3"
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
    "E3",
    "E4"
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
    "E5"
   ]
  },
  {
   "id": "F7",
   "de": "fomento",
   "para": "hdb",
   "oque": "estudo acadêmico via pesquisador",
   "tipo": "confirmar",
   "enquadramento": "fomento",
   "etapas": [
    "E6"
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
    "E3"
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
   "id": "E3",
   "nome": "Cruzamento e coorte",
   "curto": "Cruzamento",
   "oque": "ligar os registros da mesma pessoa entre as bases e montar o grupo",
   "recurso": "máquina local e bases públicas",
   "gate": "privacidade: os dados pessoais ficam só no cruzamento",
   "confianca": "provavel"
  },
  {
   "id": "E4",
   "nome": "Análise e revisão clínica",
   "curto": "Análise",
   "oque": "analisar: funciona? quanto? com que certeza? De um jeito que outro pesquisador possa conferir",
   "recurso": "analista e revisor clínico",
   "gate": "a qualidade ainda não foi publicada: nenhum artigo usou o método",
   "confianca": "provavel"
  },
  {
   "id": "E5",
   "nome": "Entrega e uso",
   "curto": "Entrega",
   "oque": "entregar ao cliente, que leva ao SUS, ao plano de saúde ou à revista científica",
   "recurso": "—",
   "gate": "quem paga pela prova é quem vende o remédio: risco para a reputação",
   "confianca": "provavel"
  },
  {
   "id": "E6",
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
   "titulo": "A licença do método, dada pelo Einstein",
   "texto": "antes de abrir a empresa e de buscar investidor",
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
   "titulo": "Quem autoriza ainda não autorizou",
   "texto": "o programa que coleta os dados foi feito na área de informática do Einstein. Sem a licença, a empresa não consegue investidor",
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
  }
 ],
 "servicos": [
  {
   "id": "pacote",
   "nome": "Pacote de coorte",
   "curto": "Pacote",
   "descricao": "Uma pergunta, o grupo de pacientes montado e a análise pronta. Sob encomenda, um projeto por vez",
   "enquadramento": "pharma",
   "confianca": "confirmado",
   "etapas": [
    "E1",
    "E2",
    "E3",
    "E4",
    "E5"
   ]
  },
  {
   "id": "reuso",
   "nome": "A volta: a mesma coorte, nova pergunta",
   "curto": "Volta",
   "descricao": "O cliente volta com nova pergunta sobre o mesmo grupo e não paga a montagem de novo",
   "enquadramento": "pharma",
   "confianca": "aberto",
   "etapas": [
    "E6"
   ]
  },
  {
   "id": "assinatura",
   "nome": "Assinatura",
   "curto": "Assinatura",
   "descricao": "Acesso contínuo, com os grupos de pacientes guardados",
   "enquadramento": "pharma",
   "confianca": "aberto",
   "etapas": [
    "E6"
   ]
  },
  {
   "id": "academico",
   "nome": "Estudo acadêmico",
   "curto": "Acadêmico",
   "descricao": "Grupo de pacientes para artigo científico, pago com verba de pesquisa",
   "enquadramento": "fomento",
   "confianca": "aberto",
   "etapas": [
    "E1",
    "E2",
    "E3",
    "E4",
    "E5"
   ]
  },
  {
   "id": "licitacao",
   "nome": "Painéis para o gestor público",
   "curto": "Licitação",
   "descricao": "O gestor público compra painéis de indicadores, não grupos de pacientes. O grupo teria de entrar no escopo de um painel",
   "enquadramento": "publico",
   "confianca": "aberto",
   "etapas": [
    "E1",
    "E5"
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
   "etapa": "E3",
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
   "etapa": "E4",
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
   "etapa": "E5",
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
   "etapa": "E6",
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
  }
 ],
 "sintese": {
  "pergunta": {
   "texto": "O que precisa acontecer para a empresa Health Data Brasil nascer?",
   "confianca": "confirmado"
  },
  "resposta": {
   "texto": "Hoje, ainda não nasce. Cada pacote vendido paga o próprio custo com folga. Mas uma equipe de 3 pessoas precisa de 17 pacotes por ano, e até hoje foram 3 no total. O problema não é fazer, é vender",
   "confianca": "provavel"
  },
  "porque": {
   "texto": "Comparado a uma consultoria, o pacote sai melhor e mais barato em todos os cenários. Comparado a uma equipe interna enxuta, empata. O que mais pesa no resultado é o custo da equipe, depois quantos pacotes se vendem, depois o preço",
   "confianca": "provavel"
  },
  "teste_de_valor": {
   "texto": "Depois de ler isto, a direção do Einstein consegue dar as três respostas e dizer quem resolve o que falta. Se não conseguir, a falha é desta peça",
   "confianca": "confirmado"
  },
  "direcao": {
   "texto": "A empresa nasce se o Einstein der três respostas: a licença do método, a equipe e o capital, e a porta para os primeiros compradores",
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
   "texto": "Hoje se vende um pacote por vez, sob encomenda. O cliente que volta, e faria a receita crescer, ainda não existe",
   "confianca": "confirmado"
  },
  "manchete_jornadas": {
   "texto": "Da pergunta à entrega levam semanas. Depois da entrega, ninguém acompanha o cliente",
   "confianca": "provavel"
  },
  "manchete_direcao": {
   "texto": "Três respostas do Einstein: a licença do método, a equipe e o capital, a porta para os compradores",
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
   "texto": "O método funciona: já foi vendido 3 vezes. A empresa ainda não existe. Faltam três coisas, e as três dependem do Einstein: a licença do método, a equipe e o capital, e os primeiros compradores",
   "confianca": "provavel"
  },
  "ato1_historia": {
   "texto": "A gerente de acesso de uma farmacêutica precisa provar que um remédio funciona em pacientes brasileiros de verdade, para o SUS adotá-lo",
   "confianca": "provavel"
  },
  "ato1_obstaculos": {
   "texto": "Fazer a pergunta certa · Achar os pacientes certos, espalhados em 10 bases públicas que não se falam · Esperar semanas ou meses por uma consultoria · Provar que o número está certo · Se vier outra pergunta, pagar tudo de novo",
   "confianca": "provavel"
  },
  "ato1_filme": {
   "texto": "Isso já aconteceu 3 vezes. A farmacêutica levou a pergunta a pesquisadores do Einstein, por contato pessoal, sem vendedor. Eles ligaram os registros da mesma pessoa em várias bases públicas, montaram o grupo de pacientes e entregaram a análise. A farmacêutica usou no pedido ao SUS. Depois, silêncio: ninguém voltou com uma segunda pergunta, e ninguém perguntou por quê",
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
   "texto": "O problema não é fazer, é vender. 3 pessoas dão conta de 65 pacotes por ano. A conta fecha com 17. Até hoje foram 3",
   "confianca": "provavel"
  },
  "ato2_outra_metade": {
   "texto": "Cada pacote paga o próprio custo com folga. Contra uma consultoria, o pacote ganha em todos os cenários. Contra uma equipe interna, empata. O que não existe é a empresa: alguém que venda, guarde o grupo de pacientes e receba a próxima pergunta",
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
   "texto": "A licença do método: o método pertence ao Einstein. Sem a licença, a empresa não pode nascer nem buscar investidor",
   "confianca": "provavel"
  },
  "resposta_gente_capital": {
   "texto": "A equipe e o capital: quanto tempo os 3 fundadores vão dedicar, e se o Einstein entra como sócio",
   "confianca": "provavel"
  },
  "resposta_compradores": {
   "texto": "A porta para os primeiros compradores: farmacêuticas e empresas de pesquisa dizendo por escrito que vão comprar, a um preço parecido com o de uma consultoria",
   "confianca": "provavel"
  },
  "reflexao_fit": {
   "texto": "Dinheiro: ninguém definiu quem banca a empresa até o primeiro ano de lucro · Infraestrutura: hoje o cruzamento roda numa máquina própria, e ninguém mediu o custo na nuvem em escala · Talento: o método, a curadoria clínica e a estatística estão nos 3 fundadores, e o tempo deles ainda não está combinado",
   "confianca": "provavel"
  },
  "reflexao": {
   "texto": "O que sabemos está marcado como confirmado. O que lemos dos dados, como provável. O que ninguém sabe ainda está em aberto, com quem resolve ao lado",
   "confianca": "confirmado"
  },
  "fator_limitante": {
   "texto": "Um sistema cresce só até onde o recurso mais escasso deixa: é a lei do mínimo. Aqui sobra capacidade: 65 pacotes por ano. Falta demanda: 3 vendidos, 17 para a conta fechar. O mínimo hoje é quem compra, e antes disso a licença, sem a qual nada começa. Reforçar o que já sobra não muda o resultado",
   "confianca": "provavel"
  },
  "fator_minimo": {
   "texto": "resposta_compradores",
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
    "E3"
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
    "E3"
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
    "E4",
    "E5"
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
    "E6"
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
   "pedido": "abrir conversa com 3 farmacêuticas e 2 gestores públicos: ouvir quem ainda não ouvimos",
   "confianca": "provavel"
  },
  {
   "id": "proposta",
   "bloco": "Proposta de valor",
   "componente": "o que se entrega",
   "cor": "#00539A",
   "temos": "ligar a mesma pessoa entre 10 bases públicas e entregar a análise pronta, em dias e não em semanas",
   "preciso": "provar, lado a lado com os concorrentes, que o cruzamento é diferente do que já se vende",
   "pedido": "validar o método com uma área de pesquisa do Einstein, num estudo que possa ser publicado",
   "confianca": "provavel"
  },
  {
   "id": "canais",
   "bloco": "Canais",
   "componente": "como o cliente chega",
   "cor": "#0F766E",
   "temos": "o contato pessoal dos fundadores. Ninguém sai para vender",
   "preciso": "um caminho que traga cliente sem depender da agenda dos fundadores",
   "pedido": "definir se e como o nome Einstein pode aparecer na apresentação a clientes",
   "confianca": "provavel"
  },
  {
   "id": "relacionamento",
   "bloco": "Relacionamento",
   "componente": "por que o cliente volta",
   "cor": "#0F766E",
   "temos": "atendimento sob medida, um projeto por cliente · ninguém acompanha o cliente depois da entrega",
   "preciso": "um jeito de o cliente voltar com outra pergunta sobre o mesmo grupo, sem pagar a montagem de novo",
   "pedido": "indicar uma área do Einstein que possa ser o primeiro cliente que volta",
   "confianca": "aberto"
  },
  {
   "id": "receita",
   "bloco": "Fontes de receita",
   "componente": "quem paga e como",
   "cor": "#A8730E",
   "temos": "um pacote por projeto, sob encomenda. Nenhuma receita que se repete",
   "preciso": "um preço de assinatura testado com quem compra, parecido com o de uma consultoria",
   "pedido": "conferir o preço com a área de economia da saúde do Einstein",
   "confianca": "provavel"
  },
  {
   "id": "recursos",
   "bloco": "Recursos-chave",
   "componente": "o que não pode faltar",
   "cor": "#16233A",
   "temos": "o método, a curadoria clínica dos códigos e as bases já tratadas numa máquina própria",
   "preciso": "o tempo combinado de cada fundador, e quem responde pela ciência se um deles sair",
   "pedido": "dizer se pesquisadores do Einstein podem dedicar horas à empresa nova, e como",
   "confianca": "provavel"
  },
  {
   "id": "atividades",
   "bloco": "Atividades-chave",
   "componente": "o que se faz todo dia",
   "cor": "#16233A",
   "temos": "cruzar as bases, montar o grupo e analisar, em parte ainda à mão",
   "preciso": "o tempo real de um pacote, do pedido à entrega, e não só o da máquina",
   "pedido": "ceder um estudo já publicado para refazer do zero, com o relógio ligado",
   "confianca": "provavel"
  },
  {
   "id": "parcerias",
   "bloco": "Parcerias-chave",
   "componente": "quem precisa estar junto",
   "cor": "#16233A",
   "temos": "o Einstein como origem do método e casa provável da empresa. A relação ainda não está no papel",
   "preciso": "a licença do método e o papel do Einstein na empresa nova",
   "pedido": "decidir a licença do método e se o Einstein quer ser sócio",
   "confianca": "aberto"
  },
  {
   "id": "custos",
   "bloco": "Estrutura de custos",
   "componente": "o que custa ficar de pé",
   "cor": "#A8730E",
   "temos": "custo baixo hoje, com uma máquina própria. O custo grande é a equipe",
   "preciso": "quanto custa cada pacote entregue, e quem banca a empresa até o primeiro ano de lucro",
   "pedido": "dizer se o Einstein põe o dinheiro inicial, ou se a empresa busca investidor de fora",
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
  "numero": 9,
  "data": "2026-10-27",
  "titulo": "Uma peça só"
 }
};
