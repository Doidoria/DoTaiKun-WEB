import React, { useState, useEffect } from 'react';
import { db, storage } from '../../firebase.js';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function ContestAdmin() {
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', author: '', mainImg: '', images: [] });

  const fetchCandidates = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "contest_votes"));
      const data = querySnapshot.docs.map(doc => doc.data());
      data.sort((a, b) => a.id - b.id);
      setCandidates(data);
    } catch (error) {
      console.error("데이터 불러오기 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleAddNew = () => {
    const newId = candidates.length > 0 ? Math.max(...candidates.map(c => c.id)) + 1 : 1;
    setEditingId("NEW");
    setFormData({ id: newId, title: '', author: '', mainImg: '', images: [], votes: 0 });
  };

  const handleEdit = (candidate) => {
    setEditingId(candidate.id);
    setFormData({ ...candidate, images: candidate.images || [] });
  };

  const handleDelete = async (id) => {
    if (window.confirm("정말로 이 참가자를 삭제하시겠습니까?")) {
      await deleteDoc(doc(db, "contest_votes", id.toString()));
      alert("삭제되었습니다.");
      fetchCandidates();
    }
  };

  // --- 📸 파일 업로드 함수 ---
  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Firebase Storage에 저장될 파일 이름 (중복 방지를 위해 현재 시간 추가)
      const fileRef = ref(storage, `contest/${Date.now()}_${file.name}`);
      
      // 1. 파일 업로드
      await uploadBytes(fileRef, file);
      
      // 2. 업로드된 파일의 웹 URL 가져오기
      const downloadURL = await getDownloadURL(fileRef);

      // 3. 상태(formData) 업데이트
      if (type === 'main') {
        setFormData(prev => ({ ...prev, mainImg: downloadURL }));
      } else if (type === 'slide') {
        setFormData(prev => ({ ...prev, images: [...prev.images, downloadURL] }));
      }
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드에 실패했습니다. Firebase Storage 권한 설정을 확인해주세요.");
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  // 이미지 순서 변경 함수
  const moveImage = (index, direction) => {
    const newImages = [...formData.images];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    // 범위를 벗어나면 중단
    if (targetIndex < 0 || targetIndex >= newImages.length) return;

    // 위치 스왑 (Swap)
    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;

    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.author) {
      return alert("건축물 이름과 제작자 이름은 필수입니다.");
    }
    if (isUploading) {
      return alert("이미지가 업로드 중입니다. 잠시만 기다려주세요.");
    }

    try {
      const docRef = doc(db, "contest_votes", formData.id.toString());
      if (editingId === "NEW") {
        await setDoc(docRef, formData);
      } else {
        await updateDoc(docRef, formData);
      }
      alert("저장되었습니다!");
      setEditingId(null);
      fetchCandidates();
    } catch (error) {
      console.error("저장 실패:", error);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-white bg-[#1E1E1E]">로딩 중...</div>;

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white p-10 pt-24">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#E6BE39]">🛠️ 콘테스트 관리자</h1>
          <button onClick={handleAddNew} className="bg-[#73F482] text-black font-bold px-4 py-2 rounded">
            + 새 참가자
          </button>
        </div>

        {editingId && (
          <div className="bg-[#2A2A2A] p-6 rounded-lg mb-8 border border-white/20">
            <h2 className="text-xl font-bold mb-4">{editingId === "NEW" ? "새 참가자 등록" : "참가자 정보 수정"}</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">제작자</label>
                <input type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full bg-[#1C1C1C] border border-gray-600 rounded px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">건축물 이름</label>
                <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#1C1C1C] border border-gray-600 rounded px-3 py-2 text-white" />
              </div>
            </div>

            {/* 메인 이미지 파일 업로드 */}
            <div className="mb-6 bg-[#1C1C1C] p-4 rounded border border-gray-600">
              <label className="block text-sm text-[#E6BE39] font-bold mb-2">대표 썸네일 이미지</label>
              <div className="flex items-center gap-4">
                {formData.mainImg && (
                  <img src={formData.mainImg} alt="main" className="w-24 h-24 object-cover rounded border border-white/20" />
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleFileUpload(e, 'main')} 
                  disabled={isUploading}
                  className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#E6BE39] file:text-black hover:file:bg-yellow-400 cursor-pointer"
                />
              </div>
            </div>

            {/* 슬라이드 이미지 파일 업로드 */}
            <div className="mb-6 bg-[#1C1C1C] p-4 rounded border border-gray-600">
              <label className="block text-sm text-[#E6BE39] font-bold mb-2">상세 슬라이드 이미지 (여러 장 추가 가능)</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleFileUpload(e, 'slide')} 
                disabled={isUploading}
                className="mb-4 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-400 cursor-pointer"
              />
              
              <div className="flex flex-wrap gap-4 mt-2">
                {formData.images.map((imgUrl, index) => (
                    <div key={index} className="relative w-24 h-24 group">
                    <img src={imgUrl} alt={`slide-${index}`} className="w-full h-full object-cover rounded border border-white/20" />
                    
                    {/* 이미지 제어 버튼들 (마우스 호버 시 노출) */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                        <div className="flex gap-1">
                        {/* 위로 이동 (첫 번째 사진은 숨김) */}
                        {index > 0 && (
                            <button onClick={() => moveImage(index, 'up')} className="bg-blue-500 text-white text-xs p-1 rounded">▲</button>
                        )}
                        {/* 아래로 이동 (마지막 사진은 숨김) */}
                        {index < formData.images.length - 1 && (
                            <button onClick={() => moveImage(index, 'down')} className="bg-blue-500 text-white text-xs p-1 rounded">▼</button>
                        )}
                        </div>
                        <button 
                        onClick={() => handleRemoveImage(index)} 
                        className="bg-red-600 text-white text-xs px-2 py-1 rounded font-bold"
                        >
                        삭제
                        </button>
                    </div>
                    
                    {/* 순서 표시 번호 */}
                    <div className="absolute bottom-0 left-0 bg-black/70 text-[10px] px-1 rounded-tr-md">
                        {index + 1}
                    </div>
                    </div>
                ))}
            </div>
              {formData.images.length === 0 && <p className="text-gray-500 text-sm">등록된 상세 이미지가 없습니다.</p>}
            </div>

            {isUploading && <p className="text-[#73F482] font-bold mb-4">이미지 업로드 중... 잠시만 기다려주세요</p>}

            <div className="flex gap-3 justify-end mt-4">
              <button onClick={() => setEditingId(null)} className="px-5 py-2 rounded bg-gray-600">취소</button>
              <button onClick={handleSave} disabled={isUploading} className="px-5 py-2 rounded bg-[#E6BE39] text-black font-bold disabled:opacity-50">저장하기</button>
            </div>
          </div>
        )}

        {/* 기존 참가자 리스트 부분은 이전과 동일합니다 */}
        <div className="space-y-4">
          {candidates.map(c => (
             <div key={c.id} className="bg-[#1C1C1C] p-4 rounded-lg flex items-center justify-between border border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-black rounded overflow-hidden flex-shrink-0 border border-gray-600">
                  {c.mainImg ? <img src={c.mainImg} alt="main" className="w-full h-full object-cover" /> : <span className="text-[10px] text-gray-500 flex h-full items-center justify-center">No Img</span>}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{c.title} <span className="text-sm font-normal text-gray-400">({c.author})</span></h3>
                  <p className="text-sm text-gray-400">득표수: <span className="text-[#73F482] font-bold">{c.votes}표</span> | 상세 사진: {c.images?.length || 0}장</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(c)} className="bg-blue-600 px-4 py-2 rounded text-sm hover:bg-blue-500">수정</button>
                <button onClick={() => handleDelete(c.id)} className="bg-red-600 px-4 py-2 rounded text-sm hover:bg-red-500">삭제</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}