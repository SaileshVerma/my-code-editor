import { CodeEditor } from "./components/CodeEditor";

function App() {
  return (
    <div className="bg-slate-900 h-screen w-full">
      <div className="flex flex-col items-center p-10">
        <h1 className="text-white text-4xl font-bold text-center">
          Welcome👋 To My Code Editor
        </h1>
        <CodeEditor />
      </div>
    </div>
  );
}

export default App;
