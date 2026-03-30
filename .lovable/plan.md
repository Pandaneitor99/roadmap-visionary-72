

## Plan: Crear tablas del Roadmap en Supabase y poblar datos iniciales

### Situacion

La app intenta leer/escribir en `roadmap_rows` y `roadmap_items` pero las tablas no existen en Supabase. Hay que crearlas via migracion y luego insertar los datos iniciales.

### Pasos

**1. Crear migracion con el esquema de las dos tablas**

```sql
CREATE TABLE public.roadmap_rows (
  id text PRIMARY KEY,
  label text NOT NULL,
  section text NOT NULL DEFAULT 'must',
  sort_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.roadmap_items (
  id text PRIMARY KEY,
  title text NOT NULL,
  type text NOT NULL DEFAULT 'feature',
  objective_tag text NOT NULL DEFAULT 'adoption',
  week_start integer NOT NULL,
  week_end integer NOT NULL,
  initiative_id text,
  row_id text REFERENCES public.roadmap_rows(id) ON DELETE CASCADE,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.roadmap_rows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all on roadmap_rows" ON public.roadmap_rows FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on roadmap_items" ON public.roadmap_items FOR ALL USING (true) WITH CHECK (true);
```

**2. Insertar datos iniciales (seed)**

Insertar las filas y los items del roadmap Q1 actual para que la app cargue con los datos correctos desde Supabase.

### Detalle tecnico

- Se usa una migracion para crear las tablas (cambio de esquema)
- Se usa el insert tool para poblar los datos iniciales
- Las politicas RLS permiten acceso publico (no hay autenticacion en la app)

### Archivos

- Nueva migracion SQL (esquema)
- Sin cambios en el codigo frontend (ya tiene la logica de fetch/upsert)

