import jwt from "jsonwebtoken";

const secretKey = "your-secret-key";

export const createToken = (payload) => {
	return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

export const verifyToken = (token) => {
	try {
		return jwt.verify(token, secretKey);
	} catch (error) {
		return null;
	}
};
