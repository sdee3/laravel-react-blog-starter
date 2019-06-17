<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function handleAdminLogin(Request $request)
    {
        $request_data = $request->all();

        if ($request_data['username'] === env('BLOG_ADMIN_USERNAME') && $request_data['password'] === env('BLOG_ADMIN_PASSWORD')) {
            return response('Uspešna autorizacija!', 200)
                ->header(
                    'x-auth',
                    base64_encode(openssl_encrypt(
                        $request_data['password'],
                        "AES-128-ECB",
                        env('ADMIN_TOKEN_ENCRYPTION_KEY'),
                        OPENSSL_RAW_DATA
                    ))
                );
        } else return response('Neuspešna autorizacija!', 422);
    }

    public function validateCookie(Request $request)
    {
        if (openssl_decrypt(
            $request->cookie,
            "AES-128-ECB",
            env('ADMIN_TOKEN_ENCRYPTION_KEY')
        ) === env('BLOG_ADMIN_PASSWORD')) {
            return response()->json('Cookie authorized successfully!', 200);
        } else {
            return response()->json('Cookie is invalid! Please try again.', 422);
        }
    }

    public function upload()
    {
        $img = request()->data;
        $image = base64_decode(substr($img, strpos($img, ",") + 1));
        $name = time() . ".png";
        \File::put(public_path() . "/img/blog/$name", $image);
        return response()->json("img/blog/$name", 200);
    }
}
