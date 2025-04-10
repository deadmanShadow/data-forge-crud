import { Client } from "appwrite";
const client = new Client();
client.setProject(process.env.NEXT_PUBLIC_APPWRITE as string);
client.setEndpoint(process.env.NEXT_ENDPOINT_APPWRITE as string);
export default client;
