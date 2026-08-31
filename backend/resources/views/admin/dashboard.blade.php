@extends('layouts.admin')

@section('title', 'لوحة التحكم')

@section('content')
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <a href="{{ route('admin.products.index') }}" class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
        <p class="text-gray-500 text-sm">المنتجات</p>
        <p class="text-3xl font-bold text-[#01526D] mt-2">{{ $productsCount }}</p>
    </a>
    <a href="{{ route('admin.categories.index') }}" class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
        <p class="text-gray-500 text-sm">التخصصات</p>
        <p class="text-3xl font-bold text-[#2FAB4B] mt-2">{{ $categoriesCount }}</p>
    </a>
    <a href="{{ route('admin.brands.index') }}" class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
        <p class="text-gray-500 text-sm">العلامات التجارية</p>
        <p class="text-3xl font-bold text-[#01526D] mt-2">{{ $brandsCount }}</p>
    </a>
</div>

<div class="bg-white rounded-xl shadow-sm p-6">
    <h2 class="text-lg font-semibold text-gray-800 mb-2">مرحباً بك في لوحة التحكم</h2>
    <p class="text-gray-600">من هنا يمكنك إدارة المنتجات، التخصصات، والعلامات التجارية.</p>
</div>
@endsection
