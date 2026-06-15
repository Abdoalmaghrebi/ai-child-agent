'use client';

import { useState } from 'react';
import VoiceSelector from './VoiceSelector';
import { Persona } from '@/types';

interface PersonaFormProps {
  onSubmit: (persona: Persona) => void;
}

export default function PersonaForm({ onSubmit }: PersonaFormProps) {
  const [step, setStep] = useState(1);
  const [persona, setPersona] = useState<Persona>({
    name: '',
    role: '',
    tone: '',
    rules: [''],
    expertise: [''],
    welcomeMessage: '',
    voiceId: '',
  });

  const updateField = (field: keyof Persona, value: any) => {
    setPersona(prev => ({ ...prev, [field]: value }));
  };

  const addRule = () => updateField('rules', [...persona.rules, '']);
  const addExpertise = () => updateField('expertise', [...persona.expertise, '']);

  const handleSubmit = () => {
    if (persona.name && persona.role && persona.voiceId) {
      onSubmit(persona);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* خطوات التقدم */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`flex-1 h-2 rounded-full ${
              s <= step ? 'bg-primary' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6 animate-in fade-in">
          <h2 className="text-2xl font-bold text-center mb-6">اختر شخصية المساعد 🎭</h2>
          
          <div>
            <label className="block font-bold mb-2">اسم الشخصية</label>
            <input
              type="text"
              className="input"
              placeholder="مثال: الأستاذ أحمد"
              value={persona.name}
              onChange={(e) => updateField('name', e.target.value)}
            />
          </div>

          <div>
            <label className="block font-bold mb-2">الدور / المهنة</label>
            <input
              type="text"
              className="input"
              placeholder="مثال: معلم رياضيات مغامر"
              value={persona.role}
              onChange={(e) => updateField('role', e.target.value)}
            />
          </div>

          <div>
            <label className="block font-bold mb-2">نبرة الحديث</label>
            <input
              type="text"
              className="input"
              placeholder="مثال: شجاع، مرح، يستخدم أمثلة البحر"
              value={persona.tone}
              onChange={(e) => updateField('tone', e.target.value)}
            />
          </div>

          <button onClick={() => setStep(2)} className="btn-primary w-full">
            التالي ←
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-in fade-in">
          <h2 className="text-2xl font-bold text-center mb-6">التخصصات والقواعد 📚</h2>

          <div>
            <label className="block font-bold mb-2">التخصصات</label>
            {persona.expertise.map((exp, i) => (
              <input
                key={i}
                type="text"
                className="input mb-2"
                placeholder="مثال: رياضيات"
                value={exp}
                onChange={(e) => {
                  const newExp = [...persona.expertise];
                  newExp[i] = e.target.value;
                  updateField('expertise', newExp);
                }}
              />
            ))}
            <button onClick={addExpertise} className="text-primary text-sm font-bold">
              + إضافة تخصص
            </button>
          </div>

          <div>
            <label className="block font-bold mb-2">القواعد السلوكية</label>
            {persona.rules.map((rule, i) => (
              <input
                key={i}
                type="text"
                className="input mb-2"
                placeholder="مثال: لا تعطِ الإجابة مباشرة"
                value={rule}
                onChange={(e) => {
                  const newRules = [...persona.rules];
                  newRules[i] = e.target.value;
                  updateField('rules', newRules);
                }}
              />
            ))}
            <button onClick={addRule} className="text-primary text-sm font-bold">
              + إضافة قاعدة
            </button>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="btn-secondary flex-1">
              → السابق
            </button>
            <button onClick={() => setStep(3)} className="btn-primary flex-1">
              التالي ←
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-in fade-in">
          <h2 className="text-2xl font-bold text-center mb-6">اختر الصوت 🎙️</h2>

          <div>
            <label className="block font-bold mb-2">رسالة الترحيب</label>
            <textarea
              className="input min-h-[100px]"
              placeholder="مرحباً يا بطل! جاهز نتعلم سوا؟"
              value={persona.welcomeMessage}
              onChange={(e) => updateField('welcomeMessage', e.target.value)}
            />
          </div>

          <div>
            <label className="block font-bold mb-4">اختر صوت الشخصية</label>
            <VoiceSelector
              selectedVoice={persona.voiceId}
              onSelect={(id) => updateField('voiceId', id)}
            />
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="btn-secondary flex-1">
              → السابق
            </button>
            <button
              onClick={handleSubmit}
              disabled={!persona.voiceId}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              إنشاء الشخصية ✨
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
