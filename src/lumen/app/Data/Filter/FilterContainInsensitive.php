<?php

namespace App\Data\Filter;

class FilterContainInsensitive extends DataFilter
{
    protected function operation($entryValue):bool
    {
        return stripos($entryValue, $this->value) !== false;
    }
}
