import { ToolGuide } from './types';

export const CRICKET_GUIDES: Record<string, ToolGuide> = {
  'cricket-batting-average-calculator': {
    id: 'cricket-batting-average-calculator',
    name: 'Cricket Batting Average Calculator',
    subtitle: 'Official ICC batting average formula: Total Runs ÷ Number of Dismissals',
    whatItDoes: {
      summary: 'Calculates a batsman’s official cricket batting average based on total runs scored and total dismissals (times out), with not-out innings accounted for correctly.',
      targetAudience: 'Cricket players, coaches, statisticians, fantasy league managers, and sports commentators.',
      problemsSolved: [
        'Eliminates confusion between total innings played versus actual dismissals.',
        'Accurately credits not-out innings according to official ICC laws of cricket.'
      ],
      expectedResult: 'Exact batting average rounded to 2 decimal places with visual performance rating.'
    },
    features: [
      'Official ICC calculation standard: Runs ÷ (Innings - Not Outs).',
      'Instant calculation upon entering runs, innings, and not-outs.',
      'Validation preventing impossible inputs (e.g. not-outs exceeding total innings).',
      'Performance rating tier based on international cricket benchmarks.'
    ],
    beforeYouStart: [
      'Have total runs scored ready.',
      'Know total number of innings batted and how many times the player remained not out.'
    ],
    stepByStep: [
      'Open the Cricket Batting Average Calculator on Zynovexa.',
      'Enter the player’s total runs in the "Total Runs Scored" box.',
      'Enter the total number of innings played.',
      'Enter the number of "Not Out" innings.',
      'Click "Calculate Batting Average".',
      'View the computed average and statistical assessment.'
    ],
    example: {
      title: 'Season Batting Average',
      input: 'Runs = 540, Innings = 14, Not Outs = 2',
      options: 'Dismissals = 14 - 2 = 12',
      output: 'Batting Average = 45.00',
      explanation: '540 runs divided by 12 dismissals equals an average of 45.00 runs per wicket.'
    },
    bestResultsTips: [
      'If a player has never been dismissed (0 times out), the batting average is undefined and shown as undefeated.',
      'Ensure "Not Outs" is less than or equal to total innings.'
    ],
    troubleshooting: [
      {
        problem: 'Calculated average is "Undefeated / N/A"',
        cause: 'The player has 0 dismissals (Not Outs equals Innings).',
        solution: 'This is correct in cricket statistics; once dismissed, enter dismissal count to obtain an average.'
      },
      {
        problem: 'Error: Not Outs exceeds total innings',
        cause: 'Entered a higher number of not-outs than total innings batted.',
        solution: 'Total innings must be greater than or equal to Not Outs.'
      }
    ],
    faqs: [
      { q: 'Why are Not Outs subtracted from innings?', a: 'Under cricket law, batting average measures runs per dismissal, not runs per match.' },
      { q: 'Is this calculator free?', a: 'Yes, 100% free with no registration.' },
      { q: 'Does it work for T20, ODI, and Test matches?', a: 'Yes, the mathematical formula is identical across all formats.' },
      { q: 'Can I calculate career stats?', a: 'Yes, enter multi-year career aggregates for career averages.' },
      { q: 'Can I use it on a smartphone at the cricket ground?', a: 'Yes, fully optimized for fast mobile touchscreens.' }
    ],
    seoContent: {
      title: 'Free Cricket Batting Average Calculator — Official ICC Formula | Zynovexa',
      metaDescription: 'Calculate cricket batting average online using official ICC formula. Free, mobile-friendly, accounts for not out innings.',
      h1: 'Cricket Batting Average Calculator',
      primaryKeyword: 'cricket batting average calculator',
      secondaryKeywords: ['batting average formula cricket', 'calculate batting avg online', 'cricket stats calculator'],
      longTailKeywords: ['how to calculate cricket batting average with not outs', 'free cricket stats calculator online']
    }
  },
  'cricket-strike-rate-calculator': {
    id: 'cricket-strike-rate-calculator',
    name: 'Cricket Strike Rate Calculator',
    subtitle: 'Batting strike rate formula: (Total Runs Scored ÷ Balls Faced) × 100',
    whatItDoes: {
      summary: 'Calculates the batsman’s scoring rate per 100 balls faced, essential for T20, ODI, and powerplay analysis.',
      targetAudience: 'Cricket fans, fantasy team managers, players analyzing scoring momentum, and commentators.',
      problemsSolved: [
        'Determines scoring velocity in limited-overs matches.',
        'Compares power hitters and anchor batsmen on a standardized scale.'
      ],
      expectedResult: 'Batting strike rate per 100 balls with 2 decimal precision.'
    },
    features: [
      'Accurate formula: (Runs / Balls) * 100.',
      'Instant real-time output.',
      'Categorization (e.g. explosive T20, balanced ODI, defensive Test).',
      'Runs without downloads or sign up.'
    ],
    beforeYouStart: [
      'Know the total runs scored in the match or season.',
      'Know the total balls faced by the batsman.'
    ],
    stepByStep: [
      'Enter "Total Runs Scored".',
      'Enter "Balls Faced" (must be greater than 0).',
      'Click "Calculate Strike Rate".',
      'Read the Strike Rate percentage and scoring assessment.'
    ],
    example: {
      title: 'T20 Innings Strike Rate',
      input: 'Runs = 64, Balls = 32',
      output: 'Strike Rate = 200.00',
      explanation: '64 runs scored in 32 balls equals 2.00 runs per ball, or 200.00 runs per 100 deliveries.'
    },
    bestResultsTips: [
      'Excludes wide balls (wides do not count as balls faced by batsmen).',
      'No-balls faced by the batsman DO count as balls faced.'
    ],
    troubleshooting: [
      {
        problem: 'Strike rate is 0',
        cause: 'Balls were faced without scoring any runs.',
        solution: 'Ensure runs entered corresponds to the balls faced.'
      },
      {
        problem: 'Division by zero error',
        cause: 'Balls Faced was entered as 0.',
        solution: 'A batsman must face at least 1 delivery for a strike rate to exist.'
      }
    ],
    faqs: [
      { q: 'What is a good T20 strike rate?', a: 'A strike rate of 140+ is considered strong in modern T20 cricket.' },
      { q: 'Are wides counted in balls faced?', a: 'No, wides are extra deliveries credited to team total, not batsman balls faced.' },
      { q: 'Is it free?', a: 'Yes, 100% free with no sign-in.' },
      { q: 'Can I calculate bowler strike rate with this?', a: 'No, use the Cricket Bowling Average & Strike Rate Calculator for bowlers.' },
      { q: 'Does it work offline?', a: 'Yes, once loaded, runs offline.' }
    ],
    seoContent: {
      title: 'Free Cricket Strike Rate Calculator — Batting Run Rate | Zynovexa',
      metaDescription: 'Calculate batting strike rate online for T20, ODI, and Test cricket. Free, instant, mobile-friendly.',
      h1: 'Cricket Strike Rate Calculator',
      primaryKeyword: 'cricket strike rate calculator',
      secondaryKeywords: ['batting strike rate formula', 't20 strike rate calculator', 'cricket scoring rate'],
      longTailKeywords: ['how to calculate batting strike rate in cricket', 'online cricket strike rate calculator free']
    }
  },
  'required-run-rate-calculator': {
    id: 'required-run-rate-calculator',
    name: 'Required Run Rate Calculator',
    subtitle: 'Run chase target formula: Runs Needed ÷ Overs Remaining',
    whatItDoes: {
      summary: 'Computes the exact runs needed per over and per ball to achieve a victory target during limited overs run chases.',
      targetAudience: 'Cricket fans watching live chases, captains planning batting acceleration, commentators, and scorers.',
      problemsSolved: [
        'Solves fluctuating pressure situations in live T20 and ODI cricket chases.',
        'Converts overs and balls remaining into precise decimal bowling rates.'
      ],
      expectedResult: 'Required Run Rate (RRR) per over, runs per ball, and chase viability assessment.'
    },
    features: [
      'Handles partial overs (e.g. 4.2 overs = 26 balls remaining).',
      'Calculates runs needed per 6 balls and runs required per individual ball.',
      'Instant color-coded urgency meter.'
    ],
    beforeYouStart: [
      'Target score or remaining runs needed.',
      'Overs or balls remaining in the innings.'
    ],
    stepByStep: [
      'Enter the "Runs Needed to Win".',
      'Enter the "Overs Remaining" (use .1 to .5 for individual deliveries, e.g. 3.4 overs).',
      'Click "Calculate Required Run Rate".',
      'View the RRR per over and target pace per ball.'
    ],
    example: {
      title: 'Death Overs Chase',
      input: 'Runs Needed = 36, Overs Remaining = 3.0',
      output: 'Required Run Rate = 12.00 runs/over (2.00 runs/ball)',
      explanation: '36 runs needed across 18 legal deliveries requires exactly 12 runs per over.'
    },
    bestResultsTips: [
      'Remember that 3.4 overs means 3 complete overs plus 4 balls (total of 22 balls), not 3.40 mathematically.',
      'Enter remaining runs, not the initial match target.'
    ],
    troubleshooting: [
      {
        problem: 'Calculated rate looks too high',
        cause: 'Entered decimal overs as base 10 instead of cricket deliveries (6 balls per over).',
        solution: 'Use standard cricket notation (.1 through .5 for balls remaining).'
      },
      {
        problem: 'Result says "Match Finished" or shows negative rate',
        cause: 'Runs needed was entered as 0 or negative.',
        solution: 'If the target is achieved, the match is won; enter positive runs needed for active chases.'
      }
    ],
    faqs: [
      { q: 'How is Required Run Rate calculated?', a: 'Formula: (Runs Needed / Total Balls Remaining) × 6.' },
      { q: 'Can I enter individual balls remaining?', a: 'Yes, enter 0.1 for 1 ball, 0.4 for 4 balls, etc.' },
      { q: 'Is this calculator free?', a: 'Yes, 100% free with no sign-in.' },
      { q: 'Does it work for DLS rain-affected targets?', a: 'Yes, just input the revised runs needed and revised overs remaining.' },
      { q: 'Can I use it on mobile during a match?', a: 'Yes, perfectly designed for quick smartphone checks during live matches.' }
    ],
    seoContent: {
      title: 'Free Required Run Rate Calculator — Cricket Chase Target | Zynovexa',
      metaDescription: 'Calculate required run rate (RRR) per over and per ball for live cricket run chases. 100% free, fast, and mobile-friendly.',
      h1: 'Required Run Rate Calculator',
      primaryKeyword: 'required run rate calculator',
      secondaryKeywords: ['cricket rrr calculator', 'run chase calculator', 'cricket overs remaining calculator'],
      longTailKeywords: ['how to calculate required run rate in cricket', 'cricket run rate needed to win']
    }
  }
};
