import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { CardComponent } from './components/card/card.component';
import { MaterialModule } from '../material/material.module';
import { GamesListComponent } from './games/pages/games-list-page/games-list.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NewGameComponent } from './games/pages/new-game-page/new-game.component';
import { GameFormComponent } from './components/game-form/game-form.component';
import { UpdateGameComponent } from './games/pages/update-game-page/update-game.component';



@NgModule({
  declarations: [
    DashboardLayoutComponent, 
    CardComponent, 
    GameFormComponent,
    GamesListComponent, 
    FavoritesComponent, 
    HomeComponent, 
    NewGameComponent, 
    UpdateGameComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule, 
    MaterialModule, 
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
