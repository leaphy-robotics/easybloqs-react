
import "./styles.css";

import { useBlocklyWorkspace } from 'leaphy-react-blockly';
import { useRef } from 'react'
import { getToolbox } from './toolbox';
import Blockly from "leaphy-blockly";
import "leaphy-blockly/arduino"

const toolboxCategories = getToolbox();

const initialXml =
    '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>';

export default function Blocky() {
    const onWorkspaceChange = (workspace: any) => {
        const code = Blockly.Arduino.workspaceToCode(workspace);
        console.log(code);
    };

    const blocklyRef = useRef(null);
    const { workspace, xml } = useBlocklyWorkspace({
        ref: blocklyRef,
        toolboxConfiguration: toolboxCategories,
        initialXml: initialXml,
        className: "fill-height",
        onWorkspaceChange: onWorkspaceChange
    });
    return (
        <div id="blockly-container">
            <div ref={blocklyRef} id="blockly-view" />
            <div id="code-view">Code will be displayed here</div>
        </div>
    )
};