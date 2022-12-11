import { useState } from "react";
import Game from "./Game";

const TicTacToe = () => {
  const [game, setGame] = useState<Game>({
    player: "X",
    cells: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    winner: null,
  });
  const handleClick = (row: number, col: number) => {
    if (game.cells[row][col] !== "" || game.winner !== null) {
      return;
    }

    const cells = game.cells.map((rowCells, r) =>
      rowCells.map((cell, c) => (row === r && col === c ? game.player : cell))
    );
    const winner = getWinner(cells);

    setGame({
      player: game.player === "X" ? "O" : "X",
      cells,
      winner,
    });
    if (game.winner !== null) {
      return;
    }
  };
  const getWinner = (cells: string[][]): "X" | "O" | null => {
    // Check if any of the rows have the same value and are not empty
    for (const row of cells) {
      if (row[0] !== "" && row[0] === row[1] && row[1] === row[2]) {
        return row[0] as "X" | "O";
      }
    }

    // Check if any of the columns have the same value and are not empty
    for (let col = 0; col < 3; col++) {
      if (
        cells[0][col] !== "" &&
        cells[0][col] === cells[1][col] &&
        cells[1][col] === cells[2][col]
      ) {
        return cells[0][col] as "X" | "O";
      }
    }

    // Check if the diagonal from top-left to bottom-right has the same value and is not empty
    if (
      cells[0][0] !== "" &&
      cells[0][0] === cells[1][1] &&
      cells[1][1] === cells[2][2]
    ) {
      return cells[0][0] as "X" | "O";
    }

    if (
      cells[0][2] !== "" &&
      cells[0][2] === cells[1][1] &&
      cells[1][1] === cells[2][0]
    ) {
      return cells[0][2] as "X" | "O";
    }
    return null;
  };
  const restart = () => {
    setGame({
      player: "X",
      cells: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      winner: null,
    });
  };
  return (
    <div className="tic-tac-toe">
      {game.cells.map((rowCells, row) => (
        <div className="grid" key={row}>
          {rowCells.map((cell, col) => (
            <button
              value={col}
              style={{
                color: cell === "X" ? "blue" : cell === "O" ? "red" : undefined,
              }}
              key={col}
              onClick={() => handleClick(row, col)}
            >
              {cell}
            </button>
          ))}
        </div>
      ))}
      {game.winner !== null && (
        <div className="winner">Player {game.winner} has won the game!</div>
      )}
      <button className="restart" onClick={restart}>
        Restart
      </button>
    </div>
  );
};

export default TicTacToe;
