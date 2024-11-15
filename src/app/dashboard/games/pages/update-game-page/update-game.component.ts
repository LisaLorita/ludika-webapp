import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Game } from '../../../interfaces/game.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-game',
  templateUrl: './update-game.component.html',
  styles: [],
})
export class UpdateGameComponent implements OnInit {
  gameForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private fb: FormBuilder, 
    private router: Router

  ) {
    this.gameForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      genre: ['', Validators.required],
      players: [0, [Validators.required, Validators.min(1)]],
      age: [0, [Validators.required, Validators.min(1)]],
      year: ['', Validators.required],
      isDiscontinued: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.loadGame(gameId);
    }
  }

  loadGame(id: string) {
      this.gameService.getGameById(id).subscribe({
      next: (data: Game) => {
        if(data.year) {
          data.year = this.formatDateToInput(data.year); // Formatea la fecha del juego
        }
        this.gameForm.patchValue(data); // Carga los datos del juego en el formulario según el ID
      },
      error: (error) => {
        console.error('Error loading game:', error);
      }
    });
  }

  onUpdateGame(updatedGame: Game) {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.gameService.updateGame(gameId, updatedGame).subscribe({
        next: () => {
          console.log('Juego actualizado con éxito');
          this.router.navigate(['/dashboard/games']); // Redirigir a la lista de juegos
          Swal.fire('Juego actualizado', 'El juego ha sido actualizado con exito', 'success');
        },
        error: (error) => {
          console.error('Error al actualizar el juego:', error);
        }
      });
    }
  }
  

  formatDateToInput(value: string): string {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`; // Devuelve la fecha en formato yyyy-MM-dd
  }
  
}