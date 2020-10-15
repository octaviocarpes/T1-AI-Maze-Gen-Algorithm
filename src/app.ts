import { Labirinto as Labirinto } from "./labirinto";
import { GeneticAlgorithm as AlgoritmoGenetico } from "./algortimoGenetico";
import { Population as Populacao } from "./populacao";
import { Cromossomo } from "./cromossomo";
import { procuraAestrela } from "./a-star";
import { Grafo } from "./grafo";
import fs from 'fs'

const numeroMaximoGeracoes: number = 5000;
const labirinto = new Labirinto();
const algoritmoGenetico = new AlgoritmoGenetico(200, 0.05, 0.9, 2, 25);
let populacao: Populacao = algoritmoGenetico.iniciarPopulacao(200);

algoritmoGenetico.avaliacao(labirinto, populacao)

let geracao: number = 1;

while (algoritmoGenetico.condicaoDeTerminioAtendida(geracao, numeroMaximoGeracoes) === false) {
  populacao = algoritmoGenetico.cruzemento(populacao)
  populacao = algoritmoGenetico.mutacao(populacao)
  algoritmoGenetico.avaliacao(labirinto, populacao)
  geracao++;
}

let cromossomo: Cromossomo = populacao.getCromossoMaisApto(0);


const grafo = new Grafo()
const caminhoGenetico = `${algoritmoGenetico.rota.join('\n')}`;
const caminhoAestrela = `${procuraAestrela(grafo, [0, 0], [11, 11]).join('\n')}`

console.log('Caminho Genetico')
console.log(caminhoGenetico)

console.log('\n')

console.log('Caminho A*')
console.log(caminhoAestrela)

fs.writeFile('genetico.txt', caminhoGenetico, function (err) {
  if (err) return console.log(err);
});

fs.writeFile('a-estrela.txt', caminhoAestrela, function (err) {
  if (err) return console.log(err);
});



