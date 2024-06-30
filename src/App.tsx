import { useState } from "react";
import { CodeEditor } from "./components/CodeEditor";

import SunIcon from "./assets/sun.png";
import MoonIcon from "./assets/moon.png";

function App() {
  const [isDarkMode, setDarkMode] = useState(true);

  const toggleMode = () => {
    setDarkMode((dark) => !dark);
  };

  return (
    <div
      className={`h-screen w-full transition-all duration-400 ${
        isDarkMode ? "bg-slate-900" : "bg-slate-100"
      }`}
    >
      <div className="flex flex-col items-center p-10">
        <div className="flex flex-row items-center justify-center gap-3">
          <h1
            className={` text-4xl font-bold text-center ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Welcome👋 To My Code Editor
          </h1>
          <div
            className="cursor-pointer transition-all pt-1 duration-700 h-10 w-10"
            onClick={toggleMode}
          >
            <img alt="mode" src={isDarkMode ? SunIcon : MoonIcon} />
          </div>
        </div>
        <CodeEditor isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

export default App;
