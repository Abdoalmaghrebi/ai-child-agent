import { Router } from 'express';
import { supabase } from '../lib/supabase';

const router = Router();

// إنشاء حساب طفل + Persona
router.post('/children', async (req, res) => {
  try {
    const { parent_id, display_name, age, persona } = req.body;

    const { data, error } = await supabase
      .from('children')
      .insert({
        parent_id,
        display_name,
        age,
        persona_name: persona.name,
        persona_role: persona.role,
        persona_tone: persona.tone,
        persona_rules: persona.rules,
        persona_expertise: persona.expertise,
        persona_welcome: persona.welcomeMessage,
        persona_voice_id: persona.voiceId,
      })
      .select()
      .single();

    if (error) throw error;

    res.json({ child: data });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create child' });
  }
});

// جلب أطفال الأب
router.get('/children/:parent_id', async (req, res) => {
  try {
    const { parent_id } = req.params;

    const { data, error } = await supabase
      .from('children')
      .select('*')
      .eq('parent_id', parent_id);

    if (error) throw error;

    res.json({ children: data });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch children' });
  }
});

// سجل محادثات الطفل
router.get('/conversations/:child_id', async (req, res) => {
  try {
    const { child_id } = req.params;

    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('child_id', child_id)
      .order('created_at', { ascending: true });

    if (error) throw error;

    res.json({ conversations: data });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
});

export default router;
