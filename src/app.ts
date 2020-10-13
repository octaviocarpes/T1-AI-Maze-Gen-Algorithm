import { Labirinto as Labirinto } from "./labirinto";
import { GeneticAlgorithm as AlgoritmoGenetico } from "./algortimoGenetico";
import { Population as Populacao } from "./populacao";
import { Cromossomo } from "./cromossomo";

/** Inicializacao de todo o algoritmo e estrutura */
const numeroMaximoGeracoes: number = 1000;
const labirinto = new Labirinto();
const algoritmoGenetico = new AlgoritmoGenetico(200, 0.05, 0.9, 2, 10);
let populacao: Populacao = algoritmoGenetico.iniciarPopulacao(128);

algoritmoGenetico.avaliacao(labirinto, populacao)

let geracao : number = 1;
let achouSaida : boolean = false;

while(algoritmoGenetico.condicaoDeTerminioAtendida(geracao, numeroMaximoGeracoes) === false && achouSaida === false) {

    populacao = algoritmoGenetico.cruzemento(populacao)
    populacao = algoritmoGenetico.mutacao(populacao)

    if (algoritmoGenetico.avaliacao(labirinto, populacao)) {
        achouSaida = true;
    }

    geracao++;
}

let cromossomo : Cromossomo = populacao.getCromossomoComMelhorAptidao(0);
console.log(cromossomo.getCromossomo())

