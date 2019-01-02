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
     * Returns all verified Users
     *
     * @return mixed
     */
    public function getVerifiedUsers()
    {
        return User::where('verified', 'YES');
    }

    /**
     * Returns all pending Users
     *
     * @return mixed
     */
    public function getPendingUsers()
    {
        return User::where('verified', 'NO');
    }

    /**
     * Accepts the pending User
     *
     * @param int $iId
     * @return array
     */
    public function acceptPendingUsers(int $iId): array
    {
        if (User::where('id', $iId)->update(['verified' => 'YES']) === 0) {
            return ['bResult' => false, 'sMessage' => 'Error updating user.'];
        }

        return ['bResult' => true, 'sMessage' => 'Successfully accepted pending user.'];
    }

    /**
     * Rejects the Pending User
     *
     * @param int $iId
     * @return array
     */
    public function rejectPendingUsers(int $iId)
    {
        if (User::where('id', $iId)->delete() === 0) {
            return ['bResult' => false, 'sMessage' => 'No user found'];
        }

        return ['bResult' => true, 'sMessage' => 'Successfully deleted user.'];
    }
}
