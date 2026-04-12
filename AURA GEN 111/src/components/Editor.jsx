import React from 'react';
import MonacoEditor from '@monaco-editor/react';

const Editor = ({ code, onChange, onMount }) => {
    return (
        <MonacoEditor
            height="100%"
            language="javascript"
            theme="vs-dark"
            value={code}
            onChange={onChange}
            onMount={onMount}
            options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: true,
                scrollBeyondLastLine: false,
                readOnly: false,
                automaticLayout: true,
                padding: { top: 20 }
            }}
        />
    );
};

export default Editor;
