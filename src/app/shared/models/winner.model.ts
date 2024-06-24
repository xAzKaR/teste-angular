/**
 * Model de vencedor de prêmio por ano
 *
 * @interface WinnerYear
 */
export interface WinnerYearModel {
    year: number;
    winnerCount: number;
}

/**
 * Model para lista vencedores de prêmios por ano
 *
 * @interface WinnerYearList
 */
export interface WinnerYearListModel {
  years: WinnerYearModel[];
}

