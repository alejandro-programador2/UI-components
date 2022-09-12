import React from "react";

import { Input, InputStyle, InputLeftAddon, InputRightAddon } from "components/Input";
import { Icon } from "components/Icon";

export default {
   title: "ui-components/Input",
   component: Input,
   decorators: [
      (story) => (
         <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ minWidth: "30vw", maxWidth: "35vw" }}>{story()}</div>
         </div>
      ),
   ],
};

export const Default = () => <Input />;

Default.storyName = "default";

export const WithLeftAddon = () => (
   <InputStyle>
      <InputLeftAddon>
         <Icon name="check" />
      </InputLeftAddon>
      <Input placeholder="welcome" />
   </InputStyle>
);

WithLeftAddon.storyName = "with left addon";

export const WithRightAddon = () => (
   <InputStyle>
      <Input placeholder="welcome" />
      <InputRightAddon>
         <Icon name="check" />
      </InputRightAddon>
   </InputStyle>
);

WithRightAddon.storyName = "with right addon";

export const AllAddon = () => (
   <InputStyle>
      <InputLeftAddon>
         <Icon name="play" />
      </InputLeftAddon>
      <Input placeholder="welcome" />
      <InputRightAddon>
         <Icon name="check" />
      </InputRightAddon>
   </InputStyle>
);

AllAddon.storyName = "with left and right addon";
