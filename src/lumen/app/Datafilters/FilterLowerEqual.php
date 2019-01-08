<?php

namespace App\Datafilters;

class FilterLowerEqual extends DataFilter
{
    protected function operation($entryValue):bool
    {
        return $entryValue <= $this->value;
    }
}
