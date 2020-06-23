import express from 'express'

import Api from './github/github-api'
import { constructQuery } from './helpers/query-helper'

const app = express()

app.get('/', async (req, res) => {
	const { language, username } = req.query

	if ((!language || !username) || !language.length) {
		return res.status(400).send({ error: 'Missing query parameters.' })
	}

	const queryParams = constructQuery({ language, username })
	try {
			const users = await Api.fetchUsers(queryParams)
			console.log({ users })
			if (!users) {
					return res.status(404).send({ message: 'Sorry, no users were found that matched your search.' })
			}
			res.send({ users })
	} catch (e) {
			res.status(400).send({ message: 'Something went wrong', error: {...e} })
	}
})

const server = app.listen(8080)

export default server

process.on('SIGINT', () => process.exit(0))
