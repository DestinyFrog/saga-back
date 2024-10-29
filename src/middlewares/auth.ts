import jwt from 'jsonwebtoken'

export function checkAuthentication(req:any, res:any, next:any) {
	try {
		const token = req.cookies?.jwt
		if (!token)
			throw new Error("Not Logged")

		console.log("TOKEN:", token)

		var decoded = jwt.verify(token, process.env["SECRET"] as string)
		console.log("DECODED TOKEN:", decoded)
	} catch(err) {
		// throw err
	}

	next()
}