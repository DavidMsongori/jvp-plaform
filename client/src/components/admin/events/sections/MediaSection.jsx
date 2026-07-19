import {
  ImagePlus,
  UploadCloud,
  Trash2,
  Images,
} from "lucide-react";

const MediaSection = ({
  coverImage,
  gallery,
  onCoverImageChange,
  onGalleryChange,
}) => {
  const isImage = (file) =>
    file.type.startsWith("image/");

  /* ==========================================
     COVER IMAGE
  ========================================== */

  const handleCoverUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file || !isImage(file)) return;

    onCoverImageChange({
      file,
      preview: URL.createObjectURL(file),
      alt: file.name,
    });
  };

  const removeCover = () => {
    onCoverImageChange({
      file: null,
      preview: "",
      alt: "",
    });
  };

  /* ==========================================
     GALLERY
  ========================================== */

  const handleGalleryUpload = (e) => {
    const files = Array.from(
      e.target.files || []
    ).filter(isImage);

    if (!files.length) return;

    const images = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      alt: file.name,
    }));

    onGalleryChange([
      ...gallery,
      ...images,
    ]);
  };

  const removeGalleryImage = (index) => {
    onGalleryChange(
      gallery.filter(
        (_, i) => i !== index
      )
    );
  };

  return (
    <section className="event-section">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="section-header">

        <div className="section-title">

          <ImagePlus size={20} />

          <div>

            <h2>Media</h2>

            <p>
              Upload a cover image and
              optional gallery images for
              this event.
            </p>

          </div>

        </div>

      </div>

      {/* ======================================
          COVER IMAGE
      ====================================== */}

      <div className="form-group">

        <label>
          Cover Image
        </label>

        {!coverImage?.preview ? (
          <label className="upload-area">

            <UploadCloud size={36} />

            <h4>
              Upload Cover Image
            </h4>

            <p>
              Click to choose an image
            </p>

            <small>
              JPG, PNG or WEBP
            </small>

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={
                handleCoverUpload
              }
            />

          </label>
        ) : (
          <div className="cover-preview-card">

            <img
              src={coverImage.preview}
              alt={
                coverImage.alt ||
                "Cover Image"
              }
            />

            <div className="image-actions">

              <label className="btn btn-outline">

                Replace

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={
                    handleCoverUpload
                  }
                />

              </label>

              <button
                type="button"
                className="btn btn-danger"
                onClick={removeCover}
              >
                <Trash2 size={16} />

                Remove

              </button>

            </div>

          </div>
        )}

      </div>

      {/* ======================================
          GALLERY
      ====================================== */}

      <div className="form-group">

        <label>

          <Images size={16} />

          Gallery Images

        </label>

        <label className="upload-area small">

          <UploadCloud size={28} />

          <p>
            Add gallery images
          </p>

          <small>
            You can upload multiple
            images.
          </small>

          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={
              handleGalleryUpload
            }
          />

        </label>

      </div>

      {/* ======================================
          GALLERY PREVIEW
      ====================================== */}

      {gallery.length > 0 && (

        <>

          <div className="gallery-header">

            <h4>
              Gallery
            </h4>

            <span>
              {gallery.length} image
              {gallery.length !== 1
                ? "s"
                : ""}
            </span>

          </div>

          <div className="gallery-grid">

            {gallery.map(
              (image, index) => (

                <div
                  className="gallery-item"
                  key={index}
                >

                  <img
                    src={image.preview}
                    alt={image.alt}
                  />

                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() =>
                      removeGalleryImage(
                        index
                      )
                    }
                  >
                    <Trash2
                      size={16}
                    />
                  </button>

                </div>

              )
            )}

          </div>

        </>

      )}

    </section>
  );
};

export default MediaSection;