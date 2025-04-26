import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextRequest, NextResponse } from "next/server";

const database = new Databases(client);

function extractIdFromUrl(req: NextRequest): string | null {
  const segments = req.nextUrl.pathname.split("/");
  return segments[segments.length - 1] || null;
}

// Create a new document
async function createDataForge(data: { term: string; dataforge: string }) {
  try {
    const response = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DBID as string,
      "dataforge",
      ID.unique(),
      data
    );
    return response;
  } catch (error: any) {
    console.error("Error creating data:", error);
    throw new Error("Failed to create data");
  }
}

// Fetch all documents
async function fetchAllDataForge() {
  try {
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DBID as string,
      "dataforge",
      [Query.orderDesc("$createdAt")]
    );
    return response.documents;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch all documents");
  }
}

// Fetch a specific document by ID
async function fetchDataForgeById(id: string) {
  try {
    const document = await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DBID as string,
      "dataforge",
      id
    );
    return document;
  } catch (error: any) {
    console.error("Error fetching document by ID:", error);
    if (error.code === 404) {
      throw new Error("Document not found");
    }
    throw new Error("Failed to fetch document by ID");
  }
}

// Delete a specific document by ID
async function deleteDataForgeById(id: string) {
  try {
    await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DBID as string,
      "dataforge",
      id
    );
  } catch (error: any) {
    console.error("Error deleting document:", error);
    throw new Error("Failed to delete document");
  }
}

// POST request handler (create a new document)
export async function POST(req: NextRequest) {
  try {
    const { term, dataforge } = await req.json();
    await createDataForge({ term, dataforge });
    return NextResponse.json({ message: "Data created successfully" });
  } catch (error: any) {
    console.error("POST request failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET request handler (fetch all documents or a specific document by ID)
export async function GET(req: NextRequest) {
  try {
    // Check if there's an ID in the URL
    const id = extractIdFromUrl(req);

    if (id && id !== "dataforge") {
      // If ID is present and not just the base endpoint, fetch specific document
      const document = await fetchDataForgeById(id);
      return NextResponse.json(document);
    } else {
      // Otherwise, fetch all documents
      const dataforge = await fetchAllDataForge();
      return NextResponse.json(dataforge);
    }
  } catch (error: any) {
    console.error("GET request failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE request handler
export async function DELETE(req: NextRequest) {
  try {
    const id = extractIdFromUrl(req);
    if (!id || id === "dataforge") {
      return NextResponse.json({ error: "Missing ID in URL" }, { status: 400 });
    }

    await deleteDataForgeById(id);
    return NextResponse.json({ message: "Document deleted successfully" });
  } catch (error: any) {
    console.error("DELETE request failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
