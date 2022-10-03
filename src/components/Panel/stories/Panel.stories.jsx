import React from "react";

import { Col } from "components/Col";
import { Row } from "components/Row";
import { Button } from "components/Button";

import { Panel, Section, NavSection, ButtonSection } from "components/Panel";

export default {
   title: "ui-components/Panel",
   component: Panel,
   decorators: [
      (story) => (
         <Row display="flex" justify-content="center" align-items="center">
            <Col xs="11" mm="10" md="9" lg="7" hd="6">
               <Row display="flex" justify-content="center" align-items="center" addClass="u-my-5" style={{ gap: "1rem" }}>
                  {story()}
               </Row>
            </Col>
         </Row>
      ),
   ],
};

export const Default = () => (
   <Panel>
      <NavSection />

      <Section>First section 1️⃣</Section>
      <Section>Second section 2️⃣</Section>
      <Section>Third section 3️⃣</Section>
      <Section>Fourth section 4️⃣</Section>
   </Panel>
);

Default.storyName = "default";

export const WithButton = () => (
   <Panel>
      <NavSection showNextButton showPrevButton />

      <Section>First section 1️⃣</Section>
      <Section>Second section 2️⃣</Section>
      <Section>Third section 3️⃣</Section>
      <Section>Fourth section 4️⃣</Section>
   </Panel>
);

WithButton.storyName = "with buttons";

export const WithDefautlIndex = () => (
   <Panel defaultIndex={3}>
      <NavSection />

      <Section>First section 1️⃣</Section>
      <Section>Second section 2️⃣</Section>
      <Section>Third section 3️⃣</Section>
      <Section>Fourth section 4️⃣</Section>
   </Panel>
);

WithDefautlIndex.storyName = "with default index";

export const WithButtonSection = () => (
   <Panel>
      <NavSection />

      <Section>
         First section 1️⃣
         <ButtonSection section={2}>
            <Button
               label="Go to the second section"
               addClass="u-my-4"
               size="small"
               icon={{
                  name: "navigate_next",
                  position: "right",
               }}
               style={{ borderRadius: "0.375rem" }}
            />
         </ButtonSection>
      </Section>

      <Section>Second section 2️⃣</Section>
      <Section>
         Third section 3️⃣
         <ButtonSection section={1}>
            <Button
               label="Go to the first section"
               addClass="u-my-4"
               size="small"
               icon={{
                  name: "navigate_before",
                  position: "left",
               }}
               style={{ borderRadius: "0.375rem" }}
            />
         </ButtonSection>
      </Section>
      <Section>Fourth section 4️⃣</Section>
   </Panel>
);

WithButtonSection.storyName = "with button section";
