import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ComponentPropsWithoutRef } from 'react';

type CodeBlockProps = ComponentPropsWithoutRef<'code'> & {
  children?: React.ReactNode;
  className?: string;
};

const CodeBlock = ({ children, className, ...rest }: CodeBlockProps) => {
  const match = /language-(\w+)/.exec(className || '');
  const lang = match && match[1] ? match[1] : '';

  return match ? (
    <SyntaxHighlighter
      PreTag="div"
      language={lang}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code {...rest} className={className}>
      {children}
    </code>
  );
};

export default CodeBlock;
