export interface Players {
  player1: Player;
  player2: Player;
}

export interface Player {
  name: string;
  score: number;
  color: string;
  symbol: string;
  isPlaying: boolean;
  winner: boolean;
}
