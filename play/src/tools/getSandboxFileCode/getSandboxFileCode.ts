function getSandboxFileCode (code: string): string {
  return code.replace(/```.*\r?\n/g, '');
}

export { getSandboxFileCode };
