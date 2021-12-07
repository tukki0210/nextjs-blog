import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { InferGetStaticPropsType } from 'next'
import DateComponent from '../components/date'
import Layout from '../components/layout'

import { getAllPostsData } from '../lib/posts'

// getStaticPropsは事前にビルド時にサーバサイドで実行される
// 静的なファイル（allPostsData）を生成する 

const name = 'つっきー'
export const siteTitle = "理系公務員のプログラミング日記"
export const subTitle = "職業訓練校でプログラミング教えている公務員です。自分の勉強内容の振り返りと授業で出した課題の解説記事が中心です。このブログはTypeScript + Next.js + TailWind CSS + Vercelで構成してます。（一部未完成）"

type Props = InferGetStaticPropsType<typeof getStaticProps>

type Date = `${number}-${number}-${number}`;

type PostData = {
  id: string,
  title: string,
  date: Date,
  image: string,
  metaDescription: string,
  tags: Array<string>,
  content?: string
};

export const getStaticProps = async (): Promise<{ props: { allPostsData: PostData[]; }; }> => {
  const allPostsData = await getAllPostsData();

  return {
    props: {
      // ページコンポーネントにpropsとして渡される
      allPostsData
    }
  };
};

// allPostsDataはビルド時にgetStaticProps()によって生成される。
const Home: FC<Props> = ({ allPostsData }) => (
  <Layout pagetitle="" metaDescription="理系公務員のプログラミング日記">
    <div className="xl:container mx-2 my-4 md:my-10  xl:flex xl:justify-between">
      <main className="flex flex-wrap xl:w-10/12 mx-4">
        {/* 記事カード */}
        {allPostsData.map(({ id, title, date, image }) => (
          // 各記事の間隔
          <div className="mx-auto w-full md:w-1/2 lg:w-1/3" key={id}>
            {/* 各記事カードのスタイル */}
            <div className="mb-4 mx-2 overflow-hidden hover:opacity-80 " >
              <div className="bg-white ">
                <Link href={`/posts/${id}`}>
                  <div className="items-center ">
                    <Image
                      src={image}
                      alt={title}
                      width="775"
                      height="450"
                    />
                    {/* タイトルカード */}
                    <div className="items-center h-12 leading-tight px-2 text-gray-600 border-gray-200 border-0 border-solid border-t-2 -mt-3">
                      <p>{title}</p>
                    </div>
                    <div className="text-gray-600 flex flex-row-reverse px-4 pb-1">
                      <DateComponent dateString={date} />
                    </div>
                    {/* タイトルカード終わり */}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
        {/* 記事カード終わり */}
      </main>
      <aside className="w-full md:w-1/2 xl:w-2/12 mx-2 xl:mx-auto">
        {/* プロフィールカード */}
        <div className="bg-white">
          <Image className=""
            src="/images/components/ukimido.jpg"
            alt="profileCard"
            width="775"
            height="450"
          />

          <div className="flex justify-center -mt-10">
            <Image className="rounded-full -mt-3"
              src="/images/components/tukki.jpg"
              alt="profileImage"
              width="120"
              height="120"
            />
          </div>

          <div className="text-center px-3 pb-6 pt-2">
            <h2 className="text-gray-600 text-lg bold ">{name}</h2>
            <p className="text-gray-600 mt-2  font-light text-grey-dark">{subTitle}</p>
          </div>
        </div>
        {/* プロフィールカード終わり */}

        {/* カテゴリ */}
        {/* <div className="text-gray-600 bg-white mt-4 p-4 ">
                    <h3 className="border-solid border-0 border-b-2 ">カテゴリー（未対応）</h3>
                    <h4>プログラミングの話</h4>
                    <ul>
                        <li>
                            <a href="/">Java</a>
                        </li>
                        <li><a href="/">JavaScript</a></li>
                        <li><a href="/">Node.js</a></li>
                        <li><a href="/">React</a></li>
                        <li><a href="/">Next.js</a></li>
                    </ul>
                    <h4>読書記録</h4>
                    <ul>
                        <li><a href="/">ビジネス書</a></li>
                    </ul>
                </div> */}
        {/* カテゴリ終わり */}
      </aside>
    </div>
  </Layout >
)

export default Home



