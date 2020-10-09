import fs from 'fs'

export class Maze {
  public structure: string[][];

  constructor () {
    this.structure = [[],[],[],[],[],[],[],[],[],[]]
    this.createMazeStructure()
  }

  private createMazeStructure () {
    try {
      const data = fs.readFileSync('src/maze.txt', { encoding: 'utf-8'});
      const lines = data.split(/\r?\n/);

      for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines.length; j++) {
          this.structure[i][j] = lines[i][j]
        }
      }
      
    } catch (err) {
        console.error(err);
    }
  }
}