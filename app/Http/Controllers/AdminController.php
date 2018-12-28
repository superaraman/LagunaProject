<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Yajra\DataTables\DataTables;

class AdminController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application amdin.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        return view('admin.main');
    }

    /**
     * Returns data of Users
     *
     * @return mixed
     * @throws \Exception
     */
    public function getUsersData()
    {
        return DataTables::of(User::query())->make(true);
    }
}
