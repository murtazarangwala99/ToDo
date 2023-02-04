import { Client, Account, Databases } from "appwrite";

const client = new Client();

client.setEndpoint("http://localhost/v1").setProject("63d137247259966e5ef4");

export const account = new Account(client);

// Database

export const databases = new Databases(client, "63d13793a153ac2f045a");
