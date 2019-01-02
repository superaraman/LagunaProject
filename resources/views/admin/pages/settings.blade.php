@extends('layouts.master')

@section('content')
    <div class="wrapper">
        @include('admin.sidebar')
        <div id="content" class="content w-100">
            @include('admin.navbar')
            <h1>SETTINGS</h1>
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
