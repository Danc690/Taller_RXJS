import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './models/user.model';
import { DatosUsuarioComponent } from './components/datos-usuario/datos-usuario.component';

@Component({
  selector: 'app-root',
  imports : [DatosUsuarioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  usuario: UserModel | null = null;
  mensaje: string = '';
  constructor(private http: HttpClient) {}

  buscarUsuario(username: string) {
    const url = `https://dummyjson.com/users/filter?key=username&value=${username}`;

    this.http.get<any>(url).subscribe(respuesta => {
// Verificar si se encontraron usuarios de lo contrario avisar al usuario por un mensaje mostrado en pantalla //
      if (respuesta.users.length > 0){
        this.usuario = respuesta.users[0];
        this.mensaje = '';
        console.log(this.usuario);
      }else{
        this.usuario = null;
        this.mensaje = 'Usuario no encontrado';
        console.log('Usuario no encontrado');
      }
    });
  }
}
