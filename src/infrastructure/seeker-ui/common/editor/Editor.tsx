// Code editor. Used to display the response of the request or other code.
// https://microsoft.github.io/monaco-editor/docs.html
// https://microsoft.github.io/monaco-editor/typedoc/interfaces/editor.IEditorOptions.html

import * as monaco from 'monaco-editor';
import { useEffect, useRef, useState } from 'react';

interface EditorProps {
  value: object;
  language?: string;
  className?: string;
}

export const SkrEditor = ({
  value = {},
  language = 'json',
  className = ''
}: EditorProps): JSX.Element => {
  const editorRef = useRef<HTMLDivElement>(null);

  const [monacoEditor, setMonacoEditor] =
    useState<monaco.editor.IStandaloneCodeEditor>();

  // create the editor element
  useEffect(() => {
    const handleResize = () => {
      if (monacoEditor) {
        monacoEditor.layout();
      }
    };

    if (!monacoEditor && editorRef.current) {
      const editor = monaco.editor.create(editorRef.current, {
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
      });
      setMonacoEditor(editor);
      window.addEventListener('resize', handleResize);
      // Clean editor on unmount
      return () => editor.dispose();
    }
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
    <div className={` ${className}`} id="MonacoRootElement" ref={editorRef} />
  );
};
