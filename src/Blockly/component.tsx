import { useBlocklyWorkspace } from 'leaphy-react-blockly';
import { useRef } from 'react'
import { getToolbox } from './toolbox';

const toolboxCategories = getToolbox();

  const initialXml =
    '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>';

export default function Blocky() {
    const blocklyRef = useRef(null);
    const { workspace, xml } = useBlocklyWorkspace({
        ref: blocklyRef,
        toolboxConfiguration: toolboxCategories,
        initialXml: initialXml,
    });
    return (
        <div ref={blocklyRef} style={{ height: '1000px' }} />
    )
};