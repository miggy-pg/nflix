import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  editIcon = 'edit_icon.svg';
  deleteIcon = 'delete_icon.svg';
  movies: any[] = [];
  isLoading: boolean = true;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
        this.isLoading = false;
      },
    });
  }

  showAlert() {
    alert('test');
  }

  getImagePath(imageName: string) {
    return 'assets/img/' + imageName;
  }
}
