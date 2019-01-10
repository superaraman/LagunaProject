@extends('layouts.master')

@section('content')
    @include('includes.navbar')
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6"></div>
            <div class="col-md-6 py-4">
                <div class="row">
                    <div class="col-sm-12 col-md-10">
                        <div class="card border-top-design">
                            <div class="card-header h3">Register</div>
                            <div class="card-body">
                                <form method="POST" class="needs-validation" action="{{ route('register') }}">
                                    @csrf
                                    <div class="form-row">
                                        <div class="col-md-6 mb-3">
                                            <label for="inputFirstName">First name</label>
                                            <input id="inputFirstName" name="firstname" type="text" class="form-control {{ $errors->has('firstname') ? ' is-invalid' : '' }}" value="{{ old('firstname') }}" placeholder="First name" required>
                                            @if ($errors->has('firstname'))
                                                <span class="invalid-feedback" role="alert">
                                                <strong>{{ $errors->first('firstname') }}</strong>
                                            </span>
                                            @endif
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label for="inputLastName">Last name</label>
                                            <input id="inputLastName" name="lastname" type="text" class="form-control {{ $errors->has('lastname') ? ' is-invalid' : '' }}" value="{{ old('lastname') }}" placeholder="Last name" required>
                                            @if ($errors->has('lastname'))
                                                <span class="invalid-feedback" role="alert">
                                                <strong>{{ $errors->first('lastname') }}</strong>
                                            </span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="col mb-3">
                                            <label for="inputUsername">Username</label>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">@</span>
                                                </div>
                                                <input id="inputUsername" name="username" type="text" class="form-control{{ $errors->has('username') ? ' is-invalid' : '' }}" placeholder="Username" value="{{ old('username') }}" required>
                                                @if ($errors->has('username'))
                                                    <span class="invalid-feedback" role="alert">
                                                        <strong>{{ $errors->first('username') }}</strong>
                                                    </span>
                                                @endif
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="col mb-3">
                                            <label for="inputEmail">E-Mail Address</label>
                                            <input id="inputEmail" name="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" placeholder="sample123@email.com" value="{{ old('email') }}" required>
                                            @if ($errors->has('email'))
                                                <span class="invalid-feedback" role="alert">
                                                <strong>{{ $errors->first('email') }}</strong>
                                            </span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-6 mb-3">
                                            <label for="inputPassword">Password</label>
                                            <input id="inputPassword" name="password" type="password" class="form-control {{ $errors->has('password') ? ' is-invalid' : '' }}" placeholder="Password"  required>
                                            @if ($errors->has('password'))
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $errors->first('password') }}</strong>
                                                </span>
                                            @endif
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label for="inputConfirmPassword">Confirm Password</label>
                                            <input id="inputConfirmPassword" name="password_confirmation" type="password" class="form-control" placeholder="Confirm Password" required>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="col offset-md-8 offset-lg-10">
                                            <button type="submit" class="btn btn-primary">
                                                {{ __('Register') }}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
