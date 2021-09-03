import './App.css';
import { useBlocklyWorkspace } from 'react-blockly';
import { useRef } from 'react'

function App() {

  const toolboxCategories = {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "Logic",
        colour: "#5C81A6",
        contents: [
          {
            kind: "block",
            type: "controls_if",
          },
          {
            kind: "block",
            type: "logic_compare",
          },
        ],
      },
      {
        kind: "category",
        name: "Math",
        colour: "#5CA65C",
        contents: [
          {
            kind: "block",
            type: "math_round",
          },
          {
            kind: "block",
            type: "math_number",
          },
        ],
      },
      {
        kind: "category",
        name: "Custom",
        colour: "#5CA699",
        contents: [
          {
            kind: "block",
            type: "new_boundary_function",
          },
          {
            kind: "block",
            type: "return",
          },
        ],
      },
    ],
  };    const initialXml =
    '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>';

  const blocklyRef = useRef(null);
  const { workspace, xml} = useBlocklyWorkspace({
    ref: blocklyRef,
    toolboxConfiguration: toolboxCategories, // this must be a JSON toolbox definition
    initialXml: initialXml,
  });
  return (
    <div className="App">
      <div ref={blocklyRef} style={{height: '1000px'}} />
    </div>
    
  )
}

export default App;
