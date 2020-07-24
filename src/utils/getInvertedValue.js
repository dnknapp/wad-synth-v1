// A hook to turn number input values into non-linear slider positions
import { scalePow } from 'd3-scale';
export let invertedValue;
export default function getInvertedValue(min, max, value, exponent) {
  let newSliderScale = scalePow()
    .range([min, max])
    .domain([min, max])
    .exponent(exponent);
  return (invertedValue = newSliderScale.invert(value));
}
