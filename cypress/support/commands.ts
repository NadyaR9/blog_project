import * as commonCommands from './commands/common';
import * as profileEditCommands from './commands/profileEdit';
import * as articleDetailsCommands from './commands/article';
import * as commentCommands from './commands/comment';
import * as ratingCommands from './commands/rating';

Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileEditCommands);
Cypress.Commands.addAll(articleDetailsCommands);
Cypress.Commands.addAll(commentCommands);
Cypress.Commands.addAll(ratingCommands);
