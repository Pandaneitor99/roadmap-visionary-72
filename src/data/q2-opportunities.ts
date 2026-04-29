export type Q2Opportunity = {
  id: string;
  title: string;
  tags: string[];
  diagnostico: string;
  oportunidad: string;
  link?: string;
  links?: { label: string; url: string }[];
};

// Oportunidades de desarrollo Q2 2026 — extraídas del Roadmap Review
export const q2Opportunities: Q2Opportunity[] = [
  {
    id: "pagos",
    title: "Pagos recibidos",
    tags: ["Adopción", "Engagement"],
    diagnostico:
      "No existe una sección de pagos recibidos en la app. El usuario puede hacer el pago, pero no se visualizan, lo que rompe el flujo móvil de cobro frente al cliente.",
    oportunidad:
      "Habilitar el registro y consulta de pagos recibidos desde la app, integrado al flujo de la factura de venta.",
    link: "https://claude.ai/design/p/5a2581d3-60c3-4e07-96c9-701c04fbc999?file=Pagos+Recibidos.html&via=share",
  },
  {
    id: "factura-venta",
    title: "Funcionalidad factura de venta",
    tags: ["Experiencia", "Adopción"],
    diagnostico:
      "La factura de venta en la app no tiene la funcionalidad de imprimir ni de clonar, dos acciones críticas para el día a día de la Pyme BASE que hoy lo obligan a volver al computador.",
    oportunidad:
      "Sumar imprimir y clonar dentro del detalle de la factura, cerrando el ciclo de venta sin necesidad del PC.",
    link: "https://claude.ai/design/p/019dbd42-565f-7ccd-958c-6b7206220c86?file=Factura+Detalle.html",
  },
  {
    id: "reportes",
    title: "Reportes",
    tags: ["Adopción", "Experiencia"],
    diagnostico:
      "El usuario no puede descargar ni compartir los reportes. Faltan reportes clave para la operación: ventas generales, ventas por vendedor, ventas por ítem y reporte de inventario.",
    oportunidad:
      "Construir las opciones faltantes, incluyendo las opciones de descarga y compartir.",
    link: "https://claude.ai/design/p/019dc097-2664-7687-9041-1fdc44865b74?file=Reportes.html&via=share",
  },
  {
    id: "busqueda",
    title: "Búsqueda de documentos",
    tags: ["Experiencia", "Engagement"],
    diagnostico:
      "No hay un buscador en el home ni búsqueda de pagos. La búsqueda de facturas de compra es por numeración.",
    oportunidad:
      "Buscador global en el home. Búsqueda por cliente en facturas de venta y pagos.",
    link: "https://claude.ai/design/p/019dd183-c0d0-72dc-9fbf-65c1d4cfcba0?file=Buscador.html",
  },
  {
    id: "operacion",
    title: "Reducir operación diaria",
    tags: ["Experiencia", "Adopción"],
    diagnostico:
      "El usuario tiene que loguearse cada 7 días saliendo de la app. Lentitud de carga al cambiar de pestañas. Algunos campos no se llenan con las preferencias.",
    oportunidad:
      "Sesión persistente, mejoras de performance al navegar y autocompletado por preferencia del usuario.",
  },
  {
    id: "graficas",
    title: "Gráficas e información diaria",
    tags: ["Adopción", "Engagement"],
    diagnostico:
      "Hoy en la app no se encuentran gráficas clave para la operación: ventas del día, productos más vendidos, top de clientes, comparativos por período.",
    oportunidad:
      "Construir una sección de gráficas por venta, items y contactos.",
    link: "https://claude.ai/design/p/019dd004-199a-7e2c-963c-4e8f8c157a59?file=Estadisticas.html",
  },
  {
    id: "contactos",
    title: "Contactos",
    tags: ["Experiencia", "Adopción"],
    diagnostico:
      "Disparidad en algunos campos no obligatorios, sumado a poca claridad en la elección de cliente y vendedor. Esto genera fricción en la creación de contactos desde la app.",
    oportunidad:
      "Simplificación de la creación de contactos + paridad de campos con web.",
    link: "https://claude.ai/design/p/019dc695-1901-7519-a9d7-a74bd0eedfd0",
  },
  {
    id: "items",
    title: "Items",
    tags: ["Adopción", "Engagement"],
    diagnostico:
      "Caída en la intención de creación de Items y campos faltantes respecto a la web; UX deficiente en varios campos genera fricción.",
    oportunidad:
      "Simplificación de la creación de items + agregar creación de servicios + paridad de campos con web.",
    link: "https://www.figma.com/design/VjC6hok9QSdr9Wd8iasWms/Secci%C3%B3n-items-App?node-id=2266-3088&t=Vbquk9q4yag4jbVR-0",
  },
  {
    id: "soporte",
    title: "Soporte",
    tags: ["Experiencia"],
    diagnostico:
      "El usuario debe ir a la web para realizar un reclamo de soporte; la app no gestiona tickets.",
    oportunidad:
      "Link mágico creado por Identity para acceder a soporte sin fricción desde la app.",
    link: "https://claude.ai/design/p/9a44db74-0c3c-4b5a-9c38-c22c7b9d0ba0",
  },
  {
    id: "rediseno-rd",
    title: "Rediseño facturación Dominicana (Ola)",
    tags: ["Adopción", "Experiencia"],
    diagnostico:
      "Los usuarios no tienen la opción de agregar Retenciones ni Conduces en la factura de venta dentro de la app. Esto bloquea casos fiscales reales y los obliga a volver a la web.",
    oportunidad:
      "Rediseño de facturación + agregar retenciones + agregar conduces.",
    link: "https://www.figma.com/design/G4L7LYtkISB6T4DwLJ4wHS/MOB---Redise%C3%B1o-Facturaci%C3%B3n?node-id=3872-17740&p=f&t=CosijuUBHpbR7JeB-0",
  },
  {
    id: "adquisicion",
    title: "Adquisición",
    tags: ["Adopción", "Engagement"],
    diagnostico:
      "Los usuarios tienen que iniciar sesión dentro de la app para ver los planes y pagar, o ir a web. Este paso adicional fricciona la conversión a pago.",
    oportunidad:
      "Link mágico creado por Identity para ver planes + contactabilidad bot ventas.",
    links: [
      {
        label: "Prototipo 1",
        url: "https://claude.ai/design/p/019dc058-65c2-700c-ba39-a56f47183a28?file=Alegra+Prototype.html",
      },
      {
        label: "Prototipo 2",
        url: "https://www.figma.com/proto/mwZw2uwa23VqYfWeAfM55R/ACT---Test-ABC-invitaci%C3%B3n-a-descargar-app-Alegra-para-usuarios-mobile?node-id=7001-303&viewport=-124%2C-500%2C0.18&t=8Gb8o270oF3s50V7-1&scaling=min-zoom&content-scaling=fixed&page-id=1%3A2",
      },
    ],
  },
  {
    id: "multicuenta",
    title: "Multicuenta",
    tags: ["Experiencia", "Engagement"],
    diagnostico:
      "Los usuarios que gestionan múltiples empresas deben cerrar sesión y volver a iniciar para cambiar de cuenta, generando fricción y abandono del flujo.",
    oportunidad:
      "Permitir el cambio rápido entre cuentas dentro de la app, manteniendo el contexto y las sesiones activas.",
  },
];
