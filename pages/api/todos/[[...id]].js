import clientPromise from "../../../lib/mongodb"
import { ObjectId } from "bson";

export default async (req, res) => {
    const {
        query: { id },
        method,
    } = req;
    const client = await clientPromise
    const db = client.db("todo")
    const collection = db.collection("todos")
    let result, todo;

    switch (method) {
        case 'POST':
            const { newTodoTitle } = JSON.parse(req.body);
            result = await collection.insertOne({
                title: newTodoTitle,
                completed: false,
            });
            if (result['acknowledged'] == true) {
                res.status(200).json({
                    _id: result['insertedId'],
                    title: newTodoTitle,
                    completed: false,
                });
            } else {
                res.status(500).json({ message: 'ERR!' });
            }
            break;

    }
};