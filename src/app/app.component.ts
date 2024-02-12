import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './services/weather.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  ws = inject(WeatherService);
  cityName = '';
  weather: any;
  ngOnInit(): void {
    this.ws.getCurrentLocationWeather().subscribe({
      next: (res) => this.weather = res,
      error: () => this.weather = undefined
    })
  }
  searchByCity(name: string) {
    this.ws.getWeatherByCity(name).subscribe({
      next: (res) => {
        this.weather = res;
        // console.log(this.weather);
      },
      error: () => (this.weather = undefined),
    });
  }
}
