<?php

namespace App\Datafilters;

class FilterBetween
{
    protected $field = '';
    protected $min = 0;
    protected $max = 0;

    public function __construct(string $field, $min, $max)
    {
        $this->field = $field;
        $this->min = $min;
        $this->max = $max;
    }

    public function filter(array $data):array
    {
        return array_filter($data, function($entry) {
            if(!isset( $entry[$this->field] )) {
                return false;
            }
            $entryval = $entry[$this->field];
            return $this->min < $entryval && $entryval < $this->max;
        });
    }
}
