import { Agente } from "./agente"
import { Cromossomo } from "./cromossomo"
import { Labirinto } from "./labirinto"
import { Population as Populacao } from "./populacao"

export class GeneticAlgorithm {
    tamanhoDaPopulacao: number
    taxaDeMutacao: number
    taxaDeCruzamento: number
    contadorDeElitismo: number
    tamanhoTorneio: number


    constructor(populationSize: number, mutationRate: number, crossoverRate: number, elitismCount: number, tamanhoTorneio : number) {
        this.tamanhoDaPopulacao = populationSize
        this.taxaDeMutacao = mutationRate
        this.taxaDeCruzamento = crossoverRate
        this.contadorDeElitismo = elitismCount
        this.tamanhoTorneio = tamanhoTorneio
    }

    public iniciarPopulacao(chromosomeLength: number): Populacao {
        return new Populacao(this.tamanhoDaPopulacao, chromosomeLength)
    }

    public calculoDeAptidao(labirinto: Labirinto, cromossomo: Cromossomo) : number {

      let agente : Agente = new Agente(cromossomo, labirinto, 120)
      agente.executar()
      let aptidao : number = labirinto.calcularPontuacaoRota(agente.getRota()) // calcular ciclos (penalizar), parede ele nao vai se mexer

      cromossomo.setFitness(aptidao);

      return aptidao;

    }

    public avaliacao(labirinto: Labirinto, populacao: Populacao, ) : void {
        for (let i = 0; i < populacao.getCromossomos().length; i++) {
            this.calculoDeAptidao(labirinto, populacao.getCromossomo(i)) 
        }
    }

    public condicaoDeTerminioAtendida(contadorDeGeracoes: number, numeroMaximoDeGeracoes: number)  : boolean {
        return contadorDeGeracoes > numeroMaximoDeGeracoes;
    }

    public selecionaParente(populacao: Populacao) : Cromossomo {
        let torneio : Populacao = new Populacao(this.tamanhoTorneio)
        populacao.embaralhar() // verificar isso
        for (let i = 0; i < this.tamanhoTorneio; i++) {
            let torneioCromossomo : Cromossomo = populacao.getCromossomo(i)
            torneio.setCromossomo(i, torneioCromossomo);
        }

        return populacao.getCromossomoComMelhorAptidao(0);
    }

    public mutacao(populacao : Populacao) : Populacao {
        let novaPopulacao : Populacao = new Populacao(this.tamanhoDaPopulacao)

        for (let posicaoCromossomo = 0; posicaoCromossomo < populacao.getTamanho(); posicaoCromossomo++) {
           let cromossomo : Cromossomo = populacao.getCromossomoComMelhorAptidao(posicaoCromossomo);

           //Movido para cima o for (antes do if devido a bug)
           // Verificar se nao da para buscar a rota do cromosso, decodificar ela e  fazer a mutação em cima das posicoes que não condizem com um cmainho válido
           for (let posicaoGene = 0; posicaoGene < cromossomo.getTamanhoCromossomo(); posicaoGene++) {
                 if(posicaoCromossomo >= this.contadorDeElitismo) {
                    if(this.taxaDeMutacao > Math.random()) {
                        let numero : number = Math.random()
                        let novoGene : string = this.getDirecao(numero)
                        cromossomo.setGene(posicaoGene, novoGene)
                    }          
                }     
           }
           
           novaPopulacao.setCromossomo(posicaoCromossomo, cromossomo)
        }

        return novaPopulacao;
    }



    private getDirecao(numero : number): string{
        let novoGene : string = "UP"
        const rng = Math.random();

        if (0.25 < rng && rng <= 0.5) {
            novoGene = "DOWN"
        } else if (0.5 < rng && rng <= 0.75) {
            novoGene = "LEFT"
        } else if (0.75 < rng && rng <= 1) {
            novoGene = "RIGHT"
        }
         return novoGene;
    }

    public cruzemento( populacao : Populacao) : Populacao{
        let novaPopulacao : Populacao = new Populacao(populacao.getTamanho())

        for (let posicaoCromossomo = 0; posicaoCromossomo < populacao.getTamanho(); posicaoCromossomo++) {
            let pai : Cromossomo = populacao.getCromossomoComMelhorAptidao(posicaoCromossomo)

            if (this.taxaDeCruzamento > Math.random() && posicaoCromossomo >= this.contadorDeElitismo) {
                let filho : Cromossomo = new Cromossomo(pai.getTamanhoCromossomo())

                let mae : Cromossomo = this.selecionaParente(populacao)

                let pontoDeTroca : number = (Math.floor(Math.random() *(pai.getTamanhoCromossomo() + 1)))

                /** Ver se aqui nao daria para pegar a rota e verificar o caminho válido, e apenas trocar os que não são (dá pra ver isso atraves das rotas que o agent percorreu) */
                for (let posicaoGene = 0; posicaoGene < pai.getTamanhoCromossomo(); posicaoGene++) {
                    if(posicaoGene < pontoDeTroca) {
                        filho.setGene(posicaoGene, pai.getGene(posicaoGene))
                    } else {
                        filho.setGene(posicaoGene, mae.getGene(posicaoGene))
                    }
                }

                novaPopulacao.setCromossomo(posicaoCromossomo, filho)

            } else {
                novaPopulacao.setCromossomo(posicaoCromossomo, pai)
            }
        }

        return novaPopulacao;

    }
}