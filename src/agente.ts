import { MOVIMENTOS } from "./constantes";
import { Cromossomo } from "./cromossomo";
import { Labirinto } from "./labirinto";

const { CIMA: CIMA, BAIXO: BAIXO, ESQUERDA :ESQUERDA, DIREITA: DIREITA } = MOVIMENTOS;

/** Classe responsável para representar o comportamento do agente dentro do labirinto*/
export class Agente {
  coordenada_x: number = 0; // Pega a posicao inicial da entrada do labirinto (chumbado) - X - EIXO CIMA / BAIXO
  coordenada_y: number = 0; // Pega a posicao inicial da entrada do labirinto (chumbado) - Y - EIXO DIREITA / ESQUERDA
  labirinto: Labirinto;
  posicaoGene: number = 0;
  cromossomo: Cromossomo;
  rota: number[][] = [[0, 0]]; // posicao inicial 'E' do labirinto (chumbada)
  caminhoInvalido : boolean = false;

  constructor(cromossomo: Cromossomo, maze: Labirinto) {
    this.cromossomo = cromossomo;
    this.labirinto = maze;
  }

  public executar(): boolean {

    while (true) {

      // Verifica se achou a saída do labirinto
      if (this.labirinto.getValorDaPosicao(this.coordenada_x, this.coordenada_y) === "S" ) {
        console.log(this.rota)
        return true;
      }

      // Verifica se o agente conseguiu andar ou não
      if (this.caminhoInvalido) {
        return false;
      }

      this.caminhar();
    }
  }

  public caminhar() : void{

    let andou : boolean = false;
    let proximaDirecao: string = this.getProximoGene();

    if (proximaDirecao === ESQUERDA) {
      if (this.labirinto.validaPosicao(this.coordenada_x, this.coordenada_y - 1)) {
          this.coordenada_y--;
          andou = true;
        // console.log("ESQUERDA", this.x_coordinate, this.y_coordinate);
      }

    } else if (proximaDirecao === DIREITA) {
      if (this.labirinto.validaPosicao(this.coordenada_x, this.coordenada_y + 1)) {
          this.coordenada_y++;
          andou = true;
          //console.log("DIREITA", this.x_coordinate, this.y_coordinate);
      }

    } else if (proximaDirecao === BAIXO) {
      if (this.labirinto.validaPosicao(this.coordenada_x + 1, this.coordenada_y)) {
          this.coordenada_x++;
          andou = true;
          //console.log("BAIXO", this.x_coordinate, this.y_coordinate);
      }

    } else if (proximaDirecao === CIMA) {
      if (this.labirinto.validaPosicao(this.coordenada_x - 1, this.coordenada_y)) {
          this.coordenada_x--;
          andou = true;
          //console.log("CIMA", this.x_coordinate, this.y_coordinate);
      }

    } else {
      this.caminhoInvalido = true;
    }

    //Se conseguiu caminhar registra o caminho nas rotas
    // Necessario para evitar repetição de codigo tanto no cruzamento / mutação
    // fazendo decode do cromossomo para verificar o tamanho válido e retirar o restante
    // desta forma temos como calcular a aptidão pelo o tamanho da rota válida
    if (andou) {
      this.rota.push([this.coordenada_x, this.coordenada_y]);
    }
  }

  public getProximoGene() {
    let gene: string = this.cromossomo.getGene(this.posicaoGene++);
    return gene;
  }

  public getRota(): number[][] {
    return this.rota;
  }
}
