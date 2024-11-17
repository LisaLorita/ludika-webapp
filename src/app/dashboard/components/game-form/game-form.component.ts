import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Game } from '../../interfaces/game.interface';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.css'
})
export class GameFormComponent {
  private fb = inject(FormBuilder);
  @Output() save = new EventEmitter<Game>(); 
  @Output() delete = new EventEmitter<string>();
  @Input() gameForm!: FormGroup;
  @Input() gameId: string | null = null;

constructor() {
  this.gameForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    genre: ['', Validators.required],
    players: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    age: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    year: ['', Validators.required],
    isDiscontinued: ['', Validators.required]
  });
}
 
  onSubmit() {
    if (this.gameForm.valid) {
      const gameData: Partial<Game> = {
        ...this.gameForm.value,
        isDiscontinued: Boolean(this.gameForm.value.isDiscontinued),
        players: Number(this.gameForm.value.players),
        age: Number(this.gameForm.value.age),
        year: new Date(this.gameForm.value.year).toISOString(), // Fecha en formato ISO
      };
        
      console.log('Datos del juego a guardar:', gameData);
      this.save.emit(gameData as Game); // Emitir el objeto Game
      this.gameForm.reset(); 
    }
  }

  onDelete():void{
    console.log('Pulsado para eliminar juego');
    if (this.gameId) {
      console.log('Eliminando juego con id:', this.gameId);
      this.delete.emit(this.gameId);
    } else {
      console.log('No se pudo obtener el ID del juego');
    }
  }
}