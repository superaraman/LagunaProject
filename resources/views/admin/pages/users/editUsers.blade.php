@extends('layouts.master')

@section('content')
    <div class="wrapper">
        @include('admin.sidebar')
        <div id="content" class="content w-100">
            @include('admin.navbar')
            <div class="container-fluid py-4 px-5">
                <div class="row">
                    <div class="h5 page-title pb-1">Edit User</div>
                </div>
                <div class="row">
                    <div class="col-md-6 p-0">
                        <div class="card border-top-design w-100">
                            <div class="card-body">
                                <div class="form-row">
                                    <div class="col-md-6 mb-3">
                                        <label for="inputFirstName">First name</label>
                                        <input id="inputFirstName" name="firstname" type="text" class="form-control" value="{{$aDetails['firstname']}}" placeholder="First name" required>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="inputLastName">Last name</label>
                                        <input id="inputLastName" name="lastname" type="text" class="form-control" value="{{$aDetails['lastname']}}" placeholder="Last name" required>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col mb-3">
                                        <label for="inputUsername">Username</label>
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">@</span>
                                            </div>
                                            <input id="inputUsername" name="username" type="text" class="form-control" placeholder="Username" value="{{$aDetails['username']}}" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col mb-3">
                                        <label for="inputEmail">E-Mail Address</label>
                                        <input id="inputEmail" name="email" type="email" class="form-control" placeholder="sample123@email.com" value="{{$aDetails['email']}}" required>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col mb-3">
                                        <label for="inputRole">User Role</label>
                                        <select id="inputRole" class="form-control">
                                            <option selected>{{$aDetails['user_role']}}</option>
                                            @if ($aDetails['user_role'] === 'SUPER_ADMIN')
                                                <option>ADMIN</option>
                                            @else
                                                <option>SUPER_ADMIN</option>
                                            @endif
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col offset-md-9">
                                        <button id=editButton class="btn btn-primary">Update</button>
                                        <button id=editButton class="btn btn-danger">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6"></div>
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
