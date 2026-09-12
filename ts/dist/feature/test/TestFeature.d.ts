import type { Context, FeatureOptions } from '../../types';
import type { TheRosarySDK } from '../../TheRosarySDK';
import { BaseFeature } from '../base/BaseFeature';
declare function ownIdField(config: any, getpath: any, entityName: string): string;
declare class TestFeature extends BaseFeature {
    version: string;
    name: string;
    active: boolean;
    _client?: TheRosarySDK;
    _options?: any;
    init(ctx: Context, options: FeatureOptions): void | Promise<any>;
    makeNetsim(this: any, net: any, inner: any): (ctx: any, url: string, fetchdef: any) => Promise<any>;
    buildArgs(ctx: any, op: any, args: any): any;
}
export { TestFeature, ownIdField, };
