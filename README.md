# MCLI
A simple cli to help scaffold projects

## Directory Structure
- `bin` - Contains the executable file for the cli
- `commands` - Contains the commands that the cli can run
- `templates` - Contains the templates that the cli can use to scaffold projects
- `src` - Contains the source code for the cli

## How to use
1. Clone or fork the repo (forking is recommended).
2. Install the CLI and make it executable:
   1. Navigate to the root directory of the cloned repo.
   2. Run `npm install` to install the dependencies.
   3. Run `npm link` to link the CLI globally.
3. Adding a new template:
   1. Add a new entry to the `template.definitions.js` file. Use kebab-case for long names. The `value` will be the name of the template folder where the boilerplate will live.
   2. Add the source code for your template in the `templates` directory. Name the folder with the same `value` from the previous step.
   3. If you need to replace any placeholders in the template with user-provided values, create a file in the `template-prompts` directory and follow the convention for the file name and `prompt` function. Reference the [Inquirer documentation](https://github.com/SBoudrias/Inquirer.js/tree/main?tab=readme-ov-file#usage).
4. Test your CLI by running `mcli new <your project name>` in a different directory. This should prompt you to select a template and then also prompt you for questions specific to the selected template if a prompt function was added for the template.
