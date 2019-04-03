<?php

namespace App\BusinessLogics;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


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

    /**
     * Get specific user that is verified
     *
     * @param int $iId
     * @return mixed
     */
    public function getSpecificVerifiedUser(int $iId)
    {
        return $this->oModelUser::where('id', $iId)->where('verified', 'YES')->first();
    }

    /**
     * @param array $aUserInfo
     * @return array
     */
    public function updateUser(array $aUserInfo)
    {
        $bResult = $this->oModelUser::where('id', $aUserInfo['id'])->update($aUserInfo) === 1;
        if ($bResult === false) {
            return ['bResult' => false, 'sMessage' => 'Unexpected error while updating user.'];
        }

        return ['bResult' => true, 'sMessage' => 'Successfully updated user.'];
    }

    /**
     * @param array $aUserInfo
     * @return array
     */
    public function validateUserOnUpdate(array $aUserInfo) {
        $oValidator = Validator::make($aUserInfo, [
            'firstname' => ['required', 'string', 'max:50', 'regex:/^[a-zA-Z\s]+[.\']*$/'],
            'lastname'  => ['required', 'string', 'max:50', 'regex:/^[a-zA-Z\s]+[.\']*$/'],
            'username'  => ['required', 'string', 'min:6', 'max:20', 'unique:users,username,' . $aUserInfo['id'], 'regex:/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/'],
            'email'     => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $aUserInfo['id']],
            'user_role' => 'in:SUPER_ADMIN,ADMIN'
        ]);

        return $this->handleValidatorFailure($oValidator);
    }

    /**
     * @param Validator $oValidator
     * @return array
     */
    public function handleValidatorFailure($oValidator) : array
    {
        if ($oValidator->fails()) {
            return [
                'bResult'  => false,
                'sMessage' => $oValidator->errors()->first()
            ];
        }

        return ['bResult' => true];
    }
}
