<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMain;

class EmailController extends Controller
{
    public function submitContactForm(Request $request)
    {
        $request_data = $request->all();

        Mail::to('meil@gmail.com')->queue(new ContactMain($request_data));

        return response('Your message has been sent successfully!', 200)
            ->header('Content-Type', 'text/plain');
    }
}
