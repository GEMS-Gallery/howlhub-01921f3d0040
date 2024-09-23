import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Fact { 'id' : bigint, 'content' : string, 'votes' : bigint }
export interface _SERVICE {
  'addFact' : ActorMethod<[string], bigint>,
  'getAllFacts' : ActorMethod<[], Array<Fact>>,
  'voteFact' : ActorMethod<[bigint, boolean], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
