export interface Constant {
  value: string;
  name: string;
  description: string[]
}

export function GetRandomConstant() : Constant
{
  return constants[Math.floor(Math.random() * constants.length)];
}

function NewConstant(value : string, name : string, description : string[] = []) : Constant
{
  return { value, name, description }
}

// https://planetmath.org/indexofimportantirrationalconstants
export const constants : Constant[] = [
  NewConstant(
    "0.1149420448532962007", 
    "Kepler-Bouwkamp constant",
    [
      "The Kepler-Bouwkamp constant is the smallest positive root of the equation"
    ]
  ),
  NewConstant(
    "0.1234567891011121314",
    "Champernowne's constant",
    [
      "Champernowne's constant is the number whose decimal expansion is obtained by concatenating the positive integers"
    ]
  ),
  NewConstant("0.2078795763507619085", "i^i or e^(-π/2)", ["The value of the imaginary unit raised to the power of itself"]),
  NewConstant("0.2357111317192329313", "Copeland-Erdős constant", ["A constant formed by concatenating the prime numbers in base 10"]),
  NewConstant("0.2614972128476427837", "Meissel-Mertens constant", ["A constant related to the distribution of prime numbers"]),
  NewConstant("0.3275822918721811159", "Lévy's constant", ["A constant that appears in the study of continued fractions"]),
  NewConstant("0.4146825098511116602", "The prime constant p", ["A constant formed by the product of (1 - 1/p) over all primes p"]),
  NewConstant("0.5926327182016361971", "Lehmer's constant", ["A constant related to the distribution of prime numbers"]),
  NewConstant("0.6079271018540266286", "6 / π^2", ["The probability that a random integer is squarefree"]),
  NewConstant("0.6434105462883380261", "Cahen's constant", ["A constant that appears in the study of Sylvester's sequence"]),
  NewConstant("0.7642236535892206629", "Landau-Ramanujan constant", ["A constant related to the number of ways a number can be expressed as a sum of two squares"]),
  NewConstant("0.8346268416740731862", "Gauss's constant", ["A constant that appears in the arithmetic-geometric mean"]),
  NewConstant("0.8862269254527580136", "(1/2) * √π", ["Half of the square root of π"]),
  NewConstant("0.9159655941772190150", "Catalan's constant K", ["A constant that appears in combinatorial mathematics"]),
  NewConstant("1.2020569031595942853", "Apéry's constant", ["A constant related to the Riemann zeta function at s=3"]),
  NewConstant("1.2254167024651776451", "T(3/4)", ["A constant related to the gamma function"]),
  NewConstant("1.3063778838630806904", "Mills' constant", ["A constant used in Mills' theorem"]),
  NewConstant("1.3247179572447460260", "The plastic constant", ["A mathematical constant that is the unique real solution of the equation x^3 = x + 1"]),
  NewConstant("1.4142135623730950488", "Square root of two √2", ["The positive algebraic number that, when multiplied by itself, gives the number 2"]),
  NewConstant("1.4513692348833810502", "Ramanujan-Soldner constant", ["A constant related to the logarithmic integral function"]),
  NewConstant("1.6066951524152917637", "Erdős-Borwein constant", ["A constant related to the sum of the reciprocals of the Mersenne primes"]),
  NewConstant("1.6180339887498948482", "The golden ratio ϕ", ["A mathematical constant that is the positive solution to the equation x^2 = x + 1"]),
  NewConstant("1.6449340668482264364", "the solution to the Basel problem", ["The sum of the reciprocals of the squares of the natural numbers"]),
  NewConstant("1.7320508075688772935", "Square root of three √3", ["The positive real number that, when multiplied by itself, gives the number 3"]),
  NewConstant("1.7579327566180045327", "Vijayaraghavan's infinite nested radical", ["A constant that appears in the study of infinite nested radicals"]),
  NewConstant("1.7724538509055160273", "√π", ["The square root of π"]),
  NewConstant("2.2360679774997896964", "√5", ["The positive real number that, when multiplied by itself, gives the number 5"]),
  NewConstant("2.6651441426902251887", "2^√2", ["Two raised to the power of the square root of two"]),
  NewConstant("2.6854520010653064453", "Khinchin's constant", ["A constant that appears in the study of continued fractions"]),
  NewConstant("2.5849817595792532170", "Sierpiński's constant", ["A constant related to the Sierpiński triangle"]),
  NewConstant("2.7182818284590452354", "Euler's number", ["The base of the natural logarithm"]),
  NewConstant("3.1415926535897932385", "Pi", ["The ratio of the circumference of a circle to its diameter"]),
  NewConstant("4.1327313541224929385", "√(2eπ)", ["The square root of 2 times e times π"]),
  NewConstant("4.6692116609102990671", "Feigenbaum's constant δ", ["A constant that appears in the study of chaotic systems"]),
  NewConstant("7.3890560989306502272", "e^2", ["Euler's number squared"]),
  NewConstant("14.134725141734693790", "The imaginary part of the first nontrivial zero of the Riemann zeta function", ["The imaginary part of the first nontrivial zero of the Riemann zeta function"]),
  NewConstant("15.154262241479264189", "e^e", ["Euler's number raised to the power of itself"]),
  NewConstant("36.462159607207911771", "π^π", ["Pi raised to the power of itself"]),
]