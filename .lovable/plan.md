

## Actualizar dataset "Funcionalidades que más utilizan los BASE por fuera de App"

Reemplazar el array `baseFueraDeApp` en `src/pages/q2-2026/RoadmapReview.tsx` (líneas 2927–2942) con los valores reales del chart Amplitude `h6i1m5l2` que aparecen en la captura.

### Nuevo dataset (14 eventos, ordenados desc.)

```ts
const baseFueraDeApp = [
  { feature: "Creación Factura",          uso: 10649 },
  { feature: "Registrar pago",            uso: 6949 },
  { feature: "Imprimir factura",          uso: 3840 },
  { feature: "Descargar factura",         uso: 3385 },
  { feature: "Generar reporte",           uso: 3376 },
  { feature: "Editar factura",            uso: 3060 },
  { feature: "Descargar reportes",        uso: 2001 },
  { feature: "Editar retenciones",        uso: 1712 },
  { feature: "Crear contactos",           uso: 1690 },
  { feature: "Generar reportes (otros)",  uso: 1637 },
  { feature: "Clonar factura",            uso: 1571 },
  { feature: "Factura de compra",         uso: 1461 },
  { feature: "Crear ítems",               uso: 1189 },
  { feature: "Nota de crédito",           uso: 953 },
];
```

### Detalles técnicos

- Solo se cambia el contenido del array. El `BarChart` (vertical, naranja, con `LabelList`) ya funciona y se reajusta automáticamente.
- Se conserva la altura `h-[460px]` y `YAxis width=220` — los nuevos labels caben en ese ancho.
- Se mantiene el comentario de fuente apuntando a `chart/h6i1m5l2`.
- No se tocan otras secciones del archivo.

**Archivo editado:** `src/pages/q2-2026/RoadmapReview.tsx` (solo líneas 2927–2942).

