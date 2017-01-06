<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use DB;
use App;
use App\Lesson;
use App\Course;
use App\User;
use App\Post;
use App\Tag;
use App\Review;
use URL;
use Log;
use Auth;
use Cookie;
use Response;



class FrontendController extends Controller
{
    /*
     * Home page that displays all lessons
     */
    public function Home()
    {
        $lessons = DB::table('lessons')->orderBy('created_at', 'desc')->paginate(9);
        $courses = Course::all();
        return view('frontend.index', compact('lessons', 'courses'));
    }

    /*
     * Show the an article based of slug passed in.
     * 
     * @return view
     */
    public function show(Request $request, $slug)
    {
        Log::info("Retrieving article for slug: " . $slug);

        $lesson = Lesson::whereSlug($slug)->get()->first();
        
        if(count($lesson) < 1){
            Log::info("Lesson could not be found");
            $error = [
                'type' => '404: Lesson Not Found for Slug: ',
                'body' => $slug,
            ];
            return view('errors.404');
        }

        $course = Course::where('id', '=', $lesson->course_id)->get()->first();

        $tag = $lesson->tags->get(0);
        
        if(count($lesson->tags) > 0) {
            $articles = Lesson::whereHas('tags', function($q) use ($tag)
                        {
                            // log::info($tag->id);
                            $q->where('tag_id', $tag->id);
                        })
                        ->where('id', '!=', $lesson->id)
                        ->inRandomOrder()
                        ->take(3)
                        ->get();
        } 
        else 
        {
            $articles = Lesson::inRandomOrder()
                ->take(3)
                ->get();
        }
        
        return Response::make(view('frontend.single', compact('lesson', 'articles', 'course')))
            ->cookie('sessionID', '1');     
        
    }
    

    /*
     * Logout function which destroys user session
     */
    public function logout()
    {
        if(Auth::check()) 
        {   
            Log::info("Logging out User...");
            Auth::logout();
            return redirect('/');
        }
    }

    /*
     * returns paginated results of all tutorials 
     */
    public function allTutorials(Request $request)
    {
        $lessons = Lesson::paginate(9);

        Log::info("Session ID: " . $request->cookie('sessionID'));
        
        return Response(view('frontend.all', compact('lessons')))->cookie('sessionID', 1);
    }
    
    /*
     * returns the search view 
     */
     public function search()
     {
         $results = Lesson::get()->all();
         
         return view('frontend.search', compact('results'));
     }
     
     /*
      * Returns the course page for any courses
      */
      public function course($slug)
      {
        Log::info("Retrieving Course Page for: " . $slug);
        $course = Course::whereSlug($slug)->get()->first();

        if(count($course) < 1){
            Log::info("Course could not be found " . $slug);
            $error = [
            'type' => '404: Course Not Found: ',
            'body' => $slug,
            ];
            return view('errors.404');
        }
        return view('frontend.course.single', compact('course'));
         
      }
      
      /*
      * Returns the course page for any courses
      */
      public function courses()
      {
          $courses = Course::paginate(15);
          
          return view('frontend.course.all', compact('courses'));
      }
      
      /*
       *
       */
       public function contact()
       {
           return view('frontend.static.contact');
       }
       
       /*
       *
       */
       public function advertise()
       {
           return view('frontend.static.advertise');
       }
       
       /*
       *
       */
       public function blog()
       {
           $posts = Post::orderBy('id', 'DESC')->paginate(15);
           return view('frontend.static.blog', compact('posts'));
       }
       
       /*
       *
       */
       public function blogSingle($slug)
       {
           $post = Post::whereSlug($slug)->get()->first();
           return view('frontend.static.blog-single', compact('post'));
       }
       
       /*
       *
       */
       public function about()
       {
           return view('frontend.static.about');
       }
    
       /*
       *
       */
       public function forum()
       {
           return view('frontend.forum.index');
       }
       
       public function tag($slug)
       {
            $tag = Tag::where('name', '=', $slug)->get()->first();
                
            if(count($tag) < 1){
                Log::info("Tag could not be found: " . $slug);
                $error = [
                'type' => '404: Course Not Found: ',
                'body' => $slug,
                ];
                return view('errors.404');
            }

           $articles = $tag->articles;
          
           return view('frontend.tag', compact('tag', 'articles')); 
       }
       
       public function register() 
       {
            return view('frontend.profile.register');   
       }
       
       public function profile()
       {
           if(Auth::user())
           {
               $user = Auth::user();
                
               return view('frontend.profile.index', compact('user'));
           } 
           else
           {
               return view('frontend.profile.register');
           } 
       }
       
       public function sitemap()
       {
           $sitemap = App::make("sitemap");
           
           Log::info("Sitemap Route Hit");
           Log::info("Sitemap isn't cached, creating new sitemap");

           $sitemap->add(URL::to('/'), '2015-01-01T12:00:00+02:00'  , '1.0', 'daily');
           $lessons = Lesson::orderBy('created_at', 'desc')->get()->all();
           $posts = Post::get()->all();
           $reviews = Review::get()->all();
           $courses = Course::get()->all();

           foreach($courses as $course) 
           {
               Log::info($course);
               $location = URL::to('/') . "/course/" . $course->slug;
               $sitemap->add($location , $course->updated_at, '1.0', 'weekly');
           }

           foreach($lessons as $lesson)
           {
               Log::info($lesson);
               $location = URL::to('/') . "/" . $lesson->slug;
               $sitemap->add($location , $lesson->created_at, '1.0', 'monthly');
           }

           foreach($posts as $blog) 
           {
               Log::info($blog);
               $location = URL::to('/') . "/" . "blog/" . $blog->slug;
               $sitemap->add($location, $blog->created_at, '1.0', 'monthly');
           }

           foreach($reviews as $review) 
           {
               Log::info($review);
               $location = URL::to('/') . "/book" . "/" . $review->slug;
               $sitemap->add($location, $review->created_at, '1.0', 'monthly'); 
           }

           return $sitemap->render('xml');
       }
       
       public function error404()
       {
           return view('errors.404');
       }
       
       public function error500()
       {
           return view('errors.500');
       }
       
       public function error()
       {
           return view('errors.index');
       }
}
