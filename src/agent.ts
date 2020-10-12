import { MOVES } from "./constants";
import { Cromossomo } from "./cromossomo";
import { Maze } from "./maze";

const { UP, DOWN, LEFT, RIGHT } = MOVES;

/** Classe responsável para representar o comportamento do agente dentro do labirinto*/
export class Agent {
  x_coordinate: number = 0;
  y_coordinate: number = 0;
  movimentos: number = 0;
  movimentosMaximo: number;
  maze: Maze;
  gene: number = 0;
  cromossomo: Cromossomo;
  rota: number[][] = [[0, 0]]; // posicao inicial 'E' do labirinto

  constructor(cromossomo: Cromossomo, maze: Maze, movimentosMaximo: number) {
    this.cromossomo = cromossomo;
    this.movimentosMaximo = movimentosMaximo;
    this.maze = maze;
  }

  public executar(): void {
    while (true) {
      this.movimentos++;

      if (
        this.maze.getValorDaPosicao(this.x_coordinate, this.y_coordinate) ===
        "S"
      ) {
        return;
      }

      if (this.movimentos > this.movimentosMaximo) {
        return;
      }

      this.caminhar();
    }
  }

  public caminhar() {
    let posicaoAtual_X = this.x_coordinate;
    let posicaoAtual_Y = this.y_coordinate;

    let direcao: string = this.getProximoCaminhoCromossomo();

    if (direcao === "LEFT") {
      if (this.maze.validateMazePosition(posicaoAtual_X - 1, posicaoAtual_Y)) {
        this.x_coordinate--;
      }
    } else if (direcao === "RIGHT") {
      if (this.maze.validateMazePosition(posicaoAtual_X + 1, posicaoAtual_Y)) {
        this.x_coordinate++;
      }
    } else if (direcao === "DOWN") {
      if (this.maze.validateMazePosition(posicaoAtual_X, posicaoAtual_Y - 1)) {
        this.y_coordinate--;
      }
    } else if (direcao === "UP") {
      if (this.maze.validateMazePosition(posicaoAtual_X, posicaoAtual_Y + 1)) {
        this.y_coordinate++;
      }
    }

    if (
      this.x_coordinate !== posicaoAtual_X ||
      this.y_coordinate !== posicaoAtual_Y
    ) {
      this.rota.push([this.x_coordinate, this.y_coordinate]);
    }
  }

  public getProximoCaminhoCromossomo() {
    let gene: string = this.cromossomo.getGene(this.gene++);
    return gene;
  }

  public getRota(): number[][] {
    return this.rota;
  }
}
