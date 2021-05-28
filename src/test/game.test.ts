import { Game, Move, Outcome } from "../main/game";

describe("[Game]", () => {
  describe("when player moves to position", () => {
    it("should add move to board and return successful move", () => {
      let game: Game = new Game();
      const actual = game.play(Move.topLeft);
      expect(actual).toBe(Outcome.valid);
    });

    describe("and player moves to a position that's already been played", () => {
      it("should not add move to the board and return invalid move", () => {
        let game: Game = new Game();
        game.play(Move.topLeft);
        game.play(Move.topMiddle);
        const actual = game.play(Move.topMiddle);
        expect(actual).toBe(Outcome.invalid);
      });
    });

    describe("when a player plays 3 moves aligned", () => {
      it("should win if the 3 moves are in a row", () => {
        let game: Game = new Game();
        game.play(Move.topLeft);
        game.play(Move.middleLeft);
        game.play(Move.topMiddle);
        game.play(Move.middleMiddle);
        const actual = game.play(Move.topRight);
        expect(actual).toBe(Outcome.winX);
      });

      it("should win if the 3 moves are in a coloumn", () => {
        let game: Game = new Game();
      });

      it("should win if the 3 moves are in a diagonal", () => {
        let game: Game = new Game();
      });
    });
  });
});
