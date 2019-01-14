<?php

namespace App\Data\Filter;

class FilterGreater extends DataFilter
{
    protected function operation($entryValue):bool
    {
        return $entryValue > $this->value;
    }
}
