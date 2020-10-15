import { Cromossomo } from "./cromossomo";

export class Population {
  populacao: Cromossomo[];
  tamanhoPopulacao: number;

  constructor(tamanhoPopulacao: number, tamanhoCromossomo?: number) {
    this.tamanhoPopulacao = tamanhoPopulacao;
    this.populacao = [];

    if (tamanhoCromossomo) {
      for (let i = 0; i < tamanhoPopulacao; i++) {
        this.populacao.push(new Cromossomo(tamanhoCromossomo));
      }
    }
  }

  public getCromossomos(): Cromossomo[] {
    return this.populacao;
  }

  /** Função de ordenamento em ordem decrescente do melhor pro pior */
  public getCromossoMaisApto(posicao : number): Cromossomo {

    //let populacoOrdenada: Cromossomo[] = [...this.population]; // Codigo comentado para teste versão inloco e versão deepclone 
    this.populacao.sort((a, b) => (a.aptidao > b.aptidao ? -1 : 1));
    
    return this.populacao[posicao]
  }

  public getTamanho(): number {
    return this.populacao.length;
  }

  public getCromossomo(posicao: number): Cromossomo {
    return this.populacao[posicao];
  }

  public setCromossomo(posicao: number, novoCromossomo: Cromossomo): void {
    this.populacao[posicao] = novoCromossomo;
  }

  //Bagunça as posições para ser utilizada no torneio
  public embaralhar(): void {
    
    const rng = Math.random();

    for (let i = this.populacao.length - 1; i > 0; i--) {
      let index = Math.floor(rng * i) + 1;
      let cromossomo: Cromossomo = this.populacao[index];
      this.populacao[index] = this.populacao[i];
      this.populacao[i] = cromossomo;
    }
  }
}
