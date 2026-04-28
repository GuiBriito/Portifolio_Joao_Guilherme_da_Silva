import math

def f(x):
    return (x / 100)

def obter_dados():
    while True:
        try:
            p = float(input("Qual é o montante incial? \nR:"))
            break
        except ValueError:
            print("Erro! Digite um número (Ex: 1000 ou algo como 1234.56)\n")

    while True:
        try:
            t = int(input("E o tempo em anos? \nR:"))
            break
        except ValueError:
            print("Erro! Digite um número (Ex: 1, 2, 3, 4, 5, 6, 7, 8, 9, etc.)\n")

    while True:
        try:
            i = float(input("Digite a porcentagem inicial de juros:\nR:"))
            break
        except ValueError:
            print("Erro! Digite um valor entre 0 e 100! Ex: 1, 2, 3, 4, 5, 6, 7, 8, 9") 
    return p, t, i


def regra_do_trapezio():

    p, t, i = obter_dados()
    tx = i / 100
    h = t / 2
    t_inicio = f(0) + tx
    t_meio = f(h) + tx
    t_fim = f(t) + tx

    integral = (h / 2) * (t_inicio + 2 * t_meio + t_fim)

    montante = p * math.exp(integral)

    print(f"Retorno acumulado (Integral): {integral:.2f}\n")
    print(f"Montante final após {t} anos: R$ {montante:.2f}\n")


def regra_de_simpson():

    p, t, i = obter_dados()
    tx = i / 100
    h = t / 2
    t_inicio = f(0) + tx
    t_meio = f(h) + tx
    t_fim = f(t) + tx

    integral = (h / 3) * (t_inicio + 4 * t_meio + t_fim)

    montante = p * math.exp(integral)

    print(f"Retorno acumulado (Integral): {integral:.2f}\n")
    print(f"Montante final após {t} anos: R$ {montante:.2f}\n")


def pergunta_calculo():
    while True:
        pergunta = input(
            "------Sistema de Cálculo em Investimentos------\n1. Regra de Simpson\n2. Regra do Trapézio\n3. Cancelar\nEscolha uma das opções acima\nR:")

        match pergunta:
            case "1":
                regra_de_simpson()
            case "2":
                regra_do_trapezio()
            case "3":
                print("Obrigado pela preferência!\n")
                break
            case _:
                print("❌ Opção inválida! Tente novamente.\n")


pergunta_calculo()
