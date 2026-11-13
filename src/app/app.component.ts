import { Component } from '@angular/core';
import { BilleteraComponent } from './billetera/billetera.component';

/** AppComponent solo sirve como contenedor. */
@Component({
  selector: 'app-root',
  imports: [BilleteraComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
