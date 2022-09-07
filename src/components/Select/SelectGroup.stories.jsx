import React from "react";

import { SelectGroup } from "./SelectGroup";
import { Select } from "./Select";

export default {
   title: "ui-components/SelectGroup",
   component: SelectGroup,
   decorators: [
      (story) => (
         <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ minWidth: "30vw", maxWidth: "35vw" }}>{story()}</div>
         </div>
      ),
   ],
};

export const DefaultSelectGroup = (args) => (
   <SelectGroup {...args}>
      <Select addClass="u-my-4">
         <optgroup label="Lorem, ipsum">
            <option value={1}>Lorem, ipsum dolor.</option>
            <option value={2}>Lorem, ipsum dolor.</option>
            <option value={3}>Lorem, ipsum dolor.</option>
         </optgroup>
      </Select>
      <Select>
         <optgroup label="Lorem, ipsum">
            <option value={1}>Lorem, ipsum dolor.</option>
            <option value={2}>Lorem, ipsum dolor.</option>
            <option value={3}>Lorem, ipsum dolor.</option>
         </optgroup>
      </Select>
   </SelectGroup>
);

DefaultSelectGroup.storyName = "default";
