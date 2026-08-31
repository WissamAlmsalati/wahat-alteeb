<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        $brands = [
            [
                'name' => 'Dräger',
                'description' => 'علامة رائدة في تقنيات التنفس الطبي والحماية والرعاية المركزة.',
                'description_en' => 'A leading brand in medical breathing technology, protection, and intensive care.',
            ],
            [
                'name' => 'PHILIPS',
                'description' => 'حلول رقمية متقدمة في التصوير الطبي ومراقبة المرضى والرعاية الصحية.',
                'description_en' => 'Advanced digital solutions in medical imaging, patient monitoring, and healthcare.',
            ],
            [
                'name' => 'mindray',
                'description' => 'أجهزة طبية مبتكرة بأسعار تنافسية لتخصصات متعددة.',
                'description_en' => 'Innovative medical devices at competitive prices for multiple specialties.',
            ],
            [
                'name' => 'B|BRAUN',
                'description' => 'منتجات عالية الجودة للجراحة والعناية المركزة وخدمات الرعاية الصحية.',
                'description_en' => 'High-quality products for surgery, intensive care, and healthcare services.',
            ],
            [
                'name' => 'GE Healthcare',
                'description' => 'تقنيات رائدة في التصوير الطبي والرعاية الصحية الرقمية.',
                'description_en' => 'Leading technologies in medical imaging and digital healthcare.',
            ],
        ];

        foreach ($brands as $brand) {
            Brand::updateOrCreate(
                ['slug' => Str::slug($brand['name'])],
                [
                    'name' => $brand['name'],
                    'name_en' => $brand['name'],
                    'description' => $brand['description'],
                    'description_en' => $brand['description_en'],
                    'logo' => null,
                    'is_active' => true,
                ]
            );
        }
    }
}
