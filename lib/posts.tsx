import fs from 'fs'
import path from 'path'
import matter, { GrayMatterFile, Input } from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

type Date = `${number}-${number}-${number}`

type PostData = {
    id: string,
    title: string,
    date: Date,
    image: string,
    metaDescription: string,
    content: string
};

// .mdファイル以外を除外する
const fileNames = fs.readdirSync(postsDirectory).filter(fileName => fileName.includes('md'))

const getMatterFileContents = (id: string): GrayMatterFile<Input> => {
    // マークダウンファイルのフルパス
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // use gray-matter to parse the post metadata section
    return matter(fileContents)
}

const getPostDataByFileName = (fileName: string): PostData => {
    const id = fileName.replace(/\.md$/, '')
    const matterResult = getMatterFileContents(id)
    type dataType = {
        title: string,
        date: Date,
        image: string,
        metaDescription: string,
    }
    const { data } = matterResult
    const { title, date, image, metaDescription } = data as dataType;
    const { content } = matterResult;

    return {
        id,
        title,
        date,
        image,
        metaDescription,
        content
    };
};

export const getPostDataById = (id: string): Promise<PostData> => Promise.resolve(getPostDataByFileName(`${id}.md`))

// PostData[]の入ったPromiseオブジェクトを生成
export const getAllPostsData = (): Promise<PostData[]> => {
    // Get file names under /posts
    const allPostsData = fileNames.map(
        (fileName: string) => getPostDataByFileName(fileName)
    )

    // 日付順にソート
    return Promise.resolve(allPostsData.sort((a: PostData, b: PostData) => a.date < b.date ? 1 : -1));
}

export const getAllPostIds = (): Promise<{ params: { id: string } }[]> => (
    // const fileNames = fs.readdirSync(postsDirectory)
    Promise.resolve(fileNames.map(fileName => ({
        params: {
            id: fileName.replace(/\.md$/, '')
        }
    }))
    )
)
