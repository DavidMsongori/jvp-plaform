import React, { useMemo, useState } from "react";
import {
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "./EventGallery.css";

const EventGallery = ({ event }) => {
  const images = useMemo(() => {
    if (!event?.gallery?.length) return [];

    return [...event.gallery].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;

      return (a.displayOrder || 0) - (b.displayOrder || 0);
    });
  }, [event]);

  const [selectedIndex, setSelectedIndex] = useState(null);

  if (!images.length) return null;

  const currentImage =
    selectedIndex !== null
      ? images[selectedIndex]
      : null;

  const closeViewer = () => setSelectedIndex(null);

  const previousImage = () =>
    setSelectedIndex((prev) =>
      prev === 0
        ? images.length - 1
        : prev - 1
    );

  const nextImage = () =>
    setSelectedIndex((prev) =>
      prev === images.length - 1
        ? 0
        : prev + 1
    );

  return (
    <>
      <section className="event-gallery">

        <div className="gallery-header">

          <h2>Event Gallery</h2>

          <p>
            Explore highlights, moments and memories from this event.
          </p>

        </div>

        <div className="gallery-grid">

          {images.map((image, index) => (

            <div
              className="gallery-item"
              key={image._id || index}
              onClick={() => setSelectedIndex(index)}
            >

              {image.featured && (
                <span className="gallery-featured">
                  Featured
                </span>
              )}

              <img
                src={image.url}
                alt={
                  image.alt ||
                  image.title ||
                  "Event Gallery"
                }
                loading="lazy"
              />

              <div className="gallery-overlay">

                <ImageIcon size={20} />

                <div>

                  {image.title && (
                    <h4>{image.title}</h4>
                  )}

                  {image.caption && (
                    <p>{image.caption}</p>
                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {currentImage && (

        <div
          className="gallery-lightbox"
          onClick={closeViewer}
        >

          <button
            className="gallery-close"
            onClick={closeViewer}
          >
            <X size={24} />
          </button>

          {images.length > 1 && (

            <>
              <button
                className="gallery-nav left"
                onClick={(e) => {
                  e.stopPropagation();
                  previousImage();
                }}
              >
                <ChevronLeft size={28} />
              </button>

              <button
                className="gallery-nav right"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight size={28} />
              </button>
            </>

          )}

          <div
            className="gallery-preview"
            onClick={(e) => e.stopPropagation()}
          >

            <img
              src={currentImage.url}
              alt={
                currentImage.alt ||
                currentImage.title
              }
            />

            {(currentImage.title ||
              currentImage.caption) && (

              <div className="gallery-preview-info">

                {currentImage.title && (
                  <h3>{currentImage.title}</h3>
                )}

                {currentImage.caption && (
                  <p>{currentImage.caption}</p>
                )}

              </div>

            )}

          </div>

        </div>

      )}
    </>
  );
};

export default EventGallery;