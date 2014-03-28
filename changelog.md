##0.1.0

- Forked from https://github.com/sindresorhus/dargs
- added support for objects. Objects are flattened to the form '--key1.key2.key3'
- removed camelCase conversion to camel-case

##0.2.0

- replaced the excludes parameter with an options object containing 'excludes' as a parameter
- added 'joinLists' option. If false (default), array values will generate multiple flags: '--list thing1 --list thing2 --list thing3'. If true, array values will be passed, delimited, to a single flag: '--list thing1,thing2,thing3'.
- convertCamelCase (default: false) option will optionally convert camelCase flags to camel-case
