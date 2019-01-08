<?php

namespace App\Datafilters;

class FilterGreaterEqual extends DataFilter
{
    protected function operation($entryValue):bool
    {
        return $entryValue >= $this->value;
    }
}
