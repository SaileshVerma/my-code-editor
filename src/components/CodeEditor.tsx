import React, { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import { Highlight, themes } from "prism-react-renderer";
import CopyIcon from "../assets/copy.png";
import ExpandIcon from "../assets/expand.png";
import ResizeScreenIcon from "../assets/small.png";
import ResetIcon from "../assets/restart.png";
import { ThemeBundlesList } from "../utils/constants/themes_list";
import {
  LanguageBundle,
  LanguageBundlesList,
} from "../utils/constants/languages_list";
import { getThemeObject } from "../utils/helpers/get_theme_on_value";
import { INITIAL_CODE } from "../utils/constants/data";

export const CodeEditor = () => {
  const codeRef = useRef<HTMLTextAreaElement>(null);

  const [currentLanguage, setCurrentLanguage] = useState(
    LanguageBundlesList[0]
  );
  const [code, setCode] = useState<string>(
    currentLanguage.initialHelloWorldCode
  );

  const [isCopied, setIsCopied] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(true);

  const handleCopyState = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    });
  };

  const fullScreenHandler = () => {
    setIsFullScreen((full) => !full);
  };

  const [currentTheme, setCurrentTheme] = useState(ThemeBundlesList[0]);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
    setCode(currentLanguage.initialHelloWorldCode);
  }, [currentLanguage]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  return (
    <div
      className={`flex flex-col pt-8 transition-all duration-500 ${
        isFullScreen ? "h-full w-full" : "h-1/2 w-1/2"
      }`}
    >
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
                setCode(INITIAL_CODE);
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
      <div className="relative">
        <textarea
          className={`absolute transition-all duration-500 ${
            isFullScreen ? "h-64 lg:h-96" : "h-64"
          } z-10 w-full p-4 bg-transparent text-transparent caret-white font-mono focus:outline-none focus:border-gray-400 resize-none border border-gray-700  rounded-b overflow-y-scroll`}
          // ref={codeRef}
          value={code}
          onChange={handleInputChange}
        />

        {/* <textarea> */}
        <Highlight
          theme={getThemeObject(currentTheme)}
          code={code}
          language={currentLanguage.code}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <div
              className={`absolute  transition-all duration-500 ${
                isFullScreen ? "h-64 lg:h-96" : "h-64"
              } z-2 w-full p-4 bg-gray-800 font-mono border border-gray-700 rounded-b overflow-y-scroll`}
            >
              {tokens.map((line, i) => {
                return (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => {
                      return <span key={key} {...getTokenProps({ token })} />;
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </Highlight>
      </div>
    </div>
  );
};

const LanguageDropDown = ({
  onSelectLanguage,
}: {
  onSelectLanguage: (selectedLanguage: LanguageBundle) => void;
}) => {
  const languageChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onSelectLanguage(
      LanguageBundlesList.find((o) => o.code == event.target.value) ??
        LanguageBundlesList[0]
    );
  };

  return (
    <select
      className="bg-gray-700 w-2 lg:w-full px-2 py-1 text-white rounded"
      onChange={languageChangeHandler}
    >
      {LanguageBundlesList.map((val, index) => {
        return (
          <option key={index} value={val.code}>
            {val.language}
          </option>
        );
      })}
    </select>
  );
};

const ThemeDropDown = ({
  onUpdateTheme,
}: {
  onUpdateTheme: (theme: string) => void;
}) => {
  const themeChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateTheme(event.target.value);
  };

  return (
    <select
      onChange={themeChangeHandler}
      className="bg-gray-700  w-2 lg:w-full px-2 py-1 text-white rounded"
    >
      {ThemeBundlesList.map((val, index) => {
        return (
          <option key={index} value={val}>
            {val}
          </option>
        );
      })}
    </select>
  );
};
