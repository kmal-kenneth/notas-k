import { strapiURL } from '$lib/env';

export function getStrapiMedia(url: string): string {
	// Check if URL is a local path
	if (url.startsWith('/')) {
		// Prepend Strapi address
		return `${strapiURL}${url}`;
	}
	// Otherwise return full URL
	return url;
}

export function getStrapiContentMedia(content: string): string {
	const mediasContent = content.split('/uploads/').join(`${strapiURL}/uploads/`);

	const temp = mediasContent.replace(/(!\[.*?\]\()(.+?)(\))/g, function (whole, a, b) {
		return `<CImage src="${b}" alt="${a.substring(2, a.length - 2)}"  />`;
	});

	return temp;
}
