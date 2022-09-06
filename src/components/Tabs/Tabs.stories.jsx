import React from "react";

import { Tabs } from "./Tabs";
import { TabList } from "./TabList";
import { Tab } from "./Tab";
import { TabPanels } from "./TabPanels";
import { TabPanel } from "./TabPanel";

export default {
   title: "ui-components/Tabs",
   component: Tabs,
   decorators: [
      (story) => (
         <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ minWidth: "30vw", maxWidth: "35vw" }}>{story()}</div>
         </div>
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
