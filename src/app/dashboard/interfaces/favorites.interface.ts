import { Game } from "./game.interface";

export interface Favorite {
    id: string;
    userId: string;
    gameId: string;
    game: Game;
}