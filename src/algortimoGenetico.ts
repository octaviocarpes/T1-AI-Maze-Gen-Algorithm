import { Agente } from "./agente"
import { Cromossomo } from "./cromossomo"
import { Labirinto } from "./labirinto"
import { Population as Populacao } from "./populacao"
import { MOVIMENTOS } from "./constantes";

const { CIMA: CIMA, BAIXO: BAIXO, ESQUERDA :ESQUERDA, DIREITA: DIREITA } = MOVIMENTOS;

export class GeneticAlgorithm {
    tamanhoPopulacao: number
    taxaMutacao: number
    taxaCruzamento: number
    eletismo: number
    tamanhoTorneio: number
    rota: number[][]

    constructor(tamanhoPopulacao: number, taxaMutacao: number, taxaCruzamento: number, eletismo: number, tamanhoTorneio : number) {
        this.tamanhoPopulacao = tamanhoPopulacao
        this.taxaMutacao = taxaMutacao
        this.taxaCruzamento = taxaCruzamento
        this.eletismo = eletismo
        this.tamanhoTorneio = tamanhoTorneio
        this.rota = []
    }

    public iniciarPopulacao(tamanhoCromossomo: number): Populacao {
        return new Populacao(this.tamanhoPopulacao, tamanhoCromossomo)
    }

    //Calcula a aptidao e seta o valor no cromossomo
    public calculaAptidao(labirinto: Labirinto, cromossomo: Cromossomo) : void {

      let agente : Agente = new Agente(cromossomo, labirinto, 200)

      // Agente é o simulador, onde irá decodificar a direção e, caso válida a direção do movimento
      // seta o valor em um array que armazena as coordenadas das posições em que esta simulação caminhou no labirinto
      agente.executa()

      if (agente.encontrouCaminho) {
        this.rota = agente.rota
      }

      //Calcula a rota através das rotas (coordenadas)
      let aptidao : number = labirinto.calculaRota(agente.getRota()) // calcular ciclos (penalizar), parede ele nao vai se mexer
      cromossomo.setAptidao(aptidao);

    }

    // Loop que faz a avaliação de aptidão de cada cromossomo de toda a população
    public avaliacao(labirinto: Labirinto, populacao: Populacao, ) : void {
        for (let i = 0; i < populacao.getCromossomos().length; i++) {
            this.calculaAptidao(labirinto, populacao.getCromossomo(i)) 
             }
        }
        
    public condicaoDeTerminioAtendida(contadorDeGeracoes: number, numeroMaximoDeGeracoes: number)  : boolean {
        return contadorDeGeracoes > numeroMaximoDeGeracoes;
    }

    //Seleciona cromossomo vencedor do torneio
    public selecionaParente(populacao: Populacao) : Cromossomo {
        
        let populacaoTorneio : Populacao = new Populacao(this.tamanhoTorneio)

        populacao.embaralhar() // deve bagunçar a ordem devido o metodo 'getCromossoMaisApto', que ordena por aptidão

        for (let i = 0; i < this.tamanhoTorneio; i++) { // seleciona N cromossomos dependendo do tamanho do torneio (variavel setada na inicializão)
            let torneioCromossomo : Cromossomo = populacao.getCromossomo(i)
            populacaoTorneio.setCromossomo(i, torneioCromossomo);
        }

        return populacao.getCromossoMaisApto(0); //Pega o melhor
    }

    // Realiza a mutação de todos os cromossomos da população
    public mutacao(populacao : Populacao) : Populacao {
        let novaPopulacao : Populacao = new Populacao(this.tamanhoPopulacao)

        for (let posicaoCromossomo = 0; posicaoCromossomo < populacao.getTamanho(); posicaoCromossomo++) { // processo de copiar a população antiga para a nova
           let cromossomo : Cromossomo = populacao.getCromossoMaisApto(posicaoCromossomo);

           //Movido para cima o for (antes do if devido a bug)
           //Refatorado, retirado repetição de código referente ao decodificador do cromossomo, pois a rota agora fica salva no próprio agente
           for (let posicaoGene = 0; posicaoGene < cromossomo.getTamanhoCromossomo(); posicaoGene++) {
                 if(posicaoCromossomo >= this.eletismo) { // não realiza mutação dos melhores cromossomos

                    // DARIA AQUI PARA UTILIZAR O GENE DA CLASSE AGENTE E SETAR ESSE VALOR NO CROMOSSOMO 
                    // (ASSIM SABEMOS,QUANTOS CAMINHOS AQUELE CROMOSSOMO ANDOU COM SUCESSO, E UTILIZAR 
                    // ELE COMO POSIÇÃO DE CORTE PARA MUTAÇÃO,PARECIDO COM O ELETISMO)

                    // Pega gera um gene aleatório e adiciona ao cromossomo
                    if(this.taxaMutacao > Math.random()) {
                        let numero : number = Math.random()
                        let novoGene : string = this.getNovoGene(numero)
                        cromossomo.setGene(posicaoGene, novoGene)
                    }          
                }     
           }
           
           novaPopulacao.setCromossomo(posicaoCromossomo, cromossomo) // adiciona o cromossomo na nova populacao
        }

        return novaPopulacao;
    }

    //Gera gene aleatoriamente
    private getNovoGene(numero : number): string{
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

        // Itera sobra os cromossomos
        for (let posicaoCromossomo = 0; posicaoCromossomo < populacao.getTamanho(); posicaoCromossomo++) {
            let pai : Cromossomo = populacao.getCromossoMaisApto(posicaoCromossomo) // pai

            // pega as duas taxas e verifica se irá aplicar ou não o cruzamento para o pai
            if (this.taxaCruzamento > Math.random() && posicaoCromossomo >= this.eletismo) {

                let filho : Cromossomo = new Cromossomo(pai.getTamanhoCromossomo()) // filho

                let mae : Cromossomo = this.selecionaParente(populacao) // mãe

                let pontoDeTroca : number = (Math.floor(Math.random() *(pai.getTamanhoCromossomo() + 1)))

                /** Ver se aqui nao daria para pegar a rota e verificar o caminho válido, e apenas trocar os que não são (dá pra ver isso atraves das rotas que o agente percorreu) */
                // devido a inserção da rota no agente, não será mais necessário decodificar o cromossomo e validar os genes válidos para a solução e os que não são
              
                // itera sobre os genes do cromossomo do loop acima (pai)

                // PEGA UM PONTO ALEATÓRIO DOS GENES DO PAI E ENTÃO DIVIDE-O OS GENES DO PAI E MÃE E ACRESCENTA NO FILHO
                for (let posicaoGene = 0; posicaoGene < pai.getTamanhoCromossomo(); posicaoGene++) {
                    if(posicaoGene < pontoDeTroca) {
                        filho.setGene(posicaoGene, pai.getGene(posicaoGene))
                    } else {
                        filho.setGene(posicaoGene, mae.getGene(posicaoGene))
                    }
                }
                novaPopulacao.setCromossomo(posicaoCromossomo, filho)

            } else { // caso não tenha cruzamento, adiciona o pai direto na posicao da nova população
                novaPopulacao.setCromossomo(posicaoCromossomo, pai)
            }
        }
        return novaPopulacao;
    }
}