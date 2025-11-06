'use client';

import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Function to render markdown formatting
  const renderMarkdown = (text: string) => {
    // Handle bold text **text** first (before italic to avoid conflicts)
    // This converts **text** to <strong>text</strong>, removing the asterisks
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Handle italic text *text* (process after bold, so remaining asterisks are single)
    // Now we can safely match single asterisks since ** has been converted to HTML
    text = text.replace(/\*([^*\n]+?)\*/g, '<em>$1</em>');
    
    // Handle inline code `code` (but not code blocks)
    text = text.replace(/`(.+?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>');
    
    return text;
  };

  // Split content by lines and process each line
  const lines = content.split('\n');
  const elements: React.ReactElement[] = [];
  let currentCodeBlock = '';
  let inCodeBlock = false;
  let codeBlockLanguage = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for code block start
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        // Starting a code block
        inCodeBlock = true;
        codeBlockLanguage = line.replace(/^```/, '').trim();
        currentCodeBlock = '';
      } else {
        // Ending a code block
        inCodeBlock = false;
        elements.push(
          <pre 
            key={`code-${i}`}
            className="bg-muted p-4 rounded-lg overflow-x-auto my-6"
          >
            <code className="text-sm text-foreground">{currentCodeBlock.trim()}</code>
          </pre>
        );
        currentCodeBlock = '';
        codeBlockLanguage = '';
      }
      continue;
    }

    // If we're in a code block, add to current code block
    if (inCodeBlock) {
      currentCodeBlock += line + '\n';
      continue;
    }

    // Check for headings
    if (line.startsWith('# ')) {
      const headingText = line.replace(/^# /, '');
      elements.push(
        <h1 
          key={`h1-${i}`}
          className="text-3xl sm:text-4xl font-bold text-foreground mt-12 mb-6 first:mt-0"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(headingText) }}
        />
      );
      continue;
    }

    if (line.startsWith('## ')) {
      const headingText = line.replace(/^## /, '');
      elements.push(
        <h2 
          key={`h2-${i}`}
          className="text-2xl font-bold text-foreground mt-12 mb-6 first:mt-0"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(headingText) }}
        />
      );
      continue;
    }

    if (line.startsWith('### ')) {
      const headingText = line.replace(/^### /, '');
      elements.push(
        <h3 
          key={`h3-${i}`}
          className="text-xl font-semibold text-foreground mt-8 mb-4"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(headingText) }}
        />
      );
      continue;
    }

    // Check for horizontal rule
    if (line.trim() === '---' || line.trim() === '***') {
      elements.push(
        <hr 
          key={`hr-${i}`}
          className="my-8 border-border"
        />
      );
      continue;
    }

    // Regular paragraph
    if (line.trim()) {
      elements.push(
        <p 
          key={`p-${i}`}
          className="text-foreground/80 mb-6 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(line) }}
        />
      );
    }
  }

  return <>{elements}</>;
}
