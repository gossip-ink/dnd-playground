import { NodePlopAPI } from "plop";

export default function (plop: NodePlopAPI): void {
  plop.setGenerator("simple component", {
    description: "create a component without children",
    prompts: [
      {
        type: "input",
        name: "typeName",
        message: "component name, e.g. NiceComponent",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{typeName}}.tsx",
        templateFile: "templates/Component.tsx.hbs",
      },
    ],
  });
  plop.setGenerator("container component", {
    description: "create a component with children",
    prompts: [
      {
        type: "input",
        name: "typeName",
        message: "component name, e.g. NiceComponent",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{typeName}}.tsx",
        templateFile: "templates/Container.tsx.hbs",
      },
    ],
  });
}
