import { BigNumber } from "ethers";

export const expandToDecimals = (
  number: Number,
  decimals: Number
): BigNumber => {
  return BigNumber.from(number).mul(
    BigNumber.from(10).pow(BigNumber.from(decimals))
  );
};

export const addBignumber = (
  number1: BigNumber,
  number2: BigNumber
): BigNumber => {
  return BigNumber.from(number1).add(BigNumber.from(number2));
};

export const subBignumber = (
  number1: BigNumber,
  number2: BigNumber
): BigNumber => {
  return BigNumber.from(number1).sub(BigNumber.from(number2));
};

export const mulBignumber = (
  number1: BigNumber,
  number2: BigNumber
): BigNumber => {
  return BigNumber.from(number1).mul(BigNumber.from(number2));
};

export const compressaToDecimals = (
  number: BigNumber,
  decimals: any
): Number => {
  return Number(number.toString()) / 10 ** decimals;
};