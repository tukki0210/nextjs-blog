import React, { FC } from "react";
import Image from 'next/image';
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import markdownStyles from '../../styles/markdown-styles.module.css';
import DateComponent from '../../components/Molecules/DateBox';
import CodeBlock from "../../components/Molecules/CodeBlock";


type Date = `${number}-${number}-${number}`;

type PostData = {
    id: string;
    title: string;
    date: Date;
    image: string;
    metaDescription: string;
    tags: Array<string>;
    content: string;
};

type PostContentProps = {
    postData: PostData;
}


const ImageInMarkDown = ({ src, alt }: { src: string; alt: string }) => (
    <Image src={src} alt={alt} width='600' height='450' />
);

const PostContent: FC<PostContentProps> = ({ postData }) => (
    <article className='bg-white  2xl:w-7/12 lg:w-9/12 md:w-11/12 mx-auto -my-4 md:my-10 px-2 md:px-10 py-1 md:py-10'>
        <div className='mb-10 px-4 text-xl leading-normal border-solid border-0 border-l-8 border-blue-600'>
            <h2 className='mb-14'>{postData.title}</h2>
            <div className='flex flex-row-reverse px-2  '>
                <DateComponent dateString={postData.date} />
            </div>
            <div className='flex -mt-10 text-lg'>
                タグ：
                {postData.tags.map((tag) => (
                    <div
                        key={tag}
                        className='px-2 mx-2 bg-white border-solid border-1 border-blue-600 rounded-2xl'
                    >
                        {tag}
                    </div>
                ))}
            </div>
        </div>
        <Markdown
            children={postData.content}
            rehypePlugins={[rehypeRaw]}
            className={markdownStyles.markdown}

            components={{
                code: (props) => {
                    const { children, className, node, ...rest } = props
                    return <CodeBlock {...rest} className={markdownStyles.markdown} children={postData.content} />
                },
                img: ImageInMarkDown as any,
            }}
        />
    </article>
);

export default PostContent;
