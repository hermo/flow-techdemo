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

# Running the demo

Install flow. (brew install flow)

Run ```flow```. It should report *"No Errors"*

# Editor support & more

Editor support is limited but Facebook has a
[plugin](https://github.com/facebook/vim-flow) for Vim.

[Babel](https://babeljs.io/) has native support for flow.

[Flow playground](https://tryflow.org/)
