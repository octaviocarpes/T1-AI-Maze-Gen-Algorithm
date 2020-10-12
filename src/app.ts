import { Maze } from "./maze";
import { GeneticAlgorithm } from "./genetic-algorithm";
import { Population } from "./population";

/** Numero de gerações de gerações que serve como condição de parada, assim como no exemplo do dojo da aula */
const numeroMaximoGeracoes: number = 500;

/** Cria a classe do labirinto já lendo o txt e o populando, a clase ainda contém métodos de apoio da classe */
const maze = new Maze();

/** Instancia o algoritmo genético, ontem tem os principais métodos do algoritmo (avaliação de aptidao, torneio, mutação, crossover) */
// Populacao 100
// Taxa de mutação = 20%
// Taxa de crossover = 80%
// Elitismo = 1
const algoritmo = new GeneticAlgorithm(100, 0.2, 0.8, 1, 10);

let popupacao: Population = algoritmo.initPopulation(100)
console.log(alg.population);
console.log(maze);
