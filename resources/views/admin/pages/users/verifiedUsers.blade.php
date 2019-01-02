@extends('layouts.master')

@section('content')
    <div class="wrapper">
        @include('admin.sidebar')
        <div id="content" class="content w-100">
            @include('admin.navbar')
            <div class="container-fluid py-4 px-5">
                <div class="row">
                    <div class="h5 page-title">Employees</div>
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
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/css/bootstrap.css">
    <link rel="stylesheet" href="//cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="//cdn.datatables.net/responsive/2.2.3/css/responsive.dataTables.min.css">
@stop

@section('js')
    <script src="{{asset('js/admin.js')}}"></script>
    <script src="//code.jquery.com/jquery-3.3.1.js"></script>
    <script src="//cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
    <script src="//cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>
    <script src="//cdn.datatables.net/responsive/2.2.3/js/dataTables.responsive.min.js"></script>
@stop
