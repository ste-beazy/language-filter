export const constructQuery = (query: any) => {
	const { username, language } = query
	if (!username || !language) return

	let languageQuery = ''
	const isString = typeof language === 'string'
	if (!isString && language.length > 1) {
		language.forEach((lang: string, index: number) => {
				if (index === 0) {
						languageQuery = `language:${lang}`
						return
				}
				languageQuery += `&language:${lang}`
		})
	} else {
			languageQuery = `language:${language}`
	}
	return `${username}+${languageQuery}`
}
