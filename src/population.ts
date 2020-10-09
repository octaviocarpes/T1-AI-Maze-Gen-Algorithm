import { MOVES } from './constants'

const { UP, DOWN, LEFT, RIGHT } = MOVES
export class Population {
    population: string[][]
    populationFitness: number = -1
    populationSize: number

    constructor(populationSize: number, chromosomeLength?: number) {
        this.populationSize = populationSize
        this.population = []

        if (chromosomeLength) {
            for (let i = 0; i < populationSize; i++) {
                this.population.push(this.initChromosome(chromosomeLength))
            }
        }
    }

    private initChromosome(chromosomeLength: number): string[] {
        const chromosome = []
        
        for (let i = 0; i < chromosomeLength; i++) {
            const rng = Math.random()
            if (rng <= 0.25) {
                chromosome.push(UP)
            } else if (0.25 < rng && rng <= 0.5) {
                chromosome.push(DOWN)
            } else if (0.5 < rng && rng <= 0.75) {
                chromosome.push()
            } else if (0.75 < rng && rng <= 1) {
                chromosome.push('RIGHT')
            }
        }

        return chromosome
    }

    public mutate () {

    }

    public reproduce () {

    }
}