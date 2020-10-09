import { Population } from "./population"

export class GeneticAlgorithm {
    populationSize: number
    mutationRate: number
    crossoverRate: number
    elitismCount: number
    population: Population

    constructor(populationSize: number, mutationRate: number, crossoverRate: number, elitismCount: number) {
        this.populationSize = populationSize
        this.mutationRate = mutationRate
        this.crossoverRate = crossoverRate
        this.elitismCount = elitismCount
        this.population = this.initPopulation(populationSize)
    }

    public initPopulation(chromosomeLength: number): Population {
        return new Population(this.populationSize, chromosomeLength)
    }

    public muatatePopulation() {

    }

    public reproducePopulation () {

    }

    public selectPopulation () {

    }
}