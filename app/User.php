<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Traits\Admin;

class User extends Authenticatable
{
    use Admin;
    
    /**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['github_id','name', 'email', 'password'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
    
    public function articles()
    {
        return $this->hasMany('App\Lesson');
    }
    
    public function roles()
    {
        return $this->belongsToMany('App\Role');
    }
}
