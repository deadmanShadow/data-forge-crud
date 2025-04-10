import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

// create data
async function createDataForge(data: { term: string; dataforge: string }) {
  try {
    const response = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DBID as string,
      "dataforge",
      ID.unique(),
      data
    );
    return response;
  } catch (error) {
    console.error("Error creating data:", error);
    throw new Error();
  }
}

// fetch data
async function fetchDataForge() {
  try {
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DBID as string,
      "dataforge",
      [Query.orderDesc("$createdAt")]
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error();
  }
}

export async function POST(req: Request) {
  try {
    const { term, dataforge } = await req.json();
    const data = { term, dataforge };
    const response = await createDataForge(data);
    return NextResponse.json({
      message: "Data created successfully",
    });
  } catch {
    return NextResponse.json(
      {
        error: "Error creating data",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const dataforge = await fetchDataForge();
    return NextResponse.json(dataforge);
  } catch {
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
