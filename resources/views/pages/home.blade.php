@extends('layouts.master')

@section('content')
    @include('includes.navbar')
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img class="d-block w-100" src="img/carousel/sea.jpg" alt="Second slide">
            <div class="carousel-caption">
                <h1>Second slide</h1>
                <p>This is the second slide.</p>
            </div>
        </div>
        <div class="carousel-item">
            <img class="d-block w-100" src="img/carousel/sea2.jpg" alt="First slide">
            <div class="carousel-caption">
                <h1>Second slide</h1>
                <p>This is the second slide.</p>
            </div>
        </div>
        <div class="carousel-item">
            <img class="d-block w-100" src="img/carousel/sea3.jpg" alt="Third slide">
            <div class="carousel-caption">
                <h1>Second slide</h1>
                <p>This is the second slide.</p>
            </div>
        </div>
    </div>

    @include('includes.footer')
@endsection
