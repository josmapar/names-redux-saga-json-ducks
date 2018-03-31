const faker = require('faker');

module.exports = () => {
  let names = [];

  for(let i=0; i<20; i++) {
    let name = `${faker.name.firstName()} ${faker.name.lastName()}`;
    let date = faker.date.recent(5);
    let createdAt = date;
    let updatedAt = faker.date.between(date, new Date());

    names.push({
      id: i+1,
      name,
      createdAt,
      updatedAt 
    });
  }
  
  return { names };
}

