const Skeleton = () => {
  return (
    <article className="event-card event-card--skeleton">

      {/* Image */}
      <div className="event-skeleton__image" />

      <div className="event-card__body">

        {/* Category */}
        <div className="event-skeleton__badge" />

        {/* Title */}
        <div className="event-skeleton__title" />
        <div className="event-skeleton__title event-skeleton__title--short" />

        {/* Summary */}
        <div className="event-skeleton__text" />
        <div className="event-skeleton__text" />
        <div className="event-skeleton__text event-skeleton__text--short" />

        {/* Meta */}
        <div className="event-skeleton__meta" />
        <div className="event-skeleton__meta" />
        <div className="event-skeleton__meta event-skeleton__meta--short" />

        {/* Footer */}
        <div className="event-card__footer">

          <div>
            <div className="event-skeleton__price" />
            <div className="event-skeleton__capacity" />
          </div>

          <div className="event-skeleton__status" />

        </div>

        {/* Button */}
        <div className="event-skeleton__button" />

      </div>

    </article>
  );
};

export default Skeleton;