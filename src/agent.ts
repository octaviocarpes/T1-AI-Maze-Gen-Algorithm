import { MOVES } from './constants'
import { Maze } from './maze'

const { UP, DOWN, LEFT, RIGHT } = MOVES

/** Classe responsável para representar o comportamento do agente dentro do labirinto*/
export class Agent {

    x_coordinate?: number
    y_coordinate?: number
    movimentos : number = 0

    constructor( maze : Maze,  maxMoves : number) {
    }


    public executar() : void {
        while(true) {
            this.movimentos++;
        }
    }
}