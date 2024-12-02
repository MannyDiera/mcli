import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { select } from '@inquirer/prompts';
import { availableProjectChoices } from '../../template.definitions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Replaces placeholders in a string with provided values.
 * @param {string} content - the original template content
 * @param {object} variables - object containing values to replace in the template
 * @returns {string} result - updated template content for the new project
 */
const replacePlaceholders = (content, variables) => {
  const placeholders = Object.keys(variables);
  let result = content;

  placeholders.forEach(placeholder => {
    const regex = new RegExp(`{{${placeholder}}}`, 'g');
    result = result.replace(regex, variables[placeholder]);
  });

  return result;
}

/**
 * Copies a template directory to a destination directory, replacing placeholders in the files with provided variables.
 *
 * @param {string} src - The source directory containing the template files.
 * @param {string} dest - The destination directory where the files will be copied.
 * @param {Object} variables - An object containing the placeholder values to replace in the template files.
 */
const copyTemplate = (src, dest, variables) => {
  fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src).forEach((file) => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);

    if (fs.lstatSync(srcFile).isDirectory()) {
      copyTemplate(srcFile, destFile, variables);
    } else {
      const content = fs.readFileSync(srcFile, 'utf8');

      const result = replacePlaceholders(content, variables);

      fs.writeFileSync(destFile, result, 'utf8');
    }
  });
}

/**
 * Prompts the user for input if a prompt file exists for the selected template.
 *
 * @param {string} templateName - The name of the selected template.
 * @returns {Promise<object>} A promise containing user selections that resolves when the user input has been collected.
 */
const promptUserForTemplate = async (templateName) => {
  const userResponses = {};
  const promptFilePath = path.resolve(__dirname, `../../template-prompts/${templateName}.prompts.js`);

  if (fs.existsSync(promptFilePath)) {
    const promptUser = (await import(promptFilePath)).prompt;
    Object.assign(userResponses, await promptUser());
  }
  return userResponses;
};

/**
 * Scaffolds a new project by copying a template, prompting the user for input, and installing dependencies.
 *
 * @param {string} projectName - The name of the new project.
 * @param {Object} options - Additional options for scaffolding the project. (Not needed currently)
 */
export const scaffold = async (projectName, options) => {
  const targetDir = path.resolve(process.cwd(), projectName);

  // Loads available templates from the template.definitions.js file
  try {
    const templateName = await select({
      message: 'Select a project type',
      choices: availableProjectChoices
    });

    // if prompts exist for the template, this function will return the values, otherwise it returns an empty object
    const promptResultValues = await promptUserForTemplate(templateName);

    const variables = {
      ...promptResultValues,
      projectName,
      templateName
    };

    const templateDir = path.resolve(__dirname, '../../templates', templateName);

    if (!fs.existsSync(templateDir)) {
      console.error(`Template '${templateName}' not found`);
      process.exit(1);
    }

    console.log(`Scaffolding project '${projectName}' using '${templateName}' template...`);
    copyTemplate(templateDir, targetDir, variables);

    console.log('Project created successfully!');

  } catch (error) {
    process.exit(1);
  }
}
