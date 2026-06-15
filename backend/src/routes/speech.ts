import { Router } from 'express';
import { elevenlabs, VOICE_OPTIONS } from '../lib/elevenlabs';
import { openai } from '../lib/openai';
import multer from 'multer';
import { Readable } from 'stream';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// TTS: نص → صوت
router.post('/synthesize', async (req, res) => {
  try {
    const { text, voice_id } = req.body;
    
    const voice = VOICE_OPTIONS.find(v => v.id === voice_id);
    if (!voice) {
      return res.status(400).json({ error: 'Voice not found' });
    }

    const audio = await elevenlabs.generate({
      voice: voice.elevenLabsVoiceId,
      text: text,
      model_id: 'eleven_turbo_v2_5',
    });

    const chunks: Buffer[] = [];
    for await (const chunk of audio) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(buffer);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'TTS failed' });
  }
});

// STT: صوت → نص (Whisper)
router.post('/transcribe', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file' });
    }

    // ⭐ تحويل Buffer لـ File (Blob) يقبله Whisper
    const audioFile = new File([req.file.buffer], 'audio.webm', {
      type: req.file.mimetype || 'audio/webm',
    });

    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
    });

    res.json({ text: transcription.text });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'STT failed' });
  }
});

// قائمة الأصوات المتاحة
router.get('/voices', (req, res) => {
  res.json(VOICE_OPTIONS);
});

export default router;
