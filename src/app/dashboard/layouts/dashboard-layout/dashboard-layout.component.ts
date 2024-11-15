import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: []
})
export class DashboardLayoutComponent {

  isAdmin: boolean = false;

  // Inyectamos el servicio AuthService
  private authService = inject(AuthService);
  public user = computed(() => this.authService.currentUser());
   get userName(): string {
    const currentUser: User | null = this.user(); 
    return currentUser ? currentUser.name : 'Invitado';
 }

 ngOnInit(): void {
  this.isAdmin = this.authService.isAdmin();
 }


 onLogout(){
  this.authService.logout();
 }
}
