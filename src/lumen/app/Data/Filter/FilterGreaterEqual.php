<?php

namespace App\Data\Filter;

class FilterGreaterEqual extends DataFilter
{
    protected function operation($entryValue):bool
    {
        return $entryValue >= $this->value;
    }
}
