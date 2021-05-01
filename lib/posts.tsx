import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

interface PostData {
    id: string,
    title: string,
    date: Date,
    image: string
};

export function getSortedPostsData() {
    //Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory)

    const allPostsData = fileNames.map(fileName => {
        //remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '')


        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        const { data, content } = matter(fileContents)

        return {
            id,
            ...data
        }
    })

    // 日付でソートする。a.bは型定義しないとエラーがでる
    const sortedAllPostsData = allPostsData.sort((a: PostData, b: PostData) => {

        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
    return sortedAllPostsData
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)

    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

// export async function markdownToHtml(markdown){
//     const result = await remark()
//         .use(html)
//         .process(markdown)
//     return result.toString()
// }

//マークダウンをHTMLに変える
export async function getPostData(id: String) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    //use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents)

    return {
        id,
        ...data,
        content
    }
}