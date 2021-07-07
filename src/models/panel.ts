import color from "randomcolor";

export type PanelModel = {
  type: "panel";
  title: string;
  background: string;
};

export function createPanel(title: string): PanelModel {
  return { type: "panel", title, background: color({ luminosity: "light" }) };
}
