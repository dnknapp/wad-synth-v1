// A hook to make sliders non-linear
// Ex. a slider with an exponent value of 2 or 3 gives more detail to lower numbers
import { scalePow } from 'd3-scale';
export let d3ScaledValue;
export default function getScaledValue(min, max, value, exponent) {
  let newSliderScale = scalePow()
    .range([min, max])
    .domain([min, max])
    .exponent(exponent);
  return (d3ScaledValue = newSliderScale(value));
}
