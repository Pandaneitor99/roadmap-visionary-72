import type { Initiative, OKR } from "@/data/initiatives";

// Q4 2025 OKRs
export const okrsQ42025: OKR[] = [
  {
    id: "q4-obj-1",
    objective:
      "Mejorar la experiencia del usuario en la app incentivando las buenas calificaciones y detectando los errores de la app",
    type: "experience",
    keyResults: [
      {
        id: "kr-1.1",
        name: "Aumentar la calificación en Google Play de 3.7 a 4",
        baseline: "3.7",
        target: "4.0",
        percentage: "8.11%",
        currentResult: "4.7",
        achievedIncrease: "27.03%",
      },
      {
        id: "kr-1.3",
        name: "Detectar el 100% de los errores nativos mediante Sentry y los errores de API mediante Amplitude",
        baseline: "0%",
        target: "100%",
        percentage: "100.00%",
        currentResult: "100.00%",
        achievedIncrease: "100.00%",
      },
    ],
  },
  {
    id: "q4-obj-2",
    objective:
      "Incrementar la adopción y uso recurrente de la app móvil impulsando la creación de facturas",
    type: "adoption",
    keyResults: [
      {
        id: "kr-2.1",
        name: "Incrementar en 15% la cantidad de acciones totales clave en la app",
        baseline: "130,839 acciones",
        target: "150,465 acciones",
        percentage: "15.00%",
        currentResult: "133,184 acciones",
        achievedIncrease: "1.79%",
      },
      {
        id: "kr-2.2",
        name: "Segmentar el 100% de los usuarios nuevos con Core y Lite y obtener la información para la contactabilidad de Sales",
        baseline: "0%",
        target: "100%",
        percentage: "100.00%",
        currentResult: "100.00%",
        achievedIncrease: "TBD",
      },
      {
        id: "kr-2.3",
        name: "Aumentar del 50% al 60% el porcentaje de usuarios activos semanales que realizan al menos una acción principal dentro de la app (WAC/WAU)",
        baseline: "50%",
        target: "60%",
        percentage: "20.00%",
        currentResult: "54.0%",
        achievedIncrease: "8%",
      },
    ],
  },
];

export const krDetailsQ42025: Record<string, string> = {
  "KR 1.1": "Aumentar la calificación en Google Play de 3.7 a 4 (Base: 3.7, Target: 4.0).",
  "KR 1.3": "Detectar el 100% de los errores nativos mediante Sentry y los errores de API mediante Amplitude.",
  "KR 2.1": "Incrementar en 15% la cantidad de acciones totales clave en la app (Base: 130,839 acciones, Target: 150,465 acciones).",
  "KR 2.2": "Segmentar el 100% de los usuarios nuevos con Core y Lite y obtener la información necesaria para la contactabilidad de Sales.",
  "KR 2.3": "Aumentar del 50% al 60% el porcentaje de usuarios activos semanales que realizan al menos una acción principal dentro de la app (WAC/WAU).",
};

// Q4 2025 Initiatives
export const initiativesQ42025: Initiative[] = [
  {
    id: "q4-1",
    title: "Costa Rica 4.4",
    status: "in-progress",
    date: "Q4 2025",
    objectiveTag: "adoption",
    objectiveText:
      "Incrementar la adopción y uso recurrente de la app móvil impulsando la creación de facturas durante el trimestre.",
    problem:
      "Con la salida de la versión 4.4 en web, la cantidad de facturas aumentó un 20%; sin embargo, en la app móvil el volumen se mantuvo constante. Costa Rica presenta la tasa de conversión más baja (63%), vs Colombia (83%) y República Dominicana (77%). Además, registra ~1,600 facturas de venta/mes desde la app.",
    hypothesis: "—",
    keyResults: ["KR 2.1", "KR 2.3"],
    kpis: ["Facturas de venta totales creadas en Costa Rica desde la app."],
    version: "Costa Rica",
    dependencies: "-",
    sprintStart: 6,
    sprintEnd: 6,
  },
  {
    id: "q4-2",
    title: "Onboarding",
    status: "backlog",
    date: "Q4 2025",
    objectiveTag: "adoption",
    objectiveText:
      "Incrementar la adopción y uso recurrente de la app móvil impulsando la creación de facturas durante el trimestre.",
    problem:
      "Actualmente, el onboarding entre app y web es completamente diferente (segmentación distinta, pantallas y flujos inconsistentes). Esto provoca que los usuarios no sean segmentados correctamente y falten propiedades para personalizar campañas de Sales/Growth. Además, hay confusión entre inicio de sesión y creación de cuenta.",
    hypothesis: "—",
    keyResults: ["KR 2.2"],
    kpis: ["Funnel de login.", "Funnel de onboarding.", "Funnel a PQL."],
    version: "Todos",
    dependencies: "-",
    sprintStart: 4,
    sprintEnd: 5,
  },
  {
    id: "q4-3",
    title: "Calificación Google Play Store",
    status: "backlog",
    date: "Q4 2025",
    objectiveTag: "experience",
    objectiveText:
      "Mejorar la experiencia del usuario en la app para elevar su satisfacción y percepción general.",
    problem:
      "Las aplicaciones con una calificación inferior a 4 estrellas tienen una menor probabilidad de ser descargadas, impactando adquisición y percepción de calidad.",
    hypothesis: "—",
    keyResults: ["KR 1.1"],
    kpis: ["Calificación en Google Play y App Store.", "Funnel de descarga."],
    version: "Todos",
    dependencies: "-",
    sprintStart: 3,
    sprintEnd: 3,
  },
  {
    id: "q4-4",
    title: "Sentry",
    status: "backlog",
    date: "Q4 2025",
    objectiveTag: "experience",
    objectiveText:
      "Mejorar la experiencia del usuario en la app para elevar su satisfacción y percepción general.",
    problem:
      "No se cuenta con visibilidad sobre los errores nativos dentro de la app, dificultando la detección temprana de fallos críticos y su priorización.",
    hypothesis: "—",
    keyResults: ["KR 1.3"],
    kpis: ["Errores detectados."],
    version: "No aplica",
    dependencies: "-",
    sprintStart: 2,
    sprintEnd: 3,
  },
  {
    id: "q4-5",
    title: "Home",
    status: "backlog",
    date: "Q4 2025",
    objectiveTag: "experience",
    objectiveText:
      "Incrementar la adopción y uso recurrente de la app móvil impulsando la creación de facturas durante el trimestre.",
    problem:
      "El Home de la app difiere de la web (UI kit distinto) y ofrece una experiencia visual deficiente, especialmente en gráficas, afectando percepción y usabilidad.",
    hypothesis: "—",
    keyResults: ["KR 1.1"],
    kpis: ["Eventos del botón “+”."],
    version: "No especificada",
    dependencies: "-",
    sprintStart: 1,
    sprintEnd: 2,
  },
];

export const roadmapQ42025 = {
  // 12 weeks, 6 sprints (2 weeks each)
  sprints: [
    { id: 1, label: "Sprint 1", weeks: [1, 2] },
    { id: 2, label: "Sprint 2", weeks: [3, 4] },
    { id: 3, label: "Sprint 3", weeks: [5, 6] },
    { id: 4, label: "Sprint 4", weeks: [7, 8] },
    { id: 5, label: "Sprint 5", weeks: [9, 10] },
    { id: 6, label: "Sprint 6", weeks: [11, 12] },
  ],
  items: [
    { id: "home", title: "Home", objectiveTag: "experience", weekStart: 1, weekEnd: 3, initiativeId: "q4-5" },
    { id: "sentry", title: "Sentry", objectiveTag: "experience", weekStart: 4, weekEnd: 5, initiativeId: "q4-4" },
    { id: "rating", title: "Calificación Google Play Store", objectiveTag: "experience", weekStart: 6, weekEnd: 6, initiativeId: "q4-3" },
    { id: "onboarding", title: "Onboarding", objectiveTag: "adoption", weekStart: 7, weekEnd: 9, initiativeId: "q4-2" },
    { id: "cr44", title: "Costa Rica 4.4", objectiveTag: "adoption", weekStart: 10, weekEnd: 12, initiativeId: "q4-1" },
  ],
};
