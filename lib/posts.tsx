import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

type Date = `${number}-${number}-${number}`

type PostData = {
    id: string,
    title: string,
    date: Date,
};

// .mdファイル以外を除外する
const fileNames = fs.readdirSync(postsDirectory).filter(fileName => fileName.includes('md'))

type matterFileContents = {
    data: { [key: string]: PostData; }
    content: string
}

const getMatterFileContents = (id: string): matterFileContents => {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    //use gray-matter to parse the post metadata section
    return matter(fileContents)
}

export async function getAllPostsData() {
    //Get file names under /posts

    const allPostsData = fileNames.map(fileName => {
        //remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '')
        const { data, content } = getMatterFileContents(id)
        return {
            id,
            ...data
        }
    })
    // 日付順にソート
    return allPostsData.sort((a: PostData, b: PostData) => a.date < b.date ? 1 : -1)
}

export async function getAllPostIds() {
    // const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id: string) {

    const { data, content } = getMatterFileContents(id)
    
    return {
        id,
        ...data,
        content
    }
}