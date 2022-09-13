import React from "react";
import { Video } from "./Video";

export default {
   title: "ui-components/Video",
   component: Video,
};

const Template = (args) => <Video {...args} />;

export const baseVideo = Template.bind({});

baseVideo.args = {
   url: "https://storage.googleapis.com/cedoc360extencion/a_english_multimedia/a1/module_1/videos/a1m1a-ae_vid_1.mp4",
   width: "600",
   addClass: "prb",
   description: {
      title: "Video 1",
      content: "Video de prueba",
   },
};
