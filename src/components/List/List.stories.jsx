import { Icon } from "components/Icon/Icon";
import { React } from "react";

import { List } from "./List";
import { ListItem } from "./ListItem";
import { OrderedList } from "./OrderList";
import { UnorderedList } from "./UnorderList";

export default {
   title: "ui-components/List",
   components: List,
   decorators: [
      (story) => (
         <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ minWidth: "30vw", maxWidth: "35vw" }}>{story()}</div>
         </div>
      ),
   ],
};

export const Ordered = () => (
   <OrderedList>
      <ListItem>Lorem ipsum dolor sit amet consectetur adipisicing elit.</ListItem>
      <ListItem>Lorem ipsum dolor sit amet consectetur adipisicing elit.</ListItem>
      <ListItem>Lorem ipsum dolor sit amet consectetur adipisicing elit.</ListItem>
   </OrderedList>
);
Ordered.storyName = "ordered";

export const Unordered = () => (
   <UnorderedList>
      <ListItem>Lorem ipsum dolor sit amet consectetur adipisicing elit.</ListItem>
      <ListItem>Lorem ipsum dolor sit amet consectetur adipisicing elit.</ListItem>
      <ListItem>Lorem ipsum dolor sit amet consectetur adipisicing elit.</ListItem>
   </UnorderedList>
);
Unordered.storyName = "unordered";

export const Unstyle = () => (
   <List>
      <ListItem>Lorem ipsum dolor sit amet consectetur adipisicing elit.</ListItem>
      <ListItem>Lorem ipsum dolor sit amet consectetur adipisicing elit.</ListItem>
      <ListItem>Lorem ipsum dolor sit amet consectetur adipisicing elit.</ListItem>
   </List>
);
Unstyle.storyName = "unstyle";

export const UnstyleWithIcon = () => (
   <List>
      <ListItem>
         <Icon name="close" />
         Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </ListItem>
      <ListItem>
         <Icon name="check" />
         Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </ListItem>
      <ListItem>
         <Icon name="play" />
         Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </ListItem>
   </List>
);
UnstyleWithIcon.storyName = "unstyle with icon";
