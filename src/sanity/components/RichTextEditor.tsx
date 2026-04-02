"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { type TextInputProps, set, unset } from "sanity";

/* ── 툴바 ── */
type TBtn = { cmd: string; val?: string; label: string; title: string; fw?: number; fs?: string; td?: string };
const TB: TBtn[][] = [
  [
    { cmd: "formatBlock", val: "H1", label: "H1", title: "제목 1", fw: 700 },
    { cmd: "formatBlock", val: "H2", label: "H2", title: "제목 2", fw: 700 },
    { cmd: "formatBlock", val: "P", label: "P", title: "본문" },
  ],
  [
    { cmd: "bold", label: "B", title: "굵게", fw: 700 },
    { cmd: "italic", label: "I", title: "기울임", fs: "italic" },
    { cmd: "underline", label: "U", title: "밑줄", td: "underline" },
    { cmd: "strikeThrough", label: "S", title: "취소선", td: "line-through" },
  ],
  [
    { cmd: "insertUnorderedList", label: "•", title: "글머리 기호" },
    { cmd: "insertOrderedList", label: "1.", title: "번호 매기기" },
  ],
  [
    { cmd: "createLink", label: "링크", title: "링크 삽입" },
    { cmd: "insertImage", label: "이미지", title: "이미지 삽입" },
  ],
];

export default function RichTextEditor(props: TextInputProps) {
  const { value, onChange, elementProps } = props;
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);
  const [active, setActive] = useState<Set<string>>(new Set());
  const [htmlMode, setHtmlMode] = useState(false);
  const htmlRef = useRef<HTMLTextAreaElement>(null);

  const safeValue = (() => {
    if (!value) return "";
    if (typeof value === "string") return value;
    return "";
  })();

  useEffect(() => {
    if (value && typeof value !== "string") return;
    if (editorRef.current && !isInternalChange.current) {
      if (safeValue !== editorRef.current.innerHTML) {
        editorRef.current.innerHTML = safeValue;
      }
    }
    isInternalChange.current = false;
  }, [value, safeValue, onChange]);

  const sync = useCallback(() => {
    if (!editorRef.current) return;
    isInternalChange.current = true;
    const h = editorRef.current.innerHTML;
    h === "" || h === "<br>" || h === "<p><br></p>" ? onChange(unset()) : onChange(set(h));
  }, [onChange]);

  const check = useCallback(() => {
    const a = new Set<string>();
    ["bold", "italic", "underline", "strikeThrough", "insertUnorderedList", "insertOrderedList"].forEach((c) => {
      if (document.queryCommandState(c)) a.add(c);
    });
    setActive(a);
  }, []);

  const exec = useCallback((cmd: string, val?: string) => {
    editorRef.current?.focus();
    if (cmd === "formatBlock") document.execCommand("formatBlock", false, `<${val}>`);
    else if (cmd === "createLink") { const u = prompt("URL:", "https://"); if (u) document.execCommand("createLink", false, u); }
    else if (cmd === "insertImage") { const u = prompt("이미지 URL:", "https://"); if (u) document.execCommand("insertImage", false, u); }
    else document.execCommand(cmd, false, val);
    sync(); check();
  }, [sync, check]);

  return (
    <div>
      <input {...elementProps} type="hidden" />
      <style>{`
        .ke { border:1px solid #e5e5e5; border-radius:5px; overflow:hidden; background:#fff; transition:border-color .12s,box-shadow .12s; }
        .ke:focus-within { border-color:#2563eb; box-shadow:0 0 0 2px rgba(37,99,235,.06); }

        .ke-bar { display:flex; align-items:center; gap:1px; padding:4px 6px; background:#fafafa; border-bottom:1px solid #f0f0f0; flex-wrap:wrap; }
        .ke-sep { width:1px; height:16px; background:#e8e8e8; margin:0 4px; flex-shrink:0; }
        .ke-btn {
          height:26px; min-width:26px; padding:0 6px; border:none; background:none; border-radius:3px;
          cursor:pointer; font-size:11px; color:#777; font-family:inherit; transition:all .1s; display:inline-flex; align-items:center; justify-content:center;
        }
        .ke-btn:hover { background:#eee; color:#333; }
        .ke-btn.on { background:#2563eb; color:#fff; }
        .ke-btn.html-btn { font-family:monospace; font-size:10px; letter-spacing:-.5px; margin-left:auto; }

        .ke-body {
          min-height:200px; padding:14px 16px; font-size:14px; line-height:1.75; color:#222; outline:none; font-family:inherit;
        }
        .ke-body:empty::before { content:"내용을 입력하세요"; color:#ccc; pointer-events:none; }
        .ke-body h1 { font-size:1.5em; font-weight:700; margin:.3em 0; color:#111; }
        .ke-body h2 { font-size:1.25em; font-weight:700; margin:.25em 0; color:#111; }
        .ke-body blockquote { border-left:3px solid #ddd; padding-left:14px; color:#666; margin:10px 0; }
        .ke-body a { color:#2563eb; text-decoration:underline; }
        .ke-body img { max-width:100%; border-radius:3px; margin:8px 0; }
        .ke-body ul { list-style:disc; padding-left:22px; margin:6px 0; }
        .ke-body ol { list-style:decimal; padding-left:22px; margin:6px 0; }
        .ke-body table { border-collapse:collapse; width:100%; margin:8px 0; }
        .ke-body td,.ke-body th { border:1px solid #ddd; padding:6px 8px; font-size:13px; }
        .ke-body th { background:#f5f5f5; font-weight:600; }

        .ke-src {
          width:100%; min-height:200px; padding:14px 16px; border:none; outline:none; resize:vertical;
          font-family:'Consolas','Monaco','Fira Code',monospace; font-size:12px; line-height:1.7; color:#333; background:#fafafa;
        }
      `}</style>

      <div className="ke" style={{ maxWidth: "800px" }}>
        <div className="ke-bar">
          {TB.map((group, gi) => (
            <span key={gi} style={{ display: "flex", alignItems: "center", gap: "1px" }}>
              {gi > 0 && <span className="ke-sep" />}
              {group.map((b) => (
                <button
                  key={b.cmd + (b.val || "")}
                  type="button"
                  className={`ke-btn ${active.has(b.cmd) ? "on" : ""}`}
                  title={b.title}
                  onMouseDown={(e) => { e.preventDefault(); exec(b.cmd, b.val); }}
                  style={{ fontWeight: b.fw, fontStyle: b.fs, textDecoration: b.td }}
                >{b.label}</button>
              ))}
            </span>
          ))}
          <button
            type="button"
            className={`ke-btn html-btn ${htmlMode ? "on" : ""}`}
            title="HTML 소스"
            onMouseDown={(e) => {
              e.preventDefault();
              if (htmlMode && htmlRef.current) {
                const h = htmlRef.current.value;
                h === "" ? onChange(unset()) : onChange(set(h));
              }
              setHtmlMode(!htmlMode);
            }}
          >{"</>"}</button>
        </div>

        {htmlMode ? (
          <textarea
            ref={htmlRef}
            className="ke-src"
            defaultValue={safeValue}
            onChange={(e) => { const h = e.target.value; h === "" ? onChange(unset()) : onChange(set(h)); }}
            placeholder="HTML 코드를 붙여넣으세요..."
          />
        ) : (
          <div
            ref={editorRef}
            className="ke-body"
            contentEditable
            suppressContentEditableWarning
            onInput={sync}
            onKeyUp={check}
            onMouseUp={check}
            dangerouslySetInnerHTML={{ __html: safeValue }}
          />
        )}
      </div>
    </div>
  );
}
