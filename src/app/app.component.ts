import { Component } from '@angular/core';
import { of, forkJoin } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UserModel } from './models/user.model';
import { PostModel } from './models/post.model';
import { DatosUsuarioComponent } from './components/datos-usuario/datos-usuario.component';
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';
import { CommentService } from './services/comment.service';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  imports: [DatosUsuarioComponent, PublicacionesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'taller-rxjs';
  usuario: UserModel | null = null;
  posts: PostModel[] = [];
  mensaje: string = '';
  cargando: boolean = false;

  constructor(private userService: UserService, private postService: PostService, private commentService: CommentService) {}

  buscarUsuario(username: string) {
    if (!username || !username.trim()) {
      this.usuario = null;
      this.posts = [];
      this.mensaje = 'Por favor ingresa un nombre de usuario';
      return;
    }

    this.cargando = true;
    this.mensaje = '';
    this.userService.buscarUsuarioPorUsername(username.trim()).pipe(
      // Paso A: Cambiar a la petición de publicaciones del usuario si este existe
      switchMap(respuestaUser => {
        if (!respuestaUser.users || respuestaUser.users.length === 0) {
          this.usuario = null;
          return of(null);
        }
        this.usuario = respuestaUser.users[0];
        return this.postService.buscarPostsPorUsuarioId(this.usuario.id);
      }),
      // Paso B: Por cada publicación, buscar sus comentarios en paralelo con forkJoin
      switchMap(respuestaPosts => {
        if (!respuestaPosts) {
          return of(null);
        }

        const listaPosts = respuestaPosts.posts;
        if (!listaPosts || listaPosts.length === 0) {
          return of([]);
        }

        const postsConComentarios$ = listaPosts.map(post => {
          return this.commentService.buscarComentariosPorPostId(post.id).pipe(
            map(respuestaComments => ({
              ...post,
              comments: respuestaComments.comments || []
            })),
            catchError(() => of({ ...post, comments: [] }))
          );
        });

        return forkJoin(postsConComentarios$);
      }),
      catchError(error => {
        console.error('Error en la petición:', error);
        return of(null);
      })
    ).subscribe({
      next: (resultadoPosts) => {
        this.cargando = false;
        if (resultadoPosts === null) {
          this.usuario = null;
          this.posts = [];
          this.mensaje = 'Usuario no encontrado';
        } else {
          this.posts = resultadoPosts;
          this.mensaje = '';
          console.log('Usuario encontrado:', this.usuario);
          console.log('Posts con comentarios listos:', this.posts);
        }
      },
      error: () => {
        this.cargando = false;
        this.usuario = null;
        this.posts = [];
        this.mensaje = 'Ocurrió un error al realizar la consulta';
      }
    });
  }
}
