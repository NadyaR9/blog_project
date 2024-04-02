const { Project, SyntaxKind } = require('ts-morph');

const removedFeature = process.argv[2];
if (!removedFeature) {
  throw new Error('Укажите название feature флага');
}
const removedOption = process.argv[3];
if (!removedOption) {
  throw new Error('Укажите состояние feature флага (on/off)');
}

if (removedOption !== 'on' && removedOption !== 'off') {
  throw new Error('Вы указали недопустимое состояние feature флага, допустимые состояние - on/off');
}

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.tsx');
project.addSourceFilesAtPaths('src/**/*.ts');


const files = project.getSourceFiles();


function isToggleFunction(node) {
  let isToggleFunction = false;
  node.forEachChild((children) => {
    if (children.isKind(SyntaxKind.Identifier) && children.getText() === 'toggleFeatures') {
      isToggleFunction = true;
    }
  });
  return isToggleFunction;
}

files.forEach((file) => {
  file.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      const toggleFunctionOptions = node.getFirstChildByKind(SyntaxKind.ObjectLiteralExpression);
      if (!toggleFunctionOptions) return;
      const nameProperty = toggleFunctionOptions.getProperty('name');
      const onProperty = toggleFunctionOptions.getProperty('on');
      const offProperty = toggleFunctionOptions.getProperty('off');
      const nameValue = nameProperty.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        .getText()
        .slice(1, -1);
      const onFunction = onProperty.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
      const offFunction = offProperty.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
  
      if (nameValue !== removedFeature) return;
      if (removedOption === 'on') {
        node.replaceWithText(onFunction.getBody().getText() ?? '');
      }
      if (removedOption === 'off') {
        node.replaceWithText(offFunction.getBody().getText() ?? '');
      }
    }
  })
})

project.save();