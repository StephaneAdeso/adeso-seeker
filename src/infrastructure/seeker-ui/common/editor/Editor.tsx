// Code editor. Used to display the response of the request or other code.
// https://microsoft.github.io/monaco-editor/docs.html
// https://microsoft.github.io/monaco-editor/typedoc/interfaces/editor.IEditorOptions.html

import React, { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';

interface EditorProps {
  value: object;
  language?: string;
}

export const SkrEditor: React.FC<EditorProps> = ({
  value = {},
  language = 'json'
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  // const [editorValue, setEditorValue] = useState(value);
  // const [editorLanguage, setEditorLanguage] = useState(language);

  const [monacoEditor, setMonacoEditor] =
    useState<monaco.editor.IStandaloneCodeEditor>();

  const getConfig = (): monaco.editor.IStandaloneEditorConstructionOptions => {
    return {
      autoIndent: 'full',
      automaticLayout: true,
      formatOnPaste: true,
      formatOnType: true,
      language,
      minimap: { enabled: false },
      quickSuggestions: false,
      readOnly: true,
      scrollbar: {
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10
      },
      scrollBeyondLastLine: false,
      theme: 'vs-dark',
      value: JSON.stringify(value, null, 2)
    };
  };

  // create the editor element
  useEffect(() => {
    const handleResize = () => {
      if (monacoEditor) {
        monacoEditor.layout();
      }
    };

    if (!monacoEditor && editorRef.current) {
      const editor = monaco.editor.create(editorRef.current, getConfig());
      setMonacoEditor(editor);

      // Clean editor on unmount
      return () => editor.dispose();
    }
    window.addEventListener('resize', handleResize);

    // return () => {
    //   window.removeEventListener('resize', handleResize);
    // };
  }, []);

  // update value
  useEffect(() => {
    if (monacoEditor) {
      monacoEditor.setValue(JSON.stringify(value, null, 2));
    }
  }, [value, monacoEditor]);

  // update language
  useEffect(() => {
    if (monacoEditor) {
      const model = monacoEditor.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, language);
      }
    }
  }, [language, monacoEditor]);

  return (
    <div
      id="mierdapati"
      ref={editorRef}
      style={{ position: 'relative', boxSizing: 'border-box', height: '100%' }}
    />
  );
};
