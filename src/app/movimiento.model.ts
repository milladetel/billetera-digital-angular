export type TipoMovimiento = 'Recarga' | 'Gasto';

/** Movimiento válido de la billetera. */
export interface Movimiento {
  tipo: TipoMovimiento;
  monto: number;
}
