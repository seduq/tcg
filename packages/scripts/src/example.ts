import { Resource } from "sst";
import { Example } from "@tcg/core/example";

console.log(`${Example.hello()} Linked to ${Resource.MyBucket.name}.`);
