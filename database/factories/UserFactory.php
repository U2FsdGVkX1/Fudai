<?php

use Illuminate\Support\Facades\Hash;
use Faker\Generator as Faker;

$factory->define(App\User::class, function (Faker $faker) {
    static $password;

    return [
        'name' => $faker->randomNumber() . $faker->word,
        'password' => Hash::make($password),
        'coins' => $faker->randomNumber(),
        'conname' => $faker->name,
        'conaddress' => $faker->address,
        'conphone' => '11111111111',
        'isadmin' => 0,
        'bduss' => $faker->randomNumber() . $faker->text
    ];
});
