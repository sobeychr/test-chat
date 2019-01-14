<?php

namespace App\Data\Filter;

class FilterContain extends DataFilter
{
    protected function operation($entryValue):bool
    {
        return strpos($entryValue, $this->value) !== false;
    }
}
