import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { GamesListComponent} from './games/pages/games-list-page/games-list.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { isAuthenticatedGuard } from '../auth/guards';
import { HomeComponent } from './home/home.component';
import { NewGameComponent } from './games/pages/new-game-page/new-game.component';
import { IsAdminGuard } from '../auth/guards/is-admin.guard';
import { UpdateGameComponent } from './games/pages/update-game-page/update-game.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivateChild: [isAuthenticatedGuard],
    children: [
      {path: 'home', component: HomeComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'favorites', component: FavoritesComponent},
      {path: 'games', component: GamesListComponent},
      {path: 'games/newGame', component: NewGameComponent, canActivate: [IsAdminGuard]},
      {path: 'games/updateGame/:id', component: UpdateGameComponent, canActivate: [IsAdminGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
