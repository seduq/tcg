import { rds } from "./postgres";
import { bucket } from "./storage"
import { vpc } from "./vpc";

export const www = new sst.aws.Nextjs("Nextjs", {
  path: "./packages/www",  
  link: [rds, bucket],
  vpc
});

// export const www2 = new sst.aws.SvelteKit("Svelte", {
//   vpc: 
// })