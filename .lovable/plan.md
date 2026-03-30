

## Plan: Conectar proyecto a Supabase

### Resumen

Conectar la aplicacion existente a la instancia de Supabase proporcionada por el usuario para habilitar persistencia de datos (roadmap interactivo, etc.).

### Datos de conexion

- **URL**: `https://wiektajetbbnejurnazd.supabase.co`
- **Publishable Key**: `sb_publishable_Bm4kv3NZZGmCOwlNtIC0Kg_s5O5wKPo`

La publishable key es publica y segura para incluir en el codigo fuente.

### Pasos

**1. Instalar dependencia `@supabase/supabase-js`**

**2. Crear archivo de integracion `src/integrations/supabase/client.ts`**
- Configurar el cliente Supabase con la URL y la anon key proporcionadas

**3. Crear archivo de tipos `src/integrations/supabase/types.ts`**
- Placeholder inicial para los tipos de la base de datos (se actualizara cuando se creen tablas)

**4. Crear archivo index `src/integrations/supabase/index.ts`**
- Re-exportar el cliente para uso centralizado

### Archivos a crear/modificar

- `src/integrations/supabase/client.ts` — cliente Supabase
- `src/integrations/supabase/types.ts` — tipos de BD
- `src/integrations/supabase/index.ts` — barrel export
- `package.json` — agregar `@supabase/supabase-js`

### Siguiente paso

Una vez conectado, se podran crear las tablas `roadmap_items` y `roadmap_rows` para persistir los cambios del roadmap.

