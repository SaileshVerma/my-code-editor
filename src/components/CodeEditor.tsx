import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import { Highlight, themes } from "prism-react-renderer";
import CopyIcon from "../assets/copy.png";
import ResetIcon from "../assets/restart.png";
import { ThemeBundlesList } from "../utils/constants/themes_list";
import {
  LanguageBundle,
  LanguageBundlesList,
} from "../utils/constants/languages_list";
import { getThemeObject } from "../utils/helpers/get_theme_on_value";
import { INITIAL_CODE } from "../utils/constants/data";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

export const CodeEditor = ({ code, onChange }: CodeEditorProps) => {
  const codeRef = useRef<HTMLTextAreaElement>(null);
  const [currentLanguage, setCurrentLanguage] = useState(
    LanguageBundlesList[0]
  );

  let initialCode = code;

  const [currentTheme, setCurrentTheme] = useState(ThemeBundlesList[0]);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, currentLanguage]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex flex-col h-1/2 w-1/2">
      <div className="bg-gray-600 border rounded-t border-gray-700 p-2 px-4">
        <div className="flex text-white justify-between text-sm">
          <div className="flex gap-6">
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
              onClick={() => {
                onChange(INITIAL_CODE);
              }}
              className="flex gap-2 items-center"
            >
              <p className="font-semibold text-sm">Reset</p>
              <img className="h-5 w-5" alt="reset" src={ResetIcon} />
            </div>
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-sm">Copy</p>
              <img className="h-4 w-4" alt="reset" src={CopyIcon} />
            </div>
            {/* <span>Full SCReen</span> */}
          </div>
        </div>
      </div>
      <div className="relative">
        <textarea
          className="absolute z-10 w-full h-64 p-4 bg-transparent text-transparent caret-white font-mono focus:outline-none focus:border-gray-400 resize-none border border-gray-700  rounded-b overflow-y-scroll"
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
            <div className="absolute z-2 w-full h-64 p-4 bg-gray-800 font-mono border border-gray-700 rounded-b overflow-y-scroll">
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
      className="bg-gray-700 px-2 py-1 text-white rounded"
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
      className="bg-gray-700 px-2 py-1 text-white rounded"
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
