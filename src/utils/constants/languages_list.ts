import { INITIAL_CODE } from "./data";

export interface LanguageBundle {
  language: string;
  code: string;
  initialHelloWorldCode: string;
}

export const LanguageBundlesList: LanguageBundle[] = [
  {
    language: "JSX",
    code: "jsx",
    initialHelloWorldCode: `${INITIAL_CODE + 'console.log("Hello World!")'}`,
  },
  {
    language: "TSX",
    code: "tsx",
    initialHelloWorldCode: `${INITIAL_CODE + 'console.log("Hello World!")'}`,
  },
  {
    language: "Swift",
    code: "swift",
    initialHelloWorldCode: `${INITIAL_CODE + 'print("Hello World!")'}`,
  },
  {
    language: "Kotlin",
    code: "kotlin",
    initialHelloWorldCode: `${
      INITIAL_CODE + "fun main(args : Array<String>) { println('Hello World!')}"
    }`,
  },
  {
    language: "Objective-C",
    code: "objectivec",
    initialHelloWorldCode: `${
      INITIAL_CODE +
      'int main(int argc, const char * argv[]) { @autoreleasepool {NSLog(@"Hello, World!");} return 0;}'
    }`,
  },
  {
    language: "Rust",
    code: "rust",
    initialHelloWorldCode: `${
      INITIAL_CODE + 'fn main() {println!("Hello World!");}'
    }`,
  },
  {
    language: "GraphQL",
    code: "graphql",
    initialHelloWorldCode: `${INITIAL_CODE + "type Query {hello: String!}"}`,
  },
  {
    language: "Yaml",
    code: "yaml",
    initialHelloWorldCode: `${
      INITIAL_CODE +
      "metadata: name: helloworld labels: app: helloworld service: helloworld"
    }`,
  },
  {
    language: "GO",
    code: "go",
    initialHelloWorldCode: `${
      INITIAL_CODE + 'func main() {fmt.Println("hello world")}'
    }`,
  },
  {
    language: "C++",
    code: "cpp",
    initialHelloWorldCode: `${INITIAL_CODE + 'std::cout<<("Hello World!")'}`,
  },
  {
    language: "Python",
    code: "python",
    initialHelloWorldCode: `${INITIAL_CODE + 'print("Hello World!")'}`,
  },
];
