## Cambio

En `src/data/initiatives.ts`, igualar el campo `percentage` con `achievedIncrease` en todos los Key Results del Q1 para que el tag de crecimiento mostrado siempre refleje el % logrado (base → actual) y se elimine la confusión actual (donde KR 2.2 mostraba "26%" cuando en realidad decreció -1.33%).

## Valores finales

| KR | Base | Actual | `percentage` y `achievedIncrease` |
|---|---|---|---|
| 1.1 | 4.6 | 4.7 | +2.17% |
| 1.2 | 4.3 | 4.4 | +2.33% |
| 1.3 | 10k | 6k | -40% |
| 2.1 | 7601 | 7977 | +4.95% |
| 2.2 | 23.813 | 23497 | **-1.33%** |
| 2.3 | 3500 | 5434 | +55.26% |

## Archivo

- `src/data/initiatives.ts` — actualizar el campo `percentage` de KR 2.1 (31.56% → 4.95%), KR 2.2 (26% → -1.33%) y KR 2.3 (42.86% → 55.26%). El resto ya están alineados.

## Resultado visual

El badge en `OKRCard` ya prioriza `achievedIncrease ?? percentage`, así que los tags ya se ven bien; este cambio garantiza coherencia interna y previene errores si en el futuro algún componente lee `percentage` directamente.
