export const filterList = (users, searchValue) => {
  const normalizedSearchValue = searchValue.toLowerCase().trim();
  return users.filter(
    u =>
      u.email.toLowerCase().includes(normalizedSearchValue) ||
      u.name.first.toLowerCase().includes(normalizedSearchValue) ||
      u.name.last.toLowerCase().includes(normalizedSearchValue) ||
      u.phone.toLowerCase().includes(normalizedSearchValue) ||
      u.location.city.toLowerCase().includes(normalizedSearchValue) ||
      u.location.state.toLowerCase().includes(normalizedSearchValue)
  );
};
