/*
  デフォルトエクスポートの必要性

  ・Next.jsでは、ページコンポーネントはデフォルトエクスポートとして
  エクスポートされる必要がある。
  これは、フレームワークがページを自動的に認識し、ルーティングを行うため。

  ・デフォルトエクスポートを使用することで、
  ファイルごとに1つのコンポーネントを明示的に指定でき、
  フレームワークがそのコンポーネントをページとして扱うことができる。

  複数のエクスポートとの違い
  ・名前付きエクスポートを使用すると、
  同じファイルから複数のコンポーン年とをエクスポートできるが、
  Next.jsはページとして認識するためにデフォルトエクスポートを期待する。
  これにより、どのコンポーネントがページとして使用されるかが明確になる。
*/

import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { getAllPostData } from "@/lib/posts";

export default function Blog({ posts }) {
  return (
    <Layout title="Blog">
      <ul className="m-10">
        {posts && posts.map((post) => <Post key={post.id} post={post} />)}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getAllPostData();
  return {
    props: { posts },
  };
}
