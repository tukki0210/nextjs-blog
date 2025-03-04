import { getPostDataById, getAllPostIds } from '../../../lib/posts';
import Post from '../../../components/templates/PostContent';

type Params = {
    params: { id: string };
};

export async function generateStaticParams() {
    const posts = await getAllPostIds();
    return posts;
}

export default async function Page({ params }: Params) {
    const postData = await getPostDataById(params.id);
    return <Post postData={postData} />;
}
