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
    title: 'Sản phẩm 1',
    description: 'Sản phẩm description 1',
  },
  {
    id: uuidv4(),
    title: 'Sản phẩm 2',
    description: 'Sản phẩm description 2',
  },
  {
    id: uuidv4(),
    title: 'Sản phẩm 3',
    description: 'Sản phẩm description 3',
  },
  {
    id: uuidv4(),
    title: 'Sản phẩm 4',
    description: 'Sản phẩm description 4',
  },
  {
    id: uuidv4(),
    title: 'Sản phẩm 5',
    description: 'Sản phẩm description 5',
  },
  {
    id: uuidv4(),
    title: 'Sản phẩm 6',
    description: 'Sản phẩm description 6',
  },
  {
    id: uuidv4(),
    title: 'Sản phẩm 7',
    description: 'Sản phẩm description 7',
  },
  {
    id: uuidv4(),
    title: 'Sản phẩm 8',
    description: 'Sản phẩm description 8',
  },
  {
    id: uuidv4(),
    title: 'Sản phẩm 9',
    description: 'Sản phẩm description 9',
  },
  {
    id: uuidv4(),
    title: 'Sản phẩm 10',
    description: 'Sản phẩm description 10',
  },
  {
    id: uuidv4(),
    title: 'Sản phẩm 11',
    description: 'Sản phẩm description 11',
  },
  {
    id: uuidv4(),
    title: 'Sản phẩm 12',
    description: 'Sản phẩm description 12',
  },
  {
    id: uuidv4(),
    title: 'Sản phẩm 12',
    description: 'Sản phẩm description 12',
  },
  {
    id: uuidv4(),
    title: 'Sản phẩm 12',
    description: 'Sản phẩm description 12',
  },
  {
    id: uuidv4(),
    title: 'Sản phẩm 12',
    description: 'Sản phẩm description 12',
  },
  {
    id: uuidv4(),
    title: 'Sản phẩm 12',
    description: 'Sản phẩm description 12',
  },
  {
    id: uuidv4(),
    title: 'Sản phẩm 12',
    description: 'Sản phẩm description 12',
  },
  {
    id: uuidv4(),
    title: 'Sản phẩm 12',
    description: 'Sản phẩm description 12',
  },
  {
    id: uuidv4(),
    title: 'Sản phẩm 12',
    description: 'Sản phẩm description 12',
  },
  {
    id: uuidv4(),
    title: 'Sản phẩm 12',
    description: 'Sản phẩm description 12',
  },
  {
    id: uuidv4(),
    title: 'Sản phẩm 12',
    description: 'Sản phẩm description 12',
  },
];
