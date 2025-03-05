import { getPostDataById, getAllPostIds } from '../../../lib/posts';
import Post from '../../../components/templates/PostContent';
import { PostParams } from '../../../types/blog';

export async function generateStaticParams() {
    const posts = await getAllPostIds();
    return posts;
}

export default async function Page({ params }: PostParams) {
    const postData = await getPostDataById(params.id);
    return <Post postData={postData} />;
}
