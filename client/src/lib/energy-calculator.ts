// Calcul automatique des classes énergétiques DPE et GES
export function calculateDpeClass(kwhPerM2PerYear: number | null): string | null {
  if (kwhPerM2PerYear === null || kwhPerM2PerYear === undefined || kwhPerM2PerYear < 0) {
    return null;
  }

  if (kwhPerM2PerYear <= 70) return 'A';
  if (kwhPerM2PerYear <= 110) return 'B';
  if (kwhPerM2PerYear <= 180) return 'C';
  if (kwhPerM2PerYear <= 250) return 'D';
  if (kwhPerM2PerYear <= 330) return 'E';
  if (kwhPerM2PerYear <= 420) return 'F';
  return 'G';
}

export function calculateGesClass(kgCo2PerM2PerYear: number | null): string | null {
  if (kgCo2PerM2PerYear === null || kgCo2PerM2PerYear === undefined || kgCo2PerM2PerYear < 0) {
    return null;
  }

  if (kgCo2PerM2PerYear <= 6) return 'A';
  if (kgCo2PerM2PerYear <= 11) return 'B';
  if (kgCo2PerM2PerYear <= 30) return 'C';
  if (kgCo2PerM2PerYear <= 50) return 'D';
  if (kgCo2PerM2PerYear <= 70) return 'E';
  if (kgCo2PerM2PerYear <= 100) return 'F';
  return 'G';
}

export function getDpeColor(dpeClass: string | null): string {
  switch (dpeClass) {
    case 'A': return '#00a651';
    case 'B': return '#4cb82b';
    case 'C': return '#9ccd00';
    case 'D': return '#fff100';
    case 'E': return '#ffc600';
    case 'F': return '#ff8c00';
    case 'G': return '#e4002b';
    default: return '#cccccc';
  }
}

export function getGesColor(gesClass: string | null): string {
  switch (gesClass) {
    case 'A': return '#68217a';
    case 'B': return '#0066b3';
    case 'C': return '#00a651';
    case 'D': return '#fff100';
    case 'E': return '#ffc600';
    case 'F': return '#ff8c00';
    case 'G': return '#e4002b';
    default: return '#cccccc';
  }
}