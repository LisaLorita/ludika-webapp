import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: "root",
})
export class IsAdminGuard {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
        if (this.authService.isAdmin()){
            return true;
        }
        this.router.navigate(["/dashboard/home"]);
        return false;
    }
}