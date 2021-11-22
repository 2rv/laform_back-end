export enum StatisticType {
  MasterClass = 0,
  ElectronicPatternProduct = 1,
  PrintedPatternProduct = 2,
  SewingProduct = 3,
  All = 9,
  MaterialProduct = 10,
  NotMaterialProduct = 11,
}

export enum StatisticError {
  StatisticNotFound = 'StatisticNotFound',
  StatisticTypeNotFound = 'StatisticTypeNotFound',
}
