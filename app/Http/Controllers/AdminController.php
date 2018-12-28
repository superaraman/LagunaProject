<?php

namespace App\Http\Controllers;

use App\BusinessLogics\AdminBL;
use Illuminate\Http\Request;
use App\Models\User;
use Yajra\DataTables\DataTables;

class AdminController extends Controller
{
    /**
     * @var User Announcement model
     */
    private $oAdminBL;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->oAdminBL = new AdminBL(new User());
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
        $aVerifiedUser = $this->oAdminBL->getVerifiedUser();

        return DataTables::of($aVerifiedUser)->make(true);
    }
}
