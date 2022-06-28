const readingTime = (content: string): number => {
	const wordsPerMinute = 200;
	const contentString = JSON.stringify(content);
	const words = contentString.split(' ').length;

	//   let minutes = 0;
	//   minutes = Math.ceil(words / wordsPerMinute);
	return Math.ceil(words / wordsPerMinute);
};

const timeHumans = (date: string, locale = 'es'): string => {
	// const options  = { year: 'numeric', month: 'long', day: 'numeric' }
	// return new Date(date).toLocaleDateString('en', options)
	return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(date));
};

export { readingTime, timeHumans };
