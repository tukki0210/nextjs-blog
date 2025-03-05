import React, { FC } from "react";
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import markdownStyles from '../../styles/markdown-styles.module.css';
import DateComponent from '../../components/Molecules/DateBox';
import CodeBlock from "../../components/Molecules/CodeBlock";
import { PostData } from "../../types/blog";

type PostContentProps = {
    postData: PostData;
    prevPost?: { id: string; title: string } | null;
    nextPost?: { id: string; title: string } | null;
}

const ImageInMarkDown = ({ src, alt }: { src: string; alt: string }) => (
    <Image src={src} alt={alt} width='600' height='450' />
);

const PostContent: FC<PostContentProps> = ({ postData, prevPost, nextPost }) => (
    <article className="max-w-4xl mx-auto">
        {/* ヒーローセクション */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="relative">
                <div className="w-full h-64 bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
                    {postData.image && (
                        <Image 
                            src={postData.image} 
                            alt={postData.title}
                            width={800}
                            height={400}
                            className="w-full h-full object-cover opacity-30"
                        />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center px-4">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{postData.title}</h1>
                            <div className="inline-block bg-white/90 text-blue-600 px-4 py-2 rounded-full">
                                <DateComponent dateString={postData.date} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-6">
                    {postData.tags.map((tag) => (
                        <Link 
                            href={`/tags/${tag}`} 
                            key={tag}
                            className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                        >
                            #{tag}
                        </Link>
                    ))}
                </div>
                
                {postData.metaDescription && (
                    <div className="bg-gray-50 border-l-4 border-blue-500 p-4 mb-6">
                        <p className="text-gray-700 italic">{postData.metaDescription}</p>
                    </div>
                )}
            </div>
        </div>
        
        {/* 記事本文 */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
            <ReactMarkdown
                children={postData.content}
                rehypePlugins={[rehypeRaw]}
                className={markdownStyles.markdown}
                components={{
                    code(props) {
                        return <CodeBlock {...props} />;
                    },
                    img: ImageInMarkDown as any,
                }}
            />
            
        </div>
        
        {/* 前後の記事へのナビゲーション */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {prevPost ? (
                <Link href={`/posts/${prevPost.id}`} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                    <div className="text-sm text-gray-500">前の記事</div>
                    <div className="font-medium text-blue-600 truncate">{prevPost.title}</div>
                </Link>
            ) : (
                <div className="bg-white rounded-lg shadow p-4 opacity-50 cursor-not-allowed">
                    <div className="text-sm text-gray-500">前の記事</div>
                    <div className="font-medium text-gray-400">最新の記事です</div>
                </div>
            )}
            
            {nextPost ? (
                <Link href={`/posts/${nextPost.id}`} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow text-right">
                    <div className="text-sm text-gray-500">次の記事</div>
                    <div className="font-medium text-blue-600 truncate">{nextPost.title}</div>
                </Link>
            ) : (
                <div className="bg-white rounded-lg shadow p-4 opacity-50 cursor-not-allowed text-right">
                    <div className="text-sm text-gray-500">次の記事</div>
                    <div className="font-medium text-gray-400">最古の記事です</div>
                </div>
            )}
        </div>
    </article>
);

export default PostContent;
