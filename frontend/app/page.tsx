import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-2xl">
        <div className="text-6xl mb-6">🤖👶</div>
        <h1 className="text-5xl font-bold mb-4">مساعد الأطفال الذكي</h1>
        <p className="text-xl text-gray-600 mb-8">
          أنشئ مساعداً تعليمياً مخصصاً لطفلك مع شخصيات وأصوات ممتعة
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link href="/child-setup" className="btn-primary text-lg">
            ابدأ الآن ✨
          </Link>
          <Link href="/login" className="btn-secondary text-lg">
            تسجيل دخول
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6">
          <div className="card">
            <div className="text-4xl mb-2">🎭</div>
            <h3 className="font-bold">شخصيات مخصصة</h3>
          </div>
          <div className="card">
            <div className="text-4xl mb-2">🎙️</div>
            <h3 className="font-bold">أصوات ممتعة</h3>
          </div>
          <div className="card">
            <div className="text-4xl mb-2">📚</div>
            <h3 className="font-bold">تعلم ذكي</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
