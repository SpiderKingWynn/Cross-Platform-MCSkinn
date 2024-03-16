import {
    createDir,
    exists,
    readTextFile,
    writeTextFile,
  } from "@tauri-apps/api/fs";
  import { meta } from ".";
  import { Theme } from "./theme";
  
  const configStore = {
    firstsetting: "NaN",
    language: "en-US",
    theme: "follow" as Theme,
    async load() {
      if (await exists(meta.configFile)) {
        const data = JSON.parse(await readTextFile(meta.configFile));
        Object.assign(configStore, data);
      } else {
        // create the directory if not exist
        await createDir(meta.appDataDir);
      }
    },
    async save() {
      await writeTextFile(meta.configFile, JSON.stringify(this));
    },
    saveAsync() {
      this.save().then().catch;
    },
  };
  export const cfg = new Proxy(configStore, {
    set(target, p, newValue, receiver) {
      Reflect.set(target, p, newValue, receiver);
      // auto save on every set action
      configStore.saveAsync();
      return true;
    },
});  