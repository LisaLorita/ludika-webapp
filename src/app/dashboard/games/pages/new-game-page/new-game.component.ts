import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../../interfaces/game.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.css'
})
export class NewGameComponent {
  constructor(private gameService: GameService) {}

  onGameSave(gameData: Game) {
    console.log('Creando juego:', gameData);
    this.gameService.createGame(gameData).subscribe({
      next: (response) => {
        console.log('Juego creado:', response);
        Swal.fire('Juego creado', '', 'success');

      },
      error: (error) => {
        console.error('Error al crear el juego:', error);

      }
    });
  }
}
