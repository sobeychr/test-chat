<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

use App\Http\Controllers\{MessageController, UserController};

class GenerateController extends BaseController
{
    const START = 1545264000; // strtotime('2018-12-20');
    const END   = 1546732800; // strtotime('2019-01-06');

    const MESSAGE_FILE_LIMIT = 6500;
    const MESSAGE_MIN = 2;
    const MESSAGE_MAX = 4500;
    const USER_LENGTH = 35;

    const TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pulvinar sem sed neque tincidunt, nec condimentum massa sollicitudin. Fusce pharetra blandit est, at rhoncus leo blandit quis. Etiam egestas ullamcorper nunc, sit amet volutpat ligula euismod sit amet. Fusce a dui mollis, gravida justo ut, consectetur purus. Duis quis tempor velit, in placerat libero. Quisque non magna at sem pharetra viverra in eu ex. Pellentesque mollis sagittis purus sit amet laoreet. Cras tristique, ex ac auctor pretium, mauris mi luctus risus, non aliquam purus lacus eu velit. Curabitur et pharetra lacus, non dapibus magna. Maecenas eleifend auctor turpis, at fringilla nulla mattis in.

Quisque venenatis vel mi at tempor. Duis fermentum est a lacus mattis, non consectetur felis auctor. Fusce gravida nulla porta pulvinar facilisis. Sed tempor convallis nisl et faucibus. Proin aliquet varius tristique. Sed dolor urna, dapibus sit amet tortor et, interdum convallis quam. Aenean lorem lectus, dapibus non iaculis in, mattis quis magna. Etiam ut risus sollicitudin, rutrum enim suscipit, dignissim sapien. Proin porttitor laoreet augue, pretium venenatis mi fringilla sed. Fusce et commodo dui. Nullam luctus justo mi, eget bibendum velit mattis nec. Pellentesque eget condimentum tellus. In ullamcorper ligula nec purus commodo cursus.

Nam scelerisque, enim id euismod congue, ipsum sapien hendrerit eros, ullamcorper faucibus arcu est eget odio. Ut accumsan lorem et est ullamcorper egestas. Aliquam erat volutpat. Fusce risus est, laoreet et dui nec, tristique aliquam velit. Cras sit amet libero ac neque consequat scelerisque. Aenean sed nunc finibus, hendrerit ligula in, pellentesque orci. Vivamus magna mauris, egestas ac odio vitae, accumsan vulputate ipsum.';
    const TEXT_LEN = 1765; // strlen( self::TEXT );

    public function message():array
    {
        $textMin = 2;
        $textMax = self::TEXT_LEN;

        $arr = [];
        $id = 1;
        $filecount = 0;

        for($userId=1; $userId<=self::USER_LENGTH; $userId++)
        {
            $messageLen = rand(self::MESSAGE_MIN, self::MESSAGE_MAX);
            for($i=1; $i<=$messageLen; $i++)
            {
                $textLen = rand($textMin, $textMax);
                $text = trim(substr(
                    self::TEXT,
                    rand(0, self::TEXT_LEN - $textLen),
                    $textLen
                ));

                $time = rand(self::START, self::END);

                $arr[] = [
                    'id' => $id,
                    'userid' => $userId,
                    'text' => $text,
                    'time' => $time,
                ];

                $id++;

                if(count($arr) >= self::MESSAGE_FILE_LIMIT) {
                    shuffle($arr);
                    $this->writeFile('message-generated-' . $filecount . '.json', $arr);

                    $arr = [];
                    $filecount++;
                }
            }
        }

        if(count($arr) > 0) {
            shuffle($arr);
            $this->writeFile('message-generated-' . $filecount . '.json', $arr);
        }
        return [
            'filecount' => ($filecount + 1),
            'messagecount' => $id,
        ];
    }

    public function user():array
    {
        $nameMin = 4;
        $nameMax = 17;

        $arr = [];
        $x = 0;
        $y = 0;

        for($i=1; $i<=self::USER_LENGTH; $i++)
        {
            $nameLen = rand($nameMin, $nameMax);
            $name = trim(substr(
                self::TEXT,
                rand(0, self::TEXT_LEN - $nameLen),
                $nameLen
            ));

            $arr[] = [
                'id'   => $i,
                'name' => $name,
                'avatar' => rand(1, 69),
                'status' => 1,
                'x' => $x,
                'y' => $y,
                'width'  => 350,
                'height' => 350
            ];

            $x += 225;
            if($x >= 1500) {
                $x = 0;
                $y += 225;
            }
        }

        shuffle($arr);
        $this->writeFile('user-generated.json', $arr);
        return [
            'usercount' => count($arr),
        ];
    }

    private function writeFile(string $filename, $content, bool $append=false):bool
    {
        $filepath = PATH_DATA . $filename;

        if($append) {
            if($prevFile = file_get_contents($filepath)) {
                if($prevJson = json_decode($prevFile, true)) {
                    $content = array_merge($prevJson, $content);
                }
            }
        }

        $filecontent = json_encode($content, JSON_PRETTY_PRINT);
        return file_put_contents($filepath, $filecontent);
    }
}
