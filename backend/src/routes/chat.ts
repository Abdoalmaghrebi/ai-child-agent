import { Router } from 'express';
import { openai } from '../lib/openai';
import { supabase } from '../lib/supabase';
import { Persona } from '../types';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { child_id, message } = req.body;

    // جلب Persona من Supabase
    const { data: child, error } = await supabase
      .from('children')
      .select('persona')
      .eq('id', child_id)
      .single();

    if (error || !child) {
      return res.status(404).json({ error: 'Child not found' });
    }

    const persona: Persona = child.persona;

    // بناء System Prompt
    const systemPrompt = `
أنت ${persona.name}. ${persona.role}.
نبرة حديثك: ${persona.tone}.
قواعدك:
${persona.rules.map((r: string) => `- ${r}`).join('\n')}
تخصصاتك: ${persona.expertise.join(', ')}.

${persona.welcomeMessage}

تذكر: أنت تتحدث مع طفل. استخدم لغة بسيطة، شجّعه دائماً.
`;

    // إرسال للـ OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices[0].message.content;

    // حفظ في قاعدة البيانات
    await supabase.from('conversations').insert([
      { child_id, role: 'user', content: message },
      { child_id, role: 'assistant', content: reply }
    ]);

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
