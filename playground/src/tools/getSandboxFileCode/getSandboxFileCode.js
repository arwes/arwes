function getSandboxFileCode (code) {
  return code.replace(/```.*\n/g, '');
}

export { getSandboxFileCode };
