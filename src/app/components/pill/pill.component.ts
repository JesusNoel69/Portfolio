import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pill',
  standalone: true,
  imports: [],
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.css'] // corregido: `styleUrl` -> `styleUrls`
})
export class PillComponent implements OnInit {
  @Input() name: string = '';
  images: any[] = [];
  image: any;

  constructor(private http: HttpClient) {
      this.image = { source: '', name: '' };
  }

  ngOnInit() {
    this.http.get<any[]>('/assets/data/skills.json')
      .subscribe(response => {
        this.images = response;
        this.image = this.images.find(img => img.id === this.name);
      });
  }
}
