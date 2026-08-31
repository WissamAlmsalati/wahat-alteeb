<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $category = Category::first();
        $brand = Brand::first();

        if (! $category || ! $brand) {
            return;
        }

        $products = [
            [
                'name' => 'إضاءة جراحية LED',
                'name_en' => 'LED Surgical Light',
                'description' => 'إضاءة جراحية LED عالية الكفاءة توفر رؤية واضحة أثناء العمليات.',
                'description_en' => 'High-efficiency LED surgical light providing clear visibility during operations.',
            ],
            [
                'name' => 'جهاز مراقبة مريض',
                'name_en' => 'Patient Monitor',
                'description' => 'جهاز مراقبة متعدد المعايير لقياس العلامات الحيوية بدقة.',
                'description_en' => 'Multi-parameter patient monitor for accurate vital signs measurement.',
            ],
            [
                'name' => 'جهاز تنفس صناعي',
                'name_en' => 'Ventilator',
                'description' => 'جهاز تنفس صناعي متطور لدعم التنفس في العناية المركزة.',
                'description_en' => 'Advanced ventilator for respiratory support in intensive care.',
            ],
            [
                'name' => 'جهاز تخدير حديث',
                'name_en' => 'Modern Anesthesia Machine',
                'description' => 'جهاز تخدير حديث وآمن لإدارة التخدير أثناء العمليات الجراحية.',
                'description_en' => 'A modern and safe anesthesia machine for managing anesthesia during surgery.',
            ],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(
                ['slug' => Str::slug($product['name'])],
                [
                    'name' => $product['name'],
                    'name_en' => $product['name_en'],
                    'description' => $product['description'],
                    'description_en' => $product['description_en'],
                    'category_id' => $category->id,
                    'brand_id' => $brand->id,
                    'price' => rand(1000, 15000),
                    'is_active' => true,
                ]
            );
        }
    }
}
