import { Component } from '@angular/core';
import { AppbarComponent } from '../../components/appbar/appbar.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [AppbarComponent, RouterOutlet, FooterComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  hideFooter: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute) {
    // Router is used to listen to route changes; ActivatedRoute is used when we want dynamic parameters
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideFooter = event.url.includes('forgot-password');
      }
    });
  }
}
