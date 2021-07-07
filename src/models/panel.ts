import color from "randomcolor";
import nanoid from "./id";

export type PanelModel = {
  id: string;
  type: "panel";
  title: string;
  background: string;
};

export function createPanel(title: string): PanelModel {
  return {
    id: nanoid(),
    type: "panel",
    title,
    background: color({ luminosity: "light" }),
  };
}
