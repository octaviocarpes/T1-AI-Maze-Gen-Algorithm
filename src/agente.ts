import { MOVIMENTOS } from "./constantes";
import { Cromossomo } from "./cromossomo";
import { Labirinto } from "./labirinto";

const { CIMA: CIMA, BAIXO: BAIXO, ESQUERDA :ESQUERDA, DIREITA: DIREITA } = MOVIMENTOS;

/** Classe responsável para representar o comportamento do agente dentro do labirinto*/
export class Agente {
  movimentos: number = 0;
  movimentosMaximo : number;
  coordenada_x: number = 0; // Pega a posicao inicial da entrada do labirinto (chumbado) - X - EIXO CIMA / BAIXO
  coordenada_y: number = 0; // Pega a posicao inicial da entrada do labirinto (chumbado) - Y - EIXO DIREITA / ESQUERDA
  labirinto: Labirinto;
  posicaoGene: number = 0;
  cromossomo: Cromossomo;
  rota: number[][] = [[0, 0]]; // posicao inicial 'E' do labirinto (chumbada)
  caminhoInvalidado : boolean = false;

  constructor(cromossomo: Cromossomo, maze: Labirinto, movimentosMaximo : number) {
    this.cromossomo = cromossomo;
    this.labirinto = maze;
    this.movimentosMaximo = movimentosMaximo;
  }

  public executa(): void {

    while (true) {
      this.movimentos++;

      // Achou a saída do labirinto
      if (this.labirinto.getValorDaPosicao(this.coordenada_x, this.coordenada_y) === 'S') {
         console.log(this.rota)
         return;
      }

      // Evita loop infinito, necessário colocar um valor arbitrário aqui para inviabilizar a execução dessa simulação
      if (this.movimentos > this.movimentosMaximo) {
        return;
      }

      // Simulação não consegue mais andar nessa rodada (pois, pode ser que sofra mutação e ajuste o caminho novamente)
      if (this.caminhoInvalidado) {
        this.caminhoInvalidado = false; // por isso seta o valor novamente para false
        return;
      }

      this.caminhar();
    }
  }

  public caminhar() : void{

    let andou : boolean = false;
    let proximaDirecao: string = this.getProximoGene();

    /** Função que evita que a simulção ande para trás dependendo do ultimo movimento (bug)
     *  comentada pois, na função de pontuação foi criado penelização para ciclos
    if(this.posicaoGene > 0) {
      if(this.getPosicaoContraria(proximaDirecao) === this.cromossomo.getGene(this.posicaoGene - 1)) {
        this.caminhoInvalidado = true;
        return;
      }
    }
    */

    /** PARA TODAS AS DIREÇÕES É VALIDADO SE A POSIÇÃO É VÁLIDA PARA ENTÃO ALTERAR O VALOR DA COORDENADA DESSA SIMULAÇÃO*/
    if (proximaDirecao === ESQUERDA && this.labirinto.validaPosicao(this.coordenada_x, this.coordenada_y - 1)) {
          this.coordenada_y--;
          andou = true;
        // console.log("ESQUERDA", this.x_coordinate, this.y_coordinate);
  
    } else if (proximaDirecao === DIREITA && this.labirinto.validaPosicao(this.coordenada_x, this.coordenada_y + 1)) {
          this.coordenada_y++;
          andou = true;
          //console.log("DIREITA", this.x_coordinate, this.y_coordinate);
  
    } else if (proximaDirecao === BAIXO  && this.labirinto.validaPosicao(this.coordenada_x + 1, this.coordenada_y)) {
          this.coordenada_x++;
          andou = true;
          //console.log("BAIXO", this.x_coordinate, this.y_coordinate);
      
    } else if (proximaDirecao === CIMA && this.labirinto.validaPosicao(this.coordenada_x - 1, this.coordenada_y)) {
          this.coordenada_x--;
          andou = true;
          //console.log("CIMA", this.x_coordinate, this.y_coordinate);
    } 

    //Se conseguiu caminhar registra o caminho nas rotas
    //Caso contrário, encerra esta simulação temporariamente
    // Necessário para evitar repetição de codigo tanto no cruzamento / mutação
    // fazendo decode do cromossomo para verificar o tamanho válido e retirar o restante
    // desta forma temos como calcular a aptidão pelo o tamanho da rota válida
    if (andou) {
      this.rota.push([this.coordenada_x, this.coordenada_y]);
    } else {
        this.caminhoInvalidado = true;
       // this.cromossomo.setGenesValidos(this.rota.length)
    }
  }

  public getProximoGene() {
    let gene: string = this.cromossomo.getGene(this.posicaoGene++);
    return gene;
  }

  public getRota(): number[][] {
    return this.rota;
  }

  // Função usada para a simulação não ir para trás conforme ultima direção
  public getPosicaoContraria(posicao : string) : string{
    if('ESQUERDA') {
      return 'DIREITA'
    }

    else if('DIREITA') {
      return'ESQUERDA'
    }

    else if('CIMA') {
      return 'BAIXO'
    }

    else if('BAIXO') {
      return 'CIMA'
    }
    
    return posicao
  }
}
