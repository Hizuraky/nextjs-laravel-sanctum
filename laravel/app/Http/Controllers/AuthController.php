<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Auth\AuthenticationException;

class AuthController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        //
    }

    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials)) {
            throw new AuthenticationException;
        };

        $request->session()->regenerate();
        $user = Auth::user();
        return User::getUserProfile($user->id);
    }


    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }

    public function me()
    {
        // dd("e");
        $userId = $this->getLoginUserId();
        return User::getUserProfile($userId);
    }

    public function test()
    {
        return  array(
            "name" => "あらゆ" ,
            "gender" => "男" ,
        );;
    }

}
