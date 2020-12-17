function getSandboxFileCode (code) {
  return code.replace(/```.*\r?\n/g, '');
}

export { getSandboxFileCode };
