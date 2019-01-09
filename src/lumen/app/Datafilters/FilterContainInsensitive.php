<?php

namespace App\Datafilters;

class FilterContainInsensitive extends DataFilter
{
    protected function operation($entryValue):bool
    {
        return stripos($entryValue, $this->value) !== false;
    }
}
