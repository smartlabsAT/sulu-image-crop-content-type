<?php

namespace SmartlabsAT\SuluImageCropContentType\Attributes;

use Attribute;

#[Attribute(Attribute::TARGET_CLASS | Attribute::TARGET_METHOD | Attribute::TARGET_FUNCTION)]
class Description
{
  public function __construct(public string $text)
  {
  }
}