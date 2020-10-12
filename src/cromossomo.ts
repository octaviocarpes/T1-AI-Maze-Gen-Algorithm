import { MOVES } from "./constants";

const { UP, DOWN, LEFT, RIGHT } = MOVES;

/** Classe para representar o cromosso da populacao,
 * cada posição do array é um genes
 * o cromossomo, a principio, tera o dobro do caminho necessario para achar a solução (27*2) = 54
 * esse valor vai ser chumbado no código, outra alternativa seria criar um for e ler todas as posições vazias
 */
export class Cromossomo {
  cromossomo: string[]; 
  fitness: number = -999;

  constructor(tamanhoCromossomo?: number, cromossomo?: string[]) {
    this.cromossomo = [];

    if (cromossomo) {
      this.cromossomo = cromossomo;
    }

    if (tamanhoCromossomo) {
      for (let i = 0; i < tamanhoCromossomo; i++) {
        const rng = Math.random();
        if (rng <= 0.25) {
          this.cromossomo.push(UP);
        } else if (0.25 < rng && rng <= 0.5) {
          this.cromossomo.push(DOWN);
        } else if (0.5 < rng && rng <= 0.75) {
          this.cromossomo.push(LEFT);
        } else if (0.75 < rng && rng <= 1) {
          this.cromossomo.push(RIGHT);
        }
      }
    }
  }

  public getCromossomo(): string[] {
    return this.cromossomo;
  }

  public getTamanhoCromossomo(): number {
    return this.cromossomo.length;
  }

  public getGene(posicao: number): string {
    return this.cromossomo[posicao];
  }

  public getFitness(): number {
    return this.fitness;
  }

  public setGene(posicao: number, novoGene: string) {
    this.cromossomo[posicao] = novoGene;
  }

  public setFitness(novaFitness: number) : void {
    this.fitness = novaFitness;
  }

  public printCromossomo() {
    console.log(this.cromossomo);
  }
}
