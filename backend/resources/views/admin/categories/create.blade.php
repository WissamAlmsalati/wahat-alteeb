@extends('layouts.admin')

@section('title', 'إضافة تخصص')

@section('content')
<div class="max-w-xl mx-auto bg-white rounded-xl shadow-sm p-6">
    <h1 class="text-xl font-bold text-[#01526D] mb-6">إضافة تخصص جديد</h1>

    <form method="POST" action="{{ route('admin.categories.store') }}">
        @csrf

        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">الاسم (عربي) *</label>
            <input type="text" name="name" value="{{ old('name') }}" required
                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2FAB4B] focus:border-[#2FAB4B] outline-none">
            @error('name')<p class="text-red-600 text-sm mt-1">{{ $message }}</p>@enderror
        </div>

        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">الاسم (إنجليزي)</label>
            <input type="text" name="name_en" value="{{ old('name_en') }}" dir="ltr"
                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2FAB4B] focus:border-[#2FAB4B] outline-none">
            @error('name_en')<p class="text-red-600 text-sm mt-1">{{ $message }}</p>@enderror
        </div>

        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">الوصف (عربي)</label>
            <textarea name="description" rows="3"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2FAB4B] focus:border-[#2FAB4B] outline-none">{{ old('description') }}</textarea>
            @error('description')<p class="text-red-600 text-sm mt-1">{{ $message }}</p>@enderror
        </div>

        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">الوصف (إنجليزي)</label>
            <textarea name="description_en" rows="3" dir="ltr"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2FAB4B] focus:border-[#2FAB4B] outline-none">{{ old('description_en') }}</textarea>
            @error('description_en')<p class="text-red-600 text-sm mt-1">{{ $message }}</p>@enderror
        </div>

        <div class="mb-6 flex items-center gap-2">
            <input type="checkbox" name="is_active" value="1" checked id="is_active" class="w-4 h-4 text-[#2FAB4B]">
            <label for="is_active" class="text-sm text-gray-700">نشط</label>
        </div>

        <div class="flex items-center gap-3">
            <button type="submit" class="bg-[#2FAB4B] hover:bg-[#237a4a] text-white px-6 py-2 rounded-lg">حفظ</button>
            <a href="{{ route('admin.categories.index') }}" class="text-gray-600 hover:text-gray-800">إلغاء</a>
        </div>
    </form>
</div>
@endsection
