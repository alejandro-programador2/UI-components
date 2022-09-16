import React from "react";

import { NumberInput, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper } from "components/NumberInput";

export default {
   title: "ui-components/NumberInput",
   component: NumberInput,
   decorators: [
      (story) => (
         <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ minWidth: "30vw", maxWidth: "35vw" }}>{story()}</div>
         </div>
      ),
   ],
};

export const Default = () => (
   <NumberInput>
      <NumberInputField />
      <NumberInputStepper>
         <NumberIncrementStepper />
         <NumberDecrementStepper />
      </NumberInputStepper>
   </NumberInput>
);

Default.storyName = "default";

export const controlled = () => (
   <NumberInput max={10} min={5} defaultValue={5} keepWithinRange>
      <NumberInputField />
      <NumberInputStepper>
         <NumberIncrementStepper />
         <NumberDecrementStepper />
      </NumberInputStepper>
   </NumberInput>
);

controlled.storyName = "keep with in a range";

export const withIcon = () => (
   <NumberInput max={10} min={5} defaultValue={5} keepWithinRange>
      <NumberInputField />
      <NumberInputStepper>
         <NumberIncrementStepper>🌞</NumberIncrementStepper>
         <NumberDecrementStepper>🌚</NumberDecrementStepper>
      </NumberInputStepper>
   </NumberInput>
);

withIcon.storyName = "with other icon";
