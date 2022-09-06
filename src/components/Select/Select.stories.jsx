import { React } from "react";

import { Select } from "./Select";

export default {
   title: "ui-components/Select",
   component: Select,
   decorators: [
      (story) => (
         <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ minWidth: "30vw", maxWidth: "35vw" }}>{story()}</div>
         </div>
      ),
   ],
};

const Template = (args) => (
   <Select {...args}>
      <option value={1}>Lorem, ipsum dolor.</option>
      <option value={2}>Lorem, ipsum dolor.</option>
      <option value={3}>Lorem, ipsum dolor.</option>
   </Select>
);

export const Default = Template.bind({});

Default.storyName = "default";

export const Disabled = Template.bind({});

Disabled.storyName = "disabled state";
Disabled.args = {
   isDisabled: true,
};

export const WithOtherIcon = Template.bind({});

WithOtherIcon.storyName = "with other icon";
WithOtherIcon.args = {
   icon: "check",
};

export const WithVisibleLabel = Template.bind({});

WithVisibleLabel.storyName = "with visible label";
WithVisibleLabel.args = {
   isLabelVisible: true,
};
