import Link from "next/link";
import localInfo from "../../../../public/data/local-info.json";

export function generateStaticParams() {
  return localInfo.map((info) => ({
    id: info.id.toString(),
  }));
}

export default async function InfoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const info = localInfo.find((item) => item.id.toString() === id);

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black text-slate-800">정보를 찾을 수 없습니다 😢</h1>
          <Link href="/" className="text-blue-500 font-bold hover:underline">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const isBenefit = info.category === "혜택";

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative overflow-x-hidden">
      {/* 배경 효과 (메인 페이지와 동일) */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-red-200/20 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] bg-yellow-200/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[15%] w-[45%] h-[45%] bg-blue-200/20 blur-[120px] rounded-full"></div>
      </div>

      <header className="sticky top-0 z-20 bg-white/60 backdrop-blur-xl border-b border-white/40">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800 transition-colors">
            <span>←</span> 목록으로 돌아가기
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <article className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-slate-100 overflow-hidden">
          {/* 상단 장식바 */}
          <div className={`h-4 w-full bg-gradient-to-r ${isBenefit ? "from-pink-500 via-purple-500 to-indigo-500" : "from-orange-500 via-yellow-500 to-green-500"}`}></div>
          
          <div className="p-8 sm:p-16 space-y-10">
            {/* 카테고리 태그 */}
            <div>
              <span className={`inline-block px-4 py-1.5 rounded-full text-[11px] font-black tracking-widest uppercase ${isBenefit ? "bg-indigo-100 text-indigo-600" : "bg-orange-100 text-orange-600"}`}>
                {info.category}
              </span>
            </div>

            {/* 제목 */}
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 leading-tight">
              {info.name}
            </h1>

            {/* 주요 정보 카드 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-[2rem] bg-slate-50 space-y-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">일정/기간</span>
                <p className="font-bold text-slate-700">{info.startDate} {info.endDate !== "상시" ? `~ ${info.endDate}` : "(상시)"}</p>
              </div>
              <div className="p-6 rounded-[2rem] bg-slate-50 space-y-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">장소/위치</span>
                <p className="font-bold text-slate-700">{info.location}</p>
              </div>
              <div className="p-6 rounded-[2rem] bg-slate-50 space-y-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">지원대상</span>
                <p className="font-bold text-slate-700">{info.target}</p>
              </div>
            </div>

            {/* 상세 설명 */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                <span className="text-3xl">{isBenefit ? "💰" : "📝"}</span> 상세 정보
              </h2>
              <div className="text-slate-600 text-lg leading-relaxed font-medium whitespace-pre-wrap bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100">
                {info.summary}
                <br /><br />
                이 정보는 공공데이터포털의 최신 데이터를 바탕으로 작성되었습니다. 구체적인 신청 방법이나 축제 프로그램 세부 사항은 아래 원본 사이트 버튼을 클릭하여 확인해 주세요.
              </div>
            </div>

            {/* 하단 버튼 */}
            <div className="pt-10 flex flex-col sm:flex-row gap-4">
              <a
                href={info.link}
                className={`flex-1 text-center py-5 rounded-[2rem] text-lg font-black text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${isBenefit ? "bg-gradient-to-r from-pink-500 to-indigo-600" : "bg-gradient-to-r from-orange-500 to-red-600"}`}
              >
                원본 사이트에서 자세히 보기 →
              </a>
              <Link
                href="/"
                className="px-10 text-center py-5 rounded-[2rem] text-lg font-black text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all"
              >
                목록으로
              </Link>
            </div>
          </div>
        </article>
      </main>

      <footer className="py-20 text-center">
        <div className="text-[10px] font-black tracking-[0.3em] text-slate-300 uppercase">
          © 2024 LOCAL INFO PROJECT
        </div>
      </footer>
    </div>
  );
}
