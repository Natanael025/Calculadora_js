# Calculadora Web (Programação Orientada a Objetos - POO)

Aplicação web de uma calculadora no estilo retrô/LCD, desenvolvida utilizando **HTML5**, **CSS3** e **JavaScript ES6+**.

O grande diferencial deste projeto é a sua **arquitetura orientada a objetos (POO)** com a criação de classes dedicadas para isolar a lógica matemática da camada de interface com o usuário (*UI*).

---

## Destaques de Arquitetura (POO)

O código em JavaScript foi totalmente estruturado utilizando **Classes e Orientação a Objetos**, aplicando o princípio de **separação de responsabilidades**:

### 1. Classe `Calculo` (Encapsulamento e Regra de Negócio)
* Responsável exclusivamente por realizar as operações matemáticas (`soma`, `subtração`, `multiplicação` e `divisão`).
* Utiliza **atributos privados** (`#num1` e `#num2`) para garantir o **encapsulamento** dos dados e impedir acesso ou alteração indevida por fora da classe.
* Tratamento de exceções (ex: erro ao tentar divisão por zero).

### 2. Classe `CalculoUI` (Interface e Estado)
* Responsável pelo gerenciamento de eventos da página, interação com os botões da calculadora e atualização do visor LCD.
* Gerencia o fluxo de operações contínuas e parciais.
* Utiliza `localStorage` para persistir dados temporários de operações pendentes entre interações do usuário.

---

## Funcionalidades

* **Operações Básicas:** Soma (`+`), Subtração (`-`), Multiplicação (`x`) e Divisão (`:`).
* **Cálculos Encadeados:** Suporte para operações em sequência (ex: `5 + 3 + 2`).
* **Tratamento de Erros:** Exibição de mensagem amigável no visor para divisões por zero ou operações inválidas.
* **Visor Estilo LCD:** Design visual que simula calculadoras físicas de mesa com resposta tátil nos botões.
* **Persistência Temporária:** Armazenamento parcial dos valores e operadores via `localStorage`.

---

## Tecnologias Utilizadas

* **HTML5:** Estruturação semântica dos elementos da calculadora.
* **CSS3:** Customização visual com CSS Grid, Flexbox, variáveis nativas (`:root`), gradientes e efeitos de pressionamento de teclas.
* **JavaScript (ES6+):** Programação Orientada a Objetos com classes, atributos privados (`#`), manipulação da DOM e API `localStorage`.

---

## Estrutura do Projeto

```text
.
├── index.html   # Estrutura do visor e teclado da calculadora
├── style.css    # Estilização visual (efeito de calculadora de mesa)
├── script.js    # Lógica em JavaScript estruturada em Classes (Calculo e CalculoUI)
└── README.md    # Documentação do projeto
```
---

Sugestões são bem-vindas!

*Todos os direitos reservados &copy; 2026*
