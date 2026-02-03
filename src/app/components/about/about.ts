import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  name: string;
  role: string;
  image?: string;
  bio?: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {
  teamMembers: TeamMember[] = [
    {
      name: 'John Doe',
      role: 'Director',
      bio: 'Leading our community initiatives with over 10 years of experience in community development.'
    },
    {
      name: 'Jane Smith',
      role: 'Community Manager',
      bio: 'Connecting people with resources and building strong community relationships.'
    },
    {
      name: 'Mike Johnson',
      role: 'Support Specialist',
      bio: 'Providing expert assistance and ensuring every community member gets the help they need.'
    },
    {
      name: 'Sarah Williams',
      role: 'Program Coordinator',
      bio: 'Organizing and managing community programs and events.'
    }
  ];
}
