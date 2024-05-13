export const getGreeting = (name) => {
  const date = new Date();
  const hour = date.getHours();

  if (hour >= 5 && hour < 12) {
    return `God Morgon, ${name}`;
  } else if (hour >= 12 && hour < 18) {
    return `God Dag, ${name}`;
  } else {
    return `God Kväll, ${name}`;
  }
};

export const passwordCriteria = [
  {
    test: (password) => /[A-Z]/.test(password),
    message: 'Lösenordet måste innehålla minst en stor bokstav',
  },
  {
    test: (password) => /[a-z]/.test(password),
    message: 'Lösenordet måste innehålla minst en liten bokstav',
  },
  {
    test: (password) => /\d/.test(password),
    message: 'Lösenordet måste innehålla minst en siffra',
  },
  {
    test: (password) => password.length >= 8,
    message: 'Lösenordet måste vara minst 8 tecken långt',
  },
];
