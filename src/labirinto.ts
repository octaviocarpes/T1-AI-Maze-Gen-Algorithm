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

  public getValorDaPosicao(linha: number, coluna: number): String {
    return this.matriz[linha][coluna];
  }

  public ehParede(linha: number, coluna: number): boolean {
    if (this.matriz[linha][coluna] === '1') {
      return true;
    }
    return false;
  }

  private estaDentroDoLabirinto(linha: number, coluna: number): boolean {
    if (linha < 0 || linha > 11 || coluna < 0 || coluna > 11) {
      return false;
    }
    return true;
  }

  public validaPosicao(linha: number, coluna: number): boolean {
    if (this.estaDentroDoLabirinto(linha, coluna) && !this.ehParede(linha, coluna)) {
      return true;
    }
    return false;
  }

  /** Criar metodo para avaliação de posicao certas, baseada no tamanho da rota registrada e calculo de ciclos */
  public calculaPontuacao(rota: number[][]): number {
    let pontuacao: number = rota.length

    return this.temCiclos(rota, pontuacao)

  }

  private temCiclos(rota: number[][], aptidao : number): number {
    let pontuacao : number = aptidao;
    for (let linha = 0; linha < rota.length; linha++) {
      for (let outraLinha = 0; outraLinha < rota.length; outraLinha++) {
        if (linha !== outraLinha) {
          let temCiclo: boolean = this.verificaArraysIguals(rota[linha],rota[outraLinha]);
          if (temCiclo) {
            pontuacao-= 5;  // Valor arbitrário penaliza em 5 para cada ciclo (posição igual dentro da rota registrada)
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
      if (array1[i] !== array2[i]) {
        return false;
      }
    }
    return true;
  }

  /** (INUTILIZADA) era utilizada para penalizar caminhos com parede, agora com a validação direto no agente e o atributo booleano andou
   * não é mais necessario fazer o calculo com esta função, pois o algoritmo não irá mais adicionar a parede ao cromossomo que será avaliado
   */
  private validaPosicoesVizinhas(rota: number[][], fitness : number): number {
    let pontuacao: number = fitness;

    for (let linha = 0; linha < rota.length - 1; linha++) {
      let valorX: number = rota[linha][0];
      let valorY: number = rota[linha][1];

      if (this.ehParede(valorX, valorY)) {
        pontuacao -= -1; // Valor arbitrário
      }
    }
    return pontuacao;
  }
}
