<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     * Show the index/home page.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('pages.home');
    }

    /**
     * Show the about laguna page.
     *
     * @return \Illuminate\Http\Response
     */
    public function laguna()
    {
        return view('pages.about.laguna');
    }

    /**
     * Show the about lake-uses page.
     *
     * @return \Illuminate\Http\Response
     */
    public function lakeUses()
    {
        return view('pages.about.lake-uses');
    }
}
