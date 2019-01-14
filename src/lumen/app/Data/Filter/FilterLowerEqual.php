<?php

namespace App\Data\Filter;

class FilterLowerEqual extends DataFilter
{
    protected function operation($entryValue):bool
    {
        return $entryValue <= $this->value;
    }
}
