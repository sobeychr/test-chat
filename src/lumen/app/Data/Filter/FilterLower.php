<?php

namespace App\Data\Filter;

class FilterLower extends DataFilter
{
    protected function operation($entryValue):bool
    {
        return $entryValue < $this->value;
    }
}
