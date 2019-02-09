<?php

use Faker\Generator as Faker;

$factory->define(\App\Store::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'text' => $faker->text,
        'image' => $faker->imageUrl(),
        'stock' => $faker->randomNumber(),
        'coins' => $faker->randomNumber(),
        'stime' => $faker->dateTimeBetween('-10 days', 'now'),
        'etime' => $faker->dateTimeBetween('now', '+10 days'),
    ];
});
