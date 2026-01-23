// Strategy and North Star Metric
export const strategyInfo = {
  strategy: "Convertirse en el aliado de las pymes, extendiendo el poder de Alegra más allá del escritorio para facilitar la gestión administrativa y contable de forma simple, ágil e inmediata, desde cualquier lugar.",
  northStarMetric: "Usuarios activos que realizan acciones de valor dentro de la app (factura de venta, items, contactos, pagos, reportes etc)"
};

export interface Initiative {
  id: string;
  title: string;
  status: "in-progress" | "backlog";
  date: string;
  objectiveTag: "experience" | "adoption";
  objectiveText: string;
  problem: string;
  hypothesis: string;
  keyResults: string[];
  kpis: string[];
  version: string;
  dependencies: string;
  sprintStart: number;
  sprintEnd: number;
}

export const initiatives: Initiative[] = [
  {
    id: "1",
    title: "Rediseño Facturación Costa Rica",
    status: "in-progress",
    date: "04/02/2026",
    objectiveTag: "adoption",
    objectiveText: "Objetivo 2: Incrementar la adopción y uso recurrente de la app móvil impulsando la creación de facturas durante el trimestre",
    problem: "Con la salida en web de la versión 4.4, la cantidad de facturas aumentó un 20%, sin embargo, en la app se mantuvo constante. Adicionalmente, la tasa de conversión es la menor de las 4 versiones (63% hoy) en comparación a otras versiones (CO 83%, RD 77%). En volumen total, también se encuentra de últimas con 1.600 facturas de venta creadas al mes.",
    hypothesis: "Si rediseñamos la factura de venta, esperamos aumentar el uso y la intención de creación de facturas, promoviendo la adopción cross-platform del producto.",
    keyResults: ["KR 2.1", "KR 2.2", "KR 2.3"],
    kpis: ["Facturas de Venta totales en CR", "Conversión de FV en CR", "MAC de Costa Rica", "% Usuarios activos pagos de web que utilizan app"],
    version: "Costa Rica",
    dependencies: "Juan Alvarez",
    sprintStart: 1,
    sprintEnd: 2,
  },
  {
    id: "2",
    title: "Estabilización",
    status: "in-progress",
    date: "12/03/2026",
    objectiveTag: "experience",
    objectiveText: "Objetivo 1: Mejorar la experiencia del usuario en la app mejorando la estabilidad y reduciendo errores críticos que impactan a los usuarios activos este trimestre",
    problem: "Semanalmente se presentan alrededor de 8k errores que se reportan conjuntamente en Sentry y Amplitude.",
    hypothesis: "Si detectamos y corregimos los errores antes de que el usuario reporte, vamos a incrementar la satisfacción de los usuarios.",
    keyResults: ["KR 1.3"],
    kpis: ["Cantidad de issues registrados en Amplitude", "Issues llegados a soporte"],
    version: "Todos",
    dependencies: "-",
    sprintStart: 1,
    sprintEnd: 6,
  },
  {
    id: "3",
    title: "Calificación Tiendas",
    status: "backlog",
    date: "12/02/2026",
    objectiveTag: "experience",
    objectiveText: "Objetivo 1: Mejorar la experiencia del usuario en la app mejorando la estabilidad y reduciendo errores críticos que impactan a los usuarios activos este trimestre",
    problem: "Las aplicaciones con un porcentaje mayor a 4.5 tienen una mejor conversión de descarga, las tiendas mejoran la visibilidad y se fortalece la marca.",
    hypothesis: "Si incentivamos la calificación al crear una factura de venta exitosa, el usuario tiene más probabilidad de calificar alto la aplicación.",
    keyResults: ["KR 1.1", "KR 1.2"],
    kpis: ["Calificación en Google Play y App Store", "Funnel de descarga"],
    version: "Todos",
    dependencies: "-",
    sprintStart: 5,
    sprintEnd: 6,
  },
  {
    id: "4",
    title: "Rediseño Creación de Items",
    status: "backlog",
    date: "26/03/2026",
    objectiveTag: "adoption",
    objectiveText: "Objetivo 2: Incrementar la adopción y uso recurrente de la app móvil impulsando la creación de facturas durante el trimestre",
    problem: "Mientras que en Web se crean alrededor de 500k de productos al mes, en app únicamente se crean 15k. Hay una discrepancia del 40% de los campos de creación de factura entre app y web. Adicionalmente, hay una mala UX en algunos campos y datos de precios.",
    hypothesis: "Si lanzamos un nuevo diseño de creación de ítems esperamos un aumento en la creación de ítems y su uso en las facturas de venta.",
    keyResults: ["KR 2.1", "KR 2.2", "KR 2.3"],
    kpis: ["Items agregados", "Conversión de factura de venta", "Cantidad de items agregados a la factura de venta"],
    version: "Todos",
    dependencies: "sh-items",
    sprintStart: 3,
    sprintEnd: 4,
  },
  {
    id: "5",
    title: "Rediseño Facturación Colombia",
    status: "backlog",
    date: "03/04/2026",
    objectiveTag: "adoption",
    objectiveText: "Objetivo 2: Incrementar la adopción y uso recurrente de la app móvil impulsando la creación de facturas durante el trimestre",
    problem: "Únicamente el 14% de los usuarios pagos en web utilizan la app para realizar una acción de valor, entre ellas factura de venta.",
    hypothesis: "Si rediseñamos la pantalla de facturación esperamos un aumento en el uso de facturación y una mayor conversión, además de realizar cross-selling a la aplicación.",
    keyResults: ["KR 2.1", "KR 2.2", "KR 2.3"],
    kpis: ["Facturas de Venta totales en CO", "Conversión de FV en CO", "MAC de Colombia", "% Usuarios activos pagos de web que utilizan app"],
    version: "Colombia",
    dependencies: "Yohana Muñoz",
    sprintStart: 5,
    sprintEnd: 6,
  },
];

export interface OKR {
  id: string;
  objective: string;
  type: "experience" | "adoption";
  keyResults: {
    id: string;
    name: string;
    baseline: string;
    target: string;
    percentage: string;
    /** Optional (used e.g. in Q4 2025) */
    currentResult?: string;
    /** Optional (used e.g. in Q4 2025) */
    achievedIncrease?: string;
  }[];
}

export const okrs: OKR[] = [
  {
    id: "obj-1",
    objective: "Mejorar la experiencia del usuario en la app mejorando la estabilidad y reduciendo errores críticos que impactan a los usuarios activos este trimestre",
    type: "experience",
    keyResults: [
      { id: "kr-1.1", name: "Aumentar la calificación en Google Play", baseline: "4.7", target: "4.9", percentage: "4.26%" },
      { id: "kr-1.2", name: "Aumentar la calificación en App Store", baseline: "4.3", target: "4.7", percentage: "9.3%" },
      { id: "kr-1.3", name: "Reducir los errores críticos en producción detectados por Sentry Y Amplitud en los flujos principales durante el trimestre", baseline: "8671", target: "1734", percentage: "-85%" },
    ],
  },
  {
    id: "obj-2",
    objective: "Incrementar la adopción y uso recurrente de la app móvil impulsando la creación de facturas durante el trimestre",
    type: "adoption",
    keyResults: [
      { id: "kr-2.1", name: "Lograr que usuarios pagos que facturan en web instalen la app móvil y realicen una acción de valor desde la app durante el trimestre", baseline: "6459", target: "8000", percentage: "24%" },
      { id: "kr-2.2", name: "Alcanzar facturas de venta semanales creadas desde la app móvil al final del trimestre", baseline: "23.813", target: "30.000", percentage: "26%" },
      { id: "kr-2.3", name: "Incrementar items creados semanales desde la app que luego son usados en facturas", baseline: "3500", target: "5000", percentage: "42.86%" },
    ],
  },
];
