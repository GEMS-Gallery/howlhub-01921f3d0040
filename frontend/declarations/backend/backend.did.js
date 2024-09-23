export const idlFactory = ({ IDL }) => {
  const Fact = IDL.Record({
    'id' : IDL.Nat,
    'content' : IDL.Text,
    'votes' : IDL.Int,
  });
  return IDL.Service({
    'addFact' : IDL.Func([IDL.Text], [IDL.Nat], []),
    'getAllFacts' : IDL.Func([], [IDL.Vec(Fact)], ['query']),
    'voteFact' : IDL.Func([IDL.Nat, IDL.Bool], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
