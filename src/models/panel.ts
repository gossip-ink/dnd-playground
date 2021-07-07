export type PanelModel = {
  type: "panel";
  title: string;
};

export function createPanel(title: string): PanelModel {
  return { type: "panel", title };
}
