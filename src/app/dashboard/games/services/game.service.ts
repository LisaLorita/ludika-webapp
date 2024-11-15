import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../../interfaces/game.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getGames():Observable<Game[]> {

    console.log('Games service');

    return this.http.get<Game[]>(`${this.baseUrl}/api/games`);
  }
  
  getGameByName(name: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}/api/games/search?name=${name}`);
  }
  getGameById(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}/api/games/${id}`);
  }
  createGame(gameData:Game): Observable<Game> {
    return this.http.post<Game>(`${this.baseUrl}/api/games`, gameData);
  }

  updateGame(id: string, gameData: Partial<Game>): Observable<Game> {
    return this.http.patch<Game>(`${this.baseUrl}/api/games/${id}`, gameData);
  }
}