# Changelog

## 2.0.1 (2025-11-29)

### Bug fixes

- fixed useController arg types [4b5a2cd](https://github.com/tatsmaki/solid-hook-form/commit/4b5a2cd6b8b56feb14763e43b7f85638041f01af)

## 2.0.0 (2025-11-29)

### Breaking changes

- switched formState errors to createStore proxy object instead of createSignal accessor [ac1f339](https://github.com/tatsmaki/solid-hook-form/commit/ac1f33947f6d6e38277e4b563e0079652c25f4eb)
- createForm defaultValues is a required argument to allow proper form initialization and reset [ad668b0](https://github.com/tatsmaki/solid-hook-form/commit/ad668b0a02d65d7b016332e1fe3601f78d0d0074)
- removed useForm and onSubmit aliases - use createForm and handleSubmit instead [a2d25b6](https://github.com/tatsmaki/solid-hook-form/commit/a2d25b6f37ac9d0d2fc2aaff5a1f9cdef108e502)

### Added

- formState dirtyFields to track user-modified fields against defaultValues [63a7f78](https://github.com/tatsmaki/solid-hook-form/commit/63a7f784beffcfad97c00f6856b8aed4ce8ecf5f)

### Bug fixes

- removed preinstall script from public package [0bb96c3](https://github.com/tatsmaki/solid-hook-form/commit/0bb96c3490b958722d6042901352ca1093cef6e6)
- fixed validation behavior without provided defaultValues [ad668b0](https://github.com/tatsmaki/solid-hook-form/commit/ad668b0a02d65d7b016332e1fe3601f78d0d0074)

## 1.10.0 (2025-11-22)

### Added

- formState touchedFields [33e2d0a](https://github.com/tatsmaki/solid-hook-form/commit/33e2d0ad581f6f82d13cc27aefac3b29a4f08297)
- reset keepTouched option [33e2d0a](https://github.com/tatsmaki/solid-hook-form/commit/33e2d0ad581f6f82d13cc27aefac3b29a4f08297)
- handleSubmit onError callback [7f8f6bb](https://github.com/tatsmaki/solid-hook-form/commit/7f8f6bb64c3090acdcad13d79b0f8df8ab155e9a)

## 1.9.2 (2025-11-17)

### Bug fixes

- use FormContext control by default [4b7927d](https://github.com/tatsmaki/solid-hook-form/commit/4b7927dc5544c588ea9e5cdd453ff820f96146e9)
- handle raw value in onChange/onInput handler without event object [9258ccc](https://github.com/tatsmaki/solid-hook-form/commit/9258cccde227c2715be73b632650b796f5a73c4c)

## 1.9.1 (2025-11-16)

### Added

- formState isValid and errors accessor [b1d3a34](https://github.com/tatsmaki/solid-hook-form/commit/b1d3a3419fa33001da54e4d982a0c9e2af54f12c)

## 1.9.0 (2025-11-16)

### Changed

- rename useForm to createForm [7c9a04f](https://github.com/tatsmaki/solid-hook-form/commit/7c9a04f0a2779d0595cfb5b408cea0318c599994)
- rename onSubmit to handleSubmit [7c9a04f](https://github.com/tatsmaki/solid-hook-form/commit/7c9a04f0a2779d0595cfb5b408cea0318c599994)
- add missing useController export [7c9a04f](https://github.com/tatsmaki/solid-hook-form/commit/7c9a04f0a2779d0595cfb5b408cea0318c599994)

## 1.8.0 (2025-11-15)

### Added

- useController hook for controlled inputs [92365e1](https://github.com/tatsmaki/solid-hook-form/commit/92365e138621eb816798e9493e4baba2112f4300)

## 1.7.1 (2025-11-14)

### Bug fixes

- use default onChange mode [da3255e](https://github.com/tatsmaki/solid-hook-form/commit/da3255e0435c48eebb0a99906109ad1a6002eed7)

## 1.7.0 (2025-11-14)

### Added

- Controller component for controlled inputs [1176c16](https://github.com/tatsmaki/solid-hook-form/commit/1176c163f4ecf62e1748d86ad4089b9c6ea1ac90)

## 1.6.4 (2025-11-03)

### Added

- get/set utility functions [d82db5f](https://github.com/tatsmaki/solid-hook-form/commit/d82db5f0b5607316f6a3f617ef8f39e16fafc015)

## 1.6.1 (2025-10-29)

### Bug fixes

- missing input refs on schema resolver validation [f99f888](https://github.com/tatsmaki/solid-hook-form/commit/f99f888d2a41ebfba35498adfbf1fe842e2b7ead)

## 1.6.0 (2025-10-25)

### Added

- add form validation using schema resolver [9712a58](https://github.com/tatsmaki/solid-hook-form/commit/9712a5809058b13ec28db5c3291bdce30039953d)
- add register valueAsNumber rule [9712a58](https://github.com/tatsmaki/solid-hook-form/commit/9712a5809058b13ec28db5c3291bdce30039953d)

## 1.5.1 (2025-10-17)

### Bug fixes

- empty useForm arguments [4f838df](https://github.com/tatsmaki/solid-hook-form/commit/4f838df72d9d678879fde78f980d90f195fdbcb9)

## 1.5.0 (2025-10-17)

### Added

- add support for nested form fields [38c80ff](https://github.com/tatsmaki/solid-hook-form/commit/38c80ffc02e3f453584b3dbd035d795a2b9cd9bf)

## 1.4.1 (2025-05-31)

### Bug Fixes

- set FileList as array field value [ce55916](https://github.com/tatsmaki/solid-hook-form/commit/ce5591643f6ab04f706b0da6a798ea4e6f6ae1a5)
