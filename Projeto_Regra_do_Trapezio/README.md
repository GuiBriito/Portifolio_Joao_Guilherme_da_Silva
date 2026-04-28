# 📈 Calculadora de Investimentos - Regra do Trapézio
 
## 📝 Descrição do Projeto
Este projeto aplica a **Regra do Trapézio**, um método de integração numérica, para calcular o montante final de um investimento baseado em uma taxa de juros variável ao longo do tempo. Em vez de utilizar fórmulas de juros compostos estáticos, o sistema resolve a integral da função de taxa $f(x) = 0.05 + (x / 100)$ para determinar o retorno acumulado sob regime de capitalização contínua.
 
Desenvolvido para unir conceitos de **Análise Numérica** e **Finanças**, o script automatiza o cálculo da integral definida no intervalo do tempo estipulado pelo usuário. A aplicação é ideal para simular cenários onde as taxas de juros flutuam linearmente, oferecendo uma visão mais técnica e precisa sobre o crescimento patrimonial.
 
## 🚀 Tecnologias Utilizadas
* **Linguagem:** Python 3.x
* **Bibliotecas:** `math` (para funções exponenciais)
* **Conceitos:** Integração Numérica (Regra do Trapézio Composta), Capitalização Contínua, Tratamento de Exceções.
 
## 📊 Resultados e Aprendizados
A implementação deste algoritmo permitiu explorar a aplicação prática de cálculo diferencial e integral na programação.
* **Integração Numérica:** Implementei a lógica de divisão de intervalos ($h$) para aproximar a área sob a curva da função de juros.
* **Capitalização Contínua:** Utilizei a constante de Euler ($e$) através de `math.exp()` para calcular o montante final baseado no resultado da integral.
* **Robustez do Código:** Desenvolvi loops de validação (`try/except`) para garantir que o sistema não falhe ao receber entradas inválidas do usuário.
 
 
## 🔧 Como Executar
1. Certifique-se de ter o **Python 3** instalado.
2. Clone o repositório:
   ```bash
   git clone [https://github.com/GuiBriito/Qr_Cold.git](https://github.com/GuiBriito/Qr_Cold.git)

[Voltar ao início](https://github.com/GuiBriito/Portifolio_Joao_Guilherme_da_Silva)