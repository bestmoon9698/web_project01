import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";

const pastelPalettes = [
  {
    bg: "bg-rose-50",
    border: "border-rose-200",
    tag: "bg-rose-100 text-rose-700 border-rose-300",
    accent: "text-rose-600",
    bar: "from-rose-400 to-pink-400",
    hover: "group-hover:text-rose-600",
    readMore: "text-rose-600 border-rose-300 hover:bg-rose-50",
  },
  {
    bg: "bg-amber-50",
    border: "border-amber-200",
    tag: "bg-amber-100 text-amber-700 border-amber-300",
    accent: "text-amber-600",
    bar: "from-amber-400 to-orange-400",
    hover: "group-hover:text-amber-600",
    readMore: "text-amber-600 border-amber-300 hover:bg-amber-50",
  },
  {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    tag: "bg-emerald-100 text-emerald-700 border-emerald-300",
    accent: "text-emerald-600",
    bar: "from-emerald-400 to-teal-400",
    hover: "group-hover:text-emerald-600",
    readMore: "text-emerald-600 border-emerald-300 hover:bg-emerald-50",
  },
  {
    bg: "bg-sky-50",
    border: "border-sky-200",
    tag: "bg-sky-100 text-sky-700 border-sky-300",
    accent: "text-sky-600",
    bar: "from-sky-400 to-blue-400",
    hover: "group-hover:text-sky-600",
    readMore: "text-sky-600 border-sky-300 hover:bg-sky-50",
  },
  {
    bg: "bg-violet-50",
    border: "border-violet-200",
    tag: "bg-violet-100 text-violet-700 border-violet-300",
    accent: "text-violet-600",
    bar: "from-violet-400 to-purple-400",
    hover: "group-hover:text-violet-600",
    readMore: "text-violet-600 border-violet-300 hover:bg-violet-50",
  },
  {
    bg: "bg-fuchsia-50",
    border: "border-fuchsia-200",
    tag: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-300",
    accent: "text-fuchsia-600",
    bar: "from-fuchsia-400 to-pink-400",
    hover: "group-hover:text-fuchsia-600",
    readMore: "text-fuchsia-600 border-fuchsia-300 hover:bg-fuchsia-50",
  },
];

export default function BlogListPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative overflow-x-hidden">
      {/* 파스텔 배경 효과 */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[5%] left-[5%] w-[30%] h-[30%] bg-rose-100/40 blur-[100px] rounded-full"></div>
        <div className="absolute top-[30%] right-[5%] w-[25%] h-[25%] bg-amber-100/40 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[15%] left-[20%] w-[35%] h-[35%] bg-violet-100/40 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[5%] right-[15%] w-[20%] h-[20%] bg-emerald-100/40 blur-[100px] rounded-full"></div>
      </div>

      {/* 상단 네비게이션 */}
      <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-slate-300 text-slate-700 font-black text-sm hover:bg-slate-100 hover:border-slate-400 transition-all"
          >
            ← 메인으로 돌아가기
          </Link>
          <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Blog</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-14 space-y-12">
        {/* 헤더 */}
        <header className="text-center space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-100 via-violet-100 to-sky-100 text-[11px] font-black text-slate-500 tracking-widest uppercase mb-2">
            Local Info Blog
          </div>
          <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-rose-500 via-violet-500 to-sky-500 bg-clip-text text-transparent">
            우리 동네 소식 블로그 📖
          </h1>
          <p className="text-slate-500 font-semibold text-lg">
            파주·고양의 최신 생활 정보와 유용한 팁을 만나보세요.
          </p>
        </header>

        {/* 글 목록 */}
        <div className="space-y-8">
          {allPostsData.length > 0 ? (
            allPostsData.map((post, index) => {
              const palette = pastelPalettes[index % pastelPalettes.length];
              return (
                <article
                  key={post.slug}
                  className={`group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 ${palette.border}`}
                >
                  {/* 상단 컬러 바 */}
                  <div className={`h-2 w-full bg-gradient-to-r ${palette.bar}`}></div>

                  <div className="p-8 sm:p-10">
                    {/* 메타 정보 */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-5">
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-black px-4 py-1.5 rounded-full border-2 ${palette.tag}`}>
                          {post.category}
                        </span>
                        <span className="text-slate-500 text-sm font-bold">{post.date}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs text-slate-500 font-semibold italic bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 제목 */}
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className={`text-2xl sm:text-3xl font-black mb-4 ${palette.hover} transition-colors leading-snug`}>
                        {post.title}
                      </h2>
                    </Link>

                    {/* 요약 */}
                    <p className="text-slate-600 text-base sm:text-lg mb-6 leading-relaxed font-medium line-clamp-3">
                      {post.summary}
                    </p>

                    {/* 더 읽기 버튼 */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 font-black text-sm transition-all hover:gap-4 ${palette.readMore}`}
                    >
                      더 읽어보기 <span>→</span>
                    </Link>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-500 font-bold text-lg">아직 작성된 글이 없습니다. 곧 새로운 소식으로 찾아뵐게요! ✨</p>
            </div>
          )}
        </div>

        {/* 하단 메인 이동 버튼 */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-slate-300 text-slate-700 font-black text-base hover:bg-slate-100 hover:border-slate-400 transition-all shadow-sm hover:shadow-md"
          >
            ← 메인 페이지로 돌아가기
          </Link>
        </div>
      </main>
    </div>
  );
}
