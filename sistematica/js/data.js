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
   "nome": "Fundadores (Berg · Freitas · Wolosker)",
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
   "texto": "a evidência melhor serve à CONITEC e ao SUS, mas quem paga é a farmacêutica, e só se a evidência fortalecer o próprio dossiê"
  },
  {
   "camada": "sistema",
   "titulo": "O gargalo é demanda, não capacidade",
   "texto": "a equipe paga tem capacidade muito acima do volume previsto, e os prejuízos dos primeiros anos são capacidade ociosa"
  },
  {
   "camada": "servicos",
   "titulo": "Cada pacote paga o próprio custo",
   "texto": "a contribuição por pacote é alta, o que falta é volume para cobrir a equipe"
  },
  {
   "camada": "jornadas",
   "titulo": "Cada cliente vira projeto novo",
   "texto": "sem coorte reutilizável a receita não acumula, que é onde plataformas de dados costumam travar"
  },
  {
   "camada": "fecho",
   "titulo": "Propriedade intelectual licenciada pelo Einstein",
   "texto": "antes de constituir a empresa e de captar"
  },
  {
   "camada": "ecossistema",
   "titulo": "A matéria-prima é grátis para todos",
   "texto": "o dado público está aberto também aos concorrentes, então o que se vende é o método, e o método ainda não tem prova pública própria"
  },
  {
   "camada": "sistema",
   "titulo": "Quem autoriza ainda não autorizou",
   "texto": "o código de coleta original é atribuído ao Departamento de Informática do Einstein, e sem licença o spin-off não capta"
  },
  {
   "camada": "servicos",
   "titulo": "Vender contra consultoria, não contra equipe interna",
   "texto": "contra consultoria o HDB é dominante em todos os cenários, contra uma equipe interna enxuta só empata"
  },
  {
   "camada": "fecho",
   "titulo": "Cartas de intenção da indústria farmacêutica e de empresas de pesquisa clínica",
   "texto": "volume acima do empate até o ano 3"
  },
  {
   "camada": "ecossistema",
   "titulo": "Há concorrente local com a mesma promessa",
   "texto": "a Precision Data anuncia relatórios de duas semanas em dois dias para o mesmo público"
  },
  {
   "camada": "fecho",
   "titulo": "Preço ancorado na consultoria",
   "texto": "validado em entrevista com decisores de acesso e economia da saúde"
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
   "paga": [],
   "ganha": []
  },
  {
   "etapa": "E2",
   "quando": "primeira semana",
   "vive": "Define com o HDB o desenho do estudo: população, período, desfecho",
   "atua": "Wolosker e a curadoria clínica",
   "bastidor": "escolha dos códigos SIGTAP e CID que capturam cada procedimento",
   "recurso": "ciência e curadoria clínica",
   "decide": "cliente e HDB, juntos",
   "fonte": "inferencia",
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
   "paga": [],
   "ganha": [
    "hdb"
   ]
  },
  {
   "etapa": "E4",
   "quando": "semanas seguintes",
   "vive": "Recebe o rascunho e devolve dúvidas",
   "atua": "Freitas, com revisão clínica",
   "bastidor": "estatística pronta e metodologia auditável",
   "recurso": "analista e revisor clínico",
   "decide": "HDB",
   "fonte": "inferencia",
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
   "valor": 65
  },
  {
   "id": "empate",
   "rotulo": "Empate",
   "unidade": "pacotes por ano",
   "leitura": "o volume que cobre o custo fixo da equipe ao preço de referência",
   "confianca": "provavel",
   "valor": 17
  },
  {
   "id": "vendidos",
   "rotulo": "Vendidos até hoje",
   "unidade": "pacotes, no total",
   "leitura": "três contratos pontuais, sem receita recorrente",
   "confianca": "confirmado",
   "valor": 3
  },
  {
   "id": "equipe",
   "rotulo": "Equipe",
   "unidade": "pessoas em tempo integral",
   "leitura": "os três fundadores, dedicação ainda não acordada",
   "confianca": "provavel",
   "valor": 3
  },
  {
   "id": "cruzamento",
   "rotulo": "Tempo de cruzamento",
   "unidade": "minutos",
   "leitura": "geração da coorte cruzada entre bases, dito pelos fundadores · a entrega do pacote leva semanas",
   "confianca": "confirmado",
   "valor": 20
  },
  {
   "id": "primeiro_lucro",
   "rotulo": "Primeiro ano com lucro operacional",
   "unidade": "ano",
   "leitura": "no caso-base, com o volume crescendo de 3 para 30 pacotes por ano",
   "confianca": "provavel",
   "valor": 4
  }
 ]
};
