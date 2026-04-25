import fs from "fs";
import path from "path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostData, getSortedPostsData } from "@/lib/posts";

// 슬러그 기반으로 팔레트 인덱스를 결정 (목록과 동일한 색상 유지)
const pastelPalettes = [
  {
    bar: "from-rose-400 to-pink-400",
    tag: "bg-rose-100 text-rose-600 border-rose-200",
    btn: "bg-rose-500 hover:bg-rose-600",
  },
  {
    bar: "from-amber-400 to-orange-400",
    tag: "bg-amber-100 text-amber-600 border-amber-200",
    btn: "bg-amber-500 hover:bg-amber-600",
  },
  {
    bar: "from-emerald-400 to-teal-400",
    tag: "bg-emerald-100 text-emerald-600 border-emerald-200",
    btn: "bg-emerald-500 hover:bg-emerald-600",
  },
  {
    bar: "from-sky-400 to-blue-400",
    tag: "bg-sky-100 text-sky-600 border-sky-200",
    btn: "bg-sky-500 hover:bg-sky-600",
  },
  {
    bar: "from-violet-400 to-purple-400",
    tag: "bg-violet-100 text-violet-600 border-violet-200",
    btn: "bg-violet-500 hover:bg-violet-600",
  },
  {
    bar: "from-fuchsia-400 to-pink-400",
    tag: "bg-fuchsia-100 text-fuchsia-600 border-fuchsia-200",
    btn: "bg-fuchsia-500 hover:bg-fuchsia-600",
  },
];

export const dynamicParams = false;

export async function generateStaticParams() {
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

  // 목록에서의 인덱스를 구해 같은 팔레트 색상 사용
  const allPosts = getSortedPostsData();
  const postIndex = allPosts.findIndex((p) => p.slug === slug);
  const palette = pastelPalettes[postIndex >= 0 ? postIndex % pastelPalettes.length : 0];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black text-slate-800">글을 찾을 수 없습니다 😢</h1>
          <Link href="/blog" className="text-violet-500 font-bold hover:underline">
            블로그 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative overflow-x-hidden">
      {/* 파스텔 배경 효과 */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-rose-100/30 blur-[120px] rounded-full"></div>
        <div className="absolute top-[30%] -right-[5%] w-[35%] h-[35%] bg-violet-100/30 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[15%] w-[40%] h-[40%] bg-sky-100/30 blur-[120px] rounded-full"></div>
      </div>

      {/* 헤더 */}
      <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-xl border-b border-white/40">
        <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800 transition-colors">
            <span>←</span> 목록으로 돌아가기
          </Link>
          <Link href="/" className="text-sm font-black text-slate-400 hover:text-slate-700 transition-colors">
            홈
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <article className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-slate-100 overflow-hidden">
          {/* 파스텔 컬러 상단 바 */}
          <div className={`h-3 w-full bg-gradient-to-r ${palette.bar}`}></div>

          <div className="p-8 sm:p-16 space-y-10">
            {/* 메타 정보 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${palette.tag}`}>
                  {post.category}
                </span>
                <span className="text-slate-400 text-sm font-bold">{post.date}</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs text-slate-400 font-bold px-3 py-1 bg-slate-50 rounded-full italic">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* 본문 */}
            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-a:text-violet-600 prose-img:rounded-3xl">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            <hr className="border-slate-100" />

            {/* 하단 버튼 */}
            <div className="pt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <Link
                href="/blog"
                className={`w-full sm:w-auto px-10 text-center py-4 rounded-2xl text-sm font-black text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r ${palette.bar}`}
              >
                ← 목록으로 돌아가기
              </Link>
              <div className="text-xs text-slate-300 font-bold uppercase tracking-widest">
                Local Info Blog
              </div>
            </div>
          </div>
        </article>
      </main>

      <footer className="py-16 text-center">
        <div className="text-[10px] font-black tracking-[0.3em] text-slate-300 uppercase">
          © 2026 LOCAL INFO PROJECT
        </div>
      </footer>
    </div>
  );
}
