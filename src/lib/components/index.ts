/**
 * Base components
 */
export { default as GridApp } from './grid.svelte'; // Grid for articles
export { default as ImageApp } from './img.svelte'; // Image powered by cloudinary
export { default as img } from './article/img .svelte'; // Image powered by cloudinary
export { default as LogoApp } from './logo.svelte'; // Logo for header of the app
export { default as PaginationApp } from './pagination.svelte'; // Pagination for articles and oter content
export { default as MetaApp } from './meta.svelte'; // Meta data for pages with (title, description, etc) and (og, twitter, etc)
export { default as ColorMode } from './color-mode.svelte'; // Color mode for dark mode
export { default as NavbarApp } from './navbar.svelte'; // Navbar for header of the app
export { default as LangSelector } from './lang_selector.svelte'; // Dropdown for header of the app

// export components for articles in article folder
export { default as CardArticle } from './article/card.svelte'; // Card for articles
export { default as PrimaryCardArticle } from './article/primary_card.svelte'; // Primary card for articles
export { default as HeaderArticle } from './article/header.svelte'; // Footer for articles
export { default as ArticleData } from './article/data.svelte'; // Footer for articles
