<?php

namespace SmartlabsAT\SuluImageCropContentType\Sulu\ContentType;

use SmartlabsAT\SuluImageCropContentType\Attributes\Description;
use PHPCR\NodeInterface;
use Sulu\Component\Content\Compat\PropertyInterface;
use Sulu\Component\Content\ContentTypeInterface;

#[Description("Image crop content type")]
class ImageCropContentType implements ContentTypeInterface
{
  private string $name;

  #[Description("Constructor. Alias  'image_crop'")]
  public function __construct(string $alias = 'image_crop')
  {
    $this->name = $alias;
  }

  #[Description("Gets the name.")]
  public function getName(): string
  {
    return $this->name;
  }

  #[Description("Reads the value from the node. NOTE: We do NOT write anything back to the node here to avoid multi-value errors!")]
  public function read(
    NodeInterface $node,
    PropertyInterface $property,
    $webspaceKey,
    $languageCode,
    $segmentKey
  ): void {
    $propertyName = $property->getName();

    // If the property does not exist, set an empty array.
    if (!$node->hasProperty($propertyName)) {
      $property->setValue([]);
      return;
    }

    // Retrieve the node value.
    $nodeValue = $node->getPropertyValue($propertyName);

    // Check if this property is multi-value (an array).
    $isMultiple = false;
    if (method_exists($property, 'isMultiple')) {
      $isMultiple = $property->isMultiple();
    } elseif (method_exists($property, 'getIsMultiple')) {
      $isMultiple = $property->getIsMultiple();
    }

    if ($isMultiple) {
      // MULTI-VALUE CASE
      if (!is_array($nodeValue) || empty($nodeValue)) {
        $property->setValue([]);
        return;
      }

      // Assume one entry per block sub-property.
      $rawJson = reset($nodeValue);
      if (!is_string($rawJson)) {
        $property->setValue([]);
        return;
      }

      $decoded = json_decode($rawJson, true);
      if (!is_array($decoded)) {
        $decoded = [];
      }
      $property->setValue($decoded);
    } else {
      // SINGLE-VALUE CASE
      if (is_array($nodeValue)) {
        $property->setValue([]);
        return;
      }

      if (!is_string($nodeValue)) {
        $property->setValue([]);
        return;
      }

      $decoded = json_decode($nodeValue, true);
      if (!is_array($decoded)) {
        $decoded = [];
      }
      $property->setValue($decoded);
    }
  }

  #[Description("Writes the value (entered in the admin) as a JSON string or an array of JSON strings to the node.")]
  public function write(
    NodeInterface $node,
    PropertyInterface $property,
    $userId,
    $webspaceKey,
    $languageCode,
    $segmentKey
  ): void {
    $propertyName = $property->getName();

    // In the admin, usually an array of values is provided.
    $valueArray = $property->getValue() ?: [];
    $jsonValue = json_encode($valueArray);

    // Check if multi-value.
    $isMultiple = false;
    if (method_exists($property, 'isMultiple')) {
      $isMultiple = $property->isMultiple();
    } elseif (method_exists($property, 'getIsMultiple')) {
      $isMultiple = $property->getIsMultiple();
    }

    if ($isMultiple) {
      // MULTI-VALUE: An array of strings is expected.
      $node->setProperty($propertyName, [$jsonValue]);
    } else {
      // SINGLE-VALUE: A single string.
      $node->setProperty($propertyName, $jsonValue);
    }
  }

  #[Description("Removes the property from the node.")]
  public function remove(
    NodeInterface $node,
    PropertyInterface $property,
    $webspaceKey,
    $languageCode,
    $segmentKey
  ): void {
    $propertyName = $property->getName();

    if ($node->hasProperty($propertyName)) {
      $node->setProperty($propertyName, null);
    }
    $property->setValue(null);
  }

  #[Description("Returns the content data. In the frontend (Twig) the array obtained during reading is available.")]
  public function getContentData(PropertyInterface $property)
  {
    return $property->getValue() ?? [];
  }

  #[Description("Returns the view data for the admin interface.")]
  public function getViewData(PropertyInterface $property)
  {
    return $this->getContentData($property);
  }

  #[Description("Returns default parameters if needed. Otherwise, returns an empty array.")]
  public function getDefaultParams(PropertyInterface $property = null): array
  {
    return [];
  }

  #[Description("Checks if the field is 'filled'.")]
  public function hasValue(
    NodeInterface $node,
    PropertyInterface $property,
    $webspaceKey = null,
    $languageCode = null,
    $segmentKey = null
  ): bool {
    return !empty($property->getValue());
  }

  #[Description("Optional if you always want initial data. Otherwise, returns null.")]
  public function getDefaultValue()
  {
    return null;
  }
}