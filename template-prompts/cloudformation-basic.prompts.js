import { input } from '@inquirer/prompts';

/**
 * Prompts the user to enter the name of the Lambda function.
 *
 * @returns {Promise<{functionName: string}>} An object containing the function name.
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
