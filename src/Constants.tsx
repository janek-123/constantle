export interface Constant {
  value: string;
  name: string;
  description: string[]
}

function NewConstant(value : string, name : string, description : string[]) : Constant
{
  return { value, name, description }
}

export const constants : Constant[] = [
  NewConstant("3.141", "Pi", 
    [
      "Pi (π) is a mathematical constant that represents the ratio of a circle's circumference to its diameter. It is an irrational number, meaning its decimal expansion goes on infinitely without repeating.",
      "The value of pi is approximately 3.14159, though it can be calculated to millions of decimal places. Pi plays a crucial role in geometry, trigonometry, and various fields of science and engineering, making it one of the most important constants in mathematics."
    ]),
  NewConstant("2.718", "Euler's number",
    [
      "Euler's number is a mathematical constant that is the base of the natural logarithm. It is represented by the letter e and is approximately equal to 2.71828.",
      "Euler's number is an important constant in mathematics and is used in a variety of mathematical and scientific applications, including calculus, probability theory, and number theory."
    ]),
  NewConstant("1.618", "Golden Ratio",
    [
      "The golden ratio is a mathematical constant that is approximately equal to 1.61803398875. It is an irrational number that has many unique properties and is often considered to be aesthetically pleasing.",
      "The golden ratio appears in many aspects of art, architecture, and nature, and has been used by artists and architects for centuries to create visually appealing compositions and designs."
    ]),
  NewConstant("0.577", "Euler-Mascheroni constant",
    [
      "The Euler-Mascheroni constant is a mathematical constant that is approximately equal to 0.5772156649. It is denoted by the symbol γ (gamma) and is named after the mathematicians Leonhard Euler and Lorenzo Mascheroni.",
      "The Euler-Mascheroni constant appears in a variety of mathematical and scientific contexts, including number theory, combinatorics, and the analysis of algorithms."
    ]),
  NewConstant("1.414", "Square root of 2",
    [
      "The square root of 2 is a mathematical constant that represents the positive square root of the number 2. It is an irrational number that has many unique properties and is often used in mathematics and science.",
      "The square root of 2 appears in a variety of mathematical and scientific contexts, including geometry, trigonometry, and calculus, and is an important constant in the field of mathematics."
    ])
]