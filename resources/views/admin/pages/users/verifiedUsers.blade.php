@extends('layouts.master')

@section('content')
    <div class="wrapper">
        @include('admin.sidebar')
        <div id="content" class="content w-100">
            @include('admin.navbar')
            <div class="container-fluid py-4 px-5">
                <div class="row">
                    <div class="h5 page-title  pb-1">Employees</div>
                </div>
                <div class="row">
                    <div class="card w-100">
                        <div class="card-body border-top-design">
                            <table id="usersTable" class="table table-striped table-hover dt-responsive w-100">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Username</th>
                                    <th>Lastname</th>
                                    <th>Firstname</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                            </table>
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
@stop
