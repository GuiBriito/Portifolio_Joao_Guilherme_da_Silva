import math

def f(x):

    return 0.05 + (x / 100)

def regra_de_simpson():
    while True:
        try:
            p = float(input("Qual é o montante incial? \nR:"))
            break
        except ValueError:
            print("VALOR INVÁLIDO! Digite um número (Ex: 1000 ou algo como 1234.56)\n")

    while True:
        try:
            t = int(input("E o tempo em anos? \nR:"))
            break
        except ValueError:
            print("VALOR INVÁLIDO! Digite um número (Ex: 1, 2, 3, 4, 5, 6, 7, 8, 9, etc... )\n")

    h = t / 2
    t_inicio = f(0)
    t_meio = f(h)
    t_fim = f(t)
    
    integral = (h / 3) * (t_inicio + 4 * t_meio + t_fim)
    
  
    montante = p * math.exp(integral)
    
    print(f"Retorno acumulado (Integral): {integral:.2f}\n")
    print(f"Montante final após {t} anos: R$ {montante:.2f}\n")

        
def pergunta_calculo():
    while True:
        pergunta = input("Quer realizar um cálculo de investimento utilizando a regra de simpson? (Se sim digite 1, caso não digite 2.) \nR:")
           
        if pergunta == "1":
            regra_de_simpson() 
            
        elif pergunta == "2":
            print("Obrigado pela preferência!\n") 
            break
        else:
            print("Ops, digitou errado ein amigão, é só 1 ou 2 po, faz a boa ai.\n")
    

pergunta_calculo()
