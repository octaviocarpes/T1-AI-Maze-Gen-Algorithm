import { Agente } from "./agente"
import { Cromossomo } from "./cromossomo"
import { Labirinto } from "./labirinto"
import { Population as Populacao } from "./populacao"
import { MOVIMENTOS } from "./constantes";

const { CIMA: CIMA, BAIXO: BAIXO, ESQUERDA :ESQUERDA, DIREITA: DIREITA } = MOVIMENTOS;

export class GeneticAlgorithm {
    tamanhoDaPopulacao: number
    taxaDeMutacao: number
    taxaDeCruzamento: number
    contadorDeElitismo: number
    tamanhoTorneio: number

    constructor(tamanhoDaPopulacao: number, taxaDeMutacao: number, taxaDeCruzamento: number, contadorDeElitismo: number, tamanhoTorneio : number) {
        this.tamanhoDaPopulacao = tamanhoDaPopulacao
        this.taxaDeMutacao = taxaDeMutacao
        this.taxaDeCruzamento = taxaDeCruzamento
        this.contadorDeElitismo = contadorDeElitismo
        this.tamanhoTorneio = tamanhoTorneio
    }

    public iniciarPopulacao(tamanhoDoCromossomo: number): Populacao {
        return new Populacao(this.tamanhoDaPopulacao, tamanhoDoCromossomo)
    }

    public calculoDeAptidao(labirinto: Labirinto, cromossomo: Cromossomo) : boolean {

      let agente : Agente = new Agente(cromossomo, labirinto)
      let achouSaida : boolean = agente.executar()
      let aptidao : number = labirinto.calculaPontuacao(agente.getRota()) // calcular ciclos (penalizar), parede ele nao vai se mexer

      cromossomo.setFitness(aptidao);

      return achouSaida;
    }

    public avaliacao(labirinto: Labirinto, populacao: Populacao, ) : boolean {
        for (let i = 0; i < populacao.getCromossomos().length; i++) {
            if(this.calculoDeAptidao(labirinto, populacao.getCromossomo(i))) {
                return true;
            } 
        }
        return false;
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
           //Refatorado, retirado repetição de código referente ao decodificador do cromossomo, pois a rota agora fica salva no próprio agente
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
        let novoGene : string = CIMA

        if (0.25 < numero && numero <= 0.5) {
            novoGene = BAIXO
        } else if (0.5 < numero && numero <= 0.75) {
            novoGene = ESQUERDA
        } else if (0.75 < numero && numero <= 1) {
            novoGene = DIREITA
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

                /** Ver se aqui nao daria para pegar a rota e verificar o caminho válido, e apenas trocar os que não são (dá pra ver isso atraves das rotas que o agente percorreu) */
                // devido a inserção da rota no agente, não será mais necessário decodificar o cromossomo e validar os genes válidos para a solução e os que não são
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