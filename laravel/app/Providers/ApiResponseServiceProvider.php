<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Response;
use \Symfony\Component\HttpFoundation\Response as HttpResponse;

class ApiResponseServiceProvider extends ServiceProvider
{
    /**
     * response macro
     *
     * @return void
     */
    public function boot()
    {
        Response::macro('success', function ($data = []) {
            return response($data, HttpResponse::HTTP_OK)->header('Content-type', 'application/json');
        });

        Response::macro('create', function ($data = []) {
            return response($data, HttpResponse::HTTP_CREATED);
        });

        Response::macro('noContent', function () {
            return response([], HttpResponse::HTTP_NO_CONTENT);
        });

        Response::macro('error', function (int $status, $message) {
            return response()->json([
                'message' => $message,
            ], $status, [], JSON_UNESCAPED_UNICODE);
        });

        Response::macro('validation', function (int $status, $message, $errMsg = '') {
            return response()->json([
                'message' => $message,
                'errors' => $errMsg,
            ], $status, [], JSON_UNESCAPED_UNICODE);
        });
    }
}
