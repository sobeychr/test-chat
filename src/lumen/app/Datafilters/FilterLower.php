<?php

namespace App\Datafilters;

class FilterLower extends DataFilter
{
    protected function operation($entryValue):bool
    {
        return $entryValue < $this->value;
    }
}
