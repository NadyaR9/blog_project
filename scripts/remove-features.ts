import { JsxAttribute, Node, Project, SyntaxKind } from 'ts-morph';

const removedFeature = process.argv[2];
if (!removedFeature) {
  throw new Error('Укажите название feature флага');
}
const removedOption = process.argv[3];
if (!removedOption) {
  throw new Error('Укажите состояние feature флага (on/off)');
}

if (removedOption !== 'on' && removedOption !== 'off') {
  throw new Error(
    'Вы указали недопустимое состояние feature флага, допустимые состояние - on/off',
  );
}
const toggleFunctionName = 'toggleFeatures';
const toggleComponentName = 'ToggleFeature';
const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.tsx');
project.addSourceFilesAtPaths('src/**/*.ts');

const files = project.getSourceFiles();

function isToggleFunction(node: Node) {
  let isToggleFunction = false;
  node.forEachChild((children) => {
    if (
      children.isKind(SyntaxKind.Identifier) &&
      children.getText() === toggleFunctionName
    ) {
      isToggleFunction = true;
    }
  });
  return isToggleFunction;
}

function toggleCallExpression(node: Node) {
  const toggleFunctionOptions = node.getFirstChildByKind(
    SyntaxKind.ObjectLiteralExpression,
  );
  if (!toggleFunctionOptions) return;

  const nameProperty = toggleFunctionOptions.getProperty('name');
  const onProperty = toggleFunctionOptions.getProperty('on');
  const offProperty = toggleFunctionOptions.getProperty('off');

  const nameValue = nameProperty
    ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getText()
    ?.slice(1, -1);
  if (nameValue !== removedFeature) return;

  const onFunction = onProperty?.getFirstDescendantByKind(
    SyntaxKind.ArrowFunction,
  );
  const offFunction = offProperty?.getFirstDescendantByKind(
    SyntaxKind.ArrowFunction,
  );

  if (removedOption === 'on') {
    node.replaceWithText(onFunction?.getBody().getText() ?? '');
  }
  if (removedOption === 'off') {
    node.replaceWithText(offFunction?.getBody().getText() ?? '');
  }
}

function getAttributeByName(attributes: JsxAttribute[], name: string) {
  return attributes.find((attribute) => attribute.getName() === name);
}

function getReplacedComponent(attribute?: JsxAttribute) {
  const value = attribute
    ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
    ?.getExpression()
    ?.getText();
  if (value?.startsWith('(')) {
    return value.slice(1, -1);
  }
  return value;
}

function toggleComponent(node: Node) {
  const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

  const nameAttribute = getAttributeByName(attributes, 'name');
  const featureName = nameAttribute
    ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getLiteralValue();
  if (featureName !== removedFeature) return;

  const onAttribute = getAttributeByName(attributes, 'on');
  const offAttribute = getAttributeByName(attributes, 'off');

  const onValue = getReplacedComponent(onAttribute);
  const offValue = getReplacedComponent(offAttribute);

  if (removedOption === 'on' && onValue) {
    node.replaceWithText(onValue);
  }
  if (removedOption === 'off' && offValue) {
    node.replaceWithText(offValue);
  }
}

function isToggleComponent(node: Node) {
  const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);

  return identifier?.getText() === toggleComponentName;
}

files.forEach((file) => {
  file.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      toggleCallExpression(node);
    }

    if (
      node.isKind(SyntaxKind.JsxSelfClosingElement) &&
      isToggleComponent(node)
    ) {
      toggleComponent(node);
    }
  });
});

project.save();
