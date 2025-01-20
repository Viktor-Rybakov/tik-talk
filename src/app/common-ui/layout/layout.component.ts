import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProfileRestService } from '../../data/services/profile-rest.service';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    SidebarComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  private _profileService = inject(ProfileRestService);

  ngOnInit() {
    this._profileService.getMe$().subscribe({
      next: (val) => console.log(val)
    })
  }
}
