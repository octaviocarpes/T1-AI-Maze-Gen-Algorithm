import fs from "fs";

export class Labirinto {
  public matriz: string[][];

  constructor() {
    this.matriz = [[], [], [], [], [], [], [], [], [], [], [], []];
    this.criarMatriz();
  }

  private criarMatriz() {
    try {
      const dado = fs.readFileSync("src/maze.txt", { encoding: "utf-8" });
      const linhas = dado.split(/\r?\n/);

      for (let i = 0; i < linhas.length; i++) {
        for (let j = 0; j < linhas.length; j++) {
          this.matriz[i][j] = linhas[i][j];
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  /** Retorna a posição entrada do array chumbado, poderia ser um for buscando pela letra E */
  public getPosicaoInicial(): number[] {
    let array: number[] = [];
    array = [0, 0];
    return array;
  }

  /** Retorna a posição saida do array chumbado, poderia ser um for buscando pela letra S */
  public getPosicaoSaida(): number[] {
    let array: number[] = [];
    array = [11, 11];
    return array;
  }

  public getValorDaPosicao(linha: number, coluna: number): String {
    return this.matriz[linha][coluna];
  }

  private ehParede(linha: number, coluna: number): boolean {
    if (this.matriz[linha][coluna] === '1') {
      return true;
    }
    return false;
  }

  private withinBounds(linha: number, coluna: number): boolean {
    if (linha < 0 || linha > 11 || coluna < 0 || coluna > 11) {
      return false;
    }
    return true;
  }

  public validacao(linha: number, coluna: number): boolean {
    if (this.withinBounds(linha, coluna) && !this.ehParede(linha, coluna)) {
      return true;
    }
    return false;
  }

  /** Criar metodo para avaliação de posicao certas
   * 0 em sequencias
   */
  public calcularPontuacaoRota(rota: number[][]): number {
    let pontuacao: number = rota.length

    return this.temCiclos(rota, pontuacao)

  }

  private temCiclos(rota: number[][], fitness : number): number {
    let pontuacao : number = fitness;
    for (let linha = 0; linha < rota.length; linha++) {
      for (let outraLinha = 0; outraLinha < rota.length; outraLinha++) {
        if (linha !== outraLinha) {
          let haCiclo: boolean = this.verificaArraysIguals(rota[linha],rota[outraLinha]);
          if (haCiclo) {
            pontuacao--;
          }
        }
      }
    }
    return pontuacao
  }

  private verificaArraysIguals(array1: number[], array2: number[]): boolean {
    if (array1.length !== array2.length) {
      return false;
    }
    for (var i = array1.length; i--; ) {
      if (array1[i] !== array2[i]) return false;
    }
    return true;
  }

  /** nao sendo utilizada */
  private validaPosicoesVizinhas(rota: number[][], fitness : number): number {
    let pontuacao: number = fitness;

    for (let linha = 0; linha < rota.length - 1; linha++) {
      let valorX: number = rota[linha][0];
      let valorY: number = rota[linha][1];

      let valorProximoX: number = rota[linha + 1][0];
      let valorProximoY: number = rota[linha + 1][1];

      if (this.ehParede(valorX, valorY)) {
        pontuacao -= -1;
      }
    }
    return pontuacao;
  }
}
