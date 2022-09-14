import React from "react";
import { Video } from "components/Video";

export default {
   title: "ui-components/Video",
   component: Video,
};

const Template = (args) => <Video {...args} />;

export const Default = Template.bind({});

Default.args = {
   url: "https://storage.googleapis.com/cedoc360extencion/a_english_multimedia/a1/module_1/videos/a1m1a-ae_vid_1.mp4",
   width: "600",
   description: {
      title: "Video 1",
      content: "Video de prueba",
   },
};

Default.storyName = "default";
