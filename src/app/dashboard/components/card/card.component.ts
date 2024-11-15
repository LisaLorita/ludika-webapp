import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from '../../interfaces/game.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'games-game-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{

  @Input() 
  public game!: Game;

  @Input()
  public isFavorite: boolean = false;

  @Output()
  toggleFavorite = new EventEmitter<void>();

  @Output() 
  addToFavorites = new EventEmitter<string>();

public isAdmin: boolean = false;

constructor(
  private router: Router,
  private authService: AuthService,
) {}

  ngOnInit(): void { 
    this.isAdmin = this.authService.isAdmin();
    console.log('Is admin', this.isAdmin);
    if (!this.game) {
      throw Error('Game property is required');
    }
  }
  onEditGame() {
    console.log('Edit game', this.game.id);
    this.router.navigate([`/dashboard/games/updateGame/${this.game.id}`]);
  }
 
  onToggleFavorite(): void{
    this.toggleFavorite.emit();
  }

}
