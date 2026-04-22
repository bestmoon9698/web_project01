import Image from "next/image";
import localInfo from "../../public/data/local-info.json";

export default function Home() {
  const events = localInfo.filter((item) => item.category === "행사");
  const benefits = localInfo.filter((item) => item.category === "혜택");
  const lastUpdated = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative overflow-x-hidden">
      {/* 화사한 무지개 배경 효과 */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-red-200/30 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] bg-yellow-200/30 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[15%] w-[45%] h-[45%] bg-blue-200/30 blur-[120px] rounded-full"></div>
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-purple-200/20 blur-[150px] rounded-full"></div>
      </div>

      {/* 상단 헤더 */}
      <header className="sticky top-0 z-20 bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 p-[2px]">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-xl">
                🏡
              </div>
            </div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
              우리 동네 생활 정보
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-bold text-slate-600">오늘의 소식 LIVE</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-20 relative">
        {/* 히어로 섹션 */}
        <section className="text-center space-y-6 py-10">
          <div className="inline-block px-4 py-1.5 mb-2 rounded-full bg-gradient-to-r from-red-100 via-yellow-100 via-green-100 via-blue-100 to-purple-100 border border-white text-[11px] font-black text-slate-600 tracking-widest uppercase">
            Town Life Information Guide
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1]">
            매일 만나는 <br />
            <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">똑똑한</span> 동네 생활 🌈
          </h2>
          <p className="text-slate-500 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            파주·고양시의 가장 빠른 축제 소식과 <br />
            당신만을 위한 맞춤형 복지 혜택을 한곳에 담았습니다.
          </p>
        </section>

        {/* 이번 달 행사/축제 */}
        <section className="space-y-8">
          <div className="flex items-end justify-between border-b-2 border-slate-100 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎉</span>
                <h3 className="text-3xl font-black text-slate-800">이번 달 행사/축제</h3>
              </div>
              <p className="text-slate-400 font-medium pl-10 text-sm">놓치면 후회할 동네 핫플레이스 정보</p>
            </div>
            <button className="text-sm font-bold text-orange-500 hover:underline">전체보기 +</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => {
              const gradients = [
                "from-red-500 to-orange-500",
                "from-green-500 to-emerald-500",
                "from-blue-500 to-indigo-500"
              ];
              return (
                <div key={event.id} className="group relative bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 border border-slate-100">
                  <div className={`h-3 w-full bg-gradient-to-r ${gradients[index % gradients.length]}`}></div>
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                      <span className={`bg-gradient-to-r ${gradients[index % gradients.length]} text-white text-[10px] font-black px-3 py-1 rounded-full uppercase`}>
                        {event.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                        {event.startDate}
                      </div>
                    </div>
                    <h4 className="text-2xl font-black mb-4 leading-tight group-hover:text-slate-700 transition-colors">
                      {event.name}
                    </h4>
                    <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">
                      {event.summary}
                    </p>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-base">📍</div>
                        {event.location}
                      </div>
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-base">👥</div>
                        {event.target}
                      </div>
                    </div>
                    <a
                      href={`/info/${event.id}`}
                      className={`block w-full text-center py-4 rounded-2xl text-sm font-black text-white shadow-lg bg-gradient-to-r ${gradients[index % gradients.length]} hover:brightness-110 transition-all active:scale-[0.98]`}
                    >
                      자세히 보기
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 지원금/혜택 정보 */}
        <section className="space-y-8">
          <div className="flex items-end justify-between border-b-2 border-slate-100 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-3xl">💰</span>
                <h3 className="text-3xl font-black text-slate-800">지원금/혜택 정보</h3>
              </div>
              <p className="text-slate-400 font-medium pl-10 text-sm">나만 몰랐던 정부 보조금과 지역 혜택</p>
            </div>
            <button className="text-sm font-bold text-blue-500 hover:underline">전체보기 +</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const rainbowGradients = [
                "from-pink-500 via-purple-500 to-indigo-500",
                "from-cyan-500 via-blue-500 to-indigo-500"
              ];
              return (
                <div key={benefit.id} className="group relative bg-white rounded-[2.5rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] transition-all duration-500 border border-slate-100 overflow-hidden">
                  {/* 화려한 무지개 테두리 효과 */}
                  <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${rainbowGradients[index % rainbowGradients.length]}`}></div>
                  
                  <div className="flex justify-between items-start mb-8">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${rainbowGradients[index % rainbowGradients.length]} text-white text-2xl shadow-lg`}>
                      {index === 0 ? "🏠" : "👶"}
                    </div>
                    <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                      Benefit
                    </span>
                  </div>

                  <h4 className="text-3xl font-black mb-4 leading-tight">
                    {benefit.name}
                  </h4>
                  <p className="text-slate-500 text-lg font-medium mb-10 leading-relaxed">
                    {benefit.summary}
                  </p>

                  <div className="grid grid-cols-2 gap-6 p-6 rounded-3xl bg-slate-50 mb-10">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-black mb-2 tracking-wider">지원대상</span>
                      <span className="text-sm font-bold text-slate-700">{benefit.target}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-black mb-2 tracking-wider">신청장소</span>
                      <span className="text-sm font-bold text-slate-700">{benefit.location}</span>
                    </div>
                  </div>

                  <a
                    href={`/info/${benefit.id}`}
                    className={`inline-flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r ${rainbowGradients[index % rainbowGradients.length]} font-black text-lg group-hover:gap-5 transition-all`}
                  >
                    지금 혜택 확인하기 <span>→</span>
                  </a>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* 하단 푸터 */}
      <footer className="bg-slate-950 text-slate-400 py-20 mt-20 relative overflow-hidden">
        {/* 푸터 배경 효과 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 opacity-50"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <div className="text-white font-black text-3xl tracking-tighter flex items-center justify-center md:justify-start gap-2">
                <span className="text-4xl text-orange-500">🏡</span> 우리 동네 생활 정보
              </div>
              <p className="text-sm leading-relaxed max-w-md mx-auto md:mx-0 font-medium">
                우리는 매일 수집되는 공공데이터를 기반으로 <br />
                당신의 더 나은 일상을 위한 최신 정보를 전달합니다.
              </p>
              <div className="text-[10px] text-slate-600 font-bold tracking-widest uppercase">
                Data Source: Public Data Portal (data.go.kr)
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center md:text-right">
                <div className="text-[10px] text-slate-500 font-black uppercase tracking-tighter mb-1">Last Sync Date</div>
                <div className="text-white font-black text-xl">{lastUpdated}</div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg hover:bg-white/10 cursor-pointer transition-colors">✨</div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg hover:bg-white/10 cursor-pointer transition-colors">📱</div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg hover:bg-white/10 cursor-pointer transition-colors">💌</div>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/5 text-center text-[10px] font-black tracking-[0.3em] text-slate-700 uppercase">
            © 2024 LOCAL INFO PROJECT. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
