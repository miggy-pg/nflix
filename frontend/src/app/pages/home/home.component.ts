import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MovieService } from '../../../services/movie.service';
import { ToastData, ToastService } from '../../../services/toast.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { ToastComponent } from '../../../shared/toast/toast.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, SpinnerComponent, ToastComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  toastVisible: boolean = false;
  errorMessage: string = '';
  toastMessage: string = '';
  toastType: 'success' | 'error' | 'info' = 'success';
  selectedMovie: any = null;
  isSelectedMovieLoading: boolean = true;
  movies: any[] = [];
  isLoading: boolean = true;
  isPlaying: boolean = false;
  showInfo = true;
  showIcon = true;
  hasInteracted = false;
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

  // ----- Main -----

  getMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
        // this.isLoading = false;
      },
    });
  }

  showToast(toastData: ToastData) {
    this.toastService.initiate({
      title: toastData.title,
      content: toastData.content,
      type: toastData.type,
      show: true,
    });
  }

  // ----- Video Player Configs -----

  // Get specific movie data
  onSelectMovie(id: number): void {
    this.isSelectedMovieLoading = true;
    this.selectedMovie = null;

    this.movieService.getMovie(id).subscribe({
      next: (movie) => {
        // delay until modal is visible to ensure DOM mounts cleanly
        setTimeout(() => {
          this.selectedMovie = movie;
          this.showInfo = true;
          this.showIcon = false;
          this.showMovieDetailModal = true;

          document.body.style.overflow = 'hidden';
        }, 0);
      },
      error: (err) => {
        console.error('Error fetching movie:', err);
        this.showToast({
          title: 'Error',
          content: `Failed to get selected movie data.`,
          type: 'error',
        });
        this.isSelectedMovieLoading = false;
      },
    });
  }

  hideVideoPlayerIcon() {
    // Hide Play/Pause Video Player Icon
    this.showIcon = true;
    setTimeout(() => {
      this.showIcon = false;
    }, 800);
  }

  onPlay(video: HTMLVideoElement) {
    if (video.paused && !this.isPlaying) {
      this.isPlaying = true;
      video.play();
    }
    this.showInfo = false;
    this.hasInteracted = true;

    this.hideVideoPlayerIcon();
  }

  onPause() {
    this.isPlaying = false;
    this.showInfo = true;

    this.hideVideoPlayerIcon();
  }

  onCloseMovieModal(): void {
    this.showMovieDetailModal = false;
    this.selectedMovie = null;
    this.isPlaying = false;
    document.body.style.overflow = '';
  }

  seekToSecond(video: HTMLVideoElement, seconds: number) {
    video.currentTime = seconds;
  }

  // ----- CRUD Operations  -----

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.movieFormData.video_file = input.files[0];
    }
  }

  submitMovieForm(): void {
    const formData = new FormData();
    formData.append('title', this.movieFormData.title);
    formData.append('description', this.movieFormData.description);

    if (this.movieFormData.video_file)
      formData.append('video_file', this.movieFormData.video_file);

    if (this.isEditMode && this.movieFormData.id !== null) {
      this.movieService.updateMovie(this.movieFormData.id, formData).subscribe({
        next: () => {
          this.showToast({
            title: 'Movie Updated',
            content: `"${this.movieFormData.title}" was successfully updated.`,
            type: 'success',
          });
          this.getMovies();
          this.showMovieFormModal = false;
        },
        error: (err) => {
          console.error(err);
          this.showToast({
            title: 'Error',
            content: 'Failed to update movie.',
            type: 'error',
          });
        },
      });
    } else {
      console.log('movieFormData: ', this.movieFormData);
      this.movieService.createMovie(formData).subscribe({
        next: () => {
          this.showToast({
            title: 'Movie Added',
            content: `"${this.movieFormData.title}" has been successfully added.`,
            type: 'success',
          });
          this.getMovies();
          this.showMovieFormModal = false;
        },
        error: (err) => {
          console.error(err);
          this.showToast({
            title: 'Error',
            content: 'Failed to create movie.',
            type: 'error',
          });
        },
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

  deleteMovie(id: number, title: string) {
    return this.movieService.deleteMovie(id).subscribe({
      next: () => {
        this.showToast({
          title: 'Movie Deleted',
          content: `"${title}" has been removed.`,
          type: 'success',
        });
        this.getMovies();
      },
    });
  }
}
