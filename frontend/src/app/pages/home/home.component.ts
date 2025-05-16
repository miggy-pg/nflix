import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MovieService } from '../../../services/movie.service';
import { ToastService } from '../../../services/toast.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  toastVisible = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'info' = 'success';
  selectedMovie: any = null;
  movies: any[] = [];
  isLoading: boolean = true;
  showMovieDetailModal: boolean = false;
  showMovieFormModal: boolean = false;
  isEditMode = false;
  movieFormData = {
    id: null as number | null,
    title: '',
    description: '',
    video_file: null as File | null,
  };

  constructor(
    private movieService: MovieService,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  showToast() {
    this.toastService.add('This is a toast message.');
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
    this.showMovieDetailModal = false;
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
    this.showMovieDetailModal = true;
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

  createMovie(): void {
    this.isEditMode = false;
    this.movieFormData = {
      id: null,
      title: '',
      description: '',
      video_file: null,
    };
    this.showMovieFormModal = true;
  }

  editMovie(movie: any): void {
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
    return this.movieService.deleteMovie(id).subscribe({
      next: () => {
        this.showToast();
        this.getMovies();
      },
    });
  }
}
