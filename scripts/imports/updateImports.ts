import { Project } from 'ts-morph';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.tsx');
project.addSourceFilesAtPaths('src/**/*.ts');

const files = project.getSourceFiles();

const layers = ['app', 'pages', 'entites', 'features', 'widgets', 'shared'];

function isAbsolute(value: string) {
  return layers.some((layer) => value.startsWith(layer));
}

files.forEach((sourceFile) => {
  const importDeclarations = sourceFile.getImportDeclarations();
  importDeclarations.forEach((importSource) => {
    const value = importSource.getModuleSpecifierValue();
    if (isAbsolute(value)) {
      importSource.setModuleSpecifier(`@/${value}`);
    }
  });
});

project.save();
