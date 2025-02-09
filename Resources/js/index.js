// @flow
import {initializer} from 'sulu-admin-bundle/services';
import {fieldRegistry} from 'sulu-admin-bundle/containers';
import ImageCropContentType from "./ImageCropContentType";


initializer.addUpdateConfigHook('sulu-smartlabsat-image-crop-bundle', (config: Object, initialized: boolean) => {
  if (initialized) {
    return;
  }
  fieldRegistry.add('image_crop', ImageCropContentType);
});