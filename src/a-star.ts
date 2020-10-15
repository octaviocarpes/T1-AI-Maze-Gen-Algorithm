import { Grafo } from './grafo'
import { Labirinto } from './labirinto'

const labirinto = new Labirinto()

const heuristica = (a: number[], b: number[]): number => {
    const x1 = a[0]
    const y1 = a[1]
    const x2 = b[0]
    const y2 = b[1]
    return Math.abs((x2 - x1) + (y2 - y1))
}

export const procuraAestrela = (grafo: Grafo, inicio: number[], fim: number[]) => {
    let veioDe = null
    let foiPara = null
    let nodoAtual = grafo.nodos[0]
    let historico = []

    while(nodoAtual.valor !== 'S') {
        const filhos = nodoAtual.filhos
        let filhosAptos: number[][] = procuraFilhosAptos(filhos, grafo)
        veioDe = nodoAtual
        historico.push(veioDe)

        

        let menorFilho: any;

        if (!filhosAptos.length) {
            // procura por filhos aptos em nodos anteriores
            veioDe = historico.pop()
            if (veioDe) {
                filhosAptos = veioDe.filhos
            }

            menorFilho = filhosAptos.reduce((filhoAnterior, proximoFilho) => {
                if (heuristica(filhoAnterior, fim) < heuristica(proximoFilho, fim)) {
                    return filhoAnterior
                } else {
                    return proximoFilho
                }
            })
        } else {
            menorFilho = filhosAptos.reduce((filhoAnterior, proximoFilho) => {
                if (heuristica(filhoAnterior, fim) < heuristica(proximoFilho, fim)) {
                    return filhoAnterior
                } else {
                    return proximoFilho
                }
            })
        }

        nodoAtual = grafo.nodos
                    .filter(nodo => nodo.posicao.x === menorFilho[0] && nodo.posicao.y === menorFilho[1])
                    .reduce((prev, next) => prev)


        grafo.nodos[nodoAtual.index].visitado = true
        foiPara = nodoAtual
        
        console.log(`Trajeto: ${veioDe?.posicao.x} , ${veioDe?.posicao.y} - ${foiPara.posicao.x}, ${foiPara.posicao.y}`)

        console.log('\n')
    }
}

const procuraFilhosAptos = (filhos: number[][], grafo: Grafo) => {
    let filhosAptos: number[][] = []
    for (let i = 0; i < filhos.length; i++) {
        const nodo = procuraNodo(grafo, filhos[i][0], filhos[i][1])
        if (nodo.valor === '0' && nodo.visitado === false) {
            filhosAptos.push(filhos[i])
        }
    }
    return filhosAptos
}

const procuraNodo = (grafo: Grafo, x: number, y: number) => {
    return grafo.nodos
    .filter(nodo => nodo.posicao.x === x && nodo.posicao.y === y)
    .reduce((prev, next) => prev)
}


const desmarcaFilhos = (filhos: number[][], grafo: Grafo) => {
    for(let i = 0; i < filhos.length; i++) {
        for(let j = 0; j < filhos.length; j++) {
            const nodo = procuraNodo(grafo, i, j)
            grafo.nodos[nodo.index].visitado = false
        }
    }
}