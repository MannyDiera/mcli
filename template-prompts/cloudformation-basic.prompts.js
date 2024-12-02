import { input } from '@inquirer/prompts';

/**
 * Prompts the user to enter the name of the Lambda function.
 *
 * @returns {Promise<{templateDescription: string}, {dbSecurityGroup: string}>} - An object containing user selected or default values for this template.
 */
export const prompt = async () => {
  let templateDescription;
  let dbSecurityGroup;

  templateDescription = await input({
    message: 'Enter the description of the cloudformation template',
    default: 'A sample database stack for the AWS CloudFormation Step by Step course series'
  });

  dbSecurityGroup = await input({
    message: 'Enter the name of DB Security Group',
    default: 'DBSecurityGroup'
  });

  return {
    templateDescription,
    dbSecurityGroup
  }
}
