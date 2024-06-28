import { makeAutoObservable } from "mobx";

const generateNumbers = (): number[][] => {
  let numbers = Array.from({ length: 25 }, (_, i) => i + 1);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return Array.from({ length: 5 }, (_, i) => numbers.slice(i * 5, i * 5 + 5));
};

class BingoStore {
  board = generateNumbers();
  player1Selected = Array.from({ length: 5 }, () => Array(5).fill(false));
  player2Selected = Array.from({ length: 5 }, () => Array(5).fill(false));
  bingo: null | number = null;
  gameStarted = false;
  timer = 0;
  currentPlayer: 1 | 2 = 1;
  timerRef: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  startGame = () => {
    this.gameStarted = true;
    this.timer = 0;
    this.timerRef = window.setInterval(() => {
      this.timer += 1;
    }, 1000);
  };

  stopGame = () => {
    if (this.timerRef) {
      clearInterval(this.timerRef);
    }
  };

  selectNumber = (row: number, col: number) => {
    if (this.bingo !== null || !this.gameStarted) return;

    if (this.currentPlayer === 1) {
      if (!this.player1Selected[row][col] && !this.player2Selected[row][col]) {
        this.player1Selected[row][col] = true;
        if (this.checkBingo(this.player1Selected, this.player2Selected, row, col)) {
          this.bingo = 1;
          this.stopGame();
        } else {
          this.currentPlayer = 2;
        }
      }
    } else {
      if (!this.player1Selected[row][col] && !this.player2Selected[row][col]) {
        this.player2Selected[row][col] = true;
        if (this.checkBingo(this.player1Selected, this.player2Selected, row, col)) {
          this.bingo = 2;
          this.stopGame(); 
        } else {
          this.currentPlayer = 1;
        }
      }
    }
  };

  checkBingo = (
    player1Selected: boolean[][],
    player2Selected: boolean[][],
    row: number,
    col: number
  ): boolean => {
    const countSelected = (arr: boolean[]) => arr.filter((val) => val).length;

    if (countSelected(player1Selected[row]) + countSelected(player2Selected[row]) === 5) {
      return true;
    }

    const column = player1Selected.map((_, idx) => player1Selected[idx][col] || player2Selected[idx][col]);
    if (countSelected(column) === 5) {
      return true;
    }

    if (row === col) {
      const mainDiagonal = player1Selected.map((_, idx) => player1Selected[idx][idx] || player2Selected[idx][idx]);
      if (countSelected(mainDiagonal) === 5) {
        return true;
      }
    }

    if (row + col === 4) {
      const antiDiagonal = player1Selected.map((_, idx) => player1Selected[idx][4 - idx] || player2Selected[idx][4 - idx]);
      if (countSelected(antiDiagonal) === 5) {
        return true;
      }
    }

    return false;
  };

  resetGame = () => {
    this.board = generateNumbers();
    this.player1Selected = Array.from({ length: 5 }, () => Array(5).fill(false));
    this.player2Selected = Array.from({ length: 5 }, () => Array(5).fill(false));
    this.bingo = null;
    this.gameStarted = false;
    this.timer = 0;
    this.currentPlayer = 1;
    this.stopGame();
  };
}

const bingoStore = new BingoStore();
export default bingoStore;
