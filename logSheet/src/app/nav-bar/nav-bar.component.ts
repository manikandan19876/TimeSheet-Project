import { Component, OnInit } from '@angular/core'
import { MenuItem } from 'primeng-lts/api'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor() {}

  items: MenuItem[] = []
  activeItem!: MenuItem

  ngOnInit(): void {
    this.items = [
      { label: 'Time Sheet', routerLink: 'home' },
      { label: 'Time Sheet Series', routerLink: '/time-series' },
    ]
    this.activeItem = this.items[0]
  }
}
