import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
      <header>
        <h1>Goal Card Animations</h1>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
      <footer>
        <p>© 2023 Goal Card Animations</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    header {
      background-color: #f5f5f5;
      padding: 1rem;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    main {
      flex: 1;
      padding: 1rem;
    }
    
    footer {
      background-color: #f5f5f5;
      padding: 1rem;
      text-align: center;
      margin-top: auto;
    }
  `]
})
export class AppComponent {
  title = 'goal-card-animations';
}
