<?php

namespace App\Datafilters;

class FilterMatch extends DataFilter
{
    public function filter(array $data):array
    {
        return array_filter($data, function($entry) {
            if(!isset( $entry[$this->field] )) {
                return false;
            }
            return $entry[$this->field] === $this->value;
        });
    }
}
