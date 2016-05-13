'use strict';

const fs = require('fs');

const FILE_POSTFIX = '.blueprint'; // Blueprint filename stripped at creation
const FOLDER_BLUEPRINTS = 'blueprints/files'; // Folder for all blueprints
const REPLACE_PREFIX = '@{{'; // Text prefix and postfix
const REPLACE_POSTFIX = '}}@';

var blueprint = {
  /**
   * Generates a new blueprint with filename and contents
   * @param blueprintName
   * @param replaceVars [Object] Example [{key: 'myKeyToReplace', value: 'replacementValue'}, {...}]
   */
  getNew: function (blueprintName, replaceVars) {
    var filename = blueprintName;

    var content = fs.readFileSync(`${FOLDER_BLUEPRINTS}/${blueprintName}${FILE_POSTFIX}`, 'utf8');
    replaceVars.forEach(function (o) {
      let target = `${REPLACE_PREFIX}${o.key}${REPLACE_POSTFIX}`;
      content = content.replace(target, o.value);
    });

    return {
      filename,
      content
    };
  }
};

/**
 *  * Synchronously generate a new Blueprint object
 * @param blueprintName
 * @param replaceVars
 * @returns {*|{filename, content}}
 */
exports.getBlueprint = function (blueprintName, replaceVars) {
  return blueprint.getNew(blueprintName, replaceVars);
};
