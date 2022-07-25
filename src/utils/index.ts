/**
 * Find the index of an element in a matrix
 * @param id The id of the element to find
 * @param matrix The matrix to search in
 * @param index Pass an array to have the coords of the element in the matrix
 */

import { Player, Players } from "../interfaces";

export const findIndexFromMatrix = (
  id: string,
  matrix: number[][],
  index: number[]
): number[] | undefined => {
  return matrix.find((row) => {
    return row.find((item) => {
      if (item === Number(id)) {
        index[0] = matrix.indexOf(row);
        index[1] = row.indexOf(item);
        return true;
      }
      return null;
    });
  });
};

/**
 * Print the symbol on the board
 * @param id The id of the element to find
 * @param array nodes where to search in
 * @param players players who are playing and their symbols
 */

export const printSymbolOnMatrix = (id: string, array: Element[], players: Players) => {
  return array.map((item) => {
    const childArray = Array.from(item.children ?? []);
    childArray.map((child) => {
      if (child.id === id) {
        const button = child.children[0] as HTMLButtonElement;
        const span = button.children[0] as HTMLSpanElement;
        if (players.player1.isPlaying) {
          span.innerText = players.player1.symbol;
          span.style.color = players.player1.color;
          return;
        }
        span.innerText = players.player2.symbol;
        span.style.color = players.player2.color;
      }
      return child;
    });
  });
};

export const defineWinnerOnMatrix = (matrix: number[][], player: number) => {
  let winner = false;
  const caseOfWin = [[0, 1, 2]];

  caseOfWin.forEach((caseOf) => {
    const [a, b, c] = caseOf;

    //Horizontal
    if (matrix[a][a] === player && matrix[a][b] === player && matrix[a][c] === player) {
      winner = true;
    }
    if (matrix[b][a] === player && matrix[b][b] === player && matrix[b][c] === player) {
      winner = true;
    }
    if (matrix[c][a] === player && matrix[c][b] === player && matrix[c][c] === player) {
      winner = true;
    }

    //Vertical
    if (matrix[a][a] === player && matrix[b][a] === player && matrix[c][a] === player) {
      winner = true;
    }

    if (matrix[a][b] === player && matrix[b][b] === player && matrix[c][b] === player) {
      winner = true;
    }

    if (matrix[a][c] === player && matrix[b][c] === player && matrix[c][c] === player) {
      winner = true;
    }

    //Diagonal
    if (matrix[a][a] === player && matrix[b][b] === player && matrix[c][c] === player) {
      winner = true;
    }

    if (matrix[a][c] === player && matrix[b][b] === player && matrix[c][a] === player) {
      winner = true;
    }
  });

  return { winner, player };
};

export const resetMatrix = (matrix: number[][]) => {
  return matrix.map((row) => {
    return row.map((item) => {
      return 0;
    });
  });
};

export const resetSymbols = (array: Element[]) => {
  return array.map((item) => {
    const childArray = Array.from(item.children ?? []);
    childArray.map((child) => {
      const button = child.children[0] as HTMLButtonElement;
      const span = button.children[0] as HTMLSpanElement;
      span.innerText = "";
      return child;
    });
  });
};
