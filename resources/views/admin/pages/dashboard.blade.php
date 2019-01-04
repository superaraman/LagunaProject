@extends('layouts.master')

@section('content')
    <div class="wrapper">
        @include('admin.sidebar')
        <div id="content" class="content w-100">
            @include('admin.navbar')
            <div class="container-fluid py-4 px-5">
                <div class="row">
                    <div class="h5 page-title">Dashboard</div>
                </div>
                <div class="row">
                    <div class="col-lg-4 col-md-12 col-sm-12 border-right-blue-grey border-right-lighten-5">
                        <div class="card-body text-center">
                            <div class="card-header mb-2">
                                <span class="warning">New Subscribers</span>
                                <h3 class="display-4">14,962</h3>
                            </div>
                            <div class="card-content">
                                <canvas id="adminChart"></canvas>
                                <ul class="list-inline clearfix mt-2">
                                    <li>
                                        <h1 class="darken-1 text-bold-400">1465</h1>
                                        <span class="darken-2"><i class="icon-head"></i> Average Monthly Subscribers</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('css')
    <link rel="stylesheet" href="{{asset('css/sidebar.css')}}">
@stop

@section('js')
    <script src="{{asset('js/admin.js')}}"></script>
    <script src="{{asset('js/chart.js')}}"></script>
@stop
