# Caso 2 – Billetera Digital: Pago y Movimientos (Angular)

Billetera digital construida con **dos componentes** que se comunican padre ↔ hijo:

| Componente | Rol |
|---|---|
| `BilleteraComponent` (padre) | Dueño del estado: saldo (S/ 250.00 inicial) y arreglo de movimientos. Muestra el saldo con interpolación, el historial con `@for` y el mensaje "Aún no hay movimientos" con `@if`. |
| `NuevoMovimientoComponent` (hijo) | Recibe el saldo con `input()`, muestra el formulario (tipo y monto), valida y emite solo solicitudes válidas con `output()`. Muestra errores con `@if` y deshabilita el botón con `[disabled]`. |

`AppComponent` solo sirve como contenedor. No se usan servicios, enrutamiento, formularios
reactivos ni backend; el estado vive en memoria dentro del componente padre.

## Versiones utilizadas

| Herramienta | Versión |
|---|---|
| Node.js | 20.x |
| npm | 11.x |
| Angular / Angular CLI | 19.2 |
| Bootstrap | 5.3.3 |

## Comandos

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar la aplicación (http://localhost:4200)
npm start          # equivalente a: ng serve

# (Opcional) Compilar para producción -> dist/
npm run build
```

## Estructura

```
src/app/
├── app.component.*                      # contenedor
├── movimiento.model.ts                  # interfaz Movimiento { tipo, monto }
├── billetera/                           # componente PADRE
│   ├── billetera.component.ts
│   └── billetera.component.html
└── nuevo-movimiento/                    # componente HIJO
    ├── nuevo-movimiento.component.ts
    └── nuevo-movimiento.component.html
```

## Flujo padre ↔ hijo

```
BilleteraComponent ── [saldo]="saldo()" (input) ──▶ NuevoMovimientoComponent
BilleteraComponent ◀── (movimientoValido) (output) ── NuevoMovimientoComponent
```

## Pruebas funcionales

| # | Acción | Resultado esperado |
|---|---|---|
| 1 | Abrir la aplicación | Saldo S/ 250.00; "Aún no hay movimientos" |
| 2 | Recarga de S/ 100.00 | Saldo S/ 350.00; recarga en el historial |
| 3 | Gasto de S/ 50.00 | Saldo S/ 300.00; el gasto aparece antes que la recarga |
| 4 | Gasto de S/ 400.00 | Mensaje "Saldo insuficiente…" y botón deshabilitado; saldo sigue en S/ 300.00 |
| 5 | Monto 0, negativo o vacío | Mensaje de error y botón deshabilitado; no cambia saldo ni historial |

## Integrantes

1. De la Cruz Huarancca, Luis Cristian
2. Lizana Romero, Nilton
3. Milla Guerrero, Epifanio Eulogio
4. Ruiz Robles, Elianni Jhoselin

Curso: Soluciones Web y Aplicaciones Distribuidas – Docente: MSc. Victor Muguerza (UPN)
