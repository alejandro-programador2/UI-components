import React from "react";

import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from "components/Accordion";
import { Icon } from "components/Icon";

export default {
   title: "ui-components/Accordion",
   component: Accordion,
   decorators: [
      (story) => (
         <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ minWidth: "30vw", maxWidth: "35vw" }}>{story()}</div>
         </div>
      ),
   ],
};

const lorem =
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const Template = (args) => (
   <Accordion {...args}>
      <AccordionItem>
         <AccordionButton>Section 1 title</AccordionButton>
         <AccordionPanel>
            <p>{lorem}</p>
         </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
         <AccordionButton>Section 2 title</AccordionButton>
         <AccordionPanel>
            <p>{lorem}</p>
         </AccordionPanel>
      </AccordionItem>
   </Accordion>
);

const TemplateAccordionButton = (args) => (
   <Accordion>
      <AccordionItem>
         <AccordionButton {...args}>Section</AccordionButton>
         <AccordionPanel>
            <p>{lorem}</p>
         </AccordionPanel>
      </AccordionItem>
   </Accordion>
);

export const Default = Template.bind({});

Default.storyName = "default";
Default.args = {
   defaultIndex: 0,
};

export const AllowMultiple = Template.bind({});

AllowMultiple.storyName = "allow multiple";
AllowMultiple.args = {
   allowMultiple: true,
   defaultIndex: [0],
};

export const StylingExpanded = TemplateAccordionButton.bind({});

StylingExpanded.storyName = "styling expanded state";
StylingExpanded.args = {
   expanded: "u-bg-success-300",
};

export const WithRenderIcon = TemplateAccordionButton.bind({});

WithRenderIcon.storyName = "using render prop with icon";
WithRenderIcon.args = {
   icon: function (isExpanded) {
      return isExpanded ? <Icon name="check" /> : <Icon name="close" />;
   },
};
