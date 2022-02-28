'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Ajay Pathak',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Ram Abhinav',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Srajan Pandey',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Abhishek Dsouza',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
         
         <div class="movements__value">${mov} ₹</div>
      </div>`;
    var htmlObject = document.createElement('div');
    htmlObject.innerHTML = html;
    containerMovements.insertAdjacentElement('afterbegin', htmlObject);
  });
};

const calcDisplaySummary = account => {
  const incomes = account.movements
    .filter(mov => {
      return mov > 0;
    })
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  labelSumIn.textContent = `${incomes} ₹`;

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(out)} ₹`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => mov * account.interestRate * 0.01)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest} ₹`;
};

const createUsernames = function (accounts) {
  accounts.forEach(user => {
    user.username = user.owner
      .toLowerCase()
      .split(' ')
      .map(word => {
        return word[0];
      })
      .join('');
  });
};
createUsernames(accounts);

const calcPrintBalance = acc => {
  acc.balance = acc.movements.reduce((acc, curr) => {
    return (acc += curr);
  }, 0);
  labelBalance.textContent = `${acc.balance} ₹`;
};

//EVENT HANDLERS
const updateUI = function (currentAccount) {
  displayMovements(currentAccount.movements);
  calcPrintBalance(currentAccount);
  calcDisplaySummary(currentAccount);
};

let currentAccount;
btnLogin.addEventListener('click', e => {
  e.preventDefault();
  // console.log('lGIN');
  currentAccount = accounts.find(account => {
    return account.username === inputLoginUsername.value;
  });
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // console.log('login');
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, recieverAccount);
  // clean inputs
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    recieverAccount &&
    currentAccount.balance >= amount &&
    recieverAccount?.username !== currentAccount.username
  ) {
    console.log('Valid');
    // TRANSFER
    currentAccount.movements.push(-amount);
    recieverAccount.movements.push(amount);
    // update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some(mov => {
      return mov >= amount * 0.1;
    })
  ) {
    // Add movement
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // console.log(index);
    accounts.splice(index, 1);
    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
// const user = 'Srajan Pandey';
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr.slice(0, -1));
// console.log(arr.slice(2, 4));

//can create a shallow copy of array
let arr2 = arr.slice(); //helps in chaining -- can do same this using destructuring

// SPLICE - extracted the parts of array and returns them
// console.log(arr.splice(2));
// console.log(arr);
// arr.splice(1, 0, 'new', 'boy');
// console.log(arr);
// arr.splice(1, 2);
// console.log(arr);

// // REVERSE
// console.log(arr.reverse());
// console.log(arr);
// console.log(arr.concat([4, 5, 6]));
// console.log(arr);

//FOR EACH

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1} -- you deposited ${movement}`);
//   } else if (movement < 0) {
//     console.log(`Movement ${i + 1} -- you withdrew ${Math.abs(movement)}`);
//   }
// }
// console.log(' ');
// movements.forEach((movement, index, array) => {
// if (movement > 0) {
//   console.log(`Movement ${index + 1} you deposited ${movement}`);
// } else if (movement < 0) {
//   console.log(`Movement ${index + 1} you withdrew ${Math.abs(movement)}`);
// }
// });

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// currencies.forEach((value, key, map) => {
//   console.log(`${key} -- ${value}`);
// });

// const currenciesSet = new Set(['A', 'B', 'C', 'D']);
// currenciesSet.forEach((value, _value, map) => {
//   console.log(`${value} -- ${_value}`);
// });

//MAP
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToUsd = 1.1;
const movUsd = movements.map(mov => (mov *= euroToUsd));
// console.log(movUsd);

const movementsDescription = movements.map((mov, i, arr) => {
  if (mov > 0) {
    return `Movement ${i + 1} you deposited ${mov}`;
  } else if (mov < 0) {
    return `Movement ${i + 1} you withdrew ${Math.abs(mov)}`;
  }
});
// console.log(movementsDescription);

const deposits = movements.filter(mov => {
  return mov > 0;
});
// console.log(deposits);

const withdrawals = movements.filter(mov => {
  return mov < 0;
});
// console.log(withdrawals);

const balance = movements.reduce((acc, curr, i, arr) => {
  console.log(`Iteration ${i} - ${acc}`);
  return acc + curr;
}, 0);
console.log(balance);

//Maxvalue
const max = movements.reduce((acc, curr) => {
  // if (acc < curr) {
  //   acc = curr;
  // }
  acc = acc < curr ? curr : acc;
  // console.log(acc);
  return acc;
}, movements[0]);

const totalDepositsUsd = movements
  .filter(mov => {
    return mov > 0;
  })
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * euroToUsd;
  })
  .reduce((acc, mov) => {
    return acc + mov;
  }, 0);
console.log(totalDepositsUsd);
