import { PriorityQueue } from "./priority-queue"

const heuristic = (a, b): number => {
    const { x1, y1 } = a
    const { x2, y2 } = b
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))
}

const aStarSearch = (graph, start: number[], goal: number[]) => {
    const frontier = new PriorityQueue()
}