import { useState } from "react";
import { CodeEditor } from "./components/CodeEditor";
import { INITIAL_CODE } from "./utils/constants/data";

function App() {
  const [code, setCode] = useState<string>(INITIAL_CODE);
  const [language, setLanguage] = useState<string>("javascript");

  return (
    <div className="bg-slate-900 h-screen w-full max-w-full">
      <div className="flex flex-col items-center p-10">
        <h1 className="text-white text-4xl font-bold">
          Welcome👋 To My Code Editor
        </h1>
        <CodeEditor onChange={setCode} code={code} />
      </div>
    </div>
  );
}

export default App;
