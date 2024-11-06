import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

type CodeComponent = {
  className: string,
  children: string
}

const CodeBlock = ({ className, children }: CodeComponent) => {

  const match = /language-(\w+)/.exec(className || '');
  const lang = match && match[1] ? match[1] : '';

  return match ? (
    <SyntaxHighlighter
      language={lang}
      children={String(children).replace(/\n$/, '')}
    />
  ) : (
    <code className={className}>{children}</code>
  );
};

export default CodeBlock;
