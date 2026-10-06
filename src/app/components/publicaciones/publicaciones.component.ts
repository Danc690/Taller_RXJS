import { Component, Input } from '@angular/core';
import { PostModel } from '../../models/post.model';

@Component({
  selector: 'app-publicaciones',
  imports: [],
  templateUrl: './publicaciones.component.html',
  styleUrl: './publicaciones.component.css'
})
export class PublicacionesComponent {
  @Input() posts: PostModel[] = [];
}
