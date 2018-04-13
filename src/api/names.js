import axios from 'axios';
import { omit } from 'lodash';

const ax = axios.create({});

export async function getNames(query) {
  const res = await ax('/names', {
    params: query
  });
  // let a = new Promise(res => setTimeout(res, 3000));
  // await a;
  return res;
}

export async function createName(name) {
  const res = await ax.post('/names', omit(name, ['id']));
  return res;
}

export async function deleteName(name) {
  return await ax.delete(`/names/${name.id}`);
}

export async function editName(name) {
  return await ax.put(`/names/${name.id}`, name);
}
