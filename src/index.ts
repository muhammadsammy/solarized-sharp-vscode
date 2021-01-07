import * as fs from "fs-extra";
import * as path from "path"; // Tslint:disable-next-line: no-submodule-imports
import {generateTheme, IColorSet} from "@moxer/vscode-theme-generator";
import DarkTheme from "./themes/solarized-sharp-dark";
import DarkerTheme from "./themes/solarized-sharp-darker";

const buildPath: string = path.join(__dirname, "../build");
const themes: any[] = [DarkTheme, DarkerTheme];

// Check if the build folder exist. If not, create it.
if (!fs.existsSync(buildPath)) {
  fs.mkdirSync(buildPath);
}

themes.forEach(theme => {
  const colorSet: IColorSet = {
    semanticHighlighting: true,

    base: {
      // Determines the overall text foreground color
      foreground: theme.ui.uiText,
      // Determines the overall background color
      background: theme.colors.background,
      // Determines boolean, identifier, keyword, storage, and cssClass
      color1: theme.colors.green,
      // Determines string, stringEscape, and cssId
      color2: theme.colors.cyan,
      // Determines function, class, classMember, type, and cssTag
      color3: theme.colors.blue,
      // Determines functionCall and number
      color4: theme.colors.blue,
    },

    syntax: {
      comment: theme.colors.comment,
      cssClass: theme.colors.yellow,
      cssId: theme.colors.orange,
      cssTag: theme.colors.yellow,
      class: theme.colors.yellow,
      function: theme.colors.blue,
      functionCall: theme.colors.blue,
      identifier: theme.colors.green,
      boolean: theme.colors.violet,
      keyword: theme.colors.green,
      otherKeyword: theme.colors.green,
      storage: theme.colors.green,
      string: theme.colors.cyan,
      stringEscape: theme.colors.red,
      type: theme.colors.yellow,
      punctuation: theme.colors.comment.slice(0, -2),
      variable: theme.colors.foreground,
      number: theme.colors.magenta,
    },

    ui: {
      invisibles: "#073642",
      selection: "#073642ad",
    },

    workbench: {
      "editorIndentGuide.activeBackground":
        theme.colors.comment.slice(0, -2) + "96",
      "panel.background": theme.colors.background,
      "editorCursor.background": "#002b36",

      "editorError.foreground": theme.colors.red,
      "editorWarning.foreground": theme.colors.yellow,
      "editorInfo.foreground": theme.colors.foreground + "00",
      "editorInfo.background": "#12495785",
    },

    customTokens: [
      {
        name: "Import keywords",
        scope: [
          "keyword.other.using.cs",
          "keyword.control.import",
          "keyword.control.export",
          "keyword.control.from",
          "keyword.control.as",
          "keyword.other.namespace.cs",
        ],
        settings: {
          foreground: theme.colors.orange,
        },
      },
      {
        name: "C# namespaces",
        scope: "entity.name.type.namespace.cs",
        settings: {
          foreground: theme.colors.yellow,
        },
      },
      {
        name: "Variables",
        scope: ["entity.name.variable", "entity.other.attribute-name"],
        settings: {
          foreground: theme.colors.foreground,
        },
      },
      {
        name: "Razor keywords",
        scope: [
          "keyword.control.razor.directive",
          "keyword.control.cshtml.transition",
        ],
        settings: {
          foreground: theme.colors.orange,
        },
      },
      {
        name: "Html tag name",
        scope: ["entity.name.tag.html"],
        settings: {
          foreground: "#6c71c4",
        },
      },
      {
        name: "Html attribute name",
        scope: "entity.other.attribute-name.html",
        settings: {
          foreground: "#d33682",
        },
      },
      {
        name: "C# doc comment tag name",
        scope: ["entity.name.tag.localname.cs"],
        settings: {
          foreground: "#839496",
        },
      },
      {
        name: "C# doc comment attribute name",
        scope: "entity.other.attribute-name.localname.cs",
        settings: {
          fontStyle: "italic",
        },
      },
      {
        name: "Html tag opening and closing punctutions",
        scope: ["punctuation.definition.tag"],
        settings: {
          foreground: "#586E75",
        },
      },
      {
        name: "Preprocessors",
        scope: ["keyword.preprocessor", "string.unquoted.preprocessor.message"],
        settings: {
          foreground: theme.colors.orange,
          background: theme.colors.red,
          fontStyle: "bold",
        },
      },
      {
        name: "braces",
        scope: ["meta.brace.square", "meta.brace.round"],
        settings: {
          foreground: theme.colors.comment.slice(0, -2),
        },
      },
    ],
  };

  generateTheme(
    theme.name,
    colorSet,
    path.join(__dirname, `../build/${theme.name}.json`),
  );
});
