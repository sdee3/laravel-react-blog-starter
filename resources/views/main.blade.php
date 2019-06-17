<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link rel="stylesheet" href="{{ asset('css/app.css') }}" />
  <link rel="icon" href="https://cdn.iconscout.com/icon/free/png-256/laravel-226015.png" sizes="32x32">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
    integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">

  <title>MySite</title>
</head>

<body>
  @if (Route::has('login'))
  <div class="top-right links">
    @auth
    <a href="{{ url('/home') }}">Home</a>
    @else
    <a href="{{ route('login') }}">Login</a>

    @if (Route::has('register'))
    <a href="{{ route('register') }}">Register</a>
    @endif
    @endauth
  </div>
  @endif

  <div id="app"></div>

  <script src="{{ asset('js/app.js') }}"></script>
</body>

</html>