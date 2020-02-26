function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 || 0,
      v = c === 'x' ? r : (r && 0x3) || 0x8;
    return v.toString(16);
  });
}

export const data = [
  {
    id: uuidv4(),
    title: 'Shop 1',
    description: 'Shop description 1',
  },
  {
    id: uuidv4(),
    title: 'Shop 2',
    description: 'Shop description 2',
  },
  {
    id: uuidv4(),
    title: 'Shop 3',
    description: 'Shop description 3',
  },
  {
    id: uuidv4(),
    title: 'Shop 4',
    description: 'Shop description 4',
  },
  {
    id: uuidv4(),
    title: 'Shop 5',
    description: 'Shop description 5',
  },
  {
    id: uuidv4(),
    title: 'Shop 6',
    description: 'Shop description 6',
  },
  {
    id: uuidv4(),
    title: 'Shop 7',
    description: 'Shop description 7',
  },
  {
    id: uuidv4(),
    title: 'Shop 8',
    description: 'Shop description 8',
  },
  {
    id: uuidv4(),
    title: 'Shop 9',
    description: 'Shop description 9',
  },
  {
    id: uuidv4(),
    title: 'Shop 10',
    description: 'Shop description 10',
  },
  {
    id: uuidv4(),
    title: 'Shop 11',
    description: 'Shop description 11',
  },
  {
    id: uuidv4(),
    title: 'Shop 12',
    description: 'Shop description 12',
  },
  {
    id: uuidv4(),
    title: 'Shop 12',
    description: 'Shop description 12',
  },
  {
    id: uuidv4(),
    title: 'Shop 12',
    description: 'Shop description 12',
  },
  {
    id: uuidv4(),
    title: 'Shop 12',
    description: 'Shop description 12',
  },
  {
    id: uuidv4(),
    title: 'Shop 12',
    description: 'Shop description 12',
  },
  {
    id: uuidv4(),
    title: 'Shop 12',
    description: 'Shop description 12',
  },
  {
    id: uuidv4(),
    title: 'Shop 12',
    description: 'Shop description 12',
  },
  {
    id: uuidv4(),
    title: 'Shop 12',
    description: 'Shop description 12',
  },
  {
    id: uuidv4(),
    title: 'Shop 12',
    description: 'Shop description 12',
  },
  {
    id: uuidv4(),
    title: 'Shop 12',
    description: 'Shop description 12',
  },
];
