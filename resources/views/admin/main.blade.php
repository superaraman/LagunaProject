@extends('layouts.master')

@section('content')
    <div class="wrapper">
        @include('admin.sidebar')
        <div id="content" class="w-100">
            @include('admin.navbar')
            <div class="container-fluid px-4">
                <h1>admin</h1>
            </div>
        </div>
    </div>
@endsection

@section('css')
    <link rel="stylesheet" href="{{asset('css/sidebar.css')}}">
@stop

@section('js')
    <script src="{{asset('js/admin.js')}}"></script>
@stop
