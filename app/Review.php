<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    //
    public function single($slug)
    {
        return view('frontend.review.single');
    }
    
}
