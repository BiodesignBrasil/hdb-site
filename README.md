# Health Data Brasil · site público

Síntese navegável do projeto **Health Data Brasil**: coortes a partir das bases públicas de saúde do Brasil, cruzadas pela mesma pessoa, com a análise pronta para quem decide.

Publicado pelo GitHub Pages em **https://biodesignbrasil.github.io/hdb-site/**.

| Caminho | O que é |
|---|---|
| `/` | a síntese, uma peça só, em seis abas que cabem numa tela: 00 De onde partimos (a roda dos três Cs e o contexto) · 01 a 04, as camadas da empresa nova · 05 O que decidir, a direção. O estado fica na URL (`?vista=…&item=…`) |
| `/sistematica/` | o endereço antigo da Sistemática: redireciona para a raiz, preservando a busca |
| `/caso-economico/` | a conta: o painel do caso econômico, com valores em reais; anexo aberto só pelos blocos Custos e Receitas da aba 05, fora dos buscadores |

Este repositório contém **só o que o site serve** (`.html`, `.css`, `.js`). Os dados, as planilhas, as notas e os registros do projeto ficam no vault privado `BiodesignBrasil/health-data-brasil`; os arquivos daqui são **gerados** a partir dele por `08_sintese/dados/publica_tudo.py`, que roda um detector de vazamento antes de copiar e cria uma tag `pub-NNN` por publicação (o rodapé traz "Estado em DD/MM/AAAA · publicação N"). Não editar os arquivos publicados à mão: a próxima publicação os sobrescreve. O único arquivo editado aqui diretamente é este README.

Biodesign Brasil · 2026
