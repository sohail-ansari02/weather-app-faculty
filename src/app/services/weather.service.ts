import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, from, mergeMap, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  API_KEY = 'a40b36ff21e126edcc09f6c9692c9b46';
  API = `http://api.openweathermap.org/data/2.5/weather?appid=${this.API_KEY}`;
  http = inject(HttpClient);
  position: any = undefined;
  constructor() {}
  getWeatherByCity(name: string) {
    return this.http.get(`${this.API}&q=${name}`);
  }
  getCurrentLocationWeather() {
    let position$ = new Observable((observer) => {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        observer.next({ lat, lon });
        observer.complete();
      });
    });
    return position$.pipe(
      switchMap((pos: any) => {
        return this.http.get(`${this.API}&lat=${pos.lat}&lon=${pos.lon}`);
      })
    );
  }
}
