import { MOVES } from "./constants";
import { Cromossomo } from "./cromossomo";

const { UP, DOWN, LEFT, RIGHT } = MOVES;
export class Population {
  population: Cromossomo[];
  populationFitness: number = -999;
  populationSize: number;

  constructor(populationSize: number, chromosomeLength?: number) {
    this.populationSize = populationSize;
    this.population = [];

    if (chromosomeLength) {
      for (let i = 0; i < populationSize; i++) {
        this.population.push(new Cromossomo(chromosomeLength));
      }
    }
  }

  public getCromossomos(): Cromossomo[] {
    return this.population;
  }

  public getMelhorCromossomo(): Cromossomo {
    let melhorCromossomo: Cromossomo = this.population[0];

    for (let i = 1; i < this.population.length; i++) {
      if (melhorCromossomo.fitness < this.population[i].fitness) {
        melhorCromossomo = this.population[i];
      }
    }

    return melhorCromossomo;
  }

  public getPopulationFitness(): number {
    return this.populationFitness;
  }

  public getSizePopulation(): number {
    return this.population.length;
  }

  public getCromossomo(posicao: number): Cromossomo {
    return this.population[posicao];
  }

  public setPopulationFitness(novaFitness: number): void {
    this.populationFitness = novaFitness;
  }

  public setCromossomo(posicao: number, novoCromossomo: Cromossomo): void {
    this.population[posicao] = novoCromossomo;
  }

  public shuffle(): void {
    const rng = Math.random();

    for (let i = this.population.length - 1; i > 0; i--) {
      let index = Math.floor(rng * i) + 1;
      let cromossomo: Cromossomo = this.population[index];
      this.population[index] = this.population[i];
      this.population[i] = cromossomo;
    }
  }
}
