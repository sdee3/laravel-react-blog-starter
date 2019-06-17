<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'category_id', 'caption', 'content', 'slug', 'cover_url'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['id'];

    /**
     * Get the category for the article.
     */
    public function category()
    {
        return $this->belongsTo('App\Category');
    }
}
