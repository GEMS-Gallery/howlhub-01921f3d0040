import Bool "mo:base/Bool";
import Func "mo:base/Func";

import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Text "mo:base/Text";

actor HuskyWebsite {
    // Define the structure for a husky fact
    public type Fact = {
        id: Nat;
        content: Text;
        votes: Int;
    };

    // Stable variable to store facts
    stable var facts : [Fact] = [];
    stable var nextId : Nat = 0;

    // Function to add a new fact
    public func addFact(content : Text) : async Nat {
        let id = nextId;
        nextId += 1;
        let newFact : Fact = {
            id = id;
            content = content;
            votes = 0;
        };
        facts := Array.append(facts, [newFact]);
        return id;
    };

    // Function to get all facts
    public query func getAllFacts() : async [Fact] {
        return facts;
    };

    // Function to vote on a fact
    public func voteFact(id : Nat, upvote : Bool) : async Bool {
        let factIndex = Array.indexOf<Fact>({ id = id; content = ""; votes = 0 }, facts, func(a, b) { a.id == b.id });
        switch (factIndex) {
            case null { return false; };
            case (?index) {
                let currentFact = facts[index];
                let updatedFact : Fact = {
                    id = currentFact.id;
                    content = currentFact.content;
                    votes = currentFact.votes + (if upvote 1 else -1);
                };
                facts := Array.tabulate(facts.size(), func (i : Nat) : Fact {
                    if (i == index) { updatedFact } else { facts[i] }
                });
                return true;
            };
        };
    };
}
