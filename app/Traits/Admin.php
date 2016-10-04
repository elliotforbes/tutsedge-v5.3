<?php

namespace App\Traits;

/**
 * Our Admin Trait
 */
trait Admin
{
    
        /**
     * Returns a boolean
     */
    public function isAdmin()
    {
       foreach ($this->roles()->get() as $role)
       {
           if ($role->name == 'Admin')
           {
               return true;
           }
       }
       return false;
    }
    
    
}

