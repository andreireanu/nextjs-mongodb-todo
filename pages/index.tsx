import Head from 'next/head'
import { useState } from 'react'
import clientPromise from '../lib/mongodb'
import { InferGetServerSidePropsType } from 'next'

import "tailwindcss/tailwind.css"
import NewTodoForm from '../components/NewTodoForm'

export async function getServerSideProps(context: any) {
  try {
    // await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    const client = await clientPromise
    const db = client.db("todo")
    const collection = db.collection("todos")

    const todos = await collection.find({}).toArray()
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true, todos: JSON.parse(JSON.stringify(todos)) },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default function Home({
  isConnected,
  todos
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [allTodos, setAllTodos] = useState(todos || [])

  return (
    <div className="container">
      <Head>
        <title>Mongo DB Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container bg-white rounded shadow p-6 m-4 w-full lg:w-3/4">
        <h1 className="text-2xl font-bold text-grey-darkest">
          Todo App
        </h1>
        {isConnected ? (
          <>
            <h2 className="text-green-600 pt-4">
              Connected to DB
            </h2>
            <NewTodoForm setAllTodos={setAllTodos} /> 
            <ul className="pt-8">
              {
                allTodos.map((todo: any) => (
                <li key={todo._id}>
                  {todo.title}
                </li>
              ))
              }
            </ul>
          </>
        ) : (
            <h2 className="text-red-600 pt-4">
              Not Connected to DB
          </h2>
        )}
      </main>
    </div>
  )
}
