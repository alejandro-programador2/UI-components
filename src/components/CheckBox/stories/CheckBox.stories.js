import React from "react";

import { CheckBox } from "components/CheckBox";

export default {
   title: "ui-components/CheckBox",
   component: CheckBox,
};

const Template = (args) => <CheckBox {...args} />;

export const radio = Template.bind({});

radio.storyName = "radio";
radio.args = {
   label: "Opción 1",
   type: "radio",
   state: "normal",
   name: "option1",
};

export const checkbox = Template.bind({});

checkbox.storyName = "checkbox";
checkbox.args = {
   label: "Opción 1",
   type: "checkbox",
   state: "normal",
   name: "option1",
};
