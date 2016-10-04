<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tutorial extends Model
{
    protected $fillable = [
        'title',
        'body',
        'slug',
        'author',
        'description',
        'id',
        'lesson_id',
        'created_at',
        'updated_at'
    ];


    public function comments() 
    {
        return $this->hasMany()
    }

}
