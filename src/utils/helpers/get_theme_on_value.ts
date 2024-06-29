import { themes } from "prism-react-renderer";

export const getThemeObject = (themeName: string) => {
  switch (themeName) {
    case "Dracula":
      return themes.dracula;
    case "DuotoneDark":
      return themes.duotoneDark;
    case "DuotoneLight":
      return themes.duotoneLight;
    case "Github":
      return themes.github;
    case "JettwaveDark":
      return themes.jettwaveDark;
    case "JettwaveLight":
      return themes.jettwaveLight;
    case "NightOwl":
      return themes.nightOwl;
    case "NightOwlLight":
      return themes.nightOwlLight;
    case "OceanicNext":
      return themes.oceanicNext;
    case "Okaidia":
      return themes.okaidia;
    case "OneDark":
      return themes.oneDark;
    case "OneLight":
      return themes.oneLight;
    case "Palenight":
      return themes.palenight;
    case "ShadesOfPurple":
      return themes.shadesOfPurple;
    case "Synthwave84":
      return themes.synthwave84;
    case "Ultramin":
      return themes.ultramin;
    case "VSDark":
      return themes.vsDark;
    case "VSLight":
      return themes.vsLight;
    default:
      return themes.dracula; // Default to Dracula theme if not found
  }
};
