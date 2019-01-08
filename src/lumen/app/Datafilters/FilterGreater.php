<?php

namespace App\Datafilters;

class FilterGreater extends DataFilter
{
    protected function operation($entryValue):bool
    {
        return $entryValue > $this->value;
    }
}
