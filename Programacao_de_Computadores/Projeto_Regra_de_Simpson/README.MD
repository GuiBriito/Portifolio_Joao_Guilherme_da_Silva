# 📈 Calculadora de Investimentos - Regra de Simpson 1/3
 
## 📝 Descrição do Projeto
Este projeto utiliza a **Regra de Simpson 1/3**, um método avançado de integração numérica, para calcular o montante final de um investimento sob capitalização contínua. Enquanto a regra do trapézio utiliza segmentos de reta, a Regra de Simpson utiliza parábolas para aproximar a área sob a curva da função de taxa de juros $f(x) = 0.05 + (x / 100)$, proporcionando um resultado matematicamente mais refinado.
 
O sistema foi desenvolvido para lidar com cenários de investimentos onde a taxa de juros varia com o tempo. Ao integrar a função de taxa no intervalo desejado, o script calcula o fator de crescimento acumulado e aplica o valor ao montante inicial, utilizando a base logarítmica para representar o crescimento contínuo de forma precisa.
 
## 🚀 Tecnologias Utilizadas
* **Linguagem:** Python 3.x
* **Bibliotecas:** `math` (processamento de funções exponenciais)
* **Conceitos:** Integração Numérica (Regra de Simpson), Interpolação Parabólica, Cálculo Numérico aplicado a Finanças.
 
## 📊 Resultados e Aprendizados
A implementação deste método permitiu comparar diferentes técnicas de aproximação numérica e sua eficiência em problemas financeiros.
* **Acurácia Superior:** Implementei o polinômio de Lagrange de segundo grau (implícito na Regra de Simpson) para reduzir o erro de truncamento em comparação ao método anterior.
* **Lógica de Pesos:** Aprendi a aplicar a ponderação correta dos pontos ($1, 4, 1$) sobre o intervalo $h/3$, característica fundamental deste algoritmo.
* **Interface Amigável:** Refinei as mensagens de interação com o usuário e o tratamento de erros para garantir uma experiência fluida no terminal.
 

## 🔧 Como Executar
1. Certifique-se de ter o **Python 3** instalado.
2. Clone o repositório:
   ```bash
   git clone [https://github.com/GuiBriito/Qr_Cold.git](https://github.com/GuiBriito/Qr_Cold.git)

[Voltar ao início](https://github.com/GuiBriito/Portifolio_Joao_Guilherme_da_Silva)