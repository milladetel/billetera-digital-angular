import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { NuevoMovimientoComponent } from '../nuevo-movimiento/nuevo-movimiento.component';
import { Movimiento } from '../movimiento.model';

/**
 * Componente PADRE: dueño del estado (saldo e historial).
 * Recibe las solicitudes válidas del hijo y actualiza los datos.
 */
@Component({
  selector: 'app-billetera',
  imports: [NuevoMovimientoComponent, DecimalPipe],
  templateUrl: './billetera.component.html',
  styleUrl: './billetera.component.css'
})
export class BilleteraComponent {
  saldo = signal(250);
  movimientos = signal<Movimiento[]>([]);

  /** Procesa la solicitud enviada por el hijo mediante output(). */
  registrarMovimiento(mov: Movimiento): void {
    // Validación defensiva: el padre nunca acepta un movimiento inválido
    if (!(mov.monto > 0) || (mov.tipo === 'Gasto' && mov.monto > this.saldo())) {
      return;
    }

    const delta = mov.tipo === 'Recarga' ? mov.monto : -mov.monto;
    this.saldo.update(s => Math.round((s + delta) * 100) / 100);

    // El movimiento más reciente se agrega al inicio del historial
    this.movimientos.update(lista => [mov, ...lista]);
  }
}
