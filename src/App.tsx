import { useRef, useState, useEffect } from "react";
import "./App.css";
import { Players } from "./interfaces";
import {
  defineWinnerOnMatrix,
  findIndexFromMatrix,
  printSymbolOnMatrix,
  resetMatrix,
  resetSymbols,
} from "./utils";

const app = document.getElementById("root") as HTMLElement;
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function App() {
  const button = useRef<HTMLButtonElement>(null);
  const div = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [finish, setFinish] = useState(false);
  const [arrayElements, setArrayElements] = useState<Element[]>([]);
  const [winner, setWinner] = useState(false);
  const [draw, setDraw] = useState({
    isDraw: false,
    filled: 0,
  });
  const [players, setPlayers] = useState<Players>({
    player1: {
      name: "Player 1",
      score: 0,
      color: "red",
      symbol: "X",
      isPlaying: true,
      winner: false,
    },
    player2: {
      name: "Player 2",
      score: 0,
      color: "blue",
      symbol: "O",
      isPlaying: false,
      winner: false,
    },
  });

  const [matchMatrix, setMatchMatrix] = useState<number[][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  useEffect(() => {
    const array = Array.from(container.current?.children ?? []);
    setArrayElements(array);
  }, []);

  useEffect(() => {
    matchMatrix.map((row) => {
      row.map((item) => {
        if (item > 0) {
          setDraw({
            ...draw,
            filled: draw.filled + 1,
          });
        }
      });
    });
  }, [matchMatrix]);

  useEffect(() => {
    if (draw.filled === 9 && !winner) {
      setDraw({
        ...draw,
        isDraw: true,
      });
    }
  }, [draw.filled]);

  useEffect(() => {
    if (winner) {
      setFinish(true);
    }

    if (draw.isDraw) {
      setFinish(true);
    }
  }, [winner, draw.isDraw]);

  const handleClick = (id: string) => {
    const index: number[] = [];
    findIndexFromMatrix(id, matrix, index);

    if (index[0] === -1 || index[1] === -1) {
      return;
    }

    if (matchMatrix[index[0]][index[1]] > 0) {
      return;
    }

    const player = players.player1.isPlaying ? 1 : 2;

    const newMatchMatrix = [...matchMatrix];
    newMatchMatrix[index[0]][index[1]] = player;
    setMatchMatrix(newMatchMatrix);

    printSymbolOnMatrix(id, arrayElements, players);

    const haveWinner = defineWinnerOnMatrix(matchMatrix, player);

    if (haveWinner.winner) {
      if (haveWinner.player === 1) {
        setPlayers({
          ...players,
          player1: {
            ...players.player1,
            winner: true,
          },
          player2: {
            ...players.player2,
            winner: false,
          },
        });
      }

      if (haveWinner.player === 2) {
        setPlayers({
          ...players,
          player1: {
            ...players.player1,
            winner: false,
          },
          player2: {
            ...players.player2,
            winner: true,
          },
        });
      }

      return setWinner(haveWinner.winner);
    }

    setPlayers({
      ...players,
      player1: {
        ...players.player1,
        isPlaying: !players.player1.isPlaying,
      },
      player2: {
        ...players.player2,
        isPlaying: !players.player2.isPlaying,
      },
    });
  };

  const handleReset = () => {
    setDraw({
      ...draw,
      isDraw: false,
      filled: 0,
    });

    setFinish(false);

    if (finish) {
      setMatchMatrix(resetMatrix(matchMatrix));
      setWinner(false);
      setPlayers({
        player1: {
          ...players.player1,
          winner: false,
        },
        player2: {
          ...players.player2,
          winner: false,
        },
      });

      resetSymbols(arrayElements);
      return;
    }
  };

  return (
    <section className='section'>
      <div>
        <nav>
          <div className='nav-wrapper'>
            <a href='#' className='brand-logo'>
              Tic Tac Toe
            </a>

            <ul id='nav-mobile' className='right'>
              <li>
                <button disabled={!finish} onClick={handleReset}>
                  Play
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className='App' ref={container}>
        {matrix.map((row, i) => {
          return (
            <div key={i} className='row'>
              {row.map((col, j) => {
                return (
                  <div
                    key={j}
                    ref={div}
                    className='container'
                    id={`${col}`}
                    onClick={(e) => handleClick(e.currentTarget.id)}>
                    <button ref={button} className='element' disabled={finish}>
                      <span></span>
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
        {winner && (
          <>
            <div className='winner' id='winner'>
              <h1>{players.player1.winner ? players.player1.name : players.player2.name}</h1>
              {players.player1.winner && <h1>Won</h1>}
              {players.player2.winner && <h1>Won</h1>}
            </div>
          </>
        )}

        {draw.isDraw && (
          <div className='draw' id='draw'>
            <h1>Draw</h1>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
