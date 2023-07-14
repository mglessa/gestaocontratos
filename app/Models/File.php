<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{   
    public $table = 'files';

    protected $fillable = [
        'name',
        'path',
        'contract_id',
    ];

    use HasFactory;
}
