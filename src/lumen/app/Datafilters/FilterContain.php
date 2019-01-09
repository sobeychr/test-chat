<?php

namespace App\Datafilters;

class FilterContain extends DataFilter
{
    protected function operation($entryValue):bool
    {
        return strpos($entryValue, $this->value) !== false;
    }
}
