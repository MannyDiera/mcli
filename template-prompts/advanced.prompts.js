import { input } from '@inquirer/prompts';

/**
 * Prompts the user to enter the name of the Lambda function.
 *
 * @returns {Promise<{functionName: string}>} - An object containing the function name.
 */
export const prompt = async () => {
  let functionName;

  functionName = await input({
    message: 'Enter the name of the Lambda function',
    default: 'helloWorld'
  });

  return {
    functionName
  }
}
