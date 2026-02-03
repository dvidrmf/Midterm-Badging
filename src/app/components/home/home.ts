import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data';
import { Post } from '../../models/post.model';
import { TruncatePipe } from '../../pipes/truncate-pipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  posts$!: Observable<Post[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.posts$ = this.dataService.getPosts();
    this.loading$ = this.dataService.loading$;
    this.error$ = this.dataService.error$;
  }

  refresh(): void {
    this.dataService.clearCache();
    this.ngOnInit();
  }
}
