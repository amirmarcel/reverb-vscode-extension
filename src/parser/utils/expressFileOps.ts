import * as patterns from '../../constants/expressPatterns';
import * as fileOps from './genericFileOps';

// Check the specified line for an express import statement
const checkForExpressImport = (line: string) => {
  const MATCH = line.match(patterns.IMPORT_EXPRESS);
  // If a match is found, return the name applied to the express import
  if (MATCH !== null) return MATCH[1];
  // Otherwise return undefined
  return undefined;
};

// Check the specified line for a require express statement
const checkForRequireExpress = (line: string) => {
  const MATCH = line.match(patterns.REQUIRE_EXPRESS);
  // If a match is found, return the name applied to the express import
  if (MATCH !== null) return MATCH[1];
  // Otherwise return undefined
  return undefined;
};

// Attempt to parse the name applied to the express import statement from the specified file
export const checkFileForExpress = (file: fileOps.File) => {
  const LINES = file.contents.split(patterns.NEW_LINE);
  for (let i = 0; i < LINES.length; i += 1) {
    // Check the current line for an express import statement
    let expressImport = checkForExpressImport(LINES[i]);
    if (expressImport !== undefined) return expressImport;
    // Check the current line for a require express statement
    expressImport = checkForRequireExpress(LINES[i]);
    if (expressImport !== undefined) return expressImport;
  }
  // The file does not contain an express import/require statement
  return undefined;
};

// Check the specified line for an express invocation
const checkForExpressInvocation = (line: string, expressName: string) => {
  const SERVER_PATTERN = new RegExp('(\\S+)\\s*=\\s*' + expressName + '\\(\\)');
  // Check the current line for an invocation of express
  const SERVER_NAME = line.match(SERVER_PATTERN);
  // If a match is found, return the name applied to the express server
  if (SERVER_NAME !== null) return SERVER_NAME[1];
  // Otherwise return undefined
  return undefined;
};

// Check the specified line for express.Application
const checkForExpressApplication = (line: string, expressName: string) => {
  const SERVER_PATTERN = new RegExp(
    '\\(\\s*(\\S+)\\s*:\\s*' + expressName + '\\.Application\\)',
  );
  // Check the current line for a call to express.Application
  const SERVER_NAME = line.match(SERVER_PATTERN);
  // If a match is found, return the name applied to the express server
  if (SERVER_NAME !== null) return SERVER_NAME[1];
  // Otherwise return undefined
  return undefined;
};

// Attempt to parse the name applied to the express server from the specified file
export const checkFileForServer = (file: fileOps.File, expressName: string) => {
  const LINES = file.contents.split(patterns.NEW_LINE);
  for (let i = 0; i < LINES.length; i += 1) {
    // Check the current line for an express import statement
    let expressImport = checkForExpressInvocation(LINES[i], expressName);
    if (expressImport !== undefined) return expressImport;
    // Check the current line for a require express statement
    expressImport = checkForExpressApplication(LINES[i], expressName);
    if (expressImport !== undefined) return expressImport;
  }
  // The file does not contain an express import/require statement
  return undefined;
};
