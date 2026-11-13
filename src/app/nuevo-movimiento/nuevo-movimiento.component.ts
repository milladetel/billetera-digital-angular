import { Component, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Movimiento, TipoMovimiento } from '../movimiento.model';

/**
 * Componente HIJO: muestra el formulario, valida monto y saldo,
 * y notifica al padre SOLO las solicitudes válidas.
 * No modifica el saldo ni el historial.
 */
@Component({
  selector: 'app-nuevo-movimiento',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './nuevo-movimiento.component.html',
  styleUrl: './nuevo-movimiento.component.css'
})
export class NuevoMovimientoComponent {
  /** Saldo actual recibido desde el padre. */
  saldo = input.required<number>();

  /** Notifica al padre una solicitud de movimiento válida. */
  movimientoValido = output<Movimiento>();

  tipo: TipoMovimiento = 'Recarga';
  monto: number | null = null;
  tocado = false;

  /** Monto numérico, mayor que cero y con máximo 2 decimales. */
  get montoValido(): boolean {
    const m = this.monto;
    return typeof m === 'number' && Number.isFinite(m) && m > 0
      && Math.round(m * 100) / 100 === m;
  }

  get saldoInsuficiente(): boolean {
    return this.tipo === 'Gasto' && this.montoValido && this.monto! > this.saldo();
  }

  get formularioValido(): boolean {
    return this.montoValido && !this.saldoInsuficiente;
  }

  registrar(): void {
    if (!this.formularioValido) {
      return; // un movimiento inválido nunca se emite
    }
    this.movimientoValido.emit({ tipo: this.tipo, monto: this.monto! });
    this.monto = null;
    this.tocado = false;
  }
}
