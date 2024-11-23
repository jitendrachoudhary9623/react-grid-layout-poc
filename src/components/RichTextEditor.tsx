import React, { useState, useRef } from 'react';
import './RichTextEditor.css';

interface EditorState {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  fontSize: number;
}

const RichTextEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorState, setEditorState] = useState<EditorState>({
    isBold: false,
    isItalic: false,
    isUnderline: false,
    fontSize: 16
  });

  const handleTextChange = () => {
    // No need to update text in state, contentEditable handles it
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const parent = range.commonAncestorContainer.parentElement;
      if (parent) {
        setEditorState(prev => ({
          ...prev,
          isBold: document.queryCommandState('bold'),
          isItalic: document.queryCommandState('italic'),
          isUnderline: document.queryCommandState('underline')
        }));
      }
    }
  };

  const toggleStyle = (command: string, style: keyof EditorState) => {
    document.execCommand(command, false);
    setEditorState(prev => ({
      ...prev,
      [style]: !prev[style]
    }));
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const changeFontSize = (delta: number) => {
    setEditorState(prev => {
      const newSize = Math.max(8, Math.min(32, prev.fontSize + delta));
      if (editorRef.current) {
        editorRef.current.style.fontSize = `${newSize}px`;
      }
      return {
        ...prev,
        fontSize: newSize
      };
    });
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h3 className="editor-title">Notes Editor</h3>
      </div>
      <div className="editor-toolbar">
        <button
          onClick={() => toggleStyle('bold', 'isBold')}
          className={`toolbar-button ${editorState.isBold ? 'active' : ''}`}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => toggleStyle('italic', 'isItalic')}
          className={`toolbar-button ${editorState.isItalic ? 'active' : ''}`}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          onClick={() => toggleStyle('underline', 'isUnderline')}
          className={`toolbar-button ${editorState.isUnderline ? 'active' : ''}`}
          title="Underline"
        >
          <u>U</u>
        </button>
        <button
          onClick={() => changeFontSize(-2)}
          className="toolbar-button"
          title="Decrease Font Size"
        >
          A-
        </button>
        <span className="font-size-display">{editorState.fontSize}px</span>
        <button
          onClick={() => changeFontSize(2)}
          className="toolbar-button"
          title="Increase Font Size"
        >
          A+
        </button>
      </div>
      <div className="editor-content">
        <div
          ref={editorRef}
          contentEditable
          onInput={handleTextChange}
          className="editor-area"
          role="textbox"
          aria-multiline="true"
          aria-label="Rich text editor"
          style={{ fontSize: `${editorState.fontSize}px` }}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
