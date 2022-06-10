export const sortList = (users, sortValue) => {
  return users.sort((a, b) => {
    let idA;
    let idB;
    if (sortValue === 'first' || sortValue === 'last') {
      idA = a.name[sortValue];
      idB = b.name[sortValue];
    } else if (sortValue === 'phone' || sortValue === 'email') {
      idA = a[sortValue];
      idB = b[sortValue];
    } else if (sortValue === 'city' || sortValue === 'state') {
      idA = a.location[sortValue];
      idB = b.location[sortValue];
    }
    if (idA > idB) {
      return 1;
    }
    if (idA < idB) {
      return -1;
    }
    return 0;
  });
};
