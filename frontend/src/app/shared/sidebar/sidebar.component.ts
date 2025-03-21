import { CommonModule } from '@angular/common';
import { Component, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isSidebarOpen = false;

  constructor(private elementRef: ElementRef) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
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
        this.isSidebarOpen = false;
      }
    }
  }
}
