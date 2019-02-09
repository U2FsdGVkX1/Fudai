<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ActionLog extends Model
{
    protected $table = 'logs';
    protected $fillable = ['user_id', 'type', 'text'];

    public function user() {
        return $this->belongsTo('App\User');
    }
}
