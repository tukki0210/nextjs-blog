import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';


// Propsの型定義
type CodeBlockProps = {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any; // その他のプロパティを受け取るため
}

const CodeBlock = ({ children, className, rest }: CodeBlockProps) => {
  const match = /language-(\w+)/.exec(className || '');
  const lang = match && match[1] ? match[1] : '';

  return match ? (
    <SyntaxHighlighter
      {...rest}
      PreTag="div"
      language={lang}
      children={String(children).replace(/\n$/, '')}
    />
  ) : (
    <code {...rest} className={className}>{children}</code>
  );
};

export default CodeBlock;
