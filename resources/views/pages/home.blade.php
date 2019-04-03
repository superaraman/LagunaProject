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
    </div>

    <div id="overview" class="jumbotron p-3 bg-white">
        <div class="container">
            <h1 class="display-5">Overview of the Laguna Lake</h1>
            <div class="col justyify-content-center">
                <p class="lead">
                    The biggest inland body of water in the Philippines and the 3rd largest in South East Asia is the Laguna De Bay. It has a surface area of 900 km2, with 3.2 billion cubic meters volume of waters and an average deep of 2.5 meters. It is strategically in place at the urban development area with national and regional development in fisheries, agriculture, water supply and the different business industry sectors. However, the latest analyses of water sample from the Laguna Lake and rivers indicated low dissolved oxygen, high dissolved nitrogen, high level of fecal coliforms, elevated levels of phosphates and some concentrations of lead and cadmium according to the Laguna Lake Development Authority’s (LLDA’s). The degradation of lake are mainly because of overcrowded fish pens, industrial water waste discharge, domestic waste coming from households areas among others that are thrown at the lake. Because of these water pollutants Laguna Lake and its elements are heavily polluted and dying (LLDA, 2017).
                </p>
                <p class="lead">
                    Conservation and protection of Laguna Lake becomes the utmost priority of the government and its stakeholders to sustain its life and biodiversity.  Several government agencies was established to facilitate, monitor, and protect the habitat and biodiversity of the lake though different programs. The Laguna Lake Development Authority’s (LLDA’s) is the leading agency organized to carry out national policy, social and economical development, preservation of the quality of human life and ecological systems and most especially in the preservation of undue ecological disturbances, deterioration and pollution. There are several programs being implemented by the institution such as environmental management, watershed management, fisheries development, community management, research development, and national greening programs. The research development program focus on the technology development in decision support system and water quality monitoring program in support to LLDA’s mandate, lake monitoring and relevant policy decision making (LLDA, 2018).  The development of Waste Load Model (WLM) was utilized to estimate the load of the pollution in Lake Watershed coming from substances produced by human activities which are the key source of pollution while the water quality modelling provides a platform for the estimation and computing of pollution loads in different time slices. (PEMSEA,DENR and the LLDA's, 2013).
                </p>
            </div>
        </div>
    </div>

    <div id="project-description" class="jumbotron p-3" style="background: #f2f2f2">
        <div class="container">
            <h1 class="display-5">Project Description</h1>
            <div class="col justyify-content-center">
                <p class="lead">
                    Intelligent Environmental Modelling of Water Reservoir Implementing Deep Learning Algorithm is a system design to monitor and predict the ecological condition of the Laguna Lake. It is a web based system that includes the Map of the Laguna Lake containing Overview of the Lake, Water Quality Maps, Data Visualization, Simulation of Water Quality and Water Quality Prediction.
                </p>
                <p class="lead">
                    The study deals with the development of an intelligent system applying geographical information system for environmental modelling, environmental data analysis and environmental informatics. The data sets will be based from the lead agencies collected as base line data on the physical attributes or elements in the Laguna Lake. These data will be used for calibrating and validating model prediction as well as the forecasting of the lake status. The study will also include spatiotemporal mapping, simulation for situational analysis and model predictions of the Laguna Lake status.
                </p>
                <p class="lead">
                    The model prediction of the Laguna Lake conditions will utilize an algorithm with a new paradigm of machine learning technique that allows computational models that are composed of multiple processing layers to learn representations of data with multiple level of abstraction. It will demonstrate the propagation prediction of water pollutants and speed up the parameter optimization. To minimise the deviation between the predicted scenario and the real phenomenon behaviour a computational approach for efficient parameter estimation and optimisation strategies was used.
                </p>
            </div>
        </div>
    </div>

    <div id="overview" class="jumbotron p-3 bg-white">
        <div class="container">
            <h1 class="display-5">Water Quality Maps</h1>
            <div class="col justyify-content-center">
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link active" data-toggle="tab" role="tab">Nitrogen</a>
                        <a class="nav-item nav-link" data-toggle="tab" role="tab">Phosphate</a>
                        <a class="nav-item nav-link" data-toggle="tab" role="tab">pH</a>
                        <a class="nav-item nav-link" data-toggle="tab" role="tab">E.Coli</a>
                        <a class="nav-item nav-link" data-toggle="tab" role="tab">Dissolved Oxygen</a>
                        <a class="nav-item nav-link" data-toggle="tab" role="tab">Ammonia</a>
                        <a class="nav-item nav-link" data-toggle="tab" role="tab">Temp F</a>
                        <a class="nav-item nav-link" data-toggle="tab" role="tab">Transparency</a>
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" role="tabpanel">
                        <div id="map" style="height:600px;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    @include('includes.footer')
@endsection


@section('js')
    <script src="{{asset('js/pages.js')}}"></script>
    <script src="{{asset('js/gmaps.js')}}"></script>
@stop