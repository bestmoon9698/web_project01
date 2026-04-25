const fs = require('fs');
const path = require('path');

async function generateBlogPost() {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const DATA_PATH = path.join(__dirname, '../public/data/local-info.json');
  const POSTS_DIR = path.join(__dirname, '../src/content/posts');

  if (!GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY 환경변수가 설정되지 않았습니다.');
    process.exit(1);
  }

  try {
    // 1단계: 최신 데이터 확인
    const localInfo = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
    if (localInfo.length === 0) {
      console.log('처리할 데이터가 없습니다.');
      return;
    }

    const latestItem = localInfo[localInfo.length - 1];
    
    // 기존 파일들과 비교 (제목 기준)
    const files = fs.readdirSync(POSTS_DIR);
    let alreadyExists = false;
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
      if (content.includes(`title: ${latestItem.name}`) || content.includes(latestItem.name)) {
        alreadyExists = true;
        break;
      }
    }

    if (alreadyExists) {
      console.log('이미 작성된 글입니다.');
      return;
    }

    // 2단계: Gemini AI로 블로그 글 생성
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    const today = new Date().toISOString().split('T')[0];

    const prompt = `아래 공공서비스 정보를 바탕으로 블로그 글을 작성해줘.

정보: ${JSON.stringify(latestItem, null, 2)}

아래 형식으로 출력해줘. 반드시 이 형식만 출력하고 다른 텍스트는 없이:
---
title: (친근하고 흥미로운 제목)
date: ${today}
summary: (한 줄 요약)
category: 정보
tags: [태그1, 태그2, 태그3]
---

(본문: 800자 이상, 친근한 블로그 톤, 추천 이유 3가지 포함, 신청 방법 안내)

마지막 줄에 FILENAME: YYYY-MM-DD-keyword 형식으로 파일명도 출력해줘. 키워드는 영문으로.`;

    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const geminiResult = await geminiResponse.json();
    if (geminiResult.error) {
      throw new Error(geminiResult.error.message);
    }

    let textResult = geminiResult.candidates[0].content.parts[0].text;
    
    // FILENAME 추출 및 본문 분리
    const filenameMatch = textResult.match(/FILENAME:\s*(\d{4}-\d{2}-\d{2}-[\w-]+)/);
    let filename = `${today}-post.md`;
    let finalContent = textResult;

    if (filenameMatch) {
      filename = `${filenameMatch[1]}.md`;
      finalContent = textResult.replace(/FILENAME:.*$/, '').trim();
    }

    // 마크다운 코드블록 제거 (혹시 포함된 경우)
    finalContent = finalContent.replace(/^```markdown\n|```$/g, '').trim();

    // 3단계: 파일 저장
    const savePath = path.join(POSTS_DIR, filename);
    fs.writeFileSync(savePath, finalContent, 'utf-8');

    console.log(`블로그 글 생성 완료: ${filename}`);

  } catch (error) {
    console.error('오류 발생:', error);
  }
}

generateBlogPost();
