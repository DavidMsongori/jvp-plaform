import { ImagePlus } from "lucide-react";

const MediaSection = ({
  coverImage,
  gallery,
  onCoverImageChange,
  onGalleryChange,
}) => {
  const handleCoverUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    onCoverImageChange({
      file,
      preview: URL.createObjectURL(file),
      alt: file.name,
    });
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(
      e.target.files
    );

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

      <div className="section-header">

        <ImagePlus size={20} />

        <div>

          <h2>Media</h2>

          <p>
            Upload a cover image and
            gallery images.
          </p>

        </div>

      </div>

      {/* Cover */}

      <div className="form-group">

        <label>

          Cover Image

        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleCoverUpload}
        />

        {coverImage?.preview && (

          <div className="cover-preview">

            <img
              src={coverImage.preview}
              alt={
                coverImage.alt ||
                "Cover"
              }
            />

          </div>

        )}

      </div>

      {/* Gallery */}

      <div className="form-group">

        <label>

          Gallery Images

        </label>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={
            handleGalleryUpload
          }
        />

      </div>

      {gallery.length > 0 && (

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
                  ×
                </button>

              </div>

            )
          )}

        </div>

      )}

    </section>
  );
};

export default MediaSection;