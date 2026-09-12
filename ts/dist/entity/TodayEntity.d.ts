import { TheRosaryEntityBase } from '../TheRosaryEntityBase';
import type { TheRosarySDK } from '../TheRosarySDK';
import type { Control } from '../types';
import type { Today, TodayListMatch } from '../TheRosaryTypes';
declare class TodayEntity extends TheRosaryEntityBase<Today> {
    constructor(client: TheRosarySDK, entopts: any);
    make(this: TodayEntity): TodayEntity;
    list(this: any, reqmatch?: TodayListMatch, ctrl?: Control): Promise<TodayEntity[]>;
}
export { TodayEntity };
