import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextRequest, NextResponse } from "next/server";

const database = new Databases(client);
function extractIdFromUrl(req: NextRequest): string | null {
  const segments = req.nextUrl.pathname.split("/");
  return segments[segments.length - 2] || null;
}

// create document
async function createDataForge(data: { term: string; dataforge: string }) {
  try {
    return await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DBID as string,
      "dataforge",
      ID.unique(),
      data
    );
  } catch (error) {
    console.error("Error creating data:", error);
    throw new Error("Failed to create data");
  }
}

// all documents
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
    throw new Error("Failed to fetch all documents");
  }
}

// fetch a single document
async function fetchDataForgeById(id: string) {
  try {
    return await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DBID as string,
      "dataforge",
      id
    );
  } catch (error) {
    console.error("Error fetching document by ID:", error);
    throw new Error("Failed to fetch document by ID");
  }
}

// delete a document
async function deleteDataForgeById(id: string) {
  try {
    return await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DBID as string,
      "dataforge",
      id
    );
  } catch (error) {
    console.error("Error deleting document:", error);
    throw new Error("Failed to delete document");
  }
}

// post create a doc
export async function POST(req: NextRequest) {
  try {
    const { term, dataforge } = await req.json();
    await createDataForge({ term, dataforge });
    return NextResponse.json({ message: "Data created successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// fetch all docs
export async function GET(req: NextRequest) {
  try {
    const dataforge = await fetchAllDataForge();
    return NextResponse.json(dataforge);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// get specific doc by id
export async function GET_BY_ID(req: NextRequest) {
  const id = extractIdFromUrl(req);
  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  try {
    const document = await fetchDataForgeById(id);
    return NextResponse.json(document);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// delete specific doc by id
export async function DELETE_BY_ID(req: NextRequest) {
  const id = extractIdFromUrl(req);
  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  try {
    await deleteDataForgeById(id);
    return NextResponse.json({ message: "Document deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
