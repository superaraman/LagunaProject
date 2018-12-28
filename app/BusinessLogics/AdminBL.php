<?php

namespace App\BusinessLogics;

use App\Models\User;
use Illuminate\Http\Request;

/**
 * Class blAdmin
 * @package App\BusinessLogics
 */
class AdminBL
{
    /**
     * @var User Announcement model
     */
    private $oModelUser;

    /**
     * AdminBL constructor.
     * @param User $oModelUser
     */
    public function __construct(User $oModelUser)
    {
        $this->oModelUser = $oModelUser;
    }

    /**
     * Index
     */
    public function getVerifiedUser()
    {
        return User::where('verified', 'YES');
    }
}
