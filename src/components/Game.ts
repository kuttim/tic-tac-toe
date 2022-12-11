export default interface Game {
  player: "X" | "O";
  cells: string[][];
  winner: "X" | "O" | null;
}
