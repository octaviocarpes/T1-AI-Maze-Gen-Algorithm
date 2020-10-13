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

/**  Conforme conversado com a professora, temos mias uma condição de parada que verifica se o score atingiu o valor ideal (A definir ainda) */
while(algoritmoGenetico.condicaoDeTerminioAtendida(geracao, numeroMaximoGeracoes) === false) {
    let cromossomo : Cromossomo = populacao.getCromossomoComMelhorAptidao(0);

    populacao = algoritmoGenetico.cruzemento(populacao)
    populacao = algoritmoGenetico.mutacao(populacao)

    algoritmoGenetico.avaliacao(labirinto, populacao )

    geracao++;

}

let cromossomo : Cromossomo = populacao.getCromossomoComMelhorAptidao(0);
console.log(cromossomo.getCromossomo())

let x : number = 0
let y : number = 0
