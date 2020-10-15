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

  // Buscar valor no labirinto na posição da coordenada passada por parametro
  public getValorDaPosicao(coordenada_x: number, coordenada_y: number): String {
      return this.matriz[coordenada_x][coordenada_y];

  }
  
  // VALIDAÇÃO
  public ehParede(coordenada_x: number, coordenada_y: number): boolean {
    if (this.matriz[coordenada_x][coordenada_y] === '1') {
      return true;
    }
    return false;
  }

   // VALIDAÇÃO
  private estaDentroDoLabirinto(coordenada_x: number, coordenada_y: number): boolean {
    if (coordenada_x < 0 || coordenada_x > 11 || coordenada_y < 0 || coordenada_y > 11) {
      return false;
    }
    return true;
  }

  // VALIDAÇÃO da coordenada se está dentro do labirinto e se não é parede
  public validaPosicao(coordenada_x: number, coordenada_y: number): boolean {
    if (this.estaDentroDoLabirinto(coordenada_x, coordenada_y) && !this.ehParede(coordenada_x, coordenada_y)) {
      return true;
    }
    return false;
  }

  //Calcula para distância euclediana (serve como denominador da pontuação correspondente valor das posições válidas)
  private calculaDistanciaEuclediana(rota: number[][]): number {

    let coordenada : number[] = rota[rota.length- 1];
    let dif_y: number = Math.abs(coordenada[1] - 12);
    let dif_x: number = Math.abs(coordenada[0] - 12);

    let pontuacao: number = Math.sqrt((dif_y * dif_y) +(dif_x* dif_x));

    return pontuacao;
  }

  // Foram testados varias metodos de calculo
  // Esse primeiro calcula a rota como um BFS, marca as posições visitadas e pontua por posição válida que não foi visitada
  public calculaRota(rota: number[][]): number {
    let pontuacao: number = 0

    let visitado : boolean[][]  = [[], [], [], [], [], [], [], [], [], [], [], []];
    
    for (let index = 0; index < rota.length; index++) {
      let coordenadas : number[] = rota[index]
      let direcao : string = this.matriz[coordenadas[0]][coordenadas[1]] 
      if((direcao === '0' || direcao === 'S' || direcao === 'E') // Se for uma posição válida
        && (visitado[coordenadas[0]][coordenadas[1]] === undefined) // Se ainda não foi visitada
        && this.validaPosicao(coordenadas[0],coordenadas[1])) { // Se não é parede e se está dentro do labirinto
     
        pontuacao+=5 // recompensa 
        visitado[coordenadas[0]][coordenadas[1]] = true // marca como visitado para não recompensar novamente
  
      }
      else {
        pontuacao-=2 // penaliza caso for posição inválida
    }
  }

  // 1º valor: pontuação das posições validas //2º valor: proximidade da sáida
  // A ideia aqui é quanto mais perto da saída, o divisor fica mas perto do 0
  return (pontuacao / this.calculaDistanciaEuclediana(rota)) 

  }

  //Função para verificar se ambas as coordenadas são iguais
  private verificaArraysIguals(array1: number[], array2: number[]): boolean {
    if (array1.length !== array2.length) {
      return false;
    }
    for (let i = array1.length; i < 0 ;i--) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }
    return true;
  }

  public construirRotaPorCromossomo(cromossomo: string[]): string[] {
    let rota: string[] = []
    let posicao = { x: 0, y: 0 }
    rota.push('0, 0')

    for(let i = 0; i < cromossomo.length; i++) {
      if (cromossomo[i] === 'DIREITA') {
        posicao.x += 1
        rota.push(`${posicao.x}, ${posicao.y}`)
      } else if (cromossomo[i] === 'BAIXO') {
        posicao.y += 1
        rota.push(`${posicao.x}, ${posicao.y}`)
      } else if (cromossomo[i] === 'CIMA') {
        posicao.y -= 1
        rota.push(`${posicao.x}, ${posicao.y}`)
      } else if (cromossomo[i] === 'ESQUERDA') {
        posicao.x -= 1
        rota.push(`${posicao.x}, ${posicao.y}`)
      }
    }

    return rota
  }

    /** Criar metodo para avaliação de posicao certas, baseada no tamanho da rota registrada e calculo de ciclos 
   * Com o metodo de calculo que valida a posicao com um array de booleanos, não é mais necessário essa função
  public calculaPontuacao2(rota: number[][]): number {
    let pontuacao: number = rota.length

    return this.temCiclos(rota, pontuacao);
  } */ 

    /**
    // função que verifica se há clicos na rota
    private temCiclos(rota: number[][], aptidao : number): number {
      let pontuacao : number = aptidao;
      for (let linha = 0; linha < rota.length; linha++) {
        for (let outraLinha = 0; outraLinha < rota.length; outraLinha++) {
          if (linha !== outraLinha) {
            let temCiclo: boolean = this.verificaArraysIguals(rota[linha],rota[outraLinha]);
            if (temCiclo) {
              pontuacao-= 3;  // penaliza caso for posição inválida
            }
          }
        }
      }
      return Math.round(pontuacao)
    }

    */
  
  /** (INUTILIZADA) agora com a validação direto no agente e o atributo booleano andou
   * Não é mais necessário fazer o calculo com esta função, pois o algoritmo não irá mais adicionar a parede a rota que será avaliada
  
  // Utilizada para penalizar caminhos com parede, 
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
  */
}
