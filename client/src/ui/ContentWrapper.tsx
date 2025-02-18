import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useShowText } from '../hooks/useRenderText';
import { IoCodeSlash } from "react-icons/io5";
import { MdPreview } from "react-icons/md";

interface ContentWrapperProps {
  content: string;
  language?: string;
  isCode?: boolean;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ 
  content, 
  language = 'typescript',
  isCode = false 
}) => {
  const [showRaw, setShowRaw] = useState(false);
  const renderedContent = useShowText(content);

  const renderContent = () => {
    if (isCode) {
      if (language === "markdown") {
        // For markdown, render the content with markdown parsing
        return (
          <div className="prose prose-invert max-w-none">
            {renderedContent}
          </div>
        );
      } else {
        // For other code blocks, use syntax highlighting
        return (
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              borderRadius: '0.5rem',
              background: 'transparent'
            }}
          >
            {content}
          </SyntaxHighlighter>
        );
      }
    } else {
      // For regular text content
      return (
        <div className="prose prose-invert max-w-none">
          {renderedContent}
        </div>
      );
    }
  };

  return (
    <div className="relative rounded-lg border border-slate-700 bg-slate-800 shadow-lg mb-4">
      {/* Header with toggle button */}
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={() => setShowRaw(!showRaw)}
          className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 text-slate-200"
          title={showRaw ? "Show Rendered" : "Show Raw"}
        >
          {showRaw ? <MdPreview size={20} /> : <IoCodeSlash size={20} />}
        </button>
      </div>

      {/* Optional language indicator */}
      {isCode && language && (
        <div className="absolute top-2 left-2 z-10">
          <span className="px-2 py-1 rounded bg-slate-700 text-slate-200 text-xs">
            {language}
          </span>
        </div>
      )}

      {/* Content area */}
      <div className="p-4">
        {showRaw ? (
          <div className="font-mono text-sm text-slate-200 whitespace-pre-wrap">
            {content}
          </div>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
};

export default ContentWrapper;