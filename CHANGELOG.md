# Changelog

## [0.2.0](https://github.com/hwakabh/semantic-issue-action/compare/v0.1.0...v0.2.0) (2025-01-09)


### Features

* enabled to fetch lists of issue title. ([056b044](https://github.com/hwakabh/semantic-issue-action/commit/056b04463fb466825b97759340a8661f7bba9730))
* fetched issue using proper octokit methods. ([cd9d970](https://github.com/hwakabh/semantic-issue-action/commit/cd9d9705c73e6577a4041d277a244257b1ff4df9))
* implemented valildate title functions with @conventional-commits/parser. ([f638340](https://github.com/hwakabh/semantic-issue-action/commit/f6383401b9cf54400928a7474fd125f1a82dd1eb))
* removed forEach() to get issue object from JSON webhooks. ([b67c0d3](https://github.com/hwakabh/semantic-issue-action/commit/b67c0d316b0530a43d91482fffbb2cb11f628acc))


### Bug Fixes

* **release-please:** tag versioning with removing component name. ([f503483](https://github.com/hwakabh/semantic-issue-action/commit/f5034836671c9252e5e127707e457039564133da))
* removed JSON.stringfy() for fetching issue number. ([06b676f](https://github.com/hwakabh/semantic-issue-action/commit/06b676f43bd95f727a75cead9c5e1126e8c7cbe4))

## [0.1.0](https://github.com/hwakabh/semantic-issue-action/compare/semantic-issue-action-v0.0.1...semantic-issue-action-v0.1.0) (2025-01-09)


### Features

* added gh-actions main configs. ([034758c](https://github.com/hwakabh/semantic-issue-action/commit/034758c15a1ed770121de8640ded888dc1268fb0))
* added initial core logics. ([2c82fa9](https://github.com/hwakabh/semantic-issue-action/commit/2c82fa97698f9913904c1dbd048fe10e2a3415b7))
* **ci:** included main.yaml with release extra-files. ([684d742](https://github.com/hwakabh/semantic-issue-action/commit/684d742b2377362b8d1feee0975f5f9c1c034577))
* initialized nodejs 20.9.0 ([c3ce789](https://github.com/hwakabh/semantic-issue-action/commit/c3ce7896a68af092e899de006a9cd66e7d846b7a))


### Bug Fixes

* **ci:** compiled with @vercel/ncc to fix MODULE_NOT_FOUND. ([85ef1b3](https://github.com/hwakabh/semantic-issue-action/commit/85ef1b3a1fd8ffb55458e983ed14b112aeb69aa8))
* **ci:** fields of extra-files in release-please configurations. ([6b6fa41](https://github.com/hwakabh/semantic-issue-action/commit/6b6fa416a0dc0e25227bcbe777cbaa484a436f87))
* **ci:** fixed jsonpath for release-please. ([9052545](https://github.com/hwakabh/semantic-issue-action/commit/90525454dfa8b9ff5e21754531be0dd40164e9d1))
* **ci:** typo in workflow triggers. ([5e9dd87](https://github.com/hwakabh/semantic-issue-action/commit/5e9dd87977758db15f6411dbd493103794dd6694))
* **ci:** updated permissions ([f900b6e](https://github.com/hwakabh/semantic-issue-action/commit/f900b6eee2a4d4dbd22ebb8f5a78e50750dc9c7a))
* **ci:** x-release-please annoations. ([955257d](https://github.com/hwakabh/semantic-issue-action/commit/955257d7b89899a857ba83fe0fb62ae7c6efb77b))
* renamed proper filename. ([51f5efe](https://github.com/hwakabh/semantic-issue-action/commit/51f5efe5d353d3a20dcebbc280d5d1a1ac130caf))


### Reverts

* **ci:** dropped .main.yaml from release-please target. ([c4d774a](https://github.com/hwakabh/semantic-issue-action/commit/c4d774a46b3de005552830954941df8fd01b6bb3))
