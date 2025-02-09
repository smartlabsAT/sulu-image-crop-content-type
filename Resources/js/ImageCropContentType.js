import React from 'react';
import { observer } from 'mobx-react';
import { action, observable, runInAction } from 'mobx';
import SingleSelectionStore from 'sulu-admin-bundle/stores/SingleSelectionStore';
import CropOverlay from 'sulu-media-bundle/containers/MediaVersionUpload/CropOverlay';
import Button from 'sulu-admin-bundle/components/Button';
import Icon from 'sulu-admin-bundle/components/Icon';
import SingleMediaSelectionOverlay from 'sulu-media-bundle/containers/SingleMediaSelectionOverlay';
import Tooltip from 'sulu-admin-bundle/components/Tooltip/Tooltip';

@observer
class ImageCropContentType extends React.Component {
  @observable overlayOpen = false;
  @observable showCropOverlay = false;

  constructor(props) {
    super(props);

    const { value = {}, formInspector, schemaOptions } = props;
    this.previewCropKey = schemaOptions?.previewCrop?.value;
    const mediaId = value.media?.id || null;

    this.singleSelectionStore = new SingleSelectionStore(
      'media',
      mediaId,
      formInspector?.locale
    );
  }

  componentDidUpdate(prevProps) {
    const oldId = prevProps.value?.media?.id || null;
    const newId = this.props.value?.media?.id || null;
    if (oldId !== newId) {
      this.singleSelectionStore.loadItem(newId);
    }
  }

  @action handleOpenOverlay = () => {
    this.overlayOpen = true;
  };

  @action handleCloseOverlay = () => {
    this.overlayOpen = false;
  };

  @action handleConfirmOverlay = (selectedMedia) => {
    this.singleSelectionStore.set(selectedMedia);

    const { value = {}, onChange } = this.props;
    onChange({
      ...value,
      media: selectedMedia || null,
    });

    this.overlayOpen = false;
  };

  @action handleRemoveImage = () => {
    const { value = {}, onChange } = this.props;
    // If no media is present, abort early
    if (!value.media) {
      return;
    }

    this.singleSelectionStore.clear();

    onChange({
      ...value,
      media: null,
    });
  };

  /**
   * Reloads the media:
   * Only if a media exists and loadItem is successful,
   * then removes and re-adds the media.
   */
  @action async reloadMedia() {
    const { value = {}, onChange } = this.props;

    const media = this.singleSelectionStore.item;
    if (!media?.id) {
      return;
    }

    // Load the media item
    try {
      await this.singleSelectionStore.loadItem(media.id);
    } catch (e) {
      return;
    }
    const updatedMedia = this.singleSelectionStore.item;
    if (!updatedMedia?.id) {
      // Possibly the media has been deleted meanwhile
      return;
    }

    // Prevent remove + re-add if no media exists in the value
    if (!value.media) {
      // Simply set it anew
      onChange({
        ...value,
        media: updatedMedia,
        lastCropVersion: Date.now().toString(),
      });
      return;
    }

    // Otherwise: remove and re-add
    onChange({ ...value, media: null });
    await Promise.resolve();

    onChange({
      ...value,
      media: updatedMedia,
      lastCropVersion: Date.now().toString(),
    });
  }

  @action handleOpenCrop = () => {
    const media = this.singleSelectionStore.item;
    if (!media?.id) {
      return;
    }
    this.showCropOverlay = true;
  };

  @action handleCloseCrop = () => {
    this.showCropOverlay = false;
  };

  @action handleConfirmCrop = async () => {
    const media = this.singleSelectionStore.item;
    if (!media?.id) {
      this.showCropOverlay = false;
      return;
    }

    try {
      await this.singleSelectionStore.loadItem(media.id);
    } catch (e) {
      runInAction(() => {
        this.showCropOverlay = false;
      });
      return;
    }

    runInAction(() => {
      this.showCropOverlay = false;
    });
    await this.reloadMedia();
  };

  @action handleOpenEdit = () => {
    const { item: media } = this.singleSelectionStore;
    const { formInspector } = this.props;

    if (!media?.id) {
      return;
    }

    const locale = formInspector?.locale?.get() || 'en';
    const editUrl = `/admin/#/media/${locale}/${media.id}/details`;
    window.open(editUrl, '_blank');
  };

  @action handleRefresh = async () => {
    await this.reloadMedia();
  };

  render() {
    const { formInspector } = this.props;
    const { item: media, loading } = this.singleSelectionStore;
    const hasMedia = !!media?.id;

    // Determine locale and define language-specific texts
    const locale = formInspector?.locale?.get() || 'en';
    const isEnglish = locale.toLowerCase() === 'en';

    const selectImageLabel = isEnglish ? 'Select Image' : 'Bild auswählen';
    const cropTooltipLabel = isEnglish ? 'Crop Image' : 'Bild zuschneiden';
    const editTooltipLabel = isEnglish ? 'Edit Image' : 'Bild bearbeiten';
    const refreshTooltipLabel = isEnglish ? 'Refresh Image' : 'Bild neu laden';
    const removeImageLabel = isEnglish ? 'Remove Image' : 'Bild entfernen';

    let imageSrc = media?.url;
    if (this.previewCropKey && media?.thumbnails?.[this.previewCropKey]) {
      imageSrc = media.thumbnails[this.previewCropKey];
    }

    return (
      <div
        style={{
          border: hasMedia ? '1px solid #ccc' : 'none',
          padding: hasMedia ? '1rem' : 0,
        }}
      >
        {!hasMedia && (
          <Button icon="su-image" onClick={this.handleOpenOverlay}>
            {selectImageLabel}
          </Button>
        )}

        {hasMedia && (
          <>
            <div
              style={{
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <p style={{ margin: 0 }}>
                <strong>{media.title}</strong>
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                }}
              >
                {/* Crop with tooltip */}
                <Tooltip label={cropTooltipLabel} aria-label={cropTooltipLabel}>
                  <Button skin="icon" size="small" onClick={this.handleOpenCrop}>
                    <Icon name="su-cut" />
                  </Button>
                </Tooltip>

                {/* Edit with tooltip */}
                <Tooltip label={editTooltipLabel} aria-label={editTooltipLabel}>
                  <Button skin="icon" size="small" onClick={this.handleOpenEdit}>
                    <Icon name="su-pen" />
                  </Button>
                </Tooltip>

                <Tooltip label={refreshTooltipLabel} aria-label={refreshTooltipLabel}>
                  <Button skin="icon" size="small" onClick={this.handleRefresh}>
                    <Icon name="su-sync" />
                  </Button>
                </Tooltip>
              </div>
            </div>

            {!loading && (
              <div style={{ marginBottom: '1rem' }}>
                <img
                  onClick={this.handleOpenOverlay}
                  src={imageSrc}
                  alt={media.title || ''}
                  style={{
                    maxWidth: '100%',
                    border: '1px solid #ccc',
                    cursor: 'pointer',
                  }}
                />
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button icon="su-trash-alt" onClick={this.handleRemoveImage}>
                {removeImageLabel}
              </Button>
            </div>
          </>
        )}

        <SingleMediaSelectionOverlay
          excludedIds={hasMedia ? [media.id] : []}
          locale={formInspector?.locale}
          onClose={this.handleCloseOverlay}
          onConfirm={this.handleConfirmOverlay}
          open={this.overlayOpen}
          types={['image']}
        />

        {hasMedia && this.showCropOverlay && (
          <CropOverlay
            id={media.id}
            image={media.adminUrl ? media.adminUrl : media.url}
            locale={formInspector?.locale?.get() || 'en'}
            onClose={this.handleCloseCrop}
            onConfirm={this.handleConfirmCrop}
            open={true}
          />
        )}
      </div>
    );
  }
}

export default ImageCropContentType;