import React, { useState, useEffect } from 'react';
import { storage } from '../../firebase.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

export default function AnnounceAdmin() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // 접속 시 로그인 상태 확인
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 로그인 버튼 함수
  // 로그인 버튼 함수
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      alert("관리자님 환영합니다! 👑");
    } catch (error) {
      console.error("🔥 Firebase 로그인 에러 상세:", error.code, error.message);
      
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        alert("로그인 실패: 등록되지 않은 이메일이거나 비밀번호가 틀렸습니다.");
      } else if (error.code === 'auth/invalid-email') {
        alert("로그인 실패: 이메일 형식이 잘못되었습니다.");
      } else {
        alert(`로그인 실패: ${error.code}`);
      }
    }
  };

  // 로그아웃 함수
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth);
  };

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '도타이쿤 운영진',
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isSending, setIsSending] = useState(false);

  // 텍스트 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // 미리보기용 로컬 URL 생성
    }
  };

  // 공지사항 전송 버튼 클릭 시
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      return alert("제목과 내용은 필수 입력사항입니다!");
    }

    if (!window.confirm("디스코드로 공지사항을 전송하시겠습니까? (@everyone 태그가 포함됩니다)")) {
      return;
    }

    setIsSending(true);
    let finalImageUrl = "";

    try {
      // 1. 이미지가 있다면 Firebase Storage에 먼저 업로드
      if (imageFile) {
        const fileRef = ref(storage, `announcements/${Date.now()}_${imageFile.name}`);
        await uploadBytes(fileRef, imageFile);
        finalImageUrl = await getDownloadURL(fileRef);
      }

      // 2. 백엔드(index.js) API로 전송 요청
      const BACKEND_URL = "http://localhost:8080/api/announce"; 
      
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          author: formData.author,
          imageUrl: finalImageUrl // 업로드된 이미지 URL 전달
        })
      });

      const result = await response.json();

      if (result.success) {
        alert("성공적으로 디스코드에 공지가 전송되었습니다! 🎉");
        // 폼 초기화
        setFormData({ title: '', content: '', author: '👑 도타이쿤 운영진' });
        setImageFile(null);
        setPreviewUrl('');
      } else {
        alert(`전송 실패: ${result.message}`);
      }

    } catch (error) {
      console.error("공지사항 전송 중 에러:", error);
      alert("서버 오류로 인해 전송에 실패했습니다.");
    } finally {
      setIsSending(false);
    }
  };

  if (isAuthLoading) return <div className="min-h-screen bg-[#1E1E1E] text-white flex justify-center items-center">인증 정보 확인 중...</div>;

  // 🟢 2. 로그인 안 된 상태면 로그인 폼 렌더링
  if (!user) {
    return (
      <div className="min-h-screen bg-[#1E1E1E] text-white flex justify-center items-center px-4">
        <form onSubmit={handleLogin} className="bg-[#2A2A2A] p-8 rounded-[20px] shadow-2xl border border-white/10 w-full max-w-md flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-[#E6BE39] text-center mb-4">👑 관리자 로그인</h2>
          <input 
            type="email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full bg-[#1C1C1C] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E6BE39]"
          />
          <input 
            type="password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)}
            className="w-full bg-[#1C1C1C] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E6BE39]"
          />
          <button type="submit" className="w-full mt-2 py-3 bg-[#E6BE39] text-[#1C1C1C] font-black rounded-lg hover:brightness-110">로그인</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white px-10 pb-20 pt-[250px]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* 왼쪽: 공지사항 작성 폼 */}
        <div className="bg-[#2A2A2A] p-8 rounded-[20px] shadow-2xl border border-white/10">
          <h1 className="text-3xl font-bold text-[#E6BE39] mb-8 flex items-center gap-2">
            📢 디스코드 공지사항 전송
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2 font-bold">공지 제목 (Title)</label>
              <input 
                type="text" 
                name="title"
                value={formData.title} 
                onChange={handleChange}
                placeholder="예: [업데이트] 도타이쿤 시즌3 정식 오픈 안내"
                className="w-full bg-[#1C1C1C] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E6BE39] transition-colors"
                maxLength={200}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2 font-bold">공지 내용 (Content)</label>
              <textarea 
                name="content"
                value={formData.content} 
                onChange={handleChange}
                placeholder="공지할 내용을 상세히 적어주세요. (디스코드 마크다운 지원: **굵게**, *기울기* 등)"
                className="w-full bg-[#1C1C1C] border border-gray-600 rounded-lg px-4 py-3 text-white h-48 resize-none focus:outline-none focus:border-[#E6BE39] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-bold">작성자 (Author)</label>
                <input 
                  type="text" 
                  name="author"
                  value={formData.author} 
                  onChange={handleChange}
                  className="w-full bg-[#1C1C1C] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E6BE39] transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm text-[#73F482] mb-2 font-bold">첨부 이미지 (선택)</label>
                <div className="flex items-center gap-3 bg-[#1C1C1C] border border-gray-600 rounded-lg px-2 py-2">
                    <label className="cursor-pointer bg-[#313338] hover:bg-gray-600 text-white px-4 py-2 rounded font-bold transition-colors text-sm shadow-sm whitespace-nowrap border border-white/10">
                    이미지 찾기
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden" 
                    />
                    </label>
                    <span className="text-sm text-gray-400 truncate w-full">
                    {imageFile ? imageFile.name : "선택된 파일이 없습니다"}
                    </span>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSending}
              className="w-full mt-6 py-4 bg-[#E6BE39] text-[#1C1C1C] text-xl font-black rounded-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_4px_15px_rgba(230,190,57,0.3)]"
            >
              {isSending ? '전송 중입니다... 🚀' : '디스코드로 공지 쏘기! 📡'}
            </button>
          </form>
        </div>

        {/* 오른쪽: 디스코드 미리보기 화면 */}
        <div className="bg-[#313338] p-6 rounded-[10px] shadow-2xl h-fit border border-[#1E1F22]">
          <h2 className="text-gray-400 font-bold mb-4 text-sm flex items-center gap-2">
            디스코드 출력 미리보기
          </h2>
          
          <div className="flex gap-4">
            {/* 디스코드 기본 프로필 아이콘 흉내 */}
            <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center">
              🤖
            </div>
            
            <div className="flex-1 w-full min-w-0">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-bold text-white">도타이쿤 알리미</span>
                <span className="bg-[#5865F2] text-[10px] px-1.5 py-0.5 rounded text-white font-bold">APP</span>
                <span className="text-gray-400 text-xs">오늘 오후 12:00</span>
              </div>
              
              <div className="text-[#DBDEE1] mb-2 font-bold bg-[#404249] inline-block px-1.5 rounded text-sm">@everyone</div>
              
              {/* 임베드 (Embed) 카드 디자인 */}
              <div className="border-l-4 border-[#E6BE39] bg-[#2B2D31] rounded-r-md p-4 max-w-[520px]">
                <div className="flex items-center gap-2 mb-2">
                  <img src="https://cdn.discordapp.com/attachments/1488722915556855878/1488723040102781058/icon2.png?ex=69cdd0df&is=69cc7f5f&hm=f9611aeb7d0ea5b9b663f8d844bde1e29faa051364ce798de6b9538d1c639e3f&" alt="icon" className="w-5 h-5" />
                  <span className="text-white font-bold text-sm">도타이쿤 서버 공식 공지사항</span>
                </div>
                
                <h3 className="text-[#00A8FC] font-bold text-base mb-2 break-words">
                  📢 {formData.title || "제목이 여기에 표시됩니다"}
                </h3>
                
                <div className="text-[#DBDEE1] text-sm whitespace-pre-wrap mb-4 break-words">
                  {formData.content || "공지사항 내용이 여기에 표시됩니다..."}
                  <br/><br/>
                  ━━━━━━━━━━━━━━━━━━━━━━━━━━
                </div>
                
                {previewUrl && (
                  <img src={previewUrl} alt="preview" className="rounded-md max-w-full max-h-[300px] object-contain mb-4" />
                )}
                
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                  <span>작성자 : {formData.author} • DoTaiKun Server • 오늘 오후 12:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}