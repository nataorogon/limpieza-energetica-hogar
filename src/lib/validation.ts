export function isValidNombre(value: string): boolean {
  return value.trim().length >= 2;
}

export function isValidCiudad(value: string): boolean {
  return value.trim().length >= 2;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/** Opcional: válido si está vacío o parece un número telefónico. */
export function isValidWhatsapp(value: string): boolean {
  const v = value.trim();
  return v === "" || /^\+?[\d\s-]{7,15}$/.test(v);
}
