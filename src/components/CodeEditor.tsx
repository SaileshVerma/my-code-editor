import React, { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import { Highlight } from "prism-react-renderer";

import { ThemeBundlesList } from "../utils/constants/themes_list";
import { LanguageBundlesList } from "../utils/constants/languages_list";
import { getThemeObject } from "../utils/helpers/get_theme_on_value";
import { EditorHeaderComponent } from "./EditorHeader";

export const CodeEditor = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const codeRef = useRef<HTMLTextAreaElement>(null);

  const [currentLanguage, setCurrentLanguage] = useState(
    LanguageBundlesList[0]
  );

  const [code, setCode] = useState<string>(
    currentLanguage.initialHelloWorldCode
  );

  const [isFullScreen, setIsFullScreen] = useState(false);

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
      className={`flex flex-col pt-8 transition-all duration-400 ${
        isFullScreen ? "h-full w-full" : "h-1/2 w-1/2"
      }`}
    >
      <EditorHeaderComponent
        code={code}
        isDarkMode={isDarkMode}
        currentLanguage={currentLanguage}
        isFullScreen={isFullScreen}
        fullScreenHandler={fullScreenHandler}
        setCurrentTheme={setCurrentTheme}
        setCode={setCode}
        setCurrentLanguage={setCurrentLanguage}
      />
      <div className="relative">
        <textarea
          className={`absolute transition-all duration-500 ${
            isFullScreen ? "h-64 lg:h-96" : "h-64"
          } z-10 w-full p-4 bg-transparent select-none text-transparent  caret-white font-mono focus:outline-none focus:border-gray-400 resize-none border border-gray-700  rounded-b overflow-hidden`}
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
              } z-2 w-full p-4 ${
                isDarkMode ? "bg-gray-800" : "bg-gray-200"
              }  font-mono border select-none border-gray-700 rounded-b overflow-hidden`}
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
