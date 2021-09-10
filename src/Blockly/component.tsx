import "./styles.css";

import { useBlocklyWorkspace } from 'leaphy-react-blockly';
import { useRef, useState } from 'react'
import { getToolbox } from './toolbox';
import Blockly from "leaphy-blockly";
import "leaphy-blockly/arduino"
import Button from '@material-ui/core/Button';

const toolboxCategories = getToolbox();

const initialXml =
    '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>';

export default function Blocky() {
    const onWorkspaceChange = (workspace: any) => {
        const updatedCode = Blockly.Arduino.workspaceToCode(workspace);
        setCode(updatedCode);
    };

    const [code, setCode] = useState<String>('');

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
            <div id="code-view">
                <div><Button color="inherit">Upload</Button></div>
                <div>{code}</div>
            </div>
        </div>
    )
};