import { ToolGuide } from './types';

export const MATH_GUIDES: Record<string, ToolGuide> = {
  'basic-calculator': {
    id: 'basic-calculator',
    name: 'Basic Calculator',
    subtitle: 'Fast, responsive, four-function arithmetic calculator for everyday math',
    whatItDoes: {
      summary: 'Performs instant addition, subtraction, multiplication, and division with a clean digital display and keyboard input support.',
      targetAudience: 'Students, accountants, office workers, and anyone needing quick calculations on desktop or mobile.',
      problemsSolved: [
        'Solves everyday arithmetic without needing physical hardware or launching separate desktop apps.',
        'Prevents manual calculation errors with an instant visual expression ledger.'
      ],
      expectedResult: 'Exact numerical result displayed with up to 10 decimal digits of precision.'
    },
    features: [
      'Four core operations: Addition (+), Subtraction (-), Multiplication (×), Division (÷).',
      'Instant Clear (C) and Backspace button for correcting typing errors.',
      'Percentage (%) calculation and decimal point entry.',
      'Keyboard shortcuts support (NumPad and standard numbers).'
    ],
    beforeYouStart: [
      'No files or downloads needed.',
      'Have your mathematical expression or numbers ready to compute.'
    ],
    stepByStep: [
      'Open the Basic Calculator on Zynovexa.',
      'Click the numerical keypad buttons (0–9) or type directly on your keyboard.',
      'Click your desired operator (+, -, ×, ÷).',
      'Enter the second number.',
      'Click "=" or press Enter on your keyboard to view the computed answer.',
      'Click "C" to reset the display for a fresh calculation.'
    ],
    example: {
      title: 'Calculating Grocery Total',
      input: '125.50 + 48.75 × 2',
      options: 'Standard arithmetic evaluation',
      output: '223.00',
      explanation: 'Multiplies 48.75 by 2 to get 97.50, then adds 125.50 to produce the final total 223.00.'
    },
    bestResultsTips: [
      'You can use your physical computer keyboard (0-9, +, -, *, /, Enter, Backspace) for faster data entry.',
      'Check for decimal points before pressing equals to ensure currency precision.'
    ],
    troubleshooting: [
      {
        problem: 'Display shows "Error" or "Cannot divide by zero"',
        cause: 'Division by zero is mathematically undefined.',
        solution: 'Click "C" to clear the calculation and re-enter a non-zero divisor.'
      },
      {
        problem: 'Keyboard input does not register',
        cause: 'The browser focus may be outside the calculator container.',
        solution: 'Click anywhere inside the calculator interface to restore focus.'
      }
    ],
    faqs: [
      { q: 'Is this calculator 100% free?', a: 'Yes, it runs completely in your web browser with zero subscriptions or fees.' },
      { q: 'Can I use this calculator on mobile phones?', a: 'Yes, the large touch-friendly buttons are optimized for touchscreens.' },
      { q: 'Does it retain my calculation history?', a: 'Calculations are kept during your active session directly on your device.' },
      { q: 'How many decimal places does it support?', a: 'It calculates floating point numbers with up to 10 decimal precision.' },
      { q: 'Does it work offline?', a: 'Yes, once the web page is loaded in your browser, calculations operate 100% offline.' }
    ],
    seoContent: {
      title: 'Free Online Basic Calculator — Fast & Mobile Friendly | Zynovexa',
      metaDescription: 'Use Zynovexa free online basic calculator for everyday addition, subtraction, multiplication, and division. No sign in required.',
      h1: 'Free Online Basic Calculator',
      primaryKeyword: 'basic calculator',
      secondaryKeywords: ['online arithmetic calculator', 'simple calculator online', 'free math calculator'],
      longTailKeywords: ['free basic calculator no sign up', 'mobile friendly online calculator']
    }
  },
  'long-division-calculator': {
    id: 'long-division-calculator',
    name: 'Long Division Calculator',
    subtitle: 'School-style vertical long division notation with step-by-step subtractions',
    whatItDoes: {
      summary: 'Computes long division between dividends and divisors, rendering the exact vertical school-style brackets, intermediate products, subtractions, and remainder.',
      targetAudience: 'Elementary and high school students, teachers, parents checking homework, and math learners.',
      problemsSolved: [
        'Demystifies long division by visualizing every single subtraction and carry-down digit.',
        'Eliminates confusion over remainders versus decimal quotients.'
      ],
      expectedResult: 'A visual division diagram showing quotient on top, divisor on left, dividend inside bracket, and all subtraction levels down to the final remainder.'
    },
    features: [
      'Authentic vertical school bracket notation with clean alignment.',
      'Explicit explanations for each step: how many times divisor fits, multiplication, and subtraction.',
      'Shows quotient, remainder, and equivalent decimal answer.',
      'Copyable text report and instant reset button.'
    ],
    beforeYouStart: [
      'Know the dividend (the number being divided, e.g. 697).',
      'Know the divisor (the number dividing by, e.g. 19).'
    ],
    stepByStep: [
      'Navigate to the Long Division Calculator on Zynovexa.',
      'Locate the "Dividend" input field and enter your starting number.',
      'Locate the "Divisor" input field and enter your dividing number (must not be 0).',
      'Click the blue "Calculate Long Division" button.',
      'Examine the vertical breakdown showing each subtraction step and digit brought down.',
      'Review the final Quotient and Remainder summary below the chart.'
    ],
    example: {
      title: 'Dividing 697 by 19',
      input: 'Dividend = 697, Divisor = 19',
      options: 'Standard integer long division',
      output: 'Quotient = 36, Remainder = 13 (697 = 19 × 36 + 13)',
      explanation: '19 goes into 69 three times (19 × 3 = 57). Subtract 57 from 69 to get 12. Bring down 7 to form 127. 19 goes into 127 six times (19 × 6 = 114). Subtract 114 from 127 to leave remainder 13.'
    },
    bestResultsTips: [
      'Enter whole positive integers to see standard elementary school long division steps.',
      'Use the step-by-step explanation below the diagram to teach students how digit carry-down works.'
    ],
    troubleshooting: [
      {
        problem: 'Error says "Divisor cannot be zero"',
        cause: 'Dividing any number by 0 is undefined.',
        solution: 'Enter any positive or negative non-zero number in the Divisor field.'
      },
      {
        problem: 'Diagram does not render',
        cause: 'Non-numeric characters were entered into the input fields.',
        solution: 'Ensure only numerical digits (0-9) are typed into the Dividend and Divisor fields.'
      }
    ],
    faqs: [
      { q: 'Does this calculator show traditional school brackets?', a: 'Yes, it dynamically renders the classic school division bracket notation.' },
      { q: 'Can it divide large numbers?', a: 'Yes, it can divide multi-digit dividends up to millions.' },
      { q: 'Does it give both quotient and remainder?', a: 'Yes, both the integer quotient, remainder, and decimal conversion are displayed.' },
      { q: 'Is registration required to use the step-by-step solver?', a: 'No, all steps are calculated locally in your browser with zero registration.' },
      { q: 'Can I print or save the result?', a: 'You can highlight and copy the step diagram or print the page directly.' }
    ],
    seoContent: {
      title: 'Free Long Division Calculator with Steps — School Bracket Style | Zynovexa',
      metaDescription: 'Free online long division calculator with vertical school-style brackets, intermediate subtractions, quotient, and remainder.',
      h1: 'Long Division Calculator with Steps',
      primaryKeyword: 'long division calculator',
      secondaryKeywords: ['long division with steps', 'school style division calculator', 'division with remainder online'],
      longTailKeywords: ['free long division calculator step by step', 'online division bracket generator']
    }
  },
  'average-calculator': {
    id: 'average-calculator',
    name: 'Average Calculator',
    subtitle: 'Compute Mean, Median, Mode, Range, Sum, and Count for any dataset',
    whatItDoes: {
      summary: 'Calculates the arithmetic Mean, Median, Mode, Range, Count, and Sum for lists of numbers separated by spaces, commas, or line breaks.',
      targetAudience: 'Researchers, teachers calculating grade averages, analysts, engineers, and students.',
      problemsSolved: [
        'Automates tedious manual additions and divisions for large series of values.',
        'Instantly extracts central tendencies (mean, median, mode) simultaneously.'
      ],
      expectedResult: 'A comprehensive statistical breakdown showing Mean, Median, Mode, Range, Sum, Count, and the step-by-step formula.'
    },
    features: [
      'Flexible delimiters: paste numbers separated by commas, spaces, tabs, or newlines.',
      'Computes Mean (Arithmetic Average), Median (Middle value), Mode (Most frequent), and Range (Max - Min).',
      'Step-by-step calculation showing Sum ÷ Count = Average.',
      'Instant copy button to copy all statistical metrics.'
    ],
    beforeYouStart: [
      'Gather your numbers or grades from your notes or spreadsheet.',
      'No format conversions required; raw lists of numbers can be pasted directly.'
    ],
    stepByStep: [
      'Open the Average Calculator on Zynovexa.',
      'Paste or type your numbers into the text box (e.g., "85, 92, 78, 90, 88").',
      'Click the blue "Calculate Average" button.',
      'Review the results grid displaying the Mean, Median, Mode, and Range.',
      'Read the step-by-step breakdown showing the total sum divided by value count.'
    ],
    example: {
      title: 'Exam Scores Average',
      input: '75, 85, 90, 85, 100',
      options: 'Comma-separated values',
      output: 'Mean = 87.00 | Median = 85.00 | Mode = 85 | Range = 25 | Sum = 435 | Count = 5',
      explanation: 'Sum = 75 + 85 + 90 + 85 + 100 = 435. Divided by 5 numbers equals 87.00 mean average.'
    },
    bestResultsTips: [
      'You can copy an entire column of numbers from Microsoft Excel or Google Sheets and paste directly into the box.',
      'Negative numbers and decimals are fully supported.'
    ],
    troubleshooting: [
      {
        problem: 'Result says "No valid numbers found"',
        cause: 'The input contained only text or symbols without recognizable digits.',
        solution: 'Make sure your input contains digits separated by spaces or commas.'
      },
      {
        problem: 'Mode displays "None"',
        cause: 'All numbers in the dataset appear with equal frequency (frequency of 1).',
        solution: 'This is mathematically valid when no single value repeats.'
      }
    ],
    faqs: [
      { q: 'What is the difference between Mean and Median?', a: 'Mean is the sum divided by count. Median is the middle number when values are sorted.' },
      { q: 'Can I paste numbers from Excel?', a: 'Yes, copy any column or row from Excel or Google Sheets and paste directly.' },
      { q: 'Does it support negative numbers?', a: 'Yes, negative values such as -10, -5, 20 are fully calculated.' },
      { q: 'Is there a limit on how many numbers I can average?', a: 'You can process hundreds of numbers instantly inside your browser.' },
      { q: 'Is my data saved or uploaded?', a: 'No, all calculations run in your device RAM and are never sent anywhere.' }
    ],
    seoContent: {
      title: 'Free Average Calculator — Mean, Median, Mode & Range | Zynovexa',
      metaDescription: 'Calculate arithmetic average (mean), median, mode, sum, and range online for free. Paste numbers from Excel or Google Sheets.',
      h1: 'Online Average Calculator',
      primaryKeyword: 'average calculator',
      secondaryKeywords: ['mean median mode calculator', 'find average online', 'calculate mean with steps'],
      longTailKeywords: ['free average calculator with steps', 'grade average calculator online free']
    }
  },
  'percentage-calculator': {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    subtitle: 'All-in-one solver for percentage values, proportions, and percentage changes',
    whatItDoes: {
      summary: 'Solves the three common percentage equations: What is X% of Y? X is what percent of Y? and Percentage increase or decrease from X to Y.',
      targetAudience: 'Shoppers calculating discounts, business analysts calculating profit growth, teachers, and students.',
      problemsSolved: [
        'Eliminates confusion over percentage increase versus decrease formulas.',
        'Instantly solves sales tax, tips, markups, and exam percentages.'
      ],
      expectedResult: 'Exact percentage values, monetary differences, and clear step-by-step mathematical formulas.'
    },
    features: [
      'Formula 1: What is X% of Y? (e.g. 15% of $80).',
      'Formula 2: X is what percent of Y? (e.g. 45 out of 60).',
      'Formula 3: Percentage increase/decrease from Value A to Value B.',
      'Instant calculation with 2 decimal rounding precision.'
    ],
    beforeYouStart: [
      'Determine which percentage problem you need to solve.',
      'Have your base and comparison numbers ready.'
    ],
    stepByStep: [
      'Select the percentage formula card that matches your question.',
      'Enter the numbers into the corresponding input fields.',
      'Click "Calculate" or observe the real-time computed answer.',
      'Review the step-by-step equation explanation.'
    ],
    example: {
      title: 'Store Discount Calculation',
      input: 'X = 20%, Y = 150',
      options: 'What is X% of Y?',
      output: '30.00 (Formula: 150 × (20 ÷ 100) = 30)',
      explanation: 'A 20% discount on a $150 item saves $30, leaving a final price of $120.'
    },
    bestResultsTips: [
      'For sales discounts, enter the discount percentage in Box 1 and the original price in Box 2.',
      'For test scores, enter points scored in Box 1 and total points in Box 2.'
    ],
    troubleshooting: [
      {
        problem: 'Calculated value displays Infinity',
        cause: 'Division by zero occurred in percentage change from 0.',
        solution: 'Percentage increase from 0 is mathematically undefined; enter a non-zero starting value.'
      },
      {
        problem: 'Answer displays NaN (Not a Number)',
        cause: 'Non-numeric symbols or characters were typed into the percentage box.',
        solution: 'Clear letters or punctuation and enter only valid numerical numbers.'
      }
    ],
    faqs: [
      { q: 'How do I calculate percentage increase?', a: 'Formula: ((New Value - Old Value) / Old Value) × 100.' },
      { q: 'Is this calculator free?', a: 'Yes, 100% free with no sign-in or payment.' },
      { q: 'Does it support decimal percentages like 7.25%?', a: 'Yes, enter any floating point numbers like 7.25 or 12.5.' },
      { q: 'Can I calculate negative growth?', a: 'Yes, it displays negative percentages with a clear "Percentage Decrease" badge.' },
      { q: 'Does it work on mobile phones?', a: 'Yes, fully optimized for mobile touchscreens.' }
    ],
    seoContent: {
      title: 'Free Online Percentage Calculator — Percent Change & Discounts | Zynovexa',
      metaDescription: 'Free online percentage calculator. Solve what is X% of Y, X is what percent of Y, and percentage increase or decrease instantly.',
      h1: 'Online Percentage Calculator',
      primaryKeyword: 'percentage calculator',
      secondaryKeywords: ['percent change calculator', 'discount percentage calculator', 'percentage increase calculator'],
      longTailKeywords: ['how to calculate percentage online free', 'find percent of number calculator']
    }
  },
  'fraction-calculator': {
    id: 'fraction-calculator',
    name: 'Fraction Calculator',
    subtitle: 'Add, subtract, multiply, and divide fractions with automatic lowest-term reduction',
    whatItDoes: {
      summary: 'Performs arithmetic on proper and improper fractions, simplifies fractions to their lowest terms using GCD, and outputs mixed numbers.',
      targetAudience: 'Math students, bakers scaling recipes, carpenters measuring wood, and teachers.',
      problemsSolved: [
        'Eliminates difficult common denominator calculations when adding or subtracting fractions.',
        'Automatically reduces fractions to lowest terms and mixed numbers.'
      ],
      expectedResult: 'Simplified fraction (numerator/denominator), mixed number equivalent, and decimal approximation.'
    },
    features: [
      'Supports +, -, ×, and ÷ operations.',
      'Automated Greatest Common Divisor (GCD) reduction to simplest form.',
      'Conversion to mixed fraction (e.g., 7/4 = 1 3/4) and decimal.',
      'Clear input boxes for numerator and denominator.'
    ],
    beforeYouStart: [
      'Have the numerators and denominators for both fractions ready.'
    ],
    stepByStep: [
      'Enter Numerator 1 and Denominator 1.',
      'Choose the math operator (+, -, ×, ÷).',
      'Enter Numerator 2 and Denominator 2.',
      'Click "Calculate".',
      'View the simplified fraction, mixed fraction, and decimal value.'
    ],
    example: {
      title: 'Adding 1/2 and 3/4',
      input: '1/2 + 3/4',
      options: 'Addition with unlike denominators',
      output: '5/4 (Mixed: 1 1/4 | Decimal: 1.25)',
      explanation: 'Common denominator is 4. 2/4 + 3/4 = 5/4, which simplifies to 1 whole and 1/4.'
    },
    bestResultsTips: [
      'Denominator cannot be zero. Always enter a non-zero denominator.',
      'Use the mixed number output for baking and carpentry measurements.'
    ],
    troubleshooting: [
      {
        problem: 'Denominator error',
        cause: 'A denominator was set to 0.',
        solution: 'Set the denominator to 1 or higher.'
      },
      {
        problem: 'Fraction did not reduce as expected',
        cause: 'The numerator and denominator may share no common factors (coprime numbers).',
        solution: 'If GCD is 1, the fraction is already in simplest lowest terms.'
      }
    ],
    faqs: [
      { q: 'Does this calculator simplify to lowest terms?', a: 'Yes, it automatically divides by the greatest common factor.' },
      { q: 'Can it convert improper fractions to mixed numbers?', a: 'Yes, results like 7/3 are shown as 2 1/3.' },
      { q: 'Does it give decimal values?', a: 'Yes, precise decimal equivalents are shown alongside fractions.' },
      { q: 'Is it free?', a: 'Yes, 100% free with no sign-in.' },
      { q: 'Can I subtract larger fractions from smaller ones?', a: 'Yes, negative fraction outputs are supported.' }
    ],
    seoContent: {
      title: 'Free Fraction Calculator — Add, Subtract, Multiply & Divide | Zynovexa',
      metaDescription: 'Calculate fractions online with automatic simplification, mixed numbers, and step-by-step reduction. 100% free.',
      h1: 'Online Fraction Calculator',
      primaryKeyword: 'fraction calculator',
      secondaryKeywords: ['simplify fractions calculator', 'add fractions online', 'mixed number calculator'],
      longTailKeywords: ['how to solve fractions online free', 'fraction to decimal converter with steps']
    }
  }
};
