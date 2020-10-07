export class Population {
    population: number[][]
    populationFitness: number = -1
    populationSize: number

    constructor(populationSize: number, chromosomeLength?: number) {
        this.populationSize = populationSize
        this.population = []

        if (chromosomeLength) {
            for (let i = 0; i < populationSize; i++) {
                this.population.push(this._initChromosome(chromosomeLength))
            }
        }
    }

    _initChromosome(chromosomeLength: number): number[] {
        const chromosome = []
        
        for (let i = 0; i < chromosomeLength; i++) {
            if (0.5 < Math.random()) {
                chromosome.push(1)
            } else {
                chromosome.push(0)
            }
        }

        return chromosome
    }
}