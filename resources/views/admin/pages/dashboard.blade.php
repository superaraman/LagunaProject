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
                <div id="graphs" class="row">
                    <div class="col-lg-4 col-md-12 col-sm-12 mt-4">
                        <div class="card border-top-design">
                            <div class="card-header text-center">
                                <div class="h2">Verified vs Pending</div>
                                <span>Approval</span>
                            </div>
                            <div class="card-body bg-white py-3">
                                <canvas id="approvalChart"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-12 col-sm-12 mt-4">
                        <div class="card border-top-design">
                            <div class="card-header text-center">
                                <div class="h3">Super Admin vs Admin</div>
                                <span>Admins</span>
                            </div>
                            <div class="card-body bg-white py-3">
                                <canvas id="adminChart"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-12 col-sm-12 mt-4">
                        <div class="card border-top-design">
                            <div class="card-header text-center">
                                <div class="h3">Total Users</div>
                                <span>Users</span>
                            </div>
                            <div class="card-body bg-white py-3">
                                <canvas id="userChart"></canvas>
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
