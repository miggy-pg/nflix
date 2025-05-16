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
  showMovieFormModal: boolean = false;
  isEditMode = false;
  movieFormData = {
    id: null as number | null,
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
      this.movieFormData.video_file = input.files[0];
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

  submitMovieForm(): void {
    const formData = new FormData();
    formData.append('title', this.movieFormData.title);
    formData.append('description', this.movieFormData.description);

    if (this.movieFormData.video_file)
      formData.append('video', this.movieFormData.video_file);

    if (this.isEditMode && this.movieFormData.id !== null) {
      this.movieService.updateMovie(this.movieFormData.id, formData).subscribe({
        next: () => {
          alert('Movie updated!');
          this.getMovies();
          this.showMovieFormModal = false;
        },
        error: (err) => console.error(err),
      });
    } else {
      this.movieService.createMovie(formData).subscribe({
        next: () => {
          alert('Movie created!');
          this.getMovies();
          this.showMovieFormModal = false;
        },
        error: (err) => console.error(err),
      });
    }
  }

  openCreateModal(): void {
    this.isEditMode = false;
    this.movieFormData = {
      id: null,
      title: '',
      description: '',
      video_file: null,
    };
    this.showMovieFormModal = true;
  }

  editMovie(movie: any) {
    this.isEditMode = true;
    this.movieFormData = {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      video_file: null,
    };
    this.showMovieFormModal = true;
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
