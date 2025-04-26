import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import { NextRequest, NextResponse } from "next/server";

const database = new Databases(client);

// fetch a specific data
async function fetchDataForge(id: string) {
  try {
    return await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DBID as string,
      "dataforge",
      id
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
}

// delete a specific data
async function deleteDataForge(id: string) {
  try {
    return await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DBID as string,
      "dataforge",
      id
    );
  } catch (error) {
    console.error("Error deleting data:", error);
    throw new Error("Failed to delete data");
  }
}

// update a specific data
async function updateDataForge(
  id: string,
  data: { term: string; dataforge: string }
) {
  try {
    return await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DBID as string,
      "dataforge",
      id,
      data
    );
  } catch (error) {
    console.error("Error updating data:", error);
    throw new Error("Failed to update data");
  }
}

// get by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const dataforge = await fetchDataForge(id);
    return NextResponse.json(dataforge);
  } catch (error: any) {
    console.error("GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
//delete by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await deleteDataForge(id);
    return NextResponse.json({ message: "Data deleted successfully" });
  } catch (error: any) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// update by id
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await req.json();
    await updateDataForge(id, body);
    return NextResponse.json({ message: "Data updated successfully" });
  } catch (error: any) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
