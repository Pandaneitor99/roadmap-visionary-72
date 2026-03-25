

## Plan: Roadmap interactivo con drag-and-drop y edicion de iniciativas

### Resumen

Convertir el roadmap actual (estatico) en un tablero interactivo donde:
1. Los bloques de iniciativas se pueden arrastrar horizontalmente (cambiar semanas) y verticalmente (cambiar fila/iniciativa)
2. Al hacer doble clic o mediante un boton de edicion, se pueden modificar el titulo, tipo, y semanas de cada item

### Cambios tecnicos

**1. Convertir `roadmapItems` de constante a estado**
- Mover `roadmapItems` a un `useState` dentro de `RoadmapGantt`
- Definir las filas (rows) como un array de estado tambien, para permitir reordenamiento

**2. Implementar drag-and-drop nativo (HTML5 Drag API)**
- No se necesita libreria externa. Usar `draggable`, `onDragStart`, `onDragOver`, `onDrop` en las celdas del grid
- Al iniciar drag: guardar el item y su posicion actual
- Al soltar sobre una celda vacia: recalcular `weekStart`/`weekEnd` del item segun la columna destino, y reasignar la fila si cambio
- Restricciones: no permitir que un bloque multi-semana se salga del rango 1-26
- Feedback visual: highlight de la celda destino durante el drag con un borde o fondo temporal

**3. Implementar edicion inline de iniciativas**
- Al hacer clic en un item, ademas del modal existente, agregar un boton de "Editar" (icono lapiz) que abre un Dialog de edicion
- Campos editables: titulo, tipo (feature/issues/improvements), objectiveTag, weekStart, weekEnd
- Usar `Input` y `Select` existentes del proyecto
- Al guardar, actualizar el estado local de `roadmapItems`

**4. Reorganizacion de filas por drag**
- Cada fila tendra un area de drag en el label (icono grip)
- Al arrastrar una fila completa, se reordena visualmente

### Archivos a modificar

- `src/components/dashboard/RoadmapGantt.tsx` — toda la logica de estado, drag-and-drop, y modal de edicion

### Consideraciones
- Los datos son solo en memoria (estado local). No hay backend, asi que los cambios se pierden al recargar la pagina
- Se mantiene el modal existente de detalle de iniciativa; se agrega un boton de edicion dentro de el
- El estilo glassmorphism y la estructura visual actual se preservan

