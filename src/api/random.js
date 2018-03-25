export async function getRandomNumber() {
  const url = 'https://www.random.org/strings/?num=1&len=1&digits=on&format=plain&rnd=new';
  let res = await fetch(url);
  return parseInt(await res.text(), 10);
}
