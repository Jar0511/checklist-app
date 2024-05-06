/** 확률이 주어진 항목에 대한 랜덤 선택 */
export const getRandomByProbabilty = <T>(values: {value: T, probability: number}[]): T => {

  // 누적 확률 배열 생성
  const accumulated: {value: T, probability: number}[] = [];
  let sum = 0;

  for(let i = 0; i < values.length; i++) {
    const { value, probability } = values[i];
    if(probability >= 1) {
      throw new Error('확률의 합이 1이 아닙니다');
    }
    sum += probability;
    accumulated.push({ value, probability: sum });
  }

  if(Math.abs(sum - 1) > Number.EPSILON) {
    throw new Error('확률의 합이 1이 아닙니다');
  }

  // 랜덤 값 생성
  const random = Math.random();

  // 랜덤 값 범위 값 리턴
  for (const entry of accumulated) {
    if(random <= entry.probability) {
      return entry.value
    }
  }

  // (드문 확률로) 범위에서 벗어날 경우 마지막 항목 리턴
  return values[values.length - 1].value;
}

/** 주어진 배열 중 아무거나 고를 때 */
export const sample = <T>(values: T[]): T => {
  const random = Math.floor(Math.random() * values.length);
  return values[random];
}