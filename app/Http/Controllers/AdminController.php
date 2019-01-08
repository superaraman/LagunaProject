<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\BusinessLogics\AdminBL;
use App\Models\User;
use Yajra\DataTables\DataTables;

class AdminController extends Controller
{
    /**
     * Instance of business logic
     *
     * @var AdminBL
     */
    private $oBlAdmin;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->oBlAdmin = new AdminBL(new User());
    }

    /**
     * Show the application amdin.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        return view('admin.pages.dashboard');
    }

    /**
     * Shows Settings
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function settings()
    {
        return view('admin.pages.settings');
    }

    /**
     * Shows Verified Users
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function verifiedUsers()
    {
        return view('admin.pages.users.verifiedUsers');
    }

    /**
     * Shows Pending Users Requests
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function pendingUsers()
    {
        return view('admin.pages.users.pendingUsers');
    }

    /**
     * Returns data of Verified Users
     *
     * @return mixed
     * @throws \Exception
     */
    public function tableVerifiedUsers()
    {
        $aVerifiedUser = $this->oBlAdmin->queryVerifiedUsers();

        return DataTables::of($aVerifiedUser)->make(true);
    }

    /**
     * Returns data of Pending Users
     *
     * @return mixed
     * @throws \Exception
     */
    public function tablePendingUsers()
    {
        $aPendingUsers = $this->oBlAdmin->queryPendingUsers();

        return DataTables::of($aPendingUsers)->make(true);
    }

    public function getGraphsData()
    {
        return [
            'iAllUsers' => $this->oBlAdmin->getAllUsers()->count(),
            'iPendingUsers' => $this->oBlAdmin->queryPendingUsers()->count(),
            'iVerifiedUsers' => $this->oBlAdmin->queryVerifiedUsers()->count(),
            'iSuperAdminUsers' => $this->oBlAdmin->querySuperAdminUsers()->count(),
            'iAdminUsers' => $this->oBlAdmin->queryAdminUsers()->count(),
        ];
    }

    /**
     * Accepts pending users
     *
     * @param Request $aRequest
     * @return array
     */
    public function acceptPendingUsers(Request $aRequest)
    {
        return $this->oBlAdmin->acceptPendingUsers($aRequest->input('id'));
    }

    /**
     * Rejects Pending Users
     *
     * @param Request $aRequest
     * @return array
     */
    public function rejectPendingUsers(Request $aRequest)
    {
        return $this->oBlAdmin->rejectPendingUsers($aRequest->input('id'));
    }
}
