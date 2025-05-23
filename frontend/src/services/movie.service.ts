import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://localhost:8000/movies/';

  constructor(private httpClient: HttpClient) {}

  // Get all movies
  getMovies(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

  // Get specific movie by ID
  getMovie(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}${id}`);
  }

  // Create new movie
  createMovie(formData: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, formData);
  }

  // Update specific movie
  updateMovie(id: number, movie: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}${id}/`, movie);
  }

  // Delete a movie by ID
  deleteMovie(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}${id}/`);
  }
}
