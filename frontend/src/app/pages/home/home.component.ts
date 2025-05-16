import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  selectedMovie: any = null;
  movies: any[] = [];
  isLoading: boolean = true;
  showModal: boolean = false;
  showCreateModal: boolean = false;
  showEditModaL: boolean = false;
  newMovie = {
    title: '',
    description: '',
    video_file: null as File | null,
  };

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getImagePath(imageName: string): string {
    return 'assets/img/' + imageName;
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.newMovie.video_file = input.files[0];
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedMovie = null;
    document.body.style.overflow = '';
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

  createMovie(): void {
    if (
      !this.newMovie.title ||
      !this.newMovie.description ||
      !this.newMovie.video_file
    ) {
      alert('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.newMovie.title);
    formData.append('description', this.newMovie.description);
    formData.append('video_file', this.newMovie.video_file);

    this.movieService.createMovie(formData).subscribe({
      next: () => {
        alert('Movie added!');
        this.getMovies();
        this.showCreateModal = false;

        // Reset form
        this.newMovie = {
          title: '',
          description: '',
          video_file: null,
        };
      },
      error: (err) => {
        console.error('Error creating movie:', err);
      },
    });
  }

  editMovie(id: number) {
    console.log('edited movie: ', id);
  }

  deleteMovie(id: number) {
    console.log('deleted: ', id);
    // TODO: Add toast for confirmation
    return this.movieService.deleteMovie(id).subscribe({
      next: () => {
        this.getMovies();
      },
    });
  }
}
