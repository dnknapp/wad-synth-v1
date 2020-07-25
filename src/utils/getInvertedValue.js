// A hook to turn number input values into non-linear slider positions
import { scalePow } from 'd3-scale';
export let d3InvertedValue;
export default function getInvertedValue(min, max, value, exponent) {
  let newSliderScale = scalePow()
    .range([min, max])
    .domain([min, max])
    .exponent(exponent);
  return (d3InvertedValue = newSliderScale.invert(value));
}
