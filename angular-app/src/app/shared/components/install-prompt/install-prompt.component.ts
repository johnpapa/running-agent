import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-install-prompt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './install-prompt.component.html',
  styleUrls: ['./install-prompt.component.scss']
})
export class InstallPromptComponent implements OnInit {
  deferredPrompt: any = null;
  showInstallPrompt = false;

  ngOnInit(): void {
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      this.deferredPrompt = e;
      // Check if user has dismissed prompt before
      const dismissed = localStorage.getItem('pwa-install-dismissed');
      if (!dismissed) {
        this.showInstallPrompt = true;
      }
    });

    // Check if app is already installed
    window.addEventListener('appinstalled', () => {
      this.showInstallPrompt = false;
      this.deferredPrompt = null;
    });
  }

  installPwa(): void {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('PWA installation accepted');
        }
        this.deferredPrompt = null;
        this.showInstallPrompt = false;
      });
    }
  }

  dismissPrompt(): void {
    this.showInstallPrompt = false;
    localStorage.setItem('pwa-install-dismissed', 'true');
  }
}
