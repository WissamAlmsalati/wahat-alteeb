<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = ['name', 'email', 'phone', 'subject', 'message', 'attachment', 'is_read'];

    protected function casts(): array
    {
        return [
            'is_read' => 'boolean',
        ];
    }
}
