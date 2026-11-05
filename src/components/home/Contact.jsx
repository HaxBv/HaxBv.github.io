import { site } from '../../data/site';
import { PixelButton } from '../ui/PixelButton';
import { PixelSprite } from '../ui/PixelSprite';
import { SectionHeading } from '../ui/SectionHeading';
import styles from './Contact.module.css';

export function Contact() {
  const { contact } = site;
  const hasContact = Boolean(contact.email) || contact.links.length > 0;

  return (
    <section aria-labelledby="contact-title" className="section" id="contact">
      <div className={`${styles.inner} container`}>
        <div className={styles.copy}>
          <SectionHeading
            index="04"
            label="Connect"
            title="Let's make something playable."
          >
            {contact.heading}
          </SectionHeading>

          <p className={styles.body}>{contact.body}</p>

          {hasContact ? (
            <div className={styles.actions}>
              {contact.email ? (
                <PixelButton href={`mailto:${contact.email}`}>Send a message</PixelButton>
              ) : null}

              {contact.links.map((link) => (
                <PixelButton href={link.href} key={link.href} variant="secondary">
                  {link.label}
                </PixelButton>
              ))}
            </div>
          ) : (
            <span className="pixelChip">Signal pending</span>
          )}
        </div>

        <div aria-hidden="true" className={styles.terminal}>
          <div className={styles.terminalHeader}>
            <span className={styles.terminalDot} />
            <span>contact_channel.exe</span>
            <span>LOCAL</span>
          </div>

          <div className={styles.terminalBody}>
            <p>
              <span>&gt;</span> scan contact channels
            </p>
            <p>
              <span>&gt;</span> status: <em>being configured</em>
            </p>
            <p>
              <span>&gt;</span> email: [pending]
            </p>
            <p>
              <span>&gt;</span> links: [pending]
            </p>
            <p className={styles.prompt}>
              <span>&gt;</span> <span className={styles.cursor}>_</span>
            </p>
          </div>

          <div className={styles.terminalFooter}>
            <PixelSprite className={styles.terminalSprite} variant="heart" />
            <span>AWAITING SIGNAL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
