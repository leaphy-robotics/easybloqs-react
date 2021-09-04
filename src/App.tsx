import './App.css';
import { useBlocklyWorkspace } from 'leaphy-react-blockly';
import { useRef } from 'react'

function App() {

  const toolboxCategories = {
    kind: "categoryToolbox",
    id:"easyBloqsToolbox",
    contents: [
      {
        kind: "category",
        name: "%{BKY_LEAPHY_SITUATION_CATEGORY}",
        id: "l_situation",
        toolboxitemid: "l_situation",
        categorystyle: "situation_category",
        contents: [
          {
            kind: "block",
            type: "time_delay",
            blockxml: `<block type="time_delay">
            <value name="DELAY_TIME_MILI">
              <shadow type="math_number">
                <field name="NUM">1000</field>
              </shadow>
            </value>
          </block>`
          },
          {
            kind: "block",
            type: "logic_compare",
          },
        ],
      }
    ],
  };    
  
  const initialXml =
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
