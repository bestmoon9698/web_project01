import fs from "fs";
import path from "path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostData } from "@/lib/posts";

export function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "src/content/posts");
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => ({
      slug: fileName.replace(/\.md$/, ""),
    }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black text-slate-800">글을 찾을 수 없습니다 😢</h1>
          <Link href="/blog" className="text-blue-500 font-bold hover:underline">
            블로그 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative overflow-x-hidden">
      <header className="sticky top-0 z-20 bg-white/60 backdrop-blur-xl border-b border-white/40">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <Link href="/blog" className="inline-flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800 transition-colors">
            <span>←</span> 블로그 목록으로 돌아가기
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <article className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-slate-100 overflow-hidden">
          {/* 장식 헤더 */}
          <div className="h-3 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
          
          <div className="p-8 sm:p-16 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-blue-100">
                  {post.category}
                </span>
                <span className="text-slate-400 text-sm font-bold">{post.date}</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs text-slate-400 font-bold px-3 py-1 bg-slate-50 rounded-full italic">#{tag}</span>
                ))}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* 본문 렌더링 */}
            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-a:text-blue-600 prose-img:rounded-3xl shadow-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            <hr className="border-slate-100" />

            <div className="pt-10 flex flex-col sm:flex-row justify-between items-center gap-6">
              <Link
                href="/blog"
                className="w-full sm:w-auto px-10 text-center py-4 rounded-2xl text-sm font-black text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all"
              >
                다른 글 더보기
              </Link>
              <div className="text-xs text-slate-300 font-bold uppercase tracking-widest">
                AI Generated Local Info
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
