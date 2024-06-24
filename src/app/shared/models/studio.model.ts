/**
 * Model de Studio
 *
 * @interface Studio
 */
export interface StudioModel {
    name: string;
    winCount: number;
}

/**
 * Model para lista de Studio
 *
 * @interface StudioListModel
 */
export interface StudioListModel {
  studios: StudioModel[];
}

