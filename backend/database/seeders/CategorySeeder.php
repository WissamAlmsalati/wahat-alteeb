<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'الأشعة والتصوير',
                'name_en' => 'Radiology & Imaging',
                'description' => 'أجهزة الأشعة والتصوير الطبي عالية الدقة لتشخيص دقيق وموثوق.',
                'description_en' => 'High-precision radiology and medical imaging equipment for accurate diagnosis.',
            ],
            [
                'name' => 'العناية المركزة',
                'name_en' => 'Intensive Care',
                'description' => 'معدات العناية المركزة لمراقبة المرضى وتوفير الرعاية الحرجة.',
                'description_en' => 'Intensive care equipment for patient monitoring and critical care support.',
            ],
            [
                'name' => 'غرف العمليات',
                'name_en' => 'Operating Rooms',
                'description' => 'حلول متكاملة لغرف العمليات تشمل الإضاءة والطاولات والأجهزة الجراحية.',
                'description_en' => 'Complete operating room solutions including lights, tables, and surgical devices.',
            ],
            [
                'name' => 'المختبرات',
                'name_en' => 'Laboratories',
                'description' => 'أجهزة مختبرية متقدمة لإجراء التحاليل والفحوصات بدقة عالية.',
                'description_en' => 'Advanced laboratory devices for high-accuracy analysis and testing.',
            ],
            [
                'name' => 'الأثاث الطبي',
                'name_en' => 'Medical Furniture',
                'description' => 'أثاث طبي عملي ومريح للمستشفيات والعيادات والمراكز الصحية.',
                'description_en' => 'Practical and comfortable medical furniture for hospitals, clinics, and health centers.',
            ],
            [
                'name' => 'طب الأسنان',
                'name_en' => 'Dental Medicine',
                'description' => 'تجهيزات ومعدات طب الأسنان الحديثة لعيادات متميزة.',
                'description_en' => 'Modern dental equipment and supplies for outstanding clinics.',
            ],
            [
                'name' => 'العلاج الطبيعي',
                'name_en' => 'Physiotherapy',
                'description' => 'أجهزة العلاج الطبيعي والتأهيل لدعم recovery وتحسين الحركة.',
                'description_en' => 'Physiotherapy and rehabilitation devices to support recovery and improve mobility.',
            ],
            [
                'name' => 'الطوارئ والإسعاف',
                'name_en' => 'Emergency & Ambulance',
                'description' => 'معدات الطوارئ والإسعاف السريعة للتعامل مع الحالات الحرجة.',
                'description_en' => 'Emergency and ambulance equipment for rapid critical response.',
            ],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['slug' => Str::slug($category['name'])],
                [
                    'name' => $category['name'],
                    'name_en' => $category['name_en'],
                    'description' => $category['description'],
                    'description_en' => $category['description_en'],
                    'is_active' => true,
                ]
            );
        }
    }
}
