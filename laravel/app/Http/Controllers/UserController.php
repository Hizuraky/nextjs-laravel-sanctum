<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\User\UserResource;
use App\Http\Requests\RegisterRequest;

class UserController extends Controller
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

    //ユーザー情報取得
    public function index()
    {
        $userId = $this->getLoginUserId();
        $user = User::getUserProfile($userId);
        return response()->success(new UserResource($user));
    }

    //ユーザー作成
    public function create(RegisterRequest $request)
    {
        User::createUser($request);
        return response()->noContent();
    }


}
