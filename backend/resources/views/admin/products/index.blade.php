@extends('layouts.admin')

@section('title', 'المنتجات')

@section('content')
<div class="flex items-center justify-between mb-6">
    <h1 class="text-2xl font-bold text-[#01526D]">المنتجات</h1>
    <a href="{{ route('admin.products.create') }}" class="bg-[#2FAB4B] hover:bg-[#237a4a] text-white px-5 py-2 rounded-lg">إضافة منتج</a>
</div>

<div class="bg-white rounded-xl shadow-sm overflow-hidden">
    <table class="w-full text-right">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">الصورة</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">الاسم</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">التخصص</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">العلامة</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">السعر</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">الحالة</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">إجراءات</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
            @forelse ($products as $product)
                <tr>
                    <td class="px-6 py-4">
                        @if ($product->image)
                            <img src="{{ '/storage/' . $product->image }}" alt="{{ $product->name }}" class="h-14 w-14 object-contain">
                        @else
                            <span class="text-gray-400 text-sm">—</span>
                        @endif
                    </td>
                    <td class="px-6 py-4">
                        {{ $product->name }}
                        @if ($product->name_en)
                            <div class="text-xs text-gray-500" dir="ltr">{{ $product->name_en }}</div>
                        @endif
                    </td>
                    <td class="px-6 py-4">{{ $product->category->name ?? '-' }}</td>
                    <td class="px-6 py-4">{{ $product->brand->name ?? '-' }}</td>
                    <td class="px-6 py-4">{{ $product->price ? number_format($product->price, 2) : '-' }}</td>
                    <td class="px-6 py-4">
                        @if ($product->is_active)
                            <span class="text-green-600 text-sm">نشط</span>
                        @else
                            <span class="text-gray-400 text-sm">معطل</span>
                        @endif
                    </td>
                    <td class="px-6 py-4 flex items-center gap-3">
                        <a href="{{ route('admin.products.edit', $product) }}" class="text-blue-600 hover:underline text-sm">تعديل</a>
                        <form method="POST" action="{{ route('admin.products.destroy', $product) }}" onsubmit="return confirm('هل أنت متأكد؟')">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="text-red-600 hover:underline text-sm">حذف</button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="7" class="px-6 py-8 text-center text-gray-500">لا توجد منتجات</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</div>

<div class="mt-4">
    {{ $products->links() }}
</div>
@endsection
