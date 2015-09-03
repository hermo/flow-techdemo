# Static Javascript typing with Flow

[Flow](http://flowtype.org/) is a static type checker for JavaScript. It
can be used to catch common bugs in JavaScript programs - such as silent
type conversions, null dereferences and so on - often without requiring
any changes to your code. It also adds type syntax to JavaScript, so
that developers can express invariants about their code and have them
maintained automatically.

This is a contrived toy app which pretends to load an "order" from on
online store in parallel and then combines the parts and prints out an
order breakdown.


