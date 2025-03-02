import { connect, connection, ConnectionStates, disconnect } from "mongoose";

// Hardcoded MongoDB URL
const MONGODB_URL = "mongodb+srv://exceptionshandler007:OnlyForAdmins007@cluster0.llah8.mongodb.net/home2nest?retryWrites=true&w=majority";

let isConnected = ConnectionStates.disconnected;

export const connectDB = async () => {
    if (isConnected) {
        console.log("Using existing database connection");
        return;
    }
    try {
        const db = await connect(MONGODB_URL);
        isConnected = db.connections[0].readyState;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw new Error("Failed to connect to MongoDB");
    }
};

export const disconnectDB = async () => {
    if (connection.readyState !== 0) {
        await disconnect();
        console.log("Database connection closed");
    }
};
