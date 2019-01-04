<?php

namespace App\Http\Controllers;

use App\Http\Controllers\MessageController as MessageController;
use App\Http\Controllers\UserController as UserController;
use Laravel\Lumen\Routing\Controller as BaseController;

class InitController extends BaseController
{
    const KEY_MESSAGE = 'message';
    const KEY_USER    = 'user';

    /**
     * Returns starting messages and users as Assoc Array
     * @return array [Messages and Users as Assoc Array]
     */
    public function get():array
    {
        $message = app(MessageController::class);
        $messageData = $message->get();

        $user = app(UserController::class);
        $userData = $user->get();

        return [
            self::KEY_MESSAGE => $messageData,
            self::KEY_USER => $userData,
        ];
    }
}
