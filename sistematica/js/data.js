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
   "texto": "a evidência melhor serve à CONITEC e ao SUS, mas quem paga é a farmacêutica, e só se a evidência fortalecer o próprio dossiê",
   "c": [
    "C3"
   ]
  },
  {
   "camada": "sistema",
   "titulo": "O que se vende é o cruzamento, não o dado",
   "texto": "a matéria-prima é pública e aberta a todos, concorrentes incluídos · o valor está em ligar a mesma pessoa entre as bases e escolher os códigos certos",
   "c": [
    "C1"
   ]
  },
  {
   "camada": "servicos",
   "titulo": "Cada pacote paga o próprio custo",
   "texto": "a contribuição por pacote é alta, o que falta é volume para cobrir a equipe",
   "c": [
    "C3"
   ]
  },
  {
   "camada": "jornadas",
   "titulo": "Cada cliente vira projeto novo",
   "texto": "sem coorte reutilizável a receita não acumula, que é onde plataformas de dados costumam travar",
   "c": [
    "volta"
   ]
  },
  {
   "camada": "fecho",
   "titulo": "Propriedade intelectual licenciada pelo Einstein",
   "texto": "antes de constituir a empresa e de captar",
   "c": [
    "C1"
   ]
  },
  {
   "camada": "ecossistema",
   "titulo": "A matéria-prima é grátis para todos",
   "texto": "o dado público está aberto também aos concorrentes, então o que se vende é o método, e o método ainda não tem prova pública própria",
   "c": [
    "C1",
    "C3"
   ]
  },
  {
   "camada": "sistema",
   "titulo": "Quem autoriza ainda não autorizou",
   "texto": "o código de coleta original é atribuído ao Departamento de Informática do Einstein, e sem licença o spin-off não capta",
   "c": [
    "C1"
   ]
  },
  {
   "camada": "servicos",
   "titulo": "Vender contra consultoria, não contra equipe interna",
   "texto": "contra consultoria o HDB é dominante em todos os cenários, contra uma equipe interna enxuta só empata",
   "c": [
    "C3"
   ]
  },
  {
   "camada": "fecho",
   "titulo": "Cartas de intenção da indústria farmacêutica e de empresas de pesquisa clínica",
   "texto": "volume acima do empate até o ano 3",
   "c": [
    "volta"
   ]
  },
  {
   "camada": "ecossistema",
   "titulo": "Há concorrente local com a mesma promessa",
   "texto": "a Precision Data anuncia relatórios de duas semanas em dois dias para o mesmo público",
   "c": [
    "C1"
   ]
  },
  {
   "camada": "sistema",
   "titulo": "Tempo dito, não medido",
   "texto": "os cerca de 20 minutos medem a geração da coorte na máquina, não a entrega do pacote, e vieram dos fundadores",
   "c": [
    "C1",
    "C2"
   ]
  },
  {
   "camada": "servicos",
   "titulo": "O gargalo é demanda, não capacidade",
   "texto": "a equipe paga tem capacidade muito acima do volume previsto, e os prejuízos dos primeiros anos são capacidade ociosa",
   "c": [
    "volta"
   ]
  },
  {
   "camada": "fecho",
   "titulo": "Preço ancorado na consultoria",
   "texto": "validado em entrevista com decisores de acesso e economia da saúde",
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
 "lacunas_publicas": [
  {
   "titulo": "Preço recorrente e faixas de preço",
   "gate": "G2",
   "papel": "fundadores, com entrevistas de mercado",
   "prazo": "a definir"
  },
  {
   "titulo": "Custo por coorte entregue",
   "gate": "G3",
   "papel": "fundadores",
   "prazo": "a definir"
  },
  {
   "titulo": "Disposição a pagar e ciclo de venda por segmento",
   "gate": "G2",
   "papel": "mesa de decisão",
   "prazo": "a definir"
  },
  {
   "titulo": "Dedicação e participação dos 3 fundadores",
   "gate": "G1",
   "papel": "fundadores",
   "prazo": "a definir"
  },
  {
   "titulo": "Custo de nuvem em escala",
   "gate": "G3",
   "papel": "fundadores",
   "prazo": "a definir"
  },
  {
   "titulo": "Propriedade intelectual em 5 camadas",
   "gate": "G1",
   "papel": "jurídico do Einstein e fundadores",
   "prazo": "a definir"
  },
  {
   "titulo": "Tempo medido: geração da coorte e entrega do pacote",
   "gate": "G3",
   "papel": "fundadores",
   "prazo": "a definir"
  },
  {
   "titulo": "Teste do cruzamento de bases contra a Techtrials",
   "gate": "G2",
   "papel": "mesa de decisão",
   "prazo": "a definir"
  },
  {
   "titulo": "Curva de adoção (clientes por ano)",
   "gate": "G2",
   "papel": "a definir",
   "prazo": "a definir"
  },
  {
   "titulo": "Apetite do Einstein por participação e por operar um produto",
   "gate": "G1",
   "papel": "direção do Einstein",
   "prazo": "a definir"
  },
  {
   "titulo": "Mapear a Precision Data",
   "gate": "G2",
   "papel": "equipe do projeto",
   "prazo": "antes de qualquer pitch"
  },
  {
   "titulo": "Dimensionar o segmento farmacêutico de baixo para cima",
   "gate": "G2",
   "papel": "equipe do projeto",
   "prazo": "a definir"
  },
  {
   "titulo": "Quem financia o capital até o primeiro lucro",
   "gate": "G2",
   "papel": "mesa de decisão e fundadores",
   "prazo": "a definir"
  },
  {
   "titulo": "Posição da Precision Data no mapa, inferida e não medida",
   "gate": "G2",
   "papel": "equipe do projeto",
   "prazo": "junto com o mapa da Precision Data"
  },
  {
   "titulo": "Certificado do site oficial vencido",
   "gate": "G2",
   "papel": "fundadores",
   "prazo": "imediato"
  }
 ],
 "versao": {
  "numero": 5,
  "data": "2026-10-24",
  "titulo": "A convergência"
 }
};
