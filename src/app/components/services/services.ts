import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data';
import { Post } from '../../models/post.model';
import { TruncatePipe } from '../../pipes/truncate-pipe';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule, TruncatePipe],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class ServicesComponent implements OnInit {
  searchTerm: string = '';
  allPosts$!: Observable<Post[]>;
  filteredPosts$!: Observable<Post[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.allPosts$ = this.dataService.getPosts();
    this.filteredPosts$ = this.allPosts$;
    this.loading$ = this.dataService.loading$;
    this.error$ = this.dataService.error$;
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredPosts$ = this.allPosts$;
    } else {
      this.filteredPosts$ = this.allPosts$.pipe(
        map(posts => posts.filter(post =>
          post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          post.body.toLowerCase().includes(this.searchTerm.toLowerCase())
        ))
      );
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredPosts$ = this.allPosts$;
  }

  refresh(): void {
    this.dataService.clearCache();
    this.ngOnInit();
  }
}
