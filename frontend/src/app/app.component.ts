import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CampaingListComponent } from './components/campaing-list/campaing-list.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    SidebarComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Sinapsis';
  isSidebarOpen = true;
  @Output() sidebarToggled = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarToggled.emit(this.isSidebarOpen);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      const burgerButton = document.querySelector(
        '[data-drawer-toggle="logo-sidebar"]'
      );
      if (
        burgerButton &&
        !burgerButton.contains(event.target as Node) &&
        this.isSidebarOpen
      ) {
        this.toggleSidebar();
      }
    }
  }
}
