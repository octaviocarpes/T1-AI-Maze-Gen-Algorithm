import { Agent } from "./agent"
import { Cromossomo } from "./cromossomo"
import { Maze } from "./maze"
import { Population } from "./population"

export class GeneticAlgorithm {
    populationSize: number
    mutationRate: number
    crossoverRate: number
    elitismCount: number
    tamanhoTorneio: number


    constructor(populationSize: number, mutationRate: number, crossoverRate: number, elitismCount: number, tamanhoTorneio number) {
        this.populationSize = populationSize
        this.mutationRate = mutationRate
        this.crossoverRate = crossoverRate
        this.elitismCount = elitismCount
        this.tamanhoTorneio = tamanhoTorneio
    }

    public initPopulation(chromosomeLength: number): Population {
        return new Population(this.populationSize, chromosomeLength)
    }

    public calculoDeAptidao(labirinto: Maze, cromossomo: Cromossomo) : number {
      let agente : Agent = new Agent(cromossomo, labirinto, 100)
      agente.executar()
      let aptidao : number = labirinto.calcularPontuacaoRota(agente.getRota()) // calcular ciclos (penalizar), parede ele nao vai se mexer

      cromossomo.setFitness(aptidao);

      return aptidao;

    }

    public avaliarPopulacao(populacao: Population, labirinto: Maze) : void {
        for (let i = 0; i < populacao.getCromossomos().length; i++) {
            this.calculoDeAptidao(labirinto, populacao.getCromossomo(i)) // verificar se e necessatio a aptidao da populacao; qualquer cosia colocar
        }
    }

    public condicaoDeTerminioAtendida(contadorDeGeracoes: number, numeroMaximoDeGeracoes: number)  : boolean {
        return contadorDeGeracoes > numeroMaximoDeGeracoes;
    }

    public selecionarParente(populacao: Population) : Cromossomo {
        let torneio : Population = new Population(this.tamanhoTorneio)
        populacao.shuffle() // ver o que isso faz (livro, pdf)
        for (let i = 0; i < this.tamanhoTorneio; i++) {
            let torneioCromossomo : Cromossomo = populacao.getCromossomo(i)
            torneio.setCromossomo(i, torneioCromossomo);
        }

        return populacao.getMelhorCromossomo();
    }

    public mutacao(populacao : Population) : Population {
        let populacaoNova : Population = new Population(this.populationSize)

        for (let posicaoCromossomo = 0; posicaoCromossomo < populacao.getCromossomos().length; posicaoCromossomo++) {
           let cromossomo : Cromossomo = populacao.getMelhorCromossomo(); // mudar o metodo ordernar melhor apra pior (fitness) e retornar a posicao do parametro
        
           if(posicaoCromossomo >= this.elitismCount) {
                for (let posicaoGene = 0; posicaoGene < cromossomo.getTamanhoCromossomo(); posicaoGene++) {
                            if(this.mutationRate > Math.random()) {
                                let numero : number = Math.random()
                                let direcao : string = this.getDirecao(numero)
                                cromossomo.setGene(posicaoGene, direcao)
                            }          
                        }     
           }

           populacaoNova.setCromossomo(posicaoCromossomo, cromossomo)
        }

        return populacaoNova;
    }



    private getDirecao(numero : number): string{
        let novoGene : string = 'UP'
        const rng = Math.random();

        if (0.25 < rng && rng <= 0.5) {
            novoGene = 'DOWN'
        } else if (0.5 < rng && rng <= 0.75) {
            novoGene = 'LEFT'
        } else if (0.75 < rng && rng <= 1) {
            novoGene = 'RIGHT'
        }
         return novoGene;
    }

    public crossover( populacao : Population) : Population{
        let populacaoNova : Population = new Population(populacao.getSizePopulation())

        for (let posicaoCromossomo = 0; posicaoCromossomo < populacao.getSizePopulation(); posicaoCromossomo++) {
            let pai : Cromossomo = populacao.getMelhorCromossomo() //passar index depois de mudar funcao

            if (this.crossoverRate > Math.random() && posicaoCromossomo >= this.elitismCount) {
                let filho : Cromossomo = new Cromossomo(pai.getTamanhoCromossomo())

                let mae : Cromossomo = this.selecionarParente(populacao)

                let troca : number = (Math.floor(Math.random()) *(pai.getTamanhoCromossomo() + 1))

                for (let posicaoGene = 0; posicaoGene < pai.getTamanhoCromossomo(); posicaoGene++) {
                    if(posicaoGene < troca) {
                        filho.setGene(posicaoGene, pai.getGene(posicaoGene))
                    } else {
                        filho.setGene(posicaoGene, mae.getGene(posicaoGene))
                    }
                }

                populacaoNova.setCromossomo(posicaoCromossomo, filho)

            } else {
                populacaoNova.setCromossomo(posicaoCromossomo, pai)
            }
        }

        return populacaoNova;

    }
}