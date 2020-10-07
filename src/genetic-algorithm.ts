import { Population } from "./population"

export class GenericAlgorithm {
    populationSize: number
    mutationRate: number
    crossoverRate: number
    elitismCount: number

    constructor(populationSize: number, mutationRate: number, crossoverRate: number, elitismCount: number) {
        this.populationSize = populationSize
        this.mutationRate = mutationRate
        this.crossoverRate = crossoverRate
        this.elitismCount = elitismCount
    }

    initPopulation(chromosomeLength: number): Population {
        return new Population(this.populationSize, chromosomeLength);
    }
}