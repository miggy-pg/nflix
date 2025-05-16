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
  selectedMovie: any = null;
  showModal: boolean = false;
  movies: any[] = [];
  isLoading: boolean = true;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getImagePath(imageName: string) {
    return 'assets/img/' + imageName;
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

  onSelectMovie(id: number): void {
    this.movieService.getMovie(id).subscribe({
      next: (movie) => {
        this.selectedMovie = movie;
      },
      error: (err) => {
        console.error('Error fetching movie:', err);
        // this.isLoading = false;
      },
    });
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  editMovie(id: number) {
    console.log('deleted movie: ', id);
  }

  deleteMovie(id: number) {
    console.log('deleted: ', id);
    // TODO: Add toast for confirmation
    return this.movieService.deleteMovie(id).subscribe();
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedMovie = null;
    document.body.style.overflow = '';
  }
}
