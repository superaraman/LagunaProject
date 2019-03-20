@extends('layouts.master')

@section('content')
    @include('includes.navbar')
    {{-- Header of existing lake --}}
    <div class="jumbotron jumbotron-fluid bg-size-cover bg-position-bottom page-header-about" style="background-image: url('/img/home.jpg')">
        <div class="container text-center"> 
            <h1 class="display-4">Existing Lake Uses</h1>
            <span class="lead">Laguna de bay</p>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-12 col-md-6 mb-3">
                <div class="card">
                    <img class="card-img-top" src="/img/lake-uses/fisheries.png" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">Fisheries</h5>
                        <p class="card-text">
                            The lake’s most dominant use is on fisheries. It is estimated that the lake yielded 37,000 to 
                            47,000 MT (metric tons) of fish in 1997 to 2000 – both from the fishpens and open fisheries. 
                            Crustaceans and mollusks declined in yield from 1,927 to 574 MT and from 101,101 to 85,363 MT 
                            <span id="see-more-fisheries" class="d-none">
                                respectively, during the same period. With the introduction of the fishpen culture technology in 1970, 
                                the boom in lake fishery production also led to social conflicts in the region. Large-scale fishpens have
                                threatened the economic conditions of fishermen dependent upon open water fishery. To address the issue, 
                                a revised Lake Fishery Zoning and Management Plan was implemented in 1996.
                            </span>
                        </p>
                        <button class="btn btn-primary btn-sm read-more" hide="see-more-fisheries">Read more</button>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6 mb-3">
                <div class="card">
                    <img class="card-img-top" src="/img/lake-uses/laketranspo.png" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">Transport Routes</h5>
                        <p class="card-text">
                            LLDA set navigational routes for lake travelers and users to avoid conflicts with fish 
                            cultivators, fishpen owners, and free-range fishermen. More than 5,000 motorized and 
                            non-motorized watercraft operate as a means of transportation for lakeshore communities. 
                            <span id="see-more-transport" class="d-none">
                                In addition, there are 23 barges plying the lake to transport an average of 75,640 barrels 
                                of oil and oil products to various supply depots daily. Board Resolution no. 66 of 1998 – 
                                Approved the navigational routes for the ferry system in the Laguna de Bay.
                            </span>
                        </p>
                        <button class="btn btn-primary btn-sm read-more" hide="see-more-transport">Read more</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12 col-md-6 mb-3">
                <div class="card">
                    <img class="card-img-top" src="/img/lake-uses/reservoir.png" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">Flood Water Reservoir</h5>
                        <p class="card-text">
                            The lake also serves as a reservoir for floodwater to save Metro Manila from flooding. 
                            The Manggahan Floodway was constructed to divert floodwaters from Marikina River into 
                            the lake. The Napindan control station regulates the outflow of excess lake waters and 
                            minimizes the inflow of saline water and pollution from the Pasig River.
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6 mb-3">
                <div class="card">
                    <img class="card-img-top" src="/img/lake-uses/powerplant.png" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">Power Generation</h5>
                        <p class="card-text">
                            Laguna de Bay is also used for power generation; three power plants are located in the 
                            region. A pump storage hydroelectric power station is operated in Kalayaan, Laguna. 
                            Water is pumped up to the Caliraya Reservoir to generate about 300 megawatts of 
                            electricity. Efforts are underway to increase this capacity to 600 megawatts.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-12 col-md-6 mb-3">
                <div class="card">
                    <img class="card-img-top" src="/img/lake-uses/recreation.png" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">Recreation</h5>
                        <p class="card-text">
                            Laguna de Bay is also known for recreational activities. Although classified only for
                            non-contact recreation such as fishing, boating and sailing, the lake is used for 
                            swimming in some communities. Lakeshore resorts near Mt. Makiling extract hot spring 
                            <span id="see-more-recreation" class="d-none">
                                waters for health spa and beauty treatment. LLDA also ventures on eco-tourism projects
                                through the LISCOP Component 1 Project with 6 eco-enhancement projects in Rizal and 
                                Laguna Provinces.
                            </span>
                        </p>
                        <button class="btn btn-primary btn-sm read-more" hide="see-more-recreation">Read more</button>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6 mb-3">
                <div class="card">
                    <img class="card-img-top" src="/img/lake-uses/irrigation.png" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">Irrigation</h5>
                        <p class="card-text">
                            Laguna de Bay also provides sufficient water for farm lands of the lake region. 
                            Studies are being done to further improve the use of lake water for agriculture.
                            <br><br><br><br>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12 col-md-6 mb-3">
                <div class="card">
                    <img class="card-img-top" src="/img/lake-uses/industrialcooling.png" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">Industrial Cooling</h5>
                        <p class="card-text">
                            The lake is also being used as a source of industrial cooling water. Major users 
                            include the National Power Corporation for the Kalayaan Hydropower Plant and the 
                            Philippine Petroleum Corporation Refinery in Pililla, Rizal. KEPHILCO-Malaya Power
                            <span id="see-more-industrial" class="d-none">
                                plant also draws water from the lake for cooling. Cooling water is recycled back 
                                into the lake resulting in thermal pollution of about 20 degrees centigrade rise 
                                in temperature near the discharge points. 
                            </span>
                        </p>
                        <button class="btn btn-primary btn-sm read-more" hide="see-more-industrial">Read more</button>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6 mb-3">
                <div class="card">
                    <img class="card-img-top" src="/img/lake-uses/wastesink.png" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">Waste Sink</h5>
                        <p class="card-text">
                            The lake also serves as a huge waste sink for solid and liquid waste coming from 
                            households, cropland areas, industries, livestock and poultry production as well as
                             fishery activities. Because not a single municipality is equipped with a sewerage 
                            <span id="see-more-waste" class="d-none">
                                system, pollution is carried as surface run-off through the sub-basins of the lake. 
                                In addition, polluted waters from the Marikina and Pasig Rivers also flow into the lake.
                            </span>
                        </p>
                        <button class="btn btn-primary btn-sm read-more" hide="see-more-waste">Read more</button>
                    </div>
                </div>
            </div>
        </div>

    </div>

    @include('includes.footer')
@endsection

@section('css')
    <link rel="stylesheet" href="{{asset('css/pages.css')}}">
@stop

@section('js')
    <script src="{{asset('js/pages.js')}}"></script>
@stop
