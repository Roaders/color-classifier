const HEX_SHORT = /^#([a-fA-F0-9]{3})$/;
const HEX = /^#([a-fA-F0-9]{6})$/;

function roundColors<T>(colors: T, round: boolean): T {
  if (!round) return colors;

  const output = {};
  for (let key in colors) {
    output[key] = Math.round(colors[key]);
  }
  return <T>output;
}

function hasProp(obj: any, key: string): boolean {
  return obj.hasOwnProperty(key);
}

function isRgb(obj: any): boolean {
  return hasProp(obj, "red") && hasProp(obj, "green") && hasProp(obj, "blue");
}

export interface IRGBColor{
  red: number;
  green: number;
  blue: number;
}

export interface IHSVColor{
  value: number;
  hue: number;
  saturation: number;
}

export interface IXYZColor{
  x: number;
  y: number;
  z: number;
}

export interface ILABColor{
  l: number;
  a: number;
  b: number;
}

export class Color {
  static normalizeHex(hex: string): string {
    if (HEX.test(hex)) {
      return hex;

    } else if (HEX_SHORT.test(hex)) {
      const r = hex.slice(1, 2);
      const g = hex.slice(2, 3);
      const b = hex.slice(3, 4);
      return `#${r + r}${g + g}${b + b}`;
    }

    return null;
  }

  static hexToRgb(hex: string): IRGBColor {
    const normalizedHex = this.normalizeHex(hex);

    if (normalizedHex == null) {
      return null;
    }

    const m = normalizedHex.match(HEX);
    const i = parseInt(m[1], 16);
    const red = (i >> 16) & 0xFF;
    const green = (i >> 8) & 0xFF;
    const blue = i & 0xFF;

    return { red, green, blue };
  }

  static rgbToHex(rgb: IRGBColor): string {
    const { red, green, blue} = rgb;
    const i = ((Math.round(red) & 0xFF) << 16) + ((Math.round(green) & 0xFF) << 8) + (Math.round(blue) & 0xFF);
    const s = i.toString(16).toLowerCase();
    return `#${"000000".substring(s.length) + s}`;
  }

  static rgbToHsv(rgb: IRGBColor, round = true): IHSVColor {
    const { red, green, blue } = rgb;
    const min = Math.min(red, green, blue);
    const max = Math.max(red, green, blue);
    const delta = max - min;
    const hsv: IHSVColor = <any>{};

    if (max === 0) {
      hsv.saturation = 0;
    } else {
      hsv.saturation = (delta / max * 1000) / 10;
    }

    if (max === min) {
      hsv.hue = 0;
    } else if (red === max) {
      hsv.hue = (green - blue) / delta;
    } else if (green === max) {
      hsv.hue = 2 + (blue - red) / delta;
    } else {
      hsv.hue = 4 + (red - green) / delta;
    }

    hsv.hue = Math.min(hsv.hue * 60, 360);
    hsv.hue = hsv.hue < 0 ? hsv.hue + 360 : hsv.hue;

    hsv.value = ((max / 255) * 1000) / 10;

    return roundColors(hsv, round);
  }

  static rgbToXyz(rgb: IRGBColor, round = true): IXYZColor {
    const red = rgb.red / 255;
    const green = rgb.green / 255;
    const blue = rgb.blue / 255;

    const rr = red > 0.04045 ? Math.pow(((red + 0.055) / 1.055), 2.4) : red / 12.92;
    const gg = green > 0.04045 ? Math.pow(((green + 0.055) / 1.055), 2.4) : green / 12.92;
    const bb = blue > 0.04045 ? Math.pow(((blue + 0.055) / 1.055), 2.4) : blue / 12.92;

    const x = (rr * 0.4124 + gg * 0.3576 + bb * 0.1805) * 100;
    const y = (rr * 0.2126 + gg * 0.7152 + bb * 0.0722) * 100;
    const z = (rr * 0.0193 + gg * 0.1192 + bb * 0.9505) * 100;

    const xyz = {x, y, z};

    return roundColors(xyz, round);
  }

  static rgbToLab(rgb: IRGBColor, round = true): ILABColor {
    const xyz = Color.rgbToXyz(rgb, false);
    let { x, y, z } = xyz;

    x /= 95.047;
    y /= 100;
    z /= 108.883;

    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

    const l = (116 * y) - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);

    return roundColors({ l, a, b }, round);
  }

  constructor(value) {
    this._original = value;

    if (isRgb(value)) {
      this._rgb = value;
      this._hex = Color.rgbToHex(value);

    } else {
      this._hex = Color.normalizeHex(value);
      this._rgb = Color.hexToRgb(this._hex);
    }

    this._hsv = Color.rgbToHsv(this._rgb);
  }

  private _original: any;

  public get original(): any{
    return this._original;
  }

  private _rgb: IRGBColor;

  public get rgb(): IRGBColor{
    return this._rgb;
  }

  private _hex: string;

  public get hex(): string{
    return this._hex;
  }

  private _hsv: IHSVColor

  public get hsv(): IHSVColor{
    return this._hsv;
  }
}
