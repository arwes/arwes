const LOREM_IPSUM = (`lorem ipsum dolor sit amet consectetur adipiscing elit
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad
minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat duis aute irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat
non proident sunt in culpa qui officia deserunt mollit anim id est`).split(' ');

const generateRandomText = length =>
  Array(length)
    .fill(0)
    .map(() => LOREM_IPSUM[Math.round(Math.random() * LOREM_IPSUM.length - 1)])
    .join(' ');

export { generateRandomText };
