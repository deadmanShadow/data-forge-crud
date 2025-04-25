import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

// create a new docs
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

// list all docs
async function fetchAllDataForge() {
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

// get a single document by id
async function fetchDataForgeById(id: string) {
  try {
    const document = await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DBID as string,
      "dataforge",
      id
    );
    return document;
  } catch (error) {
    console.error("Error fetching document by ID:", error);
    throw new Error();
  }
}

// delete a document by id
async function deleteDataForgeById(id: string) {
  try {
    await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DBID as string,
      "dataforge",
      id
    );
  } catch (error) {
    console.error("Error deleting document:", error);
    throw new Error();
  }
}

// post data
export async function POST(req: Request) {
  try {
    const { term, dataforge } = await req.json();
    await createDataForge({ term, dataforge });
    return NextResponse.json({ message: "Data created successfully" });
  } catch {
    return NextResponse.json({ error: "Error creating data" }, { status: 500 });
  }
}

// get list all
export async function GET() {
  try {
    const dataforge = await fetchAllDataForge();
    return NextResponse.json(dataforge);
  } catch {
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}

// fetch by id
export async function GET_BY_ID(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const document = await fetchDataForgeById(params.id);
    return NextResponse.json(document);
  } catch {
    return NextResponse.json(
      { error: "Error fetching document" },
      { status: 500 }
    );
  }
}

// delete an id
export async function DELETE_BY_ID(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteDataForgeById(params.id);
    return NextResponse.json({ message: "Document deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Error deleting document" },
      { status: 500 }
    );
  }
}
