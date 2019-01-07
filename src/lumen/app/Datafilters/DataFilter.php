<?php

namespace App\Datafilters;

abstract class DataFilter
{
    protected $field = '';
    protected $value;

    public function __construct(string $field, $value)
    {
        $this->field = $field;
        $this->value = $value;
    }

    abstract public function filter(array $data):array;
}
