import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";

export default function BlogListPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative overflow-x-hidden">
      {/* 배경 효과 */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-blue-100/40 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[35%] h-[35%] bg-purple-100/40 blur-[100px] rounded-full"></div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            우리 동네 소식 블로그 📖
          </h1>
          <p className="text-slate-500 font-medium text-lg">
            AI가 전해드리는 최신 지역 생활 정보와 유용한 팁을 만나보세요.
          </p>
        </header>

        <div className="space-y-8">
          {allPostsData.length > 0 ? (
            allPostsData.map((post) => (
              <article key={post.slug} className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-indigo-100">
                      {post.category}
                    </span>
                    <span className="text-slate-400 text-xs font-bold">{post.date}</span>
                  </div>
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-slate-400 font-medium italic">#{tag}</span>
                    ))}
                  </div>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl sm:text-3xl font-black mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-slate-500 text-lg mb-6 leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-blue-600 font-black hover:gap-4 transition-all">
                  더 읽어보기 <span>→</span>
                </Link>
              </article>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-bold">아직 작성된 글이 없습니다. 곧 새로운 소식으로 찾아뵐게요! ✨</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
