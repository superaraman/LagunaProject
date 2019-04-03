@extends('layouts.master')

@section('content')
    @include('includes.navbar')
    {{-- Header of about --}}
    <div class="jumbotron jumbotron-fluid bg-size-cover bg-position-bottom page-header-about" style="background-image: url('/img/home.jpg')">
        <div class="container text-center"> 
            <h1 class="display-4">Laguna de bay</h1>
            <span class="lead">"The largest lake in the Philippines"</span>
        </div>
    </div>

    {{-- Origin --}}
    <div id="origin" class="container">
        <div class="jumbotron p-3 bg-white" style="margin-top: -75px;">
            <div class="container">
                <h1 class="display-5">ORIGIN</h1>
                <div class="col justyify-content-center">
                    <div class="row">
                        <div class="col-12 col-md-6 border-right border-solid">
                            <p class="lead">
                                Early geologists had diverse opinions regarding the origin of Laguna de Bay. Up to this time, the issue that the lake was previously a volcanic crater or that it originated through subsidence due to a volcanic eruption still needs supporting facts. A shallow crater at the southern end of Talim Island can be found and serves as one evidence of its volcanic history, i.e., that Laguna de Bay is believed to have been formed by two major volcanic eruptions between 27,000-29,000 years ago (UP Planades, 2011).
                            </p>
                        </div>
                        <div class="col-12 col-md-6">
                            <p class="lead">
                                Based on recent findings, Laguna de Bay was once a part of Manila Bay. This is evidenced by the discovery of drill cores of marine shell species which can also be found in Manila Bay. These species of marine shells can also be located in the upper shores of Bagumbayan (Luneta Park) and in the Marikina Fault in Pasig-Marikina River junction (Laguna de Bay Master Plan, 1995).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {{-- CHARACTERISTICS  --}}
    <div id="characteristic" class="jumbotron p-3 bg-white">
        <div class="container">
            <h1 class="display-5">CHARACTERISTICS OF THE LAKE ECOSYSTEM</h1>
            <div class="col justyify-content-center">
                <p class="lead">
                    The lake’s aggregate surface area is 900 km2 when it is at its average highest elevation of 12.50 meters, and around 76,000 hectares when it is at its average lowest elevation of 10.50 meters. It is the largest inland body of water in the Philippines and third largest freshwater lake in Southeast Asia next to Lake Toba (Santos-Borja, 1994) and Lake Songkhla of Thailand, with 1,100–1,129 and 987 km2 of surface area, respectively (Gleick, 1993). Laguna de Bay covers almost one half of the 190,000 hectares total area of all existing lakes in the Philippines (Laguna de Bay Master Plan, 1995). The lake is bounded by the Sierra Madre mountain ranges on the northeast, the Caliraya volcanic plateau on the east, mountains of Laguna and Batangas including Mt. Banahaw and Mt. Makiling on the south and southeast. This Lake has a total volume of 3.2 billion cubic meters with a shoreline of 220 kms. Average depth of the lake is 2.5 meters.   
                </p>
                <div id="see-more-characteristic" class="d-none">
                    <p class="lead">
                        Around 100 rivers and streams drain into the lake, of which 22 are significant river systems1. There is only one outlet, the Napindan Channel, through the Pasig River that drains lake waters to Manila Bay. The Napindan Hydraulic Control Structure (HCS) built in 1982 controls the outflow to Manila Bay. As designed, the HCS controls the backflow of saline water and pollution from the Pasig River. In addition to Laguna de Bay, there are other, smaller, lakes in the region, in particular the Seven Crater Lakes (Sampaloc, Calibato, Bunot, Palakpakin, Pandin, Yambo and Mohicap) with a total surface area of 305 has. and Tadlak lake in Los Banos which is only 25 has.       
                    </p>
                    <p class="lead">
                        These tributary rivers are the Pagsanjan River, the Sta. Cruz River, the Balanak River, the Marikina River, the Mangangate River, the Tunasan River, the San Pedro River, the Cabuyao River, the San Cristobal River, the San Juan River, the Bay, Calo, and Maitem Rivers in Bay, the Molawin, Dampalit and Pele Rivers in Los Baños, the Pangil River, the Tanay River, the Morong River, the Siniloan River, and the Sapang Baho River, Sta. Maria, Jala-jala, Pililia, Baras, Pila, Angono, Manggahan, Calauan
                    </p>
                </div>
                <p class="lead">
                    <button class="btn btn-primary btn-lg read-more" hide="see-more-characteristic">Read more</button>
                </p>
            </div>
        </div>
    </div>

    {{-- HYDROLOGY --}}
    <div id="hydrology" class="jumbotron p-3" style="background: #f2f2f2">
        <div class="container">
            <h1 class="display-5">LAKE HYDROLOGY</h1>
            <div class="col justyify-content-center">
                <p class="lead">
                    The hydrology of the lake has a natural stage regime which in the dry season results in a minimum lake elevation of approximately 10.5 m. regulated by mean sea level in Manila Bay (Laguna de Bay Master Plan, 1995). After the dry season, the lake level may fall below the level of high tide in manila Bay. This will result in intrusion of seawater into Pasig River. Because of this intrusion, the highly polluted waters of Pasig River are finally discharge into the Lake. Moreover, the tidal influx is the main cause of salinity in the lake during this part of the mentioned year (Laguna de Bay Master Plan, 1995). The hydrology of the lake is discussed below, while those of the twenty-four tributary rivers are described in Annex 1 of the Updated Laguna de Bay Master Plan.     
                </p>
                <p class="lead">
                    From the sub-basins, the run-off brings in freshwater to the lake, half of which inflows come from rivers found in the eastern part of the lake. The biggest contribution comes from Pagsanjan River, which accounts for 18%-20% of the total inflows. When there is sufficient tidal fluctuation and the lake level is lower than Manila Bay, salt water intrusion through the Pasig River increases the salinity of the lake resulting to brackish water. Freshwater runoff and saltwater backflows maintain the salt balance of the lake (Tongson, E. et. al., 2012).       
                </p>
                <div id="see-more-hydrology" class="d-none">
                    <p class="lead">
                        Laguna Lake is divided into four (4) bays, namely West Bay, Central Bay and East Bay and South Bay (ADB, 2005). Talim Island separates the West and Central Bay. These divisions are due to considerable bathymetrical differences of these areas (Delos Reyes 1995). Three bays mentioned are ca. 30-40 km long and 7-20 km wide. Accompanying figure shows the bathymetrical differences that divided the lake into 4 main bays.
                    </p>
                    <p class="lead">
                        The lake is naturally eutrophic and highly productive. Increasing enrichment in terms of plant nutrients such as nitrogen and phosphorus has been caused by human activities in the basin. The lake is surrounded by low-lying alluvial plains which are often inundated during heavy rainfall. The pH varies from 7.6 during the cool months to 10 at the peak of algal bloom in mid-summer; the average is about 8.5. The water is relatively turbid, and has an average dissolved oxygen of 10.5 p.p.m. Wind action can cause severe turbidity due to suspension of bottom sediments, particularly during typhoons. At the end of the dry season, the level of the lake often falls below that of Manila Bay, allowing seawater to flow into the lake at high tide. The lake reaches its maximum level between September and November, and then falls by an average of 1.7m to its lowest level in May or June.                    
                    </p>
                </div>
                <p class="lead">
                    <button class="btn btn-primary btn-lg read-more" hide="see-more-hydrology">Read more</button>
                </p>
            </div>
        </div>
    </div>

    {{-- LAKE BATHYMETRY --}}
    <div id="bathymetry" class="jumbotron m-0 bg-white">
        <div class="container">
            <h1 class="display-5">LAKE BATHYMETRY</h1>
            <div class="col justyify-content-center">
                <p class="lead p-0">
                    The studies conducted by LLDA-NIGS in 1999 on the bathymetry and sediment quality of the Laguna de Bay showed that the surface area was 949 km2 or 949,000 hectares. The average depth was at 2.1 meters (at elevation 10.5 m) and the total water volume was 1.89 billion cu. m. Based on the bathymetric changes from 1938 to 1997, the sedimentation rate was estimated to be from 1.03 to 1.20 cm yr -1.                
                </p>
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
