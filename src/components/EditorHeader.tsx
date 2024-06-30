import { LanguageDropDown } from "./LanguageDropDownMenu";
import { ThemeDropDown } from "./ThemeDropDownMenu";
import CopyIcon from "../assets/copy.png";
import ExpandIcon from "../assets/expand.png";
import ResizeScreenIcon from "../assets/small.png";
import ResetIcon from "../assets/restart.png";
import { LanguageBundle } from "../utils/constants/languages_list";
import { useState } from "react";

interface EditorHeaderProps {
  code: string;
  isFullScreen: boolean;
  currentLanguage: LanguageBundle;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<LanguageBundle>>;
  fullScreenHandler: () => void;
  setCode: (currentLanguage: string) => void;
  setCurrentTheme: (theme: string) => void;
}

export const EditorHeaderComponent = ({
  code,
  isFullScreen,
  currentLanguage,
  setCurrentLanguage,
  fullScreenHandler,
  setCurrentTheme,
  setCode,
}: EditorHeaderProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyState = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    });
  };

  return (
    <div className="bg-gray-600 border rounded-t border-gray-700 p-2 px-4">
      <div className="flex flex-col-reverse md:flex-row  text-white justify-between text-sm">
        <div className="flex gap-3 md:gap-6 flex-col md:flex-row">
          <div className="flex items-center">
            <span className="font-semibold text-sm text-green-500">
              {" "}
              &lt;/&gt;{" "}
            </span>
            <p className="font-semibold text-sm">Code</p>

            <div className="pl-3">
              <LanguageDropDown onSelectLanguage={setCurrentLanguage} />
            </div>
          </div>

          <div className="flex items-center">
            {/* <span className="font-semibold text-sm text-green-500">
              {" "}
              &lt;/&gt;{" "}
            </span> */}
            <p className="font-semibold text-sm">Theme</p>
            <div className="pl-3">
              <ThemeDropDown onUpdateTheme={setCurrentTheme} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5 hover:cursor-pointer">
          <div
            className="flex gap-2 items-center"
            onClick={() => {
              setCode(currentLanguage.initialHelloWorldCode);
            }}
          >
            {/* <p className="font-semibold text-sm">Reset</p> */}
            <img className="h-5 w-5" alt="reset" src={ResetIcon} />
          </div>
          <div
            className="relative gap-2 items-center hover:cursor-pointer"
            onClick={handleCopyState}
          >
            {isCopied && (
              <div className="absolute bottom-5 left-0 p-1.5 bg-gray-800 text-white text-xs rounded">
                Copied!
              </div>
            )}
            <img className="h-4 w-4" alt="reset" src={CopyIcon} />
          </div>

          <div
            className="flex gap-2 items-center hover:cursor-pointer"
            onClick={fullScreenHandler}
          >
            {/* <p className="font-semibold text-sm">FullScreen</p> */}
            <img
              className="h-4 w-4"
              alt="reset"
              src={isFullScreen ? ResizeScreenIcon : ExpandIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
