import React from "react";

import { Pagination, PaginationItem } from "components/Pagination";

export default {
   title: "ui-components/Pagination",
   component: Pagination,
   decorators: [
      (story) => (
         <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ minWidth: "30vw", maxWidth: "35vw" }}>{story()}</div>
         </div>
      ),
   ],
};

export const Default = () => <Pagination count={10} />;

Default.storyName = "default";

export const WithMoreButtons = () => <Pagination count={10} showLastButton showFirstButton />;

WithMoreButtons.storyName = "with more buttons";

export const WithIcon = () => (
   <Pagination
      count={10}
      showLastButton
      showFirstButton
      renderItem={(item) => (
         <PaginationItem {...item} icons={{ previous: "arrow_drop_down", next: "arrow_drop_up", last: "volume_off", first: "volume_on" }} />
      )}
   />
);

WithIcon.storyName = "with other icons";
