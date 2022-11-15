import React from 'react';
import Image from 'next/image';

const name = 'つっきー';
export const siteTitle = '理系公務員のプログラミング日記';
export const subTitle =
  '職業訓練校でプログラミング教えている公務員です。自分の勉強内容の振り返りと授業で出した課題の解説記事が中心です。このブログはTypeScript + Next.js + TailWind CSS + Vercelで構成してます。（一部未完成）';

const SideBar = () => {
  return (
    <>
      {/* プロフィールカード */}
      <div className='bg-white'>
        <Image
          className=''
          src='/images/components/ukimido.jpg'
          alt='profileCard'
          width='300'
          height='200'
        />

        <div className='flex justify-center -mt-10'>
          <Image
            className='rounded-full -mt-3'
            src='/images/components/tukki.jpg'
            alt='profileImage'
            width='120'
            height='120'
          />
        </div>

        <div className='text-center px-3 pb-6 pt-2'>
          <h2 className='text-gray-600 text-lg bold '>{name}</h2>
          <p className='text-gray-600 mt-2  font-light text-grey-dark'>{subTitle}</p>
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
    </>
  );
};

export default SideBar;
