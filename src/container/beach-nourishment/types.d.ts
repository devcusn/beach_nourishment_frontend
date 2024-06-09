export type BeachSceneProps = {
  A: number;
  x: number;
  y: number;
  matris: Array<Array<number, number, number, string>>;
  beach_length: number;
  revetment: number;
  coast_length: number;
};

export type BeachRevetmentProps = {
  revetment: number;
  beach_length: number;
  coast_length: number;
};

export type GroinProps = {
  length: number;
  x: number;
  z: number;
};
