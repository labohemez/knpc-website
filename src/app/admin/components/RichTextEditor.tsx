"use client";

import { useCallback, useRef, useState } from "react";

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

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const [active, setActive] = useState<Set<string>>(new Set());
  const [htmlMode, setHtmlMode] = useState(false);

  const getHtml = () => {
    if (!editorRef.current) return "";
    const h = editorRef.current.innerHTML;
    return h === "<br>" || h === "<p><br></p>" ? "" : h;
  };

  const flushChange = useCallback(() => {
    onChangeRef.current(getHtml());
  }, []);

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
    flushChange();
    check();
  }, [flushChange, check]);

  // 에디터 div를 ref callback으로 초기화 — React 렌더 사이클 밖에서 관리
  const setEditorRef = useCallback((node: HTMLDivElement | null) => {
    if (node && !editorRef.current) {
      node.innerHTML = value;
      editorRef.current = node;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <style>{`
        .ke { border:1px solid #ddd; overflow:hidden; background:#fff; transition:border-color .12s,box-shadow .12s; }
        .ke:focus-within { border-color:#294a3a; box-shadow:0 0 0 2px rgba(41,74,58,.08); }
        .ke-bar { display:flex; align-items:center; gap:1px; padding:4px 6px; background:#fafafa; border-bottom:1px solid #eee; flex-wrap:wrap; }
        .ke-sep { width:1px; height:16px; background:#e5e5e5; margin:0 4px; flex-shrink:0; }
        .ke-btn { height:26px; min-width:26px; padding:0 6px; border:none; background:none; cursor:pointer; font-size:11px; color:#777; font-family:inherit; transition:all .1s; display:inline-flex; align-items:center; justify-content:center; }
        .ke-btn:hover { background:#eee; color:#333; }
        .ke-btn.on { background:#294a3a; color:#fff; }
        .ke-btn.html-btn { font-family:monospace; font-size:10px; letter-spacing:-.5px; margin-left:auto; }
        .ke-body { min-height:200px; padding:14px 16px; font-size:14px; line-height:1.75; color:#222; outline:none; font-family:inherit; }
        .ke-body:empty::before { content:"내용을 입력하세요"; color:#ccc; pointer-events:none; }
        .ke-body h1 { font-size:1.5em; font-weight:700; margin:.3em 0; }
        .ke-body h2 { font-size:1.25em; font-weight:700; margin:.25em 0; }
        .ke-body a { color:#294a3a; text-decoration:underline; }
        .ke-body img { max-width:100%; margin:8px 0; }
        .ke-body ul { list-style:disc; padding-left:22px; margin:6px 0; }
        .ke-body ol { list-style:decimal; padding-left:22px; margin:6px 0; }
        .ke-body table { border-collapse:collapse; width:100%; margin:8px 0; }
        .ke-body td,.ke-body th { border:1px solid #ddd; padding:6px 8px; font-size:13px; }
        .ke-body th { background:#f5f5f5; font-weight:600; }
        .ke-src { width:100%; min-height:200px; padding:14px 16px; border:none; outline:none; resize:vertical; font-family:'Consolas',monospace; font-size:12px; line-height:1.7; color:#333; background:#fafafa; }
      `}</style>

      <div className="ke">
        <div className="ke-bar">
          {TB.map((group, gi) => (
            <span key={gi} style={{ display: "flex", alignItems: "center", gap: "1px" }}>
              {gi > 0 && <span className="ke-sep" />}
              {group.map((b) => (
                <button key={b.cmd + (b.val || "")} type="button" className={`ke-btn ${active.has(b.cmd) ? "on" : ""}`} title={b.title}
                  onMouseDown={(e) => { e.preventDefault(); exec(b.cmd, b.val); }}
                  style={{ fontWeight: b.fw, fontStyle: b.fs, textDecoration: b.td }}
                >{b.label}</button>
              ))}
            </span>
          ))}
          <button type="button" className={`ke-btn html-btn ${htmlMode ? "on" : ""}`} title="HTML 소스"
            onMouseDown={(e) => {
              e.preventDefault();
              if (htmlMode) {
                // HTML → 비주얼: textarea 값을 에디터에 반영
                const ta = document.querySelector<HTMLTextAreaElement>(".ke-src");
                if (ta && editorRef.current) {
                  editorRef.current.innerHTML = ta.value;
                  onChangeRef.current(ta.value);
                }
              }
              setHtmlMode(!htmlMode);
            }}
          >{"</>"}</button>
        </div>
        {htmlMode ? (
          <textarea className="ke-src" defaultValue={getHtml()}
            onBlur={(e) => onChangeRef.current(e.target.value)}
            placeholder="HTML 코드를 붙여넣으세요..." />
        ) : (
          <div
            ref={setEditorRef}
            className="ke-body"
            contentEditable
            suppressContentEditableWarning
            onInput={flushChange}
            onKeyUp={check}
            onMouseUp={check}
          />
        )}
      </div>
    </div>
  );
}
