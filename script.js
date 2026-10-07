class Calculo{
    #num1
    #num2
    constructor(num1, num2){
        this.#num1=Number(num1);
        this.#num2=Number(num2);
    }
    soma(){
        return this.#num1 + this.#num2;
    }
    subtracao(){
        return this.#num1 - this.#num2;
    }
    multiplicacao(){
        return this.#num1 * this.#num2;
    }
    divisao(){
       if (this.#num2 === 0) throw new Error("Divisão por zero");
       return this.#num1 / this.#num2;
    }
    calcular(operador){
        const operacoes = {
           "+": () => this.soma(),
           "-": () => this.subtracao(),
           "x": () => this.multiplicacao(),
           ":": () => this.divisao()
       };
       if (!operacoes[operador]) throw new Error("Operador inválido");
       return operacoes[operador]();
    }
}

class CalculoUI {
    constructor() {
        this.tela = document.getElementById("tela");
        this.resultadoNaTela = false;
        this.limparStorage();
        this.iniciarEventos();
    }
    iniciarEventos() { /* addEventListener nos botões */
        document.querySelectorAll(".digito").forEach(botao => {
            botao.addEventListener("click", () => {
                this.adicionarDigito(botao.value);
            });
        });
        document.querySelectorAll(".operador").forEach(botao => {
            botao.addEventListener("click", () => {
                this.definirOperacao(botao.value);
            });
        });
        document.querySelector(".limpar").addEventListener("click", () => this.limpar());
        document.querySelector(".igual").addEventListener("click", () => this.calcular());
    }
    adicionarDigito(digito) {
        // evita zeros à esquerda: "0" + "5" vira "5", não "05"
        if (this.resultadoNaTela || this.tela.value === "0") {
           this.tela.value = digito;
           this.resultadoNaTela = false;
        } 
        else {
           this.tela.value += digito;
        }
    }
    obterValorVisor() {
        if (this.tela.value === "") return null;
        return Number(this.tela.value);
    }
    mostrarNoVisor(valor) {
        this.tela.value = valor;
    }
    limparVisor() {
        this.tela.value = "";
    }
    definirOperacao(operador) {
        const num = this.obterValorVisor();
        if (num === null || Number.isNaN(num)) return;

        const dados = { 
            num1: localStorage.getItem("num1"),
            operador: localStorage.getItem("operador")
        };
        const num1 = Number(dados.num1);
        const pendente = dados.operador;

        // Se não houver operação pendente, salva o número e operador atuais
        // Caso o usuario faça 5 + 3 + 2 ele resolve e guardo o '5+3' como num1 e o operador '+' para a próxima operação
        if (pendente === null) {
            // primeira operação da conta
            this.salvarNoStorage(num, operador);
        } else {
            // já havia uma operação pendente: resolve antes de guardar a nova
            try {
                const parcial = this.calcularParcial(num1, pendente, num);
                this.salvarNoStorage(parcial, operador);
            } catch (error) {
                this.limparStorage();
                this.mostrarErro(error.message);
                return;
            }
        }

        this.limparVisor();
        this.resultadoNaTela = false;
    }
    calcular() {
        const num2 = this.obterValorVisor();
        const num1 = Number(localStorage.getItem("num1"));
        const operador = localStorage.getItem("operador");

        // sem segundo número, com "Erro" no visor ou sem operação pendente: ignora
        if (num2 === null || Number.isNaN(num2) || operador === null) return;

        try {
            this.mostrarNoVisor(this.calcularParcial(num1, operador, num2));
            this.resultadoNaTela = true;
        } catch (error) {
            this.mostrarErro(error.message);
        }
        this.limparStorage(); // vale para sucesso e erro
    }
    calcularParcial(num1, operador, num2) {
        const resultado = new Calculo(num1, num2).calcular(operador);
        return Number(resultado.toFixed(10)); // evita problemas de muitas casas decimais
    }
    salvarNoStorage(num, operador) {
        localStorage.setItem("num1", num);
        localStorage.setItem("operador", operador);
    }
    limparStorage() {
        localStorage.removeItem("num1");
        localStorage.removeItem("operador");
    }
    limpar() {
        this.tela.value = "";
        this.limparStorage();
    }
    mostrarErro(mensagem) {
        this.tela.value = mensagem;
        this.resultadoNaTela = true;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new CalculoUI();
});
