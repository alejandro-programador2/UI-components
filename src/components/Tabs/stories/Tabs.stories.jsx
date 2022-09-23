import React from "react";

import { Col } from "components/Col";
import { Row } from "components/Row";

import { Tab, Tabs, TabList, TabPanels, TabPanel } from "components/Tabs";

export default {
   title: "ui-components/Tabs",
   component: Tabs,
   decorators: [
      (story) => (
         <Row display="flex" justify-content="center" align-items="center">
            <Col xs="11" mm="10" md="9" lg="5" hd="4">
               {story()}
            </Col>
         </Row>
      ),
   ],
};

const Template = (args) => (
   <Tabs {...args}>
      <TabList>
         <Tab>One</Tab>
         <Tab>Two</Tab>
         <Tab>Three</Tab>
      </TabList>

      <TabPanels>
         <TabPanel>First panel</TabPanel>
         <TabPanel>Second panel</TabPanel>
         <TabPanel>Third panel</TabPanel>
      </TabPanels>
   </Tabs>
);

const TemplateTab = (args) => (
   <Tabs>
      <TabList>
         <Tab>One</Tab>
         <Tab {...args}>Two</Tab>
         <Tab>Three</Tab>
      </TabList>

      <TabPanels>
         <TabPanel>First panel</TabPanel>
         <TabPanel>Second panel</TabPanel>
         <TabPanel>Third panel</TabPanel>
      </TabPanels>
   </Tabs>
);

export const Default = Template.bind({});

Default.storyName = "default";
Default.args = {
   defaultIndex: 0,
};

export const StylingSelected = TemplateTab.bind({});

StylingSelected.storyName = "styling selected state";
StylingSelected.args = {
   selected: "u-bg-success-300",
};

export const WithRenderIcon = TemplateTab.bind({});

WithRenderIcon.storyName = "using render prop with icon";
WithRenderIcon.args = {
   icon: function (isSelected) {
      return isSelected ? "🥳" : "😥";
   },
};
