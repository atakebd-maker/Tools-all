import { ToolItem } from './tools';

// 1. Math Calculators
import {
  BasicCalculator,
  LongDivisionCalculator,
  AverageCalculator,
  PercentageCalculator,
  FractionCalculator,
  DecimalCalculator,
  RatioCalculator,
  ProportionCalculator,
  SquareRootCalculator,
  CubeRootCalculator,
  ExponentCalculator,
  HcfLcmCalculator,
  PrimeNumberChecker,
  RoundingCalculator,
  AbsoluteValueCalculator,
  ModuloCalculator,
  ScientificCalculator,
  RandomNumberGenerator
} from '../tools/calculators/MathCalculators';

// 2. Cricket Calculators
import {
  CricketBattingAverageCalculator,
  CricketStrikeRateCalculator,
  CricketBowlingAverageCalculator,
  CricketEconomyRateCalculator,
  RequiredRunRateCalculator,
  CurrentRunRateCalculator,
  RunChaseCalculator,
  PartnershipRunRateCalculator
} from '../tools/calculators/CricketCalculators';

// 3. Finance Calculators
import {
  DiscountCalculator,
  ProfitLossCalculator,
  MarkupCalculator,
  MarginCalculator,
  SimpleInterestCalculator,
  CompoundInterestCalculator,
  LoanEmiCalculator,
  SalesTaxCalculator,
  GstCalculator,
  TipCalculator,
  SplitBillCalculator,
  PercentageIncreaseDecreaseCalculator
} from '../tools/calculators/FinanceCalculators';

// 4. Date & Time Calculators
import {
  AgeCalculator,
  DateDifferenceCalculator,
  DaysBetweenDatesCalculator,
  TimeDurationCalculator,
  HoursToMinutesConverter,
  MinutesToSecondsConverter,
  CountdownCalculator
} from '../tools/calculators/DateTimeCalculators';

// 5. Unit Converters
import {
  LengthConverter,
  WeightConverter,
  TemperatureConverter,
  AreaConverter,
  VolumeConverter,
  SpeedConverter,
  TimeUnitConverter,
  DataStorageConverter,
  PressureConverter,
  EnergyConverter
} from '../tools/calculators/UnitConvertersSuite';

// 6. Health Calculators
import {
  BmiCalculator,
  BmrCalculator,
  DailyCalorieCalculator,
  IdealWeightEstimator,
  WaterIntakeEstimator
} from '../tools/calculators/HealthCalculators';

export const CALCULATOR_TOOLS: ToolItem[] = [
  // ==========================================
  // BASIC MATHEMATICS (18 TOOLS)
  // ==========================================
  {
    id: 'basic-calculator',
    name: 'Basic Calculator',
    slug: 'basic-calculator',
    category: 'calculator-tools',
    popular: true,
    description: 'Perform instant arithmetic calculations with clean keypad buttons directly in your browser.',
    keywords: ['basic calculator', 'simple calculator online', 'free math calculator', 'addition subtraction'],
    component: BasicCalculator,
    instructions: [
      'Enter numbers using on-screen buttons or keyboard.',
      'Select mathematical operators (+, -, ×, ÷).',
      'Press "=" to compute result or "C" to clear.'
    ],
    limitations: ['Computes numbers up to 10 decimal digits.'],
    faqs: [{ q: 'Is this calculator free?', a: 'Yes, 100% free with client-side computation.' }]
  },
  {
    id: 'long-division-calculator',
    name: 'Long Division Calculator',
    slug: 'long-division-calculator',
    category: 'calculator-tools',
    popular: true,
    description: 'Solve long division problems with traditional vertical school-style notation, quotient, remainder, and step-by-step subtractions.',
    keywords: ['long division calculator', 'school style division', 'long division with remainder', 'long division steps'],
    component: LongDivisionCalculator,
    instructions: [
      'Enter the Dividend (number to be divided).',
      'Enter the Divisor (number dividing by).',
      'Click Calculate to see the vertical school-style division bracket and step-by-step subtractions.'
    ],
    limitations: ['Supports integer division and produces exact quotient and remainder.'],
    faqs: [
      { q: 'How does it display steps?', a: 'It displays traditional school division with divisor, bracket, quotient, and vertical subtractions.' }
    ]
  },
  {
    id: 'average-calculator',
    name: 'Average Calculator',
    slug: 'average-calculator',
    category: 'calculator-tools',
    popular: true,
    description: 'Calculate Mean (Average), Median, Mode, Range, Sum, and Count for any set of numbers separated by commas or spaces.',
    keywords: ['average calculator', 'mean median mode calculator', 'find average online', 'range calculator'],
    component: AverageCalculator,
    instructions: [
      'Enter your list of numbers separated by commas, spaces, or lines.',
      'The calculator instantly displays the Mean, Median, Mode, and Range.'
    ],
    limitations: ['Accepts arbitrary real numbers.'],
    faqs: [{ q: 'What delimiters are supported?', a: 'Commas, spaces, semicolons, and newlines.' }]
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    slug: 'percentage-calculator',
    category: 'calculator-tools',
    popular: true,
    description: 'Calculate what is X% of Y, X is what percent of Y, and percentage increase or decrease.',
    keywords: ['percentage calculator', 'calculate percent', 'percentage difference', 'percentage of a number'],
    component: PercentageCalculator,
    instructions: [
      'Choose the percentage formula you need.',
      'Input the corresponding values.',
      'View instant computed percentage results.'
    ],
    limitations: ['Real-time calculation with 2 decimal precision.'],
    faqs: [{ q: 'Does it calculate discounts?', a: 'Yes, both discount percentages and percentage changes are supported.' }]
  },
  {
    id: 'fraction-calculator',
    name: 'Fraction Calculator',
    slug: 'fraction-calculator',
    category: 'calculator-tools',
    popular: true,
    description: 'Add, subtract, multiply, and divide fractions with automated lowest-term simplification and mixed numbers.',
    keywords: ['fraction calculator', 'simplify fractions', 'fraction addition', 'mixed fraction converter'],
    component: FractionCalculator,
    instructions: [
      'Enter numerators and denominators for both fractions.',
      'Select mathematical operation (+, -, ×, ÷).',
      'Result displays in simplified fraction, mixed fraction, and decimal forms.'
    ],
    limitations: ['Denominators cannot be zero.'],
    faqs: [{ q: 'Does it reduce fractions to lowest terms?', a: 'Yes, it uses greatest common divisor (GCD) simplification automatically.' }]
  },
  {
    id: 'decimal-calculator',
    name: 'Decimal Calculator',
    slug: 'decimal-calculator',
    category: 'calculator-tools',
    description: 'Perform precise decimal arithmetic and convert floating decimal values into exact simplified fractions.',
    keywords: ['decimal calculator', 'decimal to fraction', 'precise decimal operations'],
    component: DecimalCalculator,
    instructions: [
      'Enter decimal numbers.',
      'Select arithmetic operation.',
      'View calculation result and fractional conversion.'
    ],
    limitations: ['Floating point precision up to 8 decimal places.'],
    faqs: [{ q: 'Can it convert 0.75 to 3/4?', a: 'Yes, exact rational fraction equivalents are calculated.' }]
  },
  {
    id: 'ratio-calculator',
    name: 'Ratio Calculator',
    slug: 'ratio-calculator',
    category: 'calculator-tools',
    description: 'Solve proportions in the format A : B = C : D to find the unknown missing variable.',
    keywords: ['ratio calculator', 'solve proportion', 'ratio simplifier', 'find d in ratio'],
    component: RatioCalculator,
    instructions: [
      'Enter values for A, B, and C.',
      'The calculator computes the missing term D automatically.'
    ],
    limitations: ['A cannot be zero in proportion solving.'],
    faqs: [{ q: 'What is the formula?', a: 'D = (B × C) ÷ A.' }]
  },
  {
    id: 'proportion-calculator',
    name: 'Proportion Calculator',
    slug: 'proportion-calculator',
    category: 'calculator-tools',
    description: 'Calculate direct and inverse proportionality with constant of proportionality explanations.',
    keywords: ['proportion calculator', 'direct proportion', 'inverse proportion', 'constant of proportionality'],
    component: ProportionCalculator,
    instructions: [
      'Select Direct Proportion (y ∝ x) or Inverse Proportion (y ∝ 1/x).',
      'Enter known x1, y1 and new x2 values.',
      'The calculator computes the resulting y2 value.'
    ],
    limitations: ['Input variables cannot be zero for inverse proportions.'],
    faqs: [{ q: 'When to use direct proportion?', a: 'When an increase in x leads to a proportional increase in y.' }]
  },
  {
    id: 'square-root-calculator',
    name: 'Square Root Calculator',
    slug: 'square-root-calculator',
    category: 'calculator-tools',
    description: 'Compute principal square roots, radical simplification (e.g. √72 = 6√2), and test for perfect squares.',
    keywords: ['square root calculator', 'sqrt calculator', 'simplify radical', 'perfect square checker'],
    component: SquareRootCalculator,
    instructions: [
      'Enter any positive real number.',
      'View the decimal square root, simplified radical form, and perfect square verification.'
    ],
    limitations: ['Principal real square roots only (non-negative).'],
    faqs: [{ q: 'Can it simplify radicals?', a: 'Yes, it factors out largest square factors (e.g. √72 becomes 6√2).' }]
  },
  {
    id: 'cube-root-calculator',
    name: 'Cube Root Calculator',
    slug: 'cube-root-calculator',
    category: 'calculator-tools',
    description: 'Compute cube roots (∛x) of real numbers and identify perfect cube numbers.',
    keywords: ['cube root calculator', 'cbrt calculator', 'perfect cube checker'],
    component: CubeRootCalculator,
    instructions: [
      'Enter any positive or negative number.',
      'View the accurate cube root and perfect cube status.'
    ],
    limitations: ['Supports real numbers including negatives.'],
    faqs: [{ q: 'Does it work for negative numbers?', a: 'Yes, ∛(-8) = -2.' }]
  },
  {
    id: 'exponent-calculator',
    name: 'Exponent Calculator',
    slug: 'exponent-calculator',
    category: 'calculator-tools',
    description: 'Calculate base raised to the power of an exponent, supporting negative and decimal exponents.',
    keywords: ['exponent calculator', 'power calculator', 'base and exponent', 'scientific powers'],
    component: ExponentCalculator,
    instructions: [
      'Enter base number (b).',
      'Enter exponent power (n).',
      'Result displays formatted in standard numbers and scientific notation.'
    ],
    limitations: ['Handles powers within standard 64-bit IEEE floating limits.'],
    faqs: [{ q: 'Are negative powers supported?', a: 'Yes, 2^-3 = 0.125.' }]
  },
  {
    id: 'hcf-lcm-calculator',
    name: 'HCF and LCM Calculator',
    slug: 'hcf-lcm-calculator',
    category: 'calculator-tools',
    popular: true,
    description: 'Find Highest Common Factor (GCD) and Least Common Multiple (LCM) of numbers using Euclidean algorithm.',
    keywords: ['hcf calculator', 'lcm calculator', 'gcd calculator', 'highest common factor', 'least common multiple'],
    component: HcfLcmCalculator,
    instructions: [
      'Enter the first integer.',
      'Enter the second integer.',
      'View both HCF (GCD) and LCM results simultaneously.'
    ],
    limitations: ['Works on positive and negative integers.'],
    faqs: [{ q: 'What is the relationship between HCF and LCM?', a: 'HCF(a,b) × LCM(a,b) = |a × b|.' }]
  },
  {
    id: 'prime-number-checker',
    name: 'Prime Number Checker',
    slug: 'prime-number-checker',
    category: 'calculator-tools',
    description: 'Check if any integer is prime or composite, list all divisors/factors, and locate the next prime number.',
    keywords: ['prime number checker', 'is it prime', 'find factors', 'composite number test'],
    component: PrimeNumberChecker,
    instructions: [
      'Enter an integer to test.',
      'The tool determines if it is prime or composite and lists all factors.'
    ],
    limitations: ['Optimized for fast trial division up to large integers.'],
    faqs: [{ q: 'Is 1 a prime number?', a: 'No, by mathematical definition, 1 is neither prime nor composite.' }]
  },
  {
    id: 'rounding-calculator',
    name: 'Rounding Calculator',
    slug: 'rounding-calculator',
    category: 'calculator-tools',
    description: 'Round numbers to nearest whole integer, tenths, hundredths, tens, hundreds, ceiling, and floor.',
    keywords: ['rounding calculator', 'round numbers online', 'round to nearest tenth', 'ceiling floor round'],
    component: RoundingCalculator,
    instructions: [
      'Enter any decimal number.',
      'View all rounding options side-by-side.'
    ],
    limitations: ['Standard half-up arithmetic rounding rules.'],
    faqs: [{ q: 'What is ceiling and floor?', a: 'Ceiling rounds up to the next integer; floor rounds down.' }]
  },
  {
    id: 'absolute-value-calculator',
    name: 'Absolute Value Calculator',
    slug: 'absolute-value-calculator',
    category: 'calculator-tools',
    description: 'Find the absolute value (|x|) and distance from zero of any positive or negative real number.',
    keywords: ['absolute value calculator', 'modulus calculator', 'distance from zero'],
    component: AbsoluteValueCalculator,
    instructions: [
      'Enter a real number.',
      'View the non-negative magnitude.'
    ],
    limitations: ['Supports all real numbers.'],
    faqs: [{ q: 'Why is absolute value non-negative?', a: 'Because it represents distance on the number line, which cannot be negative.' }]
  },
  {
    id: 'modulo-calculator',
    name: 'Modulo Calculator',
    slug: 'modulo-calculator',
    category: 'calculator-tools',
    description: 'Calculate the modulo (remainder) of integer division with full quotient and remainder equation.',
    keywords: ['modulo calculator', 'mod calculator', 'remainder calculator', 'integer division'],
    component: ModuloCalculator,
    instructions: [
      'Enter the dividend (a).',
      'Enter the divisor (n).',
      'View the remainder and full equation a = q × n + r.'
    ],
    limitations: ['Divisor must be non-zero.'],
    faqs: [{ q: 'What is 29 mod 6?', a: '29 mod 6 = 5 (since 6 × 4 = 24, remainder is 5).' }]
  },
  {
    id: 'scientific-calculator',
    name: 'Scientific Calculator',
    slug: 'scientific-calculator',
    category: 'calculator-tools',
    popular: true,
    description: 'Scientific calculator featuring trigonometry in DEG/RAD modes, logarithms, factorials, and constants.',
    keywords: ['scientific calculator', 'trig calculator', 'sin cos tan', 'log ln factorial online'],
    component: ScientificCalculator,
    instructions: [
      'Choose degree (DEG) or radian (RAD) mode.',
      'Use trigonometric, exponential, and logarithmic functions.'
    ],
    limitations: ['Client-side trigonometric and logarithmic functions.'],
    faqs: [{ q: 'Can it calculate factorials?', a: 'Yes, supports factorials up to 20!.' }]
  },
  {
    id: 'random-number-generator',
    name: 'Random Number Generator',
    slug: 'random-number-generator',
    category: 'calculator-tools',
    popular: true,
    description: 'Generate unbiased random numbers within any custom range with optional duplicate prevention.',
    keywords: ['random number generator', 'rng online', 'random pick number', 'pick random digits'],
    component: RandomNumberGenerator,
    instructions: [
      'Set minimum and maximum boundaries.',
      'Specify quantity of numbers.',
      'Toggle duplicate allowance and click Generate.'
    ],
    limitations: ['Generates up to 100 numbers per batch.'],
    faqs: [{ q: 'Can numbers repeat?', a: 'You can check or uncheck "Allow duplicate numbers".' }]
  },

  // ==========================================
  // SPORTS AND CRICKET (8 TOOLS)
  // ==========================================
  {
    id: 'cricket-batting-average-calculator',
    name: 'Cricket Batting Average Calculator',
    slug: 'cricket-batting-average-calculator',
    category: 'sports-cricket-calculators',
    popular: true,
    description: 'Compute cricket batting averages using official ICC rules where Not Out innings do not count as dismissals.',
    keywords: ['cricket batting average calculator', 'icc batting average', 'cricket batsman stats', 'not out average'],
    component: CricketBattingAverageCalculator,
    instructions: [
      'Select Career Summary mode or Match-by-Match innings mode.',
      'Enter runs scored and mark if batsman was Not Out (*).',
      'The calculator computes Average = Total Runs ÷ Dismissals.'
    ],
    limitations: ['Official ICC rules: Batting Average = Total Runs / (Innings - Not Outs).'],
    faqs: [
      { q: 'Why do not-outs increase average?', a: 'Because an average measures runs scored per dismissal, not per inning batted.' }
    ]
  },
  {
    id: 'cricket-strike-rate-calculator',
    name: 'Cricket Strike Rate Calculator',
    slug: 'cricket-strike-rate-calculator',
    category: 'sports-cricket-calculators',
    popular: true,
    description: 'Calculate cricket batsman strike rate (runs scored per 100 balls) and runs per ball.',
    keywords: ['cricket strike rate calculator', 't20 strike rate', 'batsman strike rate', 'runs per ball'],
    component: CricketStrikeRateCalculator,
    instructions: [
      'Enter runs scored by the batsman.',
      'Enter total legal balls faced.',
      'View Strike Rate (SR) and Runs Per Ball (RPB).'
    ],
    limitations: ['Balls faced must be at least 1.'],
    faqs: [{ q: 'What is a good T20 strike rate?', a: 'A strike rate over 140 is considered excellent in modern T20 cricket.' }]
  },
  {
    id: 'cricket-bowling-average-calculator',
    name: 'Cricket Bowling Average Calculator',
    slug: 'cricket-bowling-average-calculator',
    category: 'sports-cricket-calculators',
    description: 'Calculate bowling average (runs conceded per wicket) and bowling strike rate (balls bowled per wicket).',
    keywords: ['cricket bowling average calculator', 'bowling strike rate', 'bowler average', 'wickets average'],
    component: CricketBowlingAverageCalculator,
    instructions: [
      'Enter total runs conceded.',
      'Enter wickets taken.',
      'Optionally enter overs bowled to compute bowling strike rate.'
    ],
    limitations: ['Wickets taken must be at least 1 for average calculation.'],
    faqs: [{ q: 'What is a bowling strike rate?', a: 'The average number of legal balls bowled before taking a wicket.' }]
  },
  {
    id: 'cricket-economy-rate-calculator',
    name: 'Cricket Economy Rate Calculator',
    slug: 'cricket-economy-rate-calculator',
    category: 'sports-cricket-calculators',
    popular: true,
    description: 'Calculate bowler economy rate per over with accurate parsing of partial overs (e.g. 4.2 overs = 26 balls).',
    keywords: ['cricket economy rate calculator', 'bowling economy rate', 'runs per over bowler', 't20 economy'],
    component: CricketEconomyRateCalculator,
    instructions: [
      'Enter total runs conceded by the bowler.',
      'Enter overs bowled using cricket notation (e.g. 4.3 for 4 overs and 3 balls).',
      'View the accurate economy rate per 6-ball over.'
    ],
    limitations: ['Correctly converts overs.balls into exact legal balls.'],
    faqs: [{ q: 'How does 4.2 overs calculate?', a: '4 overs (24 balls) + 2 balls = 26 balls = 4.333 decimal overs.' }]
  },
  {
    id: 'required-run-rate-calculator',
    name: 'Required Run Rate Calculator',
    slug: 'required-run-rate-calculator',
    category: 'sports-cricket-calculators',
    popular: true,
    description: 'Determine required run rate (RRR) and runs required per ball to successfully win a run chase.',
    keywords: ['required run rate calculator', 'rrr calculator cricket', 'runs needed per over', 'chase calculator'],
    component: RequiredRunRateCalculator,
    instructions: [
      'Enter the target score needed to win.',
      'Enter current batting team score.',
      'Enter overs remaining (e.g. 6.4).',
      'View Required Run Rate and runs needed per remaining ball.'
    ],
    limitations: ['Handles partial overs with fractional ball precision.'],
    faqs: [{ q: 'What is RRR?', a: 'Required Run Rate is the average runs per over needed to reach the target.' }]
  },
  {
    id: 'current-run-rate-calculator',
    name: 'Current Run Rate Calculator',
    slug: 'current-run-rate-calculator',
    category: 'sports-cricket-calculators',
    description: 'Calculate batting current run rate (CRR) and projected innings totals for 20-over and 50-over matches.',
    keywords: ['current run rate calculator', 'crr cricket', 'projected score calculator', 'runs per over'],
    component: CurrentRunRateCalculator,
    instructions: [
      'Enter current score.',
      'Enter overs completed (e.g. 15.3).',
      'View Current Run Rate and projected totals at 20 and 50 overs.'
    ],
    limitations: ['Projects scores assuming the current scoring tempo is maintained.'],
    faqs: [{ q: 'How is CRR calculated?', a: 'CRR = Total Runs ÷ (Legal Balls Bowled ÷ 6).' }]
  },
  {
    id: 'run-chase-calculator',
    name: 'Run Chase Calculator',
    slug: 'run-chase-calculator',
    category: 'sports-cricket-calculators',
    description: 'Complete second innings chase equation with balls remaining, current vs required rates, and wickets in hand.',
    keywords: ['run chase calculator', 'cricket chase equation', 'target chase calculator', 'balls remaining cricket'],
    component: RunChaseCalculator,
    instructions: [
      'Enter target score, current runs, overs bowled, and wickets down.',
      'Inspect runs needed, balls left, and comparison between CRR and RRR.'
    ],
    limitations: ['Supports 20-over, 50-over, and custom match lengths.'],
    faqs: [{ q: 'Can I set match overs to 50?', a: 'Yes, you can adjust match overs to 20, 50, or any custom length.' }]
  },
  {
    id: 'partnership-run-rate-calculator',
    name: 'Partnership Run Rate Calculator',
    slug: 'partnership-run-rate-calculator',
    category: 'sports-cricket-calculators',
    description: 'Calculate partnership run rate, scoring strike rate, and individual batsman contribution percentages.',
    keywords: ['partnership run rate calculator', 'cricket partnership stats', 'batting partnership calculator'],
    component: PartnershipRunRateCalculator,
    instructions: [
      'Enter total partnership runs and balls faced.',
      'Enter runs scored by each batter.',
      'View partnership run rate and percentage share of each batter.'
    ],
    limitations: ['Balls faced must be at least 1.'],
    faqs: [{ q: 'What does contribution share mean?', a: 'The percentage of the total partnership runs scored by that batsman.' }]
  },

  // ==========================================
  // FINANCE AND SHOPPING (12 TOOLS)
  // ==========================================
  {
    id: 'discount-calculator',
    name: 'Discount Calculator',
    slug: 'discount-calculator',
    category: 'calculator-tools',
    popular: true,
    description: 'Calculate sale price, total money saved, and stacked coupon discounts on shopping items.',
    keywords: ['discount calculator', 'sale price calculator', 'shopping discount', 'coupon calculator'],
    component: DiscountCalculator,
    instructions: [
      'Enter original price.',
      'Enter primary discount percentage.',
      'Optionally add extra coupon discount percentage.'
    ],
    limitations: ['Discounts apply sequentially for stacked coupons.'],
    faqs: [{ q: 'Can I calculate stacked discounts?', a: 'Yes, enter an additional coupon percentage to stack discounts.' }]
  },
  {
    id: 'profit-and-loss-calculator',
    name: 'Profit and Loss Calculator',
    slug: 'profit-and-loss-calculator',
    category: 'calculator-tools',
    popular: true,
    description: 'Determine net profit or loss amount and percentage return on investment from cost and selling price.',
    keywords: ['profit and loss calculator', 'p&l calculator', 'profit margin', 'calculate profit percentage'],
    component: ProfitLossCalculator,
    instructions: [
      'Enter Cost Price (CP).',
      'Enter Selling Price (SP).',
      'View whether it is a profit or loss, the dollar amount, and percentage.'
    ],
    limitations: ['Cost price must be greater than zero for percentage calculation.'],
    faqs: [{ q: 'What is the profit formula?', a: 'Profit % = ((Selling Price - Cost Price) ÷ Cost Price) × 100.' }]
  },
  {
    id: 'markup-calculator',
    name: 'Markup Calculator',
    slug: 'markup-calculator',
    category: 'calculator-tools',
    description: 'Calculate retail selling price from wholesale cost and markup percentage, with equivalent profit margin.',
    keywords: ['markup calculator', 'cost markup', 'markup to margin', 'retail price markup'],
    component: MarkupCalculator,
    instructions: [
      'Enter cost price.',
      'Enter desired markup percentage.',
      'View required selling price and profit.'
    ],
    limitations: ['Markup is calculated relative to cost price.'],
    faqs: [{ q: 'How is markup different from margin?', a: 'Markup is based on cost; margin is based on selling price.' }]
  },
  {
    id: 'margin-calculator',
    name: 'Margin Calculator',
    slug: 'margin-calculator',
    category: 'calculator-tools',
    description: 'Calculate gross profit margin percentage and compare with markup on cost.',
    keywords: ['margin calculator', 'gross profit margin', 'profit margin percentage', 'cogs margin'],
    component: MarginCalculator,
    instructions: [
      'Enter revenue (selling price).',
      'Enter Cost of Goods Sold (COGS).',
      'View gross profit margin and equivalent markup.'
    ],
    limitations: ['Revenue must be greater than zero.'],
    faqs: [{ q: 'What is gross margin?', a: 'The percentage of revenue that exceeds the cost of goods sold.' }]
  },
  {
    id: 'simple-interest-calculator',
    name: 'Simple Interest Calculator',
    slug: 'simple-interest-calculator',
    category: 'calculator-tools',
    description: 'Calculate simple interest and maturity amount based on principal, annual rate, and time.',
    keywords: ['simple interest calculator', 'si calculator', 'interest maturity', 'loan interest simple'],
    component: SimpleInterestCalculator,
    instructions: [
      'Enter principal investment amount.',
      'Enter annual interest rate percentage.',
      'Enter time horizon in years.'
    ],
    limitations: ['Simple interest does not compound.'],
    faqs: [{ q: 'What is the simple interest formula?', a: 'SI = (P × R × T) ÷ 100.' }]
  },
  {
    id: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    slug: 'compound-interest-calculator',
    category: 'calculator-tools',
    popular: true,
    description: 'Estimate investment growth with compounding frequencies: monthly, quarterly, semi-annually, or annually.',
    keywords: ['compound interest calculator', 'investment compound calculator', 'interest growth', 'apy calculator'],
    component: CompoundInterestCalculator,
    instructions: [
      'Enter initial investment principal.',
      'Enter annual interest rate and duration in years.',
      'Choose compounding frequency.'
    ],
    limitations: ['Continuous compounding is approximated via daily frequency.'],
    faqs: [{ q: 'How often should interest compound?', a: 'Most savings and loan accounts compound monthly.' }]
  },
  {
    id: 'loan-emi-calculator',
    name: 'Loan EMI Calculator',
    slug: 'loan-emi-calculator',
    category: 'calculator-tools',
    popular: true,
    description: 'Calculate monthly loan EMI payments, total interest payable, and total loan cost for mortgages or auto loans.',
    keywords: ['loan emi calculator', 'emi calculator', 'mortgage payment calculator', 'car loan emi'],
    component: LoanEmiCalculator,
    instructions: [
      'Enter loan principal amount.',
      'Enter annual interest rate percentage.',
      'Enter loan tenure in years.',
      'View monthly EMI and total interest breakdown.'
    ],
    limitations: ['Standard reducing balance amortization.'],
    faqs: [{ q: 'What does EMI stand for?', a: 'Equated Monthly Installment.' }]
  },
  {
    id: 'sales-tax-calculator',
    name: 'Sales Tax Calculator',
    slug: 'sales-tax-calculator',
    category: 'calculator-tools',
    description: 'Compute sales tax amount and total price with tax, or reverse calculate net price.',
    keywords: ['sales tax calculator', 'tax amount calculator', 'price after tax', 'state tax calculator'],
    component: SalesTaxCalculator,
    instructions: [
      'Enter net price before tax.',
      'Enter sales tax rate percentage.',
      'View tax amount and gross total.'
    ],
    limitations: ['Standard single-tier ad valorem sales tax.'],
    faqs: [{ q: 'Does this calculate VAT?', a: 'Yes, sales tax and single-rate VAT operate on the same percentage formula.' }]
  },
  {
    id: 'gst-calculator',
    name: 'GST Calculator',
    slug: 'gst-calculator',
    category: 'calculator-tools',
    popular: true,
    description: 'Calculate Goods and Services Tax in exclusive and inclusive modes with CGST and SGST splits.',
    keywords: ['gst calculator', 'goods and services tax', 'gst inclusive', 'gst exclusive', 'cgst sgst calculator'],
    component: GstCalculator,
    instructions: [
      'Select GST Exclusive (add GST) or GST Inclusive (extract GST).',
      'Enter amount and select GST slab rate (5%, 12%, 18%, 28%).',
      'View net price, GST amount, and CGST/SGST split.'
    ],
    limitations: ['CGST and SGST are split 50/50 from total GST according to standard tax rules.'],
    faqs: [{ q: 'What is GST inclusive?', a: 'When the invoice amount already includes GST and you want to extract the net base price.' }]
  },
  {
    id: 'tip-calculator',
    name: 'Tip Calculator',
    slug: 'tip-calculator',
    category: 'calculator-tools',
    popular: true,
    description: 'Calculate restaurant tips and evenly split dinner bills across any party size.',
    keywords: ['tip calculator', 'restaurant tip', 'split tip', 'bill tip calculator'],
    component: TipCalculator,
    instructions: [
      'Enter the restaurant bill total.',
      'Select tip percentage (10%, 15%, 18%, 20%, 25% or custom).',
      'Enter number of people splitting.',
      'View tip per person and total per person.'
    ],
    limitations: ['Splits tip and total evenly among party members.'],
    faqs: [{ q: 'What is standard tipping percentage?', a: 'In the US and Canada, 15% to 20% is customary for good service.' }]
  },
  {
    id: 'split-bill-calculator',
    name: 'Split Bill Calculator',
    slug: 'split-bill-calculator',
    category: 'calculator-tools',
    description: 'Divide group restaurant, grocery, or vacation expenses fairly with tax and tip inclusions.',
    keywords: ['split bill calculator', 'divide bill', 'split check', 'group expense splitter'],
    component: SplitBillCalculator,
    instructions: [
      'Enter subtotal, tax, and tip amounts.',
      'Enter group size.',
      'View total bill and each person\'s exact share.'
    ],
    limitations: ['Computes equal splits for groups of any size.'],
    faqs: [{ q: 'Can I add tax and tip separately?', a: 'Yes, fields are provided for subtotal, tax, and tip.' }]
  },
  {
    id: 'percentage-increase-decrease-calculator',
    name: 'Percentage Increase and Decrease Calculator',
    slug: 'percentage-increase-decrease-calculator',
    category: 'calculator-tools',
    popular: true,
    description: 'Compute exact percentage increase or decrease between initial and final values.',
    keywords: ['percentage increase calculator', 'percentage decrease calculator', 'percent change', 'relative change'],
    component: PercentageIncreaseDecreaseCalculator,
    instructions: [
      'Enter initial value (starting point).',
      'Enter final value (ending point).',
      'The tool determines if it is an increase or decrease and computes the percentage change.'
    ],
    limitations: ['Initial value cannot be zero.'],
    faqs: [{ q: 'What is the formula?', a: 'Percentage Change = ((Final - Initial) ÷ |Initial|) × 100.' }]
  },

  // ==========================================
  // DATE AND TIME (7 TOOLS)
  // ==========================================
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    slug: 'age-calculator',
    category: 'date-time-tools',
    popular: true,
    description: 'Calculate exact chronological age in years, months, and days, total days lived, and countdown to next birthday.',
    keywords: ['age calculator', 'calculate exact age', 'how old am i', 'days until birthday'],
    component: AgeCalculator,
    instructions: [
      'Select your date of birth.',
      'Optionally change the target date to calculate age at any specific point in history.',
      'View detailed age breakdown in years, months, days, and total hours.'
    ],
    limitations: ['Accurate across leap years and variable month lengths.'],
    faqs: [{ q: 'Does it account for leap years?', a: 'Yes, leap years are fully accounted for.' }]
  },
  {
    id: 'date-difference-calculator',
    name: 'Date Difference Calculator',
    slug: 'date-difference-calculator',
    category: 'date-time-tools',
    popular: true,
    description: 'Find duration between two dates in days, weeks, months, and calendar years.',
    keywords: ['date difference calculator', 'days between dates', 'duration between two dates', 'calendar days diff'],
    component: DateDifferenceCalculator,
    instructions: [
      'Select start date.',
      'Select end date.',
      'View elapsed time in days, weeks, months, and years.'
    ],
    limitations: ['Gregorian calendar calculations.'],
    faqs: [{ q: 'Can start date be after end date?', a: 'Yes, absolute elapsed difference is computed.' }]
  },
  {
    id: 'days-between-dates-calculator',
    name: 'Days Between Dates Calculator',
    slug: 'days-between-dates-calculator',
    category: 'date-time-tools',
    description: 'Count calendar days, working business days (Mon-Fri), and weekend days between any two dates.',
    keywords: ['days between dates calculator', 'count days', 'business days calculator', 'work days between dates'],
    component: DaysBetweenDatesCalculator,
    instructions: [
      'Select start date and end date.',
      'Optionally toggle inclusion of the end day.',
      'View total days, weekdays, and weekend days.'
    ],
    limitations: ['Weekdays include Monday through Friday.'],
    faqs: [{ q: 'Can I include both start and end days?', a: 'Yes, check the "Include end day" checkbox.' }]
  },
  {
    id: 'time-duration-calculator',
    name: 'Time Duration Calculator',
    slug: 'time-duration-calculator',
    category: 'date-time-tools',
    description: 'Add or subtract hours and minutes with instant total duration and decimal hour equivalents.',
    keywords: ['time duration calculator', 'add hours and minutes', 'subtract time', 'time adder online'],
    component: TimeDurationCalculator,
    instructions: [
      'Enter hours and minutes for Time 1.',
      'Select Add (+) or Subtract (-).',
      'Enter hours and minutes for Time 2.',
      'View total combined duration.'
    ],
    limitations: ['Supports calculations spanning multiple days.'],
    faqs: [{ q: 'Does it show decimal hours?', a: 'Yes, decimal hours (e.g. 3.75 hours) are displayed.' }]
  },
  {
    id: 'hours-to-minutes-converter',
    name: 'Hours to Minutes Converter',
    slug: 'hours-to-minutes-converter',
    category: 'date-time-tools',
    description: 'Convert decimal hours into minutes, seconds, and clock hours and minutes format.',
    keywords: ['hours to minutes converter', 'decimal hours to minutes', 'hours into seconds'],
    component: HoursToMinutesConverter,
    instructions: [
      'Enter hours (e.g. 2.75).',
      'View converted minutes, formatted hours and minutes, and total seconds.'
    ],
    limitations: ['High precision decimal conversion.'],
    faqs: [{ q: 'What is 1.5 hours in minutes?', a: '1.5 hours is 90 minutes (1 hour and 30 minutes).' }]
  },
  {
    id: 'minutes-to-seconds-converter',
    name: 'Minutes to Seconds Converter',
    slug: 'minutes-to-seconds-converter',
    category: 'date-time-tools',
    description: 'Convert minutes into seconds and fractional hours.',
    keywords: ['minutes to seconds converter', 'min to sec', 'convert minutes into seconds'],
    component: MinutesToSecondsConverter,
    instructions: [
      'Enter minutes (e.g. 45.5).',
      'View total seconds and fractional hours.'
    ],
    limitations: ['Instant client-side conversion.'],
    faqs: [{ q: 'How many seconds in a minute?', a: 'There are exactly 60 seconds in 1 minute.' }]
  },
  {
    id: 'countdown-calculator',
    name: 'Countdown Calculator',
    slug: 'countdown-calculator',
    category: 'date-time-tools',
    popular: true,
    description: 'Live real-time countdown timer to any upcoming event, holiday, or deadline.',
    keywords: ['countdown calculator', 'event countdown', 'days until date', 'live countdown timer'],
    component: CountdownCalculator,
    instructions: [
      'Pick a target future date and time.',
      'Watch the live seconds, minutes, hours, and days count down in real time.'
    ],
    limitations: ['Updates every second using local device clock.'],
    faqs: [{ q: 'Does the timer run offline?', a: 'Yes, it computes relative to your device time.' }]
  },

  // ==========================================
  // UNIT CONVERTERS (10 TOOLS)
  // ==========================================
  {
    id: 'length-converter',
    name: 'Length Converter',
    slug: 'length-converter',
    category: 'unit-converters',
    popular: true,
    description: 'Convert between metric and imperial length units: meters, kilometers, feet, inches, miles, and yards.',
    keywords: ['length converter', 'meters to feet', 'km to miles', 'inches to cm', 'distance converter'],
    component: LengthConverter,
    instructions: [
      'Enter value and select input unit.',
      'Select desired target unit.',
      'View instant conversion and full multi-unit conversion matrix.'
    ],
    limitations: ['Standard international SI and imperial conversion factors.'],
    faqs: [{ q: 'How many feet in a meter?', a: '1 meter is approximately 3.28084 feet.' }]
  },
  {
    id: 'weight-converter',
    name: 'Weight Converter',
    slug: 'weight-converter',
    category: 'unit-converters',
    popular: true,
    description: 'Convert between kilograms, grams, pounds (lbs), ounces (oz), metric tons, and stones.',
    keywords: ['weight converter', 'kg to lbs', 'pounds to kilograms', 'grams to ounces', 'mass converter'],
    component: WeightConverter,
    instructions: [
      'Enter weight value.',
      'Choose source unit and target unit.',
      'View precise mass conversion.'
    ],
    limitations: ['Standard international avoirdupois weight definitions.'],
    faqs: [{ q: 'How many pounds in a kilogram?', a: '1 kilogram equals approximately 2.20462 pounds.' }]
  },
  {
    id: 'temperature-converter',
    name: 'Temperature Converter',
    slug: 'temperature-converter',
    category: 'unit-converters',
    popular: true,
    description: 'Convert temperature between Celsius (°C), Fahrenheit (°F), Kelvin (K), and Rankine (°R) scales.',
    keywords: ['temperature converter', 'celsius to fahrenheit', 'fahrenheit to celsius', 'kelvin to celsius'],
    component: TemperatureConverter,
    instructions: [
      'Enter temperature value.',
      'Select source scale (°C, °F, K, °R).',
      'View converted values across all four temperature scales simultaneously.'
    ],
    limitations: ['Accurate scientific thermodynamic scale conversions.'],
    faqs: [{ q: 'What is 0 degrees Celsius in Fahrenheit?', a: '0°C is 32°F.' }]
  },
  {
    id: 'area-converter',
    name: 'Area Converter',
    slug: 'area-converter',
    category: 'unit-converters',
    description: 'Convert between square meters, square feet, acres, hectares, square kilometers, and square yards.',
    keywords: ['area converter', 'sq meters to sq feet', 'acres to hectares', 'land area converter'],
    component: AreaConverter,
    instructions: [
      'Enter area value.',
      'Select source and target units.',
      'View conversion result and quick comparison matrix.'
    ],
    limitations: ['Land and surface area conversion.'],
    faqs: [{ q: 'How many square feet in an acre?', a: '1 acre is exactly 43,560 square feet.' }]
  },
  {
    id: 'volume-converter',
    name: 'Volume Converter',
    slug: 'volume-converter',
    category: 'unit-converters',
    description: 'Convert between liters, milliliters, US gallons, UK gallons, cubic meters, and fluid ounces.',
    keywords: ['volume converter', 'liters to gallons', 'gallons to liters', 'fluid ounces to ml'],
    component: VolumeConverter,
    instructions: [
      'Enter volume value.',
      'Select source unit and destination unit.',
      'Inspect converted liquid or solid volume.'
    ],
    limitations: ['Distinguishes between US liquid gallons and UK Imperial gallons.'],
    faqs: [{ q: 'How many liters in a US gallon?', a: '1 US gallon is approximately 3.78541 liters.' }]
  },
  {
    id: 'speed-converter',
    name: 'Speed Converter',
    slug: 'speed-converter',
    category: 'unit-converters',
    description: 'Convert speed between kilometers per hour (km/h), miles per hour (mph), meters per second (m/s), and knots.',
    keywords: ['speed converter', 'kmh to mph', 'mph to kmh', 'knots to kmh', 'velocity converter'],
    component: SpeedConverter,
    instructions: [
      'Enter speed value.',
      'Select input and output speed units.',
      'View converted velocity.'
    ],
    limitations: ['Calculates linear speed.'],
    faqs: [{ q: 'What is 100 km/h in mph?', a: '100 km/h is approximately 62.1371 mph.' }]
  },
  {
    id: 'time-unit-converter',
    name: 'Time Unit Converter',
    slug: 'time-unit-converter',
    category: 'unit-converters',
    description: 'Convert between seconds, minutes, hours, days, weeks, months, and years.',
    keywords: ['time unit converter', 'seconds to hours', 'days to hours', 'weeks to days'],
    component: TimeUnitConverter,
    instructions: [
      'Enter duration value.',
      'Select from and to time units.'
    ],
    limitations: ['Months normalized to 30.4375 days; years to 365.25 days.'],
    faqs: [{ q: 'How many hours in a week?', a: 'There are exactly 168 hours in 1 week (7 × 24).' }]
  },
  {
    id: 'data-storage-converter',
    name: 'Data Storage Converter',
    slug: 'data-storage-converter',
    category: 'unit-converters',
    popular: true,
    description: 'Convert digital memory and file sizes between Bytes, KB, MB, GB, TB, PB, and bits.',
    keywords: ['data storage converter', 'gb to mb', 'mb to kb', 'bytes to gb', 'digital storage calculator'],
    component: DataStorageConverter,
    instructions: [
      'Enter storage value.',
      'Choose source unit (e.g. GB) and target unit (e.g. MB).',
      'View binary (1024-based) storage conversion.'
    ],
    limitations: ['Binary prefix conversion standard (1 KB = 1024 Bytes).'],
    faqs: [{ q: 'How many MB in 1 GB?', a: 'In binary computer storage, 1 GB = 1,024 MB.' }]
  },
  {
    id: 'pressure-converter',
    name: 'Pressure Converter',
    slug: 'pressure-converter',
    category: 'unit-converters',
    description: 'Convert pressure between Pascal (Pa), Kilopascal (kPa), Bar, PSI, and Atmospheres (atm).',
    keywords: ['pressure converter', 'psi to bar', 'bar to psi', 'pascal to atm', 'pressure units'],
    component: PressureConverter,
    instructions: [
      'Enter pressure value.',
      'Select input and output pressure scales.'
    ],
    limitations: ['Standard pressure ratio conversions.'],
    faqs: [{ q: 'What is 1 atmosphere in PSI?', a: '1 standard atmosphere (atm) is 14.6959 PSI.' }]
  },
  {
    id: 'energy-converter',
    name: 'Energy Converter',
    slug: 'energy-converter',
    category: 'unit-converters',
    description: 'Convert between Joules (J), Kilojoules (kJ), Calories (cal), Kilocalories (kcal), Watt-hours, and BTU.',
    keywords: ['energy converter', 'joules to calories', 'kwh to joules', 'kcal to kj', 'btu converter'],
    component: EnergyConverter,
    instructions: [
      'Enter energy value.',
      'Select units to convert between Joules, calories, and kilowatt-hours.'
    ],
    limitations: ['Standard thermochemical calorie definitions.'],
    faqs: [{ q: 'How many Joules in 1 calorie?', a: '1 calorie equals exactly 4.184 Joules.' }]
  },

  // ==========================================
  // HEALTH AND FITNESS (5 TOOLS)
  // ==========================================
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    slug: 'bmi-calculator',
    category: 'health-fitness-calculators',
    popular: true,
    description: 'Calculate Body Mass Index (BMI) and discover your recommended healthy weight range according to WHO guidelines.',
    keywords: ['bmi calculator', 'body mass index', 'healthy weight calculator', 'who bmi chart'],
    component: BmiCalculator,
    instructions: [
      'Select metric (kg, cm) or imperial (lbs, ft/in).',
      'Enter height and weight.',
      'View BMI score, WHO category, and healthy weight range.'
    ],
    limitations: ['BMI is a screening tool and does not distinguish muscle mass from fat mass.'],
    faqs: [{ q: 'What is a normal BMI?', a: 'A BMI between 18.5 and 24.9 is considered normal weight by WHO.' }]
  },
  {
    id: 'bmr-calculator',
    name: 'BMR Calculator',
    slug: 'bmr-calculator',
    category: 'health-fitness-calculators',
    popular: true,
    description: 'Calculate Basal Metabolic Rate (BMR) — calories burned at complete rest using the Mifflin-St Jeor formula.',
    keywords: ['bmr calculator', 'basal metabolic rate', 'mifflin st jeor', 'calories burned at rest'],
    component: BmrCalculator,
    instructions: [
      'Select biological sex (Male or Female).',
      'Enter age, height, and weight.',
      'View your daily baseline resting calorie burn.'
    ],
    limitations: ['Uses the clinical Mifflin-St Jeor equation.'],
    faqs: [{ q: 'What is BMR?', a: 'The minimum number of calories your body needs to perform basic life-sustaining functions.' }]
  },
  {
    id: 'daily-calorie-estimate-calculator',
    name: 'Daily Calorie Estimate Calculator',
    slug: 'daily-calorie-estimate-calculator',
    category: 'health-fitness-calculators',
    popular: true,
    description: 'Estimate Total Daily Energy Expenditure (TDEE) and caloric targets for weight maintenance, loss, or muscle gain.',
    keywords: ['daily calorie calculator', 'tdee calculator', 'calories for weight loss', 'maintenance calories'],
    component: DailyCalorieCalculator,
    instructions: [
      'Enter your BMR (or estimate it from BMR calculator).',
      'Select your average weekly physical activity level.',
      'View daily calorie targets for maintenance, fat loss, and muscle gain.'
    ],
    limitations: ['Caloric targets are estimates based on standard metabolic multipliers.'],
    faqs: [{ q: 'How many calories should I cut to lose 1 lb per week?', a: 'A daily deficit of 500 kcal equates to ~3,500 kcal per week (~1 lb of fat).' }]
  },
  {
    id: 'ideal-weight-estimator',
    name: 'Ideal Weight Estimator',
    slug: 'ideal-weight-estimator',
    category: 'health-fitness-calculators',
    description: 'Compare ideal body weight estimates based on 4 established medical formulas (Devine, Robinson, Miller, and Hamwi).',
    keywords: ['ideal weight estimator', 'ideal body weight', 'devine formula', 'healthy weight for height'],
    component: IdealWeightEstimator,
    instructions: [
      'Select gender and enter height in centimeters.',
      'Compare ideal weight estimates from Devine, Robinson, Miller, and Hamwi formulas.'
    ],
    limitations: ['Equations standardized for adults 5 feet (152 cm) and taller.'],
    faqs: [{ q: 'Why are there multiple formulas?', a: 'Different medical researchers developed formulas across decades to reflect different populations.' }]
  },
  {
    id: 'water-intake-estimator',
    name: 'Water Intake Estimator',
    slug: 'water-intake-estimator',
    category: 'health-fitness-calculators',
    popular: true,
    description: 'Calculate recommended daily water hydration needs based on body mass, workout activity, and climate.',
    keywords: ['water intake estimator', 'daily water intake', 'how much water to drink', 'hydration calculator'],
    component: WaterIntakeEstimator,
    instructions: [
      'Enter your body weight in kilograms.',
      'Enter daily exercise minutes.',
      'Select your climate environment (Moderate or Hot/Humid).',
      'View daily water targets in Liters, standard 250ml glasses, and fluid ounces.'
    ],
    limitations: ['General hydration recommendation for healthy adults.'],
    faqs: [{ q: 'How much water should I drink?', a: 'A standard baseline is 35ml per kg of body weight, plus extra for exercise and heat.' }]
  }
];
