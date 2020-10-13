import { Cromossomo } from "./cromossomo";

export class Population {
  populacao: Cromossomo[];
  tamanhoPopulacao: number;

  constructor(tamanhoPopulacao: number, tamanhoDoCromossomo?: number) {
    this.tamanhoPopulacao = tamanhoPopulacao;
    this.populacao = [];

    if (tamanhoDoCromossomo) {
      for (let i = 0; i < tamanhoPopulacao; i++) {
        this.populacao.push(new Cromossomo(tamanhoDoCromossomo));
      }
    }
  }

  public getCromossomos(): Cromossomo[] {
    return this.populacao;
  }

  /** Função de ordenamento em ordem decrescente do melhor pro pior */
  public getCromossomoComMelhorAptidao(posicao : number): Cromossomo {

    //let populacoOrdenada: Cromossomo[] = [...this.population]; // Codigo comentado para teste versão inloco e versão deepclone 
    this.populacao.sort((a, b) => (a.fitness > b.fitness ? -1 : 1));

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
