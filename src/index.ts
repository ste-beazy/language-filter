import express from 'express'

import Api from './github/github-api'
import { constructQuery, transformUser } from './helpers/'

const app = express()

app.get('/', async (req, res) => {
	const { language, username } = req.query

	if ((!language || !username) || !language.length) {
		return res.status(400).send({ error: 'Missing query parameters.' })
	}

	const queryParams = constructQuery({ language, username })
	try {
			const users = await Api.fetchUsers(queryParams)
			if (!users.length) {
					return res.status(404).send({ message: 'Sorry, no users were found that matched your search.' })
			}
			res.send(users.map((user: any)=> transformUser(user)))
	} catch (e) {
			res.status(500).send({
				message: 'Something went wrong',
				error: {...e}
			})
	}
})

const server = app.listen(8080)

export default server

process.on('SIGINT', () => process.exit(0))
