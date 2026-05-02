"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import {
  Bold,
  Italic,
  UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Heading1,
  Heading2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";

// function ToolbarButton({
//   onClick,
//   isActive,
//   children,
// }: {
//   onClick: () => void;
//   isActive: boolean;
//   children: React.ReactNode;
// }) {
//   return (
//     <button
//       type="button"
//       onMouseDown={(e) => {
//         e.preventDefault(); // prevents editor losing focus
//         onClick();
//       }}
//       className={cn(
//         "p-1.5 rounded-md border text-sm transition-colors cursor-pointer",
//         isActive
//           ? "bg-blue-600 text-white border-blue-600"
//           : "border-transparent text-muted-foreground hover:bg-muted",
//       )}
//     >
//       {children}
//     </button>
//   );
// }
// function ToolbarButton({
//   onClick,
//   isActive,
//   children,
// }: {
//   onClick: () => void;
//   isActive: boolean;
//   children: React.ReactNode;
// }) {
//   return (
//     <button
//       type="button"
//       onMouseDown={(e) => {
//         e.preventDefault();
//         onClick();
//       }}
//       data-active={isActive}
//       className={cn(
//         "p-1.5 rounded-md text-sm transition-all cursor-pointer",
//         isActive
//           ? "bg-blue-600 text-white"
//           : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
//       )}
//     >
//       {children}
//     </button>
//   );
// }

function ToolbarButton({
  onClick,
  isActive,
  children,
}: {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      style={{
        background: isActive ? "#2563eb" : "transparent",
        color: isActive ? "#ffffff" : undefined,
        padding: "6px",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "all 0.15s",
      }}
      className="text-muted-foreground hover:bg-muted"
    >
      {children}
    </button>
  );
}
export function TiptapEditor({
  onChange,
}: {
  onChange?: (html: string) => void;
}) {
  const [, forceUpdate] = useState(0);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
      forceUpdate((n) => n + 1);
    },
    onSelectionUpdate: () => forceUpdate((n) => n + 1),
    onTransaction: () => forceUpdate((n) => n + 1),
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] p-3 text-sm focus:outline-none [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-bold [&_strong]:font-bold [&_em]:italic [&_u]:underline",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-muted/40">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <Bold className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <Italic className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
        >
          <UnderlineIcon className="h-3.5 w-3.5" />
        </ToolbarButton>

        <Separator orientation="vertical" className="h-5 mx-1" />

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive("heading", { level: 1 })}
        >
          <Heading1 className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 className="h-3.5 w-3.5" />
        </ToolbarButton>

        <Separator orientation="vertical" className="h-5 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
        >
          <AlignLeft className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
        >
          <AlignCenter className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
        >
          <AlignRight className="h-3.5 w-3.5" />
        </ToolbarButton>

        <Separator orientation="vertical" className="h-5 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          <List className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        >
          <ListOrdered className="h-3.5 w-3.5" />
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
