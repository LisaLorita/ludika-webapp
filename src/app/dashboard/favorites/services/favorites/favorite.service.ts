import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Favorite } from '../../../interfaces/favorites.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environments';
import { Game } from '../../../interfaces/game.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}
  
  getUserFavoritesRaw():Observable<Favorite[]> {
        
    const userId = localStorage.getItem('userId');
    
    console.log('Favorites game service', userId);

    return this.http.get<Favorite[]>(`${this.baseUrl}/api/favorites/${userId}`)
  }

  getUserFavorites():Observable<Game[]> {
        
    const userId = localStorage.getItem('userId');
    
    console.log('Favorites game service', userId);

    return this.http.get<Favorite[]>(`${this.baseUrl}/api/favorites/${userId}`)
    .pipe(
      //map recibe el array de Favoritos[]
      map(favorites => 
        //transforma el array de Favoritos[] en un array de Game[] extrayendo el objeto game de cada favorito  
        favorites.map(favorite => favorite.game))
    );
  }

  //Metodo para añadir un juego a favoritos
  addFavorite(gameId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/favorites`, { gameId })
  }

  removeFavorite(favoriteId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/favorites/${favoriteId}`);
  }

  isFavorite(gameId: string): Observable<boolean> {
  return this.http.get<boolean>(`${this.baseUrl}/api/favorites/${gameId}`);
  }
}
