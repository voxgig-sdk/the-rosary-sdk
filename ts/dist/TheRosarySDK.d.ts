import { TodayEntity } from './entity/TodayEntity';
import { V1nEntity } from './entity/V1nEntity';
export type * from './TheRosaryTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { TheRosaryEntityBase } from './TheRosaryEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class TheRosarySDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Today(entopts?: Record<string, any>): TodayEntity;
    V1n(entopts?: Record<string, any>): V1nEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): TheRosarySDK;
    tester(testopts?: any, sdkopts?: any): TheRosarySDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof TheRosarySDK;
export { stdutil, config, BaseFeature, TheRosaryEntityBase, TheRosarySDK, SDK, };
