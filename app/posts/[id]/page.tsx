import { getPostDataById, getAllPostIds, getAdjacentPosts } from '../../../lib/posts';
import Post from '../../../components/templates/PostContent';
import { PostParams } from '../../../types/blog';

export async function generateStaticParams() {
    const posts = await getAllPostIds();
    return posts;
}

export default async function Page({ params }: PostParams) {
    const { id } = await params;
    const postData = await getPostDataById(id);
    const adjacentPosts = await getAdjacentPosts(id);
    
    return (
        <Post 
            postData={postData} 
            prevPost={adjacentPosts.prev}
            nextPost={adjacentPosts.next}
        />
    );
}
