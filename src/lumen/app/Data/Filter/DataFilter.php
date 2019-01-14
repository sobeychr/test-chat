<?php

namespace App\Data\Filter;

abstract class DataFilter
{
    protected $field = '';
    protected $value;

    public function __construct(string $field, $value)
    {
        $this->field = $field;
        $this->value = $value;
    }

    public function filter(array $data):array
    {
        return array_filter($data, function($entry) {
            if(!isset( $entry[$this->field] )) {
                return false;
            }
            return $this->operation($entry[$this->field]);
        });
    }

    abstract protected function operation($entryValue):bool;
    // { return $entryValue === $this->value; }
}
