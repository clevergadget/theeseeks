# Textgenerierung | Gemini API | Google AI for Developers

## Top Level HTML Structure
**Intent:** Provides the basic HTML framework for a webpage, including metadata, stylesheets, and script loading.
**Peek:** `<!doctype html><html lang="de-x-mtfrom-en" dir="ltr"><head> ... </head><body ...> ... </body></html>` Contains meta tags for Google Sign-In, viewport settings, character set, and theme color. Links to CSS stylesheets including a dark theme variant. Specifies canonical URL and alternate language versions. Sets the page title and meta description. Contains JSON-LD for schema.org markup. Includes a skip-link and sections for header, book navigation, main content, footer promos, footer linkboxes, and footer utility links. Loads the devsite app loader script.
**Pointer:** Start of file

## devsite-header
**Intent:** Renders the site header, including logo, search, language selector, and links to external resources.
**Peek:**  `<devsite-header role="banner" keep-tabs-visible>` Contains nested components for logo, search bar, appearance selector, language selector, and calls to action like "API-Schlüssel abrufen" and "Community". It also includes tabs for navigation (Gemini API-Dokumentation, API-Referenz).
**Pointer:** `<devsite-header role="banner" keep-tabs-visible>`

## devsite-book-nav
**Intent:** Implements the side navigation for the Gemini API documentation.
**Peek:** `<devsite-book-nav scrollbars > ... </devsite-book-nav>`  Includes a filter and a comprehensive list of links to documentation sections, models, functions, tools, guides and resources, e.g., "Text", "Bildgenerierung", "Funktionsaufrufe", and "Versionshinweise."
**Pointer:** `<devsite-book-nav scrollbars >`

## devsite-content
**Intent:** Contains the main content of the page, including the article about text generation.
**Peek:** `<devsite-content> ... <article class="devsite-article"> ... </article> ... </devsite-content>` It starts with an announcement banner about Gemini 3, followed by breadcrumbs, a title ("Textgenerierung"), the article body, feedback and sharing options.
**Pointer:** `<devsite-content>`

## Textgenerierung Content (Inside `devsite-content` > `article`)
**Intent:** Explains how to generate text using Gemini API models.
**Peek:** Introduction mentioning text outputs from various inputs like text, images, videos, and audio. Includes code examples in Python, JavaScript, Go, Java, REST, and Apps Script to demonstrate text generation. Covers topics like logical reasoning with Gemini 2.5 (thinking budgets), system instructions, configuration parameters, multimodal inputs (text and images), streaming responses, and multi-turn conversations (chat). Provides a link to the Google AI Studio Colab notebook
**Pointer:** `<h1 class="devsite-page-title" tabindex="-1">Textgenerierung`

## devsite-content-footer
**Intent:** Renders the standard footer with copyright, licensing information, and last updated date.
**Peek:** `<devsite-content-footer class="nocontent">` Contains licensing details, a link to Google Developers Site Policies, and a timestamp for the last content update.
**Pointer:** `<devsite-content-footer class="nocontent">`

## devsite-footer-utility
**Intent:** Renders the footer utility links.
**Peek:** `<div class="devsite-footer-utility nocontent">` Includes links to Google's Terms of Service and Privacy Policy, and a language selector.
**Pointer:** `<div class="devsite-footer-utility nocontent">`
