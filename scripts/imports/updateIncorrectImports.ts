import { Project } from 'ts-morph';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.tsx');
project.addSourceFilesAtPaths('src/**/*.ts');

const files = project.getSourceFiles();

const incorrect = 'entites';
const correct = 'entities';

files.forEach((sourceFile) => {
  const importDeclarations = sourceFile.getImportDeclarations();
  importDeclarations.forEach((importSource) => {
    const value = importSource.getModuleSpecifierValue();
    if (value.includes(incorrect)) {
      importSource.setModuleSpecifier(value.replace(incorrect, correct));
    }
  });
});

project.save();
