<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <title>@yield('title', 'لوحة التحكم') | واحة الطيب</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&family=Cairo:wght@300;400;500;700;800&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: "Tajawal", "Cairo", "Segoe UI", Tahoma, Arial, sans-serif; }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    <!-- Mobile overlay -->
    <div id="sidebar-overlay" class="fixed inset-0 bg-black/50 z-40 hidden lg:hidden" onclick="toggleSidebar()"></div>

    <div class="flex min-h-screen">
        <!-- Sidebar -->
        <aside id="sidebar" class="fixed lg:sticky top-0 right-0 z-50 h-screen w-64 bg-[#01526D] text-white transform translate-x-full lg:translate-x-0 transition-transform duration-300 flex flex-col">
            <!-- Logo -->
            <div class="p-6 border-b border-white/10">
                <a href="{{ route('admin.dashboard') }}" class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-[#2FAB4B] flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                        </svg>
                    </div>
                    <div>
                        <div class="font-bold text-lg leading-tight">واحة الطيب</div>
                        <div class="text-xs text-white/70">لوحة التحكم</div>
                    </div>
                </a>
            </div>

            <!-- Navigation -->
            <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
                <a href="{{ route('admin.dashboard') }}" class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors {{ request()->routeIs('admin.dashboard') ? 'bg-[#2FAB4B] hover:bg-[#2FAB4B]' : '' }}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                    <span>الرئيسية</span>
                </a>

                <a href="{{ route('admin.categories.index') }}" class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors {{ request()->routeIs('admin.categories.*') ? 'bg-[#2FAB4B] hover:bg-[#2FAB4B]' : '' }}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                    </svg>
                    <span>التخصصات</span>
                </a>

                <a href="{{ route('admin.brands.index') }}" class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors {{ request()->routeIs('admin.brands.*') ? 'bg-[#2FAB4B] hover:bg-[#2FAB4B]' : '' }}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                    </svg>
                    <span>العلامات التجارية</span>
                </a>

                <a href="{{ route('admin.products.index') }}" class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors {{ request()->routeIs('admin.products.*') ? 'bg-[#2FAB4B] hover:bg-[#2FAB4B]' : '' }}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                    </svg>
                    <span>المنتجات</span>
                </a>

                <a href="{{ route('admin.contacts.index') }}" class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors {{ request()->routeIs('admin.contacts.*') ? 'bg-[#2FAB4B] hover:bg-[#2FAB4B]' : '' }}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <span>رسائل التواصل</span>
                </a>

                <a href="{{ route('admin.orders.index') }}" class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors {{ request()->routeIs('admin.orders.*') ? 'bg-[#2FAB4B] hover:bg-[#2FAB4B]' : '' }}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                    </svg>
                    <span>طلبات الأسعار</span>
                </a>
            </nav>

            <!-- Logout -->
            <div class="p-4 border-t border-white/10">
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/20 text-red-100 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                        <span>تسجيل الخروج</span>
                    </button>
                </form>
            </div>
        </aside>

        <!-- Main content -->
        <div class="flex-1 flex flex-col min-w-0">
            <!-- Top header -->
            <header class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
                <div class="flex items-center gap-4">
                    <button type="button" onclick="toggleSidebar()" class="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-[#01526D]">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                    <h1 class="text-xl font-bold text-[#01526D]">@yield('title', 'لوحة التحكم')</h1>
                </div>
                <div class="flex items-center gap-3">
                    <span class="text-sm text-gray-500">{{ auth()->user()?->name ?? 'مدير النظام' }}</span>
                    <div class="w-9 h-9 rounded-full bg-[#2FAB4B] text-white flex items-center justify-center font-bold text-sm">
                        {{ mb_substr(auth()->user()?->name ?? 'م', 0, 1) }}
                    </div>
                </div>
            </header>

            <main class="flex-1 p-6">
                @if (session('success'))
                    <div class="bg-green-100 text-green-700 p-4 rounded-xl mb-6 border border-green-200">
                        {{ session('success') }}
                    </div>
                @endif

                @yield('content')
            </main>
        </div>
    </div>

    <script>
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            const isOpen = !sidebar.classList.contains('translate-x-full');

            if (isOpen) {
                sidebar.classList.add('translate-x-full');
                overlay.classList.add('hidden');
            } else {
                sidebar.classList.remove('translate-x-full');
                overlay.classList.remove('hidden');
            }
        }
    </script>
</body>
</html>
