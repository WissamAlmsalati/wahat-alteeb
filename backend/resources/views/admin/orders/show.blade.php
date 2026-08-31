@extends('layouts.admin')

@section('title', 'تفاصيل طلب السعر')

@section('content')
<div class="max-w-3xl mx-auto">
    <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-[#01526D]">تفاصيل طلب السعر #{{ $order->id }}</h1>
        <a href="{{ route('admin.orders.index') }}" class="text-gray-600 hover:text-gray-800">العودة للقائمة</a>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
                <p class="text-sm text-gray-500 mb-1">المنتج</p>
                <p class="font-medium text-[#01526D]">{{ $order->product?->name ?? '-' }}</p>
            </div>
            <div>
                <p class="text-sm text-gray-500 mb-1">الحالة</p>
                @if ($order->status === 'new')
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">جديد</span>
                @elseif ($order->status === 'viewed')
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">تمت المشاهدة</span>
                @elseif ($order->status === 'completed')
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">مكتمل</span>
                @else
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">ملغي</span>
                @endif
            </div>
            <div>
                <p class="text-sm text-gray-500 mb-1">الاسم</p>
                <p class="font-medium">{{ $order->name }}</p>
            </div>
            <div>
                <p class="text-sm text-gray-500 mb-1">البريد الإلكتروني</p>
                <p class="font-medium" dir="ltr">{{ $order->email }}</p>
            </div>
            <div>
                <p class="text-sm text-gray-500 mb-1">الهاتف</p>
                <p class="font-medium" dir="ltr">{{ $order->phone ?? '-' }}</p>
            </div>
            <div>
                <p class="text-sm text-gray-500 mb-1">تاريخ الطلب</p>
                <p class="font-medium">{{ $order->created_at->format('Y-m-d H:i') }}</p>
            </div>
        </div>

        <div class="mb-6">
            <p class="text-sm text-gray-500 mb-1">الرسالة</p>
            <div class="bg-gray-50 rounded-lg p-4 text-gray-700 leading-relaxed">
                {{ $order->message ?? 'لا توجد رسالة' }}
            </div>
        </div>

        <form method="POST" action="{{ route('admin.orders.update', $order) }}" class="flex items-center gap-4">
            @csrf
            @method('PUT')
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">تحديث الحالة</label>
                <select name="status" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2FAB4B] focus:border-[#2FAB4B] outline-none">
                    <option value="new" {{ $order->status === 'new' ? 'selected' : '' }}>جديد</option>
                    <option value="viewed" {{ $order->status === 'viewed' ? 'selected' : '' }}>تمت المشاهدة</option>
                    <option value="completed" {{ $order->status === 'completed' ? 'selected' : '' }}>مكتمل</option>
                    <option value="cancelled" {{ $order->status === 'cancelled' ? 'selected' : '' }}>ملغي</option>
                </select>
            </div>
            <button type="submit" class="self-end bg-[#2FAB4B] hover:bg-[#237a4a] text-white px-6 py-2 rounded-lg">تحديث</button>
        </form>
    </div>
</div>
@endsection
