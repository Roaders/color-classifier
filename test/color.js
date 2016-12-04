"use strict";

var assert = require('power-assert');
var Color = require("../lib/utils/color").Color;


describe("Color", () => {

  describe("hexToRgb()", () => {
    it("should be converted", () => {
      assert.deepStrictEqual(Color.hexToRgb("#ffffff"), {red: 255, green: 255, blue: 255});
      assert.deepStrictEqual(Color.hexToRgb("#993dba"), {red: 153, green: 61,  blue: 186});
      assert.deepStrictEqual(Color.hexToRgb("#52d034"), {red: 82,  green: 208, blue: 52});
      assert.deepStrictEqual(Color.hexToRgb("#000000"), {red: 0,   green: 0,   blue: 0});
      assert.deepStrictEqual(Color.hexToRgb("#fff"),    {red: 255, green: 255, blue: 255});
      assert.deepStrictEqual(Color.hexToRgb("#f00"),    {red: 255, green: 0,   blue: 0}) ;
      assert.deepStrictEqual(Color.hexToRgb("#45f"),    {red: 68,  green: 85,  blue: 255});
      assert.deepStrictEqual(Color.hexToRgb("#000"),    {red: 0,   green: 0,   blue: 0});
    });

    it("should be not parsed", () => {
      assert(Color.hexToRgb("000") === null);
      assert(Color.hexToRgb("#ff") === null);
      assert(Color.hexToRgb("#00tdfc") === null);
      assert(Color.hexToRgb("") === null);
      assert(Color.hexToRgb(null) === null);
      assert(Color.hexToRgb(undefined) === null);
      assert(Color.hexToRgb(undefined) === null);
    });
  });

  describe("rgbToHex()", () => {
    it("should be converted", () => {
      assert(Color.rgbToHex({red: 0, green: 0, blue: 0}) === "#000000");
      assert(Color.rgbToHex({red: 255, green: 0, blue: 0}) === "#ff0000");
      assert(Color.rgbToHex({red: 0, green: 255, blue: 0}) === "#00ff00");
      assert(Color.rgbToHex({red: 0, green: 0, blue: 255}) === "#0000ff");
      assert(Color.rgbToHex({red: 255, green: 255, blue: 255}) === "#ffffff");
    });
  });

  describe("rgbToHsv()", () => {
    it("should be converted", () => {
      assert.deepStrictEqual(Color.rgbToHsv({red: 255, green: 255, blue: 255}), {hue: 0,   saturation: 0,  value: 100});
      assert.deepStrictEqual(Color.rgbToHsv({red: 0,   green: 0,   blue: 0}),   {hue: 0,   saturation: 0,  value: 0});
      assert.deepStrictEqual(Color.rgbToHsv({red: 8,   green: 172, blue: 114}), {hue: 159, saturation: 95, value: 67});
      assert.deepStrictEqual(Color.rgbToHsv({red: 102, green: 163, blue: 30}),  {hue: 88,  saturation: 82, value: 64});
      assert.deepStrictEqual(Color.rgbToHsv({red: 32,  green: 11,  blue: 67}),  {hue: 263, saturation: 84, value: 26});
    });
  });

  describe("rgbToXyz()", () => {
    it("should be converted", () => {
      assert.deepStrictEqual(Color.rgbToXyz({red: 0,   green: 0,    blue: 0}),   {x: 0,  y: 0,   z: 0});
      assert.deepStrictEqual(Color.rgbToXyz({red: 255, green: 255,  blue: 255}), {x: 95, y: 100, z: 109});
      assert.deepStrictEqual(Color.rgbToXyz({red: 92,  green: 191,  blue: 84}),  {x: 25, y: 40,  z: 15});
      assert.deepStrictEqual(Color.rgbToXyz({red: 224, green: 128,  blue: 21}),  {x: 39, y: 31,  z: 5});
      assert.deepStrictEqual(Color.rgbToXyz({red: 120, green: 5,    blue: 90}),  {x: 10, y: 5,   z: 10});
      assert.deepStrictEqual(Color.rgbToXyz({red: 56,  green: 91,   blue: 234}), {x: 20, y: 14,  z: 80});
    });
  });

  describe("rgbToLab()", () => {
    it("should be converted", () => {
      assert.deepStrictEqual(Color.rgbToLab({red: 0,   green: 0,   blue: 0}),   {l: 0,   a: 0,   b: 0});
      assert.deepStrictEqual(Color.rgbToLab({red: 255, green: 255, blue: 255}), {l: 100, a: 0,   b: 0});
      assert.deepStrictEqual(Color.rgbToLab({red: 92,  green: 191, blue: 84}),  {l: 70,  a: -50, b: 45});
      assert.deepStrictEqual(Color.rgbToLab({red: 120, green: 45,  blue: 12}),  {l: 29,  a: 31,  b: 36});
      assert.deepStrictEqual(Color.rgbToLab({red: 32,  green: 99,  blue: 241}), {l: 46,  a: 33,  b: -77});
      assert.deepStrictEqual(Color.rgbToLab({red: 0,   green: 255, blue: 186}), {l: 89,  a: -66, b: 19});
    });
  });

  describe("constructor()", () => {
    it("should create instance", () => {
      const c1 = new Color("#000");
      assert(c1.original === "#000");
      assert(c1.hex === "#000000");
      assert.deepStrictEqual(c1.rgb, {red: 0, green: 0, blue: 0});
      assert.deepStrictEqual(c1.hsv, {hue: 0, saturation: 0, value: 0});

      const c2 = new Color({red: 255, green: 255, blue: 255});
      assert.deepStrictEqual(c2.original, {red: 255, green: 255, blue: 255});
      assert(c2.hex === "#ffffff");
      assert.deepStrictEqual(c2.rgb, {red: 255, green: 255, blue: 255});
      assert.deepStrictEqual(c2.hsv, {hue: 0  , saturation: 0,   value: 100});
    });
  });
});
