/* GERADO por 08_sintese/dados/build_dados.py a partir dos CSVs. Não editar à mão. */
window.HDB = {
 "atores": [
  {
   "id": "hdb",
   "nome": "Spin-off HDB",
   "papel": "empresa que cruza bases pela mesma pessoa e entrega a análise (método, curadoria dos códigos SIGTAP e CID, estatística)",
   "curto": "Spin-off HDB",
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
   "papel": "compra pacotes de análise para o dossiê que vai à CONITEC e às operadoras · segmento-alvo",
   "curto": "Farmacêutica e pesquisa clínica",
   "lado": "fora",
   "confianca": "confirmado"
  },
  {
   "id": "einstein",
   "nome": "Hospital Israelita Albert Einstein",
   "papel": "provável titular de parte da propriedade intelectual (código de coleta original) · papel no spin-off em aberto",
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
   "papel": "recebem a evidência de mundo real nos dossiês de incorporação",
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
   "nome": "Financiador do spin-off",
   "papel": "quem aporta o capital até o primeiro lucro · fundadores, Einstein ou investidor",
   "curto": "Financiador (a definir)",
   "lado": "fora",
   "confianca": "aberto"
  },
  {
   "id": "techtrials",
   "nome": "Techtrials",
   "papel": "concorrente principal · módulos por base para painéis · Roche como cliente",
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
   "rotulo": "Pago pelo spin-off",
   "curto": "spin-off",
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
   "oque": "evidência de mundo real para incorporação",
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
   "oque": "o cliente define a pergunta de evidência de mundo real",
   "recurso": "comercial (inexistente hoje)",
   "gate": "sem carta de intenção não há volume",
   "confianca": "provavel"
  },
  {
   "id": "E2",
   "nome": "Desenho do estudo",
   "curto": "Desenho",
   "oque": "códigos SIGTAP/CID certos e protocolo, que é conhecimento clínico",
   "recurso": "ciência e curadoria",
   "gate": "propriedade intelectual: a curadoria é conhecimento dos fundadores?",
   "confianca": "provavel"
  },
  {
   "id": "E3",
   "nome": "Cruzamento e coorte",
   "curto": "Cruzamento",
   "oque": "coorte cruzada entre bases públicas, pela mesma pessoa",
   "recurso": "máquina local e bases públicas",
   "gate": "ética e LGPD: identificadores só no cruzamento",
   "confianca": "provavel"
  },
  {
   "id": "E4",
   "nome": "Análise e revisão clínica",
   "curto": "Análise",
   "oque": "p-valor e tamanho de efeito com metodologia auditável",
   "recurso": "analista e revisor clínico",
   "gate": "qualidade não documentada · nenhum artigo com a plataforma",
   "confianca": "provavel"
  },
  {
   "id": "E5",
   "nome": "Entrega e uso",
   "curto": "Entrega",
   "oque": "dossiê para CONITEC · operadora · periódico",
   "recurso": "—",
   "gate": "conflito de interesse é risco reputacional",
   "confianca": "provavel"
  },
  {
   "id": "E6",
   "nome": "Reuso e recompra",
   "curto": "Reuso",
   "oque": "coorte reutilizável: o cliente não paga a montagem de novo",
   "recurso": "coorte versionada (a construir)",
   "gate": "sem produto recorrente, cada cliente vira projeto novo",
   "confianca": "provavel"
  }
 ],
 "achados": [
  {
   "camada": "ecossistema",
   "titulo": "Quem mais ganha não paga",
   "texto": "a evidência melhor serve à CONITEC e ao SUS, mas quem paga é a farmacêutica, e só se a evidência fortalecer o próprio dossiê",
   "componente": "receita",
   "c": [
    "C3"
   ]
  },
  {
   "camada": "sistema",
   "titulo": "O que se vende é o cruzamento, não o dado",
   "texto": "a matéria-prima é pública e aberta a todos, concorrentes incluídos · o valor está em ligar a mesma pessoa entre as bases e escolher os códigos certos",
   "componente": "proposta",
   "c": [
    "C1"
   ]
  },
  {
   "camada": "servicos",
   "titulo": "Cada pacote paga o próprio custo",
   "texto": "a contribuição por pacote é alta, o que falta é volume para cobrir a equipe",
   "componente": "receita",
   "c": [
    "C3"
   ]
  },
  {
   "camada": "jornadas",
   "titulo": "Cada cliente vira projeto novo",
   "texto": "sem coorte reutilizável a receita não acumula, que é onde plataformas de dados costumam travar",
   "componente": "relacionamento",
   "c": [
    "volta"
   ]
  },
  {
   "camada": "fecho",
   "titulo": "Propriedade intelectual licenciada pelo Einstein",
   "texto": "antes de constituir a empresa e de captar",
   "componente": "parcerias",
   "c": [
    "C1"
   ]
  },
  {
   "camada": "ecossistema",
   "titulo": "A matéria-prima é grátis para todos",
   "texto": "o dado público está aberto também aos concorrentes, então o que se vende é o método, e o método ainda não tem prova pública própria",
   "componente": "recursos",
   "c": [
    "C1",
    "C3"
   ]
  },
  {
   "camada": "sistema",
   "titulo": "Quem autoriza ainda não autorizou",
   "texto": "o código de coleta original é atribuído ao Departamento de Informática do Einstein, e sem licença o spin-off não capta",
   "componente": "parcerias",
   "c": [
    "C1"
   ]
  },
  {
   "camada": "servicos",
   "titulo": "Vender contra consultoria, não contra equipe interna",
   "texto": "contra consultoria o HDB é dominante em todos os cenários, contra uma equipe interna enxuta só empata",
   "componente": "proposta",
   "c": [
    "C3"
   ]
  },
  {
   "camada": "fecho",
   "titulo": "Cartas de intenção da indústria farmacêutica e de empresas de pesquisa clínica",
   "texto": "volume acima do empate até o ano 3",
   "componente": "segmentos",
   "c": [
    "volta"
   ]
  },
  {
   "camada": "ecossistema",
   "titulo": "Há concorrente local com a mesma promessa",
   "texto": "a Precision Data anuncia relatórios de duas semanas em dois dias para o mesmo público",
   "componente": "proposta",
   "c": [
    "C1"
   ]
  },
  {
   "camada": "sistema",
   "titulo": "Tempo dito, não medido",
   "texto": "os cerca de 20 minutos medem a geração da coorte na máquina, não a entrega do pacote, e vieram dos fundadores",
   "componente": "atividades",
   "c": [
    "C1",
    "C2"
   ]
  },
  {
   "camada": "servicos",
   "titulo": "O gargalo é demanda, não capacidade",
   "texto": "a equipe paga tem capacidade muito acima do volume previsto, e os prejuízos dos primeiros anos são capacidade ociosa",
   "componente": "segmentos",
   "c": [
    "volta"
   ]
  },
  {
   "camada": "fecho",
   "titulo": "Preço ancorado na consultoria",
   "texto": "validado em entrevista com decisores de acesso e economia da saúde",
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
   "descricao": "Uma pergunta, uma coorte cruzada entre bases públicas e a análise pronta para o dossiê. Sob encomenda, projeto a projeto",
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
   "nome": "Coorte reutilizável",
   "curto": "Reuso",
   "descricao": "O cliente volta com nova pergunta sobre a mesma coorte e não paga a montagem de novo",
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
   "descricao": "Acesso recorrente à plataforma, com coortes guardadas e versionadas",
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
   "descricao": "Coorte para artigo científico, paga por fomento à pesquisa",
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
   "descricao": "O gestor público hoje licita painéis de indicadores, não coortes · a coorte precisaria entrar num escopo de painel",
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
   "vive": "A equipe de acesso e economia da saúde formula a pergunta de evidência para o dossiê",
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
   "vive": "Define com o HDB o desenho do estudo: população, período, desfecho",
   "atua": "o cientista dos fundadores e a curadoria clínica",
   "bastidor": "escolha dos códigos de procedimento e de doença (SIGTAP e CID) que capturam cada caso",
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
   "bastidor": "estatística pronta e metodologia auditável",
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
   "vive": "Recebe a coorte e a análise e as usa no dossiê",
   "atua": "cliente, que leva à CONITEC, à operadora ou ao periódico",
   "bastidor": "—",
   "recurso": "—",
   "decide": "CONITEC, comitê da operadora ou editor",
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
   "vive": "Volta com nova pergunta sobre a mesma coorte",
   "atua": "cliente · pesquisadores",
   "bastidor": "coorte guardada e versionada, ainda a construir",
   "recurso": "coorte versionada",
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
   "leitura": "o que três pessoas em tempo integral conseguem entregar, com duas analisando e uma em ciência e revisão",
   "confianca": "provavel",
   "valor": 65,
   "c": []
  },
  {
   "id": "empate",
   "rotulo": "Empate",
   "unidade": "pacotes por ano",
   "leitura": "o volume que cobre o custo fixo da equipe ao preço de referência",
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
   "leitura": "três contratos pontuais, sem receita recorrente",
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
   "leitura": "os três fundadores, dedicação ainda não acordada",
   "confianca": "provavel",
   "valor": 3,
   "c": []
  },
  {
   "id": "cruzamento",
   "rotulo": "Tempo de cruzamento",
   "unidade": "minutos",
   "leitura": "geração da coorte cruzada entre bases, dito pelos fundadores · a entrega do pacote leva semanas",
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
   "leitura": "no caso-base, com o volume crescendo de 3 para 30 pacotes por ano",
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
  }
 ],
 "sintese": {
  "em_uma_frase": {
   "texto": "O Health Data Brasil liga a mesma pessoa entre as bases públicas de saúde do Brasil e entrega a coorte com a análise pronta para quem decide: indústria farmacêutica, pesquisadores, gestores",
   "confianca": "confirmado"
  },
  "pergunta": {
   "texto": "Em que condições o spin-off Health Data Brasil para de pé?",
   "confianca": "confirmado"
  },
  "por_que_agora": {
   "texto": "O sprint de 20 dias terminou com o modelo escolhido, mas sem três dados que só os fundadores e o Einstein têm: a licença da propriedade intelectual, a dedicação da equipe e o volume de clientes dispostos a pagar",
   "confianca": "confirmado"
  },
  "resposta": {
   "texto": "No caso-base, ainda não. Cada pacote paga com folga o próprio custo, mas uma equipe de três pessoas exige 17 pacotes por ano, e o histórico é de 3 no total. O gargalo é demanda, não capacidade",
   "confianca": "provavel"
  },
  "porque": {
   "texto": "Contra consultoria, o pacote é dominante em todos os cenários · contra uma equipe interna enxuta, só empata. O que mais pesa no resultado é a equipe, depois o volume, depois o preço",
   "confianca": "provavel"
  },
  "teste_de_valor": {
   "texto": "Depois de ler isto, a mesa consegue decidir as condições de constituição do spin-off e quem fecha cada lacuna. Se não conseguir, a peça falhou, não a mesa",
   "confianca": "confirmado"
  },
  "olhar_do_cliente": {
   "texto": "Para a gerente de acesso de uma farmacêutica, o pacote é uma pergunta de evidência respondida em semanas, não meses: ela define a pergunta, espera o cruzamento, recebe o rascunho, leva ao dossiê. O que ela ainda não tem é garantia de qualidade publicada nem a certeza de que o fornecedor existirá no ano que vem",
   "confianca": "provavel"
  },
  "convergencia": {
   "texto": "Três Cs, uma convergência: as bases convergem na mesma pessoa, as pessoas numa coorte, a coorte numa comprovação que vai ao dossiê. O ciclo só fecha quando a mesma coorte responde à próxima pergunta, e isso ainda está por construir",
   "confianca": "provavel"
  },
  "w_oque": {
   "texto": "Uma empresa nova que liga a mesma pessoa entre dez bases públicas de saúde e entrega a análise pronta para quem decide",
   "confianca": "confirmado"
  },
  "w_porque": {
   "texto": "O dado é público e gratuito, mas ligá-lo pela mesma pessoa leva semanas de trabalho especializado · quem precisa da evidência paga para tê-la em dias",
   "confianca": "provavel"
  },
  "w_paraquem": {
   "texto": "Primeiro, a área de acesso das farmacêuticas, que leva a evidência ao dossiê de incorporação. Os outros compradores ainda não foram ouvidos",
   "confianca": "provavel"
  },
  "w_onde": {
   "texto": "Nasce do método de pesquisadores ligados ao Einstein, como empresa separada que licencia esse método",
   "confianca": "provavel"
  },
  "w_quando": {
   "texto": "O modelo foi escolhido no sprint de outubro de 2026 · abrir a empresa depende de três decisões da instituição",
   "confianca": "confirmado"
  },
  "w_como": {
   "texto": "Em três passos, que formam um ciclo",
   "confianca": "confirmado"
  },
  "w_quanto": {
   "texto": "Para se pagar, dezessete pacotes por ano · até hoje foram três, no total",
   "confianca": "provavel"
  },
  "direcao": {
   "texto": "O spin-off depende de três respostas da instituição: a licença do método, a porta para os primeiros compradores e o papel do Einstein no capital",
   "confianca": "provavel"
  },
  "manchete_ecossistema": {
   "texto": "Quem paga é a farmacêutica · quem mais ganha é o SUS, que não paga",
   "confianca": "provavel"
  },
  "manchete_sistema": {
   "texto": "O que se vende não é o dado, que é de todos: é ligar a mesma pessoa entre as bases",
   "confianca": "confirmado"
  },
  "manchete_servicos": {
   "texto": "Hoje se vende um serviço só, sob encomenda · o que acumularia receita ainda não existe",
   "confianca": "confirmado"
  },
  "manchete_jornadas": {
   "texto": "Da pergunta ao dossiê levam semanas · depois da entrega, ninguém acompanha o cliente",
   "confianca": "provavel"
  },
  "manchete_direcao": {
   "texto": "Para o spin-off ficar de pé, cada bloco do modelo de negócio pede uma resposta da instituição",
   "confianca": "provavel"
  },
  "laco_titulo": {
   "texto": "O laço que faria o reuso valer",
   "confianca": "provavel"
  },
  "laco_nota": {
   "texto": "Hoje não gira: cada cliente vira projeto novo. A coorte guardada é o que religa",
   "confianca": "provavel"
  }
 },
 "glossario": [
  {
   "termo": "Cruzamento pela mesma pessoa",
   "explicacao": "Ligar os registros de uma mesma pessoa que aparecem em bases diferentes (internação, óbito, nascimento, vacina) sem um número comum entre elas: pelo nome, nome da mãe, data de nascimento e município. É o que o HDB faz em cerca de 20 minutos e que, à mão, leva semanas",
   "c": [
    "C1"
   ]
  },
  {
   "termo": "Coorte",
   "explicacao": "Um grupo de pessoas acompanhado ao longo do tempo nos registros de saúde: quem fez tal procedimento, o que aconteceu depois, com que frequência. É a matéria-prima da evidência de mundo real",
   "c": [
    "C2"
   ]
  },
  {
   "termo": "Comprovação",
   "explicacao": "O que o pacote entrega: p-valor e tamanho de efeito, com metodologia auditável, que a farmacêutica leva ao dossiê apresentado à CONITEC ou a uma operadora para que um medicamento seja incorporado. É onde a coorte vira decisão",
   "c": [
    "C3"
   ]
  },
  {
   "termo": "Pacote",
   "explicacao": "O que o HDB vende hoje: uma pergunta, uma coorte cruzada e a análise pronta (p-valor e tamanho de efeito), entregue à farmacêutica para o dossiê que vai à CONITEC ou à operadora",
   "c": []
  },
  {
   "termo": "Spin-off",
   "explicacao": "Uma empresa nova, fora do Einstein, que licencia a propriedade intelectual e opera o produto. Foi o modelo escolhido · a pergunta aberta é em que condições ela se sustenta",
   "c": []
  }
 ],
 "convergencia": [
  {
   "sigla": "C1",
   "nome": "Cruzamento",
   "verbo": "cruzar",
   "oque": "ligar a mesma pessoa entre as bases públicas, com os códigos certos para a pergunta",
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
   "oque": "a população recortada pela pergunta, pronta para a análise e guardada para a próxima",
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
   "oque": "p-valor e tamanho de efeito com metodologia auditável, no dossiê de quem decide",
   "estado": "feito",
   "confianca": "provavel",
   "etapas": [
    "E4",
    "E5"
   ]
  },
  {
   "sigla": "volta",
   "nome": "Reuso",
   "verbo": "voltar",
   "oque": "a mesma coorte responde à próxima pergunta sem pagar a montagem de novo",
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
   "temos": "um comprador que já pagou: a área de acesso de farmacêuticas, que leva a evidência ao dossiê de incorporação · três pacotes vendidos",
   "preciso": "qual dos cinco compradores paga primeiro, quanto paga e em quanto tempo fecha",
   "pedido": "abrir conversas com as áreas de acesso de três farmacêuticas e com dois gestores públicos, para ouvir quem ainda não ouvimos",
   "confianca": "provavel"
  },
  {
   "id": "proposta",
   "bloco": "Proposta de valor",
   "componente": "o que se entrega",
   "cor": "#00539A",
   "temos": "ligar a mesma pessoa entre dez bases públicas e entregar a análise pronta para quem decide, em dias e não em semanas",
   "preciso": "provar, lado a lado com os concorrentes, que esse cruzamento é o diferencial e não algo que já se vende",
   "pedido": "validar o método com uma área de pesquisa do Einstein, num estudo que possa ser publicado",
   "confianca": "provavel"
  },
  {
   "id": "canais",
   "bloco": "Canais",
   "componente": "como o cliente chega",
   "cor": "#0F766E",
   "temos": "o relacionamento pessoal dos fundadores · nenhuma prospecção ativa",
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
   "preciso": "um jeito de o cliente voltar com outra pergunta sobre a mesma coorte, sem pagar a montagem de novo",
   "pedido": "indicar uma área do Einstein que possa ser o primeiro usuário recorrente da coorte guardada",
   "confianca": "aberto"
  },
  {
   "id": "receita",
   "bloco": "Fontes de receita",
   "componente": "quem paga e como",
   "cor": "#A8730E",
   "temos": "pacote por projeto, sob encomenda · nenhuma receita recorrente",
   "preciso": "um preço recorrente testado com quem compra, ancorado no que uma consultoria cobra",
   "pedido": "validar a âncora de preço com a área de economia da saúde do Einstein",
   "confianca": "provavel"
  },
  {
   "id": "recursos",
   "bloco": "Recursos-chave",
   "componente": "o que não pode faltar",
   "cor": "#16233A",
   "temos": "o método, a curadoria clínica dos códigos e as bases já tratadas numa máquina própria",
   "preciso": "a dedicação acordada da equipe e quem responde pela ciência se uma pessoa sair",
   "pedido": "dizer se pesquisadores ligados ao Einstein podem dedicar horas ao spin-off, e em que regime",
   "confianca": "provavel"
  },
  {
   "id": "atividades",
   "bloco": "Atividades-chave",
   "componente": "o que se faz todo dia",
   "cor": "#16233A",
   "temos": "cruzar as bases, construir a coorte e analisar, em parte ainda à mão",
   "preciso": "o tempo real de entrega de um pacote, medido do pedido ao dossiê, e não só o da máquina",
   "pedido": "ceder um estudo já publicado para uma sessão cronometrada, refeita do zero",
   "confianca": "provavel"
  },
  {
   "id": "parcerias",
   "bloco": "Parcerias-chave",
   "componente": "quem precisa estar junto",
   "cor": "#16233A",
   "temos": "o Einstein como origem do método e casa provável do spin-off · a relação ainda não está escrita",
   "preciso": "a licença da propriedade intelectual e o papel do Einstein na empresa nova",
   "pedido": "decidir a licença do método e se o Einstein quer participação na empresa",
   "confianca": "aberto"
  },
  {
   "id": "custos",
   "bloco": "Estrutura de custos",
   "componente": "o que custa ficar de pé",
   "cor": "#A8730E",
   "temos": "custo de operação baixo hoje, com processamento em máquina própria · o custo maior é a equipe",
   "preciso": "o custo de cada coorte entregue e quem financia a empresa até o primeiro ano com lucro",
   "pedido": "dizer se o Einstein entra no capital inicial, ou se a busca é por investidor de fora",
   "confianca": "provavel"
  }
 ],
 "nao_ouvidos": [
  {
   "grupo": "Áreas de acesso de farmacêuticas fora da oncologia",
   "por_que": "os três pacotes vendidos vêm de uma área terapêutica só · não sabemos se as outras pagam",
   "como_ouvir": "três entrevistas com gerentes de acesso de outras áreas",
   "c": [
    "C3"
   ]
  },
  {
   "grupo": "Pesquisadores acadêmicos",
   "por_que": "têm a coorte pública do Cidacs sem custo · não sabemos por que pagariam",
   "como_ouvir": "duas conversas com grupos que já usam o Cidacs",
   "c": [
    "C2"
   ]
  },
  {
   "grupo": "Gestores públicos",
   "por_que": "compram painéis por licitação, não coortes",
   "como_ouvir": "uma conversa com uma secretaria de saúde que licitou painel",
   "c": [
    "C3"
   ]
  },
  {
   "grupo": "Operadoras de saúde",
   "por_que": "recebem o dossiê da farmacêutica e podem ser compradoras diretas",
   "como_ouvir": "uma conversa com a área de avaliação de tecnologias de uma operadora",
   "c": [
    "C3"
   ]
  },
  {
   "grupo": "Quem comprou uma vez e não voltou",
   "por_que": "a volta é o que faz o negócio acumular · nunca se perguntou por que não houve segundo pacote",
   "como_ouvir": "uma conversa com cada um dos três clientes",
   "c": [
    "volta"
   ]
  }
 ],
 "compradores": [
  {
   "nome": "Farmacêutica",
   "motivacao": "levar evidência brasileira ao dossiê de incorporação em semanas",
   "foco": "sim"
  },
  {
   "nome": "Pesquisador",
   "motivacao": "publicar com uma coorte grande, pagando com fomento",
   "foco": ""
  },
  {
   "nome": "Gestor público",
   "motivacao": "planejar a rede com indicadores da própria população",
   "foco": ""
  },
  {
   "nome": "Operadora",
   "motivacao": "decidir o que incorporar com dado de mundo real",
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
   "rotulo": "dos códigos certos à coorte",
   "quem": "curadoria clínica",
   "confianca": "provavel"
  },
  {
   "id": "c2-c3",
   "de": "C2",
   "para": "C3",
   "rotulo": "da coorte à análise revisada",
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
  "numero": 8,
  "data": "2026-10-26",
  "titulo": "A direção e os ausentes"
 }
};
