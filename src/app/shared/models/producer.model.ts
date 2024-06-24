/**
 * Model de intervalo de prêmio de produtor de filme
 *
 * @interface ProducerIntervalModel
 */
export interface ProducerIntervalModel {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
}

/**
 * Model de intervalo máximo e mínimo de prêmios para produtor de filme
 *
 * @interface ProducerMaxMinIntervalModel
 */
export interface ProducerMaxMinIntervalModel {
  min: ProducerIntervalModel[];
  max: ProducerIntervalModel[];
}
