<!doctype html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,11,EmulateIE11" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
    @yield('css')
    <title>{{ config('app.name', 'Test App')  }}</title>
</head>
<body>
    <div id="app">
        @include('includes.navbar')
        <main>
            @yield('content')
        </main>
    </div>

    @yield('js')
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
