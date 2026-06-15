'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PersonaForm from '@/components/persona/PersonaForm';
import { createChild } from '@/lib/api';
import { Persona } from '@/types';

export default function ChildSetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [childInfo, setChildInfo] = useState({ displayName: '', age: '' });
  const [showPersona, setShowPersona] = useState(false);

  async function handleCreatePersona(persona: Persona) {
    setLoading(true);
    try {
      await createChild({
        parent_id: 'temp-parent-id', // ⭐ لاحقاً نربطه بـ Auth
        display_name: childInfo.displayName,
        age: parseInt(childInfo.age),
        persona,
      });
      router.push('/child');
    } catch (err) {
      alert('حدث خطأ، حاول مرة أخرى');
    } finally {
      setLoading(false);
    }
  }

  if (!showPersona) {
    return (
      <div className="card max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">إنشاء حساب الطفل 👶</h1>
        <p className="text-gray-500 text-center mb-8">أدخل معلومات طفلك أولاً</p>

        <div className="space-y-4">
          <div>
            <label className="block font-bold mb-2">اسم الطفل</label>
            <input
              type="text"
              className="input"
              placeholder="مثال: عمر"
              value={childInfo.displayName}
              onChange={(e) => setChildInfo(prev => ({ ...prev, displayName: e.target.value }))}
            />
          </div>

          <div>
            <label className="block font-bold mb-2">العمر</label>
            <input
              type="number"
              className="input"
              placeholder="مثال: 8"
              value={childInfo.age}
              onChange={(e) => setChildInfo(prev => ({ ...prev, age: e.target.value }))}
            />
          </div>

          <button
            onClick={() => setShowPersona(true)}
            disabled={!childInfo.displayName || !childInfo.age}
            className="btn-primary w-full disabled:opacity-50"
          >
            التالي: تخصيص المساعد →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h1 className="text-3xl font-bold text-center mb-2">تخصيص المساعد الذكي 🤖</h1>
      <p className="text-gray-500 text-center mb-8">
        لـ {childInfo.displayName} (عمر {childInfo.age})
      </p>

      {loading ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">جاري إنشاء الشخصية...</p>
        </div>
      ) : (
        <PersonaForm onSubmit={handleCreatePersona} />
      )}
    </div>
  );
}
