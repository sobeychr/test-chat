<?php

namespace App\Datafilters;

class FilterMatch extends DataFilter
{
    protected function operation($entryValue):bool
    {
        return $entryValue === $this->value;
    }
}
