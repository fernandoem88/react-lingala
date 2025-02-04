import type { ContentDetails } from "./parseFileDetails";


export const createFileTextFromContentEntries = (contentEntries: ContentDetails[], lang: string) => {
  const autoGenerated = "// auto generated file";
  const importSection = contentEntries
    .map(({ key, relativePath }) => {
      return `import ${key} from "${relativePath}";`;
    })
    .join("\n");

  const translations = contentEntries
    .map(({ key }) => `  ...${key},`)
    .join("\n");

  const langKey = lang.replace(/\-/, "_");

  const exportSection = [
    `const ${langKey}Translations = {`,
    translations,
    "};",
    "",
    `export default ${langKey}Translations;`,
  ].join("\n");

  const fileText = [autoGenerated, "", importSection, "", exportSection];

  return fileText.join("\n");
};

