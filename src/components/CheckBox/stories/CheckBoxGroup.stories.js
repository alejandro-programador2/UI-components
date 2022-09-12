import React from "react";

import { CheckBoxGroup, CheckBox } from "components/CheckBox";

export default {
   title: "ui-components/CheckBoxGroup",
   component: CheckBoxGroup,
};

export const Default = () => (
   <CheckBoxGroup legend="Grupo de prueba">
      <CheckBox type="checkbox" label="Opción 1" state="normal" />
      <CheckBox type="checkbox" label="Opción 2" state="normal" />
      <CheckBox type="checkbox" label="Opción 3" state="normal" />
   </CheckBoxGroup>
);

Default.storyName = "default";
