import { Valkey } from "iovalkey";

export const valkey = new Valkey(process.env.VALKEY_URL!);
export const VALKEY_APP_ID = process.env.VALKEY_APP_ID! as string;
