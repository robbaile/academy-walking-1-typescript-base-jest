export enum Move {
  topLeft = 0,
  topMiddle,
  topRight,
  middleLeft,
  middleMiddle,
  middleRight,
  bottomLeft,
  bottomMiddle,
  bottomRight,
}

export enum Outcome {
  invalid,
  valid,
  winX,
  winO,
}

export enum Player {
  X,
  O
}

type Combination = [Move,Move,Move];

const horizontalWins: Combination[] = [
  [Move.topLeft, Move.topMiddle, Move.topRight],
  [Move.middleLeft, Move.middleMiddle, Move.middleRight],
  [Move.bottomLeft, Move.bottomMiddle, Move.bottomRight],
]

const verticalWins: Combination[] = [
  [Move.topLeft, Move.middleLeft, Move.bottomLeft],
  [Move.topMiddle, Move.middleMiddle, Move.bottomMiddle],
  [Move.topRight, Move.middleRight, Move.bottomLeft],
]
const diagonalWins: Combination[] = [
  [Move.topLeft, Move.middleMiddle, Move.bottomRight],
  [Move.topRight, Move.middleMiddle, Move.bottomLeft],
]

const allWins: Combination[] = [...horizontalWins, ...verticalWins, ...diagonalWins];

export class Board {
  private board: Player[]|null[] = [null, null, null ,null, null, null, null ,null, null];

  addMove(move: Move, player: Player) {
    this.board[move] = player;
  }

  isMoveValid(move: Move): boolean {
    return this.board[move] === null;
  }

  containsCombination(combination: Combination) {
    const position1 = this.board[combination[0]]
    const position2 = this.board[combination[1]]
    const position3 = this.board[combination[2]]
    return((position1 === position2) && (position2 === position3));
  }
}

export class Game {
  private board: Board = new Board();
  private currentPlayer = Player.X;

  play(move: Move) {
    if (!this.board.isMoveValid(move)) return Outcome.invalid;
    this.board.addMove(move, this.currentPlayer);
    if (this.isGameWon()) return this.getWinningPlayerOutcome();
    this.swapPlayer();
    return Outcome.valid;
  }

  private getWinningPlayerOutcome() {
    return this.currentPlayer === Player.X ? Outcome.winX : Outcome.winO;
  }

  private swapPlayer() {
    this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X;
  }

  private isGameWon() {
    return allWins.some(this.board.containsCombination.bind(this));
  }
}
