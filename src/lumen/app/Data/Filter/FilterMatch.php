<?php

namespace App\Data\Filter;

class FilterMatch extends DataFilter
{
    protected function operation($entryValue):bool
    {
        return $entryValue === $this->value;
    }
}
