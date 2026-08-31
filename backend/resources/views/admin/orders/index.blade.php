@extends('layouts.admin')

@section('title', 'طلبات الأسعار')

@section('content')
<div class="flex items-center justify-between mb-6">
    <h1 class="text-2xl font-bold text-[#01526D]">طلبات الأسعار</h1>
</div>

<div class="bg-white rounded-xl shadow-sm overflow-hidden">
    <table class="w-full text-right">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">#</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">المنتج</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">الاسم</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">البريد الإلكتروني</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">الهاتف</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">الحالة</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">التاريخ</th>
                <th class="px-6 py-3 text-sm font-semibold text-gray-600">إجراءات</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
            @forelse ($orders as $order)
                <tr class="{{ $order->status === 'new' ? 'bg-blue-50/50' : '' }}">
                    <td class="px-6 py-4 font-medium text-gray-900">{{ $order->id }}</td>
                    <td class="px-6 py-4">{{ $order->product?->name ?? '-' }}</td>
                    <td class="px-6 py-4">{{ $order->name }}</td>
                    <td class="px-6 py-4">{{ $order->email }}</td>
                    <td class="px-6 py-4">{{ $order->phone ?? '-' }}</td>
                    <td class="px-6 py-4">
                        @if ($order->status === 'new')
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">جديد</span>
                        @elseif ($order->status === 'viewed')
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">تمت المشاهدة</span>
                        @elseif ($order->status === 'completed')
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">مكتمل</span>
                        @else
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">ملغي</span>
                        @endif
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500">{{ $order->created_at->format('Y-m-d H:i') }}</td>
                    <td class="px-6 py-4 flex items-center gap-3">
                        <a href="{{ route('admin.orders.show', $order) }}" class="text-blue-600 hover:underline text-sm">عرض</a>
                        <form method="POST" action="{{ route('admin.orders.destroy', $order) }}" onsubmit="return confirm('هل أنت متأكد؟')">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="text-red-600 hover:underline text-sm">حذف</button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="8" class="px-6 py-8 text-center text-gray-500">لا توجد طلبات أسعار</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</div>

<div class="mt-4">
    {{ $orders->links() }}
</div>
@endsection
