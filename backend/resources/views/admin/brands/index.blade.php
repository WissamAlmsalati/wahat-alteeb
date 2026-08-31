@extends('layouts.admin')

@section('title', 'العلامات التجارية')

@section('content')
<div class="flex items-center justify-between mb-6">
    <h1 class="text-2xl font-bold text-[#01526D]">العلامات التجارية</h1>
    <a href="{{ route('admin.brands.create') }}" class="bg-[#2FAB4B] hover:bg-[#237a4a] text-white px-5 py-2 rounded-lg">إضافة علامة</a>
</div>

<div class="bg-white rounded-xl shadow-sm overflow-hidden">
    <table class="w-full text-right">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">الشعار</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">الاسم</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">الاسم الإنجليزي</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">الحالة</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">إجراءات</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
            @forelse ($brands as $brand)
                <tr>
                    <td class="px-6 py-4">
                        @if ($brand->logo)
                            <img src="{{ '/storage/' . $brand->logo }}" alt="{{ $brand->name }}" class="h-12 w-12 object-contain">
                        @else
                            <span class="text-gray-400 text-sm">—</span>
                        @endif
                    </td>
                    <td class="px-6 py-4">{{ $brand->name }}</td>
                    <td class="px-6 py-4 text-gray-500" dir="ltr">{{ $brand->name_en ?: '-' }}</td>
                    <td class="px-6 py-4">
                        @if ($brand->is_active)
                            <span class="text-green-600 text-sm">نشط</span>
                        @else
                            <span class="text-gray-400 text-sm">معطل</span>
                        @endif
                    </td>
                    <td class="px-6 py-4 flex items-center gap-3">
                        <a href="{{ route('admin.brands.edit', $brand) }}" class="text-blue-600 hover:underline text-sm">تعديل</a>
                        <form method="POST" action="{{ route('admin.brands.destroy', $brand) }}" onsubmit="return confirm('هل أنت متأكد؟')">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="text-red-600 hover:underline text-sm">حذف</button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" class="px-6 py-8 text-center text-gray-500">لا توجد علامات تجارية</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</div>

<div class="mt-4">
    {{ $brands->links() }}
</div>
@endsection
