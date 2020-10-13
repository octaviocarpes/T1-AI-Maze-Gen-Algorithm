import fs from 'fs'

class Nodo {
    public filhos: number[][]
    public valor: string

    constructor(valor: string, filhos: number[][]) {
        this.filhos = filhos
        this.valor = valor
    }
}

export class Grafo {
    public nodos: Nodo[]

    constructor () {
        this.nodos = []
        try {
            const dado = fs.readFileSync("src/maze.txt", { encoding: "utf-8" });
            const linhas = dado.split(/\r?\n/);

            for (let i = 0; i < linhas.length; i++) {
                for (let j = 0; j < linhas.length; j++) {
                    this.nodos.push(this.adicionaNodo(linhas, [i,j], linhas[i][j]))
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    private adicionaNodo (linhas: string[], posicao: number[], valor: string): Nodo {
        const filhos: number[][] = []
        const cima = [posicao[0], posicao[1] - 1]
        const baixo = [posicao[0], posicao[1] + 1]
        const esquerda = [posicao[0] - 1, posicao[1]]
        const direita = [posicao[0] + 1, posicao[1]]

        if (!(cima[0] < 0 || cima[0] > 11 || cima[1] < 0 || cima[1] > 11)) {
            filhos.push(cima)
        }

        if (!(baixo[0] < 0 || baixo[0] > 11 || baixo[1] < 0 || baixo[1] > 11)) {
            filhos.push(baixo)
        }

        if (!(esquerda[0] < 0 || esquerda[0] > 11 || esquerda[1] < 0 || esquerda[1] > 11)) {
            filhos.push(esquerda)
        }

        if (!(direita[0] < 0 || direita[0] > 11 || direita[1] < 0 || direita[1] > 11)) {
            filhos.push(direita)
        }

        return new Nodo(valor, filhos)
    }

}