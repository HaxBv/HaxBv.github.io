import { useEffect, useRef, useState } from 'react';
import { PixelSprite } from '../ui/PixelSprite';
import styles from './MediaGallery.module.css';

function MediaPlaceholder({ dialog = false, item }) {
  return (
    <div className={`${styles.placeholder} ${dialog ? styles.dialogPlaceholder : ''}`}>
      <span aria-hidden="true" className={styles.placeholderGrid} />
      <span aria-hidden="true" className={styles.placeholderIcon}>
        <PixelSprite variant="image" />
      </span>
      <span className={styles.placeholderCategory}>{item.category}</span>
      <span className={styles.placeholderLabel}>{item.label}</span>
      <span className={styles.placeholderNote}>Media pending</span>
    </div>
  );
}

export function MediaGallery({ project }) {
  const items = project.gallery;
  const [activeIndex, setActiveIndex] = useState(null);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const lastTriggerRef = useRef(null);
  const activeItem = activeIndex === null ? null : items[activeIndex];
  const pendingCount = items.filter((item) => !item.src).length;

  useEffect(() => {
    if (activeIndex === null) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (activeIndex !== null && !dialog.open) {
      dialog.showModal();
      closeButtonRef.current?.focus();
    } else if (activeIndex === null && dialog.open) {
      dialog.close();
    }
  }, [activeIndex]);

  function openMedia(event, index) {
    lastTriggerRef.current = event.currentTarget;
    setActiveIndex(index);
  }

  function closeMedia() {
    dialogRef.current?.close();
  }

  function handleClose() {
    setActiveIndex(null);
    lastTriggerRef.current?.focus();
  }

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % items.length);
  }

  function handleDialogClick(event) {
    if (event.target === event.currentTarget) {
      closeMedia();
    }
  }

  function handleDialogKeyDown(event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPrevious();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNext();
    }
  }

  return (
    <div className={styles.gallery} data-frame={project.theme.frameVariant}>
      <div className={styles.grid}>
        {items.map((item, index) => (
          <button
            aria-label={`Open ${item.label} in the media viewer`}
            className={`${styles.item} ${item.span === 'wide' ? styles.itemWide : ''}`}
            key={item.id}
            onClick={(event) => openMedia(event, index)}
            type="button"
          >
            <span className={styles.thumbMedia} style={{ aspectRatio: item.aspect }}>
              {item.src ? (
                <img
                  alt={item.alt || item.label}
                  className={styles.thumbImage}
                  loading="lazy"
                  src={item.src}
                />
              ) : (
                <MediaPlaceholder item={item} />
              )}
              <span aria-hidden="true" className={styles.itemIndex}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span aria-hidden="true" className={styles.openHint}>
                Open
              </span>
            </span>
            <span className={styles.itemMeta}>
              <span className={styles.itemCategory}>{item.category}</span>
              <span aria-hidden="true" className={styles.itemArrow}>
                ↗
              </span>
            </span>
            <span className={styles.itemLabel}>{item.label}</span>
          </button>
        ))}
      </div>

      {pendingCount ? (
        <p className={styles.galleryNote}>
          <PixelSprite variant="image" />
          {pendingCount === 1
            ? 'One media slot is reserved for final artwork or gameplay capture.'
            : `${pendingCount} media slots are reserved for final artwork or gameplay capture.`}
        </p>
      ) : null}

      <dialog
        aria-labelledby={activeItem ? 'media-lightbox-title' : undefined}
        className={styles.dialog}
        onClick={handleDialogClick}
        onClose={handleClose}
        onKeyDown={handleDialogKeyDown}
        ref={dialogRef}
      >
        {activeItem ? (
          <div className={styles.dialogInner}>
            <header className={styles.dialogTop}>
              <div className={styles.dialogHeading}>
                <span className={styles.dialogKicker}>
                  {String(activeIndex + 1).padStart(2, '0')} /{' '}
                  {String(items.length).padStart(2, '0')} · {activeItem.category}
                </span>
                <h2 id="media-lightbox-title">{activeItem.label}</h2>
              </div>
              <button
                aria-label="Close media viewer"
                className={styles.closeButton}
                onClick={closeMedia}
                ref={closeButtonRef}
                type="button"
              >
                <span aria-hidden="true">×</span>
              </button>
            </header>

            <div className={styles.dialogMedia}>
              {activeItem.src ? (
                <img
                  alt={activeItem.alt || activeItem.label}
                  className={styles.dialogImage}
                  src={activeItem.src}
                />
              ) : (
                <MediaPlaceholder dialog item={activeItem} />
              )}
            </div>

            <footer className={styles.dialogFooter}>
              <p className={activeItem.caption ? styles.caption : styles.pendingCaption}>
                {activeItem.caption ||
                  'This media slot is reserved for final artwork or gameplay capture.'}
              </p>
              <div className={styles.dialogNav}>
                <button className={styles.navButton} onClick={showPrevious} type="button">
                  <span aria-hidden="true">←</span> Previous
                </button>
                <button className={styles.navButton} onClick={showNext} type="button">
                  Next <span aria-hidden="true">→</span>
                </button>
              </div>
            </footer>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
