import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

//fetch a specific data

async function fetchDataForge(id: string) {
  try {
    const dataforge = await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DBID as string,
      "dataforge",
      id
    );
    return dataforge;
  } catch {
    console.error("Error fetching data:");
    throw new Error();
  }
}

// delete a specific data

async function deleteDataForge(id: string) {
  try {
    const response = await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DBID as string,
      "dataforge",
      id
    );
    return response;
  } catch {
    console.error("Error deleting data:");
    throw new Error();
  }
}

//update a specific data

async function updateDataForge(
  id: string,
  data: { term: string; dataforge: string }
) {
  try {
    const response = await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DBID as string,
      "dataforge",
      id,
      data
    );
    return response;
  } catch {
    console.error("Error deleting data:");
    throw new Error();
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const dataforge = await fetchDataForge(id);
    return NextResponse.json(dataforge);
  } catch {
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await deleteDataForge(id);
    return NextResponse.json({ message: "Data deleted successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const dataforge = await req.json();
    await updateDataForge(id, dataforge);
    return NextResponse.json({ message: "Data updated successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
