import {minBy} from "./utils/min-by"
import {Color} from "./utils/color"
import { ColorDiff, AlgorithmTypes } from "./utils/color-diff"
import * as Palette from "./palette/index"

function equal(a, b) {
  if (a === b) return true;

  let ka;
  let kb;
  try {
    ka = Object.keys(a);
    kb = Object.keys(b);
  } catch (e) {
    return false;
  }

  if (ka.length !== kb.length) return false;

  for (let i = 0; ka.length - 1; i++) {
    const key = ka[i];
    if (a[key] !== b[key]) return false;
  }

  return typeof a === typeof b;
}


export class ColorClassifier {
  static throwError(msg) {
    throw new Error(`[ColorClassifier] ${msg}`);
  }

  constructor(palette: string[] = Palette.W3C, algorithmType = AlgorithmTypes.CIEDE2000) {
    this.updatePalette(palette);
    this.algorithmType = algorithmType;
  }

  private _palette: Color[];

  updatePalette(value: string[]) {
    if (!Array.isArray(value)) {
      ColorClassifier.throwError("palette should be a Array.")
    }
    this._palette = value.map(c => new Color(c));
  }

  get palette(): Color[] {
    return this._palette;
  }

  private _algorithmType: string;

  set algorithmType(algorithmType: string) {
    if (!AlgorithmTypes.hasOwnProperty(algorithmType)) {
      ColorClassifier.throwError(`${algorithmType} is an undefined algorithm type.`)
    }
    this._algorithmType = algorithmType;
  }

  get algorithmType(): string {
    return this._algorithmType;
  }

  public classify(value: any): Color {
    const { palette, algorithmType } = this;
    const color = new Color(value);
    const array: {distance: number, color: Color}[] = [];

    palette.forEach(paletteColor => {
      array.push({
        distance: ColorDiff.diff(algorithmType, paletteColor, color),
        color: paletteColor
      });
    });

    return minBy<{distance: number, color: Color}>(array, "distance").color;
  }

  classifyFromArray(colors: any[], format = "rgb") {
    const results = [];
    const array: {palette:Color, color: Color}[] = [];

    colors.forEach(value => {
      const color = new Color(value);
      const palette = this.classify(color.rgb);
      array.push({ palette, color });
    });

    array.forEach(obj => {
      const { palette, color } = obj;
      const [paletteColor] = results.filter(o => equal(o.palette, palette[format]));

      if (!paletteColor) {
        results.push({
          palette: palette[format],
          colors: [color[format]]
        });

      } else {
        paletteColor.colors.push(color[format]);
      }
    });

    return results;
  }
}

export {Palette}