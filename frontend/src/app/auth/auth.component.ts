import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  public showCreateAccount: boolean = true;
  public showIntro: boolean = true;
  private routerSubscription!: Subscription;

  public router: Router = inject(Router);

  public ngOnInit(): void {
    this.checkIfUrlIncludesLogin();
    this.subscribeToRouterEvents();
  }

  public ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private checkIfUrlIncludesLogin(): void {
    if (!this.router.url.includes('login')) {
      this.showCreateAccount = false;
    }
  }

  private subscribeToRouterEvents(): void {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('login')) {
          this.showCreateAccount = true;
          this.showIntro = false;
        } else {
          this.showCreateAccount = false;
        }
      }
    });
  }
}
