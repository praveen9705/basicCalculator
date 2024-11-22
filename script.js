// Function to perform arithmetic operations
const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = '';

// Handle input and calculations
const handleInput = (value) => {
  if (!isNaN(value) || value === '.') {
    currentInput += value;
  } else if (['+', '-', '*', '/','%'].includes(value)) {
    if (currentInput) {
      operator = value;
      previousInput = currentInput;
      currentInput = '';
    }
  } else if (value === '=' || value === 'Enter') {
    if (currentInput && previousInput && operator) {
      const result = calculate(parseFloat(previousInput), parseFloat(currentInput), operator);
      currentInput = result.toString();
      operator = '';
      previousInput = '';
    }
  } else if (value === 'C' || value === 'Backspace') {
    currentInput = '';
    previousInput = '';
    operator = '';
  } else if (value === '←') {
    currentInput = currentInput.slice(0, -1);  // Removes the last character
  }
  else if (value === '%') {
if (previousInput && currentInput) {
    currentInput = (parseFloat(previousInput) * parseFloat(currentInput)) / 100;
}
}

  
  updateDisplay();
};

// Calculation logic
const calculate = (a, b, op) => {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? (a / b).toFixed(3) : 'Error';
    case '%': return b!== 0? a % b : 'Error';
    default: return '';
  } 
  
};

// Display update
const updateDisplay = () => {
  display.textContent = currentInput || previousInput || '0';
};

// Event listeners for button clicks
document.querySelectorAll('button').forEach(button =>
  button.addEventListener('click', () => handleInput(button.textContent))
);

// Keyboard input handling
document.addEventListener('keydown', (e) => {
  const keyMap = {
    '/': '/',
    '*': '*',
    '-': '-',
    '+': '+',
    '=': '=',
    '%': '%',
    'Enter': '=',
    'Backspace': '←',
    '.': '.',
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9'
  };
  if (keyMap[e.key]) {
    handleInput(keyMap[e.key]);
  }
});