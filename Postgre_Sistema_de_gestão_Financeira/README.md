# 🏦 Sistema de Gestão Financeira (PostgreSQL)
 
## 📝 Descrição do Projeto
Este projeto consiste no desenvolvimento de um **Schema de Banco de Dados Relacional** robusto para um Sistema de Gestão Financeira. O objetivo principal é fornecer uma infraestrutura de dados capaz de suportar o controle rigoroso de transações, gestão de contas multi-usuário, definição de metas de economia e monitoramento de limites de gastos por categoria.
 
Desenvolvido como parte dos meus estudos em **Bancos de Dados Relacionais**, o sistema utiliza recursos avançados do PostgreSQL, como `SCHEMAS` dedicados, restrições de integridade (`CHECK constraints`), índices otimizados para consultas de grande volume e `VIEWS` para simplificar a extração de relatórios e dashboards. A arquitetura foi pensada para garantir a consistência dos dados financeiros através de relacionamentos bem definidos e ações em cascata.
 
![Figura 1: Representação do Modelo Entidade-Relacionamento](https://github.com/GuiBriito/Qr_Cold/raw/main/assets/db_schema_preview.png)
*Figura 1: Estrutura das tabelas e relacionamentos do ecossistema financeiro.*
 
## 🚀 Tecnologias Utilizadas
* **SGBD:** PostgreSQL 15+
* **Linguagem:** SQL (DML, DDL, DCL)
* **Ferramentas:** pgAdmin 4 / DBeaver, Command Line (psql)
* **Conceitos:** Normalização de Dados, Indexação, Views, Integridade Referencial
 
## 📊 Resultados e Aprendizados
O desenvolvimento deste script SQL permitiu consolidar conhecimentos críticos sobre a estruturação de dados financeiros.
* **Otimização de Performance:** Implementação de índices específicos (`B-Tree`) em campos de busca frequente, como emails de usuários e datas de transações.
* **Integridade de Dados:** Aplicação de regras de negócio diretamente no banco via `CHECK constraints`, impedindo valores negativos em campos onde apenas valores positivos são permitidos.
* **Abstração com Views:** Criação de visões complexas (`vw_resumo_contas`) que unem múltiplas tabelas para entregar um resumo consolidado, facilitando o consumo por uma interface de front-end.
 
![Análise de Consultas e Índices](https://github.com/GuiBriito/Qr_Cold/raw/main/assets/query_performance.png)
*Figura 2: Exemplo de execução e plano de consulta otimizado.*
 
## 🔧 Como Executar
1. Certifique-se de ter o **PostgreSQL** instalado em sua máquina.
2. Crie um novo banco de dados ou utilize um existente.
3. Execute o script SQL contido neste repositório:
   ```bash
   psql -U seu_usuario -d seu_banco -f script_financeiro.sql

   [Voltar ao início](https://github.com/GuiBriito/Portifolio_Joao_Guilherme_da_Silva)