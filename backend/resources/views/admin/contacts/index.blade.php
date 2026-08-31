@extends('layouts.admin')

@section('title', 'رسائل التواصل')

@section('content')
<div class="flex items-center justify-between mb-6">
    <h1 class="text-2xl font-bold text-[#01526D]">رسائل التواصل</h1>
</div>

<div class="bg-white rounded-xl shadow-sm overflow-hidden">
    <table class="w-full text-right">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">الاسم</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">البريد</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">الموضوع</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">الهاتف</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">الحالة</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">مرفق</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">التاريخ</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">إجراءات</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
            @forelse ($contacts as $contact)
                <tr class="{{ $contact->is_read ? '' : 'bg-blue-50/50' }}">
                    <td class="px-6 py-4 font-medium">{{ $contact->name }}</td>
                    <td class="px-6 py-4">{{ $contact->email }}</td>
                    <td class="px-6 py-4">{{ $contact->subject ?? '-' }}</td>
                    <td class="px-6 py-4">{{ $contact->phone ?? '-' }}</td>
                    <td class="px-6 py-4">
                        @if ($contact->attachment)
                            <a href="{{ asset('storage/' . $contact->attachment) }}" target="_blank" class="text-[#2FAB4B] hover:underline text-sm">عرض</a>
                        @else
                            <span class="text-gray-400 text-sm">—</span>
                        @endif
                    </td>
                    <td class="px-6 py-4">
                        @if ($contact->is_read)
                            <span class="text-gray-500 text-sm">مقروءة</span>
                        @else
                            <span class="text-blue-600 text-sm font-medium">جديدة</span>
                        @endif
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500">{{ $contact->created_at->format('Y-m-d H:i') }}</td>
                    <td class="px-6 py-4 flex items-center gap-3">
                        <a href="{{ route('admin.contacts.show', $contact) }}" class="text-blue-600 hover:underline text-sm">عرض</a>
                        <form method="POST" action="{{ route('admin.contacts.update', $contact) }}" class="inline">
                            @csrf
                            @method('PUT')
                            <input type="hidden" name="is_read" value="{{ $contact->is_read ? '0' : '1' }}">
                            <button type="submit" class="text-gray-600 hover:text-gray-800 text-sm">
                                {{ $contact->is_read ? 'تعيين كغير مقروء' : 'تعيين كمقروء' }}
                            </button>
                        </form>
                        <form method="POST" action="{{ route('admin.contacts.destroy', $contact) }}" onsubmit="return confirm('هل أنت متأكد؟')">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="text-red-600 hover:underline text-sm">حذف</button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="8" class="px-6 py-8 text-center text-gray-500">لا توجد رسائل</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</div>

<div class="mt-4">
    {{ $contacts->links() }}
</div>
@endsection
