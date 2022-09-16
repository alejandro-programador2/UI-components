import React from "react";
import { Video } from "../src/Video";

export default {
   title: "ui-components/Video",
   component: Video,
};

const Template = (args) => <Video {...args} />;

export const baseVideo = Template.bind({});

baseVideo.args = {
   src: {
      video: "https://storage.googleapis.com/cedoc360extencion/a_english_multimedia/a1/module_1/videos/a1m1a-ae_vid_1.mp4",
      caption: "Slide3-video.vtt",
   },
   width: "600",
   description: {
      title: "Video 1",
      content: "Video de prueba",
   },
};
