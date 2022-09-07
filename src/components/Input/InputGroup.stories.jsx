import { React } from "react";

import { Input } from "./Input";
import { InputGroup } from "./InputGroup";
import { InputStyle } from "./InputStyle";
import { InputLeftAddon } from "./InputLeftAddon";
import { InputRightAddon } from "./inputRightAddon";
import { Icon } from "components/Icon/Icon";

export default {
   title: "ui-components/InputGroup",
   component: InputGroup,
   decorators: [
      (story) => (
         <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ minWidth: "30vw", maxWidth: "35vw" }}>{story()}</div>
         </div>
      ),
   ],
};

export const Default = () => (
   <InputGroup>
      <InputStyle>
         <InputLeftAddon>
            <Icon name="play" />
         </InputLeftAddon>

         <Input placeholder="With addons" addClass="u-mt-3" />

         <InputRightAddon>
            <Icon name="check" />
         </InputRightAddon>
      </InputStyle>

      <InputStyle>
         <Input placeholder="With InputStyle" addClass="u-mt-3" />
      </InputStyle>

      <Input placeholder="Alone" addClass="u-mt-3" />
   </InputGroup>
);

Default.storyName = "default";
