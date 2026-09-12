import { TheRosaryEntityBase } from '../TheRosaryEntityBase';
import type { TheRosarySDK } from '../TheRosarySDK';
import type { Control } from '../types';
import type { V1n, V1nLoadMatch } from '../TheRosaryTypes';
declare class V1nEntity extends TheRosaryEntityBase<V1n> {
    constructor(client: TheRosarySDK, entopts: any);
    make(this: V1nEntity): V1nEntity;
    load(this: any, reqmatch?: V1nLoadMatch, ctrl?: Control): Promise<V1nEntity>;
}
export { V1nEntity };
