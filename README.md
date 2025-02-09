# 🧩 sulu-image-crop-content-type

> **An open-source Sulu bundle providing a custom image crop content type with an integrated React component for intuitive image cropping.**

![Demo](./docs/assets/demo.gif)

## 🚀 Introduction

This bundle allows you to seamlessly **select**, **crop**, and **manage** images within the Sulu Admin. It augments the default Sulu Media handling by introducing a specialized `image_crop` field type, powered by a custom React component.

## ⚠️ Requirements


| Requirement | Version |
| ----------- | ------- |
| **PHP**     | ^8.2    |
| **Sulu**    | ^2.6    |
| **Node**    | ^20     |

## 📥 Installation

### **Require the bundle**

```bash
composer require smartlabsat/sulu-image-crop-content-type
```

### Create or update your frontend build

#### If you haven't created an admin folder yet:
```bash
mkdir -p assets/admin
```

### Download Sulu's Admin build

```bash 
bin/console sulu:admin:download-build
```

``` bash
cd assets/admin
```

```bash
npm install
```

### Link the local JS bundle from the vendor folder
```bash
npm install file:../../vendor/smartlabsat/sulu-image-crop-content-type/Resources/js
```

### Import the bundle in /assets/admin/app.js

```javascript
// /assets/admin/app.js
// Add project specific javascript code and import of additional bundles here:
import 'sulu-smartlabsat-image-crop-bundle';
```

### Build 
Build your admin assets
```bash
npm run build
```


## 🎨 Usage

Once everything is installed, you can use the image_crop type in your Sulu templates or pages:

```xml
<property name="composite" type="image_crop">
    <params>
        <param name="previewCrop" value="300x"/>
    </params>
</property>
```

**Note: The previewCrop parameter controls the thumbnail size that appears in the admin interface (e.g., 300x).
Example Template Configuration**

`config/templates/pages/imagecroppage.xml`
```xml
<?xml version="1.0"?>

<template xmlns="http://schemas.sulu.io/template/template"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://schemas.sulu.io/template/template http://schemas.sulu.io/template/template-1.0.xsd">

<key>image_crop_page</key>
<view>pages/image_crop_page</view>
<controller>Sulu\Bundle\WebsiteBundle\Controller\DefaultController::indexAction</controller>

<meta>
    <title lang="en">Image Crop Page</title>
</meta>

<properties>
    <property name="title" type="text_line" colspan="12">
        <meta>
            <title lang="en">Title</title>
        </meta>
    </property>

<property name="url" type="resource_locator" colspan="12">
    <tag name="sulu.rlp"/>
    <meta>
        <title lang="en">URL</title>
    </meta>
</property>

<property name="composite" type="image_crop">
    <params>
        <param name="previewCrop" value="300x"/>
    </params>
</property>
</properties>
</template>
```

`templates/pages/image_crop_page.html.twig`
```html
{% block content %}

<!DOCTYPE html>

<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Image Cropper Demo</title>
    <!-- Bulma CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <!-- Font Awesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-p0p+65dAxpkrv+7c6Wbb5e9s6RO7XlOQhvfA4CTp6GAGcJZUT1kn2SZig0wYxumCAtdIsP+S3f+q1D1r5u0xig=="
          crossorigin="anonymous" referrerpolicy="no-referrer"/>
    <style>
        .image-container {
            display: flex;
            justify-content: center;
        }
        .component-title {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .image-container img {
            max-width: 100%;
            height: auto;
        }
    </style>
</head>
<body>
<section class="section">
    <div class="container">
        <div class="level">
            <div class="level-left">
                <div class="level-item">
                    <h1 class="title component-title">
                        <span class="icon is-large">
                            <i class="fas fa-crop fa-2x"></i>
                        </span>
                        <span>{{ content.title }}</span>
                    </h1>
                </div>
            </div>
        </div>

{% set composite = content.composite|default({}) %}
{% set media = composite.media|default(null) %}

{% if media %}

<div class="box">
<figure class="image image-container">
{% set cropKey = '300x' %}
<img src="{{ media.thumbnails[cropKey]|default('') }}" alt="Image Cropper Demo"/>
</figure>
</div>
{% endif %}

</div>
</section>


<script src="https://cdn.jsdelivr.net/npm/@material-ui/styles@4.11.5/index.min.js"></script>

</body>
</html>
{% endblock %}
```

If you haven’t defined any image crops in your project yet, please refer to Sulu Docs on Image Formats.

## ⚛️ React Component Overview

Below is a simplified overview of the React component that powers the cropping interface:
•	**ImageCropContentType** class
•	Utilizes Sulu’s **SingleSelectionStore** to manage the selected media
•	Integrates Sulu’s **CropOverlay** for the cropping functionality
•	Offers convenient **Select**, **Crop**, **Edit**, **Refresh**, and **Remove** actions
•	Automatically handles reloading the image to ensure the newest cropped version is displayed

## ❓ Troubleshooting

Error: There is no field with key “image_crop” registered…
If you see this error in the Sulu Admin, it usually means your Admin frontend build wasn’t run correctly. Please re-check the steps:

1. Execute npm install (and the npm install file:../../vendor/...) in the assets/admin folder.
2. Make sure you import 'sulu-smartlabsat-image-crop-bundle' in your app.js.
3. Finally, run npm run build.

## 📄 License

Licensed under the MIT license.
Feel free to use, modify, and distribute this software according to the terms of the license.

## Happy Cropping! ✂️
If you have any questions, feel free to open an issue or pull request!