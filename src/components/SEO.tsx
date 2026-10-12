import { useEffect } from "react";

type SEOProps = {
  title: string;
  description: string;
};

export default function SEO({ title, description }: SEOProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (
      attribute: "name" | "property",
      key: string,
      content: string
    ) => {
      let element = document.head.querySelector(
        `meta[${attribute}="${key}"]`
      ) as HTMLMetaElement | null;

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    const setLink = (
      rel: string,
      href: string
    ) => {
      let element = document.head.querySelector(
        `link[rel="${rel}"]`
      ) as HTMLLinkElement | null;

      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }

      element.setAttribute("href", href);
    };

    const canonicalUrl =
      window.location.origin +
      (window.location.pathname === "/"
        ? "/"
        : window.location.pathname);

    // Basic SEO
    setMeta("name", "description", description);
    setMeta(
      "name",
      "robots",
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:site_name", "Indian Utility Hub");
    setMeta("property", "og:locale", "en_IN");

    // Twitter / X
    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    // Canonical
    setLink("canonical", canonicalUrl);
  }, [title, description]);

  return null;
}