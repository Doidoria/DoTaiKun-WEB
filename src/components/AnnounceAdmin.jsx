import React, { useState, useEffect } from 'react';
import { storage } from '../../firebase.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

export default function AnnounceAdmin() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // 접속 시 로그인 상태 확인 (원본 유지)
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 로그인 버튼 함수 (100% 원본 상세 에러 처리 복구)
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

  // 로그아웃 함수 (원본 유지)
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth);
  };

  // 폼 데이터 상태
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '도타이쿤 운영진',
  });

  // 🌟 고퀄리티 레이아웃을 위한 동적 필드(Fields) 상태 추가
  const [fields, setFields] = useState([]);

  // 🌟 이미지 파일 상태 분리 (메인 이미지 vs 우측 상단 썸네일)
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState('');

  const [isSending, setIsSending] = useState(false);

  // 기본 도타이쿤 로고 아이콘 주소 고정
  const DEFAULT_SERVER_ICON = "https://cdn.discordapp.com/attachments/1488722915556855878/1488723040102781058/icon2.png?ex=69cdd0df&is=69cc7f5f&hm=f9611aeb7d0ea5b9b663f8d844bde1e29faa051364ce798de6b9538d1c639e3f&";

  // 텍스트 입력 핸들러 (원본 유지)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 🌟 필드 추가 함수 (최대 25개 제한)
  const handleAddField = () => {
    if (fields.length >= 25) {
      return alert("디스코드 규정상 필드는 최대 25개까지만 생성할 수 있습니다.");
    }
    setFields(prev => [...prev, { id: Date.now(), name: '', value: '' }]);
  };

  // 🌟 필드 내용 변경 핸들러
  const handleFieldChange = (id, key, value) => {
    setFields(prev => prev.map(f => f.id === id ? { ...f, [key]: value } : f));
  };

  // 🌟 필드 삭제 함수
  const handleRemoveField = (id) => {
    setFields(prev => prev.filter(f => f.id !== id));
  };

  // 메인 이미지 파일 선택 핸들러 (원본 유지)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); 
    }
  };

  // 🌟 우측 상단 썸네일 파일 선택 핸들러 추가
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 공지사항 전송 버튼 클릭 시 (100% 원본 확인창 문구 및 전송 규격 복구)
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
    let finalThumbnailUrl = "";

    try {
      // 1. 메인 이미지가 있다면 Firebase Storage에 업로드
      if (imageFile) {
        const fileRef = ref(storage, `announcements/main_${Date.now()}_${imageFile.name}`);
        await uploadBytes(fileRef, imageFile);
        finalImageUrl = await getDownloadURL(fileRef);
      }

      // 2. 🌟 썸네일 이미지가 있다면 Firebase Storage에 업로드
      if (thumbnailFile) {
        const thumbRef = ref(storage, `announcements/thumb_${Date.now()}_${thumbnailFile.name}`);
        await uploadBytes(thumbRef, thumbnailFile);
        finalThumbnailUrl = await getDownloadURL(thumbRef);
      }

      // 3. 입력된 필드 중 제목과 내용이 둘 다 채워진 유효한 필드만 필터링
      const validFields = fields
        .filter(f => f.name.trim() && f.value.trim())
        .map(f => ({ name: f.name.trim(), value: f.value.trim() }));

      // 4. 백엔드 API로 통합 데이터 전송 요청
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
          imageUrl: finalImageUrl,
          thumbnailUrl: finalThumbnailUrl, // 동적 썸네일 추가
          fields: validFields // 가공된 필드 배열 추가
        })
      });

      const result = await response.json();

      if (result.success) {
        alert("성공적으로 디스코드에 공지가 전송되었습니다! 🎉");
        // 원본 양식 초기화 텍스트 100% 복구 (👑 도타이쿤 운영진)
        setFormData({ title: '', content: '', author: '👑 도타이쿤 운영진' });
        setFields([]);
        setImageFile(null);
        setPreviewUrl('');
        setThumbnailFile(null);
        setThumbnailPreviewUrl('');
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

  // 로그인 폼 렌더링 (원본 레이아웃 및 스타일 100% 복구)
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
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* 왼쪽: 공지사항 작성 폼 */}
        <div className="bg-[#2A2A2A] p-8 rounded-[20px] shadow-2xl border border-white/10 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#E6BE39] flex items-center gap-2">
              📢 디스코드 공지사항 전송
            </h1>
            <button onClick={handleLogout} className="text-xs bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white px-3 py-1.5 rounded-lg border border-red-500/30 transition-all font-bold">
              로그아웃
            </button>
          </div>

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
                maxLength={200} // 원본 맥스렝스 복구
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2 font-bold">공지 내용 (Content)</label>
              <textarea 
                name="content"
                value={formData.content} 
                onChange={handleChange}
                placeholder="공지할 내용을 상세히 적어주세요. (디스코드 마크다운 지원: **굵게**, *기울기* 등)"
                className="w-full bg-[#1C1C1C] border border-gray-600 rounded-lg px-4 py-3 text-white h-48 resize-none focus:outline-none focus:border-[#E6BE39] transition-colors" // 원본 높이 복구
              />
            </div>

            {/* 🌟 프리미엄 동적 하이라이트 컨테이너 */}
            <div className="border-t border-white/10 pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-sm text-[#E6BE39] font-bold">💎 하이라이트 항목 카드 (선택 필드)</label>
                <button 
                  type="button" onClick={handleAddField}
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs px-3 py-1.5 rounded font-bold transition-all flex items-center gap-1 shadow-md"
                >
                  ➕ 항목 추가하기
                </button>
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                {fields.length === 0 && (
                  <p className="text-xs text-gray-500 italic py-2 text-center bg-[#1C1C1C] rounded-lg border border-dashed border-gray-700">
                    추가된 하이라이트 항목이 없습니다. (더 화려하게 꾸미려면 추가해 보세요!)
                  </p>
                )}
                {fields.map((field) => (
                  <div key={field.id} className="bg-[#1C1C1C] p-3 rounded-lg border border-gray-700 flex gap-2 items-center shadow-inner">
                    <input 
                      type="text" placeholder="예: ✨ 이벤트 보상" value={field.name}
                      onChange={(e) => handleFieldChange(field.id, 'name', e.target.value)}
                      className="w-1/3 bg-[#2A2A2A] border border-gray-600 rounded px-2 py-1.5 text-xs font-bold text-[#E6BE39] focus:outline-none focus:border-[#E6BE39]"
                    />
                    <textarea 
                      placeholder="상세 내용을 입력하세요. (줄바꿈 가능)" value={field.value}
                      onChange={(e) => handleFieldChange(field.id, 'value', e.target.value)}
                      className="w-2/3 bg-[#2A2A2A] border border-gray-600 rounded px-2 py-1 text-xs text-white h-10 resize-none focus:outline-none focus:border-[#E6BE39]"
                    />
                    <button 
                      type="button" onClick={() => handleRemoveField(field.id)}
                      className="text-red-400 hover:text-red-600 font-bold px-2 text-sm"
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 파일 및 작성자 업로드 영역 (3분할 복구 및 썸네일 기능 추가) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-4">
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
                <label className="block text-sm text-[#73F482] mb-2 font-bold">메인 이미지 (하단)</label>
                <div className="flex items-center gap-3 bg-[#1C1C1C] border border-gray-600 rounded-lg px-2 py-2">
                    <label className="cursor-pointer bg-[#313338] hover:bg-gray-600 text-white px-3 py-2 rounded font-bold transition-colors text-sm shadow-sm whitespace-nowrap border border-white/10">
                    이미지 찾기
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                    <span className="text-sm text-gray-400 truncate w-full">
                    {imageFile ? imageFile.name : "선택 안 됨"}
                    </span>
                </div>
              </div>

              {/* 🌟 100% 무생략 구현: 우측 상단 썸네일 업로드 필드 */}
              <div>
                <label className="block text-sm text-[#00A8FC] mb-2 font-bold">우측 상단 썸네일</label>
                <div className="flex items-center gap-3 bg-[#1C1C1C] border border-gray-600 rounded-lg px-2 py-2">
                    <label className="cursor-pointer bg-[#313338] hover:bg-gray-600 text-white px-3 py-2 rounded font-bold transition-colors text-sm shadow-sm whitespace-nowrap border border-white/10">
                    파일 선택
                    <input type="file" accept="image/*" onChange={handleThumbnailChange} className="hidden" />
                    </label>
                    <span className="text-sm text-gray-400 truncate w-full">
                    {thumbnailFile ? thumbnailFile.name : "기본 로고"}
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

        {/* 오른쪽: 디스코드 출력 미리보기 화면 (100% 동기화 싱크 미러링) */}
        <div className="bg-[#313338] p-6 rounded-[10px] shadow-2xl h-fit border border-[#1E1F22] sticky top-6">
          <h2 className="text-gray-400 font-bold mb-4 text-sm flex items-center gap-2">
            디스코드 출력 미리보기
          </h2>
          
          <div className="flex gap-4">
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
              <div className="border-l-4 border-[#E6BE39] bg-[#2B2D31] rounded-r-md p-4 max-w-[520px] relative">
                
                {/* 🌟 실시간 커스텀 썸네일 미리보기 반영 */}
                <img 
                  src={thumbnailPreviewUrl || DEFAULT_SERVER_ICON} 
                  alt="server_thumbnail" 
                  className="w-14 h-14 absolute top-4 right-4 rounded-lg object-cover bg-[#1E1F22] border border-white/5 hidden sm:block" 
                />

                <div className="flex items-center gap-2 mb-2 pr-16">
                  <img src={DEFAULT_SERVER_ICON} alt="icon" className="w-4 h-4 rounded-full" />
                  <span className="text-gray-300 font-bold text-xs">도타이쿤 서버 공식 공지사항</span>
                </div>
                
                <h3 className="text-white font-bold text-base mb-2 break-words pr-16">
                  📢 {formData.title || "제목이 여기에 표시됩니다"}
                </h3>
                
                <div className="text-[#DBDEE1] text-sm whitespace-pre-wrap break-words w-full pr-2">
                    {formData.content || "공지사항 내용이 여기에 표시됩니다..."}
                    {/* 🌟 모바일에서도 절대 안 부서지는 줄바꿈 방지 구분선 */}
                    <div className="text-gray-500 my-2 select-none">━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
                </div>

                {/* 🌟 100% 매칭: 디스코드 코드 블록 스타일 회색 사각 박스 리얼 미러링 */}
                {fields.filter(f => f.name.trim() || f.value.trim()).length > 0 && (
                  <div className="space-y-3 mt-4">
                    {fields.map((f, index) => (
                      (f.name.trim() || f.value.trim()) && (
                        <div key={f.id || index} className="min-w-0 break-words">
                          <div className="text-[#E6BE39] font-extrabold text-xs mb-1">
                            {f.name || "📌 항목 이름 미지정"}
                          </div>
                          <div className="bg-[#1e1f22] p-2.5 rounded border border-black/20 text-[#dbdee1] text-xs font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
                            {f.value || "상세 내용 미입력"}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                )}
                
                {previewUrl && (
                  <div className="mt-4 bg-[#1E1F22] rounded-md overflow-hidden border border-white/5">
                    <img src={previewUrl} alt="preview" className="w-full max-h-[300px] object-contain" />
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-4">
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