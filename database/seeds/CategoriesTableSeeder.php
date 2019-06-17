<?php

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('categories')->insert([
			[
				'name' => 'Category1',
				'created_at' => now(),
				'updated_at' => now()
			], 	[
				'name' => 'Category2',
				'created_at' => now(),
				'updated_at' => now()
			]
		]);
	}
}
