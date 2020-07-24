// A hook to make sliders and number work correctly with the state

import { useEffect, useRef } from 'react';

const usePararmeterRef = (parameterName) => {
  // Store the current slider/number values with useRef, so that the slider event handlers can access the current state
  // --- Create a Ref with the initial state (from a prop/context)
  const updatedRef = useRef(parameterName.scaledValue);
  // Create a function to update the Ref. It is passed our updated value
  const setUpdatedValue = (updatedValue) => {
    updatedRef.current = updatedValue;
  };
  // --- Run the update function (and pass it the updated value) when the state changes
  useEffect(() => {
    setUpdatedValue(parameterName.scaledValue);
  }, [parameterName]);
};

export default usePararmeterRef;
