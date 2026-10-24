import React from "react";
import { Button as UiButton } from "./ui/button";

const Button = ({ styles, text, icon, ...props }) => (
  <UiButton
    type="button"
    className={`h-auto py-3 px-4 bg-blue-gradient font-poppins font-medium text-[12px] text-primary rounded ${styles ?? ""}`}
    {...props}
  >
    {icon && React.createElement(icon)}
    {text}
  </UiButton>
);

export default Button;
