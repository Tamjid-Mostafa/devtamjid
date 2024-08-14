import { dataset, projectId } from "@/lib/sanity/config";
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: projectId,
    dataset: dataset
  }
});
