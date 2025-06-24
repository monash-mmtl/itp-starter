import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const TipTapEditor = ({ initialContent = '', value, onChange, loading }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `<p>${initialContent}</p>`,
    editable: !loading,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
  });

  // Always update editor content if value changes
  useEffect(() => {
    if (editor && value !== undefined) {
      editor.commands.setContent(value, false);
    }
    // eslint-disable-next-line
  }, [value, editor]);

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <EditorContent editor={editor} className="tiptap-editor-full" />
    </div>
  );
};

export default TipTapEditor; 