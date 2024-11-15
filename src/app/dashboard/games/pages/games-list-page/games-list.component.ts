import { Component, OnInit } from '@angular/core';
import { Game } from '../../../interfaces/game.interface';
import { GameService } from '../../services/game.service';
import { FavoriteService } from '../../../favorites/services/favorites/favorite.service';
import { Favorite } from '../../../interfaces/favorites.interface';
import { AuthService } from '../../../../auth/services/auth.service';


@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.css',
})
export class GamesListComponent implements OnInit {
  public games: Game[] = [];
  public favoriteGameIds: string[] = [];
  public favorites: {[gameId:string]:string}= {};
  public searchTerm: string = '';
  
  public isAdmin: boolean = false;

  constructor(
    private gameService: GameService,
    private favoriteService: FavoriteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //verifica si el usuario es admin
    this.isAdmin = this.authService.isAdmin();
    console.log('Is admin', this.isAdmin);

    //carga la lista de juegos al iniciar el componente
    this.gameService.getGames().subscribe((games) => (this.games = games));
    console.log('Games component', this.games);

    //carga los juegos favoritos del usuario por id
    this.favoriteService.getUserFavoritesRaw().subscribe((favorites: Favorite[]) => {
      favorites.forEach(favorite => {
        this.favoriteGameIds.push(favorite.gameId);
        this.favorites[favorite.gameId] = favorite.id;
      });
    });
  }
//Verificar si un juego es favorito
  isFavorite(gameId: string): boolean {
    return this.favoriteGameIds.includes(gameId);
  }

  //Metodo para añadir o quitar un juego de favoritos
  onToggleFavorite(game: Game): void {
    const favoriteId = this.favorites[game.id]; //Obtiene el id del favorito);

    if(favoriteId) {
        this.favoriteService.removeFavorite(favoriteId).subscribe(() => {
          this.favoriteGameIds = this.favoriteGameIds.filter(id => id !== game.id);
          delete this.favorites[game.id];
        });
    } else {
      this.favoriteService.addFavorite(game.id).subscribe((newFavorite) => {
        this.favoriteGameIds.push(game.id);
        this.favorites[game.id] = newFavorite.id;
      });
    }
  }
    getAllGames(): void {
      this.gameService.getGames().subscribe((games) => (this.games = games));
    }
    searchGame(): void {
      console.log('Buscando juego', this.searchTerm);
      if (this.searchTerm.trim() === '') {
        this.getAllGames();
      }
  
      this.gameService.getGameByName(this.searchTerm).subscribe({
        next: (games) => {
          this.games = games;
          console.log('Resultado busqueda', games);
        },
        error: (error) => {
          console.error('Error al buscar el juego', error);
        },
      });
    }
}
