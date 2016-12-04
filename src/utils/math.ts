export function toRadians(degrees: number): number {
  return degrees * Math.PI / 180;
}

export function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

export function hypot(a: number, b: number): number {
  return Math.sqrt(a * a + b * b);
}

export function pow2(n: number): number {
  return n * n;
}

export function pow7(n: number): number {
  return n * n * n * n * n * n * n;
}
