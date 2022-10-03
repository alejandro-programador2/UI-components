import React from "react";

import { Col } from "components/Col";
import { Row } from "components/Row";

import { CheckBoxGroup, CheckBox } from "components/CheckBox";

export default {
   title: "ui-components/CheckBoxGroup",
   component: CheckBoxGroup,
   decorators: [
      (story) => (
         <Row justify-content="center" align-items="center">
            <Col xs="11" mm="10" md="9" lg="5" hd="4">
               {story()}
            </Col>
         </Row>
      ),
   ],
};

export const Default = () => (
   <CheckBoxGroup legend="Grupo de prueba">
      <CheckBox type="checkbox" label="Opción 1" state="normal" />
      <CheckBox type="checkbox" label="Opción 2" state="normal" />
      <CheckBox type="checkbox" label="Opción 3" state="normal" />
   </CheckBoxGroup>
);

Default.storyName = "default";
