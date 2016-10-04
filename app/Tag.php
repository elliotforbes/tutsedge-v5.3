<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    
    protected $guarded = array(
        'lesson_tag_tag_id_foreign',
        'tag_id' ,
        'id',
        'created_at',
        'updated_at',
    );
    /*
    * Get the articles for an associated tag
    */
    public function articles()
    {
        return $this->belongsToMany('App\Lesson');
    }
    
}
