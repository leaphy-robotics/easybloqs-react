import "./styles.css";

import { useBlocklyWorkspace } from 'leaphy-react-blockly';
import { useRef, useState, useEffect } from 'react'
import { getToolbox } from './toolbox';
import Blockly from "leaphy-blockly";
import "leaphy-blockly/arduino"
import Button from '@material-ui/core/Button';

import AvrgirlArduino from "./avrgirl-arduino.min.js";

const toolboxCategories = getToolbox();

const initialXml =
    '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>';

export default function Blocky() {
    const onWorkspaceChange = (workspace: any) => {
        const updatedCode = Blockly.Arduino.workspaceToCode(workspace);
        setCode(updatedCode);
    };

    const [code, setCode] = useState<String>('');
    const [isUploadClicked, setIsUploadClicked] = useState<boolean>(false);

    const onUploadClicked = () => {
        setIsUploadClicked(true);
    }

    useEffect(() => {

        if (!isUploadClicked) return;

        const fetchSketch = async (): Promise<Blob> => {
            console.log('gonna download the sketch yo');

            const response = await fetch('https://test-compiled.s3.eu-west-1.amazonaws.com/easybloqs-react/green.hex')

            return response.blob();
        }

        const flashBoard = (blob: Blob) => {
            console.log('Totally flashing this board man');

            const reader = new FileReader();
            reader.readAsArrayBuffer(blob);

            reader.onload = event => {
                if (!event || !event.target) {
                    console.log('Error loading info from file! Aborting');
                    return;
                };

                const filecontents = event.target.result;

                const avrgirl = new AvrgirlArduino({
                    board: 'uno',
                    debug: true
                });

                avrgirl.flash(filecontents, (error: any) => {
                    if (error) {
                        console.error(error);
                    } else {
                        console.info("flash successful");
                    }
                });
            };
        }

        fetchSketch().then(blob => flashBoard(blob));

        setIsUploadClicked(false);

    }, [isUploadClicked])



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
                <div><Button onClick={onUploadClicked} color="inherit">Upload</Button></div>
                <div>{code}</div>
            </div>
        </div>
    )
};