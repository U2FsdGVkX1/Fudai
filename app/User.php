<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = ['name', 'password', 'coins'];
    protected $hidden = ['password'];

    public function stores() {
        return $this->belongsToMany('App\Store', 'trades')->withTimestamps();
    }

    public function logs() {
        return $this->hasMany('App\Log');
    }
}
