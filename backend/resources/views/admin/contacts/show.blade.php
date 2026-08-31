@extends('layouts.admin')

@section('title', 'رسالة تواصل')

@section('content')
<div class="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6">
    <div class="flex items-center justify-between mb-6">
        <h1 class="text-xl font-bold text-[#01526D]">رسالة من {{ $contact->name }}</h1>
        <a href="{{ route('admin.contacts.index') }}" class="text-gray-600 hover:text-gray-800">العودة</a>
    </div>

    <div class="space-y-4">
        <div>
            <p class="text-sm text-gray-500">البريد الإلكتروني</p>
            <p class="font-medium">{{ $contact->email }}</p>
        </div>

        <div>
            <p class="text-sm text-gray-500">رقم الهاتف</p>
            <p class="font-medium">{{ $contact->phone ?? '-' }}</p>
        </div>

        <div>
            <p class="text-sm text-gray-500">الموضوع</p>
            <p class="font-medium">{{ $contact->subject ?? '-' }}</p>
        </div>

        @if ($contact->attachment)
        <div>
            <p class="text-sm text-gray-500">المرفق</p>
            <a href="{{ asset('storage/' . $contact->attachment) }}" target="_blank" class="inline-block mt-1 text-[#2FAB4B] hover:underline font-medium">عرض الملف المرفق</a>
        </div>
        @endif

        <div>
            <p class="text-sm text-gray-500">التاريخ</p>
            <p class="font-medium">{{ $contact->created_at->format('Y-m-d H:i') }}</p>
        </div>

        <div>
            <p class="text-sm text-gray-500">الحالة</p>
            <p class="font-medium">{{ $contact->is_read ? 'مقروءة' : 'جديدة' }}</p>
        </div>

        <div>
            <p class="text-sm text-gray-500">الرسالة</p>
            <p class="mt-2 p-4 bg-gray-50 rounded-lg leading-relaxed">{{ $contact->message }}</p>
        </div>
    </div>

    <div class="flex items-center gap-3 mt-6">
        <form method="POST" action="{{ route('admin.contacts.update', $contact) }}">
            @csrf
            @method('PUT')
            <input type="hidden" name="is_read" value="{{ $contact->is_read ? '0' : '1' }}">
            <button type="submit" class="bg-[#2FAB4B] hover:bg-[#237a4a] text-white px-6 py-2 rounded-lg">
                {{ $contact->is_read ? 'تعيين كغير مقروء' : 'تعيين كمقروء' }}
            </button>
        </form>

        <form method="POST" action="{{ route('admin.contacts.destroy', $contact) }}" onsubmit="return confirm('هل أنت متأكد؟')">
            @csrf
            @method('DELETE')
            <button type="submit" class="text-red-600 hover:underline">حذف</button>
        </form>
    </div>
</div>
@endsection
