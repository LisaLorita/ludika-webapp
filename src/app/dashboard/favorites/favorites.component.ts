import { Component, OnInit } from '@angular/core';
import { Game } from '../interfaces/game.interface';
import { FavoriteService } from './services/favorites/favorite.service';
import { Favorite } from '../interfaces/favorites.interface';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  public favorites: Game[] = [];
  public favoriteGameIds: string[] = [];  // IDs de juegos favoritos del usr
  public favoritesMap: { [gameId: string]: string } = {};  // Mapa de gameId a favoriteId

  constructor(private favoriteService: FavoriteService) {}

  //Muestra los juegos favoritos del usuario
  ngOnInit(): void {
    this.favoriteService.getUserFavoritesRaw().subscribe((favorites: Favorite[]) => {
      this.favorites = favorites.map(fav => fav.game);
      favorites.forEach(fav => {
        this.favoriteGameIds.push(fav.game.id);
        this.favoritesMap[fav.game.id] = fav.id;
    });
      console.log('Favorites component', this.favorites);
    });
  }

  //Metodo para quitar juego de favoritos
  onToggleFavorite(game: Game): void {
    const favoriteId = this.favoritesMap[game.id];  // Obtiene el id del favorito

    if (favoriteId) {
      this.favoriteService.removeFavorite(favoriteId).subscribe(() => {
        this.favoriteGameIds = this.favoriteGameIds.filter((id) => id !== game.id);
        delete this.favoritesMap[game.id];
        this.favorites = this.favorites.filter(fav => fav.id !== game.id);  // Actualiza la lista de favoritos en la UI
      });
    }
  }

}
