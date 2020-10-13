import { sys } from "typescript";
import { MOVES } from "./constantes";
import { Cromossomo } from "./cromossomo";
import { Labirinto } from "./labirinto";


/** Classe responsável para representar o comportamento do agente dentro do labirinto*/
export class Agente {
  x_coordinate: number = 0;
  y_coordinate: number = 0;
  movimentos: number = 0;
  quantidadeMaximaDeMovimentos: number;
  maze: Labirinto;
  gene: number = 0;
  cromossomo: Cromossomo;
  rota: number[][] = [[0, 0]]; // posicao inicial 'E' do labirinto
  ultima_direcao?: String;
  caminhoInvalido : boolean = false;

  constructor(cromossomo: Cromossomo, maze: Labirinto, movimentosMaximo: number) {
    this.cromossomo = cromossomo;
    this.quantidadeMaximaDeMovimentos = movimentosMaximo;
    this.maze = maze;
  }

  public executar(): void {

    while (true) {

      this.movimentos++;

      if (this.maze.getValorDaPosicao(this.x_coordinate, this.y_coordinate) === "S" ) {
        console.log(this.rota)
        return;
      }

      if (this.caminhoInvalido) {
        return;
      }

      if (this.movimentos > this.quantidadeMaximaDeMovimentos) {
        return;
      }

      this.caminhar();
    }
  }

  public caminhar() : void{

    let posicaoAtual_X : number = this.x_coordinate;
    let posicaoAtual_Y : number = this.y_coordinate;

    let andou : boolean = false;

    let direcao: string = this.getProximoCaminhoCromossomo();

    if (direcao === "LEFT") {
      if (this.maze.validacao(posicaoAtual_X, posicaoAtual_Y - 1)) {
          this.y_coordinate--;
          andou = true;
        // console.log("LEFT", this.x_coordinate, this.y_coordinate);
      }
    } else if (direcao === "RIGHT") {
      if (this.maze.validacao(posicaoAtual_X, posicaoAtual_Y + 1)) {
          this.y_coordinate++;
          andou = true;


        //  console.log("RIGHT", this.x_coordinate, this.y_coordinate);
      }
    } else if (direcao === "DOWN") {
      if (this.maze.validacao(posicaoAtual_X + 1, posicaoAtual_Y)) {
          this.x_coordinate++;
          andou = true;

          //console.log("DOWN", this.x_coordinate, this.y_coordinate);
 
      }
    } else if (direcao === "UP") {
      if (this.maze.validacao(posicaoAtual_X - 1, posicaoAtual_Y)) {
          this.x_coordinate--;
          andou = true;

        // console.log("UP", this.x_coordinate, this.y_coordinate);
      }
    }

  //  if (this.x_coordinate !== posicaoAtual_X || this.y_coordinate !== posicaoAtual_Y) {
    if(andou) {
      this.rota.push([this.x_coordinate, this.y_coordinate]);
    } else {
        this.caminhoInvalido = false;
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
