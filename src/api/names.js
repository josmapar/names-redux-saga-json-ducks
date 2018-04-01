import axios from 'axios';

const ax = axios.create({});

export async function getNames() {
  const res = await ax('/names');
  let a = new Promise(res => setTimeout(res, 3000));
  await a;
  return res;
}
