import React from "react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { Button } from "./Button";

export default {
  title: "ui-components/Button",
  component: Button,
  argTypes: {
    size: {
      options: ["small", "normal", "big"],
      control: { type: "radio" },
    },
    variant: {
      options: ["primary", "secondary"],
      control: { type: "radio" },
    },
    hasAriaLabel: {
      options: [true, false],
      control: { type: "boolean" },
    },
    disabled: {
      options: [true, false],
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <Button {...args} />;

export const text = Template.bind({});
text.args = {
  variant: "primary",
  label: "Button",
  size: "normal",
};

export const icon = Template.bind({});
icon.args = {
  variant: "primary",
  label: "Button",
  size: "normal",
  hasAriaLabel: true,
  icon: {
    name: "play",
    size: "big",
  },
};

export const textAndIcon = Template.bind({});
textAndIcon.args = {
  variant: "primary",
  label: "Button",
  size: "normal",
  icon: {
    name: "volume_off",
  },
};

export const interactions = Template.bind({});
interactions.args = {
  ...text.args,
};

interactions.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button"));

  expect(canvas.getByRole("button")).toBe(
    canvas.getByText(interactions.args.label)
  );
};
