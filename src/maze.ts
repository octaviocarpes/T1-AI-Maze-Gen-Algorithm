import fs from "fs";

export class Maze {
  public structure: string[][];

  constructor() {
    this.structure = [[], [], [], [], [], [], [], [], [], [], [], []];
    this.createMazeStructure();
  }

  private createMazeStructure() {
    try {
      const data = fs.readFileSync("src/maze.txt", { encoding: "utf-8" });
      const lines = data.split(/\r?\n/);

      for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines.length; j++) {
          this.structure[i][j] = lines[i][j];
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
    return this.structure[linha][coluna];
  }

  public ehParede(linha: number, coluna: number): boolean {
    if (this.structure[linha][coluna] === "1") {
      return true;
    }
    return false;
  }

  /** Criar metodo para avaliação de posicao certas
   * 0 em sequencias
   */
  public calcularPontuacaoRota(rota: string[]) {
    let pontuacao: number = 0;


  }
}
