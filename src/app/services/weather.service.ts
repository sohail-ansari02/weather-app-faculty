import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  API_KEY = 'a40b36ff21e126edcc09f6c9692c9b46';
  API = `http://api.openweathermap.org/data/2.5/weather?appid=${this.API_KEY}`;
  http = inject(HttpClient);
  constructor() {}
  getByCity(name: string = 'pune') {
    return this.http.get(`${this.API}&q=${name}`);
  }
}
