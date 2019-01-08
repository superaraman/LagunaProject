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
    public function queryVerifiedUsers()
    {
        return $this->oModelUser::where('verified', 'YES');
    }

    /**
     * Returns all pending Users
     *
     * @return mixed
     */
    public function queryPendingUsers()
    {
        return $this->oModelUser::where('verified', 'NO');
    }

    /**
     * Returns all super admin Users
     *
     * @return mixed
     */
    public function querySuperAdminUsers()
    {
        return $this->oModelUser::where('user_role', 'SUPER_ADMIN');
    }

    /**
     * Returns all admin Users
     *
     * @return mixed
     */
    public function queryAdminUsers()
    {
        return $this->oModelUser::where('user_role', 'ADMIN');
    }

    /**
     * Returns all users
     *
     * @return User[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getAllUsers()
    {
        return $this->oModelUser::all();
    }

    /**
     * Accepts the pending User
     *
     * @param int $iId
     * @return array
     */
    public function acceptPendingUsers(int $iId): array
    {
        if ($this->oModelUser::where('id', $iId)->update(['verified' => 'YES']) === 0) {
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
        if ($this->oModelUser::where('id', $iId)->delete() === 0) {
            return ['bResult' => false, 'sMessage' => 'No user found'];
        }

        return ['bResult' => true, 'sMessage' => 'Successfully deleted user.'];
    }
}
