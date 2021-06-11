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
    content: string
};

// .mdファイル以外を除外する
const fileNames = fs.readdirSync(postsDirectory).filter(fileName => fileName.includes('md'))

// type matterFileContents = {
//     data: { [key: string]: PostData; }
//     content: string
// }

const getMatterFileContents = (id: string): GrayMatterFile<Input> => {
    // マークダウンファイルのフルぱす
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    //use gray-matter to parse the post metadata section
    return matter(fileContents)
}

const getPostDataByFileName = (fileName: string): PostData => {
    const id = fileName.replace(/\.md$/, '')
    const matterResult: GrayMatterFile<Input> = getMatterFileContents(id)
    const data = matterResult.data;
    const title = data.title;
    const date = data.date;
    const image = data.image;
    const content = matterResult.content;
    return {
        id,
        title,
        date,
        image,
        content,
    }
}

export const getAllPostsData = async () => {
    //Get file names under /posts
    const allPostsData = fileNames.map(
        (fileName: string) => getPostDataByFileName(fileName)
    )
    // 日付順にソート
    return allPostsData.sort((a: PostData, b: PostData) => a.date < b.date ? 1 : -1)
}

export const getAllPostIds = async () => (
    // const fileNames = fs.readdirSync(postsDirectory)
    fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
)

export const getPostDataById = async (id: string) => (
    getPostDataByFileName(`${id}.md`)
)