import React, { useRef, useMemo } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { cn } from "../../utils/cn";

function RichTextEditor({
  value,
  onChange,
  placeholder = "Enter content...",
  className,
  height = 400,
}) {
  const editorRef = useRef(null);

  const config = useMemo(
    () => ({
      height: height,
      menubar: false,
      plugins: "lists",
      toolbar:
        "bold italic underline strikethrough | superscript subscript | bullist numlist indent outdent",
      content_style: "body { font-family:Helvetica,Arial,sans-serif; }",
      placeholder: placeholder,
      license_key: "gpl",
    }),
    [height, placeholder],
  );

  return (
    <div className={cn("tinymce-editor-wrapper w-full", className)}>
      <Editor
        apiKey="gpl"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={value}
        init={config}
        onBlur={() => {
          if (editorRef.current) {
            onChange(editorRef.current.getContent());
          }
        }}
        tinymceScriptSrc="https://cdn.jsdelivr.net/npm/tinymce@7/tinymce.min.js"
      />
    </div>
  );
}

export default RichTextEditor;
