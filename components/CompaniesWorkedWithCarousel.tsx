import React, { useMemo, useState } from "react";

type LogoRecord = {
  src: string;
  alt: string;
  key: string;
  sortLabel: string;
};

const stripFileExtension = (name: string) => name.replace(/\.[a-z0-9]+$/i, "");

const toTitleCase = (value: string) =>
  value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

const filenameToAlt = (filename: string) => {
  const noExt = stripFileExtension(filename);
  const cleaned = noExt
    .replace(/[_-]+/g, " ")
    .replace(/\bgs\b/gi, "")
    .replace(/\d+/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return toTitleCase(cleaned || "Company Logo");
};

const logoModules = import.meta.glob("../content/brands logos/*.{png,jpg,jpeg,svg,webp,avif,gif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const alphabeticalSort = new Intl.Collator(undefined, { sensitivity: "base", numeric: true });

const logos: LogoRecord[] = Object.entries(logoModules)
  .map(([path, src]) => {
    const filename = path.split("/").pop() ?? "";

    const alt = filenameToAlt(filename);

    return {
      src,
      alt,
      key: path,
      sortLabel: alt.toLowerCase(),
    };
  })
  .sort((a, b) => alphabeticalSort.compare(a.sortLabel, b.sortLabel) || alphabeticalSort.compare(a.key, b.key));

const CompanyLogo: React.FC<{ logo: LogoRecord }> = ({ logo }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return null;
  }

  return (
    <li className="companies-carousel__item" aria-label={logo.alt}>
      <img
        src={logo.src}
        alt={logo.alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="companies-carousel__logo"
      />
    </li>
  );
};

const CompaniesWorkedWithCarousel: React.FC = () => {
  const carouselLogos = useMemo(() => logos, []);

  if (!carouselLogos.length) {
    return null;
  }

  return (
    <section className="mt-14 py-12 sm:py-16" aria-label="Companies I've Worked With">
      <h3 className="text-2xl font-extrabold mb-4">Companies I&apos;ve Worked With</h3>
      <div className="companies-carousel" role="region" aria-label="Scrolling company logos">
        <div className="companies-carousel__track">
          {[0, 1].map((copyIdx) => (
            <ul key={copyIdx} className="companies-carousel__row" aria-hidden={copyIdx === 1}>
              {carouselLogos.map((logo) => (
                <CompanyLogo key={`${copyIdx}-${logo.key}`} logo={logo} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesWorkedWithCarousel;
