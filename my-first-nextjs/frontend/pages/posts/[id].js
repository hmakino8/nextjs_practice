import Link from "next/link";
import Layout from "@/components/Layout";
import { getAllPostIds, getPostData } from "@/lib/posts";

/*
 * fallback: false
 * 設定されていないIdにユーザーがアクセスした場合の挙動。この場合は404を返す。
 * trueにすることで動的にコンテンツが増える場合に対応する。
 */

export default function Post({ post }) {
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={post.title}>
      <p className="m-4">
        {"ID : "}
        {post.id}
      </p>
      <p className="mb-8 text-xl font-bold">{post.title}</p>
      <p className="px-10">{post.body}</p>

      <Link href="/blog-page">
        <div className="flex cursor-pointer mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
          <span>Back to blog-page</span>
        </div>
      </Link>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getAllPostIds();

  return {
    paths,
    fallback: true, // 設定されていないIdにユーザーがアクセスした場合の挙動。この場合は404返す。
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostData(params.id);

  return {
    props: {
      post,
    },
  };
}
