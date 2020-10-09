import { Maze } from './maze'
import { GeneticAlgorithm } from './genetic-algorithm'

const maze = new Maze()
const alg = new GeneticAlgorithm(10, 10, 10, 10)

console.log(alg.population)
console.log(maze)