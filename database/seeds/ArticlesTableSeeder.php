<?php

use Illuminate\Database\Seeder;

class ArticlesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        DB::table('articles')->insert([
            'title' => Str::random(10),
            'caption' => $faker->realText(20),
            'content' => $faker->realText(1000),
            'slug' => str_replace(
                "'",
                "",
                str_replace(
                    " ",
                    "-",
                    strtolower($faker->realText(30))
                )
            ),
            'cover_url' => 'https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg',
            'category_id' => 1,
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
