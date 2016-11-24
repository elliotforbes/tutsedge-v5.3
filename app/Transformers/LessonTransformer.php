<?php namespace App\Transformers;

class LessonTransformer extends Transformer {
    
    public function transform($lesson)
    {
        return [
            'title' => $lesson['title'],
            'description' => $lesson['description'],
            'author' => $lesson['author'],
            'slug' => $lesson['slug'],
            'active' => $lesson['isLive'],
            'views' => $lesson['views'],
            'image_path' => $lesson['image_path'],
        ];
    }
    
}