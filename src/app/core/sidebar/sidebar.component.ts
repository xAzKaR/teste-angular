import { Component } from '@angular/core';

import { faFilm, faHome } from '@fortawesome/free-solid-svg-icons';

/**
 *  Componente para apresentação de menu lateral
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  /** ícones */
  home = faHome;
  film = faFilm;
}
