<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    public $table = 'contracts';

    protected $fillable = [
        'name',
        'number',
        'value',
        'date'
    ];

    use HasFactory;
}
