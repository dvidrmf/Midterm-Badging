import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/posts';
  private postsCache$: Observable<Post[]> | null = null;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Get all posts with caching
   * Uses shareReplay to cache the result and prevent multiple API calls
   */
  getPosts(): Observable<Post[]> {
    if (!this.postsCache$) {
      this.loadingSubject.next(true);
      this.errorSubject.next(null);

      this.postsCache$ = this.http.get<Post[]>(this.API_URL).pipe(
        tap(() => {
          this.loadingSubject.next(false);
        }),
        catchError(error => {
          this.loadingSubject.next(false);
          this.errorSubject.next('Failed to load posts. Please try again later.');
          console.error('Error fetching posts:', error);
          return of([]);
        }),
        shareReplay(1) // Cache the result
      );
    }

    return this.postsCache$;
  }

  /**
   * Clear the cache (useful for refresh functionality)
   */
  clearCache(): void {
    this.postsCache$ = null;
  }
}
