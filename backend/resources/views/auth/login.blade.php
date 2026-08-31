<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <title>تسجيل الدخول | لوحة التحكم</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&family=Cairo:wght@300;400;500;700;800&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: "Tajawal", "Cairo", "Segoe UI", Tahoma, Arial, sans-serif; }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-[#01526D] via-[#026b8d] to-[#2FAB4B]">
    <!-- Decorative circles -->
    <div class="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
    <div class="absolute top-1/2 left-1/4 w-32 h-32 bg-[#2FAB4B]/30 rounded-full blur-2xl"></div>

    <!-- Decorative leaves -->
    <svg class="absolute top-8 left-8 w-24 h-24 text-white/20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
    </svg>
    <svg class="absolute bottom-12 right-12 w-20 h-20 text-white/20 rotate-45" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
    </svg>

    <!-- Login card -->
    <div class="relative z-10 w-full max-w-md">
        <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10">
            <!-- Logo / Icon -->
            <div class="text-center mb-8">
                <div class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#01526D] to-[#2FAB4B] flex items-center justify-center shadow-lg">
                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                </div>
                <h1 class="text-3xl font-extrabold text-[#01526D]">واحة الطيب</h1>
                <p class="text-gray-500 mt-2 text-sm">لوحة التحكم — للمشرفين فقط</p>
            </div>

            @if ($errors->any())
                <div class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 text-sm flex items-start gap-3">
                    <svg class="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{{ $errors->first() }}</span>
                </div>
            @endif

            <form method="POST" action="{{ route('login') }}" class="space-y-5">
                @csrf

                <div>
                    <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">البريد الإلكتروني</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                            </svg>
                        </div>
                        <input type="email" id="email" name="email" value="{{ old('email') }}" required
                               class="w-full pr-12 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2FAB4B] focus:border-[#2FAB4B] outline-none transition-all"
                               placeholder="admin@wahatalteeb.com">
                    </div>
                </div>

                <div>
                    <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">كلمة المرور</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                            </svg>
                        </div>
                        <input type="password" id="password" name="password" required
                               class="w-full pr-12 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2FAB4B] focus:border-[#2FAB4B] outline-none transition-all"
                               placeholder="••••••••">
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" id="remember" name="remember" class="w-4 h-4 text-[#2FAB4B] border-gray-300 rounded focus:ring-[#2FAB4B]">
                        <span class="text-sm text-gray-600">تذكرني</span>
                    </label>
                </div>

                <button type="submit"
                        class="w-full bg-gradient-to-l from-[#01526D] to-[#2FAB4B] hover:from-[#01435a] hover:to-[#25913f] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    تسجيل الدخول
                </button>
            </form>

            <div class="mt-8 text-center">
                <p class="text-xs text-gray-400">© {{ date('Y') }} واحة الطيب. جميع الحقوق محفوظة.</p>
            </div>
        </div>
    </div>
</body>
</html>
