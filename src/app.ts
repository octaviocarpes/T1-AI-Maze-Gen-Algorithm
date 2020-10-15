import { Labirinto as Labirinto } from "./labirinto";
import { GeneticAlgorithm as AlgoritmoGenetico } from "./algortimoGenetico";
import { Population as Populacao } from "./populacao";
import { Cromossomo } from "./cromossomo";

const numeroMaximoGeracoes: number = 1000
;
const labirinto = new Labirinto();

const algoritmoGenetico = new AlgoritmoGenetico(200, 0.05, 0.9, 2, 25);
let populacao: Populacao = algoritmoGenetico.iniciarPopulacao(130);

algoritmoGenetico.avaliacao(labirinto, populacao)

let geracao : number = 1;

while(algoritmoGenetico.condicaoDeTerminioAtendida(geracao, numeroMaximoGeracoes) === false) {

    populacao = algoritmoGenetico.cruzemento(populacao)
    populacao = algoritmoGenetico.mutacao(populacao)
    algoritmoGenetico.avaliacao(labirinto, populacao)
    geracao++;
}

let cromossomo : Cromossomo = populacao.getCromossoMaisApto(0);

console.log(cromossomo.getCromossomo())
